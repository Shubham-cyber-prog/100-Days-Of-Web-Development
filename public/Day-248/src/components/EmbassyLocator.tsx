import { useState } from "react";
import { Search, MapPin, Phone, Mail, Globe, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useLanguage } from "./LanguageSwitcher";

interface Embassy {
  id: string;
  country: string;
  city: string;
  type: "Embassy" | "High Commission" | "Consulate";
  address: string;
  phone: string;
  email: string;
  website: string;
  region: "Asia" | "Europe" | "Americas" | "Africa" | "Middle East" | "Oceania";
  emergencyNumber?: string;
}

const embassies: Embassy[] = [
  {
    id: "1",
    country: "United States",
    city: "Washington, D.C.",
    type: "Embassy",
    address: "2107 Massachusetts Avenue NW, Washington, DC 20008",
    phone: "+1-202-939-7000",
    email: "cons.washington@mea.gov.in",
    website: "www.indianembassyusa.gov.in",
    region: "Americas",
    emergencyNumber: "+1-202-939-9889"
  },
  {
    id: "2",
    country: "United Kingdom",
    city: "London",
    type: "High Commission",
    address: "India House, Aldwych, London WC2B 4NA",
    phone: "+44-20-7836-8484",
    email: "hci.london@mea.gov.in",
    website: "www.hcilondon.gov.in",
    region: "Europe",
    emergencyNumber: "+44-7768-193-615"
  },
  {
    id: "3",
    country: "United Arab Emirates",
    city: "Abu Dhabi",
    type: "Embassy",
    address: "Plot No. 10, Sector W-59/02, Diplomatic Area, Abu Dhabi",
    phone: "+971-2-449-2700",
    email: "indembad@emirates.net.ae",
    website: "www.indembassyuae.gov.in",
    region: "Middle East",
    emergencyNumber: "+971-50-456-4366"
  },
  {
    id: "4",
    country: "Singapore",
    city: "Singapore",
    type: "High Commission",
    address: "India House, 31 Grange Road, Singapore 239702",
    phone: "+65-6737-6777",
    email: "hc@indianhighcommission.sg",
    website: "www.indianhighcommission.sg",
    region: "Asia",
    emergencyNumber: "+65-6737-6777"
  },
  {
    id: "5",
    country: "Australia",
    city: "Canberra",
    type: "High Commission",
    address: "3-5 Moonah Place, Yarralumla, ACT 2600",
    phone: "+61-2-6273-3999",
    email: "hoc.canberra@mea.gov.in",
    website: "www.indianhighcommission.com.au",
    region: "Oceania",
    emergencyNumber: "+61-2-6273-3999"
  },
  {
    id: "6",
    country: "Germany",
    city: "Berlin",
    type: "Embassy",
    address: "Tiergartenstrasse 17, 10785 Berlin",
    phone: "+49-30-257-950",
    email: "info@indianembassy.de",
    website: "www.indianembassy.de",
    region: "Europe",
    emergencyNumber: "+49-30-2579-5013"
  },
  {
    id: "7",
    country: "Japan",
    city: "Tokyo",
    type: "Embassy",
    address: "2-2-11 Kudan Minami, Chiyoda-ku, Tokyo 102-0074",
    phone: "+81-3-3262-2391",
    email: "cons.tokyo@mea.gov.in",
    website: "www.indembassy-tokyo.gov.in",
    region: "Asia",
    emergencyNumber: "+81-3-3262-2391"
  },
  {
    id: "8",
    country: "Canada",
    city: "Ottawa",
    type: "High Commission",
    address: "10 Springfield Road, Ottawa, ON K1M 1C9",
    phone: "+1-613-744-3751",
    email: "hicomind@hciottawa.ca",
    website: "www.hciottawa.gov.in",
    region: "Americas",
    emergencyNumber: "+1-613-744-1429"
  },
  {
    id: "9",
    country: "South Africa",
    city: "Pretoria",
    type: "High Commission",
    address: "852 Schoeman Street, Arcadia, Pretoria 0083",
    phone: "+27-12-342-5392",
    email: "hoc.pretoria@mea.gov.in",
    website: "www.indembassy.co.za",
    region: "Africa",
    emergencyNumber: "+27-82-809-4865"
  },
  {
    id: "10",
    country: "France",
    city: "Paris",
    type: "Embassy",
    address: "15 Rue Alfred Dehodencq, 75016 Paris",
    phone: "+33-1-40-50-70-70",
    email: "info.paris@mea.gov.in",
    website: "www.ambinde.fr",
    region: "Europe",
    emergencyNumber: "+33-1-40-50-71-71"
  },
  {
    id: "11",
    country: "China",
    city: "Beijing",
    type: "Embassy",
    address: "1 Ritan East Road, Beijing 100600",
    phone: "+86-10-6532-1908",
    email: "cons.beijing@mea.gov.in",
    website: "www.indianembassy.org.cn",
    region: "Asia",
    emergencyNumber: "+86-10-6532-1856"
  },
  {
    id: "12",
    country: "Brazil",
    city: "Brasília",
    type: "Embassy",
    address: "SES Av. das Nações, Q 803, Lote 08, 70410-904 Brasília, DF",
    phone: "+55-61-3248-4006",
    email: "info.brasilia@mea.gov.in",
    website: "www.eoibrasilia.gov.in",
    region: "Americas",
    emergencyNumber: "+55-61-98196-5883"
  }
];

