# Render Deploy Guide — Guest folder removed

This project now needs only **2 folders**:

```txt
Client/  -> Admin + Guest QR page React app
Server/  -> Node/Express + MongoDB backend
```

The separate `Guest/` folder was removed because the QR guest page already exists inside `Client`:

```txt
/guest/home/:userId
```

## Best deployment: one Render Web Service from project root

Create **one Web Service** in Render.

```txt
Root Directory: leave empty / repository root
Build Command: npm run install:all && npm run build
Start Command: npm start
```

Add these Environment Variables in Render:

```env
PORT=10000
MONGO_URL=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=https://your-service-name.onrender.com
```

Optional frontend variables for build time:

```env
VITE_SERVER_URL=https://your-service-name.onrender.com
VITE_CLIENT_URL=https://your-service-name.onrender.com
VITE_GUEST_URL=https://your-service-name.onrender.com
```

QR links will open like this:

```txt
https://your-service-name.onrender.com/guest/home/USER_ID
```

The server already serves the React build and supports direct React routes, so QR links will not show page not found.

## Alternative: separate Server and Client services

### Server Web Service

```txt
Root Directory: Server
Build Command: npm install
Start Command: npm start
```

Server Environment:

```env
PORT=10000
MONGO_URL=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=https://your-client-url.onrender.com
```

### Client Static Site

```txt
Root Directory: Client
Build Command: npm install && npm run build
Publish Directory: dist
```

Client Environment:

```env
VITE_SERVER_URL=https://your-server-url.onrender.com
VITE_CLIENT_URL=https://your-client-url.onrender.com
VITE_GUEST_URL=https://your-client-url.onrender.com
```

For Render Static Site, add this rewrite rule in Render dashboard:

```txt
Source: /*
Destination: /index.html
Action: Rewrite
```

Then create a new guest and scan the new QR.
