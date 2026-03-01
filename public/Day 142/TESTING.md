# Sample Data for Testing

## Test User Credentials
After signing up, you can use these for testing:
- Email: test@example.com
- Password: password123

## Sample URLs for SEO Analysis
Try analyzing these websites:
1. https://example.com
2. https://github.com
3. https://stackoverflow.com
4. https://developer.mozilla.org

## Sample Content for Optimization
```
Search Engine Optimization (SEO) is the practice of improving your website's 
visibility in search engine results pages. Good SEO helps your site rank higher 
for relevant keywords, driving more organic traffic to your content.

Effective SEO involves multiple factors including keyword research, content 
quality, technical optimization, and link building. Modern SEO also requires 
attention to user experience, mobile responsiveness, and page load speed.

To improve your SEO, focus on creating high-quality content that answers user 
queries, optimize your meta tags and headings, ensure your site loads quickly, 
and build quality backlinks from reputable sources. Regular monitoring and 
adjustments based on analytics data are essential for long-term success.
```

## Sample Keywords for Tracking
- seo optimization
- keyword research
- content marketing
- digital marketing
- search engine ranking
- website traffic
- organic search
- seo tools
- backlink analysis
- technical seo

## OpenAI API Key Setup
1. Go to: https://platform.openai.com/api-keys
2. Create a new API key
3. Add it in the app when prompted
4. The key is used for AI-powered suggestions

## Testing Workflow

### 1. Sign Up Flow
- Navigate to home page
- Click "Get Started" or "Sign up"
- Enter name, email, password
- Automatically logged in after signup

### 2. Website Analysis
- Go to "Website Analyzer" from sidebar
- Enter URL (e.g., https://example.com)
- Click "Analyze"
- View results in tabs:
  - Issues (red/yellow/green indicators)
  - AI Suggestions (requires OpenAI key)
  - Details (heading structure, images)
  - Metadata (title, description)

### 3. Content Optimization
- Go to "Content Optimizer"
- Paste sample content
- Add keywords: "SEO", "optimization", "content"
- Click "Optimize Content"
- View metrics and suggestions

### 4. Keyword Tracking
- Go to "Keyword Tracker"
- Click "Add Keyword"
- Enter:
  - Keyword: "seo tools"
  - URL: "https://example.com"
  - Location: "United States"
- View keyword in list with position
- Click trash icon to delete

### 5. Technical Audit
- Go to "Technical Audit"
- View pre-populated audit results
- Check different categories:
  - Performance
  - Security
  - Mobile
  - SEO
  - Accessibility
  - Content

### 6. Reports
- Go to "Reports"
- View analysis history
- Click "Download" (shows success message)
- Click "Share" (copies link to clipboard)

### 7. Settings
- Go to "Settings"
- Update profile information
- Toggle notification preferences
- View billing plan
- Generate API key

## Expected Behaviors

### Authentication
- Logged out users redirected to login
- Logged in users redirected from login/signup to dashboard
- Session persists on refresh

### API Calls
- All protected routes require authentication
- Invalid tokens return 401
- Errors show toast notifications
- Loading states during API calls

### Dark/Light Mode
- Toggle in sidebar user section
- Preference persists across sessions
- Smooth transitions

### Responsive Design
- Mobile: Hamburger menu
- Tablet: Collapsed sidebar
- Desktop: Full sidebar
- All pages responsive

### Charts & Visualizations
- Line charts for rankings
- Area charts for traffic
- Pie charts for issue distribution
- Bar charts for comparisons

## Common Issues & Solutions

### "Failed to fetch URL"
- Website blocks CORS requests
- Try URLs that allow cross-origin: github.com, mozilla.org
- Or use demo mode with sample data

### "Configure OpenAI API key"
- AI suggestions require OpenAI API key
- App works without it but shows placeholder suggestions
- Add key for full AI functionality

### "Unauthorized"
- Session expired, log in again
- Check that accessToken is in AuthContext

### No data in dashboard
- Run at least one website analysis
- Add keywords to tracker
- Data persists in Supabase

## Performance Tips
- Keep content under 10,000 words for optimization
- Limit tracked keywords to 20-30
- Clear old reports if too many

## API Rate Limits
- Free plan: 5 analyses/month (simulated)
- Pro plan: Unlimited (requires upgrade)
- OpenAI: Subject to your OpenAI account limits
