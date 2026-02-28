import React, { useCallback, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { TableCard } from './TableCard';

interface Column {
  id: string;
  name: string;
  type: string;
  isPrimaryKey?: boolean;
  isForeignKey?: boolean;
  isNullable?: boolean;
}

interface Table {
  id: string;
  name: string;
  position: { x: number; y: number };
  columns: Column[];
}

interface Relationship {
  id: string;
  from: { tableId: string; columnId: string };
  to: { tableId: string; columnId: string };
}

interface CanvasProps {
  tables: Table[];
  relationships: Relationship[];
  selectedTableId: string | null;
  onMoveTable: (id: string, x: number, y: number) => void;
  onSelectTable: (id: string) => void;
  isEmpty?: boolean;
  onAddFirstTable: () => void;
}

export function Canvas({
  tables,
  relationships,
  selectedTableId,
  onMoveTable,
  onSelectTable,
  isEmpty,
  onAddFirstTable,
}: CanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = React.useState(1);

  const [, drop] = useDrop({
    accept: 'table',
    drop(item: { id: string; left: number; top: number }, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        const left = Math.round(item.left + delta.x / scale);
        const top = Math.round(item.top + delta.y / scale);
        onMoveTable(item.id, left, top);
      }
    },
  });

  const drawRelationships = useCallback(() => {
    return relationships.map((rel) => {
      const fromTable = tables.find((t) => t.id === rel.from.tableId);
      const toTable = tables.find((t) => t.id === rel.to.tableId);

      if (!fromTable || !toTable) return null;

      const fromX = fromTable.position.x + 280; // width of table
      const fromY = fromTable.position.y + 60; // approximate position
      const toX = toTable.position.x;
      const toY = toTable.position.y + 60;

      return (
        <line
          key={rel.id}
          x1={fromX}
          y1={fromY}
          x2={toX}
          y2={toY}
          stroke="#3b82f6"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />
      );
    });
  }, [relationships, tables]);

  if (isEmpty) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="size-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="size-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7C5 4 4 5 4 7z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Create your first table
          </h3>
          <p className="text-gray-500 mb-6">
            Start designing your database schema by adding a table
          </p>
          <button
            onClick={onAddFirstTable}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Table
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={drop} className="flex-1 relative overflow-hidden bg-gray-50">
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={2}
        onZoom={(ref) => setScale(ref.state.scale)}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <TransformComponent
              wrapperStyle={{
                width: '100%',
                height: '100%',
              }}
              contentStyle={{
                width: '100%',
                height: '100%',
              }}
            >
              <div
                ref={canvasRef}
                className="relative w-full h-full"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px',
                  minWidth: '3000px',
                  minHeight: '2000px',
                }}
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    onSelectTable('');
                  }
                }}
              >
                {/* SVG for relationship lines */}
                <svg
                  className="absolute inset-0 pointer-events-none"
                  style={{ width: '100%', height: '100%' }}
                >
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="10"
                      markerHeight="10"
                      refX="9"
                      refY="3"
                      orient="auto"
                    >
                      <polygon
                        points="0 0, 10 3, 0 6"
                        fill="#3b82f6"
                      />
                    </marker>
                  </defs>
                  {drawRelationships()}
                </svg>

                {/* Tables */}
                {tables.map((table) => (
                  <TableCard
                    key={table.id}
                    id={table.id}
                    name={table.name}
                    position={table.position}
                    columns={table.columns}
                    onMove={onMoveTable}
                    onSelect={onSelectTable}
                    isSelected={selectedTableId === table.id}
                    scale={scale}
                  />
                ))}
              </div>
            </TransformComponent>

            {/* Zoom Controls */}
            <div className="absolute bottom-6 right-6 flex flex-col gap-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2">
              <button
                onClick={() => zoomIn()}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
              >
                <svg
                  className="size-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
              <div className="h-px bg-gray-200" />
              <button
                onClick={() => zoomOut()}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
              >
                <svg
                  className="size-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <div className="h-px bg-gray-200" />
              <button
                onClick={() => resetTransform()}
                className="p-2 hover:bg-gray-100 rounded transition-colors text-xs font-medium text-gray-600"
              >
                Reset
              </button>
            </div>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
