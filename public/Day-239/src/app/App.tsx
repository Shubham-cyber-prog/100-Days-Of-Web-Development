import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { SnippetList } from './components/SnippetList';
import { SnippetEditor } from './components/SnippetEditor';
import { NewSnippetModal } from './components/NewSnippetModal';
import { CollectionsView } from './components/CollectionsView';
import { SettingsView } from './components/SettingsView';
import { SharedSnippetsView } from './components/SharedSnippetsView';
import { EmptyState } from './components/EmptyState';

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

// Sample data
const initialSnippets: Snippet[] = [
  {
    id: '1',
    title: 'React useState Hook',
    language: 'JavaScript',
    code: `import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>\n        Increment\n      </button>\n    </div>\n  );\n}`,
    tags: ['react', 'hooks', 'state'],
    favorite: true,
    updatedAt: new Date(2026, 1, 23),
    description: 'Basic useState hook example for managing state in React',
  },
  {
    id: '2',
    title: 'Python List Comprehension',
    language: 'Python',
    code: `# Square all numbers in a list\nnumbers = [1, 2, 3, 4, 5]\nsquared = [x ** 2 for x in numbers]\nprint(squared)  # [1, 4, 9, 16, 25]\n\n# Filter even numbers\neven_numbers = [x for x in numbers if x % 2 == 0]\nprint(even_numbers)  # [2, 4]`,
    tags: ['python', 'list', 'comprehension'],
    favorite: false,
    updatedAt: new Date(2026, 1, 22),
    description: 'Efficient list comprehension patterns in Python',
  },
  {
    id: '3',
    title: 'Express.js Basic Server',
    language: 'JavaScript',
    code: `const express = require('express');\nconst app = express();\nconst PORT = 3000;\n\napp.use(express.json());\n\napp.get('/', (req, res) => {\n  res.json({ message: 'Hello World!' });\n});\n\napp.listen(PORT, () => {\n  console.log(\`Server running on port \${PORT}\`);\n});`,
    tags: ['express', 'nodejs', 'server'],
    favorite: true,
    updatedAt: new Date(2026, 1, 21),
    description: 'Simple Express.js server setup',
  },
  {
    id: '4',
    title: 'TypeScript Interface',
    language: 'TypeScript',
    code: `interface User {\n  id: number;\n  name: string;\n  email: string;\n  role: 'admin' | 'user';\n  createdAt: Date;\n}\n\nconst user: User = {\n  id: 1,\n  name: 'John Doe',\n  email: 'john@example.com',\n  role: 'admin',\n  createdAt: new Date(),\n};`,
    tags: ['typescript', 'interface', 'types'],
    favorite: false,
    updatedAt: new Date(2026, 1, 20),
    description: 'TypeScript interface definition example',
  },
  {
    id: '5',
    title: 'CSS Flexbox Center',
    language: 'CSS',
    code: `.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n}\n\n.centered-content {\n  max-width: 600px;\n  padding: 2rem;\n}`,
    tags: ['css', 'flexbox', 'layout'],
    favorite: false,
    updatedAt: new Date(2026, 1, 19),
    description: 'Perfect centering with flexbox',
  },
  {
    id: '6',
    title: 'Java ArrayList Example',
    language: 'Java',
    code: `import java.util.ArrayList;\n\npublic class Main {\n  public static void main(String[] args) {\n    ArrayList<String> cars = new ArrayList<>();\n    cars.add("Volvo");\n    cars.add("BMW");\n    cars.add("Ford");\n    \n    for (String car : cars) {\n      System.out.println(car);\n    }\n  }\n}`,
    tags: ['java', 'arraylist', 'collections'],
    favorite: false,
    updatedAt: new Date(2026, 1, 18),
    description: 'Working with ArrayLists in Java',
  },
];

