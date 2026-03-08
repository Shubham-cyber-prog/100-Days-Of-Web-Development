import React from 'react';
import {
  Plus,
  Link2,
  FileText,
  Layout,
  ShoppingCart,
  FileCode,
  Users,
} from 'lucide-react';

interface Table {
  id: string;
  name: string;
}

interface SidebarProps {
  tables: Table[];
  onAddTable: () => void;
  onSelectTable: (id: string) => void;
  selectedTableId: string | null;
}

const TEMPLATES = [
  { icon: Users, label: 'User System' },
  { icon: ShoppingCart, label: 'E-commerce' },
  { icon: FileCode, label: 'Blog' },
  { icon: Layout, label: 'CMS' },
];

export function Sidebar({
  tables,
  onAddTable,
  onSelectTable,
  selectedTableId,
}: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Tools Section */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
          Tools
        </h3>
        <div className="space-y-2">
          <button
            onClick={onAddTable}
            className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
          >
            <Plus className="size-4" />
            <span className="text-sm font-medium">Add Table</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
            <Link2 className="size-4" />
            <span className="text-sm font-medium">Add Relationship</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
            <FileText className="size-4" />
            <span className="text-sm font-medium">Text / Notes</span>
          </button>
        </div>
      </div>

      {/* Templates Section */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
          Templates
        </h3>
        <div className="space-y-1">
          {TEMPLATES.map((template) => (
            <button
              key={template.label}
              className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors text-sm"
            >
              <template.icon className="size-4" />
              {template.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tables List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Tables ({tables.length})
          </h3>
        </div>
        <div className="space-y-1">
          {tables.map((table) => (
            <button
              key={table.id}
              onClick={() => onSelectTable(table.id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                selectedTableId === table.id
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-sm truncate block">{table.name}</span>
            </button>
          ))}
          {tables.length === 0 && (
            <p className="text-sm text-gray-400 italic px-3 py-2">
              No tables yet
            </p>
          )}
        </div>
      </div>

      {/* Bottom Action */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center gap-2 px-3 py-2 text-gray-700 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors">
          <Plus className="size-4" />
          <span className="text-sm font-medium">New Schema</span>
        </button>
      </div>
    </div>
  );
}
