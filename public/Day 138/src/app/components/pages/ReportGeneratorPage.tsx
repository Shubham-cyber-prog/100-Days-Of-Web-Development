import { useState } from "react";
import { FileText, Download, Share2, Copy, Sparkles } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { LoadingState } from "../common/LoadingState";

export function ReportGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
    }, 3000);
  };

  const examplePrompts = [
    "Generate a competitive analysis report for the SaaS industry in Q1 2026",
    "Create a market trend summary for AI/ML technologies",
    "Analyze customer sentiment for our product over the last 6 months",
    "Compare our market position against top 5 competitors",
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            AI Report Generator
          </h1>
          <p className="text-gray-600 mt-1">
            Generate comprehensive market research reports using AI
          </p>
        </div>
      </div>

      {/* Prompt Input */}
      <Card className="p-6 rounded-2xl border-2 border-dashed border-blue-300 bg-gradient-to-br from-blue-50 to-teal-50 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            What would you like to analyze?
          </h3>
        </div>
        <Textarea
          placeholder="E.g., 'Generate a comprehensive market analysis report for the AI/ML industry, including competitive landscape, customer sentiment, and growth predictions for Q2 2026'"
          className="min-h-32 mb-4 bg-white"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {prompt.length}/500 characters
          </p>
          <Button
            onClick={handleGenerate}
            disabled={!prompt || isGenerating}
            className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </Card>

      {/* Example Prompts */}
      {!hasGenerated && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Example prompts:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {examplePrompts.map((example, index) => (
              <Card
                key={index}
                className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-all cursor-pointer hover:shadow-md"
                onClick={() => setPrompt(example)}
              >
                <p className="text-sm text-gray-700">{example}</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {isGenerating && <LoadingState message="Generating your report..." />}

      {/* Generated Report */}
      {hasGenerated && !isGenerating && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge className="bg-green-100 text-green-700 border-green-200">
                Report Generated
              </Badge>
              <span className="text-sm text-gray-600">
                Generated on {new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2">
                <Copy className="w-4 h-4" />
                Copy
              </Button>
              <Button variant="outline" className="gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button className="gap-2 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
                <Download className="w-4 h-4" />
                Export PDF
              </Button>
            </div>
          </div>

          <Card className="p-8 rounded-2xl border border-gray-200 shadow-sm">
            <div className="prose max-w-none">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Market Analysis Report: SaaS Industry Q1 2026
                </h2>
                <p className="text-sm text-gray-600">
                  AI-Generated Comprehensive Analysis
                </p>
              </div>

              <div className="space-y-6">
                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Executive Summary
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    The SaaS industry demonstrated robust growth in Q1 2026,
                    with a market size expansion of 18.3% year-over-year. This
                    growth is primarily driven by increased adoption of
                    AI-powered tools, remote work infrastructure, and digital
                    transformation initiatives across enterprise sectors. Total
                    market valuation reached $4.2 billion, exceeding initial
                    projections by 12%.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Market Size & Growth
                  </h3>
                  <Card className="p-4 bg-gradient-to-br from-blue-50 to-teal-50 border-blue-200 mb-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-sm text-gray-600">Market Size</p>
                        <p className="text-2xl font-bold text-gray-900">
                          $4.2B
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Growth Rate</p>
                        <p className="text-2xl font-bold text-green-600">
                          +18.3%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">AI Confidence</p>
                        <p className="text-2xl font-bold text-purple-600">
                          94%
                        </p>
                      </div>
                    </div>
                  </Card>
                  <p className="text-gray-700 leading-relaxed">
                    Key growth drivers include the proliferation of AI/ML
                    capabilities in SaaS products, increased demand for
                    analytics and business intelligence tools, and continued
                    shift towards subscription-based business models. The market
                    shows particular strength in vertical-specific solutions,
                    with healthcare and financial services leading adoption
                    rates.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Competitive Landscape
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The competitive environment remains highly dynamic with 47
                    active competitors tracked across various segments. Market
                    consolidation continues as larger players acquire emerging
                    startups to expand capabilities and market reach.
                  </p>
                  <div className="space-y-3">
                    <Card className="p-4 border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            Market Leader: TechCorp
                          </h4>
                          <p className="text-sm text-gray-600">
                            23% market share, strong in enterprise segment
                          </p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-700">
                          Leader
                        </Badge>
                      </div>
                    </Card>
                    <Card className="p-4 border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            Fast Riser: InsightHub
                          </h4>
                          <p className="text-sm text-gray-600">
                            25% growth rate, strong customer sentiment (92%)
                          </p>
                        </div>
                        <Badge className="bg-green-100 text-green-700">
                          Rising
                        </Badge>
                      </div>
                    </Card>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Customer Sentiment Analysis
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Overall customer sentiment remains positive at 65%, with
                    particular praise for ease of use, customer support quality,
                    and feature richness. Primary concerns center around pricing
                    structures and integration complexity. Social listening data
                    reveals increasing demand for AI-powered features and
                    improved data visualization capabilities.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Growth Predictions
                  </h3>
                  <Card className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-purple-600 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-2">
                          AI Forecast
                        </p>
                        <p className="text-sm text-gray-700">
                          Based on current trends and historical patterns, we
                          predict a 28% growth in Q2 2026, driven by seasonal
                          factors and increased enterprise adoption. The market
                          is expected to reach $5.8 billion by end of Q3 2026.
                        </p>
                      </div>
                    </div>
                  </Card>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Recommendations
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span className="text-gray-700">
                        Focus on AI/ML feature development to stay competitive
                        in the rapidly evolving landscape
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span className="text-gray-700">
                        Consider strategic partnerships in healthcare and
                        fintech verticals where growth is strongest
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span className="text-gray-700">
                        Address pricing concerns through flexible tier
                        structures and transparent ROI demonstrations
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span className="text-gray-700">
                        Invest in integration capabilities to reduce setup
                        complexity and improve customer satisfaction
                      </span>
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </Card>

          {/* Export Options */}
          <Card className="p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Export Options
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2 hover:border-blue-500"
              >
                <FileText className="w-6 h-6" />
                <span className="text-sm">Export as PDF</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2 hover:border-blue-500"
              >
                <FileText className="w-6 h-6" />
                <span className="text-sm">Export as CSV</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2 hover:border-blue-500"
              >
                <Share2 className="w-6 h-6" />
                <span className="text-sm">Get Share Link</span>
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
