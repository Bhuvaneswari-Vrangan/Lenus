import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

// Mock user store (no database needed for this project)
const USERS = [
  { id: 1, name: "Aarav", email: "demo@lenus.dev", password: "Lenus@123" },
  { id: 2, name: "Meera", email: "meera@lenus.dev", password: "Welcome#2026" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.post("/api/login", (req, res) => {
  const { email, password } = req.body || {};

  // Server-side validation (never trust the client)
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ message: "Please enter a valid email address." });
  }

  const user = USERS.find(
    (u) => u.email.toLowerCase() === String(email).toLowerCase() && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  // Mock token – in a real app this would be a signed JWT
  const token = Buffer.from(`${user.id}:${Date.now()}`).toString("base64");
  return res.json({
    message: "Login successful",
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
});

// Fallback for unknown routes
app.use((_req, res) => res.status(404).json({ message: "Not found." }));

// Central error handler (e.g. malformed JSON)
app.use((err, _req, res, _next) => {
  console.error(err.message);
  res.status(err.status || 500).json({ message: "Something went wrong." });
});

// Only listen when running locally; Vercel runs the exported app itself
if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`Lenus API running on http://localhost:${PORT}`));
}

export default app;