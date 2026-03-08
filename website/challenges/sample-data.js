const sampleChallenges = [
  {
    id: 'challenge-week-1',
    title: 'CSS Art Gallery',
    description: 'Create a pure CSS art piece without using any images. Use CSS shapes, gradients, and animations to create something visually stunning.',
    theme: 'CSS Animation',
    difficulty: 'intermediate',
    startDate: '2026-02-17T00:00:00Z',
    endDate: '2026-02-24T23:59:59Z',
    constraints: [
      'No external images allowed',
      'Only CSS and HTML permitted',
      'Must include at least one animation',
      'Should be responsive'
    ],
    starterTemplate: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Art Challenge</title>
  <style>
    /* Your CSS art goes here */
  </style>
</head>
<body>
  <!-- Your HTML structure -->
</body>
</html>`,
    resources: [
      { title: 'CSS Art Guide', url: 'https://css-tricks.com/guides/css-art/' },
      { title: 'CSS Shapes', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape' }
    ],
    status: 'active',
    submissions: [],
    createdAt: '2026-02-17T00:00:00Z'
  },
  {
    id: 'challenge-week-2',
    title: 'Weather Dashboard',
    description: 'Build a weather dashboard that displays current weather and a 5-day forecast for multiple cities using a weather API.',
    theme: 'API Integration',
    difficulty: 'intermediate',
    startDate: '2026-02-24T00:00:00Z',
    endDate: '2026-03-03T23:59:59Z',
    constraints: [
      'Must use a real weather API',
      'Display at least 3 cities',
      'Show current weather + forecast',
      'Handle loading and error states'
    ],
    resources: [
      { title: 'OpenWeatherMap API', url: 'https://openweathermap.org/api' },
      { title: 'Fetch API Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API' }
    ],
    status: 'upcoming',
    submissions: [],
    createdAt: '2026-02-17T00:00:00Z'
  },
  {
    id: 'challenge-week-3',
    title: 'Offline Notes App',
    description: 'Create a note-taking application that works completely offline using Service Workers and IndexedDB.',
    theme: 'PWA Features',
    difficulty: 'advanced',
    startDate: '2026-03-03T00:00:00Z',
    endDate: '2026-03-10T23:59:59Z',
    constraints: [
      'Must work offline',
      'Persist notes in IndexedDB',
      'Sync when back online',
      'Installable as PWA'
    ],
    resources: [
      { title: 'Service Workers', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API' },
      { title: 'IndexedDB', url: 'https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API' }
    ],
    status: 'upcoming',
    submissions: [],
    createdAt: '2026-02-17T00:00:00Z'
  },
  {
    id: 'challenge-week-4',
    title: 'Accessible Form Builder',
    description: 'Build a multi-step form with comprehensive accessibility features including proper labels, error handling, and keyboard navigation.',
    theme: 'Accessible Forms',
    difficulty: 'intermediate',
    startDate: '2026-03-10T00:00:00Z',
    endDate: '2026-03-17T23:59:59Z',
    constraints: [
      'WCAG 2.1 AA compliance',
      'Multi-step with progress indicator',
      'Real-time validation',
      'Screen reader friendly'
    ],
    resources: [
      { title: 'WCAG Guidelines', url: 'https://www.w3.org/WAI/WCAG21/quickref/' },
      { title: 'Form Accessibility', url: 'https://web.dev/learn/forms/' }
    ],
    status: 'upcoming',
    submissions: [],
    createdAt: '2026-02-17T00:00:00Z'
  },
  {
    id: 'challenge-week-5',
    title: 'Canvas Particle System',
    description: 'Create an interactive particle system using the Canvas API with mouse/touch interaction.',
    theme: 'Canvas Graphics',
    difficulty: 'advanced',
    startDate: '2026-03-17T00:00:00Z',
    endDate: '2026-03-24T23:59:59Z',
    constraints: [
      'Use Canvas API',
      'Particles react to mouse/touch',
      'Smooth 60fps animation',
      'Configurable particle count'
    ],
    resources: [
      { title: 'Canvas API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API' },
      { title: 'Animation Loop', url: 'https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame' }
    ],
    status: 'upcoming',
    submissions: [],
    createdAt: '2026-02-17T00:00:00Z'
  }
];

const sampleLeaderboard = [
  { userId: 'user-1', userName: 'Alex Developer', totalVotes: 156, challengesCompleted: 5, badges: ['first-submit', 'streak-3', 'winner'] },
  { userId: 'user-2', userName: 'Sarah Coder', totalVotes: 142, challengesCompleted: 4, badges: ['first-submit', 'top-3', 'creative'] },
  { userId: 'user-3', userName: 'Mike Designer', totalVotes: 128, challengesCompleted: 4, badges: ['first-submit', 'performant'] },
  { userId: 'user-4', userName: 'Emma Builder', totalVotes: 115, challengesCompleted: 3, badges: ['first-submit', 'accessible'] },
  { userId: 'user-5', userName: 'James Creator', totalVotes: 98, challengesCompleted: 3, badges: ['first-submit'] }
];

const sampleSubmissions = [
  {
    id: 'submission-1',
    challengeId: 'challenge-week-1',
    userName: 'Alex Developer',
    projectUrl: 'https://codepen.io/example/pen/abc123',
    description: 'A sunset landscape created entirely with CSS gradients and shapes.',
    technologies: ['CSS', 'HTML'],
    votes: 45,
    badges: ['creative'],
    submittedAt: '2026-02-18T10:30:00Z'
  },
  {
    id: 'submission-2',
    challengeId: 'challenge-week-1',
    userName: 'Sarah Coder',
    projectUrl: 'https://codepen.io/example/pen/def456',
    description: 'An animated galaxy with rotating planets and twinkling stars.',
    technologies: ['CSS', 'HTML', 'JavaScript'],
    votes: 38,
    badges: ['performant'],
    submittedAt: '2026-02-18T14:15:00Z'
  }
];

if (typeof window !== 'undefined') {
  window.sampleChallengeData = {
    challenges: sampleChallenges,
    leaderboard: sampleLeaderboard,
    submissions: sampleSubmissions
  };
}