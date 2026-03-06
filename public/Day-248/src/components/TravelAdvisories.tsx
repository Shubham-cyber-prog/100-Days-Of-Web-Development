import { useState } from "react";
import { AlertTriangle, Info, AlertCircle, CheckCircle, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useLanguage } from "./LanguageSwitcher";

interface TravelAdvisory {
  id: string;
  country: string;
  level: "low" | "moderate" | "high" | "extreme";
  lastUpdated: string;
  summary: string;
  details: string[];
  region: string;
}

const advisories: TravelAdvisory[] = [
  {
    id: "1",
    country: "Ukraine",
    level: "extreme",
    lastUpdated: "2026-03-05",
    summary: "Do not travel due to ongoing military conflict",
    details: [
      "Active military operations throughout the country",
      "All Indian nationals advised to leave immediately",
      "Commercial flight operations suspended",
      "Embassy operations limited to essential services"
    ],
    region: "Europe"
  },
  {
    id: "2",
    country: "Israel",
    level: "high",
    lastUpdated: "2026-03-04",
    summary: "Exercise high degree of caution due to security situation",
    details: [
      "Increased security alerts in certain regions",
      "Avoid non-essential travel to border areas",
      "Stay informed through local media",
      "Register with Indian Embassy upon arrival"
    ],
    region: "Middle East"
  },
  {
    id: "3",
    country: "United States",
    level: "low",
    lastUpdated: "2026-03-01",
    summary: "Exercise normal precautions",
    details: [
      "No specific travel restrictions",
      "Follow local laws and regulations",
      "Keep emergency contact details handy",
      "Obtain appropriate travel insurance"
    ],
    region: "Americas"
  },
  {
    id: "4",
    country: "Afghanistan",
    level: "extreme",
    lastUpdated: "2026-03-05",
    summary: "Do not travel - security situation extremely volatile",
    details: [
      "Terrorist activities and armed conflict ongoing",
      "No Indian diplomatic presence in-country",
      "Extremely limited consular support available",
      "All travel strongly discouraged"
    ],
    region: "Asia"
  },
  {
    id: "5",
    country: "Sudan",
    level: "high",
    lastUpdated: "2026-03-03",
    summary: "Reconsider travel due to civil unrest and security concerns",
    details: [
      "Political instability and armed clashes reported",
      "Limited availability of essential services",
      "Avoid public gatherings and demonstrations",
      "Maintain high vigilance at all times"
    ],
    region: "Africa"
  },
  {
    id: "6",
    country: "Singapore",
    level: "low",
    lastUpdated: "2026-02-28",
    summary: "Exercise normal precautions",
    details: [
      "Safe destination for travelers",
      "Strict local laws - ensure compliance",
      "Excellent medical facilities available",
      "Register with High Commission if staying long-term"
    ],
    region: "Asia"
  },
  {
    id: "7",
    country: "France",
    level: "moderate",
    lastUpdated: "2026-03-02",
    summary: "Exercise increased caution due to terrorism threat",
    details: [
      "Heightened security measures in place",
      "Remain vigilant in crowded places",
      "Follow instructions from local authorities",
      "Avoid demonstrations and large gatherings"
    ],
    region: "Europe"
  },
  {
    id: "8",
    country: "Myanmar",
    level: "high",
    lastUpdated: "2026-03-04",
    summary: "Reconsider travel due to civil unrest",
    details: [
      "Ongoing political instability",
      "Internet and communication disruptions possible",
      "Limited consular assistance available",
      "Avoid travel to conflict-affected areas"
    ],
    region: "Asia"
  }
];

const levelConfig = {
  low: {
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
    badge: "bg-green-100 text-green-800"
  },
  moderate: {
    icon: Info,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    badge: "bg-yellow-100 text-yellow-800"
  },
  high: {
    icon: AlertCircle,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
    badge: "bg-orange-100 text-orange-800"
  },
  extreme: {
    icon: AlertTriangle,
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    badge: "bg-red-100 text-red-800"
  }
};

export function TravelAdvisories() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");

  const filteredAdvisories = advisories.filter((advisory) => {
    const matchesSearch = advisory.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === "all" || advisory.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  const levels = ["all", "low", "moderate", "high", "extreme"];

  const getLevelTranslation = (level: string) => {
    if (level === "all") return t('advisory.alllevels');
    return t(`advisory.level.${level}`);
  };

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">{t('advisory.title')}</h2>
          <p className="text-muted-foreground">
            {t('advisory.subtitle')}
          </p>
        </div>

        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>{t('advisory.important')}</AlertTitle>
          <AlertDescription>
            {t('advisory.description')}
          </AlertDescription>
        </Alert>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('advisory.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs value={selectedLevel} onValueChange={setSelectedLevel} className="mb-6">
          <TabsList className="grid grid-cols-5 w-full">
            {levels.map((level) => (
              <TabsTrigger key={level} value={level} className="capitalize">
                {getLevelTranslation(level)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAdvisories.map((advisory) => {
            const config = levelConfig[advisory.level];
            const Icon = config.icon;
            
            return (
              <Card key={advisory.id} className={`border-l-4 ${config.border}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <Icon className={`h-6 w-6 ${config.color} mt-1`} />
                      <div>
                        <CardTitle className="text-xl">{advisory.country}</CardTitle>
                        <CardDescription className="mt-1">
                          {t('advisory.updated')}: {new Date(advisory.lastUpdated).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={config.badge}>
                      {getLevelTranslation(advisory.level).toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold mb-3">{advisory.summary}</p>
                  <ul className="space-y-2">
                    {advisory.details.map((detail, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <span className={`${config.color} mt-1`}>•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredAdvisories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t('advisory.noresults')}</p>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          {Object.entries(levelConfig).map(([level, config]) => {
            const Icon = config.icon;
            const count = advisories.filter(a => a.level === level).length;
            
            return (
              <div key={level} className={`p-4 rounded-lg ${config.bg} border ${config.border}`}>
                <div className="flex items-center space-x-3">
                  <Icon className={`h-5 w-5 ${config.color}`} />
                  <div>
                    <div className={`text-2xl font-bold ${config.color}`}>{count}</div>
                    <div className="text-sm capitalize">{getLevelTranslation(level)} {t('advisory.risk')}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}