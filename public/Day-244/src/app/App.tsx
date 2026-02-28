import { useState } from "react";
import { TitleBar } from "./components/TitleBar";
import { ActivityBar } from "./components/ActivityBar";
import { Explorer, FileNode } from "./components/Explorer";
import { EditorArea } from "./components/EditorArea";
import { BottomPanel } from "./components/BottomPanel";
import { StatusBar } from "./components/StatusBar";

// Mock file tree data
const mockFileTree: FileNode[] = [
  {
    id: "root",
    name: "my-project",
    type: "folder",
    children: [
      {
        id: "src",
        name: "src",
        type: "folder",
        children: [
          {
            id: "app",
            name: "app",
            type: "folder",
            children: [
              { id: "App.tsx", name: "App.tsx", type: "file" },
              { id: "index.tsx", name: "index.tsx", type: "file" },
            ],
          },
          {
            id: "components",
            name: "components",
            type: "folder",
            children: [
              { id: "Header.tsx", name: "Header.tsx", type: "file" },
              { id: "Footer.tsx", name: "Footer.tsx", type: "file" },
              { id: "Sidebar.tsx", name: "Sidebar.tsx", type: "file" },
            ],
          },
          {
            id: "styles",
            name: "styles",
            type: "folder",
            children: [
              { id: "globals.css", name: "globals.css", type: "file" },
              { id: "theme.css", name: "theme.css", type: "file" },
            ],
          },
          { id: "utils.ts", name: "utils.ts", type: "file" },
        ],
      },
      {
        id: "public",
        name: "public",
        type: "folder",
        children: [
          { id: "index.html", name: "index.html", type: "file" },
          { id: "favicon.ico", name: "favicon.ico", type: "file" },
        ],
      },
      { id: "package.json", name: "package.json", type: "file" },
      { id: "tsconfig.json", name: "tsconfig.json", type: "file" },
      { id: "README.md", name: "README.md", type: "file" },
    ],
  },
];

// Mock file contents
const mockFileContents: Record<string, { content: string; language: string }> = {
  "App.tsx": {
    language: "typescript",
    content: `import { useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Footer } from "./components/Footer";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Header />
      <main className="container">
        <h1>Welcome to React</h1>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </main>
      <Footer />
    </div>
  );
}`,
  },
  "Header.tsx": {
    language: "typescript",
    content: `export function Header() {
  return (
    <header className="header">
      <div className="logo">MyApp</div>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
    </header>
  );
}`,
  },
  "Footer.tsx": {
    language: "typescript",
    content: `export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <p>&copy; {currentYear} MyApp. All rights reserved.</p>
    </footer>
  );
}`,
  },
  "Sidebar.tsx": {
    language: "typescript",
    content: `interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <aside className={isOpen ? "sidebar open" : "sidebar"}>
      <button onClick={onClose}>Close</button>
      <nav>
        <ul>
          <li>Dashboard</li>
          <li>Profile</li>
          <li>Settings</li>
        </ul>
      </nav>
    </aside>
  );
}`,
  },
  "globals.css": {
    language: "css",
    content: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  line-height: 1.5;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}`,
  },
  "index.tsx": {
    language: "typescript",
    content: `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  },
  "index.html": {
    language: "html",
    content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Project</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/app/index.tsx"></script>
  </body>
</html>`,
  },
  "tsconfig.json": {
    language: "json",
    content: `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`,
  },
  "package.json": {
    language: "json",
    content: `{
  "name": "my-project",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.0",
    "typescript": "^5.5.3",
    "vite": "^6.0.0"
  }
}`,
  },
  "README.md": {
    language: "markdown",
    content: `# My Project

A modern React application built with TypeScript and Vite.

## Features

- Fast development with Vite
- Type safety with TypeScript
- Modern React patterns
- Component-based architecture

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Build

\`\`\`bash
npm run build
\`\`\`

## License

MIT`,
  },
  "utils.ts": {
    language: "typescript",
    content: `export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}`,
  },
};

type ActivityTab = "explorer" | "search" | "source-control" | "run" | "extensions" | "settings";

interface EditorTab {
  id: string;
  name: string;
  content: string;
  language: string;
}

