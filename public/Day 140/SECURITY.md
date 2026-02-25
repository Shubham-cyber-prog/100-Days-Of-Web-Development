# Security Policy

## Supported Versions

Currently supported versions for security updates:

| Version | Supported          |
| ------- | ------------------ |
| 0.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **DO NOT** open a public GitHub issue
2. Email the maintainers directly (add your email here)
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We will respond within 48 hours and work with you to address the issue.

## Security Best Practices

### Environment Variables

**DO:**
- ✅ Store all secrets in environment variables
- ✅ Use `.env.local` for local development (never commit)
- ✅ Use Supabase Secrets for Edge Function secrets
- ✅ Use different keys for development and production
- ✅ Rotate API keys regularly

**DON'T:**
- ❌ Commit `.env` or `.env.local` files
- ❌ Hard-code API keys in source code
- ❌ Share API keys in chat, email, or screenshots
- ❌ Use production keys in development
- ❌ Store secrets in frontend code

### API Keys

#### Frontend (Public)
```typescript
// OK: Public anon key (client-side)
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);
```

#### Backend (Private)
```typescript
// OK: Service role key (server-side only)
const supabase = createClient(
  Deno.env.get('SUPABASE_URL'),
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
);
```

**NEVER expose service role keys in frontend!**

### Authentication

#### Current Implementation

```typescript
// Sign in
const { data: { session }, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
});

// Protected routes check
const { data: { user }, error } = await supabase.auth.getUser(accessToken);
if (!user) {
  return new Response('Unauthorized', { status: 401 });
}
```

#### Recommendations

1. **Password Requirements**
   - Minimum 8 characters
   - Mix of uppercase, lowercase, numbers
   - Consider adding special characters
   - Implement on signup form validation

2. **Session Management**
   - Sessions expire after inactivity
   - Refresh tokens automatically
   - Clear sessions on logout
   - Don't store tokens in localStorage (use httpOnly cookies in production)

3. **Multi-Factor Authentication (Future)**
   - Add MFA support via Supabase Auth
   - SMS or authenticator app
   - Require for admin accounts

### Database Security

#### Row Level Security (RLS)

**IMPORTANT:** Enable RLS on all tables!

Example policies:

```sql
-- Users can only read their own campaigns
CREATE POLICY "Users can view own campaigns"
  ON campaigns
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only insert their own campaigns
CREATE POLICY "Users can create own campaigns"
  ON campaigns
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can only update their own campaigns
CREATE POLICY "Users can update own campaigns"
  ON campaigns
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can only delete their own campaigns
CREATE POLICY "Users can delete own campaigns"
  ON campaigns
  FOR DELETE
  USING (auth.uid() = user_id);
```

#### Data Validation

Always validate data on the backend:

```typescript
// Example validation
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateCampaign(data: any): boolean {
  return (
    typeof data.name === 'string' &&
    data.name.length > 0 &&
    data.name.length <= 100 &&
    typeof data.subject === 'string' &&
    data.subject.length > 0
  );
}
```

### Input Sanitization

Protect against injection attacks:

```typescript
// Sanitize user input
function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove HTML tags
    .substring(0, 1000); // Limit length
}

// Example usage
const campaignName = sanitizeInput(req.body.name);
```

### CORS Configuration

Current CORS setup:

```typescript
app.use("/*", cors({
  origin: "*", // ⚠️ Change in production!
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
```

**For Production:**

```typescript
app.use("/*", cors({
  origin: [
    "https://yourdomain.com",
    "https://www.yourdomain.com"
  ],
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
```

### Rate Limiting

**Recommended implementation:**

```typescript
import { rateLimiter } from 'npm:hono-rate-limiter';

// Apply to AI generation endpoint
app.use(
  '/make-server-c7b8121e/generate-email',
  rateLimiter({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // 10 requests per minute
    message: 'Too many requests, please try again later'
  })
);
```

### OpenAI API Security

1. **API Key Protection**
   - Store in Supabase Secrets only
   - Never log API keys
   - Rotate keys if compromised

2. **Request Validation**
   ```typescript
   // Validate before calling OpenAI
   if (!goal || !tone || !audience) {
     return c.json({ error: 'Missing required fields' }, 400);
   }
   
   // Limit input length to prevent abuse
   if (goal.length > 500) {
     return c.json({ error: 'Goal too long' }, 400);
   }
   ```

3. **Cost Control**
   - Monitor OpenAI usage
   - Set usage limits per user
   - Implement rate limiting
   - Cache common responses

