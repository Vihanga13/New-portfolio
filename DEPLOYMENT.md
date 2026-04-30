# Deployment Guide - Vihanga Portfolio

## Quick Deployment (Choose One)

### Option 1: Vercel (Recommended - Easiest)
```bash
npm install -g vercel
vercel
```
✅ Automatic deployments from GitHub
✅ Environment variables support
✅ Free tier includes custom domain
⏱️ Time: 2 minutes

### Option 2: Netlify (Popular)
```bash
npm run build
# Then drag 'dist' folder to Netlify
```
Or connect GitHub:
```bash
# Go to netlify.com
# Connect GitHub repo
# Build command: npm run build
# Publish directory: dist
```
✅ Continuous deployment
✅ Free SSL certificate
✅ Form submissions support
⏱️ Time: 5 minutes

### Option 3: GitHub Pages (Free)
```bash
# Update vite.config.js:
# base: '/portfolio/',

npm run build
# Push dist to gh-pages branch
```
✅ Completely free
✅ GitHub integration
❌ Slower builds
⏱️ Time: 10 minutes

---

## Detailed Deployment Instructions

### Vercel Deployment

#### Step 1: Sign Up
1. Visit https://vercel.com
2. Sign up with GitHub (recommended)
3. Authorize Vercel

#### Step 2: Import Project
1. Click "New Project"
2. Select your GitHub repository
3. Click "Import"

#### Step 3: Configure
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**: Add any needed (see step 5)

#### Step 4: Deploy
Click "Deploy" - automatically builds and deploys

#### Step 5: Add Custom Domain
1. Go to project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS instructions

#### Redeploy on Changes
Automatically redeploys when you push to GitHub

### Netlify Deployment

#### Method 1: Connect Git Repository (Recommended)

1. **Sign Up**
   - Visit https://netlify.com
   - Sign up with GitHub

2. **Connect Repository**
   - Click "New site from Git"
   - Select GitHub
   - Find and select your repo

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Leave other fields default

4. **Deploy**
   - Click "Deploy site"
   - Wait for build (~1 minute)
   - Get automatic domain

#### Method 2: Manual Deployment

1. **Build Locally**
   ```bash
   npm run build
   ```

2. **Deploy Folder**
   - Open https://netlify.com
   - Drag & drop `dist` folder
   - Get instant deployment

3. **Connect Domain**
   - Site settings → Domain management
   - Add custom domain

### GitHub Pages Deployment

#### Step 1: Update Configuration

Edit `vite.config.js`:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/portfolio/',  // ← Change to your repo name
  plugins: [react()],
  // ... rest of config
})
```

#### Step 2: Build Project
```bash
npm run build
```

#### Step 3: Deploy

**Option A: Using GitHub CLI**
```bash
# Install GitHub CLI if not already installed
# gh repo create --source=dist --remote=origin --push
```

**Option B: Manual**
1. Copy contents of `dist` folder
2. Go to GitHub repository settings
3. Enable GitHub Pages
4. Select `gh-pages` branch as source

#### Step 4: Access Your Site
```
https://username.github.io/portfolio/
```

---

## Configuration for Each Platform

### Environment Variables

If you need environment variables (API keys, etc.):

**Create `.env.local`:**
```
VITE_API_URL=https://api.example.com
VITE_PROJECT_ID=12345
```

**Use in code:**
```jsx
const apiUrl = import.meta.env.VITE_API_URL
```

**Add to hosting platform:**
- Vercel: Settings → Environment Variables
- Netlify: Site settings → Build & deploy → Environment

### Build Configuration

The `vite.config.js` is already optimized:

```js
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'gsap': ['gsap']  // ← Separate GSAP for caching
      }
    }
  }
}
```

### Performance Settings

All platforms automatically handle:
- ✅ Gzip compression
- ✅ Image optimization
- ✅ CSS minification
- ✅ JS minification
- ✅ Caching headers

---

## Custom Domain Setup

### Step 1: Buy Domain
- GoDaddy
- Namecheap
- Google Domains
- Vercel (integrated)

### Step 2: Point Domain to Host

**For Vercel:**
1. Project Settings → Domains
2. Add your domain
3. Copy Vercel nameservers
4. Update domain registrar nameservers

**For Netlify:**
1. Site settings → Domain management
2. Add custom domain
3. Follow DNS configuration

**For GitHub Pages:**
1. Add custom domain in repo settings
2. Create `CNAME` file in root with domain name
3. Update DNS A record to GitHub IP

### DNS Records (if needed)

```
Type: A
Value: Points to hosting provider's IP