export default function App() {
  const [activeActivityTab, setActiveActivityTab] = useState<ActivityTab>("explorer");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isBottomPanelVisible, setIsBottomPanelVisible] = useState(true);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [openTabs, setOpenTabs] = useState<EditorTab[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const handleFileSelect = (fileId: string, fileName: string) => {
    setSelectedFile(fileId);

    // Close sidebar on mobile after file selection
    if (window.innerWidth < 768) {
      setIsSidebarVisible(false);
    }

    // Check if tab already exists
    const existingTab = openTabs.find((tab) => tab.id === fileId);
    if (existingTab) {
      setActiveTab(fileId);
      return;
    }

    // Create new tab
    const fileContent = mockFileContents[fileName] || {
      content: `// ${fileName}\n\n// File content goes here...`,
      language: "typescript",
    };

    const newTab: EditorTab = {
      id: fileId,
      name: fileName,
      content: fileContent.content,
      language: fileContent.language,
    };

    setOpenTabs([...openTabs, newTab]);
    setActiveTab(fileId);
  };

  const handleTabClose = (tabId: string) => {
    const newTabs = openTabs.filter((tab) => tab.id !== tabId);
    setOpenTabs(newTabs);

    if (activeTab === tabId) {
      setActiveTab(newTabs.length > 0 ? newTabs[newTabs.length - 1].id : null);
    }

    if (selectedFile === tabId) {
      setSelectedFile(null);
    }
  };

  const currentFileName = openTabs.find((tab) => tab.id === activeTab)?.name || null;

  return (
    <div className="size-full flex flex-col bg-[#1e1e1e] overflow-hidden">
      {/* Title Bar */}
      <TitleBar onToggleSidebar={() => setIsSidebarVisible(!isSidebarVisible)} />

      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Activity Bar */}
        <ActivityBar activeTab={activeActivityTab} onTabChange={setActiveActivityTab} />

        {/* Overlay for mobile sidebar */}
        {isSidebarVisible && (
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-[5]"
            onClick={() => setIsSidebarVisible(false)}
          />
        )}

        {/* Sidebar (Explorer, etc.) */}
        {isSidebarVisible && activeActivityTab === "explorer" && (
          <Explorer
            fileTree={mockFileTree}
            selectedFile={selectedFile}
            onFileSelect={handleFileSelect}
            isVisible={isSidebarVisible}
          />
        )}

        {/* Other sidebar panels */}
        {isSidebarVisible && activeActivityTab === "search" && (
          <div className="w-64 bg-[#252526] border-r border-[#2b2b2b] p-4 md:relative absolute left-0 top-0 bottom-0 z-10 md:z-auto overflow-auto custom-scrollbar">
            <div className="text-[#cccccc] text-xs">
              <p className="font-semibold uppercase tracking-wide mb-3">Search</p>
              <input
                type="text"
                placeholder="Search files..."
                className="w-full bg-[#3c3c3c] border border-[#2b2b2b] px-2 py-1 text-xs rounded outline-none focus:border-[#007acc]"
              />
            </div>
          </div>
        )}

        {isSidebarVisible && activeActivityTab === "source-control" && (
          <div className="w-64 bg-[#252526] border-r border-[#2b2b2b] p-4 md:relative absolute left-0 top-0 bottom-0 z-10 md:z-auto overflow-auto custom-scrollbar">
            <div className="text-[#cccccc] text-xs">
              <p className="font-semibold uppercase tracking-wide mb-3">Source Control</p>
              <p className="opacity-50">No changes detected</p>
            </div>
          </div>
        )}

        {isSidebarVisible && activeActivityTab === "run" && (
          <div className="w-64 bg-[#252526] border-r border-[#2b2b2b] p-4 md:relative absolute left-0 top-0 bottom-0 z-10 md:z-auto overflow-auto custom-scrollbar">
            <div className="text-[#cccccc] text-xs">
              <p className="font-semibold uppercase tracking-wide mb-3">Run and Debug</p>
              <p className="opacity-50">No debug configurations</p>
            </div>
          </div>
        )}

        {isSidebarVisible && activeActivityTab === "extensions" && (
          <div className="w-64 bg-[#252526] border-r border-[#2b2b2b] p-4 md:relative absolute left-0 top-0 bottom-0 z-10 md:z-auto overflow-auto custom-scrollbar">
            <div className="text-[#cccccc] text-xs">
              <p className="font-semibold uppercase tracking-wide mb-3">Extensions</p>
              <p className="opacity-50">Manage your extensions</p>
            </div>
          </div>
        )}

        {isSidebarVisible && activeActivityTab === "settings" && (
          <div className="w-64 bg-[#252526] border-r border-[#2b2b2b] p-4 md:relative absolute left-0 top-0 bottom-0 z-10 md:z-auto overflow-auto custom-scrollbar">
            <div className="text-[#cccccc] text-xs">
              <p className="font-semibold uppercase tracking-wide mb-3">Settings</p>
              <p className="opacity-50">User and workspace settings</p>
            </div>
          </div>
        )}

        {/* Main editor area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <EditorArea
            tabs={openTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onTabClose={handleTabClose}
          />

          {/* Bottom Panel */}
          <BottomPanel
            isVisible={isBottomPanelVisible}
            onToggle={() => setIsBottomPanelVisible(!isBottomPanelVisible)}
          />
        </div>
      </div>

      {/* Status Bar */}
      <StatusBar 
        currentFile={currentFileName} 
        lineNumber={1} 
        columnNumber={1}
        onTogglePanel={() => setIsBottomPanelVisible(!isBottomPanelVisible)}
      />
    </div>
  );
}