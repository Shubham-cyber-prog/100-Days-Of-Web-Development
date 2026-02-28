import { useState } from 'react';
import { motion } from 'motion/react';
import { Upload as UploadIcon, FileCode, Github, GitlabIcon as GitLab, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { languages } from '../data/mockData';
import { useNavigate } from 'react-router';

export function Upload() {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('JavaScript');
  const [codeInput, setCodeInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file drop logic here
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      navigate('/review/1');
    }, 2000);
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground">Upload Code</h1>
        <p className="text-muted-foreground mt-1">
          Upload your code for AI-powered analysis
        </p>
      </div>

      <Tabs defaultValue="upload" className="space-y-4 md:space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="upload" className="text-xs sm:text-sm">Upload File</TabsTrigger>
          <TabsTrigger value="paste" className="text-xs sm:text-sm">Paste Code</TabsTrigger>
          <TabsTrigger value="repo" className="text-xs sm:text-sm">Connect Repo</TabsTrigger>
        </TabsList>

        {/* Upload File Tab */}
        <TabsContent value="upload">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Drag & Drop Files</CardTitle>
                <CardDescription>
                  Upload your code files for analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  animate={{
                    borderColor: isDragging ? '#6366f1' : '#1e2438',
                    backgroundColor: isDragging ? 'rgba(99, 102, 241, 0.05)' : 'rgba(0, 0, 0, 0)'
                  }}
                  className="border-2 border-dashed rounded-lg p-12 text-center transition-colors"
                >
                  <motion.div
                    animate={{ scale: isDragging ? 1.1 : 1 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <UploadIcon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-medium">
                        Drop your files here
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        or click to browse
                      </p>
                    </div>
                    <Button variant="outline">
                      <FileCode className="mr-2 h-4 w-4" />
                      Browse Files
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Supported: .js, .ts, .py, .java, .go, .cpp, .cs, .rb, .php, .rs
                    </p>
                  </motion.div>
                </motion.div>

                <div className="mt-6">
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Select Language
                  </label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  className="w-full mt-6" 
                  size="lg"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze Code'
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Paste Code Tab */}
        <TabsContent value="paste">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Paste Your Code</CardTitle>
                <CardDescription>
                  Copy and paste code directly for instant analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Select Language
                  </label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Code Input
                  </label>
                  <div className="relative">
                    <Textarea
                      value={codeInput}
                      onChange={(e) => setCodeInput(e.target.value)}
                      placeholder="Paste your code here..."
                      className="min-h-[400px] font-mono text-sm bg-[#0f1423] border-border"
                    />
                    <div className="absolute top-2 right-2 text-xs text-muted-foreground">
                      {codeInput.split('\n').length} lines
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !codeInput}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze Code'
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Connect Repo Tab */}
        <TabsContent value="repo">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Connect Repository</CardTitle>
                <CardDescription>
                  Link your GitHub or GitLab repository for continuous analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Button 
                    variant="outline" 
                    className="w-full h-auto py-6 justify-start gap-4 hover:border-primary hover:bg-primary/5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#24292e]">
                      <Github className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">Connect GitHub</div>
                      <div className="text-xs text-muted-foreground">
                        Analyze repositories and pull requests
                      </div>
                    </div>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Button 
                    variant="outline" 
                    className="w-full h-auto py-6 justify-start gap-4 hover:border-primary hover:bg-primary/5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#fc6d26]">
                      <GitLab className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">Connect GitLab</div>
                      <div className="text-xs text-muted-foreground">
                        Integrate with your GitLab projects
                      </div>
                    </div>
                  </Button>
                </motion.div>

                <div className="rounded-lg border border-border bg-muted/20 p-4">
                  <h4 className="text-sm font-medium mb-2">Features</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Automatic code review on commits
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Pull request analysis
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Security scanning
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Continuous quality monitoring
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}