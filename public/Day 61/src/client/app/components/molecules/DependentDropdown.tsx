"use client";
import { useState, useEffect } from "react";
import Dropdown from "./Dropdown";

// Interfaces
interface DropdownOption {
  label: string;
  value: string;
}

// Mock Data (to be replaced with API calls)
const mockProvinces: DropdownOption[] = [
  { label: "Cairo", value: "cairo" },
  { label: "Alexandria", value: "alexandria" },
  { label: "Giza", value: "giza" },
  { label: "Luxor", value: "luxor" },
];

const mockAreas: { [key: string]: DropdownOption[] } = {
  cairo: [
    { label: "Nasr City", value: "nasr_city" },
    { label: "Maadi", value: "maadi" },
    { label: "Heliopolis", value: "heliopolis" },
  ],
  alexandria: [
    { label: "Miami", value: "miami" },
    { label: "Smouha", value: "smouha" },
    { label: "Sidi Gaber", value: "sidi_gaber" },
  ],
  giza: [
    { label: "6th of October", value: "6th_october" },
    { label: "Sheikh Zayed", value: "sheikh_zayed" },
  ],
  luxor: [
    { label: "East Bank", value: "east_bank" },
    { label: "West Bank", value: "west_bank" },
  ],
};

// Dependent Dropdown Component
const DependentDropdown: React.FC = () => {
  const [province, setProvince] = useState<string | null>(null);
  const [area, setArea] = useState<string | null>(null);
  const [areas, setAreas] = useState<DropdownOption[]>([]);
  const [isLoadingAreas, setIsLoadingAreas] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (province) {
      // Reset area when province changes
      setArea(null);
      setIsLoadingAreas(true);
      setError(null);

      // Simulate API call
      const fetchAreas = async () => {
        try {
          // Replace with actual API call
          // const response = await fetch(`/api/areas?province=${province}`);
          // const data = await response.json();

          // Mock delay
          await new Promise((resolve) => setTimeout(resolve, 500));

          const newAreas = mockAreas[province] || [];
          setAreas(newAreas);
        } catch (err: any) {
          console.log("err => ", err);
          setError("Failed to load areas");
          setAreas([]);
        } finally {
          setIsLoadingAreas(false);
        }
      };

      fetchAreas();
    } else {
      setAreas([]);
      setArea(null);
    }
  }, [province]);

  return (
    <div className="space-y-4 w-full max-w-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Province
        </label>
        <Dropdown
          options={mockProvinces}
          value={province}
          onChange={setProvince}
          label="Select Province"
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Area
        </label>
        <Dropdown
          options={areas}
          value={area}
          onChange={setArea}
          label="Select Area"
          className="w-full"
          disabled={!province || isLoadingAreas}
          isLoading={isLoadingAreas}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {(province || area) && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            Selected:
            {province
              ? ` ${mockProvinces.find((p) => p.value === province)?.label}`
              : ""}
            {area ? `, ${areas.find((a) => a.value === area)?.label}` : ""}
          </p>
        </div>
      )}
    </div>
  );
};

export default DependentDropdown;
