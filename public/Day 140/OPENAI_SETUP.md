# OpenAI API Key Setup Guide

This guide will help you set up your OpenAI API key for the AI email generation feature.

## ⚠️ Important: You Need a Real OpenAI API Key

The AI email generator requires a **valid OpenAI API key** that starts with `sk-` and is at least 20 characters long. Test keys like "123456" or placeholder values will not work.

## Step 1: Get Your OpenAI API Key

### Create an OpenAI Account

1. Go to [OpenAI Platform](https://platform.openai.com)
2. Sign up or log in to your account
3. Add payment method (required for API access)

### Generate API Key

1. Navigate to [API Keys page](https://platform.openai.com/account/api-keys)
2. Click **"Create new secret key"**
3. Give it a name (e.g., "Email Marketing Tool")
4. Copy the key immediately - you won't be able to see it again!
5. Your key will look like: `sk-proj-aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890...`

### API Pricing (as of 2024)

- **GPT-3.5-Turbo**: ~$0.002 per 1,000 tokens (very affordable)
- **GPT-4**: ~$0.03-0.06 per 1,000 tokens

For email generation, each request typically uses 200-500 tokens, costing only a fraction of a cent with GPT-3.5-Turbo.

## Step 2: Add API Key to Supabase

### Option 1: Using Supabase CLI (Recommended)

```bash
# Make sure you're logged in and linked to your project
supabase login
supabase link --project-ref your-project-ref

# Set the OpenAI API key
supabase secrets set OPENAI_API_KEY=sk-your-actual-key-here

# Verify it was set
supabase secrets list
```

### Option 2: Using Supabase Dashboard

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Edge Functions** → **Secrets**
4. Click **"Add new secret"**
5. Name: `OPENAI_API_KEY`
6. Value: Your OpenAI API key (starting with `sk-`)
7. Click **"Save"**

## Step 3: Redeploy Edge Function

After adding the secret, redeploy your Edge Function:

```bash
supabase functions deploy server
```

## Step 4: Test It Out

1. Open your application
2. Go to the **Email Generator** page
3. Fill in the form:
   - Campaign Goal: "Product Promotion"
   - Tone: "Professional"
   - Target Audience: "Tech professionals"
4. Click **"Generate Email"**

If everything is set up correctly, you should see an AI-generated email within a few seconds! ✨

## Troubleshooting

### Error: "OpenAI API key not configured"

**Solution:**
```bash
# Check if secret exists
supabase secrets list

# If missing, add it
supabase secrets set OPENAI_API_KEY=sk-your-key-here

# Redeploy
supabase functions deploy server
```

### Error: "Invalid OpenAI API key format"

**Cause:** You're using a test value like "123456" or a key that doesn't start with `sk-`

**Solution:**
1. Get a real API key from [OpenAI Platform](https://platform.openai.com/account/api-keys)
2. Make sure it starts with `sk-`
3. Update the secret:
   ```bash
   supabase secrets set OPENAI_API_KEY=sk-your-real-key-here
   supabase functions deploy server
   ```

### Error: "Incorrect API key provided"

**Cause:** The API key is invalid or has been revoked

**Solution:**
1. Go to [OpenAI API Keys](https://platform.openai.com/account/api-keys)
2. Check if your key is still active
3. If revoked, create a new key
4. Update in Supabase:
   ```bash
   supabase secrets set OPENAI_API_KEY=sk-new-key-here
   supabase functions deploy server
   ```

### Error: "You exceeded your current quota"

**Cause:** You've run out of OpenAI credits

**Solution:**
1. Go to [OpenAI Billing](https://platform.openai.com/account/billing)
2. Add credits or set up auto-reload
3. Wait a few minutes for the quota to refresh

### Error: "Rate limit exceeded"

**Cause:** Too many requests in a short time

**Solution:**
- Wait a minute and try again
- OpenAI has rate limits based on your usage tier
- Upgrade your OpenAI account tier for higher limits

## Security Best Practices

### ✅ DO:
- Store API key only in Supabase Secrets (server-side)
- Keep your API key private and never share it
- Rotate your API key periodically
- Monitor usage in OpenAI dashboard
- Set spending limits in OpenAI billing settings

### ❌ DON'T:
- Never commit API keys to Git
- Never expose keys in frontend code
- Never share keys in screenshots or chat
- Don't use the same key across multiple projects
- Don't use production keys in development

## Monitoring Usage

### Check OpenAI Usage

1. Go to [OpenAI Usage Dashboard](https://platform.openai.com/usage)
2. View API calls and costs
3. Set up billing alerts

### Check Supabase Logs

```bash
# View Edge Function logs
supabase functions logs server --follow
```

Or in the dashboard:
- Edge Functions → Logs

## Cost Optimization Tips

1. **Use GPT-3.5-Turbo** (not GPT-4) for cost-effective generation
   - Already configured in the app
   - Produces great results for email content

2. **Set Token Limits**
   - Current configuration generates 200-300 word emails
   - Adjust if needed to control costs

3. **Cache Results**
   - Save generated emails to avoid regenerating the same content
   - Reuse templates when possible

4. **Monitor Usage**
   - Check OpenAI dashboard regularly
   - Set up spending alerts
   - Review monthly bills

## Estimated Costs

For typical usage:

- **10 emails/day** = ~$0.03/month
- **100 emails/day** = ~$0.30/month
- **1,000 emails/day** = ~$3.00/month

Using GPT-3.5-Turbo keeps costs very low! 🎉

## Alternative: Use a Mock Mode

If you want to test without an OpenAI key, you can modify the backend to return mock data (development only):

```typescript
// In /supabase/functions/server/index.tsx
// Add this at the start of the generate-email endpoint for testing:

if (Deno.env.get("USE_MOCK_AI") === "true") {
  return c.json({
    subject: "🎉 [Mock] Exclusive Offer Just for You!",
    body: "Hi there,\\n\\nThis is a mock email generated for testing purposes...\\n\\nBest regards,\\nThe Team",
    confidenceScore: 92,
  });
}
```

Then set the environment variable:
```bash
supabase secrets set USE_MOCK_AI=true
```

**Note:** Remove this before going to production!

## Need Help?

- **OpenAI Documentation**: https://platform.openai.com/docs
- **OpenAI Support**: https://help.openai.com
- **Supabase Secrets Docs**: https://supabase.com/docs/guides/functions/secrets
- **Project Issues**: Open an issue on GitHub

## Quick Reference

### Setting Up (Complete Flow)

```bash
# 1. Get OpenAI API key from platform.openai.com
# 2. Login to Supabase
supabase login

# 3. Link project
supabase link --project-ref your-ref

# 4. Set the key
supabase secrets set OPENAI_API_KEY=sk-your-key

# 5. Deploy
supabase functions deploy server

# 6. Test in your app
# Go to Email Generator and try generating an email
```

### Checking Everything

```bash
# Check secrets
supabase secrets list

# View logs
supabase functions logs server

# Test the endpoint
curl -X POST https://your-project.supabase.co/functions/v1/make-server-c7b8121e/generate-email \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-anon-key" \
  -d '{
    "goal": "promotion",
    "tone": "professional",
    "audience": "tech professionals"
  }'
```

---

**That's it! You're ready to generate AI-powered emails! 🚀**

If you encounter any issues, check the logs and error messages - they now provide helpful instructions on how to fix the problem.
