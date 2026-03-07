"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import useClickOutside from "@/app/hooks/dom/useClickOutside";

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownMultiSelectProps {
  label?: string;
  options: DropdownOption[];
  selectedValues: string[];
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

const DropdownMultiSelect: React.FC<DropdownMultiSelectProps> = ({
  label = "Select...",
  options,
  selectedValues,
  onChange,
  className,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownWidth, setDropdownWidth] = useState<number | null>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (buttonRef.current) {
      setDropdownWidth(buttonRef.current.offsetWidth);
    }
  }, [isOpen]);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleToggle = (value: string) => {
    onChange(value);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        ref={buttonRef}
        className={`flex items-center justify-between px-3 py-2 rounded-lg bg-white border border-gray-200 transition-all duration-200 cursor-pointer hover:border-gray-300 focus:ring-2 focus:ring-blue-100 ${className}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-disabled={disabled}
      >
        <span className="text-sm font-medium text-gray-700 truncate">
          {label}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-gray-400 ml-2" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.1 }}
            className="absolute mt-1 bg-white border border-gray-100 rounded-lg shadow-lg z-10 overflow-hidden"
            style={{ width: dropdownWidth || "auto" }}
          >
            <ul className="max-h-60 overflow-auto py-1">
              {options.map((option) => (
                <li
                  key={option.value}
                  className="px-3 py-2 text-sm transition-colors duration-150 cursor-pointer hover:bg-gray-50 flex items-center gap-2"
                  onClick={() => handleToggle(option.value)}
                >
                  <Check
                    size={16}
                    className={`${
                      selectedValues.includes(option.value)
                        ? "text-blue-600"
                        : "text-transparent"
                    }`}
                  />
                  {option.label}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownMultiSelect;
