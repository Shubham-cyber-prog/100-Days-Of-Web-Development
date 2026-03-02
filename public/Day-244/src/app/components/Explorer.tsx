import { ChevronRight, ChevronDown, File, Folder, FolderOpen } from "lucide-react";
import { useState } from "react";

export interface FileNode {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
}

interface ExplorerProps {
  fileTree: FileNode[];
  selectedFile: string | null;
  onFileSelect: (fileId: string, fileName: string) => void;
  isVisible: boolean;
}

export function Explorer({ fileTree, selectedFile, onFileSelect, isVisible }: ExplorerProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["root", "src"]));

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const renderFileTree = (nodes: FileNode[], depth = 0) => {
    return nodes.map((node) => {
      const isExpanded = expandedFolders.has(node.id);
      const isSelected = selectedFile === node.id;

      if (node.type === "folder") {
        return (
          <div key={node.id}>
            <button
              onClick={() => toggleFolder(node.id)}
              className="w-full flex items-center gap-1 px-2 py-0.5 hover:bg-[#2a2d2e] transition-colors text-[#cccccc] text-xs group"
              style={{ paddingLeft: `${8 + depth * 12}px` }}
            >
              {isExpanded ? (
                <ChevronDown className="size-3.5 text-[#cccccc]" />
              ) : (
                <ChevronRight className="size-3.5 text-[#cccccc]" />
              )}
              {isExpanded ? (
                <FolderOpen className="size-4 text-[#dcb67a]" />
              ) : (
                <Folder className="size-4 text-[#dcb67a]" />
              )}
              <span className="flex-1 text-left truncate">{node.name}</span>
            </button>
            {isExpanded && node.children && (
              <div>{renderFileTree(node.children, depth + 1)}</div>
            )}
          </div>
        );
      }

      const fileIcon = getFileIcon(node.name);

      return (
        <button
          key={node.id}
          onClick={() => onFileSelect(node.id, node.name)}
          className={`w-full flex items-center gap-1 px-2 py-0.5 transition-colors text-xs ${
            isSelected
              ? "bg-[#37373d] text-white"
              : "text-[#cccccc] hover:bg-[#2a2d2e]"
          }`}
          style={{ paddingLeft: `${20 + depth * 12}px` }}
        >
          {fileIcon}
          <span className="flex-1 text-left truncate">{node.name}</span>
        </button>
      );
    });
  };

  if (!isVisible) return null;

  return (
    <div className="w-64 bg-[#252526] border-r border-[#2b2b2b] flex flex-col h-full overflow-hidden md:relative absolute left-0 top-0 bottom-0 z-10 md:z-auto">
      <div className="px-4 py-2 text-[#cccccc] text-xs font-semibold uppercase tracking-wide">
        Explorer
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="py-1">{renderFileTree(fileTree)}</div>
      </div>
    </div>
  );
}

function getFileIcon(fileName: string) {
  const ext = fileName.split(".").pop()?.toLowerCase();
  
  const iconColors: Record<string, string> = {
    tsx: "#3178c6",
    ts: "#3178c6",
    jsx: "#61dafb",
    js: "#f7df1e",
    json: "#f7df1e",
    css: "#42a5f5",
    html: "#e44d26",
    md: "#083fa1",
    txt: "#858585",
  };

  const color = iconColors[ext || ""] || "#858585";

  return <File className="size-4" style={{ color }} />;
}