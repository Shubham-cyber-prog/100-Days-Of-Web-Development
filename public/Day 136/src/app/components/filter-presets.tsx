import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Save, Trash2, Filter, Star } from "lucide-react";
import { toast } from "sonner";

export interface FilterPreset {
  id: string;
  name: string;
  filters: {
    status: string;
    severity: string;
    category: string;
    confidence: string;
  };
}

interface FilterPresetsProps {
  currentFilters: FilterPreset["filters"];
  onApplyPreset: (preset: FilterPreset) => void;
}

export function FilterPresets({
  currentFilters,
  onApplyPreset,
}: FilterPresetsProps) {
  const [presets, setPresets] = useState<FilterPreset[]>([
    {
      id: "1",
      name: "High Priority",
      filters: {
        status: "pending",
        severity: "critical",
        category: "all",
        confidence: "high",
      },
    },
    {
      id: "2",
      name: "Needs Review",
      filters: {
        status: "escalated",
        severity: "all",
        category: "all",
        confidence: "all",
      },
    },
  ]);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [presetName, setPresetName] = useState("");

  const handleSavePreset = () => {
    if (!presetName.trim()) {
      toast.error("Please enter a preset name");
      return;
    }

    const newPreset: FilterPreset = {
      id: Date.now().toString(),
      name: presetName,
      filters: currentFilters,
    };

    setPresets([...presets, newPreset]);
    toast.success("Filter preset saved", {
      description: `"${presetName}" has been saved to your presets.`,
    });
    setPresetName("");
    setSaveDialogOpen(false);
  };

  const handleDeletePreset = (id: string) => {
    setPresets(presets.filter((p) => p.id !== id));
    toast.success("Preset deleted");
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Star className="w-4 h-4" />
          Saved Filters
        </Label>
        <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save Current
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Save Filter Preset</DialogTitle>
              <DialogDescription>
                Save your current filter combination for quick access later.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="preset-name">Preset Name</Label>
                <Input
                  id="preset-name"
                  placeholder="e.g., High Priority Items"
                  value={presetName}
                  onChange={(e) => setPresetName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Current Filters</Label>
                <div className="flex flex-wrap gap-2">
                  {currentFilters.status !== "all" && (
                    <Badge variant="secondary">
                      Status: {currentFilters.status}
                    </Badge>
                  )}
                  {currentFilters.severity !== "all" && (
                    <Badge variant="secondary">
                      Severity: {currentFilters.severity}
                    </Badge>
                  )}
                  {currentFilters.category !== "all" && (
                    <Badge variant="secondary">
                      Category: {currentFilters.category}
                    </Badge>
                  )}
                  {currentFilters.confidence !== "all" && (
                    <Badge variant="secondary">
                      Confidence: {currentFilters.confidence}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setSaveDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSavePreset}>Save Preset</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-wrap gap-2">
        {presets.length === 0 ? (
          <p className="text-sm text-muted-foreground py-2">
            No saved presets yet. Save your current filters to quick access
            later.
          </p>
        ) : (
          presets.map((preset) => (
            <div
              key={preset.id}
              className="flex items-center gap-1 bg-accent rounded-lg pl-3 pr-1 py-1"
            >
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 hover:bg-accent-foreground/10"
                onClick={() => onApplyPreset(preset)}
              >
                <Filter className="w-3 h-3 mr-2" />
                {preset.name}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 hover:bg-red-50 hover:text-red-600"
                onClick={() => handleDeletePreset(preset.id)}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
