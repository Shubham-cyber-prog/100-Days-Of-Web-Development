import { Upload, FileText, FileCode, File, X, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface UploadDocumentProps {
  onNavigate: (page: string) => void;
}

export function UploadDocument({ onNavigate }: UploadDocumentProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    simulateUpload();
  };

  const handleFileSelect = () => {
    simulateUpload();
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadComplete(true);
          setTimeout(() => {
            onNavigate('workspace');
          }, 1500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const supportedFormats = [
    { name: 'PDF', icon: FileText, color: 'text-red-500' },
    { name: 'DOCX', icon: FileCode, color: 'text-blue-500' },
    { name: 'TXT', icon: File, color: 'text-gray-500' },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Upload Document</h1>
        <p className="text-muted-foreground">Upload a document to generate an AI-powered summary</p>
      </div>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative bg-white rounded-3xl p-12 border-2 border-dashed transition-all ${
            isDragging 
              ? 'border-purple-500 bg-purple-50' 
              : uploadComplete
              ? 'border-green-500 bg-green-50'
              : 'border-border hover:border-purple-300'
          }`}
        >
          <div className="flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {uploadComplete ? (
                <motion.div
                  key="complete"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="text-center"
                >
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Upload Complete!</h3>
                  <p className="text-muted-foreground">Redirecting to workspace...</p>
                </motion.div>
              ) : isUploading ? (
                <motion.div
                  key="uploading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full max-w-md"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium mb-1">Uploading document...</p>
                      <p className="text-sm text-muted-foreground">document.pdf • 2.4 MB</p>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                      initial={{ width: '0%' }}
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-center text-sm text-muted-foreground mt-2">{uploadProgress}%</p>
                </motion.div>
              ) : (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {isDragging ? 'Drop your file here' : 'Drag & drop your document'}
                  </h3>
                  <p className="text-muted-foreground mb-6">or click to browse files</p>
                  <button
                    onClick={handleFileSelect}
                    className="px-6 py-3 rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all"
                    style={{
                      background: 'linear-gradient(135deg, var(--gradient-from) 0%, var(--gradient-to) 100%)'
                    }}
                  >
                    Choose File
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Supported Formats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white rounded-2xl p-6 border border-border"
      >
        <h3 className="font-semibold mb-4">Supported Formats</h3>
        <div className="grid grid-cols-3 gap-4">
          {supportedFormats.map((format) => {
            const Icon = format.icon;
            return (
              <div
                key={format.name}
                className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <Icon className={`w-6 h-6 ${format.color}`} />
                <div>
                  <p className="font-medium">{format.name}</p>
                  <p className="text-xs text-muted-foreground">Document</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-200">
          <p className="text-sm text-blue-900">
            <strong>Maximum file size:</strong> 25 MB • <strong>Max pages:</strong> 200
          </p>
        </div>
      </motion.div>

      {/* Recent Uploads */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-8"
      >
        <h3 className="font-semibold mb-4">Recent Uploads</h3>
        <div className="grid gap-3">
          {['Q4 Financial Report.pdf', 'Product Requirements.docx', 'Meeting Notes.txt'].map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-border hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium group-hover:text-purple-600 transition-colors">{file}</p>
                <p className="text-xs text-muted-foreground">Uploaded today</p>
              </div>
              <button className="text-muted-foreground hover:text-foreground">
                <Upload className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
