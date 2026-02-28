import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ScrollArea } from "./ui/scroll-area";
import { useState } from "react";

export function Settings() {
  const [autoSave, setAutoSave] = useState(true);
  const [syntaxHighlighting, setSyntaxHighlighting] = useState(true);
  const [liveMatching, setLiveMatching] = useState(true);
  const [showLineNumbers, setShowLineNumbers] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [fontSize, setFontSize] = useState("14");

  return (
    <div className="h-full bg-[#1e1e1e]">
      <div className="p-6 border-b border-[#3e3e42]">
        <h2 className="text-2xl font-semibold">Settings</h2>
        <p className="text-gray-400 text-sm mt-2">
          Customize your regex builder experience
        </p>
      </div>

      <ScrollArea className="h-[calc(100vh-140px)]">
        <div className="p-6 space-y-8">
          {/* Editor Settings */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Editor</h3>
            <div className="space-y-4 bg-[#252526] border border-[#3e3e42] rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="syntax-highlighting" className="font-medium">
                    Syntax Highlighting
                  </Label>
                  <p className="text-sm text-gray-400 mt-1">
                    Highlight regex syntax elements
                  </p>
                </div>
                <Switch
                  id="syntax-highlighting"
                  checked={syntaxHighlighting}
                  onCheckedChange={setSyntaxHighlighting}
                />
              </div>
              <div className="border-t border-[#3e3e42] pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="live-matching" className="font-medium">
                      Live Matching
                    </Label>
                    <p className="text-sm text-gray-400 mt-1">
                      Update matches in real-time as you type
                    </p>
                  </div>
                  <Switch
                    id="live-matching"
                    checked={liveMatching}
                    onCheckedChange={setLiveMatching}
                  />
                </div>
              </div>
              <div className="border-t border-[#3e3e42] pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="line-numbers" className="font-medium">
                      Show Line Numbers
                    </Label>
                    <p className="text-sm text-gray-400 mt-1">
                      Display line numbers in text areas
                    </p>
                  </div>
                  <Switch
                    id="line-numbers"
                    checked={showLineNumbers}
                    onCheckedChange={setShowLineNumbers}
                  />
                </div>
              </div>
              <div className="border-t border-[#3e3e42] pt-4">
                <Label htmlFor="font-size" className="font-medium">
                  Font Size
                </Label>
                <Select value={fontSize} onValueChange={setFontSize}>
                  <SelectTrigger id="font-size" className="mt-2 bg-[#3c3c3c] border-[#3e3e42]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12px</SelectItem>
                    <SelectItem value="14">14px</SelectItem>
                    <SelectItem value="16">16px</SelectItem>
                    <SelectItem value="18">18px</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Appearance Settings */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Appearance</h3>
            <div className="space-y-4 bg-[#252526] border border-[#3e3e42] rounded-lg p-4">
              <div>
                <Label htmlFor="theme" className="font-medium">
                  Theme
                </Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger id="theme" className="mt-2 bg-[#3c3c3c] border-[#3e3e42]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Data & Privacy */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Data & Privacy</h3>
            <div className="space-y-4 bg-[#252526] border border-[#3e3e42] rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-save" className="font-medium">
                    Auto-Save Patterns
                  </Label>
                  <p className="text-sm text-gray-400 mt-1">
                    Automatically save patterns to local storage
                  </p>
                </div>
                <Switch
                  id="auto-save"
                  checked={autoSave}
                  onCheckedChange={setAutoSave}
                />
              </div>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <div className="bg-[#252526] border border-[#3e3e42] rounded-lg p-4">
              <p className="text-sm text-gray-300">
                <strong>Online Regex Builder</strong>
              </p>
              <p className="text-sm text-gray-400 mt-2">Version 1.0.0</p>
              <p className="text-sm text-gray-400 mt-4">
                A modern tool for creating, testing, and visualizing regular
                expressions.
              </p>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
