import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  ArrowLeft,
  Share2,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  MessageSquare,
  ChevronDown,
  FileText,
  Undo,
  Redo,
  Link2,
  Image as ImageIcon,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ShareModal } from './ShareModal';
import { CommentsPanel } from './CommentsPanel';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Separator } from './ui/separator';
import { toast } from 'sonner';

const collaborators = [
  { name: 'Jane Smith', initials: 'JS', avatar: '' },
  { name: 'Mike Johnson', initials: 'MJ', avatar: '' },
  { name: 'Sarah Williams', initials: 'SW', avatar: '' },
];

const menuItems = ['File', 'Edit', 'View', 'Insert', 'Format', 'Tools', 'Help'];

export function DocumentEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [documentTitle, setDocumentTitle] = useState('Untitled Document');
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [commentsPanelOpen, setCommentsPanelOpen] = useState(false);
  const [fontSize, setFontSize] = useState('12');
  const [fontFamily, setFontFamily] = useState('Arial');
  const editorRef = useRef<HTMLDivElement>(null);

  // Load document data
  useEffect(() => {
    if (id && id !== 'new') {
      // Mock loading document
      setDocumentTitle('Project Proposal 2024');
    }
  }, [id]);

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleMenuAction = (menu: string, action: string) => {
    toast.success(`${menu} > ${action} clicked`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200">
        {/* Title Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
          <Button variant="ghost" size="sm" onClick={handleBack} className="h-9">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            <Input
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              className="border-0 font-medium text-lg h-auto py-0 px-2 hover:bg-gray-50 focus-visible:ring-0 focus-visible:bg-gray-50"
            />
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <div className="flex items-center -space-x-2">
              {collaborators.map((collab, idx) => (
                <Avatar key={idx} className="w-8 h-8 border-2 border-white">
                  <AvatarImage src={collab.avatar} />
                  <AvatarFallback className="text-xs">{collab.initials}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <Button
              onClick={() => setShareModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>
        </div>

        {/* Menu Bar */}
        <div className="flex items-center gap-1 px-4 py-2 text-sm">
          {menuItems.map((menu) => (
            <DropdownMenu key={menu}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 px-3">
                  {menu}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {menu === 'File' && (
                  <>
                    <DropdownMenuItem onClick={() => handleMenuAction(menu, 'New')}>
                      New
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleMenuAction(menu, 'Open')}>
                      Open
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleMenuAction(menu, 'Make a copy')}>
                      Make a copy
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleMenuAction(menu, 'Download')}>
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleMenuAction(menu, 'Print')}>
                      Print
                    </DropdownMenuItem>
                  </>
                )}
                {menu === 'Edit' && (
                  <>
                    <DropdownMenuItem onClick={() => handleFormat('undo')}>
                      Undo
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFormat('redo')}>
                      Redo
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleFormat('cut')}>
                      Cut
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFormat('copy')}>
                      Copy
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFormat('paste')}>
                      Paste
                    </DropdownMenuItem>
                  </>
                )}
                {menu === 'Insert' && (
                  <>
                    <DropdownMenuItem onClick={() => handleMenuAction(menu, 'Image')}>
                      Image
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleMenuAction(menu, 'Table')}>
                      Table
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleMenuAction(menu, 'Link')}>
                      Link
                    </DropdownMenuItem>
                  </>
                )}
                {['View', 'Format', 'Tools', 'Help'].includes(menu) && (
                  <>
                    <DropdownMenuItem onClick={() => handleMenuAction(menu, 'Option 1')}>
                      Option 1
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleMenuAction(menu, 'Option 2')}>
                      Option 2
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </div>

        {/* Formatting Toolbar */}
        <div className="flex items-center gap-1 px-4 py-2 bg-gray-50 border-t border-gray-200 overflow-x-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleFormat('undo')}
            className="h-8 w-8 p-0"
          >
            <Undo className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleFormat('redo')}
            className="h-8 w-8 p-0"
          >
            <Redo className="w-4 h-4" />
          </Button>
          
          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Font Family */}
          <Select value={fontFamily} onValueChange={setFontFamily}>
            <SelectTrigger className="w-[140px] h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Arial">Arial</SelectItem>
              <SelectItem value="Times New Roman">Times New Roman</SelectItem>
              <SelectItem value="Courier New">Courier New</SelectItem>
              <SelectItem value="Georgia">Georgia</SelectItem>
              <SelectItem value="Verdana">Verdana</SelectItem>
            </SelectContent>
          </Select>

          {/* Font Size */}
          <Select value={fontSize} onValueChange={setFontSize}>
            <SelectTrigger className="w-[80px] h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {['8', '10', '12', '14', '16', '18', '24', '32'].map(size => (
                <SelectItem key={size} value={size}>{size}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Text Formatting */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleFormat('bold')}
            className="h-8 w-8 p-0"
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleFormat('italic')}
            className="h-8 w-8 p-0"
          >
            <Italic className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleFormat('underline')}
            className="h-8 w-8 p-0"
          >
            <Underline className="w-4 h-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Alignment */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleFormat('justifyLeft')}
            className="h-8 w-8 p-0"
          >
            <AlignLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleFormat('justifyCenter')}
            className="h-8 w-8 p-0"
          >
            <AlignCenter className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleFormat('justifyRight')}
            className="h-8 w-8 p-0"
          >
            <AlignRight className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleFormat('justifyFull')}
            className="h-8 w-8 p-0"
          >
            <AlignJustify className="w-4 h-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Lists */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleFormat('insertUnorderedList')}
            className="h-8 w-8 p-0"
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleFormat('insertOrderedList')}
            className="h-8 w-8 p-0"
          >
            <ListOrdered className="w-4 h-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Insert */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toast.success('Insert link clicked')}
            className="h-8 w-8 p-0"
          >
            <Link2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toast.success('Insert image clicked')}
            className="h-8 w-8 p-0"
          >
            <ImageIcon className="w-4 h-4" />
          </Button>

          <div className="flex-1" />

          {/* Comments Toggle */}
          <Button
            variant={commentsPanelOpen ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setCommentsPanelOpen(!commentsPanelOpen)}
            className="h-8 gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Comments
          </Button>
        </div>
      </header>

      {/* Editor Content */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-auto">
          <div className="max-w-[850px] mx-auto py-12 px-4">
            {/* Document Page */}
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              className="bg-white shadow-lg min-h-[1100px] p-24 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-8"
              style={{
                fontFamily: fontFamily,
                fontSize: `${fontSize}pt`,
                lineHeight: '1.6',
              }}
            >
              <h1 className="mb-4">Project Proposal 2024</h1>
              <p className="mb-4">
                This document outlines our strategic initiatives for the upcoming year. Our primary focus
                will be on expanding market reach, improving product quality, and enhancing customer
                satisfaction.
              </p>
              <h2 className="mb-3 mt-6">Executive Summary</h2>
              <p className="mb-4">
                In the rapidly evolving landscape of modern business, we recognize the need to adapt and
                innovate. This proposal presents a comprehensive strategy that addresses current market
                challenges while positioning our organization for sustainable growth.
              </p>
              <h2 className="mb-3 mt-6">Key Objectives</h2>
              <ul className="mb-4 ml-6">
                <li>Increase market share by 25% in target demographics</li>
                <li>Launch three new product lines by Q3</li>
                <li>Improve customer retention rates to 90%</li>
                <li>Establish partnerships with five strategic vendors</li>
              </ul>
              <p className="mb-4">
                Each objective has been carefully selected to align with our broader vision and mission.
                The implementation timeline and resource allocation have been designed to maximize
                efficiency while minimizing risk.
              </p>
            </div>
          </div>
        </div>

        {/* Comments Panel */}
        <CommentsPanel
          isOpen={commentsPanelOpen}
          onClose={() => setCommentsPanelOpen(false)}
        />
      </div>

      {/* Share Modal */}
      <ShareModal
        open={shareModalOpen}
        onOpenChange={setShareModalOpen}
        documentTitle={documentTitle}
      />
    </div>
  );
}
