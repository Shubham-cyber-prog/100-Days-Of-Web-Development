import { Download, FileJson, FileText, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface Detection {
  label: string;
  confidence: number;
  color: string;
}

interface ExportData {
  timestamp: string;
  imageUrl: string | null;
  detections: Detection[];
  modelUsed: string;
  processingTime: number;
}

interface ExportButtonProps {
  data: ExportData;
}

export function ExportButton({ data }: ExportButtonProps) {
  const exportAsJSON = () => {
    const jsonData = {
      analysis: {
        timestamp: data.timestamp,
        model: data.modelUsed,
        processingTime: `${data.processingTime}ms`,
        totalDetections: data.detections.length,
        detections: data.detections.map(d => ({
          label: d.label,
          confidence: `${(d.confidence * 100).toFixed(2)}%`,
        })),
      },
    };

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `detection-results-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success('Exported as JSON', {
      description: 'Detection results downloaded successfully',
    });
  };

  const exportAsCSV = () => {
    const csvHeader = 'Label,Confidence,Color\n';
    const csvRows = data.detections
      .map(d => `${d.label},${(d.confidence * 100).toFixed(2)}%,${d.color}`)
      .join('\n');
    const csvContent = csvHeader + csvRows;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `detection-results-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success('Exported as CSV', {
      description: 'Detection results downloaded successfully',
    });
  };

  const exportAsReport = () => {
    const reportContent = `
<!DOCTYPE html>
<html>
<head>
  <title>AI Detection Report</title>
  <style>
    body { font-family: system-ui; max-width: 800px; margin: 40px auto; padding: 20px; }
    h1 { color: #06b6d4; }
    .meta { color: #6b7280; margin: 20px 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
    th { background: #f3f4f6; font-weight: 600; }
    .confidence { font-weight: bold; color: #10b981; }
  </style>
</head>
<body>
  <h1>AI Image Recognition Report</h1>
  <div class="meta">
    <p><strong>Generated:</strong> ${data.timestamp}</p>
    <p><strong>Model:</strong> ${data.modelUsed}</p>
    <p><strong>Processing Time:</strong> ${data.processingTime}ms</p>
    <p><strong>Total Detections:</strong> ${data.detections.length}</p>
  </div>
  <h2>Detection Results</h2>
  <table>
    <thead>
      <tr>
        <th>Label</th>
        <th>Confidence</th>
      </tr>
    </thead>
    <tbody>
      ${data.detections
        .map(
          d => `
        <tr>
          <td>${d.label}</td>
          <td class="confidence">${(d.confidence * 100).toFixed(2)}%</td>
        </tr>
      `
        )
        .join('')}
    </tbody>
  </table>
</body>
</html>
    `;

    const blob = new Blob([reportContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `detection-report-${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success('Exported as HTML Report', {
      description: 'Detailed report downloaded successfully',
    });
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={exportAsJSON}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400 rounded-xl hover:bg-cyan-500/30 transition-all duration-300 hover:scale-105"
        title="Export as JSON"
      >
        <FileJson className="w-4 h-4" />
        <span className="hidden sm:inline">JSON</span>
      </button>

      <button
        onClick={exportAsCSV}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-400 rounded-xl hover:bg-purple-500/30 transition-all duration-300 hover:scale-105"
        title="Export as CSV"
      >
        <FileText className="w-4 h-4" />
        <span className="hidden sm:inline">CSV</span>
      </button>

      <button
        onClick={exportAsReport}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-400 rounded-xl hover:bg-green-500/30 transition-all duration-300 hover:scale-105"
        title="Export as HTML Report"
      >
        <Download className="w-4 h-4" />
        <span className="hidden sm:inline">Report</span>
      </button>
    </div>
  );
}
