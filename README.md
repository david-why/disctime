# Disctime API - Hono + Cloudflare Workers

A simple web server built with [Hono](https://hono.dev/) and [Bun](https://bun.sh/) that can be deployed to Cloudflare Workers.

## Features

- 🚀 Fast development with Bun
- 🔥 Hot reload in development
- ☁️ Ready for Cloudflare Workers deployment
- 🛠️ TypeScript support
- 📦 Minimal dependencies

## Available Routes

- `GET /` - Welcome message
- `GET /api/hello` - JSON API response with timestamp and user agent
- `GET /health` - Health check endpoint
- `GET /*` - 404 handler for undefined routes

## Development

### Prerequisites

- [Bun](https://bun.sh/) installed
- [Cloudflare account](https://cloudflare.com/) (for deployment)

### Local Development

1. Install dependencies:
   ```bash
   bun install
   ```

2. Start the development server:
   ```bash
   bun run dev
   ```

3. Open http://localhost:3000 in your browser

### Available Scripts

- `bun run dev` - Start development server with hot reload
- `bun run start` - Start production server locally
- `bun run build` - Build the project
- `bun run preview` - Preview with Wrangler (simulates Cloudflare Workers)
- `bun run deploy` - Deploy to Cloudflare Workers

## Deployment to Cloudflare Workers

### Manual Deployment

1. Login to Wrangler (first time only):
   ```bash
   bunx wrangler login
   ```

2. Deploy to Cloudflare Workers:
   ```bash
   bun run deploy
   ```

3. Your API will be available at `https://disctime-api.<your-subdomain>.workers.dev`

### Automatic Deployment with GitHub Actions

This project includes a GitHub Actions workflow for automatic deployment on push to the main branch.

**Quick Setup:**
1. Get your Cloudflare API Token and Account ID
2. Add them as GitHub repository secrets:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
3. Push to main branch

📖 **For detailed setup instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)**

## Configuration

The project is configured via `wrangler.toml`. You can modify:

- `name` - Your worker's name
- `compatibility_date` - Cloudflare Workers compatibility date
- Environment variables in the `[vars]` section

## Project Structure

```
disctime/
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions deployment workflow
├── index.ts            # Main Hono application
├── dev.ts              # Local development server
├── wrangler.toml       # Cloudflare Workers configuration
├── package.json        # Project dependencies and scripts
├── DEPLOYMENT.md       # Deployment setup guide
└── README.md           # This file
```
