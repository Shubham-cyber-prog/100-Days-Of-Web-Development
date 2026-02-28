"use client";

import { Controller } from "react-hook-form";
import { LucideIcon } from "lucide-react";
interface InputProps {
  label?: string;
  control: any;
  name: string;
  type?: string;
  placeholder?: string;
  validation?: object;
  icon?: LucideIcon;
  className?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  control,
  label,
  name,
  type = "text",
  placeholder,
  validation = {},
  icon: Icon,
  className = "",
  error,
  onChange,
}) => {
  return (
    <div className="relative w-full">
      {label && <label className="text-gray-700 font-medium">{label}</label>}

      <Controller
        name={name}
        control={control}
        rules={validation}
        render={({ field }) => (
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            className={`p-[14px] pl-3 pr-10 w-full border-b-2 border-gray-300 text-gray-800 placeholder:text-gray-600 mt-[6px] 
              focus:outline-none focus:border-gray-700 ${className}`}
            onChange={(e) => {
              field.onChange(e);
              if (onChange) onChange(e);
            }}
          />
        )}
      />

      {Icon && (
        <div className="absolute top-[63%] right-3 transform -translate-y-1/2">
          <Icon className="w-[22px] h-[22px] text-gray-800" />
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
