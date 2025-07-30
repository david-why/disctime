import { Hono } from 'hono'

const app = new Hono()

// Basic route
app.get('/', (c) => {
  return c.text('Hello World from Hono on Cloudflare Workers!')
})

// API route
app.get('/api/hello', (c) => {
  return c.json({
    message: 'Hello from the API!',
    timestamp: new Date().toISOString(),
    userAgent: c.req.header('User-Agent') || 'unknown'
  })
})

// Health check route
app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    uptime: process.uptime?.() || 0,
    timestamp: new Date().toISOString()
  })
})

// Catch-all route
app.notFound((c) => {
  return c.text('Not Found', 404)
})

export default app