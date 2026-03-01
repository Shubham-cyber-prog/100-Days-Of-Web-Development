import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, RotateCcw, Plus, Settings, Cpu, ListChecks, Layers, FileText, BarChart3 } from "lucide-react";
import { Button } from "./components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Slider } from "./components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { ThreadCard } from "./components/ThreadCard";
import { CPUBlock } from "./components/CPUBlock";
import { GanttChart } from "./components/GanttChart";
import { AddThreadDialog } from "./components/AddThreadDialog";
import { LogsPanel } from "./components/LogsPanel";
import { AnalyticsPanel } from "./components/AnalyticsPanel";
import { ThreadDetailsPanel } from "./components/ThreadDetailsPanel";
import { Thread, Algorithm, GanttBlock, LogEntry } from "./types/thread";
import { getNextThread, calculateMetrics } from "./utils/schedulers";

export default function App() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [algorithm, setAlgorithm] = useState<Algorithm>("FCFS");
  const [currentTime, setCurrentTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState([1]);
  const [ganttBlocks, setGanttBlocks] = useState<GanttBlock[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [nextThreadId, setNextThreadId] = useState(1);
  const [currentThread, setCurrentThread] = useState<Thread | null>(null);
  const [timeQuantum] = useState(4); // For Round Robin
  const [quantumRemaining, setQuantumRemaining] = useState(timeQuantum);
  const [activeView, setActiveView] = useState("simulator");
  
  const intervalRef = useRef<number | null>(null);
  const logIdRef = useRef(1);

  const addLog = (type: LogEntry["type"], threadId: number, message: string) => {
    setLogs((prev) => [
      ...prev,
      {
        id: logIdRef.current++,
        timestamp: currentTime,
        type,
        threadId,
        message,
      },
    ]);
  };

  const handleAddThread = (data: { burstTime: number; priority?: number; arrivalTime: number }) => {
    const newThread: Thread = {
      id: nextThreadId,
      arrivalTime: data.arrivalTime,
      burstTime: data.burstTime,
      remainingTime: data.burstTime,
      priority: data.priority,
      status: "ready",
    };
    
    setThreads((prev) => [...prev, newThread]);
    setNextThreadId((prev) => prev + 1);
    addLog("added", newThread.id, `Thread ${newThread.id} added to ready queue`);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentTime(0);
    setThreads([]);
    setGanttBlocks([]);
    setLogs([]);
    setCurrentThread(null);
    setNextThreadId(1);
    setQuantumRemaining(timeQuantum);
    setSelectedThread(null);
  };

  const handleStep = () => {
    simulateStep();
  };

  const simulateStep = () => {
    setThreads((prevThreads) => {
      let updatedThreads = [...prevThreads];
      let updatedCurrentThread = currentThread;
      let updatedQuantumRemaining = quantumRemaining;

      // Check if current thread completed
      if (updatedCurrentThread && updatedCurrentThread.remainingTime <= 0) {
        const completedThread = calculateMetrics(updatedCurrentThread, currentTime);
        updatedThreads = updatedThreads.map((t) =>
          t.id === completedThread.id
            ? { ...completedThread, status: "completed" }
            : t
        );
        addLog("completed", updatedCurrentThread.id, `Thread ${updatedCurrentThread.id} completed`);
        updatedCurrentThread = null;
        setCurrentThread(null);
        setQuantumRemaining(timeQuantum);
      }

      // Round Robin time quantum check
      if (algorithm === "RR" && updatedCurrentThread && updatedQuantumRemaining <= 0) {
        updatedThreads = updatedThreads.map((t) =>
          t.id === updatedCurrentThread!.id ? { ...t, status: "ready" } : t
        );
        addLog("preempted", updatedCurrentThread.id, `Thread ${updatedCurrentThread.id} preempted (time quantum expired)`);
        updatedCurrentThread = null;
        setCurrentThread(null);
        setQuantumRemaining(timeQuantum);
      }

      // Select next thread if CPU is idle
      if (!updatedCurrentThread) {
        const nextThread = getNextThread(updatedThreads, algorithm, currentTime, updatedCurrentThread);
        
        if (nextThread) {
          updatedCurrentThread = nextThread;
          updatedThreads = updatedThreads.map((t) =>
            t.id === nextThread.id
              ? { ...t, status: "running", startTime: t.startTime ?? currentTime }
              : t
          );
          setCurrentThread(updatedCurrentThread);
          setQuantumRemaining(timeQuantum);
          addLog("started", nextThread.id, `Thread ${nextThread.id} started execution`);
          
          // Add to Gantt chart
          setGanttBlocks((prev) => [
            ...prev,
            {
              threadId: nextThread.id,
              startTime: currentTime,
              endTime: currentTime + 1,
            },
          ]);
        }
      } else {
        // Continue executing current thread
        updatedThreads = updatedThreads.map((t) =>
          t.id === updatedCurrentThread!.id
            ? { ...t, remainingTime: t.remainingTime - 1 }
            : t
        );
        updatedCurrentThread = {
          ...updatedCurrentThread,
          remainingTime: updatedCurrentThread.remainingTime - 1,
        };
        setCurrentThread(updatedCurrentThread);
        setQuantumRemaining(updatedQuantumRemaining - 1);
        
        // Update Gantt chart
        setGanttBlocks((prev) => {
          const lastBlock = prev[prev.length - 1];
          if (lastBlock && lastBlock.threadId === updatedCurrentThread!.id) {
            return [
              ...prev.slice(0, -1),
              { ...lastBlock, endTime: currentTime + 1 },
            ];
          }
          return [
            ...prev,
            {
              threadId: updatedCurrentThread!.id,
              startTime: currentTime,
              endTime: currentTime + 1,
            },
          ];
        });
      }

      return updatedThreads;
    });

    setCurrentTime((prev) => prev + 1);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        simulateStep();
      }, 1000 / speed[0]);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, speed, threads, currentThread, algorithm, currentTime, quantumRemaining]);

  const readyThreads = threads.filter((t) => t.status === "ready");
  const runningThread = threads.find((t) => t.status === "running") || null;
  const completedThreads = threads.filter((t) => t.status === "completed");

  return (
    <div className="h-screen bg-gray-950 text-white flex flex-col overflow-hidden">
      {/* Top Navigation */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Cpu className="w-8 h-8 text-blue-500" />
            <h1 className="text-xl font-bold">Thread Scheduling Simulator</h1>
          </div>

          <div className="flex items-center gap-4">
            <Select value={algorithm} onValueChange={(value) => setAlgorithm(value as Algorithm)}>
              <SelectTrigger className="w-[200px] bg-gray-800 border-gray-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="FCFS">FCFS (First Come First Serve)</SelectItem>
                <SelectItem value="SJF">SJF (Shortest Job First)</SelectItem>
                <SelectItem value="RR">Round Robin</SelectItem>
                <SelectItem value="Priority">Priority Scheduling</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 border-l border-gray-700 pl-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsRunning(!isRunning)}
                className="bg-gray-800 border-gray-700"
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleStep}
                disabled={isRunning}
                className="bg-gray-800 border-gray-700"
              >
                <SkipForward className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleReset}
                className="bg-gray-800 border-gray-700"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-3 border-l border-gray-700 pl-4">
              <span className="text-sm text-gray-400">Speed:</span>
              <Slider
                value={speed}
                onValueChange={setSpeed}
                min={0.5}
                max={4}
                step={0.5}
                className="w-32"
              />
              <span className="text-sm font-mono w-8">{speed[0]}x</span>
            </div>

            <Button variant="ghost" size="icon" className="border-l border-gray-700 pl-4">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="px-6 py-2 border-t border-gray-800 flex items-center gap-2 text-sm">
          <span className="text-gray-500">Time:</span>
          <span className="font-mono font-bold text-blue-400">{currentTime}ms</span>
          {algorithm === "RR" && currentThread && (
            <>
              <span className="text-gray-500 ml-4">Quantum Remaining:</span>
              <span className="font-mono font-bold text-green-400">{quantumRemaining}ms</span>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-64 border-r border-gray-800 bg-gray-900/30 flex flex-col">
          <div className="p-4 space-y-2">
            <button
              onClick={() => setActiveView("simulator")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeView === "simulator" ? "bg-blue-600" : "hover:bg-gray-800"
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Simulator</span>
            </button>
            <button
              onClick={() => setActiveView("threads")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeView === "threads" ? "bg-blue-600" : "hover:bg-gray-800"
              }`}
            >
              <ListChecks className="w-4 h-4" />
              <span>Threads</span>
            </button>
            <button
              onClick={() => setActiveView("algorithms")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeView === "algorithms" ? "bg-blue-600" : "hover:bg-gray-800"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Algorithms</span>
            </button>
            <button
              onClick={() => setActiveView("logs")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeView === "logs" ? "bg-blue-600" : "hover:bg-gray-800"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Logs</span>
            </button>
            <button
              onClick={() => setActiveView("analytics")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeView === "analytics" ? "bg-blue-600" : "hover:bg-gray-800"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </button>
          </div>

          <div className="mt-auto p-4 border-t border-gray-800">
            <Button
              onClick={() => setShowAddDialog(true)}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Thread
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {activeView === "simulator" && (
            <div className="p-6 space-y-6">
              {/* CPU and Queue Visualization */}
              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h3 className="text-sm uppercase tracking-wider text-gray-400">Ready Queue</h3>
                  <div className="space-y-2 min-h-[200px] bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                    {readyThreads.length === 0 ? (
                      <div className="text-gray-500 text-sm text-center py-8">No threads in queue</div>
                    ) : (
                      readyThreads.map((thread) => (
                        <ThreadCard
                          key={thread.id}
                          thread={thread}
                          onClick={() => setSelectedThread(thread)}
                          isSelected={selectedThread?.id === thread.id}
                        />
                      ))
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-3">CPU</h3>
                  <CPUBlock thread={runningThread} />
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm uppercase tracking-wider text-gray-400">Completed</h3>
                  <div className="space-y-2 min-h-[200px] bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                    {completedThreads.length === 0 ? (
                      <div className="text-gray-500 text-sm text-center py-8">No completed threads</div>
                    ) : (
                      completedThreads.map((thread) => (
                        <ThreadCard
                          key={thread.id}
                          thread={thread}
                          onClick={() => setSelectedThread(thread)}
                          isSelected={selectedThread?.id === thread.id}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Gantt Chart */}
              <GanttChart blocks={ganttBlocks} currentTime={currentTime} maxTime={Math.max(100, currentTime)} />

              {/* Bottom Panels */}
              <div className="grid grid-cols-2 gap-6">
                <LogsPanel logs={logs} />
                <AnalyticsPanel threads={threads} totalTime={currentTime} />
              </div>
            </div>
          )}

          {activeView === "threads" && (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">All Threads</h2>
              {threads.length === 0 ? (
                <div className="text-center py-20">
                  <ListChecks className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                  <p className="text-gray-500 mb-4">No threads added yet</p>
                  <Button onClick={() => setShowAddDialog(true)} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Thread
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-4">
                  {threads.map((thread) => (
                    <ThreadCard
                      key={thread.id}
                      thread={thread}
                      onClick={() => setSelectedThread(thread)}
                      isSelected={selectedThread?.id === thread.id}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeView === "algorithms" && (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Scheduling Algorithms</h2>
              <div className="space-y-6">
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-xl font-bold mb-2">FCFS - First Come First Serve</h3>
                  <p className="text-gray-400 mb-4">
                    The simplest scheduling algorithm. Processes are executed in the order they arrive in the ready queue.
                    Non-preemptive.
                  </p>
                  <div className="text-sm text-gray-500">
                    <strong>Pros:</strong> Simple, fair in terms of arrival order
                    <br />
                    <strong>Cons:</strong> Can lead to convoy effect (short processes waiting for long ones)
                  </div>
                </div>

                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-xl font-bold mb-2">SJF - Shortest Job First</h3>
                  <p className="text-gray-400 mb-4">
                    Executes the process with the shortest remaining burst time first. Can be preemptive or non-preemptive.
                  </p>
                  <div className="text-sm text-gray-500">
                    <strong>Pros:</strong> Minimizes average waiting time
                    <br />
                    <strong>Cons:</strong> Can lead to starvation of long processes
                  </div>
                </div>

                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-xl font-bold mb-2">Round Robin</h3>
                  <p className="text-gray-400 mb-4">
                    Each process gets a fixed time quantum. After the quantum expires, the process is preempted and added to
                    the end of the ready queue. Time quantum: {timeQuantum}ms
                  </p>
                  <div className="text-sm text-gray-500">
                    <strong>Pros:</strong> Fair, good for time-sharing systems
                    <br />
                    <strong>Cons:</strong> Performance depends on time quantum size
                  </div>
                </div>

                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-xl font-bold mb-2">Priority Scheduling</h3>
                  <p className="text-gray-400 mb-4">
                    Each process is assigned a priority. The process with the highest priority (lowest number) is executed
                    first.
                  </p>
                  <div className="text-sm text-gray-500">
                    <strong>Pros:</strong> Flexible, can prioritize important tasks
                    <br />
                    <strong>Cons:</strong> Can lead to starvation of low-priority processes
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === "logs" && (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Event Logs</h2>
              <LogsPanel logs={logs} />
            </div>
          )}

          {activeView === "analytics" && (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Analytics</h2>
              <AnalyticsPanel threads={threads} totalTime={currentTime} />
            </div>
          )}
        </div>

        {/* Right Sidebar - Thread Details */}
        <div className="w-80 border-l border-gray-800 bg-gray-900/30 p-6">
          <ThreadDetailsPanel
            thread={selectedThread}
            onClose={() => setSelectedThread(null)}
          />
        </div>
      </div>

      <AddThreadDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddThread={handleAddThread}
        nextId={nextThreadId}
        currentTime={currentTime}
      />
    </div>
  );
}
