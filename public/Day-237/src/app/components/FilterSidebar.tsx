import { useState } from "react";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export function FilterSidebar() {
  const [sortBy, setSortBy] = useState("distance");
  const [showAdvanced, setShowAdvanced] = useState(true);
  
  const [filters, setFilters] = useState({
    offers: false,
    covered: false,
    uncovered: false,
    open24x7: false,
    availableOnly: false,
  });

  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const sports = ["Cricket", "Football", "Badminton", "Pickleball", "Basketball"];
  const amenities = ["Parking", "Washroom", "Cafeteria", "Changing Room", "First Aid"];

  const toggleSport = (sport: string) => {
    setSelectedSports(prev =>
      prev.includes(sport) ? prev.filter(s => s !== sport) : [...prev, sport]
    );
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const handleReset = () => {
    setSortBy("distance");
    setFilters({
      offers: false,
      covered: false,
      uncovered: false,
      open24x7: false,
      availableOnly: false,
    });
    setSelectedSports([]);
    setSelectedAmenities([]);
  };

  return (
    <div className="bg-[#1E1E1E] rounded-[14px] p-6 card-elevation sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Filters</h3>
        <Button
          onClick={handleReset}
          variant="ghost"
          size="sm"
          className="text-[#00E676] hover:text-[#00E676]/80"
        >
          Reset All
        </Button>
      </div>

      {/* Sorting */}
      <div className="mb-6">
        <Label className="text-white font-semibold mb-3 block">Sort By</Label>
        <RadioGroup value={sortBy} onValueChange={setSortBy}>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="distance" id="distance" className="border-[#1B5E20]" />
              <Label htmlFor="distance" className="text-[#BDBDBD] cursor-pointer">
                Distance (Nearest First)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="price-high" id="price-high" className="border-[#1B5E20]" />
              <Label htmlFor="price-high" className="text-[#BDBDBD] cursor-pointer">
                Price: High to Low
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="price-low" id="price-low" className="border-[#1B5E20]" />
              <Label htmlFor="price-low" className="text-[#BDBDBD] cursor-pointer">
                Price: Low to High
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rating" id="rating" className="border-[#1B5E20]" />
              <Label htmlFor="rating" className="text-[#BDBDBD] cursor-pointer">
                Rating (Highest First)
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      <Separator className="my-6 bg-[#1B5E20]" />

      {/* Advanced Filters */}
      <div>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center justify-between w-full mb-4"
        >
          <Label className="text-white font-semibold cursor-pointer">Advanced Filters</Label>
          {showAdvanced ? (
            <ChevronUp className="h-5 w-5 text-[#00E676]" />
          ) : (
            <ChevronDown className="h-5 w-5 text-[#00E676]" />
          )}
        </button>

        {showAdvanced && (
          <div className="space-y-4">
            {/* Quick Filters */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="offers"
                  checked={filters.offers}
                  onCheckedChange={(checked) =>
                    setFilters({ ...filters, offers: checked as boolean })
                  }
                  className="border-[#1B5E20]"
                />
                <Label htmlFor="offers" className="text-[#BDBDBD] cursor-pointer">
                  Offers Available
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="covered"
                  checked={filters.covered}
                  onCheckedChange={(checked) =>
                    setFilters({ ...filters, covered: checked as boolean })
                  }
                  className="border-[#1B5E20]"
                />
                <Label htmlFor="covered" className="text-[#BDBDBD] cursor-pointer">
                  Covered
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="uncovered"
                  checked={filters.uncovered}
                  onCheckedChange={(checked) =>
                    setFilters({ ...filters, uncovered: checked as boolean })
                  }
                  className="border-[#1B5E20]"
                />
                <Label htmlFor="uncovered" className="text-[#BDBDBD] cursor-pointer">
                  Uncovered
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="24x7"
                  checked={filters.open24x7}
                  onCheckedChange={(checked) =>
                    setFilters({ ...filters, open24x7: checked as boolean })
                  }
                  className="border-[#1B5E20]"
                />
                <Label htmlFor="24x7" className="text-[#BDBDBD] cursor-pointer">
                  24/7 Open
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="available"
                  checked={filters.availableOnly}
                  onCheckedChange={(checked) =>
                    setFilters({ ...filters, availableOnly: checked as boolean })
                  }
                  className="border-[#1B5E20]"
                />
                <Label htmlFor="available" className="text-[#BDBDBD] cursor-pointer">
                  Available Turf Only
                </Label>
              </div>
            </div>

            <Separator className="my-4 bg-[#1B5E20]" />

            {/* Sports Type */}
            <div>
              <Label className="text-white font-semibold mb-3 block">Type of Sport</Label>
              <div className="space-y-2">
                {sports.map((sport) => (
                  <div key={sport} className="flex items-center space-x-2">
                    <Checkbox
                      id={`sport-${sport}`}
                      checked={selectedSports.includes(sport)}
                      onCheckedChange={() => toggleSport(sport)}
                      className="border-[#1B5E20]"
                    />
                    <Label
                      htmlFor={`sport-${sport}`}
                      className="text-[#BDBDBD] cursor-pointer"
                    >
                      {sport}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-4 bg-[#1B5E20]" />

            {/* Amenities */}
            <div>
              <Label className="text-white font-semibold mb-3 block">Amenities</Label>
              <div className="space-y-2">
                {amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={`amenity-${amenity}`}
                      checked={selectedAmenities.includes(amenity)}
                      onCheckedChange={() => toggleAmenity(amenity)}
                      className="border-[#1B5E20]"
                    />
                    <Label
                      htmlFor={`amenity-${amenity}`}
                      className="text-[#BDBDBD] cursor-pointer"
                    >
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <Separator className="my-6 bg-[#1B5E20]" />

      {/* Apply Button */}
      <Button className="w-full bg-[#00E676] text-[#121212] hover:bg-[#00E676]/90 neon-glow-hover font-semibold">
        Apply Filters
      </Button>
    </div>
  );
}
