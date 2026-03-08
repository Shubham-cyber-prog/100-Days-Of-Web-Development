export interface ScrapingJob {
  id: string;
  name: string;
  targetUrl: string;
  status: 'running' | 'completed' | 'failed' | 'idle';
  recordsScraped: number;
  lastRunTime: string;
  scheduleType: string;
  selectors: {
    css?: string;
    xpath?: string;
  };
  proxyEnabled: boolean;
  retryAttempts: number;
  nextRun?: string;
}

export interface ScrapedData {
  id: string;
  jobId: string;
  title: string;
  price?: string;
  description?: string;
  url?: string;
  timestamp: string;
}

export interface LogEntry {
  id: string;
  jobId: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'success';
  message: string;
}

export const mockJobs: ScrapingJob[] = [
  {
    id: '1',
    name: 'E-commerce Product Scraper',
    targetUrl: 'https://example-shop.com/products',
    status: 'running',
    recordsScraped: 1247,
    lastRunTime: '2 minutes ago',
    scheduleType: 'Every 15 minutes',
    selectors: {
      css: '.product-card h3.title, .product-card .price',
      xpath: '//div[@class="product-card"]//h3'
    },
    proxyEnabled: true,
    retryAttempts: 3,
    nextRun: 'in 13 minutes'
  },
  {
    id: '2',
    name: 'News Articles Aggregator',
    targetUrl: 'https://news-site.com/latest',
    status: 'completed',
    recordsScraped: 523,
    lastRunTime: '1 hour ago',
    scheduleType: 'Hourly',
    selectors: {
      css: 'article.news-item h2, article.news-item .timestamp',
    },
    proxyEnabled: false,
    retryAttempts: 2,
    nextRun: 'in 42 minutes'
  },
  {
    id: '3',
    name: 'Real Estate Listings',
    targetUrl: 'https://realestate-portal.com/listings',
    status: 'failed',
    recordsScraped: 89,
    lastRunTime: '3 hours ago',
    scheduleType: 'Daily at 9:00 AM',
    selectors: {
      css: '.listing-card .address, .listing-card .price',
      xpath: '//div[@class="listing-card"]'
    },
    proxyEnabled: true,
    retryAttempts: 5,
  },
  {
    id: '4',
    name: 'Job Postings Monitor',
    targetUrl: 'https://job-board.com/postings',
    status: 'completed',
    recordsScraped: 2156,
    lastRunTime: '30 minutes ago',
    scheduleType: 'Every 30 minutes',
    selectors: {
      css: '.job-card h3.job-title, .job-card .company',
    },
    proxyEnabled: true,
    retryAttempts: 3,
    nextRun: 'in 5 minutes'
  },
  {
    id: '5',
    name: 'Social Media Trends',
    targetUrl: 'https://social-platform.com/trending',
    status: 'idle',
    recordsScraped: 0,
    lastRunTime: 'Never',
    scheduleType: 'Manual',
    selectors: {
      css: '.trend-item .hashtag, .trend-item .count',
    },
    proxyEnabled: false,
    retryAttempts: 2,
  },
];

export const mockScrapedData: ScrapedData[] = [
  {
    id: 'd1',
    jobId: '1',
    title: 'Wireless Bluetooth Headphones',
    price: '$79.99',
    description: 'Premium sound quality with active noise cancellation',
    url: 'https://example-shop.com/products/headphones-1',
    timestamp: '2026-03-03 14:23:15'
  },
  {
    id: 'd2',
    jobId: '1',
    title: 'Smart Fitness Watch',
    price: '$199.99',
    description: 'Track your health and fitness goals',
    url: 'https://example-shop.com/products/watch-2',
    timestamp: '2026-03-03 14:23:17'
  },
  {
    id: 'd3',
    jobId: '1',
    title: 'Portable Power Bank 20000mAh',
    price: '$45.99',
    description: 'Fast charging for all your devices',
    url: 'https://example-shop.com/products/powerbank-3',
    timestamp: '2026-03-03 14:23:19'
  },
  {
    id: 'd4',
    jobId: '2',
    title: 'Tech Industry Sees Major AI Breakthrough',
    description: 'Leading researchers announce new developments in artificial intelligence',
    url: 'https://news-site.com/tech-ai-breakthrough',
    timestamp: '2026-03-03 13:15:42'
  },
  {
    id: 'd5',
    jobId: '2',
    title: 'Global Markets React to Economic Report',
    description: 'Stock markets show positive trends following latest economic data',
    url: 'https://news-site.com/markets-economic-report',
    timestamp: '2026-03-03 13:15:45'
  },
];

