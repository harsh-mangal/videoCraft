# Node.js backend

Express API, SQLite data, image processing, public HTML rendering and static delivery of the two independent React builds. Requires Node.js 24+ and persistent writable disk. The local verification used Node 26.5.1; CI targets Node 24.

## First run

From the repository root, install the root tooling and all three application packages and run npm run build:all (see the root README), then:

```sh
npm --prefix server run admin:create
npm --prefix server start
```

The account command runs interactively with hidden password input. There is no public sign-up endpoint or default account. To reset an existing account's password and revoke its sessions:

```sh
npm --prefix server run admin:create -- --reset
```

Run this on the server that owns the database. Do not send passwords in command arguments, commit them, or place them in a frontend environment variable.

## Production configuration

Copy server/.env.example to server/.env and set real values:

```dotenv
NODE_ENV=production
HOST=127.0.0.1
PORT=3001
PUBLIC_ORIGIN=https://www.videocraftsindia.com
ADMIN_ORIGINS=https://www.videocraftsindia.com
DATA_DIR=/srv/videocrafts-data
MAX_STORAGE_MB=1024
TRUST_PROXY_HOPS=1
```

Keep these origins synchronized with the site's canonical SITE_URL in client/src/config/seo.js and rebuild after any domain change. Both values must be exact origins without a trailing path.

- Terminate TLS at a trusted reverse proxy and forward the site to the loopback Node port. Forward /admin, /api and /media along with public page routes. Set the proxy's upload body limit to at least 13 MB; the API enforces a 12 MB file limit.
- Set TRUST_PROXY_HOPS=1 only when exactly one trusted proxy is in front of Node. Keep the Node port inaccessible from the public network so clients cannot spoof the proxy chain. Otherwise use 0.
- PUBLIC_ORIGIN is mandatory HTTPS in production. Secure, HttpOnly, SameSite=Strict cookies are used. Serve the admin under /admin/ on the same origin; do not put it on an unrelated domain without designing appropriate cookie/CORS behavior.
- Use a process supervisor supplied by your host. Restart on code deployments and monitor disk usage/errors. The app performs graceful shutdown on SIGTERM/SIGINT.
- Build on the target platform. Do not copy macOS node_modules to a Linux server; Sharp uses platform-specific packages.
- Keep the whole project layout or equivalent configured build paths. Only assets and public routes are served; the database, source, .env and server/site-renderer are not public directories.

Old static Apache/Netlify configurations remain for read-only snapshots. They do not replace the Node runtime needed by this admin. An ephemeral/serverless filesystem is not suitable for this SQLite/uploads setup.

## Stored data and backups

DATA_DIR defaults to server/data/ and contains:

| Path | Purpose |
| --- | --- |
| videocrafts.sqlite and SQLite sidecars | Admin password hashes, expiring sessions, image overrides, revisions, edit history, rate-limit records |
| uploads/ | Generated public WebP variants, named with random IDs |

Back up the **entire DATA_DIR** to private storage. Stop the service while taking a simple filesystem copy so SQLite and its sidecars are consistent; for online backups use SQLite's supported backup mechanism. Test a restore before relying on backups. Keep the directory outside deployment/build folders and preserve it between releases.

Old uploaded variants are retained so existing cached pages continue to load. The UI restores the original ImageKit image, not an arbitrary past upload. Review storage usage and archive obsolete versions through an operator-maintained process; do not blindly delete files referenced in the database or edit history. The default storage budget is 1 GB and includes retained variants. Existing originals remain on ImageKit and depend on that account/CDN remaining available.

## API

| Method | Route | Purpose |
| --- | --- | --- |
| GET | /api/health | Basic liveness response |
| GET | /api/media | Public image overrides and revision (no user data) |
| POST | /api/admin/login | JSON email/password; sets session cookie |
| GET | /api/admin/session | Current admin email and CSRF token |
| POST | /api/admin/logout | Revoke current session |
| GET | /api/admin/images | Catalog, usage groups, current overrides and versions |
| PUT | /api/admin/images/:id | Multipart image file and optional alt field |
| PATCH | /api/admin/images/:id | JSON alt text update |
| POST | /api/admin/images/:id/restore | Restore original image and default alt |

All mutations require an exact allowed Origin. Except login, they also require an authenticated cookie and X-CSRF-Token. Image mutations require a quoted version header, e.g. If-Match: "2". Conflicts return 409 instead of overwriting newer changes. Unknown image IDs cannot be created by the client.

Uploads accept one still JPEG/PNG/WebP, up to 12 MB and 40 megapixels. Signatures and decoded types are validated, EXIF orientation is applied, metadata is stripped, and images are resized within 2400 × 2400 with smaller variants. Arbitrary external URLs are not fetched, and SVG/executable files are not accepted.

## Security and verification

- Passwords: salted scrypt; no plaintext password storage.
- Sessions: random tokens stored as hashes, eight-hour expiry, persistent across restarts, revoked on logout/password reset.
- Requests: CSRF token plus Origin checks, strict cookie settings, login/edit rate limits and bounded concurrent processing.
- Data: parameterized SQLite queries, version checks and transactional revision/history updates.
- Serving: security headers/CSP, private directory isolation, no directory listing, immutable uploaded/hashed asset URLs, revalidated HTML.

These protections follow [Express security guidance](https://expressjs.com/en/advanced/best-practice-security.html). SQLite behavior is based on [Node's SQLite API](https://nodejs.org/api/sqlite.html), which is still marked experimental on some Node 24 releases. Image validation uses [Sharp's input limits](https://sharp.pixelplumbing.com/api-constructor/). This is an implemented and tested baseline, not a penetration-test certification.

Tests use a temporary database and synthetic images. They do not modify the real server/data directory. Run npm --prefix server test after building both frontends. Production hosting, TLS/DNS, backups, real credentials and ongoing monitoring must still be configured by the owner.
