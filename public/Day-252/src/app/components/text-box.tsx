import { useState, useRef, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { motion } from 'motion/react';
import { GripVertical } from 'lucide-react';

export interface TextBoxData {
  id: string;
  text: string;
  fontSize: number;
  position: { x: number; y: number };
  width: number;
}

interface TextBoxProps {
  textBox: TextBoxData;
  onUpdate: (id: string, updates: Partial<TextBoxData>) => void;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

export function TextBox({ textBox, onUpdate, onSelect, isSelected }: TextBoxProps) {
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'text-box',
    item: textBox,
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
    onUpdate(textBox.id, { text: e.target.value });
  };

  return (
    <motion.div
      ref={drag}
      className={`absolute cursor-move transition-all ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
      style={{
        left: textBox.position.x,
        top: textBox.position.y,
        width: textBox.width,
      }}
      onClick={() => onSelect(textBox.id)}
      onDoubleClick={() => setIsEditing(true)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-start justify-between mb-2">
          <GripVertical className="w-4 h-4 text-gray-400" />
        </div>
        {isEditing ? (
          <textarea
            ref={textareaRef}
            value={textBox.text}
            onChange={handleTextChange}
            onBlur={() => setIsEditing(false)}
            className="w-full bg-transparent resize-none outline-none"
            style={{ fontSize: `${textBox.fontSize}px` }}
            placeholder="Type your text..."
            rows={3}
          />
        ) : (
          <p className="whitespace-pre-wrap break-words" style={{ fontSize: `${textBox.fontSize}px` }}>
            {textBox.text || 'Double-click to edit'}
          </p>
        )}
      </div>
    </motion.div>
  );
}
