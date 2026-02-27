"use client";

import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Upload, X } from "lucide-react";
import useToast from "@/app/hooks/ui/useToast";
import Image from "next/image";

interface FileInputProps {
  label?: string;
  control: any;
  name: string;
  validation?: object;
  className?: string;
  error?: string;
  multiple?: boolean;
  accept?: string;
  maxSizeMB?: number;
}

const FileInput: React.FC<FileInputProps> = ({
  control,
  label,
  name,
  validation = {},
  className = "",
  error,
  multiple = false,
  accept = "image/*",
  maxSizeMB = 5,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const { showToast } = useToast();

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldOnChange: (files: FileList) => void
  ) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const validFiles: File[] = [];
    for (const file of selectedFiles) {
      if (file.size / 1024 / 1024 > maxSizeMB) {
        showToast(
          `File ${file.name} exceeds the ${maxSizeMB}MB limit.`,
          "error"
        );
        continue;
      }
      validFiles.push(file);
    }

    setFiles(validFiles);
    fieldOnChange(selectedFiles);
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="relative w-full">
      {label && <label className="text-gray-700 font-medium">{label}</label>}

      <Controller
        name={name}
        control={control}
        rules={validation}
        render={({ field }) => (
          <>
            <label
              className={`mt-3 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 text-gray-800 
                rounded-lg p-5 cursor-pointer hover:border-primary hover:bg-gray-50 transition-all duration-300 ${className}`}
            >
              <input
                type="file"
                multiple={multiple}
                accept={accept}
                className="hidden"
                onChange={(e) => handleFileChange(e, field.onChange)}
              />
              <Upload className="w-8 h-8 text-gray-500 mb-2" />
              <span className="text-sm text-gray-600 font-medium">
                Drag & drop or click to upload
              </span>
            </label>

            {files.length > 0 && (
              <div className="mt-4 bg-gray-100 p-3 rounded-lg shadow-sm">
                <p className="text-sm font-semibold text-gray-700">
                  Selected Files:
                </p>
                <ul className="mt-2 space-y-2">
                  {files.map((file, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm"
                    >
                      <div className="flex items-center space-x-3">
                        {file.type.startsWith("image/") && (
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            width={48}
                            height={48}
                            className="w-12 h-12 object-cover rounded-lg border"
                          />
                        )}
                        <span className="text-sm text-gray-700">
                          {file.name}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <X size={18} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      />

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default FileInput;
