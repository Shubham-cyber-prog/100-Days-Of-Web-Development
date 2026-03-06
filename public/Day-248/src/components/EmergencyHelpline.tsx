import { useState } from "react";
import { Phone, X, MessageSquare, MapPin, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { useLanguage } from "./LanguageSwitcher";

interface EmergencyContact {
  titleKey: string;
  number: string;
  descKey: string;
  availableKey: string;
}

export function EmergencyHelpline() {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const emergencyContacts: EmergencyContact[] = [
    {
      titleKey: 'emergency.control',
      number: "+91-11-2301-2113",
      descKey: 'emergency.control.desc',
      availableKey: 'emergency.available'
    },
    {
      titleKey: 'emergency.consular',
      number: "+91-11-2301-9999",
      descKey: 'emergency.consular.desc',
      availableKey: 'emergency.hours'
    },
    {
      titleKey: 'emergency.madad',
      number: "madad.gov.in",
      descKey: 'emergency.madad.desc',
      availableKey: 'emergency.available'
    },
    {
      titleKey: 'emergency.whatsapp',
      number: "+91-98-1077-4031",
      descKey: 'emergency.whatsapp.desc',
      availableKey: 'emergency.available'
    }
  ];

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="h-14 w-14 rounded-full shadow-lg bg-red-600 hover:bg-red-700 text-white"
          size="icon"
        >
          <Phone className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`shadow-2xl border-2 border-red-600 transition-all ${isExpanded ? 'w-80' : 'w-64'}`}>
        <CardHeader className="bg-red-600 text-white pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <CardTitle className="text-lg">{t('emergency.title')}</CardTitle>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-red-700"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-red-700"
                onClick={() => setIsMinimized(true)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardDescription className="text-white/90 text-xs">
            {t('emergency.subtitle')}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-4 max-h-96 overflow-y-auto">
          {!isExpanded ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 p-3 bg-red-50 rounded-lg">
                <Phone className="h-5 w-5 text-red-600 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">{t('emergency.control')}</div>
                  <a
                    href="tel:+911123012113"
                    className="text-red-600 hover:underline text-sm font-bold"
                  >
                    +91-11-2301-2113
                  </a>
                </div>
              </div>
              
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsExpanded(true)}
              >
                {t('emergency.viewall')}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-semibold text-sm">{t(contact.titleKey)}</div>
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {t(contact.availableKey)}
                    </Badge>
                  </div>
                  
                  {contact.number.startsWith('+') ? (
                    <a
                      href={`tel:${contact.number.replace(/[^0-9+]/g, '')}`}
                      className="text-red-600 hover:underline font-bold block mb-2"
                    >
                      {contact.number}
                    </a>
                  ) : (
                    <div className="text-blue-600 font-bold mb-2">{contact.number}</div>
                  )}
                  
                  <p className="text-xs text-muted-foreground">{t(contact.descKey)}</p>
                </div>
              ))}
              
              <div className="border-t pt-3 mt-3">
                <div className="flex items-start space-x-2 text-xs text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <p>{t('emergency.location')}</p>
                </div>
              </div>
              
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsExpanded(false)}
              >
                {t('embassy.showless')}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}