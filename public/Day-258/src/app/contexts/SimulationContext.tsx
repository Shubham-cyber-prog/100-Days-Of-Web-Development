import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type MessageStatus = 'queued' | 'processing' | 'completed';

export interface Message {
  id: string;
  producerId: string;
  queueId: string;
  consumerId?: string;
  content: string;
  status: MessageStatus;
  timestamp: number;
  queuedAt?: number;
  processingAt?: number;
  completedAt?: number;
  position?: { x: number; y: number };
}

export interface Producer {
  id: string;
  name: string;
  queueId: string;
  status: 'active' | 'idle';
  messagesProduced: number;
  rate: number; // messages per second
}

export interface Queue {
  id: string;
  name: string;
  messagesInQueue: number;
  messagesProcessed: number;
  processingRate: number;
  status: 'normal' | 'overloaded' | 'idle';
}

export interface Consumer {
  id: string;
  name: string;
  queueId: string;
  status: 'active' | 'idle' | 'processing';
  messagesConsumed: number;
  processingTime: number; // milliseconds
}

export interface LogEntry {
  id: string;
  timestamp: number;
  type: 'produced' | 'queued' | 'consumed';
  message: string;
  messageId: string;
}

interface SimulationContextType {
  isRunning: boolean;
  speed: number;
  producers: Producer[];
  queues: Queue[];
  consumers: Consumer[];
  messages: Message[];
  logs: LogEntry[];
  selectedMessage: Message | null;
  startSimulation: () => void;
  pauseSimulation: () => void;
  resetSimulation: () => void;
  setSpeed: (speed: number) => void;
  addProducer: (producer: Omit<Producer, 'id' | 'messagesProduced' | 'status'>) => void;
  addQueue: (queue: Omit<Queue, 'id' | 'messagesInQueue' | 'messagesProcessed' | 'processingRate' | 'status'>) => void;
  addConsumer: (consumer: Omit<Consumer, 'id' | 'messagesConsumed' | 'status'>) => void;
  removeProducer: (id: string) => void;
  removeQueue: (id: string) => void;
  removeConsumer: (id: string) => void;
  selectMessage: (message: Message | null) => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export function SimulationProvider({ children }: { children: React.ReactNode }) {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [producers, setProducers] = useState<Producer[]>([]);
  const [queues, setQueues] = useState<Queue[]>([]);
  const [consumers, setConsumers] = useState<Consumer[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  // Initialize with default data
  useEffect(() => {
    const defaultQueue: Queue = {
      id: 'queue-1',
      name: 'Default Queue',
      messagesInQueue: 0,
      messagesProcessed: 0,
      processingRate: 0,
      status: 'idle',
    };

    const defaultProducer: Producer = {
      id: 'producer-1',
      name: 'Producer 1',
      queueId: 'queue-1',
      status: 'idle',
      messagesProduced: 0,
      rate: 0.5,
    };

    const defaultConsumer: Consumer = {
      id: 'consumer-1',
      name: 'Consumer 1',
      queueId: 'queue-1',
      status: 'idle',
      messagesConsumed: 0,
      processingTime: 2000,
    };

    setQueues([defaultQueue]);
    setProducers([defaultProducer]);
    setConsumers([defaultConsumer]);
  }, []);

  const addLog = useCallback((type: LogEntry['type'], message: string, messageId: string) => {
    const newLog: LogEntry = {
      id: `log-${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
      type,
      message,
      messageId,
    };
    setLogs((prev) => [newLog, ...prev].slice(0, 100)); // Keep last 100 logs
  }, []);

  // Simulation logic
  useEffect(() => {
    if (!isRunning) return;

    const baseInterval = 1000 / speed;

    // Producer interval - create messages
    const producerInterval = setInterval(() => {
      producers.forEach((producer) => {
        if (Math.random() < producer.rate * speed) {
          const messageId = `msg-${Date.now()}-${Math.random()}`;
          const newMessage: Message = {
            id: messageId,
            producerId: producer.id,
            queueId: producer.queueId,
            content: `Message from ${producer.name}`,
            status: 'queued',
            timestamp: Date.now(),
            queuedAt: Date.now(),
          };

          setMessages((prev) => [...prev, newMessage]);
          setProducers((prev) =>
            prev.map((p) =>
              p.id === producer.id
                ? { ...p, messagesProduced: p.messagesProduced + 1, status: 'active' }
                : p
            )
          );
          setQueues((prev) =>
            prev.map((q) =>
              q.id === producer.queueId
                ? { ...q, messagesInQueue: q.messagesInQueue + 1, status: 'normal' }
                : q
            )
          );
          addLog('produced', `${producer.name} produced ${messageId}`, messageId);
        }
      });
    }, baseInterval);

    // Consumer interval - process messages
    const consumerInterval = setInterval(() => {
      consumers.forEach((consumer) => {
        // Find queued messages for this consumer's queue
        setMessages((prevMessages) => {
          const queuedMessages = prevMessages.filter(
            (m) => m.queueId === consumer.queueId && m.status === 'queued'
          );

          if (queuedMessages.length > 0 && consumer.status !== 'processing') {
            const messageToProcess = queuedMessages[0];

            // Mark consumer as processing
            setConsumers((prev) =>
              prev.map((c) => (c.id === consumer.id ? { ...c, status: 'processing' } : c))
            );

            // Update message to processing
            const updatedMessages = prevMessages.map((m) =>
              m.id === messageToProcess.id
                ? { ...m, status: 'processing' as MessageStatus, processingAt: Date.now(), consumerId: consumer.id }
                : m
            );

            // Update queue
            setQueues((prev) =>
              prev.map((q) =>
                q.id === consumer.queueId
                  ? { ...q, messagesInQueue: Math.max(0, q.messagesInQueue - 1) }
                  : q
              )
            );

            addLog('consumed', `${consumer.name} started processing ${messageToProcess.id}`, messageToProcess.id);

            // Complete after processing time
            setTimeout(() => {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === messageToProcess.id
                    ? { ...m, status: 'completed' as MessageStatus, completedAt: Date.now() }
                    : m
                )
              );

              setConsumers((prev) =>
                prev.map((c) =>
                  c.id === consumer.id
                    ? { ...c, status: 'active', messagesConsumed: c.messagesConsumed + 1 }
                    : c
                )
              );

              setQueues((prev) =>
                prev.map((q) =>
                  q.id === consumer.queueId
                    ? { ...q, messagesProcessed: q.messagesProcessed + 1 }
                    : q
                )
              );

              // Remove completed messages after a delay
              setTimeout(() => {
                setMessages((prev) => prev.filter((m) => m.id !== messageToProcess.id));
              }, 1000);
            }, consumer.processingTime / speed);

            return updatedMessages;
          }

          return prevMessages;
        });
      });
    }, baseInterval / 2);

    return () => {
      clearInterval(producerInterval);
      clearInterval(consumerInterval);
    };
  }, [isRunning, speed, producers, consumers, addLog]);

  const startSimulation = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pauseSimulation = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resetSimulation = useCallback(() => {
    setIsRunning(false);
    setMessages([]);
    setLogs([]);
    setSelectedMessage(null);
    setProducers((prev) =>
      prev.map((p) => ({ ...p, messagesProduced: 0, status: 'idle' as const }))
    );
    setConsumers((prev) =>
      prev.map((c) => ({ ...c, messagesConsumed: 0, status: 'idle' as const }))
    );
    setQueues((prev) =>
      prev.map((q) => ({
        ...q,
        messagesInQueue: 0,
        messagesProcessed: 0,
        processingRate: 0,
        status: 'idle' as const,
      }))
    );
  }, []);

  const addProducer = useCallback((producer: Omit<Producer, 'id' | 'messagesProduced' | 'status'>) => {
    const newProducer: Producer = {
      ...producer,
      id: `producer-${Date.now()}`,
      messagesProduced: 0,
      status: 'idle',
    };
    setProducers((prev) => [...prev, newProducer]);
  }, []);

  const addQueue = useCallback((queue: Omit<Queue, 'id' | 'messagesInQueue' | 'messagesProcessed' | 'processingRate' | 'status'>) => {
    const newQueue: Queue = {
      ...queue,
      id: `queue-${Date.now()}`,
      messagesInQueue: 0,
      messagesProcessed: 0,
      processingRate: 0,
      status: 'idle',
    };
    setQueues((prev) => [...prev, newQueue]);
  }, []);

  const addConsumer = useCallback((consumer: Omit<Consumer, 'id' | 'messagesConsumed' | 'status'>) => {
    const newConsumer: Consumer = {
      ...consumer,
      id: `consumer-${Date.now()}`,
      messagesConsumed: 0,
      status: 'idle',
    };
    setConsumers((prev) => [...prev, newConsumer]);
  }, []);

  const removeProducer = useCallback((id: string) => {
    setProducers((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const removeQueue = useCallback((id: string) => {
    setQueues((prev) => prev.filter((q) => q.id !== id));
  }, []);

  const removeConsumer = useCallback((id: string) => {
    setConsumers((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const selectMessage = useCallback((message: Message | null) => {
    setSelectedMessage(message);
  }, []);

  return (
    <SimulationContext.Provider
      value={{
        isRunning,
        speed,
        producers,
        queues,
        consumers,
        messages,
        logs,
        selectedMessage,
        startSimulation,
        pauseSimulation,
        resetSimulation,
        setSpeed,
        addProducer,
        addQueue,
        addConsumer,
        removeProducer,
        removeQueue,
        removeConsumer,
        selectMessage,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
}
