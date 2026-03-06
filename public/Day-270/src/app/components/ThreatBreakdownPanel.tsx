import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { ThreatSignal } from "../types";
import { motion } from "motion/react";

interface ThreatBreakdownPanelProps {
  signals: ThreatSignal[];
}

export function ThreatBreakdownPanel({ signals }: ThreatBreakdownPanelProps) {
  const getIcon = (status: string) => {
    switch (status) {
      case "pass":
        return <CheckCircle className="size-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="size-5 text-yellow-500" />;
      case "fail":
        return <XCircle className="size-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "pass":
        return "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/30";
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-900/30";
      case "fail":
        return "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30";
      default:
        return "bg-gray-50 dark:bg-gray-900/10 border-gray-200 dark:border-gray-700";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
    >
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Threat Breakdown
      </h3>

      <div className="space-y-4">
        {signals.map((signal, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
            className={`p-4 rounded-lg border ${getStatusBg(signal.status)}`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{getIcon(signal.status)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">{signal.name}</h4>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      signal.status === "pass"
                        ? "bg-green-200 dark:bg-green-900/40 text-green-700 dark:text-green-300"
                        : signal.status === "warning"
                        ? "bg-yellow-200 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300"
                        : "bg-red-200 dark:bg-red-900/40 text-red-700 dark:text-red-300"
                    }`}
                  >
                    {signal.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{signal.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
