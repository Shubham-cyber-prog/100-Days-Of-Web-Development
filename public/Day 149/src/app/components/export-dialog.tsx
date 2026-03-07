import React, { useState } from 'react';
import { Download, FileText, File, Code, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';

interface ExportDialogProps {
  articleTitle: string;
  articleContent: string;
  onClose: () => void;
}

export function ExportDialog({ articleTitle, articleContent, onClose }: ExportDialogProps) {
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'markdown' | 'html' | 'docx'>('pdf');
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const formats = [
    {
      id: 'pdf' as const,
      name: 'PDF Document',
      description: 'Best for printing and sharing',
      icon: FileText,
      extension: '.pdf'
    },
    {
      id: 'markdown' as const,
      name: 'Markdown',
      description: 'Plain text with formatting',
      icon: Code,
      extension: '.md'
    },
    {
      id: 'html' as const,
      name: 'HTML',
      description: 'Web page format',
      icon: File,
      extension: '.html'
    },
    {
      id: 'docx' as const,
      name: 'Word Document',
      description: 'Microsoft Word format',
      icon: FileText,
      extension: '.docx'
    }
  ];

  const handleExport = () => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      setExported(true);

      // Create a blob and download
      let content = '';
      let mimeType = '';
      let fileName = '';

      switch (selectedFormat) {
        case 'pdf':
          content = `PDF Export: ${articleTitle}\n\n${articleContent}`;
          mimeType = 'application/pdf';
          fileName = `${articleTitle.replace(/\s+/g, '-')}.pdf`;
          break;
        case 'markdown':
          content = `# ${articleTitle}\n\n${articleContent}`;
          mimeType = 'text/markdown';
          fileName = `${articleTitle.replace(/\s+/g, '-')}.md`;
          break;
        case 'html':
          content = `<!DOCTYPE html><html><head><title>${articleTitle}</title></head><body><h1>${articleTitle}</h1><p>${articleContent}</p></body></html>`;
          mimeType = 'text/html';
          fileName = `${articleTitle.replace(/\s+/g, '-')}.html`;
          break;
        case 'docx':
          content = `Word Export: ${articleTitle}\n\n${articleContent}`;
          mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          fileName = `${articleTitle.replace(/\s+/g, '-')}.docx`;
          break;
      }

      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setTimeout(() => {
        onClose();
      }, 1500);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <Download className="size-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Export Article
            </h2>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 ml-14">
            Choose your preferred export format
          </p>
        </div>

        {/* Format Selection */}
        <div className="space-y-3 mb-6">
          {formats.map((format) => {
            const Icon = format.icon;
            return (
              <div
                key={format.id}
                onClick={() => setSelectedFormat(format.id)}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedFormat === format.id
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    selectedFormat === format.id
                      ? 'bg-indigo-100 dark:bg-indigo-900/40'
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}>
                    <Icon className={`size-5 ${
                      selectedFormat === format.id
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-gray-600 dark:text-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {format.name}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {format.extension}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {format.description}
                    </p>
                  </div>
                  {selectedFormat === format.id && (
                    <CheckCircle2 className="size-5 text-indigo-600 dark:text-indigo-400" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Export Status */}
        {exported && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="size-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-sm font-medium text-green-900 dark:text-green-100">
                  Export Successful!
                </p>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Your file has been downloaded
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose} disabled={isExporting}>
            Cancel
          </Button>
          <Button onClick={handleExport} disabled={isExporting} className="gap-2">
            {isExporting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="size-4" />
                Export as {formats.find(f => f.id === selectedFormat)?.name}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
