import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

interface Column {
  id: string;
  name: string;
  type: string;
  isPrimaryKey?: boolean;
  isForeignKey?: boolean;
  isNullable?: boolean;
  defaultValue?: string;
}

interface Table {
  id: string;
  name: string;
  columns: Column[];
}

interface PropertiesPanelProps {
  selectedTable: Table | null;
  onUpdateTable: (id: string, updates: Partial<Table>) => void;
  onClose: () => void;
}

const DATA_TYPES = [
  'INT',
  'VARCHAR',
  'TEXT',
  'DATE',
  'DATETIME',
  'BOOLEAN',
  'FLOAT',
  'DECIMAL',
  'BIGINT',
  'JSON',
];

export function PropertiesPanel({
  selectedTable,
  onUpdateTable,
  onClose,
}: PropertiesPanelProps) {
  if (!selectedTable) return null;

  const handleTableNameChange = (name: string) => {
    onUpdateTable(selectedTable.id, { name });
  };

  const handleColumnChange = (columnId: string, updates: Partial<Column>) => {
    const updatedColumns = selectedTable.columns.map((col) =>
      col.id === columnId ? { ...col, ...updates } : col
    );
    onUpdateTable(selectedTable.id, { columns: updatedColumns });
  };

  const handleAddColumn = () => {
    const newColumn: Column = {
      id: `col-${Date.now()}`,
      name: 'new_column',
      type: 'VARCHAR',
      isNullable: true,
    };
    onUpdateTable(selectedTable.id, {
      columns: [...selectedTable.columns, newColumn],
    });
  };

  const handleDeleteColumn = (columnId: string) => {
    const updatedColumns = selectedTable.columns.filter(
      (col) => col.id !== columnId
    );
    onUpdateTable(selectedTable.id, { columns: updatedColumns });
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Properties</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <X className="size-4 text-gray-500" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Table Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Table Name
          </label>
          <input
            type="text"
            value={selectedTable.name}
            onChange={(e) => handleTableNameChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Columns */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Columns
            </label>
            <button
              onClick={handleAddColumn}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
            >
              <Plus className="size-4" />
              Add
            </button>
          </div>

          <div className="space-y-3">
            {selectedTable.columns.map((column) => (
              <div
                key={column.id}
                className="p-3 border border-gray-200 rounded-lg space-y-2"
              >
                {/* Column Name */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={column.name}
                    onChange={(e) =>
                      handleColumnChange(column.id, { name: e.target.value })
                    }
                    className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Column name"
                  />
                  <button
                    onClick={() => handleDeleteColumn(column.id)}
                    className="p-1 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="size-3.5 text-red-500" />
                  </button>
                </div>

                {/* Data Type */}
                <select
                  value={column.type}
                  onChange={(e) =>
                    handleColumnChange(column.id, { type: e.target.value })
                  }
                  className="w-full px-2 py-1 text-sm font-mono border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {DATA_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                {/* Flags */}
                <div className="flex flex-wrap gap-2">
                  <label className="flex items-center gap-1.5 text-xs text-gray-600">
                    <input
                      type="checkbox"
                      checked={column.isPrimaryKey || false}
                      onChange={(e) =>
                        handleColumnChange(column.id, {
                          isPrimaryKey: e.target.checked,
                        })
                      }
                      className="rounded"
                    />
                    Primary Key
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-gray-600">
                    <input
                      type="checkbox"
                      checked={column.isForeignKey || false}
                      onChange={(e) =>
                        handleColumnChange(column.id, {
                          isForeignKey: e.target.checked,
                        })
                      }
                      className="rounded"
                    />
                    Foreign Key
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-gray-600">
                    <input
                      type="checkbox"
                      checked={column.isNullable || false}
                      onChange={(e) =>
                        handleColumnChange(column.id, {
                          isNullable: e.target.checked,
                        })
                      }
                      className="rounded"
                    />
                    Nullable
                  </label>
                </div>

                {/* Default Value */}
                <input
                  type="text"
                  value={column.defaultValue || ''}
                  onChange={(e) =>
                    handleColumnChange(column.id, {
                      defaultValue: e.target.value,
                    })
                  }
                  placeholder="Default value"
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
