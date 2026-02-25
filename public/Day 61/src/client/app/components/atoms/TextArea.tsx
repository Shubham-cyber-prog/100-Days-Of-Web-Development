"use client";

import React from "react";
import { Controller } from "react-hook-form";
import { LucideIcon } from "lucide-react";

interface TextAreaProps {
  label?: string;
  control: any;
  rows?: number;
  cols?: number;
  name: string;
  placeholder?: string;
  validation?: object;
  icon?: LucideIcon;
  className?: string;
  error?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  control,
  label,
  name,
  rows = 2,
  cols = 20,
  placeholder,
  validation = {},
  icon: Icon,
  className = "",
  error,
}) => {
  return (
    <div className="relative w-full">
      {label && (
        <label className="text-gray-700 pb-2 font-medium">{label}</label>
      )}

      <Controller
        name={name}
        control={control}
        rules={validation}
        render={({ field }) => (
          <textarea
            {...field}
            placeholder={placeholder}
            className={`p-[14px] pl-3 pr-10 w-full border border-gray-300 text-gray-800 placeholder:text-black 
              rounded focus:outline-none focus:ring-[2px] focus:ring-lime-700 resize-none ${className}`}
            rows={rows}
            cols={cols}
          />
        )}
      />

      {Icon && (
        <div className="absolute top-3 right-3">
          <Icon className="w-[22px] h-[22px] text-gray-800" />
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextArea;
