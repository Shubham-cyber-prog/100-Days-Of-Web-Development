"use client";

import Dropdown from "@/app/components/molecules/Dropdown";
import { ArrowLeft } from "lucide-react";

const PageHeader = ({
  transaction,
  onBack,
  onUpdateStatus,
  isUpdating,
  newStatus,
  setNewStatus,
  statusOptions,
}) => {
  return (
    <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center">
      <div>
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-2 transition duration-200"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span className="text-sm">Back to transactions</span>
        </button>
        <h1 className="text-2xl font-bold">Transaction Details</h1>
        <p className="text-sm text-gray-500">
          View detailed information about this transaction
        </p>
      </div>
      <div className="flex items-center space-x-3 mt-4 md:mt-0">
        {!isUpdating ? (
          <>
            <Dropdown
              value={newStatus || transaction.status}
              onChange={(value) => setNewStatus(value || "")}
              options={statusOptions}
              className="w-40"
            />
            <button
              onClick={onUpdateStatus}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
            >
              Update Status
            </button>
          </>
        ) : (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500 mr-2"></div>
            <span>Updating...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
