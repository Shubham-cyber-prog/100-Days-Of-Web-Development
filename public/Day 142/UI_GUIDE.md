# 🎨 Visual UI Guide

## Page-by-Page Breakdown

### 1. 🏠 Landing Page (/)
**First impression - Marketing site**

**Header:**
- Logo (Target icon + "SEO Pro")
- Navigation links (Features, Pricing, Testimonials)
- Login button
- Get Started button (primary CTA)

**Hero Section:**
- Badge: "AI-Powered SEO Optimization"
- Large headline with gradient text
- Subtitle explaining value proposition
- Two CTA buttons: "Start Free Trial" + "View Demo"
- Trust indicators: "No credit card", "14-day trial", "Cancel anytime"

**Features Section (6 cards):**
Each with icon, title, description:
1. Website SEO Analyzer - Search icon
2. Content Optimization - FileText icon
3. Keyword Tracking - TrendingUp icon
4. Technical SEO Audit - BarChart icon
5. AI Suggestions - Sparkles icon
6. Performance Reports - LineChart icon

**Pricing Section (3 tiers):**
- Free: $0 - Basic features
- Pro: $29/month - "Most Popular" badge
- Enterprise: $99/month - Advanced features

**Testimonials (3 cards):**
- Profile avatar (initials)
- Quote
- Name, role, company

**Footer:**
- Logo + description
- Product links
- Company links
- Legal links
- Copyright notice

---

### 2. 🔐 Login Page (/login)
**Clean authentication screen**

- Centered card (max-width 400px)
- Logo icon at top
- "Welcome back" title
- Email input field
- Password input field
- "Sign In" button (full-width)
- Link to signup: "Don't have an account? Sign up"
- Gradient background

---

### 3. ✍️ Signup Page (/signup)
**New user registration**

- Similar layout to login
- "Create your account" title
- Name input field (new)
- Email input field
- Password input field (min 6 chars)
- "Create Account" button
- Link to login: "Already have an account? Sign in"

---

### 4. 📊 Dashboard (/dashboard)
**Main control center**

**Top Stats (4 cards in grid):**
1. Average SEO Score - Progress bar, score out of 100
2. Keyword Rankings - +18% green indicator
3. Organic Traffic - 8.5K with growth percentage
4. Active Issues - 23 issues with "3 Critical"

**Charts Row (2 columns):**
1. Keyword Position Trend - Line chart showing position over 8 weeks
2. Organic Traffic Growth - Area chart showing monthly visitors

**Bottom Row (2 columns):**
1. Issue Distribution - Pie chart (Critical/Warning/Info)
   - Legend with colored dots
2. Recent Analyses - List of recent scans
   - URL, date, score badge
   - "View All" button if 5+

**Quick Action Card:**
- Gradient background
- Sparkles icon
- "Quick SEO Scan" heading
- "Start Scanning" button

---

### 5. 🔍 Website Analyzer (/analyzer)
**SEO analysis tool**

**Input Section:**
- Card with URL input field
- "Analyze" button with Search icon
- Placeholder: "https://example.com"

**Results (when available):**

**Score Card (large):**
- Left: Overall score (large number), badge (Excellent/Good/Poor)
- Right: 3 progress bars (Title Tag, Meta Description, Heading)

**Tabs:**

**Tab 1: Issues**
- List of issues with icons:
  - Red circle = Error
  - Yellow triangle = Warning
- Each shows: message + priority badge

**Tab 2: AI Suggestions**
- Sparkles icon header
- List of suggestions with checkmarks
- Each in rounded card with border

**Tab 3: Details**
- 4 mini cards:
  1. Heading Structure (H1/H2/H3 counts)
  2. Images (total, with alt, missing alt)
  3. Security (HTTPS status)
  4. Analysis Date

**Tab 4: Metadata**
- Title Tag display (with length)
- Meta Description display (with length)
- URL with external link button

---

### 6. 📝 Content Optimizer (/content-optimizer)
**Content analysis tool**

**Input Section:**
- Large textarea (10 rows)
- Word count below
- Keyword input with "Add" button
- Added keywords shown as badges with X to remove

**Results (4 stat cards):**
1. Word Count - Large number
2. Readability - Score with color (Very Easy to Very Difficult)
3. Sentences - Count + average per sentence
4. Characters - Total count

**Tabs:**

**Tab 1: AI Suggestions**
- Numbered suggestions in cards
- Each with checkmark icon
- "Suggestion 1, 2, 3..." labels

**Tab 2: Keyword Analysis**
- If keywords added:
  - Each keyword with hash icon
  - Occurrences + density percentage
  - Progress bar (green = optimal 1-3%, orange = too low/high)
- If no keywords:
  - Empty state with Target icon
  - "Add keywords above" message

**Best Practices Section:**
- 3 checklist items:
  - Content Length ✓ or ⚠
  - Sentence Length ✓ or ⚠
  - Readability Score ✓ or ⚠

---

### 7. 📈 Keyword Tracker (/keyword-tracker)
**Ranking monitor**

**Header with "Add Keyword" button**

**Stats (3 cards):**
1. Tracked Keywords - Total count
2. Average Position - Mean rank
3. Top 10 Rankings - Count in top 10 (green)

**Chart (if keywords exist):**
- Line chart showing average position over 8 weeks
- Y-axis reversed (1 at top, 100 at bottom)

