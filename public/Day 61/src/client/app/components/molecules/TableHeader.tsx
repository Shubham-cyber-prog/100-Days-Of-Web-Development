"use client";

import React from "react";
import { RefreshCw } from "lucide-react";

interface TableHeaderProps {
  title?: string;
  subtitle?: string;
  totalResults?: number;
  currentPage?: number;
  resultsPerPage?: number;
  onRefresh?: () => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  title,
  subtitle,
  totalResults,
  currentPage,
  resultsPerPage,
  onRefresh,
}) => {
  return (
    <div className="p-4 sm:p-6 border-b border-blue-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      {(title || subtitle) && (
        <div>
          {title && (
            <h2 className="font-semibold text-lg text-gray-800">{title}</h2>
          )}
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}
      <p className="text-[15px] text-gray-700 pt-[15px] pb-[6px]">
        Showing {totalResults !== undefined ? totalResults : 0} results
        {currentPage ? ` (Page ${currentPage})` : ""}
        {totalResults !== undefined && totalResults > 0 && resultsPerPage
          ? `, showing ${resultsPerPage} items per page`
          : ""}
      </p>
      <div className="flex items-center gap-2 self-end sm:self-auto">
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
          >
            <RefreshCw size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default TableHeader;
