import { motion } from "framer-motion";
import { Upload, FileCode2 } from "lucide-react";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface UploadedFile {
  name: string;
  size: number;
  language: string;
}

function detectLanguage(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase();
  const map: Record<string, string> = {
    js: "JavaScript", jsx: "JavaScript", ts: "TypeScript", tsx: "TypeScript",
    py: "Python", java: "Java", cpp: "C++", c: "C", go: "Go",
    rs: "Rust", rb: "Ruby", php: "PHP", cs: "C#",
  };
  return map[ext || ""] || "Unknown";
}

export function FileUploadZone({ onFilesUploaded }: { onFilesUploaded?: (files: UploadedFile[]) => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const handleFiles = useCallback((fileList: FileList) => {
    const newFiles = Array.from(fileList).map((f) => ({
      name: f.name,
      size: f.size,
      language: detectLanguage(f.name),
    }));
    setFiles((prev) => [...prev, ...newFiles]);
    onFilesUploaded?.(newFiles);
  }, [onFilesUploaded]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-all duration-300 cursor-pointer",
          isDragging
            ? "border-primary bg-primary/5 glow-border"
            : "border-border bg-card hover:border-primary/50 hover:bg-primary/5"
        )}
        onClick={() => {
          const input = document.createElement("input");
          input.type = "file";
          input.multiple = true;
          input.accept = ".js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.go,.rs,.rb,.php,.cs";
          input.onchange = (e) => {
            const target = e.target as HTMLInputElement;
            if (target.files) handleFiles(target.files);
          };
          input.click();
        }}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 mb-4">
          <Upload className="h-7 w-7 text-primary" />
        </div>
        <p className="text-base font-semibold text-card-foreground">
          Drop your code files here
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          or click to browse · supports JS, TS, Python, Java & more
        </p>
      </motion.div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, i) => (
            <motion.div
              key={`${file.name}-${i}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"
            >
              <FileCode2 className="h-5 w-5 text-primary" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-card-foreground truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {file.language} · {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
