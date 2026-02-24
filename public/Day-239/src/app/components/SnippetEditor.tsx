import { useState, useEffect } from 'react';
import { Save, Copy, Trash2, Share2, X, Check } from 'lucide-react';
import { Highlight, themes } from 'prism-react-renderer';

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

interface SnippetEditorProps {
  snippet: Snippet | null;
  onClose: () => void;
  onSave: (snippet: Snippet) => void;
  onDelete: (id: string) => void;
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

export function SnippetEditor({ snippet, onClose, onSave, onDelete }: SnippetEditorProps) {
  const [title, setTitle] = useState(snippet?.title || '');
  const [language, setLanguage] = useState(snippet?.language || 'JavaScript');
  const [code, setCode] = useState(snippet?.code || '');
  const [description, setDescription] = useState(snippet?.description || '');
  const [tags, setTags] = useState(snippet?.tags?.join(', ') || '');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (snippet) {
      setTitle(snippet.title);
      setLanguage(snippet.language);
      setCode(snippet.code);
      setDescription(snippet.description || '');
      setTags(snippet.tags.join(', '));
    }
  }, [snippet]);

  const handleSave = () => {
    if (!snippet) return;

    const updatedSnippet: Snippet = {
      ...snippet,
      title: title || 'Untitled Snippet',
      language,
      code,
      description,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      updatedAt: new Date(),
    };

    onSave(updatedSnippet);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = () => {
    if (snippet && confirm('Are you sure you want to delete this snippet?')) {
      onDelete(snippet.id);
      onClose();
    }
  };

  if (!snippet) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1e1e1e] rounded-lg w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-[#2d2d2d] p-4 flex items-center justify-between">
          <h2 className="text-white text-lg">Edit Snippet</h2>
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
              <label className="block text-sm text-gray-400 mb-2">Title</label>
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
              <label className="block text-sm text-gray-400 mb-2">Code</label>
              <div className="relative">
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

            {/* Syntax Highlighted Preview */}
            {code && (
              <div>
                <label className="block text-sm text-gray-400 mb-2">Preview</label>
                <div className="bg-[#0d0d0d] rounded-lg border border-[#2d2d2d] p-4 overflow-auto max-h-64">
                  <Highlight
                    theme={themes.vsDark}
                    code={code}
                    language={language.toLowerCase() as any}
                  >
                    {({ style, tokens, getLineProps, getTokenProps }) => (
                      <pre style={style} className="text-sm font-mono">
                        {tokens.map((line, i) => (
                          <div key={i} {...getLineProps({ line })}>
                            <span className="text-gray-600 select-none inline-block w-8 text-right mr-4">
                              {i + 1}
                            </span>
                            {line.map((token, key) => (
                              <span key={key} {...getTokenProps({ token })} />
                            ))}
                          </div>
                        ))}
                      </pre>
                    )}
                  </Highlight>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#2d2d2d] p-4 flex items-center justify-between">
          <button
            onClick={handleDelete}
            className="text-red-400 hover:text-red-300 px-4 py-2 rounded-lg hover:bg-red-500/10 transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="bg-[#2d2d2d] text-white px-4 py-2 rounded-lg hover:bg-[#3d3d3d] transition-colors flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Code
                </>
              )}
            </button>
            <button
              className="bg-[#2d2d2d] text-white px-4 py-2 rounded-lg hover:bg-[#3d3d3d] transition-colors flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}