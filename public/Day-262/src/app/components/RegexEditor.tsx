import { CheckCircle2, XCircle } from "lucide-react";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

interface RegexEditorProps {
  pattern: string;
  onPatternChange: (pattern: string) => void;
  flags: {
    caseInsensitive: boolean;
    global: boolean;
    multiline: boolean;
  };
  onFlagsChange: (flags: {
    caseInsensitive: boolean;
    global: boolean;
    multiline: boolean;
  }) => void;
  isValid: boolean;
  error: string;
}

export function RegexEditor({
  pattern,
  onPatternChange,
  flags,
  onFlagsChange,
  isValid,
  error,
}: RegexEditorProps) {
  return (
    <div className="h-full bg-[#1e1e1e] border-r border-b border-[#3e3e42] flex flex-col">
      <div className="p-4 border-b border-[#3e3e42]">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold">Regex Pattern</h2>
          {pattern && (
            <div className="flex items-center gap-2">
              {isValid ? (
                <div className="flex items-center gap-1 text-green-500 text-sm">
                  <CheckCircle2 className="size-4" />
                  <span>Valid</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-500 text-sm">
                  <XCircle className="size-4" />
                  <span>Invalid</span>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-500 font-mono">/</span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => onPatternChange(e.target.value)}
            placeholder="Enter regex pattern..."
            className={`w-full bg-[#2d2d30] border ${
              pattern && !isValid ? "border-red-500" : "border-[#3e3e42]"
            } rounded-md px-8 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <span className="absolute right-3 top-3 text-gray-500 font-mono">
            /{flags.caseInsensitive ? "i" : ""}
            {flags.global ? "g" : ""}
            {flags.multiline ? "m" : ""}
          </span>
        </div>
        {error && (
          <p className="text-red-400 text-sm mt-2 font-mono">{error}</p>
        )}
      </div>

      <div className="p-4 space-y-4">
        <h3 className="font-medium text-sm text-gray-400 uppercase tracking-wide">
          Flags
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label htmlFor="case-insensitive" className="text-sm">
                Case insensitive
              </Label>
              <span className="text-xs text-gray-500 font-mono">i</span>
            </div>
            <Switch
              id="case-insensitive"
              checked={flags.caseInsensitive}
              onCheckedChange={(checked) =>
                onFlagsChange({ ...flags, caseInsensitive: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label htmlFor="global" className="text-sm">
                Global match
              </Label>
              <span className="text-xs text-gray-500 font-mono">g</span>
            </div>
            <Switch
              id="global"
              checked={flags.global}
              onCheckedChange={(checked) =>
                onFlagsChange({ ...flags, global: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label htmlFor="multiline" className="text-sm">
                Multiline
              </Label>
              <span className="text-xs text-gray-500 font-mono">m</span>
            </div>
            <Switch
              id="multiline"
              checked={flags.multiline}
              onCheckedChange={(checked) =>
                onFlagsChange({ ...flags, multiline: checked })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
