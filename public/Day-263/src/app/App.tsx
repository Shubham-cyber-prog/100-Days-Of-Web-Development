import { useState, useEffect } from 'react';
import { TerminalHeader } from './components/terminal-header';
import { TerminalSidebar } from './components/terminal-sidebar';
import { TerminalWindow, TerminalLine } from './components/terminal-window';
import { SessionInfo } from './components/session-info';
import { BottomPanel } from './components/bottom-panel';
import { EmptyState } from './components/empty-state';
import { FileNode } from './components/file-explorer';
import { Layout } from './components/layout';
import { toast } from 'sonner';

interface TerminalSession {
  id: string;
  name: string;
  lines: TerminalLine[];
  currentDirectory: string;
  startTime: Date;
  commandHistory: Array<{ command: string; timestamp: Date }>;
}

type SidebarView = 'terminal' | 'files' | 'history' | 'scripts' | 'settings';

// Mock file system
const mockFileSystem: FileNode = {
  name: '~',
  type: 'folder',
  path: '/home/user',
  children: [
    {
      name: 'Documents',
      type: 'folder',
      path: '/home/user/Documents',
      children: [
        { name: 'readme.txt', type: 'file', path: '/home/user/Documents/readme.txt' },
        { name: 'notes.md', type: 'file', path: '/home/user/Documents/notes.md' },
      ],
    },
    {
      name: 'Projects',
      type: 'folder',
      path: '/home/user/Projects',
      children: [
        {
          name: 'web-app',
          type: 'folder',
          path: '/home/user/Projects/web-app',
          children: [
            { name: 'index.html', type: 'file', path: '/home/user/Projects/web-app/index.html' },
            { name: 'styles.css', type: 'file', path: '/home/user/Projects/web-app/styles.css' },
            { name: 'app.js', type: 'file', path: '/home/user/Projects/web-app/app.js' },
          ],
        },
      ],
    },
    {
      name: 'Downloads',
      type: 'folder',
      path: '/home/user/Downloads',
      children: [],
    },
    { name: '.bashrc', type: 'file', path: '/home/user/.bashrc' },
    { name: '.profile', type: 'file', path: '/home/user/.profile' },
  ],
};

// Mock environment variables
const mockEnvVars = {
  PATH: '/usr/local/bin:/usr/bin:/bin',
  HOME: '/home/user',
  SHELL: '/bin/bash',
  USER: 'user',
  LANG: 'en_US.UTF-8',
  TERM: 'xterm-256color',
};

// Command processor
function processCommand(command: string, currentDir: string): TerminalLine[] {
  const parts = command.trim().split(' ');
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  switch (cmd) {
    case 'help':
      return [
        { type: 'output', content: 'Available commands:', timestamp: new Date() },
        { type: 'output', content: '  help     - Show this help message', timestamp: new Date() },
        { type: 'output', content: '  ls       - List directory contents', timestamp: new Date() },
        { type: 'output', content: '  pwd      - Print working directory', timestamp: new Date() },
        { type: 'output', content: '  echo     - Display a line of text', timestamp: new Date() },
        { type: 'output', content: '  date     - Display current date and time', timestamp: new Date() },
        { type: 'output', content: '  whoami   - Print current user', timestamp: new Date() },
        { type: 'output', content: '  clear    - Clear terminal screen', timestamp: new Date() },
        { type: 'output', content: '  uname    - Print system information', timestamp: new Date() },
      ];

    case 'ls':
      return [
        { type: 'output', content: 'Documents  Projects  Downloads  .bashrc  .profile', timestamp: new Date() },
      ];

    case 'pwd':
      return [{ type: 'output', content: currentDir, timestamp: new Date() }];

    case 'echo':
      return [{ type: 'output', content: args.join(' '), timestamp: new Date() }];

    case 'date':
      return [{ type: 'output', content: new Date().toString(), timestamp: new Date() }];

    case 'whoami':
      return [{ type: 'output', content: 'user', timestamp: new Date() }];

    case 'uname':
      return [{ type: 'output', content: 'Browser Shell v1.0.0 (Web Terminal)', timestamp: new Date() }];

    case 'clear':
      return [];

    case '':
      return [];

    default:
      return [
        { 
          type: 'error', 
          content: `bash: ${cmd}: command not found. Type 'help' for available commands.`, 
          timestamp: new Date() 
        },
      ];
  }
}

