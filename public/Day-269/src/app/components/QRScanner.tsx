import { useState } from 'react';
import { QrCode, Camera, CheckCircle, XCircle } from 'lucide-react';
import { students } from '../data/mockData';

interface QRScannerProps {
  onClose: () => void;
}

export function QRScanner({ onClose }: QRScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [scannedStudents, setScannedStudents] = useState<string[]>([]);

  const handleScan = () => {
    setScanning(true);
    
    // Simulate QR code scanning
    setTimeout(() => {
      const randomStudent = students[Math.floor(Math.random() * students.length)];
      if (!scannedStudents.includes(randomStudent.id)) {
        setScannedStudents([...scannedStudents, randomStudent.id]);
      }
      setScanning(false);
    }, 1500);
  };

  const getScannedStudent = (id: string) => students.find((s) => s.id === id);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-green-500 p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <QrCode className="w-8 h-8" />
              <h2 className="text-2xl font-semibold">QR Code Scanner</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>
          <p className="text-blue-50">Scan student QR codes for instant attendance marking</p>
        </div>

        <div className="p-6">
          {/* Scanner Area */}
          <div className="mb-6">
            <div className="relative bg-slate-900 rounded-xl aspect-video flex items-center justify-center overflow-hidden">
              {scanning ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 border-4 border-blue-500 rounded-lg animate-pulse">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500 animate-scan" />
                  </div>
                </div>
              ) : (
                <div className="text-center p-8">
                  <Camera className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">Camera feed would appear here</p>
                </div>
              )}
              
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                <p className="text-sm font-medium text-slate-900">
                  Scanned: {scannedStudents.length}
                </p>
              </div>
            </div>

            <button
              onClick={handleScan}
              disabled={scanning}
              className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-green-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <QrCode className="w-5 h-5" />
              {scanning ? 'Scanning...' : 'Start Scanning'}
            </button>
          </div>

          {/* Scanned Students List */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Scanned Students ({scannedStudents.length})
            </h3>
            <div className="max-h-64 overflow-y-auto space-y-2">
              {scannedStudents.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  No students scanned yet
                </div>
              ) : (
                scannedStudents.map((id) => {
                  const student = getScannedStudent(id);
                  if (!student) return null;

                  return (
                    <div
                      key={id}
                      className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={student.profilePhoto}
                          alt={student.name}
                          className="w-10 h-10 rounded-full border-2 border-white"
                        />
                        <div>
                          <p className="font-medium text-slate-900">{student.name}</p>
                          <p className="text-xs text-slate-600">
                            {student.rollNumber} • {student.class}
                          </p>
                        </div>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="flex gap-3 mt-6 pt-6 border-t border-slate-200">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert(`Attendance saved for ${scannedStudents.length} students!`);
                onClose();
              }}
              disabled={scannedStudents.length === 0}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-green-600 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Attendance
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% {
            top: 0;
          }
          100% {
            top: 100%;
          }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
}
