# Public website

The public React application lives here, separate from ../admin/ and ../server/.

Run these commands from the repository root:

```sh
npm ci --prefix client
npm --prefix client run dev
```

The development server opens at http://127.0.0.1:5173. Run npm --prefix server run dev in another terminal for the image API and uploaded media. Root npm start and npm run dev forward to this application.

## Files and commands

- src/ contains pages, components, styles, SEO configuration and tests.
- public/ contains static assets, crawler files and static hosting rules.
- scripts/ contains prerendering, SEO checks and the static preview server.
- npm --prefix client run build generates client/build/ and the backend renderer in server/site-renderer/. It regenerates the shared image catalog and runs SEO/HTTP checks.
- npm --prefix client test runs the public website tests.
- npm --prefix client run preview serves the static snapshot on port 4173. Use the Node server on port 3001 to verify published admin changes.
- npm --prefix client run lint uses the shared root ESLint tooling; install it with npm ci at the root first.

Keep the repository layout when building: client source uses ../shared/ image defaults, and the backend uses the client's SEO helpers. This folder is a separate application package, not a standalone copy of the whole system.

Build artifacts and node_modules are ignored. See [the root README](../README.md) for full setup, deployment and image administration.
