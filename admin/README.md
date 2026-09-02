# Separate React admin

An independent Vite/React application for the Videocrafts image library. Uses Lucide interface icons and talks to the Node API; it never stores passwords or sessions in localStorage.

```sh
npm ci --prefix admin
npm --prefix admin run dev
```

Open http://127.0.0.1:5174/admin/. Start the backend on port 4691 separately. The Vite proxy forwards API/media requests while keeping credentials on the admin origin.

```sh
npm --prefix admin test
npm --prefix admin run build
```

Production output is `admin/dist/`. Publish that directory at **https://admin.videocraftsindia.com/**. The build uses relative asset paths, so it can also be served at `/admin/` by the local Node backend. Production requests and uploaded-image previews use **https://api.videocraftsindia.com/** with credentialed CORS, while “Back to website” opens **https://www.videocraftsindia.com/**. Public visitors do not download the admin application.

The production build includes `robots.txt` and `X-Robots-Tag: noindex, nofollow` hosting headers. Configure equivalent headers if the hosting provider does not support the generated `_headers` file.

## Features

- Private sign-in and server-side session restore/logout.
- Search, collection filters and updated-only filtering for all registered images.
- Current and replacement previews; accepted formats and upload-size guidance.
- Alt-text editing and explicit publish controls.
- Restore-original preview with a separate publish action.
- Conflict/error messages, keyboard-accessible dialogs and responsive layouts.

Originals and uploaded versions live on the backend/CDN, not in this app. Use the root and server READMEs to create the first admin account, configure HTTPS, and protect persistent storage.
