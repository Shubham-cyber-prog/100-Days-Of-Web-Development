import { useParams } from 'react-router';
import { useState } from 'react';
import {
  Star,
  GitFork,
  Eye,
  ChevronDown,
  Code,
  GitPullRequest,
  Settings,
  Play,
  FolderKanban,
  AlertCircle,
  GitCommit,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import FileExplorer from '../components/FileExplorer';
import CodeViewer from '../components/CodeViewer';
import IssueList from '../components/IssueList';
import CommitTimeline from '../components/CommitTimeline';
import {
  repositories,
  issues,
  commits,
  fileTree,
  sampleCode,
  FileItem,
} from '../data/mockData';

export default function Repository() {
  const { owner, repo: repoName } = useParams();
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [currentBranch, setCurrentBranch] = useState('main');

  const repository = repositories.find((r) => r.name === repoName);

  if (!repository) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Repository not found</h1>
          <p className="text-gray-600 mt-2">
            The repository {owner}/{repoName} does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Repository Header */}
      <div className="border-b bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">
                <span className="text-blue-600">{owner}</span> / {repository.name}
              </h1>
              {repository.isPrivate && (
                <Badge variant="outline">Private</Badge>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-1" />
                Watch
                <span className="ml-1 bg-gray-200 px-1.5 rounded-full text-xs">
                  {repository.watchers}
                </span>
              </Button>
              <Button variant="outline" size="sm">
                <GitFork className="w-4 h-4 mr-1" />
                Fork
                <span className="ml-1 bg-gray-200 px-1.5 rounded-full text-xs">
                  {repository.forks}
                </span>
              </Button>
              <Button variant="outline" size="sm">
                <Star className="w-4 h-4 mr-1" />
                Star
                <span className="ml-1 bg-gray-200 px-1.5 rounded-full text-xs">
                  {repository.stars}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-6">
          <Tabs defaultValue="code" className="w-full">
            <TabsList className="h-auto p-0 bg-transparent border-0 rounded-none">
              <TabsTrigger
                value="code"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent"
              >
                <Code className="w-4 h-4 mr-2" />
                Code
              </TabsTrigger>
              <TabsTrigger
                value="issues"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent"
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                Issues
                <Badge variant="secondary" className="ml-2">
                  {issues.filter((i) => i.status === 'open').length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="pull-requests"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent"
              >
                <GitPullRequest className="w-4 h-4 mr-2" />
                Pull Requests
              </TabsTrigger>
              <TabsTrigger
                value="commits"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent"
              >
                <GitCommit className="w-4 h-4 mr-2" />
                Commits
              </TabsTrigger>
              <TabsTrigger
                value="actions"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent"
              >
                <Play className="w-4 h-4 mr-2" />
                Actions
              </TabsTrigger>
              <TabsTrigger
                value="projects"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent"
              >
                <FolderKanban className="w-4 h-4 mr-2" />
                Projects
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            <div className="py-6">
              <div className="flex gap-6">
                <div className="flex-1 space-y-4">
                  {/* Code Tab */}
                  <TabsContent value="code" className="mt-0">
                    <div className="space-y-4">
                      {/* Branch Selector */}
                      <div className="flex items-center gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Code className="w-4 h-4 mr-2" />
                              {currentBranch}
                              <ChevronDown className="w-4 h-4 ml-2" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => setCurrentBranch('main')}>
                              main
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setCurrentBranch('develop')}>
                              develop
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setCurrentBranch('feature/new-ui')}>
                              feature/new-ui
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <span className="text-sm text-gray-600">
                          {commits.length} commits
                        </span>
                      </div>

                      {/* File Explorer */}
                      <FileExplorer files={fileTree} onFileSelect={setSelectedFile} />

                      {/* Code Viewer */}
                      {selectedFile && (
                        <CodeViewer code={sampleCode} filename={selectedFile.name} />
                      )}
                    </div>
                  </TabsContent>

                  {/* Issues Tab */}
                  <TabsContent value="issues" className="mt-0">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Issues</h2>
                        <Button size="sm">New issue</Button>
                      </div>
                      <IssueList issues={issues} />
                    </div>
                  </TabsContent>

                  {/* Pull Requests Tab */}
                  <TabsContent value="pull-requests" className="mt-0">
                    <div className="text-center py-12 text-gray-500">
                      <GitPullRequest className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p>No open pull requests</p>
                    </div>
                  </TabsContent>

                  {/* Commits Tab */}
                  <TabsContent value="commits" className="mt-0">
                    <div className="space-y-4">
                      <h2 className="text-lg font-semibold">Commit history</h2>
                      <CommitTimeline commits={commits} />
                    </div>
                  </TabsContent>

                  {/* Actions Tab */}
                  <TabsContent value="actions" className="mt-0">
                    <div className="text-center py-12 text-gray-500">
                      <Play className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p>No workflows configured</p>
                    </div>
                  </TabsContent>

                  {/* Projects Tab */}
                  <TabsContent value="projects" className="mt-0">
                    <div className="text-center py-12 text-gray-500">
                      <FolderKanban className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p>No projects found</p>
                    </div>
                  </TabsContent>

                  {/* Settings Tab */}
                  <TabsContent value="settings" className="mt-0">
                    <div className="space-y-4">
                      <h2 className="text-lg font-semibold">Repository settings</h2>
                      <div className="border rounded-lg p-4 space-y-4">
                        <div>
                          <h3 className="font-medium mb-2">Repository name</h3>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-md"
                            value={repository.name}
                            disabled
                          />
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">Description</h3>
                          <textarea
                            className="w-full px-3 py-2 border rounded-md"
                            rows={3}
                            defaultValue={repository.description}
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </div>

                {/* Right Sidebar */}
                <aside className="w-80 space-y-6">
                  {/* About */}
                  <div className="border rounded-lg p-4 space-y-3">
                    <h3 className="font-semibold">About</h3>
                    <p className="text-sm text-gray-600">{repository.description}</p>
                    {repository.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {repository.topics.map((topic) => (
                          <Badge key={topic} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Languages */}
                  <div className="border rounded-lg p-4 space-y-3">
                    <h3 className="font-semibold">Languages</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{repository.language}</span>
                        <span className="text-gray-600">100%</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                  </div>

                  {/* Contributors */}
                  <div className="border rounded-lg p-4 space-y-3">
                    <h3 className="font-semibold">Contributors</h3>
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"
                        />
                      ))}
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
