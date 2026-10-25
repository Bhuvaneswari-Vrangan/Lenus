# Lumora – Login Flow (React + Vite + Express)

An original login page ("Lumora" brand) with frontend validation, a mock Express
auth API, error handling and a redirect to a dummy dashboard.

## Structure

```
lumora-login/
├── client/   React + Vite frontend (plain CSS)
└── server/   Express backend with mock users
```

## Run it

Open two terminals.

```bash
# Terminal 1 – backend (http://localhost:5000)
cd server
npm install
npm start

# Terminal 2 – frontend (http://localhost:5173)
cd client
npm install
npm run dev
```

Open http://localhost:5173. Vite proxies `/api/*` to the Express server.

## Demo credentials

| Email              | Password       |
| ------------------ | -------------- |
| demo@lumora.dev    | Lumora@123     |
| meera@lumora.dev   | Welcome#2026   |

## Features

- Frontend validation: empty fields, invalid email, password < 6 characters
- `POST /api/login` with Axios; server re-validates and checks mock users
- 400 / 401 errors shown in an alert above the form
- Success stores a mock token and redirects to `/dashboard` (protected route)
- Logout clears the token
- Responsive layout (split screen on desktop, stacked on mobile)

## Deploying

For production, set the client's API base URL (or serve the built client from
Express) and replace the mock user list with a real database and hashed passwords.
