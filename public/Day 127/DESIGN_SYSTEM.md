# SocialHub - Advanced Social Media Platform

A complete, production-ready social media platform UI built with React, TypeScript, Tailwind CSS, and modern web technologies.

## 🎨 Design System

### Color Palette

- **Primary**: Vibrant indigo (#6366f1) for key actions and branding
- **Background**: Clean white/dark backgrounds for optimal readability
- **Accent**: Subtle grays for secondary elements
- **Status Colors**: 
  - Success: Green (#10b981)
  - Warning: Yellow (#f59e0b)
  - Error: Red (#ef4444)

### Typography

- **Headings**: Medium weight (500) with clear hierarchy
- **Body**: Normal weight (400) for comfortable reading
- **Small Text**: Muted foreground for secondary information

### Spacing & Layout

- Consistent padding and margins using Tailwind's spacing scale
- Border radius: 0.625rem (10px) for soft, friendly corners
- Shadows: Subtle elevation for cards and modals

## 📱 Features

### Authentication
- Login with email/password
- Social login (Google, GitHub)
- Signup with validation
- Password recovery flow
- Email verification

### Home Feed
- Infinite scroll feed
- Stories section with gradient borders
- Post cards with images, videos, and polls
- Like, comment, share interactions
- Trending topics sidebar
- Suggested users

### User Profiles
- Profile header with avatar and stats
- Editable profile information
- Post tabs (Posts, Media, Likes)
- Follow/Unfollow functionality
- Bio and social links

### Messaging
- Real-time chat interface
- Chat list with online status
- Message reactions
- Typing indicators
- File/media sharing

### Notifications
- Categorized notifications (likes, comments, follows, mentions)
- Real-time notification badges
- Mark as read functionality
- Notification filtering

### Explore
- Search functionality
- Trending hashtags
- Media grid layout
- Topic discovery

### Analytics Dashboard
- Engagement metrics
- Follower growth charts
- Content type distribution
- Top performing posts
- Interactive data visualizations

### Scheduled Posts
- Schedule posts for future publishing
- Draft management
- Calendar view
- Post preview

### Settings
- Account management
- Dark/Light theme toggle
- Privacy controls
- Notification preferences
- Security settings (2FA, sessions)
- Language and region settings

## 🧩 Component Library

### Core Components

- **PostCard**: Displays posts with media, polls, and interactions
- **StoryCircle**: Story preview with gradient border
- **UserCard**: User profile preview with follow button
- **TrendingSidebar**: Shows trending topics and hashtags
- **LoadingStates**: Skeleton loaders and empty states

### UI Components (Radix UI)

All components are built using Radix UI primitives with custom styling:

- Button
- Card
- Avatar
- Badge
- Dialog/Modal
- Dropdown Menu
- Input/Textarea
- Tabs
- Switch
- Skeleton
- Tooltip
- And 30+ more components

## 🎯 UX Features

### Interaction States
- Hover effects on interactive elements
- Active/pressed states with scale animations
- Loading placeholders for async content
- Empty states with helpful messages
- Error states with recovery options

### Micro-interactions
- Heart animation on like
- Smooth transitions between pages
- Floating action button on mobile
- Badge notifications with count
- Toast notifications for actions

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized layouts
- Bottom navigation on mobile
- Sticky header navigation
- Collapsible sidebars

### Accessibility
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus visible indicators
- Screen reader friendly

## 🚀 Performance Optimizations

- Lazy loading for images
- Code splitting by route
- Efficient re-renders with React hooks
- Optimized bundle size
- CSS-in-JS with Tailwind for minimal runtime overhead

## 🌓 Dark Mode

Built-in dark mode support with:
- System preference detection
- Manual toggle in settings
- Persistent preference in localStorage
- Smooth theme transitions
- Optimized color contrast

## 📐 Layout System

### Grid-Based Design
- Responsive grid layouts
- Flexible container widths
- Consistent spacing system
- Auto-layout components

### Navigation
- **Desktop**: Top navigation bar with icons and labels
- **Mobile**: Bottom navigation bar (5 items)
- **Floating Action Button**: Quick post creation on mobile

## 🎨 Design Tokens

All design tokens are defined in CSS variables for easy theming:

```css
--primary: #6366f1
--background: #ffffff
--foreground: oklch(0.145 0 0)
--card: #ffffff
--border: rgba(0, 0, 0, 0.1)
--radius: 0.625rem
```

## 🔧 Tech Stack

- **React 18.3**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Tailwind CSS v4**: Utility-first styling
- **React Router v7**: Client-side routing
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library
- **Motion (Framer Motion)**: Smooth animations
- **Recharts**: Data visualization
- **Sonner**: Toast notifications

## 📦 Project Structure

```
src/
├── app/
│   ├── components/         # Reusable components
│   │   ├── ui/            # Base UI components
│   │   ├── PostCard.tsx
│   │   ├── StoryCircle.tsx
│   │   └── ...
│   ├── contexts/          # React contexts (Theme)
│   ├── layouts/           # Layout components
│   ├── lib/               # Utilities and mock data
│   ├── pages/             # Page components
│   ├── routes.ts          # Route configuration
│   └── App.tsx            # Root component
└── styles/                # Global styles
    ├── theme.css          # Design tokens
    ├── custom.css         # Custom utilities
    └── index.css          # Style imports
```

## 🎯 Best Practices

1. **Component Composition**: Small, reusable components
2. **Type Safety**: TypeScript for all components
3. **Accessibility**: WCAG 2.1 AA compliance
4. **Performance**: Optimized renders and lazy loading
5. **Responsive**: Mobile-first, progressively enhanced
6. **Maintainable**: Clear file structure and naming
7. **Consistent**: Design system with tokens
8. **Modern**: Latest React patterns and hooks

## 🌟 Advanced Features

### AI Content Recommendations
UI ready for integration with AI-powered content recommendations

### Real-Time Activity
Visual indicators for online status and typing

### Analytics Dashboard
Comprehensive metrics visualization with interactive charts

### Post Scheduling
Calendar-based post scheduling with draft management

## 📱 Mobile Optimizations

- Touch-friendly tap targets (minimum 44px)
- Optimized images for mobile bandwidth
- Bottom sheet modals for mobile UX
- Swipe gestures ready for implementation
- Mobile-specific layouts and components

## 🎨 Customization

The design system is fully customizable through CSS variables in `theme.css`:

1. **Colors**: Change primary, accent, and semantic colors
2. **Typography**: Adjust font sizes and weights
3. **Spacing**: Modify border radius and spacing scale
4. **Shadows**: Customize elevation levels

## 🚦 Getting Started

1. All dependencies are pre-installed
2. The app uses React Router for navigation
3. Mock data is provided in `lib/mockData.ts`
4. Theme toggle available in Settings page
5. Fully functional UI ready for backend integration

## 📝 Notes

- All images use Unsplash for placeholder content
- Mock data provided for demonstration
- Ready for API integration
- Authentication flows are UI-complete
- All forms include validation states
- Notification system ready for real-time updates

---

Built with ❤️ using modern web technologies and best practices.
