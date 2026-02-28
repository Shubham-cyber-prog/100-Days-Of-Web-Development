# Project Structure

This document provides an overview of the project's directory structure and file organization.

## Root Directory

```
.
├── src/                      # Source code
├── supabase/                 # Supabase backend
├── utils/                    # Utility files
├── guidelines/               # Project guidelines
├── .vscode/                  # VS Code settings
├── package.json              # Dependencies and scripts
├── vite.config.ts            # Vite configuration
├── postcss.config.mjs        # PostCSS configuration
├── .gitignore               # Git ignore rules
├── .npmrc                   # NPM configuration
├── .env.example             # Environment variables template
├── README.md                # Project documentation
├── QUICKSTART.md            # Quick start guide
├── DEPLOYMENT.md            # Deployment guide
├── CONTRIBUTING.md          # Contributing guidelines
├── CHANGELOG.md             # Version history
└── LICENSE                  # MIT License
```

## Source Code (`/src`)

### Application (`/src/app`)

The main application code organized by feature:

```
src/app/
├── components/              # React components
│   ├── ui/                 # Reusable UI components (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── table.tsx
│   │   └── ...            # 40+ UI components
│   ├── figma/             # Figma-specific components
│   │   └── ImageWithFallback.tsx
│   └── MobileNav.tsx      # Mobile navigation
│
├── layouts/                # Layout components
│   └── DashboardLayout.tsx # Main dashboard layout
│
├── pages/                  # Page components (routes)
│   ├── LoginPage.tsx      # Authentication
│   ├── DashboardPage.tsx  # Main dashboard
│   ├── EmailGeneratorPage.tsx  # AI email generator
│   ├── CampaignsPage.tsx  # Campaign management
│   ├── AudiencePage.tsx   # Audience segmentation
│   ├── AnalyticsPage.tsx  # Analytics dashboard
│   ├── TemplatesPage.tsx  # Template library
│   └── SettingsPage.tsx   # User settings
│
├── utils/                  # Frontend utilities
│   └── api.ts             # API client functions
│
├── routes.ts              # React Router configuration
└── App.tsx                # Main app component
```

### Styles (`/src/styles`)

```
src/styles/
├── index.css              # Main CSS entry point
├── tailwind.css           # Tailwind directives
├── theme.css              # Design system tokens
└── fonts.css              # Font imports
```

## Backend (`/supabase`)

Supabase Edge Functions and configuration:

```
supabase/
├── functions/
│   └── server/            # Main server function
│       ├── index.tsx      # Hono web server
│       └── kv_store.tsx   # Key-value store utilities
└── config.toml            # Supabase configuration
```

### Server Endpoints

All endpoints are prefixed with `/make-server-c7b8121e`:

- `GET /health` - Health check
- `POST /signup` - User registration
- `POST /generate-email` - AI email generation
- `GET /campaigns` - Get campaigns
- `POST /campaigns` - Create campaign
- `PUT /campaigns/:id` - Update campaign
- `DELETE /campaigns/:id` - Delete campaign
- `GET /audiences` - Get audience segments
- `POST /audiences` - Create audience segment
- `GET /templates` - Get templates
- `GET /analytics` - Get analytics data

## Utilities (`/utils`)

```
utils/
└── supabase/
    └── info.tsx           # Supabase project configuration
```

## UI Components (`/src/app/components/ui`)

Shadcn/ui components built on Radix UI primitives:

### Form Components
- `input.tsx` - Text input
- `textarea.tsx` - Multi-line input
- `select.tsx` - Dropdown select
- `checkbox.tsx` - Checkbox input
- `radio-group.tsx` - Radio buttons
- `switch.tsx` - Toggle switch
- `slider.tsx` - Range slider
- `form.tsx` - Form wrapper
- `label.tsx` - Form label

### Layout Components
- `card.tsx` - Content card
- `separator.tsx` - Divider line
- `accordion.tsx` - Collapsible sections
- `tabs.tsx` - Tab interface
- `table.tsx` - Data table
- `scroll-area.tsx` - Scrollable container
- `resizable.tsx` - Resizable panels
- `sidebar.tsx` - Sidebar navigation

### Feedback Components
- `alert.tsx` - Alert messages
- `toast.tsx` / `sonner.tsx` - Toast notifications
- `progress.tsx` - Progress bar
- `skeleton.tsx` - Loading skeleton
- `badge.tsx` - Status badge
- `avatar.tsx` - User avatar

### Overlay Components
- `dialog.tsx` - Modal dialog
- `alert-dialog.tsx` - Confirmation dialog
- `sheet.tsx` - Slide-out panel
- `drawer.tsx` - Bottom drawer
- `popover.tsx` - Popover menu
- `tooltip.tsx` - Tooltip
- `hover-card.tsx` - Hover card
- `dropdown-menu.tsx` - Dropdown menu
- `context-menu.tsx` - Right-click menu

### Navigation Components
- `button.tsx` - Button
- `navigation-menu.tsx` - Navigation menu
- `menubar.tsx` - Menu bar
- `breadcrumb.tsx` - Breadcrumb trail
- `pagination.tsx` - Pagination
- `command.tsx` - Command palette

