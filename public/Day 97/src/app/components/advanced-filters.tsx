import { useState } from "react";
import { Filter, ArrowUpDown, X } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface FilterOption {
  id: string;
  label: string;
  value: string;
  checked: boolean;
}

interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

interface AdvancedFiltersProps {
  onFiltersChange?: (filters: Record<string, string[]>) => void;
  onSortChange?: (sortBy: string, sortOrder: "asc" | "desc") => void;
}

const defaultFilterGroups: FilterGroup[] = [
  {
    id: "status",
    label: "Status",
    options: [
      { id: "open", label: "Open", value: "open", checked: false },
      { id: "in-progress", label: "In Progress", value: "in-progress", checked: false },
      { id: "assigned", label: "Assigned", value: "assigned", checked: false },
      { id: "resolved", label: "Resolved", value: "resolved", checked: false },
    ],
  },
  {
    id: "priority",
    label: "Priority",
    options: [
      { id: "high", label: "High", value: "high", checked: false },
      { id: "medium", label: "Medium", value: "medium", checked: false },
      { id: "low", label: "Low", value: "low", checked: false },
    ],
  },
  {
    id: "category",
    label: "Category",
    options: [
      { id: "infrastructure", label: "Infrastructure", value: "infrastructure", checked: false },
      { id: "safety", label: "Safety", value: "safety", checked: false },
      { id: "environment", label: "Environment", value: "environment", checked: false },
      { id: "other", label: "Other", value: "other", checked: false },
    ],
  },
];

export function AdvancedFilters({ onFiltersChange, onSortChange }: AdvancedFiltersProps) {
  const [filterGroups, setFilterGroups] = useState<FilterGroup[]>(defaultFilterGroups);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [open, setOpen] = useState(false);

  const activeFilterCount = filterGroups.reduce(
    (count, group) => count + group.options.filter((opt) => opt.checked).length,
    0
  );

  const handleFilterChange = (groupId: string, optionId: string, checked: boolean) => {
    const updatedGroups = filterGroups.map((group) =>
      group.id === groupId
        ? {
            ...group,
            options: group.options.map((opt) =>
              opt.id === optionId ? { ...opt, checked } : opt
            ),
          }
        : group
    );
    setFilterGroups(updatedGroups);

    // Emit filter changes
    const filters = updatedGroups.reduce((acc, group) => {
      const selected = group.options.filter((opt) => opt.checked).map((opt) => opt.value);
      if (selected.length > 0) {
        acc[group.id] = selected;
      }
      return acc;
    }, {} as Record<string, string[]>);

    onFiltersChange?.(filters);
  };

  const handleClearAll = () => {
    const clearedGroups = filterGroups.map((group) => ({
      ...group,
      options: group.options.map((opt) => ({ ...opt, checked: false })),
    }));
    setFilterGroups(clearedGroups);
    onFiltersChange?.({});
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    onSortChange?.(value, sortOrder);
  };

  const handleSortOrderToggle = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    onSortChange?.(sortBy, newOrder);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Sort Dropdown */}
      <Select value={sortBy} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[140px] bg-input-background">
          <ArrowUpDown className="size-4 mr-2" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date">Date</SelectItem>
          <SelectItem value="priority">Priority</SelectItem>
          <SelectItem value="title">Title</SelectItem>
          <SelectItem value="comments">Comments</SelectItem>
        </SelectContent>
      </Select>

      {/* Sort Order Toggle */}
      <Button
        variant="outline"
        size="icon"
        onClick={handleSortOrderToggle}
        className="shrink-0"
      >
        <ArrowUpDown
          className={`size-4 transition-transform ${
            sortOrder === "asc" ? "rotate-180" : ""
          }`}
        />
      </Button>

      {/* Filter Popover */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2 relative">
            <Filter className="size-4" />
            <span className="hidden sm:inline">Filters</span>
            {activeFilterCount > 0 && (
              <Badge className="ml-1 size-5 flex items-center justify-center p-0 bg-primary text-primary-foreground">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Filters</h4>
              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearAll}
                  className="h-auto py-1 px-2 text-xs"
                >
                  Clear all
                </Button>
              )}
            </div>

            {filterGroups.map((group, groupIndex) => (
              <div key={group.id}>
                {groupIndex > 0 && <Separator className="mb-4" />}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">{group.label}</Label>
                  {group.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={option.id}
                        checked={option.checked}
                        onCheckedChange={(checked) =>
                          handleFilterChange(group.id, option.id, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={option.id}
                        className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {activeFilterCount > 0 && (
              <>
                <Separator />
                <div className="flex flex-wrap gap-2">
                  {filterGroups.map((group) =>
                    group.options
                      .filter((opt) => opt.checked)
                      .map((option) => (
                        <Badge
                          key={option.id}
                          variant="secondary"
                          className="gap-1 pr-1"
                        >
                          {option.label}
                          <button
                            onClick={() =>
                              handleFilterChange(group.id, option.id, false)
                            }
                            className="ml-1 rounded-sm hover:bg-muted"
                          >
                            <X className="size-3" />
                          </button>
                        </Badge>
                      ))
                  )}
                </div>
              </>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
