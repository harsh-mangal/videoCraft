import { createHash } from "node:crypto";
import { MongoClient } from "mongodb";

const conflict = () => Object.assign(new Error("This image changed in another session. Refresh and review it before saving again."), { status: 409 });
const imageRecord = (id, document) => document
  ? { id, value: document.value ?? null, version: document.version, updated_at: document.updatedAt?.toISOString() || null }
  : { id, value: null, version: 0, updated_at: null };

export class Store {
  static async connect({ mongoUri, mongoDbName }) {
    const client = new MongoClient(mongoUri, {
      appName: "videocrafts-server",
      maxPoolSize: 10,
      retryWrites: true,
      serverSelectionTimeoutMS: 5_000,
    });
    await client.connect();
    const store = new Store(client, mongoDbName);
    try { await store.initialize(); }
    catch (error) { await client.close(); throw error; }
    return store;
  }

  constructor(client, databaseName) {
    this.client = client;
    this.database = client.db(databaseName);
    this.admins = this.database.collection("admins");
    this.sessions = this.database.collection("sessions");
    this.images = this.database.collection("images");
    this.attempts = this.database.collection("attempts");
  }

  async initialize() {
    try { await this.database.createCollection("images"); }
    catch (error) { if (error.codeName !== "NamespaceExists" && error.code !== 48) throw error; }
    await Promise.all([
      this.admins.createIndex({ email: 1 }, { unique: true }),
      this.sessions.createIndex({ expires: 1 }, { expireAfterSeconds: 0 }),
      this.attempts.createIndex({ until: 1 }, { expireAfterSeconds: 0 }),
    ]);
  }

  async close() { await this.client.close(); }

  async user(email) {
    const document = await this.admins.findOne({ email });
    return document ? { ...document, id: document._id } : null;
  }

  async hasAdmin() { return await this.admins.countDocuments({}, { limit: 1 }) > 0; }

  async createAdmin(email, password, reset = false) {
    const existing = await this.admins.findOne({ email });
    if (existing && !reset) throw new Error("This admin exists. Use --reset only to replace its password and revoke sessions.");
    const now = new Date();
    const admin = await this.admins.findOneAndUpdate(
      { email },
      { $set: { password, updatedAt: now }, $setOnInsert: { createdAt: now } },
      { upsert: true, returnDocument: "after" },
    );
    await this.sessions.deleteMany({ adminId: admin._id });
    return { ...admin, id: admin._id };
  }

  async createSession(hash, adminId, csrf, expires) {
    await this.sessions.deleteMany({ expires: { $lte: new Date() } });
    await this.sessions.insertOne({ _id: hash, adminId, csrf, expires: new Date(expires) });
  }

  async session(hash) {
    const session = await this.sessions.findOne({ _id: hash, expires: { $gt: new Date() } });
    if (!session) return null;
    const admin = await this.admins.findOne({ _id: session.adminId }, { projection: { email: 1 } });
    return admin ? { hash: session._id, admin_id: session.adminId, csrf: session.csrf, expires: session.expires, email: admin.email } : null;
  }

  async deleteSession(hash) { await this.sessions.deleteOne({ _id: hash }); }

  async attempt(key, max = 10) {
    const now = new Date();
    const until = new Date(now.getTime() + 15 * 60 * 1000);
    await this.attempts.deleteOne({ _id: key, until: { $lte: now } });
    for (let retry = 0; retry < 2; retry++) {
      try {
        const result = await this.attempts.findOneAndUpdate(
          { _id: key },
          { $inc: { count: 1 }, $setOnInsert: { until } },
          { upsert: true, returnDocument: "after" },
        );
        return result.count <= max;
      } catch (error) {
        if (error.code !== 11000 || retry) throw error;
      }
    }
    return false;
  }

  async revision() {
    const documents = await this.images.find({}, { projection: { version: 1 } }).sort({ _id: 1 }).toArray();
    if (!documents.length) return "0";
    return createHash("sha256").update(JSON.stringify(documents.map(document => [document._id, document.version]))).digest("base64url").slice(0, 22);
  }

  async image(id) { return imageRecord(id, await this.images.findOne({ _id: id })); }

  async manifest() {
    const documents = await this.images.find({ value: { $ne: null } }, { projection: { value: 1 } }).toArray();
    return Object.fromEntries(documents.map(document => [document._id, document.value]));
  }

  async saveImage(id, value, expectedVersion, adminId) {
    await this.images.updateOne(
      { _id: id },
      { $setOnInsert: { value: null, version: 0, updatedAt: null, history: [] } },
      { upsert: true },
    );
    const previous = await this.images.findOne({ _id: id, version: expectedVersion });
    if (!previous) throw conflict();
    const updatedAt = new Date();
    const updated = await this.images.findOneAndUpdate(
      { _id: id, version: expectedVersion },
      {
        $set: { value, updatedAt },
        $inc: { version: 1 },
        $push: { history: { $each: [{ previous: previous.value ?? null, next: value, adminId, createdAt: updatedAt }], $slice: -200 } },
      },
      { returnDocument: "after" },
    );
    if (!updated) throw conflict();
    return imageRecord(id, updated);
  }
}