### Data Display
- `chart.tsx` - Chart wrapper
- `calendar.tsx` - Date picker
- `carousel.tsx` - Image carousel
- `aspect-ratio.tsx` - Aspect ratio container

### Utilities
- `use-mobile.ts` - Mobile detection hook
- `utils.ts` - Utility functions (cn, etc.)

## Pages Overview

### LoginPage.tsx
- User authentication
- Sign up and login forms
- Session management
- Redirect to dashboard

### DashboardPage.tsx
- Overview metrics
- Recent campaigns
- Quick stats
- Activity feed

### EmailGeneratorPage.tsx
- AI-powered email generation
- Tone selection
- Subject line suggestions
- Preview and edit
- Save as campaign or template

### CampaignsPage.tsx
- Campaign list
- Create new campaigns
- Edit and delete
- Status tracking
- Performance metrics

### AudiencePage.tsx
- Audience segments
- Create custom segments
- Filter and search
- Segment analytics
- Export data

### AnalyticsPage.tsx
- Campaign performance
- Engagement metrics
- Charts and graphs
- Date range filtering
- Export reports

### TemplatesPage.tsx
- Template library
- Categories
- Preview templates
- Use or customize
- Save custom templates

### SettingsPage.tsx
- Account settings
- Email preferences
- API integrations
- Team management
- Billing

## Configuration Files

### package.json
- Project metadata
- Dependencies
- Scripts (dev, build, preview)
- Peer dependencies

### vite.config.ts
- Vite configuration
- React plugin
- Tailwind CSS plugin
- Path aliases
- Asset handling

### postcss.config.mjs
- PostCSS configuration
- Tailwind CSS processing

### .npmrc
- NPM/pnpm settings
- Hoist configuration

### .gitignore
- Files to exclude from Git
- node_modules, dist, .env, etc.

### .env.example
- Template for environment variables
- Supabase URL and keys

## Design System

The design system is defined in `/src/styles/theme.css`:

### Colors
- Primary: Indigo (#4F46E5)
- Secondary: Green (#22C55E)
- Background, foreground, muted, accent, destructive
- Card, popover, border colors

### Typography
- Font family: Inter
- Heading styles (h1-h6)
- Paragraph styles
- Font sizes and weights

### Spacing & Layout
- Consistent spacing scale
- Border radius
- Container widths
- Grid systems

### Components
- Button variants
- Card styles
- Input styles
- Badge styles

## Data Flow

```
User Interaction
    ↓
React Components (Pages)
    ↓
API Utils (/src/app/utils/api.ts)
    ↓
Supabase Edge Function (/supabase/functions/server/index.tsx)
    ↓
┌─────────────────┬──────────────────┐
│  OpenAI API     │  KV Store        │
│  (Email Gen)    │  (Data Storage)  │
└─────────────────┴──────────────────┘
    ↓
Response back to UI
    ↓
State Update & Re-render
```

## Environment Variables

### Frontend (.env.local)
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase public key

### Backend (Supabase Secrets)
- `OPENAI_API_KEY` - OpenAI API key
- `SUPABASE_URL` - Auto-provided
- `SUPABASE_ANON_KEY` - Auto-provided
- `SUPABASE_SERVICE_ROLE_KEY` - Auto-provided

## Key Technologies

### Frontend
- **React 18**: UI framework
- **TypeScript**: Type safety
- **Tailwind CSS v4**: Styling
- **React Router v7**: Routing
- **Radix UI**: Headless UI components
- **Recharts**: Data visualization
- **Lucide React**: Icons
- **Motion**: Animations

### Backend
- **Supabase**: Backend-as-a-Service
- **Hono**: Web framework for Edge Functions
- **Deno**: Runtime for Edge Functions

### APIs
- **OpenAI GPT-4**: AI email generation
- **Supabase Auth**: Authentication
- **Supabase Storage**: File storage (if needed)

## Best Practices

### Code Organization
- One component per file
- Group related files together
- Use index files for clean imports
- Keep components small and focused

### Naming Conventions
- PascalCase for components
- camelCase for functions and variables
- kebab-case for files in some cases
- UPPER_CASE for constants

### State Management
- Local state for UI-only state
- URL state for shareable state
- Session storage for temporary data
- Supabase for persistent data

### Styling
- Use Tailwind utility classes
- Custom theme tokens in theme.css
- Component variants with CVA
- Responsive design first

## Development Workflow

1. Make changes to files
2. Vite auto-reloads the page
3. Check browser console for errors
4. Test in mobile view
5. Build before deploying
6. Deploy Edge Functions separately

## Production Build

```bash
# Build frontend
pnpm build

# Output directory
dist/
```

The `dist/` folder contains the production-ready static files.

## Version Control

### Important Files to Commit
- All source code
- Configuration files
- README and documentation
- package.json
- .env.example (NOT .env)

### Files to Ignore
- node_modules/
- dist/
- .env and .env.local
- .DS_Store
- IDE-specific files

## Support & Documentation

- README.md - Main documentation
- QUICKSTART.md - Getting started
- DEPLOYMENT.md - Deployment guide
- CONTRIBUTING.md - How to contribute
- CHANGELOG.md - Version history
- This file - Project structure

---

For more information, see the [README.md](README.md) or open an issue.
