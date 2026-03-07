import React, { useState } from 'react';
import {
  Database,
  Save,
  Download,
  Undo,
  Redo,
  Search,
  Settings,
  User,
} from 'lucide-react';

interface TopBarProps {
  projectName: string;
  onProjectNameChange: (name: string) => void;
  onExport: () => void;
}

export function TopBar({
  projectName,
  onProjectNameChange,
  onExport,
}: TopBarProps) {
  const [isEditingName, setIsEditingName] = useState(false);

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Left Section */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Database className="size-6 text-blue-600" />
          <span className="font-semibold text-lg text-gray-900">
            Database Schema Designer
          </span>
        </div>

        <div className="h-8 w-px bg-gray-200" />

        {/* Project Name */}
        {isEditingName ? (
          <input
            type="text"
            value={projectName}
            onChange={(e) => onProjectNameChange(e.target.value)}
            onBlur={() => setIsEditingName(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setIsEditingName(false);
            }}
            autoFocus
            className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <button
            onClick={() => setIsEditingName(true)}
            className="text-gray-700 hover:text-gray-900 font-medium"
          >
            {projectName}
          </button>
        )}
      </div>

      {/* Center Section - Actions */}
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Save className="size-4" />
          Save
        </button>
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Download className="size-4" />
          Export
        </button>
        <div className="h-8 w-px bg-gray-200 mx-2" />
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Undo className="size-4 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Redo className="size-4 text-gray-600" />
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tables..."
            className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          />
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Settings className="size-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <div className="size-8 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="size-5 text-white" />
          </div>
        </button>
      </div>
    </div>
  );
}
