import { Hono } from 'hono'

const app = new Hono()

// Basic route
app.get('/', (c) => {
  return c.text('Hello World from Hono on Cloudflare Workers!')
})

// Health check route
app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    uptime: process.uptime?.() || 0,
    timestamp: new Date().toISOString()
  })
})

// The Most Important Route
app.get('/*', (c) => {
  if (!c.req.path.includes('=')) return c.notFound()
  const parts = c.req.path.split('/').filter(x => x)
  console.log(parts)
  return c.html(
    <html>
      <head>
        <meta property="og:title" content="Title" />
        <meta property="og:description" content={'`[' + `${parts.join(',')}` + ']`'} />
        <meta property="og:url" content="https://example.com" />
        <title>Hono on Cloudflare Workers</title>
      </head>
      <body></body>
    </html>
  )
})

// Catch-all route
app.notFound((c) => {
  return c.text('Not Found', 404)
})

export default app