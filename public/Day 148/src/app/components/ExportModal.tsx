import { X, FileText, FileCode, File, Download, Mail, Link2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExportModal({ isOpen, onClose }: ExportModalProps) {
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [includeHighlights, setIncludeHighlights] = useState(true);
  const [includeKeywords, setIncludeKeywords] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const exportFormats = [
    { id: 'pdf', name: 'PDF', icon: FileText, description: 'Portable Document Format', color: 'text-red-500' },
    { id: 'docx', name: 'DOCX', icon: FileCode, description: 'Microsoft Word Document', color: 'text-blue-500' },
    { id: 'txt', name: 'TXT', icon: File, description: 'Plain Text File', color: 'text-gray-500' },
    { id: 'md', name: 'Markdown', icon: FileText, description: 'Markdown Format', color: 'text-purple-500' },
  ];

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
      setTimeout(() => {
        setExportComplete(false);
        onClose();
      }, 2000);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{
                    background: 'linear-gradient(135deg, var(--gradient-from) 0%, var(--gradient-to) 100%)'
                  }}>
                    <Download className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Export Summary</h2>
                    <p className="text-sm text-muted-foreground">Choose format and options</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl hover:bg-accent flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {exportComplete ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Export Complete!</h3>
                  <p className="text-muted-foreground">Your file has been downloaded</p>
                </motion.div>
              ) : (
                <>
                  {/* Format Selection */}
                  <div className="mb-6">
                    <label className="block mb-3 font-medium">Export Format</label>
                    <div className="grid grid-cols-2 gap-3">
                      {exportFormats.map((format) => {
                        const Icon = format.icon;
                        return (
                          <button
                            key={format.id}
                            onClick={() => setSelectedFormat(format.id)}
                            className={`p-4 rounded-xl border-2 transition-all text-left ${
                              selectedFormat === format.id
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-border hover:border-purple-200 hover:bg-purple-50/50'
                            }`}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <Icon className={`w-5 h-5 ${format.color}`} />
                              <span className="font-medium">{format.name}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{format.description}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Options */}
                  <div className="mb-6">
                    <label className="block mb-3 font-medium">Include</label>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-accent cursor-pointer transition-colors">
                        <div>
                          <p className="font-medium">Key Highlights</p>
                          <p className="text-sm text-muted-foreground">Include highlighted sections</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={includeHighlights}
                          onChange={(e) => setIncludeHighlights(e.target.checked)}
                          className="w-5 h-5 rounded"
                        />
                      </label>
                      <label className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-accent cursor-pointer transition-colors">
                        <div>
                          <p className="font-medium">Keywords & Tags</p>
                          <p className="text-sm text-muted-foreground">Include extracted keywords</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={includeKeywords}
                          onChange={(e) => setIncludeKeywords(e.target.checked)}
                          className="w-5 h-5 rounded"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="mb-6">
                    <label className="block mb-3 font-medium">Quick Actions</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="p-4 rounded-xl border border-border hover:bg-accent transition-colors text-left">
                        <div className="flex items-center gap-2 mb-2">
                          <Mail className="w-4 h-4 text-purple-600" />
                          <span className="font-medium">Email Summary</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Send via email</p>
                      </button>
                      <button className="p-4 rounded-xl border border-border hover:bg-accent transition-colors text-left">
                        <div className="flex items-center gap-2 mb-2">
                          <Link2 className="w-4 h-4 text-blue-600" />
                          <span className="font-medium">Copy Link</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Share via link</p>
                      </button>
                    </div>
                  </div>

                  {/* File Info */}
                  <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">File Name</p>
                        <p className="text-sm font-medium">Q4_Report_Summary.{selectedFormat}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Est. Size</p>
                        <p className="text-sm font-medium">~124 KB</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Pages</p>
                        <p className="text-sm font-medium">2 pages</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            {!exportComplete && (
              <div className="p-6 border-t border-border flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 h-12 rounded-xl border border-border hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExport}
                  disabled={isExporting}
                  className="flex-1 h-12 rounded-xl text-white font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                  style={{
                    background: 'linear-gradient(135deg, var(--gradient-from) 0%, var(--gradient-to) 100%)'
                  }}
                >
                  {isExporting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Download className="w-5 h-5" />
                      </motion.div>
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Export {selectedFormat.toUpperCase()}
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
