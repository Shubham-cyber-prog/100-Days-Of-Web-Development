import { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { TopNav } from './components/TopNav';
import { Sidebar } from './components/Sidebar';
import { UploadSection } from './components/UploadSection';
import { CameraSection } from './components/CameraSection';
import { ResultsPanel } from './components/ResultsPanel';
import { HistorySection } from './components/HistorySection';
import { SettingsPanel } from './components/SettingsPanel';
import { Dashboard } from './components/Dashboard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ModelLoading } from './components/ModelLoading';
import { AIBackground } from './components/AIBackground';
import { ExportButton } from './components/ExportButton';
import { ImageComparison } from './components/ImageComparison';
import { HistoryFilters } from './components/HistoryFilters';
import { ModelSelector } from './components/ModelSelector';
import { PerformanceAnalytics } from './components/PerformanceAnalytics';

interface Detection {
  label: string;
  confidence: number;
  color: string;
}

interface HistoryItem {
  id: string;
  timestamp: string;
  labels: string[];
  thumbnailUrl: string;
  detections?: Detection[];
}

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modelProgress, setModelProgress] = useState(0);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [detections, setDetections] = useState<Detection[]>([]);
  const [isDetecting, setIsDetecting] = useState(false);
  const [selectedModel, setSelectedModel] = useState('coco-ssd');
  const [showComparison, setShowComparison] = useState(false);
  const [processingTime, setProcessingTime] = useState(1200);
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: '1',
      timestamp: '2 hours ago',
      labels: ['Laptop', 'Keyboard', 'Mouse'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1737868131532-0efce8062b43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwbGFwdG9wfGVufDF8fHx8MTc3MTUxOTM2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      detections: [
        { label: 'Laptop', confidence: 0.94, color: '#06b6d4' },
        { label: 'Keyboard', confidence: 0.88, color: '#a855f7' },
        { label: 'Mouse', confidence: 0.85, color: '#ec4899' },
      ],
    },
    {
      id: '2',
      timestamp: '5 hours ago',
      labels: ['Building', 'City', 'Architecture'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1642287040066-2bd340523289?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5c2NhcGUlMjB1cmJhbiUyMG5pZ2h0fGVufDF8fHx8MTc3MTU2OTI4MXww&ixlib=rb-4.1.0&q=80&w=1080',
      detections: [
        { label: 'Building', confidence: 0.96, color: '#10b981' },
        { label: 'City', confidence: 0.91, color: '#f59e0b' },
        { label: 'Architecture', confidence: 0.87, color: '#8b5cf6' },
      ],
    },
    {
      id: '3',
      timestamp: '1 day ago',
      labels: ['Bird', 'Wildlife', 'Nature'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1599456671475-da8c5b91e52c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwd2lsZGxpZmUlMjBhbmltYWx8ZW58MXx8fHwxNzcxNjExODg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      detections: [
        { label: 'Bird', confidence: 0.97, color: '#06b6d4' },
        { label: 'Wildlife', confidence: 0.89, color: '#a855f7' },
        { label: 'Nature', confidence: 0.92, color: '#10b981' },
      ],
    },
  ]);
  const [filteredHistory, setFilteredHistory] = useState<HistoryItem[]>(history);

  // Simulate model loading on mount
  useEffect(() => {
    const loadModel = () => {
      const interval = setInterval(() => {
        setModelProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsModelLoaded(true);
              toast.success('AI Model Loaded Successfully', {
                description: 'TensorFlow.js is ready for image recognition',
              });
            }, 500);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
    };

    loadModel();
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleImageUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    setIsProcessing(true);

    toast.info('Processing Image', {
      description: 'Running AI detection...',
    });

    // Simulate AI processing with mock detections
    setTimeout(() => {
      const mockDetections: Detection[] = [
        { label: 'Person', confidence: 0.957, color: '#06b6d4' },
        { label: 'Laptop', confidence: 0.893, color: '#a855f7' },
        { label: 'Coffee Cup', confidence: 0.876, color: '#ec4899' },
        { label: 'Smartphone', confidence: 0.842, color: '#10b981' },
        { label: 'Book', confidence: 0.789, color: '#f59e0b' },
      ];

      setDetections(mockDetections);
      setIsProcessing(false);
      setActiveTab('Upload');

      // Add to history
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleString(),
        labels: mockDetections.slice(0, 3).map((d) => d.label),
        thumbnailUrl: imageUrl,
        detections: mockDetections,
      };

      setHistory((prev) => [newHistoryItem, ...prev]);

      toast.success('Detection Complete', {
        description: `Found ${mockDetections.length} objects with high confidence`,
      });
    }, processingTime);
  };

  const handleStartDetection = () => {
    setIsDetecting(!isDetecting);

    if (!isDetecting) {
      toast.info('Camera Started', {
        description: 'Real-time object detection active',
      });
    } else {
      toast.info('Camera Stopped', {
        description: 'Detection paused',
      });
    }
  };

  if (!isModelLoaded) {
    return <ModelLoading progress={modelProgress} />;
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <AIBackground />

      <div className="relative z-10 flex flex-col h-screen">
        {/* Top Navigation */}
        <TopNav
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onMenuToggle={handleMenuToggle}
        />

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <Sidebar
            activeTab={activeTab}
            onTabChange={handleTabChange}
            isOpen={sidebarOpen}
          />

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {activeTab === 'Home' && <Dashboard />}

              {activeTab === 'Upload' && (
                <div className="space-y-6">
                  <UploadSection onImageUpload={handleImageUpload} />
                  
                  {/* Export Buttons */}
                  {uploadedImage && detections.length > 0 && !isProcessing && (
                    <div className="flex justify-end">
                      <ExportButton
                        data={{
                          timestamp: new Date().toLocaleString(),
                          imageUrl: uploadedImage,
                          detections: detections,
                          modelUsed: selectedModel.toUpperCase(),
                          processingTime: processingTime,
                        }}
                      />
                    </div>
                  )}
                  
                  <ResultsPanel
                    imageUrl={uploadedImage}
                    detections={detections}
                    isProcessing={isProcessing}
                  />
                </div>
              )}

              {activeTab === 'Live Camera' && (
                <div className="space-y-6">
                  <CameraSection
                    onStartDetection={handleStartDetection}
                    isDetecting={isDetecting}
                  />
                  {isDetecting && (
                    <ResultsPanel
                      imageUrl={null}
                      detections={[
                        { label: 'Face', confidence: 0.942, color: '#06b6d4' },
                        { label: 'Hand', confidence: 0.887, color: '#a855f7' },
                      ]}
                      isProcessing={false}
                    />
                  )}
                </div>
              )}

              {activeTab === 'History' && (
                <div className="space-y-6">
                  {/* History Filters */}
                  <HistoryFilters
                    onFilterChange={(filters) => {
                      let filtered = [...history];

                      // Search filter
                      if (filters.searchQuery) {
                        filtered = filtered.filter(
                          (item) =>
                            item.labels.some((label) =>
                              label.toLowerCase().includes(filters.searchQuery.toLowerCase())
                            ) || item.timestamp.toLowerCase().includes(filters.searchQuery.toLowerCase())
                        );
                      }

                      // Label filter
                      if (filters.selectedLabels.length > 0) {
                        filtered = filtered.filter((item) =>
                          item.labels.some((label) => filters.selectedLabels.includes(label))
                        );
                      }

                      // Confidence filter
                      if (filters.minConfidence > 0) {
                        filtered = filtered.filter((item) =>
                          item.detections?.some(
                            (d) => d.confidence * 100 >= filters.minConfidence
                          )
                        );
                      }

                      setFilteredHistory(filtered);
                    }}
                    availableLabels={[
                      'Laptop',
                      'Person',
                      'Building',
                      'Bird',
                      'Nature',
                      'City',
                      'Wildlife',
                      'Coffee Cup',
                      'Book',
                    ]}
                  />

                  {/* Comparison Button */}
                  {filteredHistory.length >= 2 && (
                    <div className="flex justify-end">
                      <button
                        onClick={() => setShowComparison(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                          />
                        </svg>
                        Compare Images
                      </button>
                    </div>
                  )}

                  <HistorySection items={filteredHistory} />
                </div>
              )}

              {activeTab === 'Analytics' && <PerformanceAnalytics />}

              {activeTab === 'Settings' && (
                <div className="space-y-6">
                  <ModelSelector
                    selectedModel={selectedModel}
                    onModelChange={(modelId) => {
                      setSelectedModel(modelId);
                      toast.success('Model Changed', {
                        description: `Switched to ${modelId.toUpperCase()} model`,
                      });
                      // Update processing time based on model
                      const times: Record<string, number> = {
                        'coco-ssd': 1200,
                        'mobilenet-v2': 800,
                        'efficientnet': 2000,
                        'yolo-v5': 1000,
                      };
                      setProcessingTime(times[modelId] || 1200);
                    }}
                  />
                  <SettingsPanel />
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Loading Overlay */}
      {isProcessing && <LoadingSpinner />}

      {/* Image Comparison Modal */}
      {showComparison && (
        <ImageComparison
          images={filteredHistory
            .filter((item) => item.detections)
            .map((item) => ({
              id: item.id,
              url: item.thumbnailUrl,
              detections: item.detections || [],
              timestamp: item.timestamp,
            }))}
          onClose={() => setShowComparison(false)}
        />
      )}

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'bg-black/90 backdrop-blur-xl border border-purple-500/20 text-white',
        }}
      />

      {/* Custom Styles for Animations */}
      <style>{`
        @keyframes scan {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(400px);
          }
        }

        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
}