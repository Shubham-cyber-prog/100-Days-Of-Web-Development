import { Upload, Download, FileSpreadsheet, CheckCircle, AlertCircle, X } from 'lucide-react';
import { useState } from 'react';

interface BulkImportExportProps {
  onClose: () => void;
}

export function BulkImportExport({ onClose }: BulkImportExportProps) {
  const [activeTab, setActiveTab] = useState<'import' | 'export'>('import');
  const [importStatus, setImportStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      setImportStatus('processing');
      
      // Simulate processing
      setTimeout(() => {
        setImportStatus('success');
      }, 2000);
    }
  };

  const handleExport = (format: string) => {
    alert(`Exporting data as ${format}...`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-semibold">Bulk Import/Export</h2>
                <p className="text-purple-50">Manage data in bulk using spreadsheets</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Tabs */}
          <div className="flex gap-2 mb-6 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('import')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
                activeTab === 'import'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Upload className="w-4 h-4" />
              Import Data
            </button>
            <button
              onClick={() => setActiveTab('export')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
                activeTab === 'export'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Download className="w-4 h-4" />
              Export Data
            </button>
          </div>

          {/* Import Tab */}
          {activeTab === 'import' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Import Guidelines</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Supported formats: CSV, Excel (.xlsx, .xls)</li>
                  <li>• Required columns: Name, Roll Number, Class</li>
                  <li>• Optional columns: Email, Phone, Address</li>
                  <li>• Maximum file size: 10MB</li>
                </ul>
              </div>

              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-purple-400 transition-colors">
                <input
                  type="file"
                  id="file-upload"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-900 font-medium mb-1">Click to upload or drag and drop</p>
                  <p className="text-sm text-slate-500">CSV or Excel files (Max 10MB)</p>
                </label>
              </div>

              {uploadedFile && (
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet className="w-8 h-8 text-purple-600" />
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{uploadedFile}</p>
                      <p className="text-sm text-slate-600">
                        {importStatus === 'processing' && 'Processing file...'}
                        {importStatus === 'success' && '✓ Ready to import'}
                        {importStatus === 'error' && '✗ Error processing file'}
                      </p>
                    </div>
                    {importStatus === 'success' && (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    )}
                    {importStatus === 'error' && (
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    )}
                  </div>
                </div>
              )}

              {importStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <h3 className="font-semibold text-green-900 mb-2">Import Preview</h3>
                  <div className="space-y-2 text-sm text-green-800">
                    <p>✓ 150 valid records found</p>
                    <p>✓ All required fields present</p>
                    <p>⚠ 3 duplicate entries detected (will be skipped)</p>
                  </div>
                </div>
              )}

              <button
                disabled={importStatus !== 'success'}
                onClick={() => {
                  alert('Data imported successfully!');
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Upload className="w-5 h-5" />
                Import Data
              </button>
            </div>
          )}

          {/* Export Tab */}
          {activeTab === 'export' && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <h3 className="font-semibold text-green-900 mb-2">Export Options</h3>
                <p className="text-sm text-green-800">
                  Select the data type and format you want to export
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Data Type
                  </label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>Student Records</option>
                    <option>Attendance Records</option>
                    <option>Class Information</option>
                    <option>Complete Database</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Date Range
                  </label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>All Time</option>
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>This Year</option>
                    <option>Custom Range</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Class Filter
                  </label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>All Classes</option>
                    <option>Grade 10-A</option>
                    <option>Grade 10-B</option>
                    <option>Grade 11-A</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => handleExport('CSV')}
                  className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl hover:shadow-md transition-all"
                >
                  <FileSpreadsheet className="w-10 h-10 text-blue-600" />
                  <div className="text-center">
                    <p className="font-semibold text-slate-900">CSV</p>
                    <p className="text-xs text-slate-600">Spreadsheet format</p>
                  </div>
                </button>

                <button
                  onClick={() => handleExport('Excel')}
                  className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl hover:shadow-md transition-all"
                >
                  <FileSpreadsheet className="w-10 h-10 text-green-600" />
                  <div className="text-center">
                    <p className="font-semibold text-slate-900">Excel</p>
                    <p className="text-xs text-slate-600">Microsoft Excel</p>
                  </div>
                </button>

                <button
                  onClick={() => handleExport('PDF')}
                  className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl hover:shadow-md transition-all"
                >
                  <FileSpreadsheet className="w-10 h-10 text-purple-600" />
                  <div className="text-center">
                    <p className="font-semibold text-slate-900">PDF</p>
                    <p className="text-xs text-slate-600">Document format</p>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
