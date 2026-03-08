import { useState } from 'react';
import { motion } from 'motion/react';
import { Download, FileText, FileCode, FileJson, CheckCircle2, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Checkbox } from './ui/checkbox';

interface ExportFormat {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  extension: string;
}

const exportFormats: ExportFormat[] = [
  {
    id: 'pdf',
    name: 'PDF Report',
    description: 'Formatted PDF document with charts and code snippets',
    icon: <FileText className="h-5 w-5" />,
    extension: '.pdf',
  },
  {
    id: 'markdown',
    name: 'Markdown',
    description: 'Markdown file compatible with GitHub, GitLab, and documentation',
    icon: <FileCode className="h-5 w-5" />,
    extension: '.md',
  },
  {
    id: 'json',
    name: 'JSON Data',
    description: 'Structured JSON data for integration with other tools',
    icon: <FileJson className="h-5 w-5" />,
    extension: '.json',
  },
  {
    id: 'html',
    name: 'HTML Report',
    description: 'Interactive HTML report viewable in any browser',
    icon: <FileText className="h-5 w-5" />,
    extension: '.html',
  },
];

interface ExportOptions {
  includeCode: boolean;
  includeMetrics: boolean;
  includeCharts: boolean;
  includeSuggestions: boolean;
  includeHistory: boolean;
  severityFilter: string;
}

export function ExportReports() {
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [options, setOptions] = useState<ExportOptions>({
    includeCode: true,
    includeMetrics: true,
    includeCharts: true,
    includeSuggestions: true,
    includeHistory: false,
    severityFilter: 'all',
  });

  const handleExport = () => {
    setIsExporting(true);
    setExportSuccess(false);

    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(true);
      
      // Generate mock file
      const format = exportFormats.find(f => f.id === selectedFormat);
      const filename = `code-review-report-${Date.now()}${format?.extension}`;
      
      // In a real app, this would trigger a download
      console.log(`Exporting ${filename} with options:`, options);
      
      setTimeout(() => setExportSuccess(false), 3000);
    }, 2000);
  };

  const updateOption = (key: keyof ExportOptions, value: boolean | string) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Export Report
        </CardTitle>
        <CardDescription>
          Download your code review results in various formats
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Format Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Export Format</label>
          <div className="grid sm:grid-cols-2 gap-3">
            {exportFormats.map((format, index) => (
              <motion.button
                key={format.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedFormat(format.id)}
                className={`p-4 rounded-lg border text-left transition-all ${
                  selectedFormat === format.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                      selectedFormat === format.id
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {format.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{format.name}</p>
                      {selectedFormat === format.id && (
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {format.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Export Options */}
        <div className="space-y-4">
          <label className="text-sm font-medium">Include in Report</label>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeCode"
                checked={options.includeCode}
                onCheckedChange={(checked) => updateOption('includeCode', checked as boolean)}
              />
              <label
                htmlFor="includeCode"
                className="text-sm cursor-pointer flex-1"
              >
                Code Snippets
                <span className="text-xs text-muted-foreground ml-2">
                  Include actual code with highlighted issues
                </span>
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeMetrics"
                checked={options.includeMetrics}
                onCheckedChange={(checked) => updateOption('includeMetrics', checked as boolean)}
              />
              <label
                htmlFor="includeMetrics"
                className="text-sm cursor-pointer flex-1"
              >
                Quality Metrics
                <span className="text-xs text-muted-foreground ml-2">
                  Include statistics and quality scores
                </span>
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeCharts"
                checked={options.includeCharts}
                onCheckedChange={(checked) => updateOption('includeCharts', checked as boolean)}
              />
              <label
                htmlFor="includeCharts"
                className="text-sm cursor-pointer flex-1"
              >
                Visual Charts
                <span className="text-xs text-muted-foreground ml-2">
                  Include charts and visualizations
                </span>
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeSuggestions"
                checked={options.includeSuggestions}
                onCheckedChange={(checked) => updateOption('includeSuggestions', checked as boolean)}
              />
              <label
                htmlFor="includeSuggestions"
                className="text-sm cursor-pointer flex-1"
              >
                AI Suggestions
                <span className="text-xs text-muted-foreground ml-2">
                  Include recommended fixes and improvements
                </span>
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeHistory"
                checked={options.includeHistory}
                onCheckedChange={(checked) => updateOption('includeHistory', checked as boolean)}
              />
              <label
                htmlFor="includeHistory"
                className="text-sm cursor-pointer flex-1"
              >
                Historical Data
                <span className="text-xs text-muted-foreground ml-2">
                  Include trends and previous reviews
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Severity Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Filter by Severity</label>
          <Select
            value={options.severityFilter}
            onValueChange={(value) => updateOption('severityFilter', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Issues</SelectItem>
              <SelectItem value="critical">Critical Only</SelectItem>
              <SelectItem value="high">High & Critical</SelectItem>
              <SelectItem value="medium">Medium & Above</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Export Summary */}
        <div className="rounded-lg bg-muted/30 border border-border p-4">
          <p className="text-sm font-medium mb-2">Export Summary</p>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>Format:</span>
              <Badge variant="outline" className="text-xs">
                {exportFormats.find(f => f.id === selectedFormat)?.name}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span>Sections:</span>
              <span>
                {Object.values(options).filter(v => v === true).length} included
              </span>
            </div>
            <div className="flex justify-between">
              <span>Filter:</span>
              <span className="capitalize">{options.severityFilter} issues</span>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <Button
          onClick={handleExport}
          disabled={isExporting}
          className="w-full"
          size="lg"
        >
          {isExporting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Report...
            </>
          ) : exportSuccess ? (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Exported Successfully!
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </>
          )}
        </Button>

        {exportSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-sm text-green-500"
          >
            Your report has been downloaded successfully!
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
