import React, { useState } from 'react';
import { X, Download, Check } from 'lucide-react';

interface Table {
  id: string;
  name: string;
  columns: Array<{
    id: string;
    name: string;
    type: string;
    isPrimaryKey?: boolean;
    isForeignKey?: boolean;
    isNullable?: boolean;
    defaultValue?: string;
  }>;
}

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  tables: Table[];
}

export function ExportModal({ isOpen, onClose, tables }: ExportModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<'sql' | 'json' | 'png'>(
    'sql'
  );

  if (!isOpen) return null;

  const generateSQL = () => {
    return tables
      .map((table) => {
        const columns = table.columns
          .map((col) => {
            let def = `  ${col.name} ${col.type}`;
            if (col.isPrimaryKey) def += ' PRIMARY KEY';
            if (!col.isNullable) def += ' NOT NULL';
            if (col.defaultValue) def += ` DEFAULT ${col.defaultValue}`;
            return def;
          })
          .join(',\n');

        return `CREATE TABLE ${table.name} (\n${columns}\n);`;
      })
      .join('\n\n');
  };

  const generateJSON = () => {
    return JSON.stringify({ tables }, null, 2);
  };

  const getExportContent = () => {
    if (selectedFormat === 'sql') return generateSQL();
    if (selectedFormat === 'json') return generateJSON();
    return 'PNG export would be generated here';
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getExportContent());
  };

  const handleDownload = () => {
    const content = getExportContent();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `schema.${selectedFormat}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Export Schema
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="size-5 text-gray-500" />
          </button>
        </div>

        {/* Format Selection */}
        <div className="p-6 border-b border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Export Format
          </label>
          <div className="flex gap-3">
            {[
              { value: 'sql', label: 'SQL', desc: 'CREATE TABLE statements' },
              { value: 'json', label: 'JSON', desc: 'Schema definition' },
              { value: 'png', label: 'PNG', desc: 'Visual diagram' },
            ].map((format) => (
              <button
                key={format.value}
                onClick={() =>
                  setSelectedFormat(format.value as 'sql' | 'json' | 'png')
                }
                className={`flex-1 p-4 border-2 rounded-lg transition-all ${
                  selectedFormat === format.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900">
                    {format.label}
                  </span>
                  {selectedFormat === format.value && (
                    <Check className="size-5 text-blue-600" />
                  )}
                </div>
                <p className="text-xs text-gray-500 text-left">
                  {format.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1 overflow-hidden p-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Preview
          </label>
          <div className="h-64 bg-gray-50 rounded-lg border border-gray-200 overflow-auto">
            <pre className="p-4 text-xs font-mono text-gray-800">
              {getExportContent()}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={handleCopy}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Copy to Clipboard
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="size-4" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
