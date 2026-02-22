"use client";

import { ArrowLeft } from "lucide-react";

const ErrorState = ({ message, onBack }) => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        <p className="font-medium">Error loading transaction</p>
        <p>{message}</p>
        <button
          onClick={onBack}
          className="mt-3 flex items-center text-red-700 hover:text-red-900"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to transactions
        </button>
      </div>
    </div>
  );
};

export default ErrorState;
