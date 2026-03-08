# Music App - Apple Music Integration

A modern, minimal music streaming web application with Apple Music API integration.

## Features

- 🎵 Apple Music API integration for real song playback
- 🌓 Dark/Light mode support
- 📱 Fully responsive (Desktop & Mobile)
- 🎨 Clean, minimal design with violet accent color
- ⚡ Fast navigation with React Router
- 🎛️ Player controls with play/pause, skip, volume
- 📚 Library with Playlists, Artists, and Albums tabs
- 🖼️ Beautiful playlist cover images

## Apple Music API Setup

To enable real music playback, you need to configure Apple Music MusicKit JS:

### Step 1: Get Apple Developer Account
1. Sign up at https://developer.apple.com/
2. Enroll in the Apple Developer Program ($99/year)

### Step 2: Create a MusicKit Identifier
1. Go to https://developer.apple.com/account/resources/identifiers/list
2. Click the "+" button to create a new identifier
3. Select "MusicKit Identifier"
4. Enter a description and identifier (e.g., com.yourcompany.musicapp)
5. Click "Continue" and "Register"

### Step 3: Create a Private Key
1. Go to https://developer.apple.com/account/resources/authkeys/list
2. Click the "+" button to create a new key
3. Enter a key name
4. Check "MusicKit"
5. Click "Continue" and "Register"
6. Download the `.p8` key file (save it securely!)
7. Note your Key ID and Team ID

### Step 4: Generate Developer Token
You need to create a JWT (JSON Web Token) using:
- Your private key (.p8 file)
- Key ID
- Team ID

Use this Node.js script or online tools like https://jwt.io/:

```javascript
const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = fs.readFileSync('AuthKey_XXXXXXXXXX.p8').toString();
const teamId = 'YOUR_TEAM_ID';
const keyId = 'YOUR_KEY_ID';

const token = jwt.sign({}, privateKey, {
  algorithm: 'ES256',
  expiresIn: '180d',
  issuer: teamId,
  header: {
    alg: 'ES256',
    kid: keyId
  }
});

console.log(token);
```

### Step 5: Add Token to App
1. Open `/src/app/services/apple-music.ts`
2. Replace `'YOUR_APPLE_MUSIC_DEVELOPER_TOKEN'` with your generated token on line 25:

```typescript
this.musicKit = await window.MusicKit.configure({
  developerToken: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlhYWFhYWFhYWFgifQ...', // Your token here
  app: {
    name: 'Music App',
    build: '1.0.0'
  }
});
```

### Step 6: User Authorization
Users will need to authorize the app to access their Apple Music:
- They must have an active Apple Music subscription
- The app will prompt them to sign in and authorize on first use

## Current Functionality (Without API Token)

Without a valid API token, the app works with **mock data**:
- ✅ All UI features work
- ✅ Play/pause/skip buttons are functional
- ✅ Mock songs display with images
- ✅ Navigation between pages
- ✅ Dark/light mode toggle
- ❌ No real music playback
- ❌ No real Apple Music catalog access

## Pages

1. **Home** - Search bar, featured playlists, trending songs
2. **Player View** - Full-screen player with album art and controls
3. **Library** - Your playlists, artists, and albums organized in tabs
4. **Playlist Detail** - View songs in a playlist with play functionality

## Tech Stack

- React 18
- TypeScript
- React Router v7
- Tailwind CSS v4
- MusicKit JS (Apple Music API)
- Next Themes (Dark mode)
- Radix UI components
- Lucide React icons

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm run dev

# Build for production
pnpm run build
```

## Design System

- **Spacing**: 8px system (using Tailwind's spacing scale)
- **Colors**: Neutral palette with violet accent (#8b5cf6)
- **Typography**: 2 font weights (400 normal, 500 medium)
- **Components**: Rounded corners, soft shadows, hover effects
- **Themes**: Dark and light mode with smooth transitions

## Notes

- The app is optimized for desktop and mobile viewports
- All playlist and album covers use curated Unsplash images
- Mock data is provided for development without Apple Music API
- MusicKit JS is loaded dynamically when needed
- Token expires after 180 days (maximum allowed by Apple)
