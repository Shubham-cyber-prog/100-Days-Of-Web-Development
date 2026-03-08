import { useState } from 'react';
import { motion } from 'motion/react';
import { FileCode, Upload, CheckCircle2, AlertCircle, XCircle, Loader2, ChevronDown, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

interface FileAnalysis {
  id: string;
  name: string;
  path: string;
  language: string;
  status: 'pending' | 'analyzing' | 'complete' | 'error';
  issues: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  linesOfCode: number;
  quality: number;
}

const mockFiles: FileAnalysis[] = [
  {
    id: '1',
    name: 'UserController.ts',
    path: 'src/controllers/UserController.ts',
    language: 'TypeScript',
    status: 'complete',
    issues: { critical: 2, high: 3, medium: 5, low: 2 },
    linesOfCode: 245,
    quality: 72,
  },
  {
    id: '2',
    name: 'authService.js',
    path: 'src/services/authService.js',
    language: 'JavaScript',
    status: 'complete',
    issues: { critical: 0, high: 1, medium: 3, low: 4 },
    linesOfCode: 180,
    quality: 85,
  },
  {
    id: '3',
    name: 'database.py',
    path: 'src/utils/database.py',
    language: 'Python',
    status: 'complete',
    issues: { critical: 1, high: 2, medium: 2, low: 1 },
    linesOfCode: 320,
    quality: 78,
  },
  {
    id: '4',
    name: 'api.go',
    path: 'src/api/api.go',
    language: 'Go',
    status: 'analyzing',
    issues: { critical: 0, high: 0, medium: 0, low: 0 },
    linesOfCode: 410,
    quality: 0,
  },
  {
    id: '5',
    name: 'routes.rs',
    path: 'src/routes.rs',
    language: 'Rust',
    status: 'pending',
    issues: { critical: 0, high: 0, medium: 0, low: 0 },
    linesOfCode: 156,
    quality: 0,
  },
];

export function BatchAnalysis() {
  const [files] = useState<FileAnalysis[]>(mockFiles);
  const [expandedFiles, setExpandedFiles] = useState<Set<string>>(new Set());

  const toggleFile = (id: string) => {
    const newExpanded = new Set(expandedFiles);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedFiles(newExpanded);
  };

  const completedFiles = files.filter(f => f.status === 'complete');
  const totalIssues = completedFiles.reduce((sum, f) => sum + f.issues.critical + f.issues.high + f.issues.medium + f.issues.low, 0);
  const avgQuality = completedFiles.length > 0 
    ? Math.round(completedFiles.reduce((sum, f) => sum + f.quality, 0) / completedFiles.length)
    : 0;
  const totalLines = files.reduce((sum, f) => sum + f.linesOfCode, 0);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground">Batch Analysis</h1>
          <p className="text-muted-foreground mt-1">
            Analyze multiple files at once and view aggregated results
          </p>
        </div>
        <Button className="w-full sm:w-auto">
          <Upload className="mr-2 h-4 w-4" />
          Upload Files
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-border bg-card">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Files</p>
                  <p className="text-2xl md:text-3xl font-bold mt-1">{files.length}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <FileCode className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="h-3 w-3 text-green-500" />
                {completedFiles.length} completed
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-border bg-card">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Issues</p>
                  <p className="text-2xl md:text-3xl font-bold mt-1">{totalIssues}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
                  <AlertCircle className="h-6 w-6 text-red-500" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs">
                <Badge variant="destructive" className="text-xs px-1.5 py-0">
                  {completedFiles.reduce((sum, f) => sum + f.issues.critical, 0)} Critical
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-border bg-card">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Quality</p>
                  <p className="text-2xl md:text-3xl font-bold mt-1">{avgQuality}%</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs text-green-500">
                <TrendingUp className="h-3 w-3" />
                Good overall quality
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-border bg-card">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Lines of Code</p>
                  <p className="text-2xl md:text-3xl font-bold mt-1">{totalLines.toLocaleString()}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                  <FileCode className="h-6 w-6 text-blue-500" />
                </div>
              </div>
              <div className="mt-4 text-xs text-muted-foreground">
                Across all files
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Files List */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Files Analysis</CardTitle>
          <CardDescription>Review results for each file</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {files.map((file, index) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => toggleFile(file.id)}
                      disabled={file.status !== 'complete'}
                    >
                      {expandedFiles.has(file.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium text-sm truncate">{file.name}</p>
                        <Badge variant="outline" className="text-xs">
                          {file.language}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {file.path}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 ml-4">
                    {file.status === 'complete' && (
                      <>
                        <div className="hidden sm:flex items-center gap-2 text-xs">
                          {file.issues.critical > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {file.issues.critical} Critical
                            </Badge>
                          )}
                          {file.issues.high > 0 && (
                            <Badge className="bg-orange-500 text-xs">
                              {file.issues.high} High
                            </Badge>
                          )}
                          {file.issues.medium > 0 && (
                            <Badge className="bg-yellow-500 text-xs">
                              {file.issues.medium} Med
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{file.quality}%</span>
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        </div>
                      </>
                    )}
                    {file.status === 'analyzing' && (
                      <div className="flex items-center gap-2 text-primary">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span className="text-sm">Analyzing...</span>
                      </div>
                    )}
                    {file.status === 'pending' && (
                      <span className="text-sm text-muted-foreground">Pending</span>
                    )}
                    {file.status === 'error' && (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedFiles.has(file.id) && file.status === 'complete' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 pl-9 space-y-3"
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <p className="text-xs text-muted-foreground">Critical</p>
                        <p className="text-lg font-bold text-red-500">{file.issues.critical}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <p className="text-xs text-muted-foreground">High</p>
                        <p className="text-lg font-bold text-orange-500">{file.issues.high}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <p className="text-xs text-muted-foreground">Medium</p>
                        <p className="text-lg font-bold text-yellow-500">{file.issues.medium}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <p className="text-xs text-muted-foreground">Low</p>
                        <p className="text-lg font-bold text-blue-500">{file.issues.low}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        Export Report
                      </Button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
