import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSimulation } from '../contexts/SimulationContext';
import { ProducerNode } from './ProducerNode';
import { QueueNode } from './QueueNode';
import { ConsumerNode } from './ConsumerNode';
import { ArrowRight } from 'lucide-react';

export function SimulationFlow() {
  const { producers, queues, consumers, messages, selectMessage } = useSimulation();
  const containerRef = useRef<HTMLDivElement>(null);

  // Group by queue
  const queueGroups = queues.map(queue => ({
    queue,
    producers: producers.filter(p => p.queueId === queue.id),
    consumers: consumers.filter(c => c.queueId === queue.id),
  }));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 mb-6 overflow-x-auto">
      <h2 className="text-lg font-semibold mb-6">Message Flow Visualization</h2>
      
      <div ref={containerRef} className="space-y-16 min-w-[1200px]">
        {queueGroups.map((group, groupIndex) => (
          <div key={group.queue.id} className="relative">
            {/* Grid background */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
              backgroundImage: `
                linear-gradient(to right, #cbd5e1 1px, transparent 1px),
                linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }} />

            {/* Flow layout */}
            <div className="relative">
              <div className="grid grid-cols-[minmax(280px,1fr)_80px_minmax(320px,1fr)_80px_minmax(280px,1fr)] gap-0 items-start">
                {/* Producers Column */}
                <div className="space-y-4 min-h-[200px] flex flex-col justify-center">
                  {group.producers.map(producer => (
                    <ProducerNode key={producer.id} producer={producer} />
                  ))}
                  {group.producers.length === 0 && (
                    <div className="bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-lg p-4 text-center text-slate-500 text-sm">
                      No producers
                    </div>
                  )}
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-center h-full">
                  <div className="relative">
                    <ArrowRight className="text-slate-600" size={32} />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                  </div>
                </div>

                {/* Queue Column */}
                <div className="flex items-center">
                  <QueueNode queue={group.queue} />
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-center h-full">
                  <div className="relative">
                    <ArrowRight className="text-slate-600" size={32} />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                  </div>
                </div>

                {/* Consumers Column */}
                <div className="space-y-4 min-h-[200px] flex flex-col justify-center">
                  {group.consumers.map(consumer => (
                    <ConsumerNode key={consumer.id} consumer={consumer} />
                  ))}
                  {group.consumers.length === 0 && (
                    <div className="bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-lg p-4 text-center text-slate-500 text-sm">
                      No consumers
                    </div>
                  )}
                </div>
              </div>

              {/* Animated Messages Layer */}
              <div className="absolute inset-0 pointer-events-none">
                <AnimatePresence mode="popLayout">
                  {messages
                    .filter(msg => msg.queueId === group.queue.id)
                    .map(message => {
                      // Calculate position based on message status
                      let xPosition = '10%';
                      let yPosition = '50%';
                      
                      if (message.status === 'queued') {
                        xPosition = '45%';
                        yPosition = '50%';
                      } else if (message.status === 'processing') {
                        xPosition = '75%';
                        yPosition = '50%';
                      } else if (message.status === 'completed') {
                        xPosition = '90%';
                        yPosition = '50%';
                      }

                      const statusColors = {
                        queued: 'from-cyan-400 to-blue-500',
                        processing: 'from-yellow-400 to-orange-500',
                        completed: 'from-green-400 to-emerald-500',
                      };

                      const statusShadows = {
                        queued: '0 4px 20px rgba(6, 182, 212, 0.6)',
                        processing: '0 4px 20px rgba(251, 191, 36, 0.6)',
                        completed: '0 4px 20px rgba(52, 211, 153, 0.6)',
                      };

                      return (
                        <motion.div
                          key={message.id}
                          initial={{ 
                            opacity: 0, 
                            scale: 0.3,
                            left: '5%',
                            top: '50%',
                          }}
                          animate={{ 
                            opacity: 1, 
                            scale: 1,
                            left: xPosition,
                            top: yPosition,
                          }}
                          exit={{ 
                            opacity: 0, 
                            scale: 0.3,
                          }}
                          transition={{ 
                            duration: 0.6, 
                            ease: [0.43, 0.13, 0.23, 0.96],
                            opacity: { duration: 0.3 }
                          }}
                          onClick={() => selectMessage(message)}
                          className={`absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto`}
                          style={{ 
                            zIndex: 20
                          }}
                        >
                          <div 
                            className={`w-12 h-12 bg-gradient-to-br ${statusColors[message.status]} rounded-lg shadow-lg cursor-pointer hover:scale-110 transition-transform flex items-center justify-center text-white font-bold text-sm relative`}
                            style={{ 
                              boxShadow: statusShadows[message.status],
                            }}
                          >
                            <span className="drop-shadow-lg">M</span>
                            {/* Pulse ring effect */}
                            <motion.div
                              className="absolute inset-0 rounded-lg border-2 border-white"
                              initial={{ opacity: 0.6, scale: 1 }}
                              animate={{ opacity: 0, scale: 1.5 }}
                              transition={{ 
                                duration: 1.5, 
                                repeat: Infinity,
                                ease: "easeOut"
                              }}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                </AnimatePresence>
              </div>
            </div>
          </div>
        ))}

        {queueGroups.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No queues configured. Create a queue to get started.
          </div>
        )}
      </div>
    </div>
  );
}