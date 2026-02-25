# Database Schema & Architecture

## Database Provider
**Supabase** - PostgreSQL with KV Store pattern

## KV Store Key Patterns

The application uses Supabase's key-value store with the following structure:

### User Analysis History
```
Key: user:{userId}:analyses
Type: Array<Object>
Structure: [
  {
    id: string,           // analysis:{userId}:{timestamp}
    url: string,          // Analyzed URL
    score: number,        // SEO score 0-100
    date: string         // ISO timestamp
  }
]
Max Items: 50 (keeps last 50 analyses)
```

### Individual Analysis Results
```
Key: analysis:{userId}:{timestamp}
Type: Object
Structure: {
  url: string,
  score: number,
  issues: Array<{
    type: 'error' | 'warning',
    message: string,
    priority: 'high' | 'medium' | 'low'
  }>,
  title: string,
  metaDescription: string,
  headingStructure: {
    h1: number,
    h2: number,
    h3: number
  },
  imageCount: number,
  imagesWithAlt: number,
  aiSuggestions: {
    suggestions: string[]
  },
  analyzedAt: string
}
```

### User Keywords List
```
Key: user:{userId}:keywords
Type: Array<string>
Structure: [
  "keyword:{userId}:{timestamp}",
  ...
]
```

### Individual Keyword Data
```
Key: keyword:{userId}:{timestamp}
Type: Object
Structure: {
  id: string,
  keyword: string,
  url: string,
  targetLocation: string,
  addedAt: string,
  currentRank: number,      // 1-100
  previousRank: number|null,
  history: Array<{
    date: string,
    rank: number
  }>
}
```

## Authentication

### Provider
Supabase Auth with email/password

### User Object
```typescript
{
  id: string,
  email: string,
  user_metadata: {
    name: string
  },
  created_at: string,
  last_sign_in_at: string
}
```

### Session
JWT-based tokens stored in AuthContext
- `access_token` - Used for API authorization
- `refresh_token` - For session renewal
- Expires after inactivity

## API Endpoints

### Base URL
```
https://{projectId}.supabase.co/functions/v1/make-server-1a865b52
```

### Routes

#### Authentication
**POST /auth/signup**
```
Request:
{
  email: string,
  password: string,
  name?: string
}

Response:
{
  user: User
}
```

#### SEO Analysis
**POST /seo/analyze**
```
Headers: { Authorization: "Bearer {accessToken}" }

Request:
{
  url: string
}

Response: AnalysisResult (see above)
```

**GET /seo/history**
```
Headers: { Authorization: "Bearer {accessToken}" }

Response:
{
  history: Array<{
    id: string,
    url: string,
    score: number,
    date: string
  }>
}
```

#### Content Optimization
**POST /content/optimize**
```
Headers: { Authorization: "Bearer {accessToken}" }

Request:
{
  content: string,
  targetKeywords: string[]
}

Response:
{
  wordCount: number,
  charCount: number,
  sentenceCount: number,
  readabilityScore: string,
  keywordDensities: Array<{
    keyword: string,
    count: number,
    density: string
  }>,
  averageSentenceLength: string,
  optimizationSuggestions: string[],
  analyzedAt: string
}
```

#### Keyword Tracking
**POST /keywords/add**
```
Headers: { Authorization: "Bearer {accessToken}" }

Request:
{
  keyword: string,
  url: string,
  targetLocation?: string
}

Response: KeywordData (see above)
```

**GET /keywords/list**
```
Headers: { Authorization: "Bearer {accessToken}" }

Response:
{
  keywords: Array<KeywordData>
}
```

**DELETE /keywords/:id**
```
Headers: { Authorization: "Bearer {accessToken}" }

Response:
{
  success: boolean
}
```

## External APIs

### OpenAI API
**Endpoint:** https://api.openai.com/v1/chat/completions

**Used For:**
- SEO improvement suggestions
- Content optimization recommendations

**Model:** gpt-3.5-turbo

