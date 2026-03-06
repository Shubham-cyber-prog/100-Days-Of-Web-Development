import { useState } from "react";
import { NavigationBar } from "../components/NavigationBar";
import { URLInputPanel } from "../components/URLInputPanel";
import { AnalysisResultCard } from "../components/AnalysisResultCard";
import { ThreatBreakdownPanel } from "../components/ThreatBreakdownPanel";
import { TechnicalDetails } from "../components/TechnicalDetails";
import { RiskSummary } from "../components/RiskSummary";
import { ScanHistoryTable } from "../components/ScanHistoryTable";
import { EmptyState } from "../components/EmptyState";
import { analyzeURL } from "../utils/phishingDetector";
import { AnalysisResult } from "../types";

export function MainPage() {
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async (url: string) => {
    setIsAnalyzing(true);
    setShowHistory(false);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const result = analyzeURL(url);
    setCurrentResult(result);
    setHistory((prev) => [result, ...prev]);
    setIsAnalyzing(false);
  };

  const handleHistoryClick = () => {
    setShowHistory(!showHistory);
  };

  const handleSelectScan = (result: AnalysisResult) => {
    setCurrentResult(result);
    setShowHistory(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavigationBar onHistoryClick={handleHistoryClick} />

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <URLInputPanel onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
        </div>

        {showHistory ? (
          <ScanHistoryTable
            history={history}
            onClose={() => setShowHistory(false)}
            onSelectScan={handleSelectScan}
          />
        ) : currentResult ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <AnalysisResultCard result={currentResult} />
              <ThreatBreakdownPanel signals={currentResult.threatSignals} />
              <TechnicalDetails result={currentResult} />
            </div>

            <div className="lg:col-span-1">
              <RiskSummary result={currentResult} />
            </div>
          </div>
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  );
}
