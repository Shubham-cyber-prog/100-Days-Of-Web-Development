import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { CheckCircle, XCircle, Flag, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface BulkActionsBarProps {
  selectedCount: number;
  onApprove: () => void;
  onReject: () => void;
  onEscalate: () => void;
  onClear: () => void;
}

export function BulkActionsBar({
  selectedCount,
  onApprove,
  onReject,
  onEscalate,
  onClear,
}: BulkActionsBarProps) {
  return (
    <AnimatePresence>
      {selectedCount > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
        >
          <Card className="shadow-2xl border-2">
            <div className="flex items-center gap-6 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {selectedCount}
                  </span>
                </div>
                <span className="font-medium">
                  {selectedCount} item{selectedCount !== 1 ? "s" : ""} selected
                </span>
              </div>

              <div className="h-8 w-px bg-border" />

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
                  onClick={onApprove}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                  onClick={onReject}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 border-orange-200"
                  onClick={onEscalate}
                >
                  <Flag className="w-4 h-4 mr-2" />
                  Escalate
                </Button>
              </div>

              <div className="h-8 w-px bg-border" />

              <Button
                variant="ghost"
                size="sm"
                onClick={onClear}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
