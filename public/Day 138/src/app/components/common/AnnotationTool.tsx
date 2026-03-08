import { useState } from "react";
import {
  StickyNote,
  Plus,
  X,
  Edit2,
  Trash2,
  User,
  MessageCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

interface Annotation {
  id: string;
  content: string;
  author: string;
  createdAt: Date;
  position: { x: number; y: number };
  color: string;
  replies?: AnnotationReply[];
}

interface AnnotationReply {
  id: string;
  content: string;
  author: string;
  createdAt: Date;
}

const colors = [
  { name: "yellow", class: "bg-yellow-200 border-yellow-400 text-yellow-900" },
  { name: "blue", class: "bg-blue-200 border-blue-400 text-blue-900" },
  { name: "green", class: "bg-green-200 border-green-400 text-green-900" },
  { name: "pink", class: "bg-pink-200 border-pink-400 text-pink-900" },
  { name: "purple", class: "bg-purple-200 border-purple-400 text-purple-900" },
];

const mockAnnotations: Annotation[] = [
  {
    id: "1",
    content: "This trend shows significant growth potential. We should prioritize this segment.",
    author: "Sarah Chen",
    createdAt: new Date(Date.now() - 2 * 3600000),
    position: { x: 20, y: 15 },
    color: "yellow",
    replies: [
      {
        id: "r1",
        content: "Agreed! Let's discuss this in tomorrow's strategy meeting.",
        author: "Mike Johnson",
        createdAt: new Date(Date.now() - 1 * 3600000),
      },
    ],
  },
  {
    id: "2",
    content: "Need to verify these numbers with the data team before presenting to stakeholders.",
    author: "Alex Kim",
    createdAt: new Date(Date.now() - 5 * 3600000),
    position: { x: 60, y: 30 },
    color: "blue",
  },
  {
    id: "3",
    content: "Interesting insight! This could be a competitive advantage if we act quickly.",
    author: "Jamie Lee",
    createdAt: new Date(Date.now() - 8 * 3600000),
    position: { x: 40, y: 55 },
    color: "green",
  },
];

export function AnnotationTool() {
  const [annotations, setAnnotations] = useState<Annotation[]>(mockAnnotations);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newAnnotationPos, setNewAnnotationPos] = useState<{ x: number; y: number } | null>(null);
  const [newAnnotationContent, setNewAnnotationContent] = useState("");
  const [selectedColor, setSelectedColor] = useState("yellow");
  const [viewAllOpen, setViewAllOpen] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const handlePageClick = (e: React.MouseEvent) => {
    if (!isCreating) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setNewAnnotationPos({ x, y });
  };

  const createAnnotation = () => {
    if (!newAnnotationContent.trim() || !newAnnotationPos) return;

    const newAnnotation: Annotation = {
      id: Date.now().toString(),
      content: newAnnotationContent,
      author: "You",
      createdAt: new Date(),
      position: newAnnotationPos,
      color: selectedColor,
    };

    setAnnotations((prev) => [...prev, newAnnotation]);
    setNewAnnotationContent("");
    setNewAnnotationPos(null);
    setIsCreating(false);
    toast.success("Annotation added successfully!");
  };

  const deleteAnnotation = (id: string) => {
    setAnnotations((prev) => prev.filter((a) => a.id !== id));
    toast.success("Annotation removed");
  };

  const addReply = (annotationId: string) => {
    if (!replyContent.trim()) return;

    const newReply: AnnotationReply = {
      id: Date.now().toString(),
      content: replyContent,
      author: "You",
      createdAt: new Date(),
    };

    setAnnotations((prev) =>
      prev.map((annotation) =>
        annotation.id === annotationId
          ? {
              ...annotation,
              replies: [...(annotation.replies || []), newReply],
            }
          : annotation
      )
    );

    setReplyContent("");
    setReplyingTo(null);
    toast.success("Reply added!");
  };

  const getColorClass = (colorName: string) => {
    return colors.find((c) => c.name === colorName)?.class || colors[0].class;
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center gap-2">
        <Button
          variant={isEnabled ? "default" : "outline"}
          size="sm"
          onClick={() => {
            setIsEnabled(!isEnabled);
            setIsCreating(false);
            toast.success(isEnabled ? "Annotations hidden" : "Annotations visible");
          }}
        >
          <StickyNote className="h-4 w-4 mr-2" />
          Annotations
          {annotations.length > 0 && (
            <Badge variant="secondary" className="ml-2 h-5">
              {annotations.length}
            </Badge>
          )}
        </Button>

        {isEnabled && (
          <>
            <Button
              variant={isCreating ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setIsCreating(!isCreating);
                setNewAnnotationPos(null);
                toast.info(
                  isCreating
                    ? "Create mode disabled"
                    : "Click anywhere to add an annotation"
                );
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              {isCreating ? "Cancel" : "Add Note"}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewAllOpen(true)}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              View All ({annotations.length})
            </Button>
          </>
        )}
      </div>

      {/* Annotations on Page */}
      <AnimatePresence>
        {isEnabled && (
          <div
            className="fixed inset-0 pointer-events-none z-40"
            style={{ top: "64px" }}
            onClick={handlePageClick}
          >
            <div className="relative w-full h-full pointer-events-none">
              {annotations.map((annotation) => (
                <AnnotationMarker
                  key={annotation.id}
                  annotation={annotation}
                  onDelete={deleteAnnotation}
                  getColorClass={getColorClass}
                  formatTime={formatTime}
                  onReply={(id) => {
                    setReplyingTo(id);
                    setViewAllOpen(true);
                  }}
                />
              ))}

              {/* New Annotation Preview */}
              {isCreating && newAnnotationPos && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute pointer-events-auto"
                  style={{
                    left: `${newAnnotationPos.x}%`,
                    top: `${newAnnotationPos.y}%`,
                  }}
                >
                  <div className="bg-white rounded-lg shadow-xl border-2 border-blue-500 p-4 w-64">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium">New Annotation</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setNewAnnotationPos(null);
                          setIsCreating(false);
                        }}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>

                    <Textarea
                      value={newAnnotationContent}
                      onChange={(e) => setNewAnnotationContent(e.target.value)}
                      placeholder="Add your note..."
                      className="mb-3 min-h-[80px] text-sm"
                      autoFocus
                      onClick={(e) => e.stopPropagation()}
                    />

                    <div className="flex gap-2 mb-3">
                      {colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedColor(color.name);
                          }}
                          className={`h-6 w-6 rounded-full border-2 ${
                            selectedColor === color.name
                              ? "border-gray-900 scale-110"
                              : "border-gray-300"
                          } ${color.class} transition-all`}
                        />
                      ))}
                    </div>

                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        createAnnotation();
                      }}
                      className="w-full"
                      size="sm"
                    >
                      Add Note
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* View All Dialog */}
      <Dialog open={viewAllOpen} onOpenChange={setViewAllOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>All Annotations ({annotations.length})</DialogTitle>
          </DialogHeader>

          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {annotations.length === 0 ? (
                <div className="text-center py-12">
                  <StickyNote className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600">No annotations yet</p>
                </div>
              ) : (
                annotations.map((annotation) => (
                  <div
                    key={annotation.id}
                    className={`p-4 rounded-lg border-l-4 ${getColorClass(
                      annotation.color
                    )}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-white rounded-full">
                          <User className="h-3 w-3" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{annotation.author}</p>
                          <p className="text-xs opacity-70">
                            {formatTime(annotation.createdAt)}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteAnnotation(annotation.id)}
                        className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>

                    <p className="text-sm mb-3 leading-relaxed">
                      {annotation.content}
                    </p>

                    {/* Replies */}
                    {annotation.replies && annotation.replies.length > 0 && (
                      <div className="space-y-2 mb-3 pl-4 border-l-2 border-white/50">
                        {annotation.replies.map((reply) => (
                          <div key={reply.id} className="bg-white/50 p-2 rounded">
                            <div className="flex items-center gap-2 mb-1">
                              <User className="h-3 w-3" />
                              <span className="text-xs font-medium">{reply.author}</span>
                              <span className="text-xs opacity-70">
                                {formatTime(reply.createdAt)}
                              </span>
                            </div>
                            <p className="text-xs">{reply.content}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply Input */}
                    {replyingTo === annotation.id ? (
                      <div className="flex gap-2">
                        <Textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder="Add a reply..."
                          className="flex-1 min-h-[60px] text-sm"
                          autoFocus
                        />
                        <div className="flex flex-col gap-1">
                          <Button
                            size="sm"
                            onClick={() => addReply(annotation.id)}
                            className="h-7"
                          >
                            Send
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setReplyingTo(null);
                              setReplyContent("");
                            }}
                            className="h-7"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setReplyingTo(annotation.id)}
                        className="h-7 text-xs"
                      >
                        <MessageCircle className="h-3 w-3 mr-1" />
                        Reply
                      </Button>
                    )}
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}

interface AnnotationMarkerProps {
  annotation: Annotation;
  onDelete: (id: string) => void;
  getColorClass: (color: string) => string;
  formatTime: (date: Date) => string;
  onReply: (id: string) => void;
}

function AnnotationMarker({
  annotation,
  onDelete,
  getColorClass,
  formatTime,
  onReply,
}: AnnotationMarkerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`absolute pointer-events-auto h-8 w-8 rounded-full border-2 shadow-lg flex items-center justify-center hover:scale-110 transition-transform ${getColorClass(
            annotation.color
          )}`}
          style={{
            left: `${annotation.position.x}%`,
            top: `${annotation.position.y}%`,
          }}
        >
          <StickyNote className="h-4 w-4" />
          {annotation.replies && annotation.replies.length > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-600 text-white text-[10px] rounded-full flex items-center justify-center">
              {annotation.replies.length}
            </span>
          )}
        </motion.button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0" side="right">
        <div className={`p-3 rounded-t-lg ${getColorClass(annotation.color)}`}>
          <div className="flex items-center gap-2 mb-2">
            <User className="h-3 w-3" />
            <span className="text-xs font-medium">{annotation.author}</span>
            <span className="text-xs opacity-70 ml-auto">
              {formatTime(annotation.createdAt)}
            </span>
          </div>
          <p className="text-sm leading-relaxed">{annotation.content}</p>
        </div>

        <div className="p-2 bg-white border-t flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onReply(annotation.id)}
            className="flex-1 h-7 text-xs"
          >
            <MessageCircle className="h-3 w-3 mr-1" />
            Reply
            {annotation.replies && annotation.replies.length > 0 && (
              <Badge variant="secondary" className="ml-1 h-4 text-[10px] px-1">
                {annotation.replies.length}
              </Badge>
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(annotation.id)}
            className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
