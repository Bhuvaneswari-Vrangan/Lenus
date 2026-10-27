import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Handle both /api/health and /health
app.get('/', (req, res) => res.json({ message: 'API is working' }));
app.get('/api', (req, res) => res.json({ message: 'API is working' }));
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'Server is running on Vercel!' }));

// Add your login route here so your app works
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'demo@lenus.dev' && password === 'Lenus@123') {
    return res.json({ token: 'demo-token', user: { email } });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'demo@lenus.dev' && password === 'Lenus@123') {
    return res.json({ token: 'demo-token', user: { email } });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

export default app;