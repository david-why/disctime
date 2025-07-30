import app from './index'

// For local development with Bun
export default {
  port: 3000,
  fetch: app.fetch,
}
