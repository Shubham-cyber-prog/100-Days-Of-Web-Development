import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  Globe, 
  Users, 
  MapPin,
  Search,
  Building,
  ArrowRight,
  ExternalLink,
  Handshake,
  TrendingUp,
  Shield
} from "lucide-react";
import { Page } from "../Router";
import { useState } from "react";

interface ForeignRelationsPageProps {
  setCurrentPage: (page: Page) => void;
}

export function ForeignRelationsPage({ setCurrentPage }: ForeignRelationsPageProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const regions = [
    {
      name: "Asia-Pacific",
      countries: 25,
      description: "Strategic partnerships with neighboring countries and regional powers",
      keyPartners: ["China", "Japan", "South Korea", "ASEAN", "Australia"],
      initiatives: ["Act East Policy", "QUAD", "Indo-Pacific Strategy"]
    },
    {
      name: "Middle East",
      countries: 18,
      description: "Energy cooperation and diaspora engagement",
      keyPartners: ["UAE", "Saudi Arabia", "Israel", "Iran", "Qatar"],
      initiatives: ["I2U2 Partnership", "Gulf Cooperation", "West Asia Policy"]
    },
    {
      name: "Europe",
      countries: 32,
      description: "Technology partnerships and trade cooperation",
      keyPartners: ["Germany", "France", "UK", "Russia", "Nordic Countries"],
      initiatives: ["EU-India Partnership", "Eastern Partnership", "Arctic Council"]
    },
    {
      name: "Africa",
      countries: 54,
      description: "Development cooperation and resource partnerships",
      keyPartners: ["South Africa", "Nigeria", "Kenya", "Egypt", "Morocco"],
      initiatives: ["India-Africa Forum", "Pan-African e-Network", "Team9 Initiative"]
    },
    {
      name: "Americas",
      countries: 35,
      description: "Strategic partnerships and technology cooperation",
      keyPartners: ["USA", "Canada", "Brazil", "Mexico", "Argentina"],
      initiatives: ["QUAD Plus", "Americas Partnership", "Diaspora Engagement"]
    }
  ];

  const bilateralRelations = [
    {
      country: "United States",
      flag: "🇺🇸",
      status: "Strategic Partnership",
      tradeVolume: "$119.4B",
      keyAgreements: ["Defense Cooperation", "Nuclear Deal", "Trade Agreement"],
      lastVisit: "2024-06-20",
      nextMeeting: "2025-03-15"
    },
    {
      country: "China",
      flag: "🇨🇳",
      status: "Border Management",
      tradeVolume: "$125.7B",
      keyAgreements: ["Border Protocol", "Trade Mechanism", "Military Dialogue"],
      lastVisit: "2024-10-15",
      nextMeeting: "2025-05-10"
    },
    {
      country: "Russia",
      flag: "🇷🇺",
      status: "Special Strategic Partnership",
      tradeVolume: "$65.7B",
      keyAgreements: ["Defense Cooperation", "Energy Partnership", "Nuclear Cooperation"],
      lastVisit: "2024-07-08",
      nextMeeting: "2025-09-20"
    },
    {
      country: "Japan",
      flag: "🇯🇵",
      status: "Special Strategic Partnership",
      tradeVolume: "$20.6B",
      keyAgreements: ["ACSA Agreement", "Investment Promotion", "Technology Cooperation"],
      lastVisit: "2024-11-12",
      nextMeeting: "2025-04-25"
    },
    {
      country: "Germany",
      flag: "🇩🇪",
      status: "Strategic Partnership",
      tradeVolume: "$25.8B",
      keyAgreements: ["Green Partnership", "Technology Transfer", "Migration Agreement"],
      lastVisit: "2024-05-30",
      nextMeeting: "2025-06-18"
    },
    {
      country: "United Kingdom",
      flag: "🇬🇧",
      status: "Comprehensive Strategic Partnership",
      tradeVolume: "$20.4B",
      keyAgreements: ["Roadmap 2030", "Defense Partnership", "Climate Agreement"],
      lastVisit: "2024-04-28",
      nextMeeting: "2025-07-14"
    }
  ];

  const multilateralEngagement = [
    {
      organization: "United Nations",
      role: "Security Council Member (2021-22)",
      keyInitiatives: ["Reformed Multilateralism", "South-South Cooperation"],
      image: "https://images.unsplash.com/photo-1713930517076-18a9fd284cfb?w=300&h=200&fit=crop"
    },
    {
      organization: "G20",
      role: "Presidency (2023)",
      keyInitiatives: ["Vasudhaiva Kutumbakam", "Digital Public Infrastructure"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop"
    },
    {
      organization: "BRICS",
      role: "Founding Member",
      keyInitiatives: ["New Development Bank", "BRICS Plus", "Innovation Partnership"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=200&fit=crop"
    },
    {
      organization: "Shanghai Cooperation Organisation",
      role: "Full Member (since 2017)",
      keyInitiatives: ["Counter-terrorism", "Energy Cooperation", "Connectivity"],
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=200&fit=crop"
    }
  ];

  const recentDevelopments = [
    {
      title: "India-ASEAN Summit Strengthens Regional Cooperation",
      date: "2025-01-28",
      description: "Comprehensive partnership agreements signed focusing on trade and security.",
      type: "Summit"
    },
    {
      title: "Quad Leaders' Virtual Meeting on Indo-Pacific Strategy",
      date: "2025-01-25",
      description: "Discussion on maritime security and infrastructure development.",
      type: "Multilateral"
    },
    {
      title: "India-Germany Green Partnership Progress Review",
      date: "2025-01-22",
      description: "Significant progress in renewable energy and climate cooperation.",
      type: "Bilateral"
    },
    {
      title: "BRICS Foreign Ministers Meeting in Brazil",
      date: "2025-01-20",
      description: "Focus on global governance reform and economic cooperation.",
      type: "Multilateral"
    }
  ];

  const filteredCountries = bilateralRelations.filter(country =>
    country.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <BreadcrumbPage>Foreign Relations</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <Badge className="mb-4">Foreign Relations</Badge>
            <h1 className="text-4xl font-bold mb-6">India's Global Partnerships</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Explore India's diplomatic relations, strategic partnerships, and multilateral engagements that shape our foreign policy and strengthen international cooperation.
            </p>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">190+</div>
                <div className="text-sm text-muted-foreground">Diplomatic Missions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">195</div>
                <div className="text-sm text-muted-foreground">Countries Relations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Strategic Partnerships</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">25+</div>
                <div className="text-sm text-muted-foreground">Multilateral Forums</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="regional" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="regional">Regional Overview</TabsTrigger>
            <TabsTrigger value="bilateral">Bilateral Relations</TabsTrigger>
            <TabsTrigger value="multilateral">Multilateral Engagement</TabsTrigger>
            <TabsTrigger value="developments">Recent Developments</TabsTrigger>
          </TabsList>

          <TabsContent value="regional" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Regional Partnerships</h2>
              <p className="text-lg text-muted-foreground">
                India's strategic engagement across different regions of the world
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {regions.map((region, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <Globe className="h-5 w-5 mr-2 text-primary" />
                        {region.name}
                      </CardTitle>
                      <Badge variant="outline">{region.countries} Countries</Badge>
                    </div>
                    <p className="text-muted-foreground">{region.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Key Partners:</h4>
                        <div className="flex flex-wrap gap-2">
                          {region.keyPartners.map((partner, idx) => (
                            <Badge key={idx} variant="secondary">{partner}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Major Initiatives:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {region.initiatives.map((initiative, idx) => (
                            <li key={idx} className="flex items-center">
                              <ArrowRight className="h-3 w-3 mr-2 text-primary" />
                              {initiative}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bilateral" className="space-y-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Bilateral Relations</h2>
                <p className="text-lg text-muted-foreground">
                  Key bilateral partnerships and diplomatic engagements
                </p>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search countries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6">
              {filteredCountries.map((country, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{country.flag}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{country.country}</h3>
                          <Badge 
                            className={
                              country.status.includes('Strategic') 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-blue-100 text-blue-800'
                            }
                          >
                            {country.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Trade Volume:</span>
                            <span className="font-medium">{country.tradeVolume}</span>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-sm mb-2">Key Agreements:</h4>
                            <div className="flex flex-wrap gap-1">
                              {country.keyAgreements.map((agreement, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {agreement}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Last Visit: {country.lastVisit}</span>
                            <span>Next Meeting: {country.nextMeeting}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="multilateral" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Multilateral Engagement</h2>
              <p className="text-lg text-muted-foreground">
                India's active participation in international organizations and forums
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {multilateralEngagement.map((org, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <ImageWithFallback
                      src={org.image}
                      alt={org.organization}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white text-primary">
                        {org.organization}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">{org.organization}</h3>
                    <p className="text-sm text-muted-foreground mb-4">Role: {org.role}</p>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-2">Key Initiatives:</h4>
                      <ul className="text-sm space-y-1">
                        {org.keyInitiatives.map((initiative, idx) => (
                          <li key={idx} className="flex items-center">
                            <Handshake className="h-3 w-3 mr-2 text-primary" />
                            {initiative}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      Learn More
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="developments" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Recent Developments</h2>
              <p className="text-lg text-muted-foreground">
                Latest diplomatic activities and foreign policy developments
              </p>
            </div>
            
            <div className="space-y-6">
              {recentDevelopments.map((development, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge 
                            className={
                              development.type === 'Summit' 
                                ? 'bg-blue-100 text-blue-800' 
                                : development.type === 'Bilateral'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-purple-100 text-purple-800'
                            }
                          >
                            {development.type}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{development.date}</span>
                        </div>
                        <h3 className="font-semibold mb-2">{development.title}</h3>
                        <p className="text-muted-foreground">{development.description}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}