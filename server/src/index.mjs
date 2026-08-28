import { createApp } from "./app.mjs";
import { loadConfig } from "./config.mjs";

process.umask(0o077);
const config = loadConfig();
const { app, store } = await createApp(config);
const server = app.listen(config.port, config.host, () => {
  console.log("Website and API: http://" + config.host + ":" + config.port);
  console.log("Admin app: /admin/ (or its separate Vite dev server)");
  if (!store.hasAdmin()) console.log("No admin account exists. Run npm --prefix server run admin:create in your terminal.");
});
server.requestTimeout = 30_000;
server.headersTimeout = 15_000;
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => server.close(() => { store.close(); process.exit(0); }));
