import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get('/', (req,res) => res.json({ message: 'API working' }));
app.get('/api', (req,res) => res.json({ message: 'API working' }));
app.get('/api/health', (req,res) => res.json({ status: 'ok', message: 'Live on Vercel' }));
app.get('/health', (req,res) => res.json({ status: 'ok' }));

// COPY your real routes here from old index.js
app.post('/api/login', (req,res) => {
  const { email } = req.body;
  res.json({ token: 'demo-token', user: { email, role: 'admin' } });
});

app.all('*', (req,res) => {
  res.json({ message: `Route ${req.method} ${req.path} working` });
});

export default app;