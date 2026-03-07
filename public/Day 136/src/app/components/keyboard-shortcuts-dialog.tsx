import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Keyboard } from "lucide-react";

interface ShortcutItem {
  keys: string[];
  description: string;
  category: string;
}

const shortcuts: ShortcutItem[] = [
  {
    keys: ["?"],
    description: "Show keyboard shortcuts",
    category: "General",
  },
  {
    keys: ["Ctrl", "K"],
    description: "Focus search",
    category: "General",
  },
  {
    keys: ["↑", "↓"],
    description: "Navigate items",
    category: "Navigation",
  },
  {
    keys: ["Enter"],
    description: "Open selected item",
    category: "Navigation",
  },
  {
    keys: ["A"],
    description: "Approve selected item",
    category: "Actions",
  },
  {
    keys: ["R"],
    description: "Reject selected item",
    category: "Actions",
  },
  {
    keys: ["E"],
    description: "Escalate selected item",
    category: "Actions",
  },
  {
    keys: ["Ctrl", "A"],
    description: "Select all visible items",
    category: "Bulk Actions",
  },
  {
    keys: ["Esc"],
    description: "Clear selection / Close dialog",
    category: "General",
  },
  {
    keys: ["1"],
    description: "Filter by Critical severity",
    category: "Filters",
  },
  {
    keys: ["2"],
    description: "Filter by High severity",
    category: "Filters",
  },
  {
    keys: ["3"],
    description: "Filter by Medium severity",
    category: "Filters",
  },
  {
    keys: ["P"],
    description: "Filter by Pending status",
    category: "Filters",
  },
];

interface KeyboardShortcutsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function KeyboardShortcutsDialog({
  open,
  onOpenChange,
}: KeyboardShortcutsDialogProps) {
  const categories = Array.from(new Set(shortcuts.map((s) => s.category)));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="w-5 h-5" />
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription>
            Use these shortcuts to navigate and take actions quickly
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {categories.map((category) => (
            <div key={category} className="space-y-3">
              <h4 className="text-sm font-semibold text-muted-foreground">
                {category}
              </h4>
              <div className="space-y-2">
                {shortcuts
                  .filter((s) => s.category === category)
                  .map((shortcut, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <span className="text-sm">{shortcut.description}</span>
                      <div className="flex items-center gap-1">
                        {shortcut.keys.map((key, keyIndex) => (
                          <span key={keyIndex} className="flex items-center">
                            <Badge
                              variant="secondary"
                              className="font-mono text-xs px-2 py-1"
                            >
                              {key}
                            </Badge>
                            {keyIndex < shortcut.keys.length - 1 && (
                              <span className="text-muted-foreground mx-1">
                                +
                              </span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
