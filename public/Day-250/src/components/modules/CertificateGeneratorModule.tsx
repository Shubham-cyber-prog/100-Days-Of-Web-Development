import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { 
  Award, 
  Download, 
  Eye, 
  Search, 
  Filter,
  FileText,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';

interface Certificate {
  id: string;
  traineeName: string;
  course: string;
  completionDate: string;
  certificateNumber: string;
  status: 'issued' | 'pending' | 'revoked';
  grade: string;
  issueDate: string;
}

const sampleCertificates: Certificate[] = [
  {
    id: '1',
    traineeName: 'Dr. Ali Hassan',
    course: 'Advanced Cardiology',
    completionDate: '2024-02-15',
    certificateNumber: 'CERT-2024-001',
    status: 'issued',
    grade: 'A',
    issueDate: '2024-02-20'
  },
  {
    id: '2',
    traineeName: 'Dr. Fatima Khan',
    course: 'Emergency Medicine',
    completionDate: '2024-02-18',
    certificateNumber: 'CERT-2024-002',
    status: 'issued',
    grade: 'A+',
    issueDate: '2024-02-22'
  },
  {
    id: '3',
    traineeName: 'Dr. Ahmed Raza',
    course: 'Pediatric Care',
    completionDate: '2024-02-20',
    certificateNumber: 'CERT-2024-003',
    status: 'pending',
    grade: 'B+',
    issueDate: ''
  },
  {
    id: '4',
    traineeName: 'Dr. Sarah Ali',
    course: 'Diagnostic Imaging',
    completionDate: '2024-02-10',
    certificateNumber: 'CERT-2024-004',
    status: 'issued',
    grade: 'A',
    issueDate: '2024-02-15'
  },
  {
    id: '5',
    traineeName: 'Dr. Imran Malik',
    course: 'Patient Care',
    completionDate: '2024-02-05',
    certificateNumber: 'CERT-2024-005',
    status: 'issued',
    grade: 'A+',
    issueDate: '2024-02-10'
  },
];

export function CertificateGeneratorModule() {
  const [certificates, setCertificates] = useState<Certificate[]>(sampleCertificates);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.traineeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.certificateNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || cert.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handlePreview = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setPreviewOpen(true);
  };

  const handleDownload = (certificate: Certificate) => {
    console.log('Downloading certificate:', certificate.certificateNumber);
    // In real implementation, this would generate and download a PDF certificate
  };

  const handleIssueCertificate = (id: string) => {
    setCertificates(certificates.map(cert => 
      cert.id === id 
        ? { ...cert, status: 'issued' as const, issueDate: new Date().toISOString().split('T')[0] }
        : cert
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'issued': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'revoked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900">Certificate Generator</h1>
          <p className="text-sm text-gray-600 mt-1">Manage and generate professional training certificates</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Award className="h-4 w-4 mr-2" />
          Generate New Certificate
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Certificates</p>
                <p className="text-2xl text-gray-900">{certificates.length}</p>
              </div>
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Issued</p>
                <p className="text-2xl text-gray-900">
                  {certificates.filter(c => c.status === 'issued').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl text-gray-900">
                  {certificates.filter(c => c.status === 'pending').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl text-gray-900">12</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by trainee name, course, or certificate number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="issued">Issued</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="revoked">Revoked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Certificates Table */}
      <Card>
        <CardHeader>
          <CardTitle>Certificates</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Certificate #</TableHead>
                <TableHead>Trainee Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Completion Date</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCertificates.map((certificate) => (
                <TableRow key={certificate.id}>
                  <TableCell className="font-mono text-sm">{certificate.certificateNumber}</TableCell>
                  <TableCell>{certificate.traineeName}</TableCell>
                  <TableCell>{certificate.course}</TableCell>
                  <TableCell>{new Date(certificate.completionDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge className="bg-purple-100 text-purple-800">{certificate.grade}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(certificate.status)}>
                      {certificate.status.charAt(0).toUpperCase() + certificate.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {certificate.issueDate 
                      ? new Date(certificate.issueDate).toLocaleDateString() 
                      : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePreview(certificate)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {certificate.status === 'issued' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownload(certificate)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                      {certificate.status === 'pending' && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-teal-600 border-teal-600 hover:bg-teal-50"
                          onClick={() => handleIssueCertificate(certificate.id)}
                        >
                          Issue
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Certificate Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Certificate Preview</DialogTitle>
            <DialogDescription>
              Preview of training completion certificate
            </DialogDescription>
          </DialogHeader>
          
          {selectedCertificate && (
            <div className="border-4 border-teal-600 rounded-lg p-8 bg-gradient-to-br from-white to-teal-50">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center">
                    <Award className="h-12 w-12 text-white" />
                  </div>
                </div>
                
                <div>
                  <h2 className="text-3xl text-teal-800 mb-2">Certificate of Completion</h2>
                  <p className="text-sm text-gray-600">Medical Training Consultancy Network</p>
                </div>

                <div className="border-t-2 border-b-2 border-teal-200 py-6">
                  <p className="text-sm text-gray-600 mb-2">This is to certify that</p>
                  <h3 className="text-2xl text-gray-900 mb-4">{selectedCertificate.traineeName}</h3>
                  <p className="text-sm text-gray-600 mb-2">has successfully completed the training program</p>
                  <h4 className="text-xl text-teal-600 mb-4">{selectedCertificate.course}</h4>
                  <p className="text-sm text-gray-600">
                    with grade <span className="text-gray-900 font-semibold">{selectedCertificate.grade}</span>
                  </p>
                </div>

                <div className="flex justify-between items-end text-sm">
                  <div className="text-left">
                    <p className="text-gray-600">Completion Date</p>
                    <p className="text-gray-900">{new Date(selectedCertificate.completionDate).toLocaleDateString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600">Certificate Number</p>
                    <p className="text-gray-900 font-mono">{selectedCertificate.certificateNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600">Issue Date</p>
                    <p className="text-gray-900">
                      {selectedCertificate.issueDate 
                        ? new Date(selectedCertificate.issueDate).toLocaleDateString() 
                        : 'Pending'}
                    </p>
                  </div>
                </div>

                <div className="flex justify-center space-x-16 pt-6">
                  <div className="text-center">
                    <div className="border-t-2 border-gray-400 w-40 mb-2"></div>
                    <p className="text-xs text-gray-600">Program Director</p>
                  </div>
                  <div className="text-center">
                    <div className="border-t-2 border-gray-400 w-40 mb-2"></div>
                    <p className="text-xs text-gray-600">Authorized Signature</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewOpen(false)}>
              Close
            </Button>
            {selectedCertificate?.status === 'issued' && (
              <Button 
                className="bg-teal-600 hover:bg-teal-700"
                onClick={() => selectedCertificate && handleDownload(selectedCertificate)}
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
