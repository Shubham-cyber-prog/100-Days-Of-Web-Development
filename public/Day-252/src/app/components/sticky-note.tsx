import { useState, useRef, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { motion } from 'motion/react';
import { GripVertical } from 'lucide-react';

export interface StickyNoteData {
  id: string;
  text: string;
  color: 'yellow' | 'blue' | 'pink' | 'green';
  position: { x: number; y: number };
}

interface StickyNoteProps {
  note: StickyNoteData;
  onUpdate: (id: string, updates: Partial<StickyNoteData>) => void;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

const colorClasses = {
  yellow: 'bg-gradient-to-br from-yellow-100 to-yellow-200 border-yellow-400',
  blue: 'bg-gradient-to-br from-blue-100 to-blue-200 border-blue-400',
  pink: 'bg-gradient-to-br from-pink-100 to-pink-200 border-pink-400',
  green: 'bg-gradient-to-br from-green-100 to-green-200 border-green-400',
};

export function StickyNote({ note, onUpdate, onSelect, isSelected }: StickyNoteProps) {
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'sticky-note',
    item: note,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate(note.id, { text: e.target.value });
  };

  return (
    <motion.div
      ref={drag}
      className={`absolute w-48 h-48 p-4 border-2 rounded-lg shadow-lg cursor-move transition-all hover:shadow-xl ${
        colorClasses[note.color]
      } ${isDragging ? 'opacity-50 rotate-2' : 'opacity-100'} ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      }`}
      style={{
        left: note.position.x,
        top: note.position.y,
      }}
      onClick={() => onSelect(note.id)}
      onDoubleClick={() => setIsEditing(true)}
      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.02, rotate: 1 }}
    >
      <div className="flex items-start justify-between mb-2">
        <GripVertical className="w-4 h-4 text-gray-400" />
      </div>
      {isEditing ? (
        <textarea
          ref={textareaRef}
          value={note.text}
          onChange={handleTextChange}
          onBlur={() => setIsEditing(false)}
          className="w-full h-32 bg-transparent resize-none outline-none text-sm"
          placeholder="Type your idea..."
        />
      ) : (
        <p className="text-sm whitespace-pre-wrap break-words">{note.text || 'Double-click to edit'}</p>
      )}
    </motion.div>
  );
}