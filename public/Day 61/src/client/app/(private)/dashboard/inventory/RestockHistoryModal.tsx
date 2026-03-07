"use client";
import { useGetRestockHistoryQuery } from "@/app/store/apis/VariantApi";
import Table from "@/app/components/layout/Table";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface RestockHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  variantId?: string;
}

const RestockHistoryModal: React.FC<RestockHistoryModalProps> = ({
  isOpen,
  onClose,
  variantId,
}) => {
  const { data, isLoading } = useGetRestockHistoryQuery(
    { variantId: variantId!, page: 1, limit: 10 },
    { skip: !variantId }
  );
  const restocks = data?.restocks || [];

  const columns = [
    {
      key: "quantity",
      label: "Quantity",
      sortable: true,
      render: (row: any) => <span>{row.quantity}</span>,
    },
    {
      key: "notes",
      label: "Notes",
      sortable: false,
      render: (row: any) => <span>{row.notes || "N/A"}</span>,
    },
    {
      key: "user",
      label: "Restocked By",
      sortable: false,
      render: (row: any) => <span>{row.user?.name || "Unknown"}</span>,
    },
    {
      key: "createdAt",
      label: "Date",
      sortable: true,
      render: (row: any) => (
        <span>{new Date(row.createdAt).toLocaleDateString()}</span>
      ),
    },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-4xl max-h-[80%] overflow-auto border border-gray-100"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Restock History
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-700 transition-colors duration-200 rounded-full p-1 hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>

            <Table
              data={restocks}
              columns={columns}
              isLoading={isLoading}
              emptyMessage="No restock history available"
              totalPages={data?.totalPages}
              totalResults={data?.totalResults}
              resultsPerPage={data?.resultsPerPage}
              currentPage={data?.currentPage}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RestockHistoryModal;