### File Uploads (If Implemented)

If you add file upload functionality:

```typescript
// Validate file type
const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
if (!allowedTypes.includes(file.type)) {
  return c.json({ error: 'Invalid file type' }, 400);
}

// Validate file size (5MB max)
if (file.size > 5 * 1024 * 1024) {
  return c.json({ error: 'File too large' }, 400);
}

// Sanitize filename
const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
```

### XSS Prevention

Protect against Cross-Site Scripting:

1. **React automatically escapes content**
   ```tsx
   // Safe by default
   <div>{userContent}</div>
   ```

2. **Dangerous HTML (avoid if possible)**
   ```tsx
   // Only if absolutely necessary
   <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
   ```

3. **Use DOMPurify for HTML sanitization**
   ```typescript
   import DOMPurify from 'dompurify';
   const clean = DOMPurify.sanitize(dirty);
   ```

### CSRF Protection

For forms with state-changing operations:

1. Use POST/PUT/DELETE (not GET)
2. Verify Authorization header
3. Consider implementing CSRF tokens for cookies

### Security Headers

Add security headers to responses:

```typescript
app.use('*', async (c, next) => {
  await next();
  
  c.header('X-Content-Type-Options', 'nosniff');
  c.header('X-Frame-Options', 'DENY');
  c.header('X-XSS-Protection', '1; mode=block');
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin');
  c.header(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'"
  );
});
```

### Logging & Monitoring

**DO log:**
- ✅ Failed authentication attempts
- ✅ API errors with context
- ✅ Rate limit violations
- ✅ Unusual activity patterns

**DON'T log:**
- ❌ Passwords
- ❌ API keys
- ❌ Access tokens
- ❌ Sensitive user data

```typescript
// Good logging
console.log('Failed login attempt for email:', email);

// Bad logging
console.log('Login attempt:', email, password); // ❌ Never log passwords!
```

### Dependency Security

1. **Keep dependencies updated**
   ```bash
   pnpm update
   ```

2. **Audit for vulnerabilities**
   ```bash
   pnpm audit
   ```

3. **Use specific versions**
   - Pin major versions in package.json
   - Test updates in development first

4. **Review dependencies**
   - Only install trusted packages
   - Check package popularity and maintenance
   - Review package permissions

### Deployment Security

#### Vercel/Netlify

1. **Environment Variables**
   - Set via dashboard (never in code)
   - Use different values for preview/production

2. **Access Control**
   - Limit team member permissions
   - Use preview deployments for testing
   - Protect production branch

#### Supabase

1. **Database**
   - Enable RLS on all tables
   - Use service role key only in Edge Functions
   - Regular backups

2. **Edge Functions**
   - Use secrets for all API keys
   - Review logs regularly
   - Monitor invocations

3. **Authentication**
   - Enable email verification (when configured)
   - Set password requirements
   - Configure session timeout

### Incident Response

If a security breach occurs:

1. **Immediate Actions**
   - Rotate all API keys
   - Force logout all users
   - Disable affected features
   - Review logs for impact

2. **Investigation**
   - Determine scope of breach
   - Identify affected users
   - Document timeline

3. **Notification**
   - Notify affected users
   - Report to authorities if required
   - Publish incident report

4. **Prevention**
   - Fix vulnerability
   - Add tests
   - Update security measures
   - Review similar issues

### Security Checklist

Before deploying to production:

- [ ] All secrets in environment variables
- [ ] `.env` files in `.gitignore`
- [ ] Row Level Security enabled
- [ ] CORS configured for production domains
- [ ] Rate limiting implemented
- [ ] Input validation on all endpoints
- [ ] Error messages don't leak sensitive info
- [ ] HTTPS only (no HTTP)
- [ ] Security headers configured
- [ ] Dependencies audited
- [ ] Authentication tested
- [ ] Logs reviewed (no sensitive data)
- [ ] Backup strategy in place
- [ ] Monitoring configured

### Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Supabase Security](https://supabase.com/docs/guides/platform/security)
- [React Security Best Practices](https://snyk.io/blog/10-react-security-best-practices/)
- [OpenAI API Safety](https://platform.openai.com/docs/guides/safety-best-practices)

### Contact

For security concerns, contact: [your-security-email@example.com]

---

**Remember:** Security is an ongoing process, not a one-time task. Regularly review and update security measures as the application evolves.

Last updated: February 20, 2026
