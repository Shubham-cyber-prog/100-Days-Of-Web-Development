"use client";
import { useForm, Controller } from "react-hook-form";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface RestockFormData {
  quantity: number;
  notes?: string;
}

interface RestockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (variantId: string, data: RestockFormData) => void;
  variant: { id: string; sku: string } | null;
  isLoading?: boolean;
}

const RestockModal: React.FC<RestockModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  variant,
  isLoading,
}) => {
  const form = useForm<RestockFormData>({
    defaultValues: {
      quantity: 0,
      notes: "",
    },
  });

  const { control, handleSubmit, reset, formState: { errors } } = form;

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
            className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md max-h-[80%] overflow-auto border border-gray-100"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Restock Variant: {variant?.sku}
              </h2>
              <button
                onClick={() => {
                  onClose();
                  reset();
                }}
                className="text-gray-400 hover:text-gray-700 transition-colors duration-200 rounded-full p-1 hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit((data) => onSubmit(variant!.id, data))} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <Controller
                  name="quantity"
                  control={control}
                  rules={{ required: "Quantity is required", min: { value: 1, message: "Quantity must be positive" } }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      className="px-4 py-3 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="100"
                    />
                  )}
                />
                {errors.quantity && (
                  <p className="text-red-500 text-xs mt-1">{errors.quantity.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (Optional)
                </label>
                <Controller
                  name="notes"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      className="px-4 py-3 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Restock notes..."
                      rows={3}
                    />
                  )}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-6 py-3 text-white rounded-lg shadow-md font-medium flex items-center justify-center min-w-24 ${
                    isLoading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  } transition-all duration-200`}
                >
                  {isLoading ? "Restocking..." : "Restock"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RestockModal;