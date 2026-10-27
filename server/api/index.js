import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.get('/api', (req, res) => res.json({ message: 'API working' }));
app.post('/api/login', (req, res) => {
  res.json({ token: 'demo', user: { email: req.body.email } });
});

export default app;