"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "@/app/components/atoms/Input";
import Button from "@/app/components/atoms/Button";
import Link from "next/link";
import axiosInstance from "@/app/utils/axiosInstance";

const PasswordReset = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { email: "" },
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post("/auth/forgot-password", data);
      console.log("res: ", res);
  
      if (res.data.error) {
        // API returned an error -> show error message
        setErrorMessage(res.data.error.message || "Something went wrong");
        setSuccessMessage(""); // Clear success message in case of error
      } else {
        // API call succeeded -> show success message
        setSuccessMessage(
          "Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder."
        );
        setErrorMessage(""); // Clear error message
        reset(); // Reset form
      }
    } catch (err) {
      console.log("error: ", err);
      setErrorMessage("Something went wrong, please try again.");
      setSuccessMessage(""); // Clear success message on error
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center bg-white p-6 rounded shadow-md w-[500px]"
      >
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-center text-green-700 w-full mx-auto px-4 py-[18px] rounded relative mb-4">
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-center text-red-700 w-full mx-auto px-4 py-[18px] rounded relative mb-4">
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        )}

        <h2 className="text-[16px] font-medium mb-4">
          Enter your user account&apos;s verified email address and we will send
          you a password reset link.
        </h2>

        <Input
          type="text"
          name="email"
          placeholder="Email address"
          control={control}
          validation={{ required: "Email is required" }}
          className="py-4"
        />

        <Button
          type="submit"
          className="bg-primary mt-4 text-white w-full py-[12px] rounded"
        >
          Send reset link
        </Button>

        <Link className="mt-4 hover:underline" href={"/sign-in"}>
          Return to sign in
        </Link>
      </form>
    </div>
  );
};

export default PasswordReset;
