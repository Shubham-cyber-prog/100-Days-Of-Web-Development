import React from 'react';
import { X } from 'lucide-react';
import { GameButton } from './GameButton';

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  closeButton?: boolean;
}

export function GameModal({ isOpen, onClose, title, children, actions, closeButton = true }: GameModalProps) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-slate-900 border-2 border-cyan-500/50 rounded-2xl shadow-[0_0_60px_rgba(6,182,212,0.6)] max-w-md w-full">
        {closeButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        )}
        
        <div className="p-6">
          <h2 className="text-3xl font-bold text-white mb-6 text-center uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {title}
          </h2>
          
          <div className="mb-6">
            {children}
          </div>
          
          {actions && (
            <div className="flex flex-col gap-3">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
