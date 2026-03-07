import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronRight, AlertTriangle, AlertCircle, Lightbulb, Zap, Check, X, Copy, Code2, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';
import { mockCode, mockIssues, CodeIssue } from '../data/mockData';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { useIsMobile } from '../components/ui/use-mobile';

export function ReviewResults() {
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [expandedIssues, setExpandedIssues] = useState<Set<string>>(new Set());
  const [selectedIssue, setSelectedIssue] = useState<CodeIssue | null>(null);
  const [showFixModal, setShowFixModal] = useState(false);
  const [mobileView, setMobileView] = useState<'code' | 'feedback'>('code');
  const isMobile = useIsMobile();

  const codeLines = mockCode.split('\n');

  const getIssueIcon = (type: CodeIssue['type']) => {
    switch (type) {
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'suggestion':
        return <Lightbulb className="h-4 w-4 text-info" />;
      case 'optimization':
        return <Zap className="h-4 w-4 text-[#10b981]" />;
    }
  };

  const getIssueColor = (type: CodeIssue['type']) => {
    switch (type) {
      case 'error':
        return 'border-l-destructive bg-destructive/5';
      case 'warning':
        return 'border-l-warning bg-warning/5';
      case 'suggestion':
        return 'border-l-info bg-info/5';
      case 'optimization':
        return 'border-l-[#10b981] bg-[#10b981]/5';
    }
  };

  const toggleIssue = (id: string) => {
    const newExpanded = new Set(expandedIssues);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIssues(newExpanded);
  };

  const handleApplyFix = (issue: CodeIssue) => {
    setSelectedIssue(issue);
    setShowFixModal(true);
  };

  const filterIssuesByCategory = (category: CodeIssue['category']) => {
    return mockIssues.filter(issue => issue.category === category);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row">
      {/* Mobile Toggle */}
      {isMobile && (
        <div className="sticky top-0 z-10 bg-card border-b border-border">
          <div className="grid grid-cols-2">
            <button
              onClick={() => setMobileView('code')}
              className={`flex items-center justify-center gap-2 py-3 border-b-2 transition-colors ${
                mobileView === 'code'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground'
              }`}
            >
              <Code2 className="h-4 w-4" />
              Code
            </button>
            <button
              onClick={() => setMobileView('feedback')}
              className={`flex items-center justify-center gap-2 py-3 border-b-2 transition-colors ${
                mobileView === 'feedback'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground'
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              Feedback ({mockIssues.length})
            </button>
          </div>
        </div>
      )}

      {/* Left Panel - Code Editor */}
      <div className={`flex-1 border-r border-border bg-[#0f1423] overflow-auto ${
        isMobile && mobileView === 'feedback' ? 'hidden' : ''
      }`}>
        <div className="sticky top-0 z-10 bg-[#0f1423] border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">payment.js</h2>
              <p className="text-sm text-muted-foreground">JavaScript • {codeLines.length} lines</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
          </div>
        </div>

        <div className="font-mono text-sm">
          {codeLines.map((line, index) => {
            const lineNumber = index + 1;
            const lineIssues = mockIssues.filter(issue => issue.line === lineNumber);
            const hasIssue = lineIssues.length > 0;
            const isSelected = selectedLine === lineNumber;

            return (
              <motion.div
                key={index}
                className={`flex hover:bg-secondary/30 transition-colors ${
                  isSelected ? 'bg-secondary/50' : ''
                } ${hasIssue ? 'border-l-2 border-l-destructive' : ''}`}
                onMouseEnter={() => setSelectedLine(lineNumber)}
                onMouseLeave={() => setSelectedLine(null)}
                whileHover={{ x: hasIssue ? 2 : 0 }}
              >
                <div className="w-12 flex-shrink-0 text-muted-foreground text-right pr-4 py-1 select-none">
                  {lineNumber}
                </div>
                <div className="flex-1 py-1 pr-4">
                  <code className="text-foreground">{line || ' '}</code>
                  {hasIssue && isSelected && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 flex gap-2"
                    >
                      {lineIssues.map((issue) => (
                        <Badge
                          key={issue.id}
                          variant="outline"
                          className="text-xs cursor-pointer hover:bg-primary/10"
                          onClick={() => {
                            toggleIssue(issue.id);
                            const element = document.getElementById(`issue-${issue.id}`);
                            element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }}
                        >
                          {getIssueIcon(issue.type)}
                          <span className="ml-1">{issue.title}</span>
                        </Badge>
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Right Panel - AI Feedback */}
      <div className={`md:w-[480px] w-full bg-card overflow-auto ${
        isMobile && mobileView === 'code' ? 'hidden' : ''
      }`}>
        <div className="sticky top-0 z-10 bg-card border-b border-border p-4">
          <h2 className="text-lg font-semibold mb-4">AI Analysis</h2>
          
          {/* Quality Score */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Code Quality Score</span>
              <span className="font-semibold">65/100</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="rounded-lg bg-destructive/10 p-2 text-center">
              <div className="text-lg font-semibold text-destructive">2</div>
              <div className="text-xs text-muted-foreground">Errors</div>
            </div>
            <div className="rounded-lg bg-warning/10 p-2 text-center">
              <div className="text-lg font-semibold text-warning">1</div>
              <div className="text-xs text-muted-foreground">Warnings</div>
            </div>
            <div className="rounded-lg bg-info/10 p-2 text-center">
              <div className="text-lg font-semibold text-info">2</div>
              <div className="text-xs text-muted-foreground">Suggestions</div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All ({mockIssues.length})</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-3 mt-4">
              {mockIssues.map((issue, index) => (
                <motion.div
                  id={`issue-${issue.id}`}
                  key={issue.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`border-l-4 ${getIssueColor(issue.type)}`}>
                    <CardHeader className="pb-3">
                      <div
                        className="flex items-start justify-between cursor-pointer"
                        onClick={() => toggleIssue(issue.id)}
                      >
                        <div className="flex items-start gap-2 flex-1">
                          {getIssueIcon(issue.type)}
                          <div className="flex-1">
                            <CardTitle className="text-sm">{issue.title}</CardTitle>
                            <CardDescription className="text-xs mt-1">
                              Line {issue.line} • {issue.category}
                            </CardDescription>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          {expandedIssues.has(issue.id) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </CardHeader>

                    <AnimatePresence>
                      {expandedIssues.has(issue.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <CardContent className="pt-0 space-y-3">
                            <p className="text-sm text-muted-foreground">
                              {issue.description}
                            </p>

                            {issue.suggestedFix && (
                              <div className="rounded-lg bg-muted/50 p-3">
                                <div className="text-xs text-muted-foreground mb-2">
                                  Suggested Fix:
                                </div>
                                <code className="text-xs font-mono block whitespace-pre-wrap">
                                  {issue.suggestedFix}
                                </code>
                              </div>
                            )}

                            <div className="flex items-center gap-2">
                              <div className="flex-1">
                                <div className="text-xs text-muted-foreground mb-1">
                                  Confidence
                                </div>
                                <Progress value={issue.confidence} className="h-1.5" />
                              </div>
                              <span className="text-xs font-medium">{issue.confidence}%</span>
                            </div>

                            {issue.suggestedFix && (
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  className="flex-1"
                                  onClick={() => handleApplyFix(issue)}
                                >
                                  <Check className="h-3 w-3 mr-1" />
                                  Apply Fix
                                </Button>
                                <Button size="sm" variant="outline">
                                  <X className="h-3 w-3 mr-1" />
                                  Dismiss
                                </Button>
                              </div>
                            )}
                          </CardContent>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="security" className="space-y-3 mt-4">
              {filterIssuesByCategory('security').map((issue, index) => (
                <motion.div
                  key={issue.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`border-l-4 ${getIssueColor(issue.type)}`}>
                    <CardHeader>
                      <div className="flex items-start gap-2">
                        {getIssueIcon(issue.type)}
                        <div>
                          <CardTitle className="text-sm">{issue.title}</CardTitle>
                          <CardDescription className="text-xs mt-1">
                            Line {issue.line}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="performance" className="space-y-3 mt-4">
              {filterIssuesByCategory('performance').map((issue, index) => (
                <motion.div
                  key={issue.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`border-l-4 ${getIssueColor(issue.type)}`}>
                    <CardHeader>
                      <div className="flex items-start gap-2">
                        {getIssueIcon(issue.type)}
                        <div>
                          <CardTitle className="text-sm">{issue.title}</CardTitle>
                          <CardDescription className="text-xs mt-1">
                            Line {issue.line}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Fix Preview Modal */}
      <Dialog open={showFixModal} onOpenChange={setShowFixModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Apply Suggested Fix</DialogTitle>
            <DialogDescription>
              Review the changes before applying
            </DialogDescription>
          </DialogHeader>

          {selectedIssue && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Issue</h4>
                <p className="text-sm text-muted-foreground">{selectedIssue.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2 text-destructive">Before</h4>
                  <div className="rounded-lg bg-muted p-3 font-mono text-xs">
                    <pre>{codeLines[selectedIssue.line - 1]}</pre>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2 text-[#10b981]">After</h4>
                  <div className="rounded-lg bg-muted p-3 font-mono text-xs">
                    <pre>{selectedIssue.suggestedFix}</pre>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-primary/20 bg-primary/10 p-3">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">AI Reasoning</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  This fix improves {selectedIssue.category} by addressing the {selectedIssue.type} 
                  on line {selectedIssue.line}. Confidence: {selectedIssue.confidence}%
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFixModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowFixModal(false)}>
              Accept Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}