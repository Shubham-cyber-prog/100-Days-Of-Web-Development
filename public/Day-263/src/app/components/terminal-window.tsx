import { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { motion } from 'motion/react';

export interface TerminalLine {
  type: 'command' | 'output' | 'error';
  content: string;
  timestamp: Date;
}

interface TerminalWindowProps {
  lines: TerminalLine[];
  onCommand: (command: string) => void;
  currentDirectory: string;
  username: string;
}

export function TerminalWindow({
  lines,
  onCommand,
  currentDirectory,
  username,
}: TerminalWindowProps) {
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleSubmit = () => {
    if (input.trim()) {
      setCommandHistory([...commandHistory, input]);
      setHistoryIndex(-1);
      onCommand(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
        if (newIndex === commandHistory.length - 1 && historyIndex === commandHistory.length - 1) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  return (
    <div 
      className="flex-1 bg-black text-green-400 font-mono text-sm p-4 overflow-y-auto"
      ref={terminalRef}
      onClick={() => inputRef.current?.focus()}
    >
      {lines.map((line, index) => (
        <div key={index} className="mb-1">
          {line.type === 'command' ? (
            <div className="flex gap-2">
              <span className="text-blue-400">{username}@browser</span>
              <span className="text-white">:</span>
              <span className="text-purple-400">{currentDirectory}</span>
              <span className="text-white">$</span>
              <span className="text-green-400">{line.content}</span>
            </div>
          ) : (
            <div className={line.type === 'error' ? 'text-red-400' : 'text-gray-300'}>
              {line.content}
            </div>
          )}
        </div>
      ))}
      
      <div className="flex gap-2">
        <span className="text-blue-400">{username}@browser</span>
        <span className="text-white">:</span>
        <span className="text-purple-400">{currentDirectory}</span>
        <span className="text-white">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-green-400 caret-green-400"
          autoFocus
        />
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-2 h-4 bg-green-400"
        />
      </div>
    </div>
  );
}
