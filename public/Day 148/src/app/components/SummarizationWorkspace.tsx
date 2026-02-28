import { Slider } from '@radix-ui/react-slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { Sparkles, Download, Copy, Share2, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface SummarizationWorkspaceProps {
  onNavigate: (page: string) => void;
}

export function SummarizationWorkspace({ onNavigate }: SummarizationWorkspaceProps) {
  const [summaryLength, setSummaryLength] = useState([50]);
  const [tone, setTone] = useState('formal');
  const [language, setLanguage] = useState('english');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      onNavigate('result');
    }, 2000);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left Side - Document Preview */}
      <div className="flex-1 border-r border-border bg-gray-50 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-border p-8 min-h-[800px]">
            <h2 className="text-2xl font-semibold mb-4">Q4 Financial Report 2025</h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground mb-4">
                This document provides a comprehensive overview of the company's financial performance 
                during the fourth quarter of 2025. The report includes detailed analysis of revenue streams, 
                expense management, and strategic initiatives that contributed to the overall financial health 
                of the organization.
              </p>
              <h3 className="text-lg font-semibold mt-6 mb-3">Executive Summary</h3>
              <p className="text-muted-foreground mb-4">
                The fourth quarter of 2025 marked a significant period of growth and transformation for our 
                organization. Total revenue increased by 23% year-over-year, reaching $45.2 million. This growth 
                was primarily driven by strong performance in our core product lines and successful expansion 
                into new markets.
              </p>
              <p className="text-muted-foreground mb-4">
                Operating expenses were carefully managed, resulting in an improved EBITDA margin of 18.5%, 
                up from 15.2% in Q4 2024. This improvement reflects our continued focus on operational 
                efficiency and strategic cost management initiatives implemented throughout the year.
              </p>
              <h3 className="text-lg font-semibold mt-6 mb-3">Revenue Analysis</h3>
              <p className="text-muted-foreground mb-4">
                Revenue growth was broad-based across all major product categories. Our flagship enterprise 
                software solution contributed $28.3 million in revenue, representing a 26% increase from the 
                previous year. The professional services division generated $12.1 million, while our emerging 
                cloud-based offerings brought in $4.8 million, marking a 45% year-over-year growth.
              </p>
              <p className="text-muted-foreground mb-4">
                Geographically, North American operations accounted for 65% of total revenue, while European 
                and Asia-Pacific markets contributed 25% and 10% respectively. The Asia-Pacific region showed 
                particularly strong growth potential with a 38% increase in quarterly revenue.
              </p>
              <h3 className="text-lg font-semibold mt-6 mb-3">Cost Structure and Profitability</h3>
              <p className="text-muted-foreground mb-4">
                Total operating expenses for Q4 2025 amounted to $36.9 million, up 18% from the prior year 
                quarter. This increase was primarily attributable to strategic investments in research and 
                development ($8.2 million), sales and marketing ($15.7 million), and general and administrative 
                expenses ($13.0 million).
              </p>
              <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-border">
                <p className="text-sm text-muted-foreground italic">
                  Document continues for 38 more pages with detailed financial tables, charts, and appendices...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Summary Panel */}
      <div className="w-[480px] bg-white p-8 overflow-y-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Generate Summary</h2>
          <p className="text-muted-foreground">Configure your summary preferences</p>
        </div>

        {/* Options Panel */}
        <div className="space-y-6 mb-8">
          {/* Summary Length */}
          <div>
            <label className="block mb-3">
              Summary Length
              <span className="ml-2 text-sm text-muted-foreground">({summaryLength}%)</span>
            </label>
            <Slider
              value={summaryLength}
              onValueChange={setSummaryLength}
              max={100}
              step={10}
              className="relative flex items-center select-none touch-none w-full h-5"
            >
              <div className="bg-gray-200 relative grow rounded-full h-2">
                <div 
                  className="absolute h-full rounded-full"
                  style={{
                    width: `${summaryLength}%`,
                    background: 'linear-gradient(135deg, var(--gradient-from) 0%, var(--gradient-to) 100%)'
                  }}
                />
              </div>
              <div 
                className="block w-5 h-5 rounded-full shadow-md border-2 border-white cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, var(--gradient-from) 0%, var(--gradient-to) 100%)',
                  marginLeft: '-10px'
                }}
              />
            </Slider>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Brief</span>
              <span>Detailed</span>
            </div>
          </div>

          {/* Tone Selector */}
          <div>
            <label className="block mb-3">Tone</label>
            <div className="grid grid-cols-3 gap-2">
              {['formal', 'simple', 'bullets'].map((option) => (
                <button
                  key={option}
                  onClick={() => setTone(option)}
                  className={`px-4 py-3 rounded-xl border-2 transition-all capitalize ${
                    tone === option
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-border hover:border-purple-200 hover:bg-purple-50/50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Language Dropdown */}
          <div>
            <label className="block mb-3">Language</label>
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full h-12 px-4 pr-10 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring/20 appearance-none cursor-pointer"
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="chinese">Chinese</option>
                <option value="japanese">Japanese</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <motion.button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full h-14 rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: 'linear-gradient(135deg, var(--gradient-from) 0%, var(--gradient-to) 100%)'
          }}
          whileHover={{ scale: isGenerating ? 1 : 1.02 }}
          whileTap={{ scale: isGenerating ? 1 : 0.98 }}
        >
          {isGenerating ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
              Generating Summary...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Summary
            </>
          )}
        </motion.button>

        {/* Info Box */}
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200">
          <h4 className="font-medium mb-2">💡 Pro Tip</h4>
          <p className="text-sm text-muted-foreground">
            For best results, choose "Formal" tone for business documents and "Simple" for general reading.
          </p>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-border"></div>

        {/* Previous Summaries */}
        <div>
          <h3 className="font-semibold mb-4">Previous Versions</h3>
          <div className="space-y-3">
            {[
              { version: 'v1.2', date: 'Today, 10:30 AM', length: '60%' },
              { version: 'v1.1', date: 'Today, 9:45 AM', length: '40%' },
            ].map((version) => (
              <div
                key={version.version}
                className="p-4 rounded-xl border border-border hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">{version.version}</span>
                  <span className="text-xs text-muted-foreground">{version.length}</span>
                </div>
                <p className="text-xs text-muted-foreground">{version.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
