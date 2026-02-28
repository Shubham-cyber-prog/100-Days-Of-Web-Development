"use client";

import React from "react";
import { Eye, EyeOff } from "lucide-react";
import useToggle from "@/app/hooks/state/useToggle";
import { cn } from "@/app/utils";

interface ToggleableTextProps {
  content: string;
  truncateLength?: number;
  className?: string;
  truncateClassName?: string;
  fullClassName?: string;
}

const truncateText = (text: string, length: number) =>
  text.length > length ? `${text.slice(0, length)}...` : text;

const ToggleableText: React.FC<ToggleableTextProps> = ({
  content,
  truncateLength = 30,
  className = "",
  truncateClassName = "truncate",
  fullClassName = "whitespace-pre-wrap",
}) => {
  const [isFullVisible, toggleFullVisible] = useToggle(false);

  const displayedText = isFullVisible
    ? content
    : truncateText(content, truncateLength);

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <span
        className={cn(
          "text-[14px] text-gray-800",
          isFullVisible ? fullClassName : truncateClassName
        )}
      >
        {displayedText}
      </span>
      {content.length > truncateLength && (
        <button
          onClick={toggleFullVisible}
          className="text-gray-500 hover:text-indigo-500 transition-colors duration-200 focus:outline-none"
          aria-label={isFullVisible ? "Hide full text" : "Show full text"}
        >
          {isFullVisible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      )}
    </div>
  );
};

export default ToggleableText;
