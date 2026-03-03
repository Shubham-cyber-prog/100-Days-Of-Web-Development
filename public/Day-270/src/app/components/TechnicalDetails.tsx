import { useState } from "react";
import { ChevronDown, ChevronUp, Globe, MapPin, Calendar, Shield, Link2 } from "lucide-react";
import { AnalysisResult } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface TechnicalDetailsProps {
  result: AnalysisResult;
}

export function TechnicalDetails({ result }: TechnicalDetailsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Technical Details</h3>
        {isExpanded ? (
          <ChevronUp className="size-5 text-gray-500" />
        ) : (
          <ChevronDown className="size-5 text-gray-500" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200 dark:border-gray-700"
          >
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <Globe className="size-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">IP Address</p>
                    <p className="font-mono text-gray-900 dark:text-white">
                      {result.technicalDetails.ipAddress}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                    <MapPin className="size-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Hosting Country
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {result.technicalDetails.hostingCountry}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <Calendar className="size-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Domain Age</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {result.technicalDetails.domainAge}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                    <Shield className="size-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      SSL Certificate
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {result.technicalDetails.sslValid ? "Valid" : "Invalid"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
                    <Link2 className="size-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Redirect Chain
                    </p>
                    <div className="space-y-2">
                      {result.technicalDetails.redirectChain.map((url, index) => (
                        <div
                          key={index}
                          className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg font-mono text-sm text-gray-900 dark:text-white break-all"
                        >
                          {index + 1}. {url}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Note:</span> Technical details are simulated for
                  demonstration purposes. In a production environment, this would include real WHOIS
                  data, DNS records, and other security intelligence.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