**Configuration:**
- Temperature: 0.7
- Max tokens: 500
- System role: "SEO expert"

**Request Format:**
```json
{
  "model": "gpt-3.5-turbo",
  "messages": [
    {
      "role": "system",
      "content": "You are an SEO expert..."
    },
    {
      "role": "user",
      "content": "Analyze this SEO audit..."
    }
  ],
  "temperature": 0.7,
  "max_tokens": 500
}
```

## Data Flow Diagrams

### User Registration Flow
```
User → Frontend → /auth/signup → Supabase Auth
                                → Create User
                                → Return JWT
                 ← Store in AuthContext
                 ← Navigate to Dashboard
```

### SEO Analysis Flow
```
User enters URL → Frontend → /seo/analyze
                           → Fetch URL HTML
                           → Parse & Analyze
                           → OpenAI API (suggestions)
                           → Save to KV Store
                           → Update user history
                           ← Return results
                 ← Display in UI
```

### Keyword Tracking Flow
```
User adds keyword → Frontend → /keywords/add
                             → Generate ID
                             → Create keyword data
                             → Save to KV Store
                             → Add to user's list
                             ← Return keyword
                  ← Update UI
```

## Security Measures

### Backend
- JWT validation on protected routes
- Service role key kept server-side
- Input sanitization
- Error message sanitization
- Rate limiting (Supabase default)

### Frontend
- JWT stored in memory (not localStorage)
- API keys not exposed
- HTTPS enforcement
- CORS configuration
- XSS prevention (React default)

## Scalability Considerations

### Current Limitations
- KV Store limited by Supabase plan
- No database indexing (KV store)
- Single-region deployment

### Future Improvements
- Move to relational tables for complex queries
- Add Redis caching layer
- Implement database indexes
- Multi-region deployment
- CDN for static assets
- Background job processing

## Backup & Recovery

### Data Persistence
- Supabase handles automatic backups
- Point-in-time recovery available
- Export data via API

### Disaster Recovery
- Multi-region Supabase replication (Pro)
- Regular database snapshots
- API for data export

## Monitoring

### Recommended Metrics
- API response times
- Error rates by endpoint
- Active user sessions
- Database query performance
- OpenAI API usage/costs

### Tools
- Supabase Dashboard (built-in)
- OpenAI Usage Dashboard
- Custom logging via Hono logger
- Error tracking (Sentry recommended)

## Environment Variables

### Required
```
SUPABASE_URL              - Auto-configured by Supabase
SUPABASE_SERVICE_ROLE_KEY - Auto-configured (server-only)
SUPABASE_ANON_KEY         - Auto-configured (client-safe)
OPENAI_API_KEY            - User-configured secret
```

### Optional (Future)
```
REDIS_URL                 - For caching
SENTRY_DSN               - Error tracking
ANALYTICS_ID             - Usage analytics
```

## Migration Strategy

### From KV Store to Relational

If scaling beyond KV store limits:

1. Create tables:
```sql
CREATE TABLE analyses (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  url TEXT,
  score INTEGER,
  issues JSONB,
  created_at TIMESTAMP
);

CREATE TABLE keywords (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  keyword TEXT,
  url TEXT,
  current_rank INTEGER,
  created_at TIMESTAMP
);

CREATE INDEX idx_analyses_user ON analyses(user_id);
CREATE INDEX idx_keywords_user ON keywords(user_id);
```

2. Migrate data via script
3. Update API routes
4. Deploy with feature flag

## Cost Estimation

### Supabase Free Tier
- 500MB database
- 2GB bandwidth
- 50,000 monthly active users
- Sufficient for MVP/testing

### Supabase Pro ($25/month)
- 8GB database
- 250GB bandwidth
- Unlimited users
- Recommended for production

### OpenAI Costs
- gpt-3.5-turbo: ~$0.002 per request
- Estimated: $10-50/month for 1000 users

### Total Estimated Cost
- Development: $0 (free tiers)
- Production (1000 users): ~$75/month
- Scale (10k users): ~$150-200/month
