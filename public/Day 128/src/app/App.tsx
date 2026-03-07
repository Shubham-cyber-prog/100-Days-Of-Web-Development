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
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: '1',
      timestamp: '2 hours ago',
      labels: ['Laptop', 'Keyboard', 'Mouse'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1737868131532-0efce8062b43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwbGFwdG9wfGVufDF8fHx8MTc3MTUxOTM2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '2',
      timestamp: '5 hours ago',
      labels: ['Building', 'City', 'Architecture'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1642287040066-2bd340523289?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5c2NhcGUlMjB1cmJhbiUyMG5pZ2h0fGVufDF8fHx8MTc3MTU2OTI4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '3',
      timestamp: '1 day ago',
      labels: ['Bird', 'Wildlife', 'Nature'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1599456671475-da8c5b91e52c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwd2lsZGxpZmUlMjBhbmltYWx8ZW58MXx8fHwxNzcxNjExODg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ]);

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
      };

      setHistory((prev) => [newHistoryItem, ...prev]);

      toast.success('Detection Complete', {
        description: `Found ${mockDetections.length} objects with high confidence`,
      });
    }, 3000);
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

              {activeTab === 'History' && <HistorySection items={history} />}

              {activeTab === 'Settings' && <SettingsPanel />}
            </div>
          </main>
        </div>
      </div>

      {/* Loading Overlay */}
      {isProcessing && <LoadingSpinner />}

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