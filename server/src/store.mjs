import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";

export class Store {
  constructor(dataDir) {
    mkdirSync(dataDir, { recursive: true, mode: 0o700 });
    this.db = new DatabaseSync(path.join(dataDir, "videocrafts.sqlite"));
    this.db.exec(`PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;
      CREATE TABLE IF NOT EXISTS admins (id INTEGER PRIMARY KEY, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS sessions (hash TEXT PRIMARY KEY, admin_id INTEGER NOT NULL REFERENCES admins(id), csrf TEXT NOT NULL, expires INTEGER NOT NULL);
      CREATE TABLE IF NOT EXISTS images (id TEXT PRIMARY KEY, value TEXT, version INTEGER NOT NULL DEFAULT 0, updated_at TEXT);
      CREATE TABLE IF NOT EXISTS history (id INTEGER PRIMARY KEY, image_id TEXT NOT NULL, previous TEXT, next TEXT, admin_id INTEGER NOT NULL, created_at TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS revision (id INTEGER PRIMARY KEY CHECK(id=1), value INTEGER NOT NULL);
      INSERT OR IGNORE INTO revision VALUES (1,0);
      CREATE TABLE IF NOT EXISTS attempts (key TEXT PRIMARY KEY, count INTEGER NOT NULL, until INTEGER NOT NULL);`);
  }
  close() { this.db.close(); }
  user(email) { return this.db.prepare("SELECT * FROM admins WHERE email=?").get(email); }
  hasAdmin() { return !!this.db.prepare("SELECT id FROM admins LIMIT 1").get(); }
  createAdmin(email, password, reset = false) {
    if (this.user(email) && !reset) throw new Error("This admin exists. Use --reset only to replace its password and revoke sessions.");
    this.db.prepare("INSERT INTO admins(email,password) VALUES(?,?) ON CONFLICT(email) DO UPDATE SET password=excluded.password").run(email, password);
    this.db.prepare("DELETE FROM sessions WHERE admin_id=?").run(this.user(email).id);
  }
  createSession(hash, userId, csrf, expires) {
    this.db.prepare("DELETE FROM sessions WHERE expires<?").run(Date.now());
    this.db.prepare("INSERT INTO sessions VALUES(?,?,?,?)").run(hash, userId, csrf, expires);
  }
  session(hash) { return this.db.prepare("SELECT sessions.*, admins.email FROM sessions JOIN admins ON admins.id=sessions.admin_id WHERE hash=? AND expires>?").get(hash, Date.now()); }
  deleteSession(hash) { this.db.prepare("DELETE FROM sessions WHERE hash=?").run(hash); }
  attempt(key, max = 10) {
    const now = Date.now();
    this.db.prepare("DELETE FROM attempts WHERE until<?").run(now);
    this.db.prepare("INSERT INTO attempts VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1").run(key, now + 15 * 60 * 1000);
    return this.db.prepare("SELECT count FROM attempts WHERE key=?").get(key).count <= max;
  }
  revision() { return this.db.prepare("SELECT value FROM revision WHERE id=1").get().value; }
  image(id) {
    const row = this.db.prepare("SELECT * FROM images WHERE id=?").get(id);
    return row ? { ...row, value: row.value ? JSON.parse(row.value) : null } : { id, value: null, version: 0, updated_at: null };
  }
  manifest() {
    return Object.fromEntries(this.db.prepare("SELECT id,value FROM images WHERE value IS NOT NULL").all().map(row => [row.id, JSON.parse(row.value)]));
  }
  saveImage(id, value, expectedVersion, adminId) {
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const previous = this.image(id);
      if (previous.version !== expectedVersion) throw Object.assign(new Error("This image changed in another session. Refresh and review it before saving again."), { status: 409 });
      const updatedAt = new Date().toISOString();
      const json = value === null ? null : JSON.stringify(value);
      this.db.prepare("INSERT INTO images VALUES(?,?,?,?) ON CONFLICT(id) DO UPDATE SET value=excluded.value, version=excluded.version, updated_at=excluded.updated_at").run(id, json, expectedVersion + 1, updatedAt);
      this.db.prepare("INSERT INTO history(image_id,previous,next,admin_id,created_at) VALUES(?,?,?,?,?)").run(id, previous.value ? JSON.stringify(previous.value) : null, json, adminId, updatedAt);
      this.db.exec("UPDATE revision SET value=value+1 WHERE id=1; COMMIT");
      return this.image(id);
    } catch (error) { this.db.exec("ROLLBACK"); throw error; }
  }
}