**Keywords List:**
Each keyword card shows:
- Keyword name (bold)
- Trend icon (↑ green, ↓ red, - gray)
- Change badge (+5, -3, etc.)
- Location icon + location
- URL (truncated)
- Position badge (#12) - color by rank
- Trash icon to delete

**Empty State (if no keywords):**
- Target icon (large, faded)
- "No keywords yet" message
- "Add Your First Keyword" button

**Add Keyword Dialog:**
- Keyword input
- Target URL input
- Location input (default: Global)
- Cancel + Add buttons

---

### 8. ⚙️ Technical Audit (/technical-audit)
**Technical health check**

**Overall Score Card:**
- Left: Large score (78/100), badge
- Right: 6 mini scores in grid:
  1. Performance (85)
  2. Security (90)
  3. Mobile (72)
  4. SEO (68)
  5. Accessibility (75)
  6. Content (82)

**Tabs (6 categories):**
Each tab shows list of checks:
- Icon (✓ green, ⚠ yellow, ✗ red)
- Check name (bold)
- Description
- Some with value badges

**Priority Actions Card (bottom):**
- Red gradient background
- AlertCircle icon
- Critical issues list
- Each with red X icon

---

### 9. 📄 Reports (/reports)
**Report management**

**Stats (3 cards):**
1. Total Reports - Count
2. Average Score - Mean across all
3. Latest Score - Most recent

**Tabs:**

**Tab 1: All Reports**
- List of analysis reports
- Each shows:
  - URL (bold) + score badge
  - Date + "SEO Analysis" label
  - Progress bar (score visualization)
  - "Download" + "Share" buttons

**Tab 2: Scheduled**
- Empty state with Calendar icon
- "No scheduled reports"
- "Schedule Report" button

**Tab 3: Shared**
- Empty state with Share2 icon
- "No shared reports"

**Report Features Card:**
- 4 features with icons:
  1. Comprehensive Analysis
  2. Performance Tracking
  3. PDF Export
  4. Easy Sharing

**Upgrade Card:**
- Primary gradient background
- White-label reports
- Automated delivery
- Custom templates
- "Upgrade to Pro" button

---

### 10. ⚙️ Settings (/settings)
**User preferences**

**Tabs (4 sections):**

**Tab 1: Profile**
- Profile Information card:
  - Name input
  - Email input
  - Company input
  - Website input
  - "Save Changes" button
- Security card:
  - Change Password (with button)
  - Two-Factor Authentication (with button)

**Tab 2: Notifications**
- 5 toggle switches:
  1. Email Reports ✓
  2. Weekly Digest ✓
  3. Ranking Changes ✓
  4. Critical Issues ✓
  5. Product Updates ✗
- Each with description
- "Save Preferences" button

**Tab 3: Billing**
- Current Plan card:
  - "Free Plan" badge
  - $0/month
  - Feature list
- Upgrade section:
  - Pro features (4 items with ⚡ icons)
  - "Upgrade to Pro" button
- Payment Method card (empty state)
- Billing History card (empty state)

**Tab 4: API**
- API Key card:
  - Readonly key field (masked)
  - Copy button
  - "Generate New Key" button (red)
  - Warning message
- Documentation card:
  - Base URL
  - Auth header example
  - Rate limits
  - "View Full Documentation" button
- Usage card:
  - Progress bar (23/100)
  - Upgrade prompt

---

### 11. 🚫 404 Not Found (*)
**Error page**

- Centered layout
- Large "404" text (primary color)
- "Page Not Found" heading
- Explanation text
- Two buttons:
  - "Go Back" (outline)
  - "Go Home" (primary)

---

## 🎨 Sidebar Navigation (All Dashboard Pages)

**Desktop (always visible):**
- Logo at top
- Navigation items (7):
  1. Dashboard - LayoutDashboard icon
  2. Website Analyzer - Search icon
  3. Content Optimizer - FileText icon
  4. Keyword Tracker - TrendingUp icon
  5. Technical Audit - Activity icon
  6. Reports - FileBarChart icon
  7. Settings - Settings icon
- Active item highlighted (primary background)
- User section at bottom:
  - Avatar circle with initial
  - Name + email
  - Theme toggle (Sun/Moon)
  - Logout button

**Mobile (hamburger menu):**
- Same navigation items
- Slides in from left
- Overlay covers content
- Close button

---

## 🎨 Design Tokens

**Colors:**
- Primary: Blue (#3b82f6)
- Success: Green (#22c55e)
- Warning: Yellow (#f59e0b)
- Error: Red (#ef4444)
- Muted: Gray (#6b7280)

**Spacing:**
- Gap: 4, 6, 8, 12, 16, 24px
- Padding: 12, 16, 24px
- Border radius: 8, 12px

**Typography:**
- Headings: Bold, 24-48px
- Body: Regular, 14-16px
- Small: 12-14px
- Code: Monospace

**Shadows:**
- sm: Light shadow for cards
- md: Medium for hover states
- lg: Large for modals

**Animations:**
- Hover: scale, opacity transitions
- Loading: spin animation
- Slide: sidebar transitions

---

## 📱 Responsive Breakpoints

- **Mobile:** < 768px
  - Single column layouts
  - Hamburger menu
  - Stacked cards
  
- **Tablet:** 768px - 1024px
  - 2 column grids
  - Collapsed sidebar
  - Smaller charts

- **Desktop:** > 1024px
  - Full sidebar
  - 3-4 column grids
  - Large charts
  - Optimal viewing

---

## 🌗 Dark Mode

**Toggle in sidebar user section**

**Changes:**
- Background: Dark gray
- Cards: Lighter dark gray
- Text: Light colors
- Borders: Subtle
- Charts: Inverted colors
- Preserved: Brand colors (primary, success, warning, error)

**Smooth transition on toggle**

---

This comprehensive UI guide shows exactly what users will see and experience throughout the entire application! 🎨✨
