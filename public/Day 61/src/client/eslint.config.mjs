import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Disable explicit 'any' type warning
      "react-hooks/exhaustive-deps": "off", // Disable exhaustive-deps warning
      "no-unused-vars": "off", // Keep 'no-unused-vars' as a warning
    },
  },
];

export default eslintConfig;
