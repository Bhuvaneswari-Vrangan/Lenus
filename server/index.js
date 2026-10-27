import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// HEALTH CHECK - This must be here for Render
app.get('/', (req, res) => res.json({ message: 'Lenus API Running' }));
app.get('/api', (req, res) => res.json({ message: 'Lenus API Running' }));
app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'Server running on Render' }));
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// YOUR AUTH ROUTES
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  // Replace with your real DB logic
  if (email) {
    return res.json({ token: 'demo-token', user: { email, role: 'admin' } });
  }
  res.status(401).json({ message: 'Invalid login' });
});

app.post('/api/register', (req, res) => {
  res.json({ message: 'User registered' });
});

// IMPORTANT: This catches everything else - MUST be last
app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;