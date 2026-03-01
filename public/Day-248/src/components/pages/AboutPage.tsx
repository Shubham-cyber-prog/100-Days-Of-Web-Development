import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { 
  Users, 
  Globe, 
  Target, 
  Award, 
  Building, 
  Calendar,
  MapPin,
  Phone,
  Mail
} from "lucide-react";
import { Page } from "../Router";

interface AboutPageProps {
  setCurrentPage: (page: Page) => void;
}

export function AboutPage({ setCurrentPage }: AboutPageProps) {
  const leadership = [
    {
      name: "Dr. S. Jaishankar",
      position: "External Affairs Minister",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Smt. Meenakshi Lekhi",
      position: "Minister of State",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Shri Vinay Kumar",
      position: "Foreign Secretary",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    }
  ];

  const keyFunctions = [
    {
      icon: Globe,
      title: "Foreign Policy Formulation",
      description: "Develop and implement India's foreign policy strategies and bilateral relations."
    },
    {
      icon: Building,
      title: "Diplomatic Missions",
      description: "Manage and coordinate India's diplomatic missions and consulates worldwide."
    },
    {
      icon: Users,
      title: "Consular Services",
      description: "Provide assistance to Indian nationals abroad and foreign nationals in India."
    },
    {
      icon: Target,
      title: "Trade & Commerce",
      description: "Promote India's economic interests and facilitate international trade."
    }
  ];

  const milestones = [
    { year: "1947", event: "Ministry of External Affairs established post-independence" },
    { year: "1955", event: "India hosts the first Asian-African Conference in Bandung" },
    { year: "1974", event: "India becomes a nuclear power" },
    { year: "1998", event: "Pokhran-II nuclear tests conducted" },
    { year: "2014", event: "Launch of 'Neighbourhood First' policy" },
    { year: "2019", event: "India designated as major defense partner by the US" }
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
                <BreadcrumbPage>About MEA</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <Badge className="mb-4">About Us</Badge>
            <h1 className="text-4xl font-bold mb-6">Ministry of External Affairs</h1>
            <p className="text-xl text-muted-foreground mb-8">
              The Ministry of External Affairs is the government ministry responsible for the conduct of foreign relations of India. With the world's largest diplomatic missions, we work to advance India's interests and values globally while strengthening partnerships for peace, prosperity, and progress.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">190+</div>
                <div className="text-sm text-muted-foreground">Diplomatic Missions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">32M+</div>
                <div className="text-sm text-muted-foreground">Indians Overseas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">75+</div>
                <div className="text-sm text-muted-foreground">Years of Service</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission & Vision</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="h-5 w-5 mr-2 text-primary" />
                      Mission
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      To advance India's national interests through effective diplomacy, strengthen bilateral and multilateral relationships, and provide excellent consular services to Indian nationals worldwide.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="h-5 w-5 mr-2 text-primary" />
                      Vision
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      To position India as a leading global power that contributes to international peace, security, and prosperity while protecting and promoting Indian interests and values worldwide.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1647326520048-21dc3f07a9f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMGdvdmVybm1lbnQlMjBidWlsZGluZyUyMHBhcmxpYW1lbnR8ZW58MXx8fHwxNzU2NDYzNzk0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Ministry Building"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Functions */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Functions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The Ministry of External Affairs serves multiple critical functions in India's global engagement
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyFunctions.map((func, index) => {
              const IconComponent = func.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-3">{func.title}</h3>
                    <p className="text-sm text-muted-foreground">{func.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Leadership</h2>
            <p className="text-lg text-muted-foreground">
              Meet the leaders guiding India's foreign policy and diplomatic efforts
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {leadership.map((leader, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-8">
                  <ImageWithFallback
                    src={leader.image}
                    alt={leader.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold mb-1">{leader.name}</h3>
                  <p className="text-sm text-muted-foreground">{leader.position}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Historical Milestones */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Historical Milestones</h2>
            <p className="text-lg text-muted-foreground">
              Key moments in India's diplomatic journey
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <Badge variant="outline" className="text-lg px-3 py-1">
                        {milestone.year}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <p className="text-muted-foreground">{milestone.event}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-sm text-muted-foreground">South Block, Raisina Hill, New Delhi - 110011</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">+91-11-2301-9999</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">info@mea.gov.in</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-4">Office Hours</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span>9:00 AM - 1:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}