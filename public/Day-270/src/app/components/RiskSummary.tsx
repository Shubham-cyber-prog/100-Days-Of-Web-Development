import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { AnalysisResult } from "../types";
import { RiskScoreMeter } from "./RiskScoreMeter";
import { motion } from "motion/react";

interface RiskSummaryProps {
  result: AnalysisResult;
}

export function RiskSummary({ result }: RiskSummaryProps) {
  const getRecommendation = () => {
    switch (result.riskLevel) {
      case "safe":
        return {
          icon: CheckCircle,
          text: "Safe to visit",
          description: "This URL appears to be legitimate and safe to access.",
          color: "text-green-600 dark:text-green-400",
          bgColor: "bg-green-50 dark:bg-green-900/20",
        };
      case "suspicious":
        return {
          icon: AlertTriangle,
          text: "Proceed with caution",
          description: "This URL shows some suspicious indicators. Verify the source before proceeding.",
          color: "text-yellow-600 dark:text-yellow-400",
          bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
        };
      case "high-risk":
        return {
          icon: XCircle,
          text: "Do not visit",
          description: "This URL shows multiple high-risk indicators. It is likely a phishing attempt.",
          color: "text-red-600 dark:text-red-400",
          bgColor: "bg-red-50 dark:bg-red-900/20",
        };
    }
  };

  const recommendation = getRecommendation();
  const Icon = recommendation.icon;

  const getThreatClassification = () => {
    switch (result.riskLevel) {
      case "safe":
        return "Legitimate Website";
      case "suspicious":
        return "Potentially Malicious";
      case "high-risk":
        return "Phishing Attempt";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-6"
    >
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Risk Summary</h3>

      <div className="flex justify-center mb-6">
        <RiskScoreMeter score={result.riskScore} />
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Threat Classification</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {getThreatClassification()}
          </p>
        </div>

        <div className={`p-4 rounded-lg ${recommendation.bgColor}`}>
          <div className="flex items-start gap-3">
            <Icon className={`size-6 flex-shrink-0 ${recommendation.color}`} />
            <div>
              <p className={`font-semibold mb-1 ${recommendation.color}`}>{recommendation.text}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{recommendation.description}</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Analysis Summary</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total Checks:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {result.threatSignals.length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Passed:</span>
              <span className="font-medium text-green-600 dark:text-green-400">
                {result.threatSignals.filter((s) => s.status === "pass").length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Warnings:</span>
              <span className="font-medium text-yellow-600 dark:text-yellow-400">
                {result.threatSignals.filter((s) => s.status === "warning").length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Failed:</span>
              <span className="font-medium text-red-600 dark:text-red-400">
                {result.threatSignals.filter((s) => s.status === "fail").length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
