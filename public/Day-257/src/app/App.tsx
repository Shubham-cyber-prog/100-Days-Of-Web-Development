import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';
import { PropertiesPanel } from './components/PropertiesPanel';
import { ExportModal } from './components/ExportModal';

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
  position: { x: number; y: number };
  columns: Column[];
}

interface Relationship {
  id: string;
  from: { tableId: string; columnId: string };
  to: { tableId: string; columnId: string };
}

function App() {
  const [projectName, setProjectName] = useState('My Database Schema');
  const [tables, setTables] = useState<Table[]>([]);
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const handleAddTable = () => {
    const newTable: Table = {
      id: `table-${Date.now()}`,
      name: `table_${tables.length + 1}`,
      position: {
        x: 100 + tables.length * 50,
        y: 100 + tables.length * 50,
      },
      columns: [
        {
          id: `col-${Date.now()}-1`,
          name: 'id',
          type: 'INT',
          isPrimaryKey: true,
          isNullable: false,
        },
        {
          id: `col-${Date.now()}-2`,
          name: 'created_at',
          type: 'DATETIME',
          isNullable: false,
        },
      ],
    };
    setTables([...tables, newTable]);
    setSelectedTableId(newTable.id);
  };

  const handleMoveTable = (id: string, x: number, y: number) => {
    setTables((prev) =>
      prev.map((table) =>
        table.id === id ? { ...table, position: { x, y } } : table
      )
    );
  };

  const handleSelectTable = (id: string) => {
    setSelectedTableId(id || null);
  };

  const handleUpdateTable = (id: string, updates: Partial<Table>) => {
    setTables((prev) =>
      prev.map((table) => (table.id === id ? { ...table, ...updates } : table))
    );
  };

  const selectedTable = tables.find((t) => t.id === selectedTableId) || null;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Top Bar */}
        <TopBar
          projectName={projectName}
          onProjectNameChange={setProjectName}
          onExport={() => setIsExportModalOpen(true)}
        />

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar */}
          <Sidebar
            tables={tables}
            onAddTable={handleAddTable}
            onSelectTable={handleSelectTable}
            selectedTableId={selectedTableId}
          />

          {/* Canvas */}
          <Canvas
            tables={tables}
            relationships={relationships}
            selectedTableId={selectedTableId}
            onMoveTable={handleMoveTable}
            onSelectTable={handleSelectTable}
            isEmpty={tables.length === 0}
            onAddFirstTable={handleAddTable}
          />

          {/* Right Properties Panel */}
          {selectedTable && (
            <PropertiesPanel
              selectedTable={selectedTable}
              onUpdateTable={handleUpdateTable}
              onClose={() => setSelectedTableId(null)}
            />
          )}
        </div>

        {/* Export Modal */}
        <ExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          tables={tables}
        />
      </div>
    </DndProvider>
  );
}

export default App;
