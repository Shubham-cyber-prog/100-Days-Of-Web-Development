import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Download, FileText, FileSpreadsheet, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { motion } from "motion/react";

interface ExportDialogProps {
  totalItems: number;
}

export function ExportDialog({ totalItems }: ExportDialogProps) {
  const [open, setOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<"csv" | "pdf">("csv");
  const [dateRange, setDateRange] = useState("all");
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);
  const [includeFields, setIncludeFields] = useState({
    user: true,
    content: true,
    flagType: true,
    confidence: true,
    severity: true,
    status: true,
    timestamp: true,
    aiAnalysis: false,
  });

  const handleExport = () => {
    setIsExporting(true);

    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);

      // Simulate file download
      const filename = `moderation-queue-${Date.now()}.${exportFormat}`;
      toast.success("Export completed", {
        description: `${filename} has been downloaded.`,
      });

      setTimeout(() => {
        setExportComplete(false);
        setOpen(false);
      }, 2000);
    }, 2000);
  };

  const toggleField = (field: keyof typeof includeFields) => {
    setIncludeFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Export Moderation Data</DialogTitle>
          <DialogDescription>
            Download your moderation queue data for reporting and analysis
          </DialogDescription>
        </DialogHeader>

        {exportComplete ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Export Complete!</h3>
            <p className="text-sm text-muted-foreground text-center">
              Your file has been downloaded successfully.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6 py-4">
            {/* Format Selection */}
            <div className="space-y-3">
              <Label>Export Format</Label>
              <RadioGroup
                value={exportFormat}
                onValueChange={(value) =>
                  setExportFormat(value as "csv" | "pdf")
                }
              >
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="csv" id="csv" />
                  <Label htmlFor="csv" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4" />
                      <div>
                        <div className="font-medium">CSV</div>
                        <div className="text-xs text-muted-foreground">
                          Best for Excel and data analysis
                        </div>
                      </div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="pdf" id="pdf" />
                  <Label htmlFor="pdf" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <div>
                        <div className="font-medium">PDF</div>
                        <div className="text-xs text-muted-foreground">
                          Formatted report for sharing
                        </div>
                      </div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <Label htmlFor="date-range">Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger id="date-range">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                  <SelectItem value="quarter">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Fields to Include */}
            <div className="space-y-3">
              <Label>Include Fields</Label>
              <div className="space-y-2 max-h-48 overflow-auto">
                {Object.entries(includeFields).map(([field, checked]) => (
                  <div
                    key={field}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent/50"
                  >
                    <Checkbox
                      id={field}
                      checked={checked}
                      onCheckedChange={() =>
                        toggleField(field as keyof typeof includeFields)
                      }
                    />
                    <Label
                      htmlFor={field}
                      className="flex-1 cursor-pointer capitalize text-sm"
                    >
                      {field.replace(/([A-Z])/g, " $1").trim()}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="p-3 bg-accent/50 rounded-lg space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Items</span>
                <span className="font-semibold">{totalItems}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Format</span>
                <span className="font-semibold uppercase">{exportFormat}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Fields</span>
                <span className="font-semibold">
                  {Object.values(includeFields).filter(Boolean).length} of{" "}
                  {Object.keys(includeFields).length}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isExporting}
              >
                Cancel
              </Button>
              <Button onClick={handleExport} disabled={isExporting}>
                {isExporting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
                    />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}