export const mockLogs: LogEntry[] = [
  {
    id: 'l1',
    jobId: '1',
    timestamp: '2026-03-03 14:23:10',
    level: 'info',
    message: '[E-commerce Product Scraper] Job started'
  },
  {
    id: 'l2',
    jobId: '1',
    timestamp: '2026-03-03 14:23:11',
    level: 'info',
    message: '[E-commerce Product Scraper] Connecting to https://example-shop.com/products'
  },
  {
    id: 'l3',
    jobId: '1',
    timestamp: '2026-03-03 14:23:12',
    level: 'info',
    message: '[E-commerce Product Scraper] Using proxy: 192.168.1.100:8080'
  },
  {
    id: 'l4',
    jobId: '1',
    timestamp: '2026-03-03 14:23:14',
    level: 'success',
    message: '[E-commerce Product Scraper] Page loaded successfully (2.3s)'
  },
  {
    id: 'l5',
    jobId: '1',
    timestamp: '2026-03-03 14:23:15',
    level: 'info',
    message: '[E-commerce Product Scraper] Parsing data with CSS selector: .product-card h3.title'
  },
  {
    id: 'l6',
    jobId: '1',
    timestamp: '2026-03-03 14:23:16',
    level: 'success',
    message: '[E-commerce Product Scraper] Extracted 47 records from current page'
  },
  {
    id: 'l7',
    jobId: '1',
    timestamp: '2026-03-03 14:23:17',
    level: 'info',
    message: '[E-commerce Product Scraper] Total records scraped: 1247'
  },
  {
    id: 'l8',
    jobId: '3',
    timestamp: '2026-03-03 11:15:30',
    level: 'info',
    message: '[Real Estate Listings] Job started'
  },
  {
    id: 'l9',
    jobId: '3',
    timestamp: '2026-03-03 11:15:32',
    level: 'warning',
    message: '[Real Estate Listings] Slow response time detected (5.2s)'
  },
  {
    id: 'l10',
    jobId: '3',
    timestamp: '2026-03-03 11:15:35',
    level: 'error',
    message: '[Real Estate Listings] Connection timeout after 3 retry attempts'
  },
  {
    id: 'l11',
    jobId: '3',
    timestamp: '2026-03-03 11:15:36',
    level: 'error',
    message: '[Real Estate Listings] Job failed'
  },
  {
    id: 'l12',
    jobId: '2',
    timestamp: '2026-03-03 13:15:40',
    level: 'info',
    message: '[News Articles Aggregator] Job started'
  },
  {
    id: 'l13',
    jobId: '2',
    timestamp: '2026-03-03 13:15:48',
    level: 'success',
    message: '[News Articles Aggregator] Job completed successfully - 523 records scraped'
  },
];

export const analyticsData = {
  recordsOverTime: [
    { date: 'Mon', records: 1200 },
    { date: 'Tue', records: 1850 },
    { date: 'Wed', records: 2100 },
    { date: 'Thu', records: 1680 },
    { date: 'Fri', records: 2450 },
    { date: 'Sat', records: 1920 },
    { date: 'Sun', records: 2280 },
  ],
  successFailure: [
    { name: 'Success', value: 87, fill: '#10b981' },
    { name: 'Failed', value: 13, fill: '#ef4444' },
  ],
  domainDistribution: [
    { name: 'example-shop.com', value: 35, fill: '#3b82f6' },
    { name: 'news-site.com', value: 25, fill: '#8b5cf6' },
    { name: 'job-board.com', value: 20, fill: '#f59e0b' },
    { name: 'realestate-portal.com', value: 12, fill: '#06b6d4' },
    { name: 'Others', value: 8, fill: '#6b7280' },
  ],
};
