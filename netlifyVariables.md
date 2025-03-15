# Netlify Environment Variables

| Variable Name | Description | Example Value | Required |
|--------------|-------------|---------------|----------|
| `VITE_API_KEY` | API key for authentication and service access | `abc123xyz789` | Yes |
| `VITE_API_URL` | Base URL for API endpoints | `https://api.example.com` | Yes |
| `NODE_VERSION` | Specify Node.js version for build | `18.x` | Yes |
| `NPM_VERSION` | Specify npm version for build | `9.x` | Yes |
| `NETLIFY_USE_YARN` | Force Netlify to use Yarn instead of npm | `true` | No |
| `BUILD_CONTEXT` | Environment context for build | `production` | No |
| `SITE_URL` | Production URL of your site | `https://your-site.netlify.app` | No |
| `DEPLOY_PRIME_URL` | URL for preview deployments | `https://branch--site.netlify.app` | No |
| `CONTEXT` | Build context (production/deploy-preview/branch-deploy) | `production` | No |
| `VITE_ANALYTICS_ID` | Analytics tracking ID | `UA-XXXXX-Y` | No |
| `DEBUG` | Enable debug mode during build | `true` | No |

## Usage

1. Create a `.env` file in your project root
2. Add these variables with your specific values
3. Add corresponding variables in your Netlify site settings
4. Ensure all required variables are set before deployment

**Note**: Variables prefixed with `VITE_` will be exposed to your application's client-side code. Be cautious with sensitive information.