OR

Type: CNAME
Value: Points to hosting provider's domain
```

---

## Testing Before Deployment

### Local Build Testing
```bash
npm run build
npm run preview
```
Visit `http://localhost:4173`

### Checklist
- [ ] All pages load
- [ ] Images display
- [ ] Animations work
- [ ] Forms functional
- [ ] Mobile responsive
- [ ] No console errors

### Performance Audit
1. Run build: `npm run build`
2. Check file sizes:
   ```bash
   du -sh dist/
   ```
3. Use Lighthouse (Chrome DevTools)

---

## Common Issues & Solutions

### Build Fails
**Problem:** `npm run build` errors

**Solution:**
```bash
npm install
npm run build
```

If still failing, check:
- Node.js version (need 16+)
- All imports are correct
- No missing dependencies

### Images Not Loading
**Problem:** 404 errors on images

**Solution:**
- Ensure images in `public/images/`
- Paths use `/images/filename` (not relative)
- Check file name capitalization

### Site Very Slow
**Problem:** Slow page loads

**Solution:**
- Compress images to <100KB
- Check bundle size: `npm run build`
- Use DevTools Performance tab
- Enable caching in platform settings

### Form Not Submitting
**Problem:** Contact form doesn't work

**On Netlify:**
- Add `netlify` attribute to form
- Set up form notifications

```jsx
<form name="contact" method="POST" netlify>
  {/* fields */}
</form>
```

---

## Monitoring & Maintenance

### Check Site Status
- **Vercel**: vercel.com/dashboard
- **Netlify**: netlify.com/team/overview
- **GitHub Pages**: repository settings

### View Deployment Logs
- **Vercel**: Project → Deployments → View logs
- **Netlify**: Deploys → View deploy log
- **GitHub Pages**: Actions tab

### Update Site
1. Make changes locally
2. Git push to main/master
3. Automatic redeploy starts
4. ~1-3 minutes for production

---

## Advanced: CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - name: Deploy to Vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
        run: |
          npm i -g vercel
          vercel --prod --token $VERCEL_TOKEN
```

---

## Post-Deployment

### Add Analytics (Optional)
```jsx
// In index.html before </body>
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### SEO Optimization
Update `index.html`:
```html
<meta name="description" content="Vihanga's cinematic portfolio...">
<meta name="keywords" content="design, portfolio, creative...">
<meta name="author" content="Vihanga">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### Add Sitemap (Optional)
Create `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com</loc>
    <lastmod>2026-04-30</lastmod>
  </url>
</urlset>
```

---

## Deployment Comparison

| Platform | Cost | Setup | Speed | Features |
|----------|------|-------|-------|----------|
| **Vercel** | Free | 2 min | Very Fast | Best GitHub integration |
| **Netlify** | Free | 5 min | Very Fast | Form handling included |
| **GitHub Pages** | Free | 10 min | Fast | Limited features |
| **AWS S3** | $1/mo | 15 min | Fast | Advanced options |
| **Custom VPS** | $5+/mo | 30 min | Depends | Full control |

## Recommended: Vercel

✅ Easiest setup
✅ Automatic deployments
✅ Free tier includes custom domain
✅ Excellent performance
✅ Environment variables support
✅ Preview deployments before production

---

## Still Having Issues?

1. Check platform documentation
   - Vercel: https://vercel.com/docs
   - Netlify: https://docs.netlify.com
   - GitHub Pages: https://pages.github.com

2. Review console error messages
3. Check build logs in platform dashboard
4. Verify environment variables
5. Test locally first with `npm run preview`

---

**Deployment Complete!** 🚀

Your portfolio is now live and automatically updated on every push to GitHub.

Enjoy! ✨
