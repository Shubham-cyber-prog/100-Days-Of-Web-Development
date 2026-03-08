import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useEffect } from "react";

export interface NotificationProps {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

export function NotificationToast({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
}: NotificationProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, id, onClose]);

  const config = {
    success: {
      bg: "bg-[#1B5E20]",
      border: "border-[#00E676]",
      icon: CheckCircle,
      iconColor: "text-[#00E676]",
    },
    error: {
      bg: "bg-[#3A1A1A]",
      border: "border-red-500",
      icon: XCircle,
      iconColor: "text-red-500",
    },
    warning: {
      bg: "bg-[#2A2A1A]",
      border: "border-yellow-500",
      icon: AlertCircle,
      iconColor: "text-yellow-500",
    },
    info: {
      bg: "bg-[#1A2A3A]",
      border: "border-blue-500",
      icon: AlertCircle,
      iconColor: "text-blue-500",
    },
  };

  const { bg, border, icon: Icon, iconColor } = config[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`${bg} ${border} border-2 rounded-xl p-4 shadow-2xl backdrop-blur-sm min-w-[320px] max-w-md`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`${iconColor} flex-shrink-0 mt-0.5 animate-pulse-slow`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-bold text-base mb-1">{title}</h4>
          <p className="text-[#BDBDBD] text-sm leading-relaxed">{message}</p>
        </div>
        <button
          onClick={() => onClose(id)}
          className="text-[#BDBDBD] hover:text-white transition-colors flex-shrink-0"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}

export function NotificationContainer({
  notifications,
  onClose,
}: {
  notifications: NotificationProps[];
  onClose: (id: string) => void;
}) {
  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-3 pointer-events-none">
      <div className="pointer-events-auto">
        <AnimatePresence mode="popLayout">
          {notifications.map((notification) => (
            <div key={notification.id} className="mb-3">
              <NotificationToast {...notification} onClose={onClose} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
