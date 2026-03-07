# AI-Powered Email Marketing Tool

A modern SaaS web dashboard for AI-powered email marketing, featuring email generation, campaign management, audience segmentation, and comprehensive analytics.

## Features

- 🤖 **AI Email Generation** - Generate marketing emails using OpenAI GPT models
- 📧 **Campaign Manager** - Create, manage, and schedule email campaigns
- 👥 **Audience Segmentation** - Segment audiences by behavior, demographics, and engagement
- 📊 **Analytics Dashboard** - Real-time campaign performance tracking and insights
- 📝 **Template Library** - Pre-built email templates with AI optimization
- 🎨 **Modern UI/UX** - Clean, responsive design inspired by Stripe, Notion, and HubSpot
- 🔐 **Authentication** - Secure user authentication with Supabase
- 🌓 **Dark Mode** - Built-in dark mode support

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7
- **UI Components**: Radix UI + shadcn/ui
- **Backend**: Supabase (Auth, Database, Edge Functions)
- **AI**: OpenAI API
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Supabase account
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <your-repo-name>
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory with:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Configure Supabase:
   - Create a new Supabase project
   - Add your OpenAI API key to Supabase secrets:
     - Go to your Supabase dashboard → Edge Functions → Secrets
     - Add `OPENAI_API_KEY` with your OpenAI API key
     - **Important**: Use a real OpenAI API key (starts with `sk-`), not a placeholder
     - See [OPENAI_SETUP.md](OPENAI_SETUP.md) for detailed instructions

5. Deploy Supabase Edge Functions:
```bash
supabase functions deploy server
```

6. Run the development server:
```bash
pnpm dev
```

The app will be available at `http://localhost:5173`

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── components/       # React components
│   │   │   ├── ui/          # UI components (buttons, cards, etc.)
│   │   │   └── MobileNav.tsx
│   │   ├── layouts/          # Layout components
│   │   │   └── DashboardLayout.tsx
│   │   ├── pages/           # Page components
│   │   │   ├── LoginPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── EmailGeneratorPage.tsx
│   │   │   ├── CampaignsPage.tsx
│   │   │   ├── AudiencePage.tsx
│   │   │   ├── AnalyticsPage.tsx
│   │   │   ├── TemplatesPage.tsx
│   │   │   └── SettingsPage.tsx
│   │   ├── utils/           # Utility functions
│   │   ├── routes.ts        # Route configuration
│   │   └── App.tsx          # Main app component
│   └── styles/              # Global styles
├── supabase/
│   └── functions/
│       └── server/          # Supabase Edge Functions
│           ├── index.tsx    # Main server file
│           └── kv_store.tsx # Key-value store utilities
├── utils/
│   └── supabase/
│       └── info.tsx         # Supabase configuration
└── package.json
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build

## Features Documentation

### Authentication
- Sign up and login functionality
- Session management with Supabase Auth
- Protected routes

### Email Generator
- AI-powered email content generation
- Multiple tone options (Professional, Casual, Persuasive, Friendly)
- Subject line suggestions
- Content optimization
- Personalization variables

### Campaign Manager
- Create and schedule campaigns
- Draft, scheduled, and sent campaign views
- Campaign statistics and performance metrics
- Quick actions (edit, duplicate, delete)

### Audience Segmentation
- Create custom audience segments
- Filter by demographics, behavior, and engagement
- Segment performance tracking
- Export capabilities

### Analytics
- Campaign performance overview
- Real-time metrics (open rate, click rate, conversions)
- Engagement charts and trends
- Email performance tracking
- Device and location insights

### Template Library
- Pre-built email templates
- Template categories
- Preview and customize templates
- Save custom templates

## Design System

- **Primary Color**: Indigo (#4F46E5)
- **Secondary Color**: Green (#22C55E)
- **Typography**: Inter font family
- **Design Style**: Modern, clean, glassmorphism effects
- **Layout**: Responsive (desktop, tablet, mobile)

## API Endpoints

The backend server provides these endpoints (all prefixed with `/make-server-c7b8121e`):

- `POST /signup` - User registration
- `POST /generate-email` - Generate AI email content
- `GET /campaigns` - Get user campaigns
- `POST /campaigns` - Create new campaign
- `PUT /campaigns/:id` - Update campaign
- `DELETE /campaigns/:id` - Delete campaign
- `GET /audiences` - Get audience segments
- `POST /audiences` - Create audience segment
- `GET /templates` - Get email templates
- `GET /analytics` - Get analytics data

## Environment Variables

### Frontend (Vite)
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anon/public key

### Backend (Supabase Edge Functions)
- `SUPABASE_URL` - Automatically provided by Supabase
- `SUPABASE_ANON_KEY` - Automatically provided by Supabase
- `SUPABASE_SERVICE_ROLE_KEY` - Automatically provided by Supabase
- `OPENAI_API_KEY` - Your OpenAI API key (add this manually)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## Acknowledgments

- Design inspired by Stripe, Notion, and HubSpot
- UI components from shadcn/ui
- Icons from Lucide React