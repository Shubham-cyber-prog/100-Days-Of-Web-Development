import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Keyboard } from "lucide-react";
import { Badge } from "./ui/badge";

export function KeyboardShortcuts() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "?" && e.shiftKey) {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const shortcuts = [
    {
      category: "Navigation",
      items: [
        { keys: ["⌘", "K"], description: "Open command palette" },
        { keys: ["G", "D"], description: "Go to Dashboard" },
        { keys: ["G", "C"], description: "Go to Chat" },
        { keys: ["G", "T"], description: "Go to Tasks" },
        { keys: ["G", "I"], description: "Go to Integrations" },
        { keys: ["G", "A"], description: "Go to Analytics" },
      ],
    },
    {
      category: "Actions",
      items: [
        { keys: ["N"], description: "New task" },
        { keys: ["C"], description: "Start new chat" },
        { keys: ["/"], description: "Focus search" },
        { keys: ["⌘", "T"], description: "Toggle theme" },
      ],
    },
    {
      category: "General",
      items: [
        { keys: ["?"], description: "Show keyboard shortcuts" },
        { keys: ["Esc"], description: "Close dialog/modal" },
      ],
    },
  ];

  return (
    <>
      {/* Floating Help Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] text-white shadow-2xl shadow-indigo-500/40 hover:shadow-indigo-500/60 transition-all hover:scale-110 flex items-center justify-center z-50"
        title="Keyboard shortcuts (?)"
      >
        <Keyboard className="w-5 h-5" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-3xl max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Keyboard className="w-6 h-6" />
              Keyboard Shortcuts
            </DialogTitle>
            <DialogDescription>
              Boost your productivity with these keyboard shortcuts
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {shortcuts.map((section) => (
              <div key={section.category}>
                <h3 className="font-semibold mb-3 text-lg">{section.category}</h3>
                <div className="space-y-2">
                  {section.items.map((shortcut, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950 dark:hover:to-purple-950 transition-all"
                    >
                      <span className="text-sm">{shortcut.description}</span>
                      <div className="flex gap-1">
                        {shortcut.keys.map((key, keyIndex) => (
                          <Badge
                            key={keyIndex}
                            variant="secondary"
                            className="px-2 py-1 font-mono text-xs rounded-lg"
                          >
                            {key}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center text-sm text-gray-500 pt-4 border-t">
            Press <Badge variant="secondary" className="mx-1">?</Badge> anytime to view shortcuts
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
