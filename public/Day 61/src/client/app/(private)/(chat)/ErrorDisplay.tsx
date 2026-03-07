"use client";

import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorDisplayProps {
  message: string;
  retry?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, retry }) => {
  return (
    <div className="flex items-center justify-center h-full w-full p-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md w-full">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{message}</p>
            </div>
            {retry && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={retry}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
