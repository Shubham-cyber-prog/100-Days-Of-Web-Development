"use client";

import React from "react";
import { motion } from "framer-motion";
import { Controller } from "react-hook-form";
import { cn } from "@/app/utils";

interface SwitchProps {
  name: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  checked?: boolean;
  control: any;
}

const Switch: React.FC<SwitchProps> = ({
  name,
  label,
  disabled = false,
  className,
  control,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={cn("flex items-center space-x-2", className)}>
          {label && (
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
              {label}
            </label>
          )}
          <div
            className={cn(
              "relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-100 ease-in-out",
              field.value ? "bg-indigo-600" : "bg-gray-300",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => !disabled && field.onChange(!field.value)}
          >
            <motion.span
              className="inline-block h-4 w-4 bg-white rounded-full shadow-md transform transition-transform duration-100 ease-in-out"
              animate={{
                x: field.value ? 20 : 2,
              }}
            />
          </div>
        </div>
      )}
    />
  );
};

export default Switch;
