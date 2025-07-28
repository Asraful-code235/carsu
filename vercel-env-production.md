# Vercel Production Environment Variables

Add these environment variables to your Vercel project settings:

## Public Variables
```
NEXT_PUBLIC_SANITY_PROJECT_ID=j5dsqxvw
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_STUDIO_URL=https://your-domain.vercel.app/studio
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

## Private Variables
```
SANITY_VIEWER_TOKEN=skGniHRO8UQlm0OrRUaSZmtRRaP2JUt3whgz9wMr26iFTPpdevipTAruKhDCxBySCHSQXYr9aQh25tuCTrEnN1iD8m1Oiil7mtBMjr0hn4iJD0ZokUd9PunxSu9bax7eBWXxgBaC98CIew4G9yrRH6kndJpnCEeh96NuDNg5rXvvm5l51YB7
```

## How to add these to Vercel:
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add each variable with the appropriate value
5. Make sure to replace `your-domain.vercel.app` with your actual Vercel domain

## Note:
- The SANITY_VIEWER_TOKEN should have read permissions for your dataset
- Visual editing will be disabled in production to prevent WebSocket connection issues
- Live updates will only work in development mode