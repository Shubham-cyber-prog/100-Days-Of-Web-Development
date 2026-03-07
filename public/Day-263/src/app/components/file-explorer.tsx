import { Folder, FileText, ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from './ui/utils';

export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  path: string;
}

interface FileTreeItemProps {
  node: FileNode;
  level: number;
  onSelect: (path: string) => void;
}

function FileTreeItem({ node, level, onSelect }: FileTreeItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isFolder = node.type === 'folder';

  return (
    <div>
      <button
        onClick={() => {
          if (isFolder) {
            setIsExpanded(!isExpanded);
          }
          onSelect(node.path);
        }}
        className={cn(
          'w-full flex items-center gap-2 px-2 py-1 hover:bg-zinc-800 text-left text-sm transition-colors',
          'text-zinc-300'
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        {isFolder && (
          <>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-zinc-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            )}
            <Folder className="w-4 h-4 text-blue-400" />
          </>
        )}
        {!isFolder && (
          <>
            <span className="w-4" />
            <FileText className="w-4 h-4 text-zinc-500" />
          </>
        )}
        <span>{node.name}</span>
      </button>
      
      {isFolder && isExpanded && node.children && (
        <div>
          {node.children.map((child, index) => (
            <FileTreeItem
              key={index}
              node={child}
              level={level + 1}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface FileExplorerProps {
  fileSystem: FileNode;
  onFileSelect: (path: string) => void;
}

export function FileExplorer({ fileSystem, onFileSelect }: FileExplorerProps) {
  return (
    <div className="h-full overflow-y-auto bg-zinc-900">
      <div className="p-2">
        <div className="text-xs text-zinc-500 px-2 py-2 uppercase tracking-wider">
          File System
        </div>
        <FileTreeItem node={fileSystem} level={0} onSelect={onFileSelect} />
      </div>
    </div>
  );
}
