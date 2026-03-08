import { useState, useEffect } from "react";
import { Settings, Type, Contrast, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useLanguage } from "./LanguageSwitcher";

export function AccessibilityPanel() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'larger'>('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    // Apply font size
    const root = document.documentElement;
    switch (fontSize) {
      case 'large':
        root.style.fontSize = '110%';
        break;
      case 'larger':
        root.style.fontSize = '120%';
        break;
      default:
        root.style.fontSize = '100%';
    }
  }, [fontSize]);

  useEffect(() => {
    // Apply high contrast
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    // Apply reduced motion
    if (reduceMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  }, [reduceMotion]);

  const resetSettings = () => {
    setFontSize('normal');
    setHighContrast(false);
    setReduceMotion(false);
  };

  return (
    <>
      {/* Floating Accessibility Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
          size="icon"
          aria-label={t('accessibility.title')}
        >
          <Settings className="h-6 w-6" />
        </Button>
      </div>

      {/* Accessibility Panel */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-50">
          <Card className="shadow-2xl w-80 border-2 border-blue-600">
            <CardHeader className="bg-blue-600 text-white">
              <CardTitle className="text-lg flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                {t('accessibility.title')}
              </CardTitle>
              <CardDescription className="text-white/90">
                {t('accessibility.subtitle')}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-4 space-y-4">
              {/* Font Size Controls */}
              <div>
                <Label className="text-sm font-semibold mb-3 flex items-center">
                  <Type className="h-4 w-4 mr-2" />
                  {t('accessibility.textsize')}
                </Label>
                <div className="flex space-x-2 mt-2">
                  <Button
                    variant={fontSize === 'normal' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFontSize('normal')}
                    className="flex-1"
                  >
                    A
                  </Button>
                  <Button
                    variant={fontSize === 'large' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFontSize('large')}
                    className="flex-1 text-lg"
                  >
                    A
                  </Button>
                  <Button
                    variant={fontSize === 'larger' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFontSize('larger')}
                    className="flex-1 text-xl"
                  >
                    A
                  </Button>
                </div>
              </div>

              <Separator />

              {/* High Contrast Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Contrast className="h-4 w-4" />
                  <Label htmlFor="high-contrast" className="text-sm font-semibold cursor-pointer">
                    {t('accessibility.highcontrast')}
                  </Label>
                </div>
                <Switch
                  id="high-contrast"
                  checked={highContrast}
                  onCheckedChange={setHighContrast}
                />
              </div>

              <Separator />

              {/* Reduce Motion Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <RotateCcw className="h-4 w-4" />
                  <Label htmlFor="reduce-motion" className="text-sm font-semibold cursor-pointer">
                    {t('accessibility.reducemotion')}
                  </Label>
                </div>
                <Switch
                  id="reduce-motion"
                  checked={reduceMotion}
                  onCheckedChange={setReduceMotion}
                />
              </div>

              <Separator />

              {/* Reset Button */}
              <Button
                variant="outline"
                className="w-full"
                onClick={resetSettings}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                {t('accessibility.reset')}
              </Button>

              {/* Keyboard Shortcuts Info */}
              <div className="bg-gray-50 p-3 rounded-lg text-xs">
                <div className="font-semibold mb-2">{t('accessibility.shortcuts')}</div>
                <div className="space-y-1 text-muted-foreground">
                  <div><kbd className="px-1 bg-white border rounded">Tab</kbd> - {t('accessibility.tab')}</div>
                  <div><kbd className="px-1 bg-white border rounded">Enter</kbd> - {t('accessibility.enter')}</div>
                  <div><kbd className="px-1 bg-white border rounded">Esc</kbd> - {t('accessibility.esc')}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* CSS for accessibility features */}
      <style>{`
        .high-contrast {
          filter: contrast(1.5);
        }
        
        .high-contrast a {
          text-decoration: underline;
        }
        
        .reduce-motion * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      `}</style>
    </>
  );
}