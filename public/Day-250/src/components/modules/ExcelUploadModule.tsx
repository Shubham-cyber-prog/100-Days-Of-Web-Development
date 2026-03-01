import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Alert, AlertDescription } from '../ui/alert';
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle, X, Download } from 'lucide-react';

const recentUploads = [
  { id: 1, filename: 'patient_data_2024.xlsx', uploadTime: '2 hours ago', status: 'Success', records: 1247 },
  { id: 2, filename: 'staff_schedule.xlsx', uploadTime: '1 day ago', status: 'Success', records: 89 },
  { id: 3, filename: 'inventory_report.xlsx', uploadTime: '2 days ago', status: 'Error', records: 0 },
  { id: 4, filename: 'appointment_data.xlsx', uploadTime: '3 days ago', status: 'Success', records: 456 },
];

const columnMappings = [
  { excelColumn: 'Patient Name', databaseField: 'patient_name', status: 'mapped' },
  { excelColumn: 'Date of Birth', databaseField: 'date_of_birth', status: 'mapped' },
  { excelColumn: 'Phone Number', databaseField: 'phone', status: 'mapped' },
  { excelColumn: 'Insurance ID', databaseField: 'insurance_id', status: 'mapped' },
  { excelColumn: 'Emergency Contact', databaseField: '', status: 'unmapped' },
];

export function ExcelUploadModule() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showMapping, setShowMapping] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      setShowMapping(true);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setShowMapping(true);
    }
  };

  const simulateUpload = () => {
    setUploadStatus('uploading');
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus('success');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Success':
        return <Badge className="bg-green-100 text-green-800">Success</Badge>;
      case 'Error':
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900">Excel Upload & Data Import</h2>
          <p className="text-gray-600">Upload Excel files and map columns to database fields</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <FileSpreadsheet className="h-4 w-4 mr-1" />
            {recentUploads.filter(u => u.status === 'Success').length} Successful Uploads
          </Badge>
        </div>
      </div>

      {/* Upload Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Uploads</p>
                <p className="text-2xl text-gray-900">{recentUploads.length}</p>
                <p className="text-sm text-green-600">This month</p>
              </div>
              <Upload className="h-8 w-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl text-gray-900">75%</p>
                <p className="text-sm text-green-600">3 of 4 successful</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Records Imported</p>
                <p className="text-2xl text-gray-900">1,792</p>
                <p className="text-sm text-blue-600">Total this month</p>
              </div>
              <FileSpreadsheet className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Failed Uploads</p>
                <p className="text-2xl text-gray-900">1</p>
                <p className="text-sm text-red-600">Needs attention</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Area */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Excel File</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                    <Upload className="h-8 w-8 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-gray-900">Drag & Drop Excel File Here</p>
                    <p className="text-sm text-gray-500">or click to browse files</p>
                  </div>
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button asChild className="bg-teal-600 hover:bg-teal-700">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      Choose File
                    </label>
                  </Button>
                </div>
              </div>

              {selectedFile && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileSpreadsheet className="h-5 w-5 text-green-600" />
                      <span className="text-gray-900">{selectedFile.name}</span>
                      <span className="text-sm text-gray-500">
                        ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedFile(null);
                        setShowMapping(false);
                        setUploadStatus('idle');
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {uploadStatus === 'uploading' && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Uploading...</span>
                    <span className="text-sm text-gray-600">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}

              {uploadStatus === 'success' && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    File uploaded successfully! 1,247 records have been imported.
                  </AlertDescription>
                </Alert>
              )}

              {uploadStatus === 'error' && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Upload failed. Please check the file format and try again.
                  </AlertDescription>
                </Alert>
              )}

              {selectedFile && uploadStatus === 'idle' && (
                <Button onClick={simulateUpload} className="w-full bg-teal-600 hover:bg-teal-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload File
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Column Mapping */}
        <Card>
          <CardHeader>
            <CardTitle>Column Mapping</CardTitle>
          </CardHeader>
          <CardContent>
            {showMapping ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Map Excel columns to database fields to ensure proper data import.
                </p>
                
                <div className="space-y-3">
                  {columnMappings.map((mapping, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{mapping.excelColumn}</p>
                      </div>
                      <div className="flex-1 px-4">
                        <Select defaultValue={mapping.databaseField}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select field" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="patient_name">Patient Name</SelectItem>
                            <SelectItem value="date_of_birth">Date of Birth</SelectItem>
                            <SelectItem value="phone">Phone Number</SelectItem>
                            <SelectItem value="insurance_id">Insurance ID</SelectItem>
                            <SelectItem value="emergency_contact">Emergency Contact</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex-shrink-0">
                        {mapping.status === 'mapped' ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-orange-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Save Mapping Configuration
                </Button>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileSpreadsheet className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Upload a file to configure column mappings</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Uploads */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Uploads</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Log
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentUploads.map((upload) => (
              <div key={upload.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileSpreadsheet className="h-8 w-8 text-teal-600" />
                  <div>
                    <p className="text-gray-900">{upload.filename}</p>
                    <p className="text-sm text-gray-600">{upload.uploadTime}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Records: {upload.records}</p>
                  </div>
                  {getStatusBadge(upload.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}