import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { cn } from "./ui/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

export function LoadingSpinner({
  size = "md",
  text,
  className,
}: LoadingSpinnerProps) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className={cn(sizes[size], "text-primary")} />
      </motion.div>
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );
}