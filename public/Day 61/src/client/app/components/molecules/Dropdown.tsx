"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Loader2, X } from "lucide-react";
// import useClickOutside from "@/app/hooks/dom/useClickOutside";

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  label?: string;
  options: DropdownOption[];
  value: string | null;
  onChange: (value: string | null) => void;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onChange,
  className,
  disabled,
  isLoading,
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

  // useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || label || "Select...";

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        ref={buttonRef}
        className={`flex items-center justify-between px-3 py-2 
          rounded-lg bg-white border border-gray-200
          transition-all duration-200 cursor-pointer 
          hover:border-gray-300 focus:ring-2 focus:ring-blue-100 ${className}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-disabled={disabled}
      >
        <span className="text-sm font-medium text-gray-700 truncate">
          {isLoading ? "Loading..." : selectedLabel}
        </span>

        <div className="flex items-center">
          {isLoading ? (
            <Loader2 size={16} className="animate-spin text-gray-400 ml-2" />
          ) : value ? (
            <X
              size={16}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 ml-2"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
            />
          ) : (
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <ChevronDown size={16} className="text-gray-400 ml-2" />
            </motion.div>
          )}
        </div>
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
                  className={`px-3 py-2 text-sm transition-colors duration-150
                    cursor-pointer hover:bg-gray-50 
                    ${
                      value === option.value
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700"
                    }`}
                  onClick={() => handleSelect(option.value)}
                >
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

export default Dropdown;