export function EmbassyLocator() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [expandedEmbassy, setExpandedEmbassy] = useState<string | null>(null);

  const filteredEmbassies = embassies.filter((embassy) => {
    const matchesSearch =
      embassy.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      embassy.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === "all" || embassy.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const regions = ["all", "Asia", "Europe", "Americas", "Africa", "Middle East", "Oceania"];

  const getEmbassyTypeTranslation = (type: string) => {
    switch (type) {
      case "Embassy":
        return t('embassy.type.embassy');
      case "High Commission":
        return t('embassy.type.highcommission');
      case "Consulate":
        return t('embassy.type.consulate');
      default:
        return type;
    }
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">{t('embassy.title')}</h2>
          <p className="text-muted-foreground">
            {t('embassy.subtitle')}
          </p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('embassy.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs value={selectedRegion} onValueChange={setSelectedRegion} className="mb-6">
          <TabsList className="grid grid-cols-3 md:grid-cols-7 w-full">
            {regions.map((region) => (
              <TabsTrigger key={region} value={region} className="capitalize">
                {region === "all" ? t('embassy.allregions') : region}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmbassies.map((embassy) => (
            <Card key={embassy.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{embassy.country}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {embassy.city}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">{getEmbassyTypeTranslation(embassy.type)}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm">{embassy.address}</span>
                  </div>
                  
                  {expandedEmbassy === embassy.id && (
                    <div className="space-y-3 pt-2 border-t">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <a href={`tel:${embassy.phone}`} className="text-sm text-blue-600 hover:underline">
                          {embassy.phone}
                        </a>
                      </div>
                      
                      {embassy.emergencyNumber && (
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-red-600 flex-shrink-0" />
                          <div>
                            <span className="text-sm text-red-600 font-semibold">{t('embassy.emergency')}: </span>
                            <a href={`tel:${embassy.emergencyNumber}`} className="text-sm text-red-600 hover:underline">
                              {embassy.emergencyNumber}
                            </a>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <a href={`mailto:${embassy.email}`} className="text-sm text-blue-600 hover:underline break-all">
                          {embassy.email}
                        </a>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <a
                          href={`https://${embassy.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          {embassy.website}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-2"
                    onClick={() => setExpandedEmbassy(expandedEmbassy === embassy.id ? null : embassy.id)}
                  >
                    {expandedEmbassy === embassy.id ? (
                      <>
                        {t('embassy.showless')} <ChevronUp className="h-4 w-4 ml-2" />
                      </>
                    ) : (
                      <>
                        {t('embassy.showdetails')} <ChevronDown className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEmbassies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t('embassy.noresults')}</p>
          </div>
        )}
      </div>
    </div>
  );
}