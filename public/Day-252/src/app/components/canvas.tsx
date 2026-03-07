import { useCallback, useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { StickyNote, StickyNoteData } from './sticky-note';
import { MindMapNode, MindMapNodeData } from './mind-map-node';
import { TextBox, TextBoxData } from './text-box';
import { ConnectionLines } from './connection-line';

interface CanvasProps {
  elements: {
    stickyNotes: StickyNoteData[];
    mindMapNodes: MindMapNodeData[];
    textBoxes: TextBoxData[];
  };
  onUpdateElement: (type: 'sticky-note' | 'mind-map-node' | 'text-box', id: string, updates: any) => void;
  selectedElementId: string | null;
  onSelectElement: (id: string | null) => void;
  zoom: number;
}

export function Canvas({ elements, onUpdateElement, selectedElementId, onSelectElement, zoom }: CanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  const [, drop] = useDrop(() => ({
    accept: ['sticky-note', 'mind-map-node', 'text-box'],
    drop: (item: any, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        const newPosition = {
          x: Math.round(item.position.x + delta.x / zoom),
          y: Math.round(item.position.y + delta.y / zoom),
        };
        let type: 'sticky-note' | 'mind-map-node' | 'text-box' = 'sticky-note';
        if (item.color && ['yellow', 'blue', 'pink', 'green'].includes(item.color)) {
          type = 'sticky-note';
        } else if (item.fontSize !== undefined) {
          type = 'text-box';
        } else {
          type = 'mind-map-node';
        }
        onUpdateElement(type, item.id, { position: newPosition });
      }
    },
  }), [zoom]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.target === canvasRef.current)) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      onSelectElement(null);
    }
  }, [pan, onSelectElement]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanning) {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      });
    }
  }, [isPanning, panStart]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  return (
    <div
      ref={(node) => {
        canvasRef.current = node;
        drop(node);
      }}
      className="flex-1 overflow-hidden relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Enhanced grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(229, 231, 235, 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(229, 231, 235, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
          backgroundPosition: `${pan.x}px ${pan.y}px`,
        }}
      />

      {/* Canvas content */}
      <div
        className="relative"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0',
        }}
      >
        {/* Connection lines */}
        <ConnectionLines nodes={elements.mindMapNodes} />

        {/* Sticky notes */}
        {elements.stickyNotes.map((note) => (
          <StickyNote
            key={note.id}
            note={note}
            onUpdate={(id, updates) => onUpdateElement('sticky-note', id, updates)}
            onSelect={onSelectElement}
            isSelected={selectedElementId === note.id}
          />
        ))}

        {/* Mind map nodes */}
        {elements.mindMapNodes.map((node) => (
          <MindMapNode
            key={node.id}
            node={node}
            onUpdate={(id, updates) => onUpdateElement('mind-map-node', id, updates)}
            onSelect={onSelectElement}
            isSelected={selectedElementId === node.id}
          />
        ))}

        {/* Text boxes */}
        {elements.textBoxes?.map((textBox) => (
          <TextBox
            key={textBox.id}
            textBox={textBox}
            onUpdate={(id, updates) => onUpdateElement('text-box', id, updates)}
            onSelect={onSelectElement}
            isSelected={selectedElementId === textBox.id}
          />
        ))}
      </div>
    </div>
  );
}