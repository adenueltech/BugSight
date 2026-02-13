# BugSight Deployment Guide

## Web App Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy from web directory**
```bash
cd web
vercel
```

3. **Add Environment Variables**
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Add: `GEMINI_API_KEY` with your API key

4. **Deploy to Production**
```bash
vercel --prod
```

### Option 2: Netlify

1. **Install Netlify CLI**
```bash
npm i -g netlify-cli
```

2. **Build the app**
```bash
cd web
npm run build
```

3. **Deploy**
```bash
netlify deploy --prod --dir=.next
```

4. **Set Environment Variables**
- Netlify Dashboard → Site Settings → Environment Variables
- Add: `GEMINI_API_KEY`

### Option 3: Docker

1. **Create Dockerfile in web/**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

2. **Build and run**
```bash
docker build -t bugsight-web .
docker run -p 3000:3000 -e GEMINI_API_KEY=your_key bugsight-web
```

### Option 4: Self-Hosted

1. **Build the app**
```bash
cd web
npm run build
```

2. **Start production server**
```bash
npm start
```

3. **Use PM2 for process management**
```bash
npm i -g pm2
pm2 start npm --name "bugsight" -- start
pm2 save
pm2 startup
```

## VSCode Extension Deployment

### Option 1: VSCode Marketplace (Public)

1. **Create Publisher Account**
- Go to https://marketplace.visualstudio.com/manage
- Create a publisher ID

2. **Install vsce**
```bash
npm i -g @vscode/vsce
```

3. **Login**
```bash
vsce login your-publisher-name
```

4. **Package and Publish**
```bash
cd extension
vsce package
vsce publish
```

### Option 2: Private Distribution

1. **Package the extension**
```bash
cd extension
npm run package
```

2. **Share the .vsix file**
- Upload to your website
- Share via email/Slack
- Host on GitHub releases

3. **Users install via**
- VSCode → Extensions → "..." → Install from VSIX
- Or: `code --install-extension bugsight-1.0.0.vsix`

### Option 3: Private Marketplace

1. **Azure DevOps Setup**
- Create Azure DevOps organization
- Create Personal Access Token

2. **Publish to private marketplace**
```bash
vsce publish --pat YOUR_PAT
```

## Environment Variables

### Web App
```env
# Required
GEMINI_API_KEY=your_gemini_api_key

# Optional
NEXT_PUBLIC_API_URL=https://your-domain.com
NODE_ENV=production
```

### VSCode Extension
Users configure in VSCode settings:
- `bugsight.geminiApiKey`
- `bugsight.autoExplain`

## Domain Setup

### Custom Domain on Vercel

1. **Add domain in Vercel Dashboard**
- Project Settings → Domains
- Add your domain (e.g., bugsight.dev)

2. **Configure DNS**
- Add CNAME record pointing to `cname.vercel-dns.com`
- Or A record to Vercel's IP

3. **SSL Certificate**
- Automatically provisioned by Vercel

## Monitoring & Analytics

### Web App

**Vercel Analytics**
```bash
npm install @vercel/analytics
```

Add to `layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

**Error Tracking (Sentry)**
```bash
npm install @sentry/nextjs
```

### Extension

**Telemetry (Optional)**
- Use VSCode's built-in telemetry API
- Or integrate Application Insights

## Performance Optimization

### Web App

1. **Enable caching**
```js
// next.config.js
module.exports = {
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
}
```

2. **Optimize images**
- Use Next.js Image component
- Enable image optimization

3. **Enable compression**
- Vercel handles this automatically
- For self-hosted: use nginx gzip

### Extension

1. **Minimize bundle size**
```json
// tsconfig.json
{
  "compilerOptions": {
    "removeComments": true,
    "sourceMap": false
  }
}
```

2. **Lazy load features**
- Load AI service only when needed
- Defer non-critical operations

## Security Checklist

- [ ] API keys stored in environment variables
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] Rate limiting on API routes
- [ ] Input validation on all endpoints
- [ ] CORS configured properly
- [ ] Dependencies updated regularly
- [ ] Security headers configured

## Backup & Recovery

### Web App
- Vercel: Automatic deployments from Git
- Manual: Export build artifacts

### Extension
- Version control in Git
- Tag releases: `git tag v1.0.0`
- GitHub releases for distribution

## Scaling

### Web App
- Vercel scales automatically
- For self-hosted: Use load balancer (nginx)
- Consider CDN for static assets

### API Rate Limits
- Implement rate limiting per IP
- Use Redis for distributed rate limiting
- Monitor Gemini API usage

## Troubleshooting

### Web App Won't Build
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Extension Won't Package
```bash
# Clean and rebuild
rm -rf out node_modules
npm install
npm run compile
```

### API Errors
- Check Gemini API key is valid
- Verify environment variables are set
- Check API rate limits

## Post-Deployment

1. **Test thoroughly**
   - Test all features in production
   - Verify API integration works
   - Check analytics are tracking

2. **Monitor**
   - Watch error logs
   - Monitor API usage
   - Track user feedback

3. **Update documentation**
   - Update README with live URLs
   - Add deployment date to CHANGELOG
   - Update version numbers

## Continuous Deployment

### GitHub Actions (Web App)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### GitHub Actions (Extension)

Create `.github/workflows/publish-extension.yml`:
```yaml
name: Publish Extension
on:
  release:
    types: [created]
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run compile
      - run: npx vsce publish -p ${{ secrets.VSCE_PAT }}
```

## Support

- Documentation: Check all .md files
- Issues: GitHub Issues
- Community: GitHub Discussions
- Email: support@bugsight.dev (if applicable)
