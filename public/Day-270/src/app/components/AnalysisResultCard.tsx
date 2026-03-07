import { AnalysisResult } from "../types";
import { StatusBadge } from "./StatusBadge";
import { motion } from "motion/react";

interface AnalysisResultCardProps {
  result: AnalysisResult;
}

export function AnalysisResultCard({ result }: AnalysisResultCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
    >
      <div className="text-center">
        <h3 className="text-lg text-gray-600 dark:text-gray-400 mb-4">Analysis Result</h3>
        <div className="flex justify-center mb-4">
          <StatusBadge riskLevel={result.riskLevel} size="lg" />
        </div>
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Analyzed URL</p>
          <p className="text-gray-900 dark:text-white font-mono text-sm break-all">
            {result.url}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
