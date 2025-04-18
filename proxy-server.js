import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Serve a simple main page
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Football Tracker Proxy Server</h1>');
});

// Proxy middleware to forward requests to the football data API
app.use('/api', createProxyMiddleware({
  target: 'https://api.football-data.org/v4',
  changeOrigin: true,
  pathRewrite: { '^/api': '' },
  onProxyReq: (proxyReq, req, res) => {
    console.log('Proxying request to:', proxyReq.path);
    proxyReq.setHeader('X-Auth-Token', process.env.FOOTBALL_API_KEY);
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err.message);
    res.status(500).send('Proxy error occurred');
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log('Proxy response status:', proxyRes.statusCode);
  },
}));

const PORT = 4444;

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});