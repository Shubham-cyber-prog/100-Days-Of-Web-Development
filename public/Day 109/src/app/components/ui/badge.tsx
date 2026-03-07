import { HTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "published" | "draft" | "archived" | "default";
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(
          "inline-flex items-center px-2.5 py-0.5 rounded-md text-xs whitespace-nowrap",
          {
            "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400": variant === "published",
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400": variant === "draft",
            "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400": variant === "archived",
            "bg-secondary text-secondary-foreground": variant === "default",
          },
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
