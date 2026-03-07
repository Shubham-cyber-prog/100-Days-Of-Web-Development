import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { Key, Link2 } from 'lucide-react';

interface Column {
  id: string;
  name: string;
  type: string;
  isPrimaryKey?: boolean;
  isForeignKey?: boolean;
  isNullable?: boolean;
}

interface TableCardProps {
  id: string;
  name: string;
  position: { x: number; y: number };
  columns: Column[];
  onMove: (id: string, x: number, y: number) => void;
  onSelect: (id: string) => void;
  isSelected: boolean;
  scale: number;
}

export function TableCard({
  id,
  name,
  position,
  columns,
  onMove,
  onSelect,
  isSelected,
  scale,
}: TableCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'table',
    item: () => {
      return { id, left: position.x, top: position.y };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(ref);

  return (
    <div
      ref={ref}
      className={`absolute bg-white rounded-lg shadow-md border-2 transition-all cursor-move ${
        isSelected ? 'border-blue-500' : 'border-gray-200'
      } ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      style={{
        left: position.x,
        top: position.y,
        width: '280px',
      }}
      onClick={() => onSelect(id)}
    >
      {/* Table Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-t-lg">
        <h3 className="font-semibold">{name}</h3>
      </div>

      {/* Columns */}
      <div className="p-2">
        {columns.map((column) => (
          <div
            key={column.id}
            className="flex items-center gap-2 px-2 py-2 hover:bg-gray-50 rounded group"
          >
            <div className="flex items-center gap-1.5 flex-1">
              {column.isPrimaryKey && (
                <Key className="size-3.5 text-amber-500 flex-shrink-0" />
              )}
              {column.isForeignKey && (
                <Link2 className="size-3.5 text-blue-500 flex-shrink-0" />
              )}
              <span className="text-sm font-medium text-gray-700 truncate">
                {column.name}
              </span>
            </div>
            <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
              {column.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
