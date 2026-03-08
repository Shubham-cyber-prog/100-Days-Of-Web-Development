"use client";
import { Check } from "lucide-react";
import { Controller, Control } from "react-hook-form";

interface CheckBoxProps {
  className?: string;
  name: string;
  control: Control<any>;
  label?: string;
  defaultValue?: boolean;
  onChangeExtra?: (name: string, value: boolean) => void;
  icon?: React.ReactNode;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  className,
  name,
  control,
  label,
  defaultValue = false,
  onChangeExtra,
  icon,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <div
          className={`flex items-center space-x-2 cursor-pointer ${className}`}
          onClick={() => {
            const newValue = !field.value;
            field.onChange(newValue);
            if (onChangeExtra) {
              onChangeExtra(name, newValue);
            }
          }}
        >
          <div
            className={`w-5 h-5 flex items-center justify-center border rounded-md transition-all ${
              field.value ? "bg-primary border-primary" : "border-gray-400"
            }`}
          >
            {field.value && (
              <div className="text-white w-4 h-4 flex items-center justify-center">
                {icon || <Check className="w-4 h-4" />}
              </div>
            )}
          </div>
          {label && (
            <span className="text-gray-700 select-none font-medium">
              {label}
            </span>
          )}
        </div>
      )}
    />
  );
};

export default CheckBox;
