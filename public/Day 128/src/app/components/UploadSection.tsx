import { Upload, Image as ImageIcon, FileCheck } from 'lucide-react';
import { useState, useRef } from 'react';

interface UploadSectionProps {
  onImageUpload: (file: File) => void;
}

export function UploadSection({ onImageUpload }: UploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div className="bg-black/20 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg">
          <Upload className="w-6 h-6 text-cyan-400" />
        </div>
        Upload Image
      </h2>

      {/* Drag and Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 cursor-pointer overflow-hidden ${
          isDragging
            ? 'border-cyan-400 bg-cyan-500/10 scale-[1.02]'
            : 'border-purple-500/30 hover:border-purple-400/50 hover:bg-purple-500/5'
        }`}
      >
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }} />
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="relative flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 blur-2xl opacity-30 animate-pulse" />
            <div className="relative p-6 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl">
              {isDragging ? (
                <FileCheck className="w-16 h-16 text-cyan-400" />
              ) : (
                <ImageIcon className="w-16 h-16 text-purple-400" />
              )}
            </div>
          </div>

          <div className="text-center">
            <p className="text-xl font-semibold text-white mb-2">
              {isDragging ? 'Drop your image here' : 'Drag & drop your image'}
            </p>
            <p className="text-gray-400 mb-4">or click to browse</p>

            <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105">
              Select Image
            </button>
          </div>
        </div>
      </div>

      {/* Supported Formats */}
      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400">
        <FileCheck className="w-4 h-4" />
        <span>Supported formats: JPG, PNG, WEBP, GIF (max 10MB)</span>
      </div>
    </div>
  );
}
