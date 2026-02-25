import { Folder, File, ChevronRight, FileText, FileCode, Image } from 'lucide-react';
import { useState } from 'react';

interface FileItem {
  name: string;
  type: 'file' | 'folder';
  size?: string;
  modified?: string;
}

const mockFiles: FileItem[] = [
  { name: 'projects', type: 'folder' },
  { name: 'documents', type: 'folder' },
  { name: 'downloads', type: 'folder' },
  { name: '.bashrc', type: 'file', size: '2.4 KB', modified: 'Feb 20, 2026' },
  { name: '.zshrc', type: 'file', size: '1.8 KB', modified: 'Feb 18, 2026' },
  { name: 'README.md', type: 'file', size: '4.2 KB', modified: 'Feb 22, 2026' },
  { name: 'package.json', type: 'file', size: '1.1 KB', modified: 'Feb 24, 2026' },
  { name: 'config.yaml', type: 'file', size: '856 B', modified: 'Feb 15, 2026' },
];

function getFileIcon(name: string) {
  if (name.endsWith('.md')) return FileText;
  if (name.endsWith('.json') || name.endsWith('.yaml')) return FileCode;
  if (name.endsWith('.png') || name.endsWith('.jpg')) return Image;
  return File;
}

export function FilesScreen() {
  const [selectedPath, setSelectedPath] = useState('/home/user');

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-white mb-2">Files</h1>
          <p className="text-zinc-400 text-sm">
            Browse your terminal file system
          </p>
        </div>

        {/* Path Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-sm font-mono">
          <span className="text-zinc-500">~/</span>
          <ChevronRight className="w-4 h-4 text-zinc-600" />
          <span className="text-emerald-400">user</span>
        </div>

        {/* File List */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-zinc-950 border-b border-zinc-800 text-xs font-medium text-zinc-500">
            <div className="col-span-6">Name</div>
            <div className="col-span-2">Size</div>
            <div className="col-span-4">Modified</div>
          </div>

          {/* Files and Folders */}
          {mockFiles.map((item, index) => {
            const FileIcon = item.type === 'folder' ? Folder : getFileIcon(item.name);
            
            return (
              <div
                key={index}
                className="grid grid-cols-12 gap-4 px-5 py-3 hover:bg-zinc-850 transition-colors border-b border-zinc-800 last:border-0 cursor-pointer group"
              >
                <div className="col-span-6 flex items-center gap-3">
                  <FileIcon className={`w-4 h-4 ${
                    item.type === 'folder' ? 'text-blue-400' : 'text-zinc-400'
                  }`} />
                  <span className="text-sm font-mono text-white group-hover:text-emerald-400 transition-colors">
                    {item.name}
                  </span>
                </div>
                <div className="col-span-2 text-sm text-zinc-500">
                  {item.size || '-'}
                </div>
                <div className="col-span-4 text-sm text-zinc-500">
                  {item.modified || '-'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-4 text-xs text-zinc-500">
          {mockFiles.filter(f => f.type === 'folder').length} folders, {mockFiles.filter(f => f.type === 'file').length} files
        </div>
      </div>
    </div>
  );
}
