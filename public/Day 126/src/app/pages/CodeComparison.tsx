import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Copy, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const codeExamples = [
  {
    id: '1',
    title: 'SQL Injection Prevention',
    description: 'Secure database queries with parameterization',
    language: 'TypeScript',
    severity: 'critical',
    before: `// Vulnerable to SQL injection
async function getUser(userId: string) {
  const query = "SELECT * FROM users WHERE id = '" + userId + "'";
  return await db.query(query);
}

// Direct concatenation allows malicious input
const user = await getUser("1' OR '1'='1");`,
    after: `// Safe from SQL injection
async function getUser(userId: string) {
  const query = "SELECT * FROM users WHERE id = $1";
  return await db.query(query, [userId]);
}

// Parameterized queries prevent injection
const user = await getUser("1' OR '1'='1"); // Safely escaped`,
    improvements: [
      'Prevents SQL injection attacks',
      'Input is properly escaped',
      'Query structure is preserved',
      'Follows security best practices',
    ],
  },
  {
    id: '2',
    title: 'Error Handling Enhancement',
    description: 'Comprehensive error management with user feedback',
    language: 'JavaScript',
    severity: 'high',
    before: `async function fetchData() {
  const response = await fetch('/api/data');
  const data = await response.json();
  return data;
}

// No error handling
fetchData();`,
    after: `async function fetchData() {
  try {
    const response = await fetch('/api/data');
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return { success: false, error: error.message };
  }
}

// Proper error handling
const result = await fetchData();`,
    improvements: [
      'Catches network errors',
      'Validates HTTP response status',
      'Provides error context',
      'Returns structured responses',
    ],
  },
  {
    id: '3',
    title: 'Memory Leak Prevention',
    description: 'Proper cleanup of event listeners and subscriptions',
    language: 'React',
    severity: 'medium',
    before: `function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const subscription = userService.subscribe(userId, setUser);
    // Missing cleanup!
  }, [userId]);
  
  return <div>{user?.name}</div>;
}`,
    after: `function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const subscription = userService.subscribe(userId, setUser);
    
    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [userId]);
  
  return <div>{user?.name}</div>;
}`,
    improvements: [
      'Prevents memory leaks',
      'Cleans up subscriptions',
      'Avoids state updates on unmounted components',
      'Improves app performance',
    ],
  },
];

export function CodeComparison() {
  const [selectedExample, setSelectedExample] = useState(codeExamples[0]);
  const [copiedSide, setCopiedSide] = useState<'before' | 'after' | null>(null);

  const handleCopy = (code: string, side: 'before' | 'after') => {
    navigator.clipboard.writeText(code);
    setCopiedSide(side);
    setTimeout(() => setCopiedSide(null), 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground">Code Comparison</h1>
        <p className="text-muted-foreground mt-1">
          Compare before and after code with AI-suggested improvements
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
        {/* Examples Sidebar */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground px-2">
            Examples
          </h3>
          {codeExamples.map((example, index) => (
            <motion.div
              key={example.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => setSelectedExample(example)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  selectedExample.id === example.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-medium text-sm">{example.title}</h4>
                  <Badge
                    className={`${getSeverityColor(example.severity)} text-xs`}
                  >
                    {example.severity}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {example.description}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    {example.language}
                  </Badge>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Comparison View */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{selectedExample.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {selectedExample.description}
                  </CardDescription>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Desktop: Side by Side */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-4">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="border-red-500/20 bg-card h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span className="text-red-500">Before</span>
                      <Badge variant="destructive" className="text-xs">
                        Issues Found
                      </Badge>
                    </CardTitle>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => handleCopy(selectedExample.before, 'before')}
                    >
                      {copiedSide === 'before' ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="rounded-lg bg-[#0f1423] border border-border overflow-hidden">
                    <pre className="p-4 overflow-x-auto text-xs">
                      <code className="font-mono text-muted-foreground whitespace-pre">
                        {selectedExample.before}
                      </code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="border-green-500/20 bg-card h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span className="text-green-500">After</span>
                      <Badge className="bg-green-500 text-xs">
                        Fixed
                      </Badge>
                    </CardTitle>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => handleCopy(selectedExample.after, 'after')}
                    >
                      {copiedSide === 'after' ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="rounded-lg bg-[#0f1423] border border-border overflow-hidden">
                    <pre className="p-4 overflow-x-auto text-xs">
                      <code className="font-mono text-muted-foreground whitespace-pre">
                        {selectedExample.after}
                      </code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Mobile: Tabs */}
          <div className="lg:hidden">
            <Tabs defaultValue="before">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="before">Before</TabsTrigger>
                <TabsTrigger value="after">After</TabsTrigger>
              </TabsList>
              <TabsContent value="before" className="mt-4">
                <Card className="border-red-500/20 bg-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Badge variant="destructive" className="text-xs">
                          Issues Found
                        </Badge>
                      </CardTitle>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={() => handleCopy(selectedExample.before, 'before')}
                      >
                        {copiedSide === 'before' ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="rounded-lg bg-[#0f1423] border border-border overflow-hidden">
                      <pre className="p-4 overflow-x-auto text-xs">
                        <code className="font-mono text-muted-foreground whitespace-pre">
                          {selectedExample.before}
                        </code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="after" className="mt-4">
                <Card className="border-green-500/20 bg-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Badge className="bg-green-500 text-xs">
                          Fixed
                        </Badge>
                      </CardTitle>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={() => handleCopy(selectedExample.after, 'after')}
                      >
                        {copiedSide === 'after' ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="rounded-lg bg-[#0f1423] border border-border overflow-hidden">
                      <pre className="p-4 overflow-x-auto text-xs">
                        <code className="font-mono text-muted-foreground whitespace-pre">
                          {selectedExample.after}
                        </code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Improvements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-base">Key Improvements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {selectedExample.improvements.map((improvement, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-2 text-sm"
                    >
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>{improvement}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