function App() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [currentView, setCurrentView] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All Languages');
  const [sortBy, setSortBy] = useState('recent');
  const [editingSnippet, setEditingSnippet] = useState<Snippet | null>(null);
  const [showNewSnippetModal, setShowNewSnippetModal] = useState(false);

  // Apply dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Load snippets from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('codeSnippets');
    if (stored) {
      const parsed = JSON.parse(stored);
      setSnippets(
        parsed.map((s: any) => ({
          ...s,
          updatedAt: new Date(s.updatedAt),
        }))
      );
    } else {
      setSnippets(initialSnippets);
    }
  }, []);

  // Save snippets to localStorage whenever they change
  useEffect(() => {
    if (snippets.length > 0) {
      localStorage.setItem('codeSnippets', JSON.stringify(snippets));
    }
  }, [snippets]);

  // Filter and sort snippets
  const getFilteredSnippets = () => {
    let filtered = [...snippets];

    // Filter by view
    if (currentView === 'favorites') {
      filtered = filtered.filter((s) => s.favorite);
    } else if (currentView === 'shared') {
      // Mock shared snippets - in real app would come from backend
      filtered = [];
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.title.toLowerCase().includes(query) ||
          s.code.toLowerCase().includes(query) ||
          s.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          s.language.toLowerCase().includes(query)
      );
    }

    // Filter by language
    if (selectedLanguage !== 'All Languages') {
      filtered = filtered.filter((s) => s.language === selectedLanguage);
    }

    // Sort
    if (sortBy === 'recent') {
      filtered.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'favorites') {
      filtered.sort((a, b) => (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0));
    }

    return filtered;
  };

  const filteredSnippets = getFilteredSnippets();

  const handleToggleFavorite = (id: string) => {
    setSnippets((prev) =>
      prev.map((s) => (s.id === id ? { ...s, favorite: !s.favorite } : s))
    );
  };

  const handleSaveSnippet = (updatedSnippet: Snippet) => {
    setSnippets((prev) =>
      prev.map((s) => (s.id === updatedSnippet.id ? updatedSnippet : s))
    );
    setEditingSnippet(null);
  };

  const handleCreateSnippet = (newSnippet: Omit<Snippet, 'id' | 'favorite' | 'updatedAt'>) => {
    const snippet: Snippet = {
      ...newSnippet,
      id: Date.now().toString(),
      favorite: false,
      updatedAt: new Date(),
    };
    setSnippets((prev) => [snippet, ...prev]);
    setShowNewSnippetModal(false);
  };

  const handleDeleteSnippet = (id: string) => {
    setSnippets((prev) => prev.filter((s) => s.id !== id));
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    setCurrentView('all');
  };

  const renderContent = () => {
    if (currentView === 'dashboard') {
      return (
        <Dashboard
          snippets={snippets}
          onSnippetClick={(snippet) => setEditingSnippet(snippet)}
        />
      );
    }

    if (currentView === 'collections') {
      return <CollectionsView snippets={snippets} onTagClick={handleTagClick} />;
    }

    if (currentView === 'settings') {
      return <SettingsView />;
    }

    if (currentView === 'shared') {
      return <SharedSnippetsView />;
    }

    // all or favorites view
    return (
      <SnippetList
        snippets={filteredSnippets}
        onSnippetClick={(snippet) => setEditingSnippet(snippet)}
        onToggleFavorite={handleToggleFavorite}
        onNewSnippet={() => setShowNewSnippetModal(true)}
        view={searchQuery ? 'search' : currentView}
      />
    );
  };

  return (
    <div className="flex h-screen bg-[#0d0d0d]">
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        onNewSnippet={() => setShowNewSnippetModal(true)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
        <div className="flex-1 overflow-auto">{renderContent()}</div>
      </div>

      {editingSnippet && (
        <SnippetEditor
          snippet={editingSnippet}
          onClose={() => setEditingSnippet(null)}
          onSave={handleSaveSnippet}
          onDelete={handleDeleteSnippet}
        />
      )}

      {showNewSnippetModal && (
        <NewSnippetModal
          onClose={() => setShowNewSnippetModal(false)}
          onSave={handleCreateSnippet}
        />
      )}
    </div>
  );
}

export default App;