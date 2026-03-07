// src/components/chat/utils/chatTheme.ts

// Define consistent theme values for the chat components
export const chatTheme = {
  colors: {
    primary: {
      light: "#60a5fa", // blue-400
      default: "#2563eb", // blue-600
      dark: "#1d4ed8", // blue-700
    },
    secondary: {
      light: "#e5e7eb", // gray-200
      default: "#9ca3af", // gray-400
      dark: "#6b7280", // gray-500
    },
    background: {
      light: "#f9fafb", // gray-50
      default: "#f3f4f6", // gray-100
      dark: "#e5e7eb", // gray-200
    },
    text: {
      light: "#9ca3af", // gray-400
      default: "#4b5563", // gray-600
      dark: "#1f2937", // gray-800
    },
    success: {
      default: "#10b981", // green-500
    },
    error: {
      default: "#ef4444", // red-500
    },
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
  borderRadius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  },
  animation: {
    fast: "150ms",
    default: "300ms",
    slow: "500ms",
  },
};

export default chatTheme;
