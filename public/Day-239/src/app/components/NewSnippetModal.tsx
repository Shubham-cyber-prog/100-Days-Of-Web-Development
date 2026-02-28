import { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface Snippet {
  id: string;
  title: string;
  language: string;
  code: string;
  tags: string[];
  favorite: boolean;
  updatedAt: Date;
  description?: string;
}

interface NewSnippetModalProps {
  onClose: () => void;
  onSave: (snippet: Omit<Snippet, 'id' | 'favorite' | 'updatedAt'>) => void;
}

const languages = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C++',
  'Go',
  'Rust',
  'Ruby',
  'PHP',
  'Swift',
  'Kotlin',
  'CSS',
];

export function NewSnippetModal({ onClose, onSave }: NewSnippetModalProps) {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('JavaScript');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleSave = () => {
    if (!title.trim() || !code.trim()) {
      alert('Please provide at least a title and code');
      return;
    }

    onSave({
      title: title.trim(),
      language,
      code: code.trim(),
      description: description.trim(),
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1e1e1e] rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-[#2d2d2d] p-4 flex items-center justify-between">
          <h2 className="text-white text-lg">Create New Snippet</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter snippet title..."
                className="w-full bg-[#2d2d2d] text-white px-4 py-2 rounded-lg border border-[#3d3d3d] focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Language and Tags */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-[#2d2d2d] text-white px-4 py-2 rounded-lg border border-[#3d3d3d] focus:border-blue-500 focus:outline-none"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="react, hooks, state..."
                  className="w-full bg-[#2d2d2d] text-white px-4 py-2 rounded-lg border border-[#3d3d3d] focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description..."
                rows={2}
                className="w-full bg-[#2d2d2d] text-white px-4 py-2 rounded-lg border border-[#3d3d3d] focus:border-blue-500 focus:outline-none resize-none"
              />
            </div>

            {/* Code Editor */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Code <span className="text-red-400">*</span>
              </label>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="// Enter your code here..."
                rows={15}
                className="w-full bg-[#0d0d0d] text-white px-4 py-3 rounded-lg border border-[#2d2d2d] focus:border-blue-500 focus:outline-none font-mono text-sm resize-none"
                spellCheck={false}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#2d2d2d] p-4 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-[#2d2d2d] text-white px-4 py-2 rounded-lg hover:bg-[#3d3d3d] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Snippet
          </button>
        </div>
      </div>
    </div>
  );
}