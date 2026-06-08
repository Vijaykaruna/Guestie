# Guest Food Ordering Module

This folder contains only the public guest side pages:

- Guest food order page
- Guest order confirmation page
- Guest order details page
- Guest review/report modal
- Guest verification modal

## Run

```bash
npm install
npm run dev
```

## Environment

Update `.env` with your backend URL:

```env
VITE_SERVER_URL=http://localhost:5000
VITE_CLIENT_URL=http://localhost:5173
VITE_GUEST_URL=http://localhost:5173
```

Guest route:

```txt
/guest/home/:userId
```
