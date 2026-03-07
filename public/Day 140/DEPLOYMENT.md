# Deployment Guide

This guide will help you deploy your AI-Powered Email Marketing Tool.

## Prerequisites

- [Supabase CLI](https://supabase.com/docs/guides/cli) installed
- Supabase account
- OpenAI API key

## Supabase Setup

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in your project details
4. Wait for the project to be created

### 2. Get Your Project Credentials

1. Go to Project Settings → API
2. Copy your:
   - Project URL (e.g., `https://xxxxx.supabase.co`)
   - Anon/Public Key
3. Create a `.env.local` file in your project root:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 3. Link Your Local Project to Supabase

```bash
# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref
```

You can find your project ref in your Supabase project URL: `https://[project-ref].supabase.co`

### 4. Deploy Edge Functions

Deploy the server function:

```bash
supabase functions deploy server
```

### 5. Set Environment Secrets

Add your OpenAI API key as a secret:

```bash
supabase secrets set OPENAI_API_KEY=your_openai_api_key_here
```

Or set it via the Supabase Dashboard:
1. Go to Edge Functions → Secrets
2. Click "Add Secret"
3. Name: `OPENAI_API_KEY`
4. Value: Your OpenAI API key

### 6. Database Setup

The application uses a key-value store table that should be automatically created. If you need to create it manually:

1. Go to SQL Editor in Supabase Dashboard
2. Run this SQL:

```sql
-- The kv_store table should already exist
-- If not, the Edge Function will handle data storage
-- No manual setup required
```

## Frontend Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub

2. Go to [vercel.com](https://vercel.com)

3. Click "Import Project"

4. Select your repository

5. Configure your project:
   - Framework Preset: Vite
   - Build Command: `pnpm build`
   - Output Directory: `dist`

6. Add environment variables:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

7. Click "Deploy"

### Deploy to Netlify

1. Push your code to GitHub

2. Go to [netlify.com](https://netlify.com)

3. Click "Add new site" → "Import an existing project"

4. Select your repository

5. Configure build settings:
   - Build command: `pnpm build`
   - Publish directory: `dist`

6. Add environment variables in Site Settings → Environment Variables:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

7. Click "Deploy site"

### Deploy to Other Platforms

The app is a static site that can be deployed to any platform that supports Vite/React apps:

- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront
- Firebase Hosting
- etc.

Just build the project with `pnpm build` and deploy the `dist` folder.

## Post-Deployment

### 1. Update CORS Settings (if needed)

If you encounter CORS issues, update your Supabase Edge Function to allow your domain:

In `/supabase/functions/server/index.tsx`, update the CORS configuration:

```typescript
app.use(
  "/*",
  cors({
    origin: ["https://your-domain.com", "http://localhost:5173"],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);
```

Then redeploy:

```bash
supabase functions deploy server
```

### 2. Test Your Deployment

1. Visit your deployed URL
2. Sign up for a new account
3. Try generating an email
4. Check that all features work correctly

### 3. Configure Authentication (Optional)

To enable social login (Google, GitHub, etc.):

1. Go to Supabase Dashboard → Authentication → Providers
2. Enable the providers you want
3. Follow the setup instructions for each provider
4. Update your login page to include social login buttons

## Monitoring

### View Logs

```bash
# View Edge Function logs
supabase functions logs server --follow
```

Or view logs in the Supabase Dashboard:
- Edge Functions → Logs

### Analytics

Monitor your application:
- Supabase Dashboard → Analytics
- Edge Functions → Invocations
- Authentication → Users

## Troubleshooting

### Edge Function Issues

If your Edge Function isn't working:

1. Check the logs:
```bash
supabase functions logs server
```

2. Verify environment variables:
```bash
supabase secrets list
```

3. Test locally:
```bash
supabase functions serve server
```

### Build Issues

If your build fails:

1. Clear node_modules and reinstall:
```bash
rm -rf node_modules
pnpm install
```

2. Try building locally:
```bash
pnpm build
```

3. Check for TypeScript errors

### API Key Issues

If you get "OpenAI API key not configured" error:

1. Verify the secret is set:
```bash
supabase secrets list
```

2. Re-set the secret:
```bash
supabase secrets set OPENAI_API_KEY=your_key
```

3. Redeploy the function:
```bash
supabase functions deploy server
```

## Updating Your Deployment

When you make changes:

1. If frontend changes only:
   - Push to GitHub
   - Your platform (Vercel/Netlify) will auto-deploy

2. If backend (Edge Function) changes:
   ```bash
   supabase functions deploy server
   ```

3. If database changes:
   - Apply migrations via Supabase Dashboard or CLI

## Security Checklist

- ✅ Never commit `.env` files
- ✅ Use environment variables for all secrets
- ✅ Enable Row Level Security (RLS) in Supabase
- ✅ Keep dependencies updated
- ✅ Use HTTPS only in production
- ✅ Validate user input on the backend
- ✅ Rate limit API endpoints if needed

## Support

If you encounter issues:

1. Check the [Supabase Documentation](https://supabase.com/docs)
2. Check the [Vite Documentation](https://vitejs.dev/guide/)
3. Open an issue in the GitHub repository
4. Check Edge Function logs for errors

Good luck with your deployment! 🚀
