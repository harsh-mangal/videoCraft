# Node.js backend

Express API, MongoDB persistence, image processing, public HTML rendering and static delivery of the two independent React builds. Requires Node.js 24+, MongoDB, and persistent writable storage for uploaded images. The local verification used Node 26.5.1; CI targets Node 24 and MongoDB 8.

## First run

From the repository root, install the root tooling and all three application packages and run npm run build:all (see the root README). Start a local MongoDB server on `mongodb://127.0.0.1:27017` or configure `MONGODB_URI`, then:

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
PORT=4691
MONGODB_URI=mongodb+srv://application-user:replace-with-a-secret@your-cluster.example/videocrafts?retryWrites=true&w=majority
MONGODB_DB=videocrafts
PUBLIC_ORIGIN=https://www.videocraftsindia.com
API_ORIGIN=https://api.videocraftsindia.com
ADMIN_ORIGINS=https://admin.videocraftsindia.com
DATA_DIR=/srv/videocrafts-data
MAX_STORAGE_MB=1024
TRUST_PROXY_HOPS=1
```

`MONGODB_URI` is mandatory in production and must remain a server-side secret. Use a dedicated database user with access only to the configured database, require TLS, and restrict network access to the API host. `MONGODB_DB` defaults to `videocrafts`.

Keep the three web origins synchronized with `client/src/config/urls.js` and `admin/src/config.js`, then rebuild after a domain change. Every origin must omit paths and trailing slashes. The code uses these production origins by default when `NODE_ENV=production`; explicit values are recommended so deployment configuration remains visible.

- Terminate TLS at a trusted reverse proxy. Route `api.videocraftsindia.com/api/*` and `api.videocraftsindia.com/media/*` to the loopback Node port. Route the `www` host to Node as well when current image replacements must be present in initial HTML and social metadata. Publish `admin/dist/` at the root of `admin.videocraftsindia.com`. Set the proxy's upload body limit to at least 13 MB; the API enforces a 12 MB file limit.
- Set TRUST_PROXY_HOPS=1 only when exactly one trusted proxy is in front of Node. Keep the Node port inaccessible from the public network so clients cannot spoof the proxy chain. Otherwise use 0.
- All production origins use HTTPS. The public `GET /api/media` endpoint allows cross-origin reads without credentials; authenticated admin routes accept credentialed CORS only from the configured origins. The secure, HttpOnly, SameSite=Strict cookie remains host-only on `api.videocraftsindia.com`; the sibling `admin` subdomain is same-site, while `credentials: include`, Origin checks and CSRF tokens protect authenticated changes.
- Use a process supervisor supplied by your host. Restart on code deployments and monitor disk usage/errors. The app performs graceful shutdown on SIGTERM/SIGINT.
- Build on the target platform. Do not copy macOS node_modules to a Linux server; Sharp uses platform-specific packages.
- Keep the whole project layout or equivalent configured build paths. Only assets and public routes are served; MongoDB credentials, source, .env and server/site-renderer are not public directories.

Old static Apache/Netlify configurations remain for read-only snapshots. They do not replace the Node runtime needed by this admin. MongoDB can be managed remotely, but an ephemeral/serverless filesystem is still unsuitable for uploaded WebP files unless `/media` is moved to object storage.

## Stored data and backups

MongoDB collections contain:

| Collection | Purpose |
| --- | --- |
| admins | Admin email addresses and password hashes |
| sessions | Expiring authenticated sessions; a TTL index removes expired records |
| images | Image overrides, optimistic versions and the latest 200 history entries per image |
| attempts | Login/edit rate limits; a TTL index removes expired windows |

`DATA_DIR` now contains only `uploads/`, which holds generated public WebP variants named with random IDs. Back up MongoDB and the **entire DATA_DIR** to private storage, and test restoration of both. Keep the upload directory outside deployment/build folders and preserve it between releases. For Atlas, configure an appropriate snapshot or continuous-backup policy rather than assuming the provider retains every accidental deletion.

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
- Data: MongoDB driver queries, unique/TTL indexes, atomic optimistic version checks and bounded per-image history.
- Serving: security headers/CSP, private directory isolation, no directory listing, immutable uploaded/hashed asset URLs, revalidated HTML.

These protections follow [Express security guidance](https://expressjs.com/en/advanced/best-practice-security.html). Database connectivity uses the [official MongoDB Node.js driver](https://www.mongodb.com/docs/drivers/node/current/connect/mongoclient/), and expired sessions/rate-limit windows use [MongoDB TTL indexes](https://www.mongodb.com/docs/manual/core/index-ttl/). Image validation uses [Sharp's input limits](https://sharp.pixelplumbing.com/api-constructor/). This is an implemented and tested baseline, not a penetration-test certification.

Tests use a uniquely named temporary MongoDB database and synthetic images, then remove both. Set `MONGODB_TEST_URI` to a disposable Mongo deployment; when it is absent, the test runner starts the local `mongod` binary. Tests never use the production database. Run npm --prefix server test after building both frontends. Production hosting, TLS/DNS, backups, real credentials and ongoing monitoring must still be configured by the owner.
