# MarketAI - AI-Powered Market Research Tool

## 🎯 Project Overview

A professional, production-ready SaaS web application UI for an AI-powered market research platform. Built with React, TypeScript, Tailwind CSS v4, and Recharts.

## 🏗️ Project Structure

```
/src/app/
├── components/
│   ├── common/              # Reusable business components
│   │   ├── KPICard.tsx      # KPI metrics with AI confidence
│   │   ├── InsightCard.tsx  # AI-generated insights
│   │   ├── StatCard.tsx     # Simple statistics cards
│   │   ├── EmptyState.tsx   # Empty state placeholder
│   │   ├── LoadingState.tsx # Loading animation
│   │   ├── MetricsDashboard.tsx # Multi-metric widget
│   │   ├── QuickActions.tsx # Action buttons grid
│   │   ├── ComparisonTable.tsx # Feature comparison
│   │   ├── DataTable.tsx    # Sortable/searchable table
│   │   ├── NotificationPanel.tsx # Notification center
│   │   └── index.ts         # Barrel export
│   │
│   ├── layouts/
│   │   └── DashboardLayout.tsx # Main app layout with sidebar
│   │
│   ├── pages/               # Route pages
│   │   ├── LoginPage.tsx    # Landing/Login screen
│   │   ├── MainDashboard.tsx # Dashboard overview
│   │   ├── MarketTrendsPage.tsx # Trends analysis
│   │   ├── CompetitorAnalysisPage.tsx # Competitor tracking
│   │   ├── CustomerInsightsPage.tsx # Sentiment analysis
│   │   ├── ReportGeneratorPage.tsx # AI report generation
│   │   ├── DataSourcesPage.tsx # Data integrations
│   │   ├── ComponentShowcase.tsx # Component library demo
│   │   └── DesignSystemPage.tsx # Design system reference
│   │
│   └── ui/                  # Base UI components (shadcn/ui)
│       ├── button.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── switch.tsx
│       ├── tabs.tsx
│       ├── table.tsx
│       └── ... (35+ components)
│
├── App.tsx                  # App entry point with router
└── routes.tsx               # React Router configuration

/src/styles/
├── index.css               # Global styles
├── theme.css              # Design tokens & variables
├── tailwind.css           # Tailwind directives
└── fonts.css              # Font imports
```

## 📱 Application Screens

### 1. **Landing/Login Page** (`/`)
- AI visualization hero image
- Value proposition
- SSO buttons (Google, GitHub)
- Email/password login
- Gradient background design

### 2. **Main Dashboard** (`/app`)
- Market overview KPIs
- Growth forecast chart (actual vs AI prediction)
- Trending industries bar chart
- Consumer sentiment pie chart
- Competitor activity feed
- AI summary panel
- Latest insights cards

### 3. **Market Trends** (`/app/trends`)
- Multi-industry trend comparison
- Interactive filters (industry, region, timeframe)
- AI predictions with confidence scores
- Emerging trends list
- Historical data view

### 4. **Competitor Analysis** (`/app/competitors`)
- Competitor comparison table
- Radar chart multi-dimensional view
- Traffic, sentiment, growth metrics
- Recent activity timeline
- Market share breakdown

### 5. **Customer Insights** (`/app/insights`)
- Sentiment distribution pie chart
- Sentiment trend timeline
- Topic analysis bar charts
- Word cloud visualization
- Topic clustering cards

### 6. **Report Generator** (`/app/reports`)
- AI prompt input field
- Example prompts
- Generated report preview
- Export options (PDF, CSV, Share)
- Loading state animation

### 7. **Data Sources** (`/app/sources`)
- Connected sources list
- Sync status indicators
- API integration toggles
- Available integrations grid
- Auto-sync settings

## 🎨 Design System

