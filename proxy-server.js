import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = 5000

// Proxy middleware to forward requests to the football data API
app.use('/api', createProxyMiddleware({
    target: 'https://api.football-data.org/v4',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
    onProxyReq: (proxyReq) => {
      proxyReq.setHeader('X-Auth-Token', process.env.FOOTBALL_API_KEY)
    },
}))

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`)
})
