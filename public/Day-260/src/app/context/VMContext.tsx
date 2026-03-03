import React, { createContext, useContext, useState, ReactNode } from "react";

export type VMStatus = "running" | "stopped" | "paused";

export interface VirtualMachine {
  id: string;
  name: string;
  os: string;
  status: VMStatus;
  cpuAllocation: number; // percentage
  memoryAllocation: number; // GB
  memoryUsage: number; // percentage of allocated
  storageUsage: number; // GB
  uptime: string;
  cpuUsage: number; // percentage of allocated
}

export interface LogEntry {
  id: string;
  timestamp: string;
  type: "info" | "warning" | "error";
  message: string;
}

interface VMContextType {
  vms: VirtualMachine[];
  selectedVM: VirtualMachine | null;
  logs: LogEntry[];
  setSelectedVM: (vm: VirtualMachine | null) => void;
  startVM: (id: string) => void;
  stopVM: (id: string) => void;
  pauseVM: (id: string) => void;
  deleteVM: (id: string) => void;
  createVM: (vm: Omit<VirtualMachine, "id" | "uptime" | "status">) => void;
  startAllVMs: () => void;
  stopAllVMs: () => void;
  updateVMResources: (id: string, cpu: number, memory: number) => void;
}

const VMContext = createContext<VMContextType | undefined>(undefined);

const initialVMs: VirtualMachine[] = [
  {
    id: "vm-1",
    name: "Ubuntu-WebServer-01",
    os: "Ubuntu 22.04 LTS",
    status: "running",
    cpuAllocation: 25,
    memoryAllocation: 8,
    memoryUsage: 65,
    storageUsage: 45.2,
    uptime: "3d 14h 22m",
    cpuUsage: 42,
  },
  {
    id: "vm-2",
    name: "Windows-DevEnv",
    os: "Windows Server 2022",
    status: "running",
    cpuAllocation: 40,
    memoryAllocation: 16,
    memoryUsage: 78,
    storageUsage: 127.8,
    uptime: "1d 8h 45m",
    cpuUsage: 68,
  },
  {
    id: "vm-3",
    name: "CentOS-Database",
    os: "CentOS 8",
    status: "stopped",
    cpuAllocation: 30,
    memoryAllocation: 12,
    memoryUsage: 0,
    storageUsage: 89.5,
    uptime: "0h 0m",
    cpuUsage: 0,
  },
  {
    id: "vm-4",
    name: "Debian-TestEnv",
    os: "Debian 11",
    status: "paused",
    cpuAllocation: 20,
    memoryAllocation: 4,
    memoryUsage: 45,
    storageUsage: 28.3,
    uptime: "12h 15m",
    cpuUsage: 15,
  },
  {
    id: "vm-5",
    name: "Fedora-ML-Workstation",
    os: "Fedora 38",
    status: "running",
    cpuAllocation: 50,
    memoryAllocation: 32,
    memoryUsage: 88,
    storageUsage: 256.7,
    uptime: "7d 3h 11m",
    cpuUsage: 91,
  },
];

const initialLogs: LogEntry[] = [
  {
    id: "log-1",
    timestamp: new Date(Date.now() - 2 * 60000).toISOString(),
    type: "info",
    message: "VM 'Ubuntu-WebServer-01' CPU usage increased to 42%",
  },
  {
    id: "log-2",
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    type: "warning",
    message: "VM 'Fedora-ML-Workstation' memory usage is high (88%)",
  },
  {
    id: "log-3",
    timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
    type: "info",
    message: "VM 'Windows-DevEnv' started successfully",
  },
  {
    id: "log-4",
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
    type: "error",
    message: "Failed to allocate resources for VM 'CentOS-Database'",
  },
  {
    id: "log-5",
    timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
    type: "info",
    message: "Snapshot created for 'Ubuntu-WebServer-01'",
  },
];

export function VMProvider({ children }: { children: ReactNode }) {
  const [vms, setVMs] = useState<VirtualMachine[]>(initialVMs);
  const [selectedVM, setSelectedVM] = useState<VirtualMachine | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);

  const addLog = (type: LogEntry["type"], message: string) => {
    const newLog: LogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      type,
      message,
    };
    setLogs((prev) => [newLog, ...prev].slice(0, 100));
  };

  const startVM = (id: string) => {
    setVMs((prev) =>
      prev.map((vm) => {
        if (vm.id === id && vm.status !== "running") {
          addLog("info", `VM '${vm.name}' started successfully`);
          return { ...vm, status: "running" as VMStatus, uptime: "0h 0m" };
        }
        return vm;
      })
    );
  };

  const stopVM = (id: string) => {
    setVMs((prev) =>
      prev.map((vm) => {
        if (vm.id === id && vm.status !== "stopped") {
          addLog("info", `VM '${vm.name}' stopped`);
          return {
            ...vm,
            status: "stopped" as VMStatus,
            uptime: "0h 0m",
            cpuUsage: 0,
            memoryUsage: 0,
          };
        }
        return vm;
      })
    );
  };

  const pauseVM = (id: string) => {
    setVMs((prev) =>
      prev.map((vm) => {
        if (vm.id === id && vm.status === "running") {
          addLog("info", `VM '${vm.name}' paused`);
          return { ...vm, status: "paused" as VMStatus };
        }
        return vm;
      })
    );
  };

  const deleteVM = (id: string) => {
    const vm = vms.find((v) => v.id === id);
    if (vm) {
      addLog("warning", `VM '${vm.name}' deleted`);
      setVMs((prev) => prev.filter((v) => v.id !== id));
      if (selectedVM?.id === id) {
        setSelectedVM(null);
      }
    }
  };

  const createVM = (vmData: Omit<VirtualMachine, "id" | "uptime" | "status">) => {
    const newVM: VirtualMachine = {
      ...vmData,
      id: `vm-${Date.now()}`,
      status: "stopped",
      uptime: "0h 0m",
    };
    setVMs((prev) => [...prev, newVM]);
    addLog("info", `VM '${newVM.name}' created successfully`);
  };

  const startAllVMs = () => {
    setVMs((prev) =>
      prev.map((vm) => {
        if (vm.status !== "running") {
          addLog("info", `VM '${vm.name}' started`);
          return { ...vm, status: "running" as VMStatus, uptime: "0h 0m" };
        }
        return vm;
      })
    );
  };

  const stopAllVMs = () => {
    setVMs((prev) =>
      prev.map((vm) => {
        if (vm.status !== "stopped") {
          addLog("info", `VM '${vm.name}' stopped`);
          return {
            ...vm,
            status: "stopped" as VMStatus,
            uptime: "0h 0m",
            cpuUsage: 0,
            memoryUsage: 0,
          };
        }
        return vm;
      })
    );
  };

  const updateVMResources = (id: string, cpu: number, memory: number) => {
    setVMs((prev) =>
      prev.map((vm) => {
        if (vm.id === id) {
          addLog("info", `Resources updated for VM '${vm.name}'`);
          return {
            ...vm,
            cpuAllocation: cpu,
            memoryAllocation: memory,
          };
        }
        return vm;
      })
    );
  };

  return (
    <VMContext.Provider
      value={{
        vms,
        selectedVM,
        logs,
        setSelectedVM,
        startVM,
        stopVM,
        pauseVM,
        deleteVM,
        createVM,
        startAllVMs,
        stopAllVMs,
        updateVMResources,
      }}
    >
      {children}
    </VMContext.Provider>
  );
}

export function useVMContext() {
  const context = useContext(VMContext);
  if (context === undefined) {
    throw new Error("useVMContext must be used within a VMProvider");
  }
  return context;
}
