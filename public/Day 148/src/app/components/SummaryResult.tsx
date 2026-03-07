import { Copy, Download, Share2, Sparkles, TrendingUp, Tag, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';

export function SummaryResult() {
  const [activeTab, setActiveTab] = useState('summary');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const summaryText = `The Q4 2025 Financial Report demonstrates exceptional company performance with total revenue reaching $45.2 million, representing a 23% year-over-year increase. This growth was driven by strong performance across all product categories, particularly the flagship enterprise software solution ($28.3M, +26%) and emerging cloud-based offerings ($4.8M, +45%).

Operating efficiency improved significantly, with EBITDA margin expanding to 18.5% from 15.2% in Q4 2024. This improvement reflects successful cost management initiatives despite strategic investments in R&D ($8.2M), sales and marketing ($15.7M), and general administration ($13.0M).

Geographically, North America remains the dominant market (65% of revenue), while the Asia-Pacific region shows the strongest growth potential with a 38% quarterly increase. The professional services division contributed $12.1M in revenue.

Total operating expenses of $36.9M represent an 18% increase from the prior year, primarily due to strategic investments in growth initiatives and infrastructure development.`;

  const keyInsights = [
    { title: 'Revenue Growth', value: '+23% YoY', description: 'Total revenue reached $45.2M in Q4 2025', trend: 'up' },
    { title: 'EBITDA Margin', value: '18.5%', description: 'Improved from 15.2% in Q4 2024', trend: 'up' },
    { title: 'Cloud Services', value: '+45% YoY', description: 'Fastest growing product segment', trend: 'up' },
    { title: 'APAC Growth', value: '+38%', description: 'Strongest regional performance', trend: 'up' },
  ];

  const keywords = [
    'Revenue Growth', 'EBITDA', 'Enterprise Software', 'Cloud Services', 
    'Operating Efficiency', 'Asia-Pacific', 'Strategic Investment', 'Cost Management',
    'Professional Services', 'Market Expansion', 'R&D', 'Year-over-Year'
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{
            background: 'linear-gradient(135deg, var(--gradient-from) 0%, var(--gradient-to) 100%)'
          }}>
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl font-semibold">Summary Generated Successfully!</h1>
        </div>
        <p className="text-muted-foreground">Q4 Financial Report 2025 • 45 pages → 1 page • 97% compression</p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-3 mb-8"
      >
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:bg-accent transition-colors"
        >
          {copied ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </>
          )}
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:bg-accent transition-colors">
          <Download className="w-4 h-4" />
          <span>Download</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:bg-accent transition-colors">
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      </motion.div>

      {/* Tabs */}
      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <Tabs.List className="flex gap-2 mb-6 border-b border-border">
          <Tabs.Trigger
            value="summary"
            className={`px-4 py-3 font-medium transition-colors relative ${
              activeTab === 'summary' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Summary
            {activeTab === 'summary' && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{
                  background: 'linear-gradient(135deg, var(--gradient-from) 0%, var(--gradient-to) 100%)'
                }}
              />
            )}
          </Tabs.Trigger>
          <Tabs.Trigger
            value="insights"
            className={`px-4 py-3 font-medium transition-colors relative ${
              activeTab === 'insights' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Key Insights
            {activeTab === 'insights' && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{
                  background: 'linear-gradient(135deg, var(--gradient-from) 0%, var(--gradient-to) 100%)'
                }}
              />
            )}
          </Tabs.Trigger>
          <Tabs.Trigger
            value="keywords"
            className={`px-4 py-3 font-medium transition-colors relative ${
              activeTab === 'keywords' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Keywords
            {activeTab === 'keywords' && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{
                  background: 'linear-gradient(135deg, var(--gradient-from) 0%, var(--gradient-to) 100%)'
                }}
              />
            )}
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="summary">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 border border-border shadow-sm"
          >
            <div className="prose prose-sm max-w-none">
              {summaryText.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Highlight Section */}
            <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Key Highlight</h3>
                  <p className="text-sm text-muted-foreground">
                    The company achieved its strongest quarterly performance in history with a 23% revenue 
                    increase and significant margin expansion, positioning it well for continued growth in 2026.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </Tabs.Content>

        <Tabs.Content value="insights">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 gap-4"
          >
            {keyInsights.map((insight, index) => (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                    ↑ {insight.value}
                  </span>
                </div>
                <h3 className="font-semibold mb-2">{insight.title}</h3>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </Tabs.Content>

        <Tabs.Content value="keywords">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 border border-border shadow-sm"
          >
            <div className="flex items-center gap-2 mb-6">
              <Tag className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold">Extracted Keywords</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {keywords.map((keyword, index) => (
                <motion.span
                  key={keyword}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 text-sm font-medium text-purple-700 hover:shadow-md transition-shadow cursor-pointer"
                >
                  {keyword}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </Tabs.Content>
      </Tabs.Root>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 bg-white rounded-2xl p-6 border border-border shadow-sm"
      >
        <div className="grid grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Original Length</p>
            <p className="text-2xl font-semibold">45 pages</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Summary Length</p>
            <p className="text-2xl font-semibold">1 page</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Compression</p>
            <p className="text-2xl font-semibold text-green-600">97%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Time Saved</p>
            <p className="text-2xl font-semibold text-purple-600">~42 min</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
