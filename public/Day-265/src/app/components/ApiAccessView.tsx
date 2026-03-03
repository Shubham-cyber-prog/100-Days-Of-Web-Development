import { Code, Copy, Key, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export function ApiAccessView() {
  // Example API key (replace with real key from props or context as needed)
  const [apiKey, setApiKey] = useState('YOUR_API_KEY');
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      setCopied(false);
    }
  };

  // Dummy regenerate handler (replace with real logic as needed)
  const handleRegenerate = () => {
    // Example: generate a new random key (for demo only)
    const newKey = 'sk-' + Math.random().toString(36).slice(2, 18);
    setApiKey(newKey);
    setShowApiKey(false);
    setCopied(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">API Access</h1>
        <p className="text-gray-600 mt-1">Integrate web scraping into your applications</p>
      </div>

      {/* API Key Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Key className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">API Key</h2>
              <p className="text-sm text-gray-600">Use this key to authenticate API requests</p>
            </div>
          </div>
          <button
            className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm"
            onClick={handleRegenerate}
            type="button"
          >
            <RefreshCw className="w-4 h-4" />
            Regenerate
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-sm flex items-center justify-between">
            <span>{showApiKey ? apiKey : '•'.repeat(apiKey.length)}</span>
            <button
              onClick={() => setShowApiKey((v: boolean) => !v)}
              className="p-1 hover:bg-gray-200 rounded"
              type="button"
              aria-label={showApiKey ? 'Hide API key' : 'Show API key'}
            >
              {showApiKey ? <EyeOff className="w-4 h-4 text-gray-600" /> : <Eye className="w-4 h-4 text-gray-600" />}
            </button>
          </div>
          <button
            className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            onClick={handleCopy}
            type="button"
            aria-label="Copy API key"
          >
            <Copy className="w-4 h-4" />
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Important:</strong> Keep your API key secure and never share it publicly. 
            Anyone with this key can access your scraping jobs and data.
          </p>
        </div>
      </div>

      {/* API Documentation */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">API Endpoints</h2>
            <p className="text-sm text-gray-600">Available API endpoints and usage examples</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* List Jobs Endpoint */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">GET</span>
              <code className="text-sm font-mono text-gray-900">/api/v1/jobs</code>
            </div>
            <p className="text-sm text-gray-600 mb-3">List all scraping jobs</p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-gray-100 font-mono">
{`curl -X GET https://api.scraper.com/v1/jobs \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
              </pre>
            </div>
          </div>

          {/* Create Job Endpoint */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">POST</span>
              <code className="text-sm font-mono text-gray-900">/api/v1/jobs</code>
            </div>
            <p className="text-sm text-gray-600 mb-3">Create a new scraping job</p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-gray-100 font-mono">
{`curl -X POST https://api.scraper.com/v1/jobs \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "My Scraping Job",
    "target_url": "https://example.com",
    "css_selector": ".product-card",
    "schedule": "hourly"
  }'`}
              </pre>
            </div>
          </div>

          {/* Get Job Data Endpoint */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">GET</span>
              <code className="text-sm font-mono text-gray-900">/api/v1/jobs/:id/data</code>
            </div>
            <p className="text-sm text-gray-600 mb-3">Get scraped data for a specific job</p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-gray-100 font-mono">
{`curl -X GET https://api.scraper.com/v1/jobs/123/data \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
              </pre>
            </div>
          </div>

          {/* Start Job Endpoint */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">POST</span>
              <code className="text-sm font-mono text-gray-900">/api/v1/jobs/:id/start</code>
            </div>
            <p className="text-sm text-gray-600 mb-3">Start a scraping job</p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-gray-100 font-mono">
{`curl -X POST https://api.scraper.com/v1/jobs/123/start \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Rate Limits */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Rate Limits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Requests per hour</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">1,000</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Concurrent jobs</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">10</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Data retention</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">30 days</p>
          </div>
        </div>
      </div>

      {/* SDK Libraries */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Official SDK Libraries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900">Python</h3>
              <span className="text-xs text-gray-500">v2.1.0</span>
            </div>
            <code className="text-sm bg-gray-50 px-2 py-1 rounded">pip install scraper-sdk</code>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900">Node.js</h3>
              <span className="text-xs text-gray-500">v2.1.0</span>
            </div>
            <code className="text-sm bg-gray-50 px-2 py-1 rounded">npm install scraper-sdk</code>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900">Ruby</h3>
              <span className="text-xs text-gray-500">v2.0.3</span>
            </div>
            <code className="text-sm bg-gray-50 px-2 py-1 rounded">gem install scraper-sdk</code>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900">PHP</h3>
              <span className="text-xs text-gray-500">v1.9.0</span>
            </div>
            <code className="text-sm bg-gray-50 px-2 py-1 rounded">composer require scraper/sdk</code>
          </div>
        </div>
      </div>
    </div>
  );
}
