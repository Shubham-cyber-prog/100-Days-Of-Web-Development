import { useState } from "react";
import { Download, FileText, FileSpreadsheet, Image, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface ExportButtonProps {
  targetId?: string;
  fileName?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

export function ExportButton({
  targetId = "export-content",
  fileName = "market-research-report",
  variant = "outline",
  size = "sm",
}: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const exportAsPDF = async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById(targetId) || document.body;

      // Create canvas from the element
      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? "landscape" : "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`${fileName}.pdf`);

      toast.success("PDF exported successfully!", {
        description: `${fileName}.pdf has been downloaded`,
      });
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Export failed", {
        description: "Please try again or contact support",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const exportAsCSV = () => {
    setIsExporting(true);
    try {
      // Mock CSV data - in production, this would extract actual table data
      const csvData = [
        ["Metric", "Value", "Change", "Confidence"],
        ["Market Growth", "23.4%", "+5.2%", "92%"],
        ["Customer Satisfaction", "78%", "+3.1%", "88%"],
        ["Competitor Activity", "High", "Stable", "85%"],
        ["Revenue Impact", "$2.4M", "+12.5%", "95%"],
        ["Brand Sentiment", "Positive", "+8.3%", "90%"],
      ];

      const csv = csvData.map((row) => row.join(",")).join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);

      toast.success("CSV exported successfully!", {
        description: `${fileName}.csv has been downloaded`,
      });
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Export failed", {
        description: "Please try again or contact support",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const exportAsPNG = async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById(targetId) || document.body;

      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      canvas.toBlob((blob) => {
        if (blob) {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${fileName}.png`;
          a.click();
          window.URL.revokeObjectURL(url);

          toast.success("PNG exported successfully!", {
            description: `${fileName}.png has been downloaded`,
          });
        }
      });
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Export failed", {
        description: "Please try again or contact support",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} disabled={isExporting}>
          {isExporting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Export
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5">
          <p className="text-xs font-medium text-gray-500">Export as</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={exportAsPDF} disabled={isExporting}>
          <FileText className="h-4 w-4 mr-2 text-red-600" />
          <div>
            <p className="font-medium">PDF Document</p>
            <p className="text-xs text-gray-500">Full report with charts</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportAsCSV} disabled={isExporting}>
          <FileSpreadsheet className="h-4 w-4 mr-2 text-green-600" />
          <div>
            <p className="font-medium">CSV Spreadsheet</p>
            <p className="text-xs text-gray-500">Raw data for analysis</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportAsPNG} disabled={isExporting}>
          <Image className="h-4 w-4 mr-2 text-blue-600" />
          <div>
            <p className="font-medium">PNG Image</p>
            <p className="text-xs text-gray-500">High-quality screenshot</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
