import { CheckCircle, AlertTriangle, XCircle, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AlertProps {
  type: "success" | "warning" | "error" | "info";
  message: string;
  onClose?: () => void;
}

export function Alert({ type, message, onClose }: AlertProps) {
  const config = {
    success: {
      icon: CheckCircle,
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-500",
      textColor: "text-green-800 dark:text-green-300",
      iconColor: "text-green-600 dark:text-green-400",
    },
    warning: {
      icon: AlertTriangle,
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      borderColor: "border-yellow-500",
      textColor: "text-yellow-800 dark:text-yellow-300",
      iconColor: "text-yellow-600 dark:text-yellow-400",
    },
    error: {
      icon: XCircle,
      bgColor: "bg-red-50 dark:bg-red-900/20",
      borderColor: "border-red-500",
      textColor: "text-red-800 dark:text-red-300",
      iconColor: "text-red-600 dark:text-red-400",
    },
    info: {
      icon: Info,
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-500",
      textColor: "text-blue-800 dark:text-blue-300",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
  };

  const { icon: Icon, bgColor, borderColor, textColor, iconColor } = config[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex items-start gap-3 p-4 rounded-lg border ${bgColor} ${borderColor}`}
    >
      <Icon className={`size-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
      <p className={`flex-1 text-sm ${textColor}`}>{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className={`flex-shrink-0 p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 ${iconColor}`}
        >
          <X className="size-4" />
        </button>
      )}
    </motion.div>
  );
}
