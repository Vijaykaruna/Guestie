# Project Cleanup Notes

- Removed the separate `Guest/` React app.
- The guest QR page is now handled inside `Client` at `/guest/home/:userId`.
- QR generation now uses `VITE_GUEST_URL`, then `VITE_CLIENT_URL`, then the current browser origin as fallback.
- Axios now uses `VITE_SERVER_URL`, then current browser origin as fallback, so one-service Render deployment works.
- Removed committed `.env` files and added `.env.example` files.
- Root install/build scripts now install and build only `Client` and `Server`.
