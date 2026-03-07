"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must include at least one uppercase letter")
  .regex(/[0-9]/, "Password must include at least one number")
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must include at least one special character"
  );

interface PasswordFieldProps {
  name?: string;
  register: any;
  errors: any;
  watch: any;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  name = "password",
  register,
  errors,
  watch,
}) => {
  const passwordValue = watch(name, "");

  const [strength, setStrength] = useState(0);

  useEffect(() => {
    let score = 0;
    if (passwordValue.length >= 8) score++;
    if (/[A-Z]/.test(passwordValue)) score++;
    if (/[0-9]/.test(passwordValue)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(passwordValue)) score++;
    setStrength(score);
  }, [passwordValue]);

  return (
    <div>
      <input
        type="password"
        placeholder="Enter your password"
        {...register(name, {
          required: "Password is required",
          validate: (value) => {
            const result = passwordSchema.safeParse(value);
            return result.success || result.error.errors[0].message;
          },
        })}
        className="p-[17px] pl-3 pr-10 w-full border-b-2 border-gray-300 text-gray-800 placeholder:text-gray-600 
              focus:outline-none focus:border-gray-700"
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[name]?.message as string}
        </p>
      )}

      <div className="mt-2">
        <div className="flex items-center justify-center gap-[1px] py-2">
          {[...Array(4)].map((_, index) => (
            <motion.div
              key={index}
              className="h-[6px] flex-1 rounded w-[100px]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: strength > index ? 0.97 : 0.93 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                backgroundColor:
                  strength > index ? "rgb(107, 142, 35)" : "rgb(220, 38, 38)",
                transformOrigin: "left",
              }}
            />
          ))}
        </div>
        <p className="text-[12px] text-gray-500 text-right">
          {strength === 1
            ? "Very weak"
            : strength === 2
            ? "Weak"
            : strength === 3
            ? "Good"
            : strength === 4
            ? "Strong"
            : "Password strength"}
        </p>
      </div>
    </div>
  );
};

export default PasswordField;
