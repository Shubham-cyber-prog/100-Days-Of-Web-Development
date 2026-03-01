export interface Repository {
  id: string;
  name: string;
  owner: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  watchers: number;
  isPrivate: boolean;
  lastUpdated: string;
  topics: string[];
}

export interface Commit {
  id: string;
  message: string;
  author: string;
  date: string;
  hash: string;
}

export interface Issue {
  id: string;
  title: string;
  status: 'open' | 'closed';
  labels: string[];
  author: string;
  createdAt: string;
  comments: number;
}

export interface FileItem {
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileItem[];
}

export const currentUser = {
  username: 'johndoe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe',
  bio: 'Full-stack developer | Open source enthusiast',
};

export const repositories: Repository[] = [
  {
    id: '1',
    name: 'react-dashboard',
    owner: 'johndoe',
    description: 'A modern React dashboard with beautiful UI components',
    language: 'TypeScript',
    stars: 245,
    forks: 42,
    watchers: 18,
    isPrivate: false,
    lastUpdated: '2026-02-28',
    topics: ['react', 'dashboard', 'typescript', 'ui'],
  },
  {
    id: '2',
    name: 'node-api-starter',
    owner: 'johndoe',
    description: 'Production-ready Node.js API starter template',
    language: 'JavaScript',
    stars: 189,
    forks: 31,
    watchers: 12,
    isPrivate: false,
    lastUpdated: '2026-02-25',
    topics: ['nodejs', 'api', 'express', 'mongodb'],
  },
  {
    id: '3',
    name: 'ml-experiments',
    owner: 'johndoe',
    description: 'Machine learning experiments and notebooks',
    language: 'Python',
    stars: 67,
    forks: 15,
    watchers: 8,
    isPrivate: false,
    lastUpdated: '2026-02-20',
    topics: ['machine-learning', 'python', 'jupyter'],
  },
  {
    id: '4',
    name: 'private-project',
    owner: 'johndoe',
    description: 'A private project for internal use',
    language: 'Go',
    stars: 5,
    forks: 0,
    watchers: 2,
    isPrivate: true,
    lastUpdated: '2026-02-15',
    topics: ['golang', 'microservices'],
  },
];

export const commits: Commit[] = [
  {
    id: '1',
    message: 'Add responsive design to dashboard',
    author: 'johndoe',
    date: '2026-02-28',
    hash: 'a1b2c3d',
  },
  {
    id: '2',
    message: 'Fix authentication bug',
    author: 'johndoe',
    date: '2026-02-27',
    hash: 'e4f5g6h',
  },
  {
    id: '3',
    message: 'Update dependencies',
    author: 'johndoe',
    date: '2026-02-26',
    hash: 'i7j8k9l',
  },
  {
    id: '4',
    message: 'Add unit tests for components',
    author: 'johndoe',
    date: '2026-02-25',
    hash: 'm0n1o2p',
  },
  {
    id: '5',
    message: 'Initial commit',
    author: 'johndoe',
    date: '2026-01-15',
    hash: 'q3r4s5t',
  },
];

export const issues: Issue[] = [
  {
    id: '1',
    title: 'Add dark mode support',
    status: 'open',
    labels: ['enhancement', 'good first issue'],
    author: 'johndoe',
    createdAt: '2026-02-27',
    comments: 3,
  },
  {
    id: '2',
    title: 'Bug: Login page not responsive on mobile',
    status: 'open',
    labels: ['bug', 'high priority'],
    author: 'janedoe',
    createdAt: '2026-02-26',
    comments: 5,
  },
  {
    id: '3',
    title: 'Documentation improvements',
    status: 'closed',
    labels: ['documentation'],
    author: 'devuser',
    createdAt: '2026-02-20',
    comments: 2,
  },
  {
    id: '4',
    title: 'Add search functionality',
    status: 'open',
    labels: ['enhancement'],
    author: 'johndoe',
    createdAt: '2026-02-18',
    comments: 8,
  },
];

export const fileTree: FileItem[] = [
  {
    name: 'src',
    type: 'folder',
    path: '/src',
    children: [
      {
        name: 'components',
        type: 'folder',
        path: '/src/components',
        children: [
          { name: 'Header.tsx', type: 'file', path: '/src/components/Header.tsx' },
          { name: 'Sidebar.tsx', type: 'file', path: '/src/components/Sidebar.tsx' },
          { name: 'Button.tsx', type: 'file', path: '/src/components/Button.tsx' },
        ],
      },
      {
        name: 'pages',
        type: 'folder',
        path: '/src/pages',
        children: [
          { name: 'Home.tsx', type: 'file', path: '/src/pages/Home.tsx' },
          { name: 'About.tsx', type: 'file', path: '/src/pages/About.tsx' },
        ],
      },
      { name: 'App.tsx', type: 'file', path: '/src/App.tsx' },
      { name: 'index.tsx', type: 'file', path: '/src/index.tsx' },
    ],
  },
  {
    name: 'public',
    type: 'folder',
    path: '/public',
    children: [
      { name: 'index.html', type: 'file', path: '/public/index.html' },
      { name: 'favicon.ico', type: 'file', path: '/public/favicon.ico' },
    ],
  },
  { name: 'package.json', type: 'file', path: '/package.json' },
  { name: 'README.md', type: 'file', path: '/README.md' },
  { name: 'tsconfig.json', type: 'file', path: '/tsconfig.json' },
];

export const sampleCode = `import React, { useState } from 'react';
import './App.css';

interface AppProps {
  title?: string;
}

function App({ title = 'Hello World' }: AppProps) {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>{title}</h1>
        <p>You clicked {count} times</p>
        <button onClick={handleClick}>
          Click me
        </button>
      </header>
    </div>
  );
}

export default App;`;

export const activityFeed = [
  {
    id: '1',
    type: 'push',
    repo: 'react-dashboard',
    message: 'Pushed 3 commits to main branch',
    time: '2 hours ago',
  },
  {
    id: '2',
    type: 'star',
    repo: 'awesome-project',
    message: 'Starred awesome-project',
    time: '5 hours ago',
  },
  {
    id: '3',
    type: 'issue',
    repo: 'node-api-starter',
    message: 'Opened issue #42',
    time: '1 day ago',
  },
  {
    id: '4',
    type: 'fork',
    repo: 'open-source-lib',
    message: 'Forked open-source-lib',
    time: '2 days ago',
  },
];

export const contributionData = [
  { date: '2026-01-01', count: 3 },
  { date: '2026-01-05', count: 5 },
  { date: '2026-01-10', count: 2 },
  { date: '2026-01-15', count: 8 },
  { date: '2026-01-20', count: 4 },
  { date: '2026-01-25', count: 6 },
  { date: '2026-02-01', count: 7 },
  { date: '2026-02-05', count: 3 },
  { date: '2026-02-10', count: 9 },
  { date: '2026-02-15', count: 5 },
  { date: '2026-02-20', count: 4 },
  { date: '2026-02-25', count: 6 },
  { date: '2026-02-28', count: 8 },
];
