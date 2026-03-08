export interface CodeIssue {
  id: string;
  line: number;
  column?: number;
  type: 'error' | 'warning' | 'suggestion' | 'optimization';
  category: 'bugs' | 'performance' | 'security' | 'readability' | 'best-practices';
  title: string;
  description: string;
  suggestedFix?: string;
  confidence: number;
}

export interface CodeReview {
  id: string;
  fileName: string;
  language: string;
  timestamp: string;
  status: 'completed' | 'in-progress' | 'failed';
  qualityScore: number;
  issuesFound: number;
  securityAlerts: number;
  code: string;
  issues: CodeIssue[];
}

export const mockCode = `function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price * items[i].quantity;
  }
  return total;
}

function getUserData(userId) {
  const query = "SELECT * FROM users WHERE id = " + userId;
  return db.execute(query);
}

const apiKey = "sk_live_1234567890abcdef";

function processPayment(amount, card) {
  if (amount > 0) {
    return charge(card, amount);
  }
}`;

export const mockIssues: CodeIssue[] = [
  {
    id: '1',
    line: 1,
    type: 'suggestion',
    category: 'best-practices',
    title: 'Use modern variable declaration',
    description: 'Replace var with const or let for better scoping',
    suggestedFix: 'function calculateTotal(items) {\n  let total = 0;',
    confidence: 95
  },
  {
    id: '2',
    line: 3,
    type: 'optimization',
    category: 'performance',
    title: 'Use array reduce method',
    description: 'Using array methods like reduce() is more efficient and readable',
    suggestedFix: 'return items.reduce((total, item) => total + item.price * item.quantity, 0);',
    confidence: 88
  },
  {
    id: '3',
    line: 10,
    type: 'error',
    category: 'security',
    title: 'SQL Injection vulnerability',
    description: 'Never concatenate user input directly into SQL queries. Use parameterized queries.',
    suggestedFix: 'const query = "SELECT * FROM users WHERE id = ?";\n  return db.execute(query, [userId]);',
    confidence: 100
  },
  {
    id: '4',
    line: 14,
    type: 'error',
    category: 'security',
    title: 'Exposed API key',
    description: 'API keys should never be hardcoded. Use environment variables.',
    suggestedFix: 'const apiKey = process.env.API_KEY;',
    confidence: 100
  },
  {
    id: '5',
    line: 16,
    type: 'warning',
    category: 'bugs',
    title: 'Missing null/undefined check',
    description: 'Function should handle null or undefined card parameter',
    suggestedFix: 'if (amount > 0 && card) {\n    return charge(card, amount);\n  }',
    confidence: 92
  }
];

export const mockReviews: CodeReview[] = [
  {
    id: '1',
    fileName: 'payment.js',
    language: 'JavaScript',
    timestamp: '2026-02-21T10:30:00Z',
    status: 'completed',
    qualityScore: 65,
    issuesFound: 5,
    securityAlerts: 2,
    code: mockCode,
    issues: mockIssues
  },
  {
    id: '2',
    fileName: 'auth-service.ts',
    language: 'TypeScript',
    timestamp: '2026-02-20T15:45:00Z',
    status: 'completed',
    qualityScore: 88,
    issuesFound: 2,
    securityAlerts: 0,
    code: '',
    issues: []
  },
  {
    id: '3',
    fileName: 'UserController.java',
    language: 'Java',
    timestamp: '2026-02-19T09:15:00Z',
    status: 'completed',
    qualityScore: 92,
    issuesFound: 1,
    securityAlerts: 0,
    code: '',
    issues: []
  },
  {
    id: '4',
    fileName: 'api-routes.py',
    language: 'Python',
    timestamp: '2026-02-18T14:20:00Z',
    status: 'completed',
    qualityScore: 78,
    issuesFound: 3,
    securityAlerts: 1,
    code: '',
    issues: []
  },
  {
    id: '5',
    fileName: 'database.go',
    language: 'Go',
    timestamp: '2026-02-17T11:00:00Z',
    status: 'completed',
    qualityScore: 95,
    issuesFound: 1,
    securityAlerts: 0,
    code: '',
    issues: []
  }
];

export const activityData = [
  { time: '10:30 AM', action: 'Code review completed', file: 'payment.js', score: 65 },
  { time: '09:15 AM', action: 'Security scan finished', file: 'auth-service.ts', score: 88 },
  { time: 'Yesterday', action: 'Review completed', file: 'UserController.java', score: 92 },
  { time: '2 days ago', action: 'Performance analysis done', file: 'api-routes.py', score: 78 }
];

export const chartData = [
  { date: 'Mon', score: 75 },
  { date: 'Tue', score: 82 },
  { date: 'Wed', score: 78 },
  { date: 'Thu', score: 88 },
  { date: 'Fri', score: 92 },
  { date: 'Sat', score: 85 },
  { date: 'Sun', score: 89 }
];

export const languages = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'Go',
  'C++',
  'C#',
  'Ruby',
  'PHP',
  'Rust'
];
