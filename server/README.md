# Node.js API

Express API for authentication, MongoDB-backed image metadata, upload processing, optional Cloudflare R2 storage, and optional delivery of prebuilt public/admin files. It does not import the public frontend source and can be deployed as a standalone `server/` directory.

## Start

```sh
npm ci --prefix server
npm --prefix server run admin:create
npm --prefix server start
```

Node.js 22.19 or newer is supported; the repository and CI use Node.js 24. MongoDB is required.

## Production environment

```dotenv
NODE_ENV=production
HOST=127.0.0.1
PORT=4691
MONGODB_URI=mongodb+srv://application-user:secret@cluster.example/videocrafts?retryWrites=true&w=majority
MONGODB_DB=videocrafts
PUBLIC_ORIGIN=https://www.videocraftsindia.com
API_ORIGIN=https://api.videocraftsindia.com
ADMIN_ORIGINS=https://admin.videocraftsindia.com
TRUST_PROXY_HOPS=1

R2_ACCOUNT_ID=your-cloudflare-account-id
R2_ACCESS_KEY_ID=your-r2-access-key
R2_SECRET_ACCESS_KEY=your-r2-secret
R2_BUCKET=videocrafts-media
MEDIA_PUBLIC_ORIGIN=https://media.videocraftsindia.com
R2_PREFIX=videocrafts

SITE_REBUILD_WEBHOOK=https://your-static-host.example/deploy-hook
SITE_REBUILD_TOKEN=optional-bearer-token
```

`MONGODB_URI`, R2 credentials, rebuild tokens and admin credentials are server secrets. Never put them in client/admin environment files or commit them.

If R2 is not configured, uploads use `DATA_DIR/uploads` with `MAX_STORAGE_MB` as a local persistent-disk fallback. R2 is recommended for production. Connect the bucket to the custom media domain; do not use the rate-limited `r2.dev` address for production delivery.

The API can optionally serve generated builds:

```dotenv
SITE_DIR=/var/www/videocrafts-client/build
ADMIN_DIR=/var/www/videocrafts-admin/dist
```

No frontend source, renderer bundle or sibling `client/src` path is required.

## First admin through Postman

Generate a one-time secret:

```sh
openssl rand -hex 32
```

Temporarily set `ADMIN_SETUP_TOKEN`, restart the API, then send:

```http
POST https://api.videocraftsindia.com/api/admin/setup
Origin: https://admin.videocraftsindia.com
Content-Type: application/json
X-Admin-Setup-Token: paste-the-one-time-secret
```

```json
{
  "email": "your-admin@example.com",
  "password": "a-private-password-of-at-least-14-characters"
}
```

Remove `ADMIN_SETUP_TOKEN` and restart immediately after the successful `201` response. Later password resets use:

```sh
npm --prefix server run admin:create -- --reset
```

## Media lifecycle

Uploads accept one still JPEG, PNG or WebP image. The browser admin accepts up to 50 MB and sends a compressed WebP; the API applies its own 12 MB and 40-megapixel limits. Sharp validates decoding, applies orientation, strips metadata, bounds the source to 2400 × 2400 and generates responsive AVIF and WebP variants.

R2 objects use random versioned names, a custom media domain and one-year immutable caching. MongoDB stores the current manifest, alt text, optimistic version and a bounded history. Existing objects are retained so previously cached pages do not break.

To migrate all registered originals from ImageKit into R2:

```sh
npm --prefix server run media:migrate:r2
```

The command skips entries already on `MEDIA_PUBLIC_ORIGIN`. It updates MongoDB as each image succeeds, so an interrupted run can be resumed. Rebuild and verify the public site before retiring the old image account.

Publishing an image or alt-text change queues `SITE_REBUILD_WEBHOOK` after a short debounce. The static host then builds with `MEDIA_MANIFEST_URL=https://api.videocraftsindia.com/api/media`, embedding current media into the page HTML and social metadata. If no hook is configured, the admin explicitly tells the operator that a public rebuild is required.

## API

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/health` | Liveness response |
| GET | `/api/media` | Public build-time media manifest |
| POST | `/api/admin/setup` | Explicitly enabled one-time account setup |
| POST | `/api/admin/login` | Sign in and create the secure session cookie |
| GET | `/api/admin/session` | Current admin and CSRF token |
| POST | `/api/admin/logout` | Revoke the current session |
| GET | `/api/admin/images` | Editable catalog and current values |
| PUT | `/api/admin/images/:id` | Publish a replacement image |
| PATCH | `/api/admin/images/:id` | Publish alt text |
| POST | `/api/admin/images/:id/restore` | Restore the catalog original |

Mutations require an exact allowed Origin, authenticated HttpOnly session cookie, CSRF token and quoted `If-Match` version. Login/edit attempts are rate limited in MongoDB. Unknown catalog IDs cannot be created by the browser.

## Operations and security

- Terminate HTTPS at a trusted reverse proxy and keep the Node port private.
- Set `TRUST_PROXY_HOPS=1` only when exactly one trusted proxy is present.
- Give the MongoDB application user access only to this database and restrict its network access.
- Give the R2 key access only to the media bucket.
- Back up MongoDB; when using local media fallback, back up the complete `DATA_DIR` too.
- Build Sharp dependencies on the target platform rather than copying macOS `node_modules` to Linux.
- Deploy both `server/shared/media-catalog.json` and `server/shared/site-routes.json` with the API.
- Monitor failed deploy hooks, upload errors, storage usage and authentication rate limits.

Run `npm --prefix server test` after the public/admin builds. Tests use a disposable database and synthetic images.
