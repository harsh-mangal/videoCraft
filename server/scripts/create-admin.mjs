import { createInterface } from "node:readline/promises";
import { Writable } from "node:stream";
import { stdin, stdout } from "node:process";
import { loadConfig } from "../src/config.mjs";
import { Store } from "../src/store.mjs";
import { hashPassword } from "../src/auth.mjs";

if (!stdin.isTTY) throw new Error("Run admin:create in an interactive terminal. Password input is hidden and never written to a file.");
let hidden = false;
const output = new Writable({ write(chunk, encoding, done) { if (!hidden) stdout.write(chunk, encoding); done(); } });
const rl = createInterface({ input: stdin, output, terminal: true });
try {
  const email = (await rl.question("Admin email: ")).trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) throw new Error("Enter a valid email.");
  stdout.write("Password (14–128 characters; hidden): "); hidden = true;
  const password = await rl.question("");
  stdout.write("\nConfirm password (hidden): ");
  const confirmation = await rl.question("");
  stdout.write("\n"); hidden = false;
  if (password !== confirmation) throw new Error("Passwords do not match.");
  const hash = await hashPassword(password);
  const store = await Store.connect(loadConfig());
  try { await store.createAdmin(email, hash, process.argv.includes("--reset")); }
  finally { await store.close(); }
  console.log("Admin saved. Sign in at /admin/. No default admin credentials exist.");
} catch (error) { console.error("\n" + error.message); process.exitCode = 1; }
finally { rl.close(); }
