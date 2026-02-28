# Quick Start Guide

Get your AI-Powered Email Marketing Tool up and running in 5 minutes!

## Prerequisites

- Node.js 18 or higher
- pnpm (or npm/yarn)
- A Supabase account (free tier works fine)
- An OpenAI API key

## Step 1: Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd <your-repo-name>

# Install dependencies
pnpm install
```

## Step 2: Set Up Supabase

### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Enter project details and create

### Get Your Credentials

1. In your Supabase project, go to **Settings** → **API**
2. Copy:
   - Project URL
   - `anon` public key

### Configure Environment Variables

Create a `.env.local` file in your project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 3: Deploy the Backend

### Install Supabase CLI

```bash
# macOS
brew install supabase/tap/supabase

# Windows
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# Linux
brew install supabase/tap/supabase
```

### Link Your Project

```bash
# Login
supabase login

# Link your project (replace xxxxx with your project ref)
supabase link --project-ref xxxxx
```

Your project ref is in your Supabase URL: `https://[xxxxx].supabase.co`

### Deploy Edge Functions

```bash
supabase functions deploy server
```

### Add Your OpenAI API Key

```bash
supabase secrets set OPENAI_API_KEY=sk-your-openai-key-here
```

Or via the Supabase Dashboard:
1. Go to **Edge Functions** → **Secrets**
2. Add new secret: `OPENAI_API_KEY`

## Step 4: Run the App

```bash
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser!

## Step 5: Test It Out

1. **Sign Up**: Create a new account
2. **Generate Email**: Go to Email Generator and create your first AI email
3. **Create Campaign**: Save it as a campaign
4. **View Analytics**: Check the analytics dashboard

## Troubleshooting

### "OpenAI API key not configured" Error

Make sure you've set the secret in Supabase:

```bash
# Check if secret exists
supabase secrets list

# Set it again if needed
supabase secrets set OPENAI_API_KEY=your-key
```

### Edge Function Not Working

Check the logs:

```bash
supabase functions logs server --follow
```

### Build Errors

Clear and reinstall:

```bash
rm -rf node_modules
pnpm install
```

## Next Steps

- 📖 Read the full [README.md](README.md)
- 🚀 Check the [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
- 🤝 See [CONTRIBUTING.md](CONTRIBUTING.md) to contribute
- 🎨 Customize the design system in `/src/styles/theme.css`
- 📧 Add more email templates
- 👥 Set up team collaboration features

## Need Help?

- Check the [Supabase Documentation](https://supabase.com/docs)
- Open an issue on GitHub
- Review the Edge Function logs for errors

Happy emailing! 📧✨
