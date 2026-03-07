"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, Check } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  type?: "warning" | "danger" | "info";
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
  title = "Confirm Action",
  type = "warning",
}) => {
  // Define colors based on type
  const getTypeStyles = () => {
    switch (type) {
      case "danger":
        return {
          icon: <AlertTriangle size={28} className="text-red-500" />,
          confirmButton: "bg-red-500 hover:bg-red-600",
          iconBackground: "bg-red-100",
        };
      case "info":
        return {
          icon: <AlertTriangle size={28} className="text-blue-500" />,
          confirmButton: "bg-blue-500 hover:bg-blue-600",
          iconBackground: "bg-blue-100",
        };
      case "warning":
      default:
        return {
          icon: <AlertTriangle size={28} className="text-amber-500" />,
          confirmButton: "bg-amber-500 hover:bg-amber-600",
          iconBackground: "bg-amber-100",
        };
    }
  };

  const { icon, confirmButton, iconBackground } = getTypeStyles();

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 40,
        stiffness: 800,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-xs z-50">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-xl w-96 border border-gray-200"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-start mb-4">
              <div className={`${iconBackground} p-2 rounded-full mr-3`}>
                {icon}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                <p className="mt-2 text-gray-600">{message}</p>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 flex items-center font-medium transition-colors"
                onClick={onCancel}
              >
                <X size={16} className="mr-1" />
                Cancel
              </button>
              <button
                className={`px-4 py-2 text-white rounded-md flex items-center font-medium transition-colors ${confirmButton}`}
                onClick={onConfirm}
              >
                <Check size={16} className="mr-1" />
                Confirm
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
