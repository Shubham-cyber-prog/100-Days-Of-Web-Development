import { useState, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TopNav } from './components/top-nav';
import { LeftSidebar } from './components/left-sidebar';
import { RightSidebar } from './components/right-sidebar';
import { Canvas } from './components/canvas';
import { ShareModal } from './components/share-modal';
import { EmptyState } from './components/empty-state';
import { Minimap } from './components/minimap';
import { TemplatesModal } from './components/templates-modal';
import { KeyboardShortcuts } from './components/keyboard-shortcuts';
import { ZoomIn, ZoomOut, Maximize2, Sparkles } from 'lucide-react';
import { StickyNoteData } from './components/sticky-note';
import { MindMapNodeData } from './components/mind-map-node';
import { TextBoxData } from './components/text-box';
import { Comment } from './components/comment-bubble';
import { motion, AnimatePresence } from 'motion/react';

interface Board {
  id: string;
  name: string;
  lastModified: string;
  elements: {
    stickyNotes: StickyNoteData[];
    mindMapNodes: MindMapNodeData[];
    textBoxes: TextBoxData[];
  };
}

function App() {
  const [boards, setBoards] = useState<Board[]>([
    {
      id: '1',
      name: 'Marketing Campaign Ideas',
      lastModified: '2 hours ago',
      elements: {
        stickyNotes: [
          {
            id: 'note-1',
            text: 'Social media strategy for Q2',
            color: 'yellow',
            position: { x: 100, y: 100 },
          },
          {
            id: 'note-2',
            text: 'Influencer partnerships',
            color: 'blue',
            position: { x: 300, y: 100 },
          },
          {
            id: 'note-3',
            text: 'Email campaign automation',
            color: 'pink',
            position: { x: 500, y: 100 },
          },
          {
            id: 'note-4',
            text: 'Content calendar planning',
            color: 'green',
            position: { x: 100, y: 300 },
          },
        ],
        mindMapNodes: [
          {
            id: 'node-1',
            text: 'Brand Awareness',
            color: '#A78BFA',
            position: { x: 700, y: 150 },
            connections: ['node-2'],
          },
          {
            id: 'node-2',
            text: 'Lead Generation',
            color: '#60A5FA',
            position: { x: 900, y: 150 },
            connections: ['node-3'],
          },
          {
            id: 'node-3',
            text: 'Customer Retention',
            color: '#34D399',
            position: { x: 800, y: 280 },
          },
        ],
        textBoxes: [
          {
            id: 'text-1',
            text: 'Q2 2026 Goals',
            fontSize: 24,
            position: { x: 300, y: 300 },
            width: 250,
          },
        ],
      },
    },
  ]);

  const [currentBoardId, setCurrentBoardId] = useState<string | null>('1');
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showWelcomeToast, setShowWelcomeToast] = useState(true);

  const [comments] = useState<Comment[]>([
    {
      id: '1',
      user: { name: 'Sarah Johnson', color: '#3B82F6' },
      text: 'Great ideas! I think we should prioritize the social media strategy first.',
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: '2',
      user: { name: 'Mike Chen', color: '#10B981' },
      text: 'Agreed! Should we schedule a meeting to discuss the timeline?',
      timestamp: new Date(Date.now() - 1800000),
    },
  ]);

  const [activities] = useState([
    { id: '1', text: 'Sarah Johnson added a sticky note', timestamp: new Date(Date.now() - 900000) },
    { id: '2', text: 'Mike Chen updated the board title', timestamp: new Date(Date.now() - 600000) },
    { id: '3', text: 'Alex Kim joined the board', timestamp: new Date(Date.now() - 300000) },
  ]);

  const users = [
    { name: 'Sarah Johnson', color: '#3B82F6', isOnline: true },
    { name: 'Mike Chen', color: '#10B981', isOnline: true },
    { name: 'Alex Kim', color: '#F59E0B', isOnline: true },
    { name: 'Emma Davis', color: '#8B5CF6', isOnline: false },
  ];

  const currentBoard = boards.find((b) => b.id === currentBoardId);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Show shortcuts modal with '?'
      if (e.key === '?' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setIsShortcutsModalOpen(true);
      }
      
      // Delete selected element
      if (e.key === 'Delete' && selectedElementId) {
        e.preventDefault();
        handleDeleteElement();
      }
      
      // Deselect with Escape
      if (e.key === 'Escape') {
        setSelectedElementId(null);
      }
      
      // Zoom controls
      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        handleZoomIn();
      }
      if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        handleZoomOut();
      }
      if (e.key === '0') {
        e.preventDefault();
        handleResetZoom();
      }
      
      // Add elements with shortcuts (only if not typing)
      if (!['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        if (e.key === 'n' || e.key === 'N') {
          e.preventDefault();
          handleAddElement('sticky');
        }
        if (e.key === 't' || e.key === 'T') {
          e.preventDefault();
          handleAddElement('text');
        }
        if (e.key === 'm' || e.key === 'M') {
          e.preventDefault();
          handleAddElement('circle');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElementId, currentBoardId]);

  // Hide welcome toast after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowWelcomeToast(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleCreateBoard = useCallback(() => {
    const newBoard: Board = {
      id: `board-${Date.now()}`,
      name: 'Untitled Board',
      lastModified: 'Just now',
      elements: {
        stickyNotes: [],
        mindMapNodes: [],
        textBoxes: [],
      },
    };
    setBoards((prev) => [...prev, newBoard]);
    setCurrentBoardId(newBoard.id);
  }, []);

  const handleSelectTemplate = useCallback((templateId: string) => {
    if (templateId === 'blank') {
      handleCreateBoard();
      return;
    }

    // Create board with template content
    const templateBoards: Record<string, Partial<Board['elements']>> = {
      brainstorm: {
        stickyNotes: [
          { id: `n-${Date.now()}-1`, text: 'Idea 1', color: 'yellow', position: { x: 100, y: 100 } },
          { id: `n-${Date.now()}-2`, text: 'Idea 2', color: 'blue', position: { x: 300, y: 100 } },
          { id: `n-${Date.now()}-3`, text: 'Idea 3', color: 'pink', position: { x: 500, y: 100 } },
          { id: `n-${Date.now()}-4`, text: 'Idea 4', color: 'green', position: { x: 700, y: 100 } },
        ],
      },
      mindmap: {
        mindMapNodes: [
          { id: `m-${Date.now()}-1`, text: 'Central Idea', color: '#A78BFA', position: { x: 400, y: 200 }, connections: [`m-${Date.now()}-2`, `m-${Date.now()}-3`] },
          { id: `m-${Date.now()}-2`, text: 'Branch 1', color: '#60A5FA', position: { x: 200, y: 100 } },
          { id: `m-${Date.now()}-3`, text: 'Branch 2', color: '#34D399', position: { x: 600, y: 100 } },
        ],
      },
    };

    const newBoard: Board = {
      id: `board-${Date.now()}`,
      name: `New ${templateId} Board`,
      lastModified: 'Just now',
      elements: {
        stickyNotes: templateBoards[templateId]?.stickyNotes || [],
        mindMapNodes: templateBoards[templateId]?.mindMapNodes || [],
        textBoxes: templateBoards[templateId]?.textBoxes || [],
      },
    };
    setBoards((prev) => [...prev, newBoard]);
    setCurrentBoardId(newBoard.id);
  }, [handleCreateBoard]);

  const handleUpdateBoardName = useCallback(
    (name: string) => {
      if (!currentBoardId) return;
      setBoards((prev) =>
        prev.map((board) => (board.id === currentBoardId ? { ...board, name } : board))
      );
    },
    [currentBoardId]
  );

  const handleAddElement = useCallback(
    (type: string) => {
      if (!currentBoardId) return;

      setBoards((prev) =>
        prev.map((board) => {
          if (board.id !== currentBoardId) return board;

          if (type === 'sticky') {
            const colors: Array<'yellow' | 'blue' | 'pink' | 'green'> = ['yellow', 'blue', 'pink', 'green'];
            const newNote: StickyNoteData = {
              id: `note-${Date.now()}`,
              text: '',
              color: colors[Math.floor(Math.random() * colors.length)],
              position: { x: 200 + Math.random() * 200, y: 200 + Math.random() * 200 },
            };
            return {
              ...board,
              elements: {
                ...board.elements,
                stickyNotes: [...board.elements.stickyNotes, newNote],
              },
            };
          } else if (type === 'text') {
            const newTextBox: TextBoxData = {
              id: `text-${Date.now()}`,
              text: '',
              fontSize: 16,
              position: { x: 200 + Math.random() * 200, y: 200 + Math.random() * 200 },
              width: 250,
            };
            return {
              ...board,
              elements: {
                ...board.elements,
                textBoxes: [...(board.elements.textBoxes || []), newTextBox],
              },
            };
          } else if (type === 'circle') {
            const colors = ['#A78BFA', '#60A5FA', '#34D399', '#F59E0B', '#EC4899'];
            const newNode: MindMapNodeData = {
              id: `node-${Date.now()}`,
              text: '',
              color: colors[Math.floor(Math.random() * colors.length)],
              position: { x: 300 + Math.random() * 200, y: 300 + Math.random() * 200 },
            };
            return {
              ...board,
              elements: {
                ...board.elements,
                mindMapNodes: [...board.elements.mindMapNodes, newNode],
              },
            };
          }

          return board;
        })
      );
    },
    [currentBoardId]
  );

  const handleDeleteElement = useCallback(() => {
    if (!currentBoardId || !selectedElementId) return;

    setBoards((prev) =>
      prev.map((board) => {
        if (board.id !== currentBoardId) return board;

        return {
          ...board,
          elements: {
            stickyNotes: board.elements.stickyNotes.filter((note) => note.id !== selectedElementId),
            mindMapNodes: board.elements.mindMapNodes.filter((node) => node.id !== selectedElementId),
            textBoxes: (board.elements.textBoxes || []).filter((tb) => tb.id !== selectedElementId),
          },
        };
      })
    );
    setSelectedElementId(null);
  }, [currentBoardId, selectedElementId]);

  const handleUpdateElement = useCallback(
    (type: 'sticky-note' | 'mind-map-node' | 'text-box', id: string, updates: any) => {
      if (!currentBoardId) return;

      setBoards((prev) =>
        prev.map((board) => {
          if (board.id !== currentBoardId) return board;

          if (type === 'sticky-note') {
            return {
              ...board,
              elements: {
                ...board.elements,
                stickyNotes: board.elements.stickyNotes.map((note) =>
                  note.id === id ? { ...note, ...updates } : note
                ),
              },
            };
          } else if (type === 'text-box') {
            return {
              ...board,
              elements: {
                ...board.elements,
                textBoxes: (board.elements.textBoxes || []).map((tb) =>
                  tb.id === id ? { ...tb, ...updates } : tb
                ),
              },
            };
          } else {
            return {
              ...board,
              elements: {
                ...board.elements,
                mindMapNodes: board.elements.mindMapNodes.map((node) =>
                  node.id === id ? { ...node, ...updates } : node
                ),
              },
            };
          }
        })
      );
    },
    [currentBoardId]
  );

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5));
  const handleResetZoom = () => setZoom(1);

  const handleExport = () => {
    alert('Export functionality would generate a PNG/PDF of the current board');
  };

  // Empty state when no boards exist
  if (boards.length === 0) {
    return <EmptyState onCreateBoard={handleCreateBoard} />;
  }

  // Mobile view
  if (isMobile) {
    return (
      <DndProvider backend={HTML5Backend}>
        <div className="h-screen flex flex-col bg-white">
          <TopNav
            boardName={currentBoard?.name || 'Untitled'}
            onBoardNameChange={handleUpdateBoardName}
            users={users}
            onShare={() => setIsShareModalOpen(true)}
            onExport={handleExport}
            onShowShortcuts={() => setIsShortcutsModalOpen(true)}
          />
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-200">
              <p className="text-sm text-blue-800 text-center font-medium">
                💡 For the best experience, use Brainstorm on desktop
              </p>
            </div>
            <Canvas
              elements={currentBoard?.elements || { stickyNotes: [], mindMapNodes: [], textBoxes: [] }}
              onUpdateElement={handleUpdateElement}
              selectedElementId={selectedElementId}
              onSelectElement={setSelectedElementId}
              zoom={zoom}
            />
            <div className="p-4 bg-white border-t border-gray-200 flex items-center justify-center gap-4">
              <button onClick={handleZoomOut} className="p-2 hover:bg-gray-100 rounded">
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className="text-sm font-medium">{Math.round(zoom * 100)}%</span>
              <button onClick={handleZoomIn} className="p-2 hover:bg-gray-100 rounded">
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>
          </div>
          <ShareModal
            isOpen={isShareModalOpen}
            onClose={() => setIsShareModalOpen(false)}
            boardName={currentBoard?.name || 'Untitled'}
          />
        </div>
      </DndProvider>
    );
  }

  // Desktop view
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-white">
        <TopNav
          boardName={currentBoard?.name || 'Untitled'}
          onBoardNameChange={handleUpdateBoardName}
          users={users}
          onShare={() => setIsShareModalOpen(true)}
          onExport={handleExport}
          onShowShortcuts={() => setIsShortcutsModalOpen(true)}
        />

        <div className="flex-1 flex overflow-hidden">
          <LeftSidebar
            boards={boards}
            currentBoardId={currentBoardId}
            onSelectBoard={setCurrentBoardId}
            onCreateBoard={handleCreateBoard}
            onAddElement={handleAddElement}
            onDelete={handleDeleteElement}
            selectedElementId={selectedElementId}
          />

          <Canvas
            elements={currentBoard?.elements || { stickyNotes: [], mindMapNodes: [], textBoxes: [] }}
            onUpdateElement={handleUpdateElement}
            selectedElementId={selectedElementId}
            onSelectElement={setSelectedElementId}
            zoom={zoom}
          />

          <RightSidebar
            selectedElement={
              currentBoard?.elements.stickyNotes.find((n) => n.id === selectedElementId) ||
              currentBoard?.elements.mindMapNodes.find((n) => n.id === selectedElementId) ||
              (currentBoard?.elements.textBoxes || []).find((n) => n.id === selectedElementId) ||
              null
            }
            onUpdateElement={(updates) => {
              if (!selectedElementId) return;
              const isSticky = currentBoard?.elements.stickyNotes.some((n) => n.id === selectedElementId);
              const isTextBox = (currentBoard?.elements.textBoxes || []).some((n) => n.id === selectedElementId);
              handleUpdateElement(
                isSticky ? 'sticky-note' : isTextBox ? 'text-box' : 'mind-map-node',
                selectedElementId,
                updates
              );
            }}
            comments={comments}
            activities={activities}
          />
        </div>

        {/* Bottom bar */}
        <div className="h-16 bg-white border-t border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
              <button
                onClick={handleZoomOut}
                className="p-2 text-gray-600 hover:bg-white hover:shadow-sm rounded transition-all"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-sm font-medium text-gray-700 min-w-[4rem] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-2 text-gray-600 hover:bg-white hover:shadow-sm rounded transition-all"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-2 text-gray-600 hover:bg-white hover:shadow-sm rounded transition-all"
                title="Reset zoom"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => setIsTemplatesModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-all border border-purple-200"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Templates</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-xs text-gray-500 font-mono bg-gray-50 px-3 py-1 rounded">
              Press <kbd className="font-bold">?</kbd> for shortcuts
            </div>
            <Minimap
              canvasSize={{ width: 2000, height: 2000 }}
              viewportPosition={{ x: 0, y: 0 }}
              viewportSize={{ width: 800, height: 600 }}
              onNavigate={(pos) => console.log('Navigate to:', pos)}
            />
          </div>
        </div>

        {/* Welcome Toast */}
        <AnimatePresence>
          {showWelcomeToast && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-24 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl shadow-2xl max-w-sm"
            >
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">Welcome to Brainstorm! 🎉</h3>
                  <p className="text-sm text-blue-100">
                    Try dragging elements, press <kbd className="bg-white/20 px-1 rounded">?</kbd> for shortcuts, or explore templates!
                  </p>
                </div>
                <button
                  onClick={() => setShowWelcomeToast(false)}
                  className="text-white/80 hover:text-white"
                >
                  ×
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modals */}
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          boardName={currentBoard?.name || 'Untitled'}
        />
        <TemplatesModal
          isOpen={isTemplatesModalOpen}
          onClose={() => setIsTemplatesModalOpen(false)}
          onSelectTemplate={handleSelectTemplate}
        />
        <KeyboardShortcuts
          isOpen={isShortcutsModalOpen}
          onClose={() => setIsShortcutsModalOpen(false)}
        />
      </div>
    </DndProvider>
  );
}

export default App;
