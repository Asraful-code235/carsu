# Vercel Environment Variables Setup

## Required Environment Variables for Production

Add these environment variables in your Vercel dashboard:

### 1. Go to Vercel Dashboard
- Navigate to your project: https://vercel.com/dashboard
- Click on your `carsu` project
- Go to **Settings** → **Environment Variables**

### 2. Add These Variables for Production:

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=j5dsqxvw
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_VIEWER_TOKEN=skGniHRO8UQlm0OrRUaSZmtRRaP2JUt3whgz9wMr26iFTPpdevipTAruKhDCxBySCHSQXYr9aQh25tuCTrEnN1iD8m1Oiil7mtBMjr0hn4iJD0ZokUd9PunxSu9bax7eBWXxgBaC98CIew4G9yrRH6kndJpnCEeh96NuDNg5rXvvm5l51YB7

# Site URLs (replace with your actual Vercel URL)
NEXT_PUBLIC_SITE_URL=https://carsu-three.vercel.app
NEXT_PUBLIC_SANITY_STUDIO_URL=https://carsu-three.vercel.app/studio
SANITY_STUDIO_PREVIEW_ORIGIN=https://carsu-three.vercel.app
```

### 3. Alternative: Use Vercel CLI

If you have Vercel CLI installed, you can run:

```bash
vercel env add SANITY_STUDIO_PREVIEW_ORIGIN production
# Enter: https://carsu-three.vercel.app

vercel env add NEXT_PUBLIC_SITE_URL production  
# Enter: https://carsu-three.vercel.app

vercel env add NEXT_PUBLIC_SANITY_STUDIO_URL production
# Enter: https://carsu-three.vercel.app/studio
```

### 4. Redeploy

After adding the environment variables, redeploy your application:
```bash
vercel --prod
```

## How the Fix Works

The new configuration in `src/sanity/config/environment.ts` will:

1. **Development**: Use `http://localhost:3000`
2. **Production**: Automatically detect Vercel URL or use the explicit `SANITY_STUDIO_PREVIEW_ORIGIN`

This ensures that when you open Presentation Mode on your live Vercel URL, it will correctly use `https://carsu-three.vercel.app/api/draft-mode/enable` instead of the localhost URL.
