import { Shield, Search, History, Lock } from "lucide-react";

export function EmptyState() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center size-20 rounded-full bg-red-100 dark:bg-red-900/20 mb-6">
          <Shield className="size-10 text-red-600 dark:text-red-400" />
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
          Protect Yourself from Phishing
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Enter a URL above to analyze it for potential phishing indicators and security threats.
          Our tool examines multiple factors to help you stay safe online.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
            <div className="size-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-3">
              <Search className="size-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Deep Analysis
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Comprehensive URL scanning with multiple security checks
            </p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
            <div className="size-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-3">
              <Lock className="size-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Real-time Protection
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Instant risk assessment and detailed threat breakdown
            </p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
            <div className="size-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-3">
              <History className="size-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Track History
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Keep a record of all scanned URLs for future reference
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