### Color Palette
- **Primary Gradient**: Blue (#3b82f6) to Teal (#14b8a6)
- **Success**: Green (#10b981)
- **Error**: Red (#ef4444)
- **Warning**: Yellow (#f59e0b)
- **AI Accent**: Purple (#8b5cf6)
- **Neutral**: Gray scale

### Typography
- **Font**: System sans-serif (Inter-style)
- **Headings**: Medium weight (500)
- **Body**: Regular weight (400)
- **Scale**: 16px base, responsive

### Spacing & Layout
- **Border Radius**: 16px (cards), 8px (buttons)
- **Shadows**: Soft, subtle elevation
- **Whitespace**: Generous padding and gaps
- **Grid**: Responsive 12-column system

### Components

#### Cards
- `KPICard` - Metrics with AI confidence
- `InsightCard` - AI insights with actions
- `StatCard` - Simple stats with trends
- `Card` - Base container

#### Data Visualization
- Line charts (Recharts)
- Bar charts (horizontal/vertical)
- Pie charts with legends
- Radar charts for comparison
- Area charts with gradients

#### Interactive Elements
- Buttons (default, outline, ghost, gradient)
- Badges (status, categories, metrics)
- Switches (toggles)
- Tabs (navigation)
- Select dropdowns
- Input fields

#### States
- `EmptyState` - No data placeholder
- `LoadingState` - AI generation animation
- Hover effects
- Active states
- Disabled states

## 🔧 Component Variants

### Button Variants
```tsx
<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button className="bg-gradient-to-r from-blue-500 to-teal-500">Gradient</Button>
```

### Badge Variants
```tsx
<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge className="bg-green-100 text-green-700">Success</Badge>
```

### Card Variants
```tsx
<KPICard aiConfidence={94} changeType="positive" />
<StatCard variant="gradient" />
<InsightCard trend="up" category="Opportunity" />
```

## 🚀 Key Features

### AI-Powered Elements
- AI confidence indicators (percentage badges)
- Predictive trend labels
- Insight highlight suggestions
- Recommendation cards
- "Ask AI Analyst" floating button

### Data Features
- Real-time sync indicators
- Filterable datasets
- Sortable tables
- Searchable content
- Export capabilities

### UX Intelligence
- Hover states with elevation
- Smooth transitions
- Loading animations
- Empty states with CTAs
- Error handling displays

### Responsive Design
- Desktop-first (1440px+)
- Tablet support (768px+)
- Mobile optimization (320px+)
- Collapsible sidebar
- Adaptive grids

## 📊 Mock Data

All pages include realistic mock data:
- Market metrics and forecasts
- Competitor information
- Customer sentiment data
- Industry trends
- API integration status
- Generated reports

## 🎯 Navigation Structure

```
Login (/)
  └─ App Layout (/app)
      ├─ Dashboard
      ├─ Market Trends
      ├─ Competitors
      ├─ Customer Insights
      ├─ Report Generator
      └─ Data Sources
```

## 💡 Usage Examples

### Import Components
```tsx
import { KPICard, InsightCard, StatCard } from "./components/common";
```

### Use KPI Card
```tsx
<KPICard
  title="Market Size"
  value="$4.2B"
  change="+12.5% vs last month"
  changeType="positive"
  icon={TrendingUp}
  aiConfidence={94}
/>
```

### Create Charts
```tsx
<ResponsiveContainer width="100%" height={300}>
  <LineChart data={chartData}>
    <Line type="monotone" dataKey="value" stroke="#3b82f6" />
  </LineChart>
</ResponsiveContainer>
```

## 🎨 Styling Conventions

- Use Tailwind utility classes
- 16px rounded corners for cards (`rounded-2xl`)
- Gradient backgrounds for primary actions
- Consistent spacing (4px increments)
- Shadow hierarchy (sm, md, lg)
- Hover states with `transition-all`

## 🔐 Future Enhancements

- Real API integration
- User authentication
- Real-time data updates
- Advanced filtering
- Custom report templates
- Team collaboration
- Notification system
- Dark mode support

## 📦 Dependencies

- React 18.3.1
- React Router 7.13.0
- Recharts 2.15.2
- Lucide React 0.487.0
- Radix UI components
- Tailwind CSS 4.1.12
- TypeScript

## 🎓 Best Practices

1. **Component Composition**: Build complex UIs from simple components
2. **Consistent Naming**: Use descriptive, action-oriented names
3. **Prop Types**: Always define TypeScript interfaces
4. **Accessibility**: Include ARIA labels and keyboard navigation
5. **Performance**: Lazy load heavy components
6. **Reusability**: Abstract common patterns into shared components

---

**Built with ❤️ for modern market research teams**