export default function App() {
  const [sessions, setSessions] = useState<TerminalSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string>('');
  const [sidebarView, setSidebarView] = useState<SidebarView>('terminal');
  const [logs, setLogs] = useState<Array<{ message: string; timestamp: Date; type: 'info' | 'error' | 'warning' }>>([]);

  const activeSession = sessions.find(s => s.id === activeSessionId);

  const createNewSession = () => {
    const newSession: TerminalSession = {
      id: `session-${Date.now()}`,
      name: `Session ${sessions.length + 1}`,
      lines: [
        { 
          type: 'output', 
          content: 'Welcome to Browser Shell v1.0.0', 
          timestamp: new Date() 
        },
        { 
          type: 'output', 
          content: 'Type "help" for available commands.', 
          timestamp: new Date() 
        },
        { 
          type: 'output', 
          content: '', 
          timestamp: new Date() 
        },
      ],
      currentDirectory: '~',
      startTime: new Date(),
      commandHistory: [],
    };

    setSessions([...sessions, newSession]);
    setActiveSessionId(newSession.id);
    
    setLogs(prev => [
      ...prev,
      { message: `Session "${newSession.name}" created`, timestamp: new Date(), type: 'info' },
    ]);

    toast.success(`Session "${newSession.name}" created`);
  };

  const handleCommand = (command: string) => {
    if (!activeSession) return;

    const commandLine: TerminalLine = {
      type: 'command',
      content: command,
      timestamp: new Date(),
    };

    const outputLines = processCommand(command, activeSession.currentDirectory);

    setSessions(sessions.map(s => {
      if (s.id === activeSessionId) {
        const newLines = command.toLowerCase() === 'clear' 
          ? [] 
          : [...s.lines, commandLine, ...outputLines];
        
        return {
          ...s,
          lines: newLines,
          commandHistory: [...s.commandHistory, { command, timestamp: new Date() }],
        };
      }
      return s;
    }));

    setLogs(prev => [
      ...prev,
      { message: `Command executed: ${command}`, timestamp: new Date(), type: 'info' },
    ]);
  };

  const handleClearTerminal = () => {
    if (!activeSession) return;
    
    setSessions(sessions.map(s => {
      if (s.id === activeSessionId) {
        return { ...s, lines: [] };
      }
      return s;
    }));
    
    toast.success('Terminal cleared');
  };

  const handleSaveSession = () => {
    if (!activeSession) return;
    
    // In a real app, this would save to localStorage or backend
    toast.success('Session saved successfully');
    setLogs(prev => [
      ...prev,
      { message: `Session "${activeSession.name}" saved`, timestamp: new Date(), type: 'info' },
    ]);
  };

  const handleSessionNameChange = (name: string) => {
    setSessions(sessions.map(s => {
      if (s.id === activeSessionId) {
        return { ...s, name };
      }
      return s;
    }));
  };

  const handleCommandHistoryClick = (command: string) => {
    handleCommand(command);
  };

  const handleFileSelect = (path: string) => {
    toast.info(`Selected: ${path}`);
  };

  // Create initial session on mount
  useEffect(() => {
    if (sessions.length === 0) {
      createNewSession();
    }
  }, []);

  if (sessions.length === 0) {
    return (
      <Layout>
        <div className="h-screen flex flex-col bg-zinc-950">
          <TerminalHeader
            sessionName=""
            onSessionNameChange={() => {}}
            onNewSession={createNewSession}
            onClearTerminal={() => {}}
            onSaveSession={() => {}}
          />
          <div className="flex flex-1 overflow-hidden">
            <TerminalSidebar
              activeView={sidebarView}
              onViewChange={setSidebarView}
              onNewSession={createNewSession}
              sessions={sessions}
              activeSessionId={activeSessionId}
              onSessionChange={setActiveSessionId}
            />
            <EmptyState onNewSession={createNewSession} />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="h-screen flex flex-col bg-zinc-950">
        <TerminalHeader
          sessionName={activeSession?.name || ''}
          onSessionNameChange={handleSessionNameChange}
          onNewSession={createNewSession}
          onClearTerminal={handleClearTerminal}
          onSaveSession={handleSaveSession}
        />
        
        <div className="flex flex-1 overflow-hidden">
          <TerminalSidebar
            activeView={sidebarView}
            onViewChange={setSidebarView}
            onNewSession={createNewSession}
            sessions={sessions}
            activeSessionId={activeSessionId}
            onSessionChange={setActiveSessionId}
          />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex flex-1 overflow-hidden">
              {activeSession && (
                <>
                  <TerminalWindow
                    lines={activeSession.lines}
                    onCommand={handleCommand}
                    currentDirectory={activeSession.currentDirectory}
                    username="user"
                  />
                  
                  <SessionInfo
                    currentDirectory={activeSession.currentDirectory}
                    startTime={activeSession.startTime}
                    processes={[
                      { pid: 1001, name: 'bash', cpu: '0.5%' },
                      { pid: 1002, name: 'node', cpu: '2.1%' },
                    ]}
                    envVars={mockEnvVars}
                  />
                </>
              )}
            </div>
            
            <BottomPanel
              commandHistory={activeSession?.commandHistory || []}
              fileSystem={mockFileSystem}
              logs={logs}
              onCommandClick={handleCommandHistoryClick}
              onFileSelect={handleFileSelect}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}