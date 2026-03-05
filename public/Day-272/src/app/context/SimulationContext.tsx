import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { FirewallRule, Packet, LogEntry, SimulationState, PacketStatus } from "../types";

interface SimulationContextType extends SimulationState {
  rules: FirewallRule[];
  selectedPacket: Packet | null;
  setRules: React.Dispatch<React.SetStateAction<FirewallRule[]>>;
  setSelectedPacket: (packet: Packet | null) => void;
  startSimulation: () => void;
  pauseSimulation: () => void;
  stepSimulation: () => void;
  resetSimulation: () => void;
  setSpeed: (speed: number) => void;
  addRule: (rule: FirewallRule) => void;
  updateRule: (id: string, updates: Partial<FirewallRule>) => void;
  deleteRule: (id: string) => void;
  toggleRule: (id: string) => void;
  reorderRules: (rules: FirewallRule[]) => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

const defaultRules: FirewallRule[] = [
  {
    id: "rule-1",
    sourceIP: "192.168.1.0/24",
    destinationIP: "10.0.0.5",
    port: "80",
    protocol: "HTTP",
    action: "allow",
    priority: 1,
    enabled: true,
  },
  {
    id: "rule-2",
    sourceIP: "0.0.0.0/0",
    destinationIP: "10.0.0.5",
    port: "22",
    protocol: "TCP",
    action: "deny",
    priority: 2,
    enabled: true,
  },
  {
    id: "rule-3",
    sourceIP: "192.168.1.0/24",
    destinationIP: "10.0.0.10",
    port: "443",
    protocol: "HTTPS",
    action: "allow",
    priority: 3,
    enabled: true,
  },
  {
    id: "rule-4",
    sourceIP: "172.16.0.0/16",
    destinationIP: "10.0.0.0/24",
    port: "*",
    protocol: "ICMP",
    action: "allow",
    priority: 4,
    enabled: true,
  },
];

const generateRandomIP = () => {
  return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
};

const protocols: Array<"TCP" | "UDP" | "ICMP" | "HTTP" | "HTTPS"> = ["TCP", "UDP", "ICMP", "HTTP", "HTTPS"];

export function SimulationProvider({ children }: { children: React.ReactNode }) {
  const [rules, setRules] = useState<FirewallRule[]>(defaultRules);
  const [packets, setPackets] = useState<Packet[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [selectedPacket, setSelectedPacket] = useState<Packet | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(5);
  
  const intervalRef = useRef<number>();
  const packetCounterRef = useRef(0);

  const addLog = useCallback((type: LogEntry["type"], message: string, packetId?: string, ruleId?: string) => {
    const log: LogEntry = {
      id: `log-${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
      type,
      message,
      packetId,
      ruleId,
    };
    setLogs((prev) => [log, ...prev].slice(0, 100)); // Keep last 100 logs
  }, []);

  const matchPacketToRule = useCallback((packet: Packet): { rule: FirewallRule | null; status: PacketStatus } => {
    // Find first enabled rule that matches
    for (const rule of rules) {
      if (!rule.enabled) continue;

      // Simple matching logic (in real firewall, this would be more complex)
      const portMatches = rule.port === "*" || rule.port === String(packet.port);
      const protocolMatches = rule.protocol === packet.protocol;

      if (portMatches && protocolMatches) {
        return {
          rule,
          status: rule.action === "allow" ? "allowed" : "blocked",
        };
      }
    }

    // Default deny if no rule matches
    return { rule: null, status: "blocked" };
  }, [rules]);

  const generatePacket = useCallback(() => {
    const protocol = protocols[Math.floor(Math.random() * protocols.length)];
    const port = protocol === "HTTP" ? 80 : protocol === "HTTPS" ? 443 : protocol === "ICMP" ? 0 : Math.floor(Math.random() * 65535);
    
    const newPacket: Packet = {
      id: `packet-${++packetCounterRef.current}`,
      sourceIP: generateRandomIP(),
      destinationIP: `10.0.0.${Math.floor(Math.random() * 20) + 1}`,
      port,
      protocol,
      status: "pending",
      timestamp: Date.now(),
      position: 0,
    };

    setPackets((prev) => [...prev, newPacket]);
    addLog("received", `Packet received from ${newPacket.sourceIP}:${newPacket.port}`, newPacket.id);

    return newPacket;
  }, [addLog]);

  const updatePacketStatus = useCallback((packetId: string) => {
    setPackets((prev) =>
      prev.map((p) => {
        if (p.id === packetId && p.status === "pending") {
          const { rule, status } = matchPacketToRule(p);
          
          if (rule) {
            addLog("matched", `Packet matched rule ${rule.id} (${rule.action})`, p.id, rule.id);
          }
          
          if (status === "blocked") {
            addLog("blocked", `Packet blocked from ${p.sourceIP}:${p.port}`, p.id);
          } else {
            addLog("forwarded", `Packet forwarded to ${p.destinationIP}:${p.port}`, p.id);
          }

          return {
            ...p,
            status,
            matchedRule: rule?.id,
          };
        }
        return p;
      })
    );
  }, [matchPacketToRule, addLog]);

  // Animation loop
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      // Generate new packet occasionally
      if (Math.random() < 0.3) {
        generatePacket();
      }

      // Update packet positions
      setPackets((prev) =>
        prev.map((p) => {
          const newPosition = p.position + (speed / 2);
          
          // Evaluate packet at firewall (position 50)
          if (p.position < 50 && newPosition >= 50 && p.status === "pending") {
            setTimeout(() => updatePacketStatus(p.id), 0);
          }

          // Remove packets that have completed their journey
          if (newPosition > 100) {
            return { ...p, position: 101 }; // Mark for removal
          }

          return { ...p, position: newPosition };
        }).filter((p) => p.position <= 100)
      );
    }, 100);

    intervalRef.current = interval;

    return () => clearInterval(interval);
  }, [isRunning, speed, generatePacket, updatePacketStatus]);

  const startSimulation = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pauseSimulation = useCallback(() => {
    setIsRunning(false);
  }, []);

  const stepSimulation = useCallback(() => {
    generatePacket();
  }, [generatePacket]);

  const resetSimulation = useCallback(() => {
    setIsRunning(false);
    setPackets([]);
    setLogs([]);
    setSelectedPacket(null);
    packetCounterRef.current = 0;
  }, []);

  const addRule = useCallback((rule: FirewallRule) => {
    setRules((prev) => [...prev, rule]);
  }, []);

  const updateRule = useCallback((id: string, updates: Partial<FirewallRule>) => {
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, ...updates } : r)));
  }, []);

  const deleteRule = useCallback((id: string) => {
    setRules((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const toggleRule = useCallback((id: string) => {
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)));
  }, []);

  const reorderRules = useCallback((newRules: FirewallRule[]) => {
    setRules(newRules.map((rule, index) => ({ ...rule, priority: index + 1 })));
  }, []);

  return (
    <SimulationContext.Provider
      value={{
        rules,
        packets,
        logs,
        selectedPacket,
        isRunning,
        speed,
        setRules,
        setSelectedPacket,
        startSimulation,
        pauseSimulation,
        stepSimulation,
        resetSimulation,
        setSpeed,
        addRule,
        updateRule,
        deleteRule,
        toggleRule,
        reorderRules,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error("useSimulation must be used within SimulationProvider");
  }
  return context;
}
