import { useState } from "react";
import { Search, Clipboard, AlertCircle } from "lucide-react";

interface URLInputPanelProps {
  onAnalyze: (url: string) => void;
  isAnalyzing: boolean;
}

export function URLInputPanel({ onAnalyze, isAnalyzing }: URLInputPanelProps) {
  const [url, setUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState<boolean | null>(null);

  const validateUrl = (input: string) => {
    if (!input.trim()) {
      setIsValidUrl(null);
      return;
    }

    try {
      let normalized = input.trim();
      if (!normalized.startsWith("http://") && !normalized.startsWith("https://")) {
        normalized = "https://" + normalized;
      }
      new URL(normalized);
      setIsValidUrl(true);
    } catch {
      setIsValidUrl(false);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    validateUrl(value);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      validateUrl(text);
    } catch (err) {
      console.error("Failed to read clipboard:", err);
    }
  };

  const handleAnalyze = () => {
    if (url.trim() && isValidUrl !== false) {
      onAnalyze(url);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && url.trim() && isValidUrl !== false) {
      handleAnalyze();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Enter URL to Analyze
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Paste or type any URL to check for phishing indicators and security threats
          </p>
        </div>

        <div className="relative">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={url}
                onChange={handleUrlChange}
                onKeyPress={handleKeyPress}
                placeholder="https://example.com"
                className={`w-full px-5 py-4 pr-12 text-lg rounded-lg border-2 transition-colors focus:outline-none ${
                  isValidUrl === false
                    ? "border-red-500 focus:border-red-600 bg-red-50 dark:bg-red-900/10"
                    : isValidUrl === true
                    ? "border-green-500 focus:border-green-600 bg-green-50 dark:bg-green-900/10"
                    : "border-gray-300 dark:border-gray-600 focus:border-blue-500 bg-white dark:bg-gray-700"
                } text-gray-900 dark:text-white placeholder:text-gray-400`}
              />
              {isValidUrl !== null && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  {isValidUrl ? (
                    <div className="size-6 rounded-full bg-green-500 flex items-center justify-center">
                      <svg
                        className="size-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  ) : (
                    <AlertCircle className="size-6 text-red-500" />
                  )}
                </div>
              )}
            </div>

            <button
              onClick={handlePaste}
              className="px-4 py-4 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Paste from clipboard"
            >
              <Clipboard className="size-5" />
            </button>
          </div>

          {isValidUrl === false && url && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
              <AlertCircle className="size-4" />
              Please enter a valid URL
            </p>
          )}
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!url.trim() || isValidUrl === false || isAnalyzing}
          className="mt-6 w-full py-4 px-6 rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold text-lg flex items-center justify-center gap-3 transition-colors"
        >
          <Search className="size-5" />
          {isAnalyzing ? "Analyzing..." : "Analyze URL"}
        </button>
      </div>
    </div>
  );
}
