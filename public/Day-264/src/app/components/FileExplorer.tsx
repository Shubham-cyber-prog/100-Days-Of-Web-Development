import { useState } from 'react';
import { ChevronRight, ChevronDown, File, Folder } from 'lucide-react';
import { FileItem } from '../data/mockData';

interface FileExplorerProps {
  files: FileItem[];
  onFileSelect?: (file: FileItem) => void;
}

function FileTreeItem({
  item,
  level = 0,
  onFileSelect,
}: {
  item: FileItem;
  level?: number;
  onFileSelect?: (file: FileItem) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(level === 0);

  const handleClick = () => {
    if (item.type === 'folder') {
      setIsExpanded(!isExpanded);
    } else {
      onFileSelect?.(item);
    }
  };

  return (
    <div>
      <div
        className={`flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-gray-100 rounded-md`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleClick}
      >
        {item.type === 'folder' ? (
          <>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            )}
            <Folder className="w-4 h-4 text-blue-500" />
          </>
        ) : (
          <>
            <span className="w-4" />
            <File className="w-4 h-4 text-gray-500" />
          </>
        )}
        <span className="text-sm">{item.name}</span>
      </div>
      {item.type === 'folder' && isExpanded && item.children && (
        <div>
          {item.children.map((child) => (
            <FileTreeItem
              key={child.path}
              item={child}
              level={level + 1}
              onFileSelect={onFileSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FileExplorer({ files, onFileSelect }: FileExplorerProps) {
  return (
    <div className="border rounded-lg bg-white">
      <div className="p-3 border-b bg-gray-50">
        <h3 className="font-semibold text-sm">Files</h3>
      </div>
      <div className="p-2">
        {files.map((item) => (
          <FileTreeItem key={item.path} item={item} onFileSelect={onFileSelect} />
        ))}
      </div>
    </div>
  );
}
