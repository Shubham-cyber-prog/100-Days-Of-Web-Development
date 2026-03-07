import { useState, useRef, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { motion } from 'motion/react';

export interface MindMapNodeData {
  id: string;
  text: string;
  color: string;
  position: { x: number; y: number };
  connections?: string[];
}

interface MindMapNodeProps {
  node: MindMapNodeData;
  onUpdate: (id: string, updates: Partial<MindMapNodeData>) => void;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

export function MindMapNode({ node, onUpdate, onSelect, isSelected }: MindMapNodeProps) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'mind-map-node',
    item: node,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(node.id, { text: e.target.value });
  };

  return (
    <motion.div
      ref={drag}
      className={`absolute cursor-move transition-all ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      style={{
        left: node.position.x,
        top: node.position.y,
      }}
      onClick={() => onSelect(node.id)}
      onDoubleClick={() => setIsEditing(true)}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
      whileHover={{ scale: 1.05 }}
    >
      <div
        className={`px-6 py-3 rounded-full shadow-lg border-2 hover:shadow-xl transition-all ${
          isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
        }`}
        style={{
          backgroundColor: node.color,
          borderColor: node.color,
          filter: 'brightness(0.95)',
        }}
      >
        {isEditing ? (
          <input
            ref={inputRef}
            value={node.text}
            onChange={handleTextChange}
            onBlur={() => setIsEditing(false)}
            className="bg-transparent outline-none text-sm font-medium text-gray-800 min-w-[100px]"
            placeholder="Node text..."
          />
        ) : (
          <span className="text-sm font-medium text-gray-800">{node.text || 'Double-click to edit'}</span>
        )}
      </div>
    </motion.div>
  );
}