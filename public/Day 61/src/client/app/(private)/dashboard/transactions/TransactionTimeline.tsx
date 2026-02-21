"use client";

import formatDate from "@/app/utils/formatDate";
import { Clock } from "lucide-react";

const TimelineEvent = ({ date, title, description, isActive }) => {
  return (
    <div className="mb-4 relative">
      <div
        className={`absolute -left-6 mt-1 w-4 h-4 rounded-full ${
          isActive ? "bg-blue-500" : "bg-gray-300"
        }`}
      ></div>
      <p className="text-sm text-gray-500">{date}</p>
      <p className="font-medium">{title}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

const TransactionTimeline = ({ transaction, payment }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-all duration-200 hover:shadow-md">
      <div className="flex items-center mb-4">
        <Clock className="mr-2 text-blue-600" size={20} />
        <h2 className="text-lg font-semibold">Transaction Timeline</h2>
      </div>
      <div className="border-l-2 border-gray-200 pl-4 ml-2">
        <TimelineEvent
          date={formatDate(transaction.createdAt)}
          title="Transaction created"
          description={`Initial status: ${transaction.status}`}
          isActive={true}
        />

        <TimelineEvent
          date={formatDate(payment.createdAt)}
          title="Payment processed"
          description={`Status: ${payment.status}`}
          isActive={false}
        />

        {transaction.status !== "PENDING" && (
          <TimelineEvent
            date={formatDate(transaction.updatedAt)}
            title="Status updated"
            description={`Current status: ${transaction.status}`}
            isActive={false}
          />
        )}
      </div>
    </div>
  );
};

export default TransactionTimeline;
