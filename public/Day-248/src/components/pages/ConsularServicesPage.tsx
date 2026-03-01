import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Alert, AlertDescription } from "../ui/alert";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { 
  CreditCard, 
  FileText, 
  Users, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Download,
  ExternalLink,
  Phone,
  Mail,
  Globe,
  MapPin
} from "lucide-react";
import { Page } from "../Router";

interface ConsularServicesPageProps {
  setCurrentPage: (page: Page) => void;
}

export function ConsularServicesPage({ setCurrentPage }: ConsularServicesPageProps) {
  const services = [
    {
      id: "passport",
      title: "Passport Services",
      icon: CreditCard,
      description: "Apply for new passport, renewal, and related services",
      features: ["New Passport", "Renewal", "Re-issue", "Police Clearance Certificate"],
      processingTime: "30-45 days",
      fees: "₹1,500 - ₹3,500"
    },
    {
      id: "visa",
      title: "Visa Services", 
      icon: FileText,
      description: "Visa information and application procedures for foreign nationals",
      features: ["Tourist Visa", "Business Visa", "Medical Visa", "e-Visa"],
      processingTime: "5-10 days",
      fees: "$25 - $100"
    },
    {
      id: "emergency",
      title: "Emergency Services",
      icon: AlertTriangle,
      description: "Emergency travel documents and assistance for Indian nationals",
      features: ["Emergency Certificate", "Emergency Passport", "Repatriation", "24/7 Helpline"],
      processingTime: "Same day",
      fees: "$20 - $50"
    },
    {
      id: "attestation",
      title: "Attestation Services",
      icon: CheckCircle,
      description: "Document attestation and authentication services",
      features: ["Educational Certificates", "Commercial Documents", "Personal Documents", "Apostille"],
      processingTime: "3-7 days",
      fees: "₹50 - ₹200"
    }
  ];

  const importantNotices = [
    {
      type: "alert",
      title: "COVID-19 Travel Guidelines",
      description: "Updated travel restrictions and health protocols for international travel."
    },
    {
      type: "info",
      title: "New Online Portal",
      description: "Enhanced digital platform for passport and visa services now available."
    },
    {
      type: "update",
      title: "Fee Structure Revised",
      description: "Updated fee structure for consular services effective from January 2025."
    }
  ];

  const emergencyContacts = [
    {
      country: "USA",
      embassy: "Embassy of India, Washington D.C.",
      phone: "+1-202-939-7000",
      emergency: "+1-202-262-1634"
    },
    {
      country: "UK",
      embassy: "High Commission of India, London",
      phone: "+44-20-7836-8484",
      emergency: "+44-20-7632-3149"
    },
    {
      country: "UAE",
      embassy: "Embassy of India, Abu Dhabi",
      phone: "+971-2-449-2700",
      emergency: "+971-50-450-0018"
    }
  ];

  const documents = [
    { name: "Passport Application Form", type: "PDF", size: "2.1 MB" },
    { name: "Visa Application Form", type: "PDF", size: "1.8 MB" },
    { name: "Attestation Guidelines", type: "PDF", size: "950 KB" },
    { name: "Emergency Travel Document Form", type: "PDF", size: "1.2 MB" }
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted/50 py-4">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink 
                  onClick={() => setCurrentPage('home')}
                  className="cursor-pointer hover:text-primary"
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Consular Services</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <Badge className="mb-4">Services</Badge>
            <h1 className="text-4xl font-bold mb-6">Consular Services</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Comprehensive consular assistance for Indian nationals abroad and foreign nationals in India. Access essential services with ease through our digital platforms and worldwide network.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Apply Online
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Track Application
              </Button>
              <Button variant="outline" size="lg" className="text-red-600 border-red-200 hover:bg-red-50">
                Emergency Helpline
                <Phone className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notices */}
      <section className="py-8 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-4">
            {importantNotices.map((notice, index) => (
              <Alert key={index} className="bg-white border-orange-200">
                <AlertTriangle className="h-4 w-4" />
                <div>
                  <h4 className="font-medium text-sm">{notice.title}</h4>
                  <AlertDescription className="text-sm">{notice.description}</AlertDescription>
                </div>
              </Alert>
            ))}
          </div>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="passport">Passport</TabsTrigger>
              <TabsTrigger value="visa">Visa</TabsTrigger>
              <TabsTrigger value="emergency">Emergency</TabsTrigger>
              <TabsTrigger value="forms">Forms</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Our Services</h2>
                <p className="text-lg text-muted-foreground">
                  Comprehensive consular assistance available worldwide
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {services.map((service) => {
                  const IconComponent = service.icon;
                  return (
                    <Card key={service.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <IconComponent className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle>{service.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">{service.description}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Features:</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {service.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                  <span className="text-sm">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center pt-4 border-t">
                            <div className="text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{service.processingTime}</span>
                              </div>
                            </div>
                            <div className="text-sm font-medium">
                              Fees: {service.fees}
                            </div>
                          </div>
                          
                          <Button className="w-full">
                            Apply Now
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="passport" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Passport Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">Types of Passport Services</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-medium mb-2">Fresh Passport</h4>
                            <p className="text-sm text-muted-foreground mb-3">For first-time applicants</p>
                            <ul className="text-sm space-y-1">
                              <li>• Age proof required</li>
                              <li>• Address proof mandatory</li>
                              <li>• Identity proof needed</li>
                            </ul>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-medium mb-2">Passport Renewal</h4>
                            <p className="text-sm text-muted-foreground mb-3">For expired passports</p>
                            <ul className="text-sm space-y-1">
                              <li>• Old passport required</li>
                              <li>• Updated documents</li>
                              <li>• Same day service available</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-3">Required Documents</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-medium text-sm mb-2">Identity Proof</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Aadhaar Card</li>
                            <li>• Voter ID</li>
                            <li>• Driving License</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-2">Address Proof</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Utility Bills</li>
                            <li>• Rent Agreement</li>
                            <li>• Bank Statement</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-2">Age Proof</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Birth Certificate</li>
                            <li>• School Certificate</li>
                            <li>• Aadhaar Card</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="visa" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Visa Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    India offers various types of visas for foreign nationals. Choose the appropriate visa type based on your purpose of visit.
                  </p>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {["Tourist Visa", "Business Visa", "Medical Visa", "Student Visa"].map((visa, index) => (
                      <Card key={index}>
                        <CardContent className="p-4 text-center">
                          <Globe className="h-8 w-8 text-primary mx-auto mb-3" />
                          <h4 className="font-medium mb-2">{visa}</h4>
                          <Button size="sm" variant="outline" className="w-full">
                            Apply
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="emergency" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">Emergency Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      24/7 emergency assistance for Indian nationals abroad
                    </p>
                    <div className="space-y-4">
                      <div className="p-4 bg-red-50 rounded-lg">
                        <h4 className="font-medium text-red-800 mb-2">Global Emergency Helpline</h4>
                        <p className="text-red-700">+91-11-2301-2113</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3">Services Available:</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Emergency Travel Documents</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Medical Assistance</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Legal Aid</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Repatriation Services</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Emergency Contacts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {emergencyContacts.map((contact, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">{contact.country}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{contact.embassy}</p>
                          <div className="flex flex-col space-y-1 text-sm">
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4" />
                              <span>{contact.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                              <span className="text-red-600">{contact.emergency}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="forms">
              <Card>
                <CardHeader>
                  <CardTitle>Download Forms & Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-8 w-8 text-red-600" />
                          <div>
                            <h4 className="font-medium">{doc.name}</h4>
                            <p className="text-sm text-muted-foreground">{doc.type} • {doc.size}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}