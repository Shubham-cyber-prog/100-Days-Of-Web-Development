import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  Building,
  Globe,
  AlertCircle
} from "lucide-react";
import { Page } from "../Router";

interface ContactPageProps {
  setCurrentPage: (page: Page) => void;
}

export function ContactPage({ setCurrentPage }: ContactPageProps) {
  const departments = [
    { value: "general", label: "General Inquiries" },
    { value: "passport", label: "Passport Services" },
    { value: "visa", label: "Visa Services" },
    { value: "consular", label: "Consular Services" },
    { value: "trade", label: "Trade & Commerce" },
    { value: "media", label: "Media Relations" },
    { value: "protocol", label: "Protocol Division" }
  ];

  const offices = [
    {
      title: "Headquarters - South Block",
      address: "South Block, Raisina Hill, New Delhi - 110011",
      phone: "+91-11-2301-9999",
      email: "info@mea.gov.in",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM",
      isMain: true
    },
    {
      title: "Passport Seva Kendra",
      address: "Multiple locations across India",
      phone: "+91-11-2303-7373",
      email: "passporthelp@mea.gov.in",
      hours: "Mon-Sat: 9:00 AM - 5:00 PM",
      isMain: false
    },
    {
      title: "Indian Council for Cultural Relations",
      address: "Azad Bhavan, I.P. Estate, New Delhi - 110002",
      phone: "+91-11-2337-9309",
      email: "info@iccr.gov.in",
      hours: "Mon-Fri: 9:00 AM - 5:30 PM",
      isMain: false
    }
  ];

  const emergencyNumbers = [
    {
      region: "Global Emergency Helpline",
      number: "+91-11-2301-2113",
      description: "24/7 emergency assistance for Indian nationals abroad"
    },
    {
      region: "Consular Emergency",
      number: "+91-11-2301-9999",
      description: "For urgent consular matters during office hours"
    },
    {
      region: "MEA Control Room",
      number: "+91-11-2301-5151",
      description: "Crisis management and coordination center"
    }
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
                <BreadcrumbPage>Contact Us</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Get in touch with the Ministry of External Affairs for inquiries, assistance, or information about our services and policies.
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <Phone className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="font-medium">Call Us</div>
                <div className="text-sm text-muted-foreground">+91-11-2301-9999</div>
              </div>
              <div className="text-center">
                <Mail className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="font-medium">Email Us</div>
                <div className="text-sm text-muted-foreground">info@mea.gov.in</div>
              </div>
              <div className="text-center">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="font-medium">Visit Us</div>
                <div className="text-sm text-muted-foreground">South Block, New Delhi</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" placeholder="Enter your email address" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="Enter your phone number" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select relevant department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.value} value={dept.value}>
                          {dept.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input id="subject" placeholder="Enter the subject of your inquiry" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Please provide details about your inquiry..." 
                    rows={6}
                  />
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-orange-800 mb-1">Important Note:</p>
                      <p className="text-orange-700">
                        For urgent matters or emergencies, please call our helpline directly. 
                        This form is for general inquiries and may take 2-3 business days for response.
                      </p>
                    </div>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Office Locations */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Our Offices</h2>
              <div className="space-y-4">
                {offices.map((office, index) => (
                  <Card key={index} className={office.isMain ? "border-primary shadow-md" : ""}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Building className={`h-6 w-6 mt-1 ${office.isMain ? "text-primary" : "text-muted-foreground"}`} />
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">{office.title}</h3>
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4" />
                              <span>{office.address}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4" />
                              <span>{office.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4" />
                              <span>{office.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4" />
                              <span>{office.hours}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Emergency Contacts */}
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Emergency Contacts
                </CardTitle>
                <p className="text-red-700 text-sm">
                  For urgent assistance and emergency situations
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {emergencyNumbers.map((emergency, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg border border-red-100">
                    <h4 className="font-medium text-red-800 mb-1">{emergency.region}</h4>
                    <div className="text-lg font-semibold text-red-600 mb-2">
                      {emergency.number}
                    </div>
                    <p className="text-sm text-red-700">{emergency.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Online Services */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Online Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Passport Application Portal
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Visa Information System
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Consular Services Portal
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Document Attestation System
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Grievance Portal
                </Button>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle>Follow Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  Stay connected with us on social media for the latest updates
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="justify-start">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                    Twitter
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    YouTube
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.25-.25a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0z"/>
                    </svg>
                    Instagram
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}