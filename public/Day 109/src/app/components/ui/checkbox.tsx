import { InputHTMLAttributes, forwardRef } from "react";
import { Check } from "lucide-react";
import { clsx } from "clsx";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative inline-flex items-center">
        <input
          ref={ref}
          type="checkbox"
          className={clsx(
            "peer size-4 appearance-none rounded border border-border bg-input-background",
            "checked:bg-primary checked:border-primary",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "cursor-pointer",
            className
          )}
          {...props}
        />
        <Check className="size-3 absolute left-0.5 text-primary-foreground pointer-events-none opacity-0 peer-checked:opacity-100" />
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
