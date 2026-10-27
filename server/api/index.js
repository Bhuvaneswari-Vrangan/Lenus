import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Copy all your routes here - example:
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running on Vercel!' });
});

app.get('/api', (req, res) => {
  res.json({ message: 'API is working' });
});

// ADD YOUR OTHER ROUTES BELOW - copy from your old server/index.js
// app.post('/api/login', ...)
// app.get('/api/users', ...)

export default app;