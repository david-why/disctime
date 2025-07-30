# GitHub Actions Deployment Setup

This guide explains how to set up automatic deployment to Cloudflare Workers using GitHub Actions.

## Prerequisites

1. A Cloudflare account
2. A GitHub repository for your project
3. Your code pushed to GitHub

## Setup Steps

### 1. Get Cloudflare API Token

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
2. Click "Create Token"
3. Use the "Edit Cloudflare Workers" template or create a custom token with these permissions:
   - Account: `Cloudflare Workers:Edit`
   - Zone: `Zone Settings:Read, Zone:Read` (if using a custom domain)
4. Copy the generated API token

### 2. Get Cloudflare Account ID

1. Go to your [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Select any domain (or go to Workers & Pages)
3. On the right sidebar, you'll see your Account ID
4. Copy the Account ID

### 3. Add GitHub Secrets

1. Go to your GitHub repository
2. Click on "Settings" → "Secrets and variables" → "Actions"
3. Click "New repository secret" and add:

   **CLOUDFLARE_API_TOKEN**
   - Name: `CLOUDFLARE_API_TOKEN`
   - Value: The API token from step 1

   **CLOUDFLARE_ACCOUNT_ID**
   - Name: `CLOUDFLARE_ACCOUNT_ID`
   - Value: The Account ID from step 2

### 4. Test the Deployment

1. Push your code to the `main` (or `master`) branch
2. Go to the "Actions" tab in your GitHub repository
3. You should see the workflow running
4. Once complete, your worker will be deployed to Cloudflare

## Workflow Details

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will:

1. **Trigger on**: 
   - Push to `main` or `master` branch
   - Pull requests (for testing, but won't deploy)

2. **Steps**:
   - Checkout code
   - Setup Bun runtime
   - Install dependencies
   - Run tests (when available)
   - Build the project
   - Deploy to Cloudflare Workers (only on push to main/master)

## Environment Management

The `wrangler.toml` is configured with two environments:

- **Development**: `disctime-api-dev` (for testing)
- **Production**: `disctime-api` (for live deployment)

You can deploy to development manually with:
```bash
bun run deploy --env development
```

## Troubleshooting

### Common Issues:

1. **"Authentication error"**: Check your API token and account ID
2. **"Worker name already exists"**: Change the `name` in `wrangler.toml`
3. **"Build failed"**: Ensure all dependencies are properly listed in `package.json`

### Useful Commands:

```bash
# Deploy manually
bun run deploy

# Deploy to development environment
bunx wrangler deploy --env development

# View worker logs
bunx wrangler tail

# List your workers
bunx wrangler list
```

## Security Notes

- Never commit API tokens or account IDs to your repository
- Use GitHub secrets for all sensitive information
- Regularly rotate your API tokens
- Review the permissions on your API tokens periodically
