"use client";
import { Controller, Control } from "react-hook-form";

interface RadioButtonProps {
  className?: string;
  name: string;
  control: Control<any>;
  label?: string;
  value: string;
  currentValue?: string;
  onChangeExtra?: (value: string) => void;
  icon?: React.ReactNode;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  className,
  name,
  control,
  label,
  value,
  currentValue,
  onChangeExtra,
  icon,
}) => {
  const isChecked = currentValue === value;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={""}
      render={({ field }) => (
        <div
          className={`flex items-center space-x-2 cursor-pointer ${className}`}
          onClick={() => {
            field.onChange(value);
            if (onChangeExtra) {
              onChangeExtra(value);
            }
          }}
        >
          <div
            className={`w-5 h-5 flex items-center justify-center border rounded-full transition-all ${
              isChecked ? "bg-primary border-primary" : "border-gray-400"
            }`}
          >
            {isChecked && icon ? (
              // Use the icon passed through props if checked
              <div className="text-white w-3 h-3 flex items-center justify-center">
                {icon}
              </div>
            ) : (
              isChecked && <div className="w-2.5 h-2.5 rounded-full bg-white" />
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

export default RadioButton;
