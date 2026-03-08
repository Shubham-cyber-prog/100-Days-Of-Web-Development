import { useState } from "react";
import { Upload, MapPin, Check, X, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useTurfs } from "../context/TurfContext";

const sportTypes = ["Cricket", "Football", "Badminton", "Pickleball", "Basketball", "Tennis", "Volleyball"];
const amenitiesList = ["Parking", "Washroom", "Cafeteria", "WiFi", "Changing Room", "First Aid", "Water", "Lights"];

export function AddTurfForm() {
  const { addTurf } = useTurfs();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [turfImages, setTurfImages] = useState<string[]>([]);
  const [qrImage, setQrImage] = useState<string>("");

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    covered: "covered",
    price: "",
    maxPlayers: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add the turf to the shared context
    addTurf({
      name: formData.name,
      location: formData.location,
      price: Number(formData.price),
      sports: selectedSports,
      covered: formData.covered === "covered",
      amenities: selectedAmenities,
      description: formData.description,
      maxPlayers: Number(formData.maxPlayers),
      qrCode: qrImage,
      image: turfImages[0] || "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800", // Use first image or default
    });
    
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        location: "",
        covered: "covered",
        price: "",
        maxPlayers: "",
        description: "",
      });
      setSelectedSports([]);
      setSelectedAmenities([]);
      setTurfImages([]);
      setQrImage("");
    }, 3000);
  };

  const toggleSport = (sport: string) => {
    setSelectedSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
    );
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Mock image URLs - in real app would upload to server
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setTurfImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleQRUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setQrImage(URL.createObjectURL(file));
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl">
        <div className="bg-[#1E1E1E] rounded-[14px] p-12 border border-[#1B5E20] text-center card-elevation">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#00E676] flex items-center justify-center neon-glow">
            <Check className="w-12 h-12 text-[#121212]" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-3">Turf Successfully Added and Live for Booking!</h3>
          <p className="text-[#BDBDBD] mb-2">
            Your turf is now active and visible to all players.
          </p>
          <p className="text-[#00E676] text-sm">
            Players can now browse and book your turf.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Add New Turf</h2>
        <p className="text-[#BDBDBD]">Fill in the details to add a new turf to your portfolio</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-[#1E1E1E] rounded-[14px] p-6 card-elevation">
          <h3 className="text-white font-semibold text-lg mb-4">Basic Information</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Turf Name *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Green Valley Sports Arena"
                className="bg-[#121212] border-[#1B5E20] text-white placeholder:text-[#BDBDBD]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-white">Location *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00E676]" />
                <Input
                  id="location"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Koramangala, Bangalore"
                  className="pl-10 bg-[#121212] border-[#1B5E20] text-white placeholder:text-[#BDBDBD]"
                />
              </div>
              <p className="text-[#BDBDBD] text-xs">
                Click the map icon to select location (Map Picker - Coming Soon)
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your turf facilities..."
                className="bg-[#121212] border-[#1B5E20] text-white placeholder:text-[#BDBDBD] min-h-[100px]"
              />
            </div>
          </div>
        </div>

        {/* Turf Type */}
        <div className="bg-[#1E1E1E] rounded-[14px] p-6 card-elevation">
          <h3 className="text-white font-semibold text-lg mb-4">Turf Type *</h3>
          
          <div className="space-y-4">
            <div>
              <Label className="text-white mb-3 block">Select Sports (Multiple)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {sportTypes.map((sport) => (
                  <button
                    key={sport}
                    type="button"
                    onClick={() => toggleSport(sport)}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      selectedSports.includes(sport)
                        ? "bg-[#00E676] text-[#121212] border-[#00E676] neon-glow"
                        : "bg-[#121212] text-white border-[#1B5E20] hover:border-[#00E676]"
                    }`}
                  >
                    {sport}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-white mb-3 block">Covered / Uncovered *</Label>
              <RadioGroup
                value={formData.covered}
                onValueChange={(value) => setFormData({ ...formData, covered: value })}
              >
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="covered" id="covered" className="border-[#1B5E20]" />
                    <Label htmlFor="covered" className="text-white cursor-pointer">
                      Covered
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="uncovered" id="uncovered" className="border-[#1B5E20]" />
                    <Label htmlFor="uncovered" className="text-white cursor-pointer">
                      Uncovered
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        {/* Pricing & Capacity */}
        <div className="bg-[#1E1E1E] rounded-[14px] p-6 card-elevation">
          <h3 className="text-white font-semibold text-lg mb-4">Pricing & Capacity</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-white">Price per Hour (₹) *</Label>
              <Input
                id="price"
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="e.g., 1500"
                className="bg-[#121212] border-[#1B5E20] text-white placeholder:text-[#BDBDBD]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxPlayers" className="text-white">Max Players *</Label>
              <Input
                id="maxPlayers"
                type="number"
                required
                value={formData.maxPlayers}
                onChange={(e) => setFormData({ ...formData, maxPlayers: e.target.value })}
                placeholder="e.g., 22"
                className="bg-[#121212] border-[#1B5E20] text-white placeholder:text-[#BDBDBD]"
              />
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-[#1E1E1E] rounded-[14px] p-6 card-elevation">
          <h3 className="text-white font-semibold text-lg mb-4">Amenities</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {amenitiesList.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity}
                  checked={selectedAmenities.includes(amenity)}
                  onCheckedChange={() => toggleAmenity(amenity)}
                  className="border-[#1B5E20]"
                />
                <Label htmlFor={amenity} className="text-white cursor-pointer">
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="bg-[#1E1E1E] rounded-[14px] p-6 card-elevation">
          <h3 className="text-white font-semibold text-lg mb-4">Turf Images *</h3>
          
          <div className="space-y-4">
            <div>
              <label
                htmlFor="turf-images"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#1B5E20] rounded-lg cursor-pointer hover:border-[#00E676] transition-all"
              >
                <Upload className="w-8 h-8 text-[#00E676] mb-2" />
                <span className="text-white text-sm">Click to upload turf images</span>
                <span className="text-[#BDBDBD] text-xs">PNG, JPG up to 10MB</span>
              </label>
              <input
                id="turf-images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {turfImages.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {turfImages.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img}
                      alt={`Turf ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setTurfImages(turfImages.filter((_, i) => i !== index))}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Payment QR */}
        <div className="bg-[#1E1E1E] rounded-[14px] p-6 card-elevation">
          <h3 className="text-white font-semibold text-lg mb-4">Payment QR Code *</h3>
          
          <div className="space-y-4">
            <div>
              <label
                htmlFor="qr-code"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#1B5E20] rounded-lg cursor-pointer hover:border-[#00E676] transition-all"
              >
                <Upload className="w-8 h-8 text-[#00E676] mb-2" />
                <span className="text-white text-sm">Upload Payment QR Code</span>
                <span className="text-[#BDBDBD] text-xs">This will be shown to players for payment</span>
              </label>
              <input
                id="qr-code"
                type="file"
                accept="image/*"
                onChange={handleQRUpload}
                className="hidden"
              />
            </div>

            {qrImage && (
              <div className="flex justify-center">
                <div className="relative group">
                  <img
                    src={qrImage}
                    alt="Payment QR"
                    className="w-48 h-48 object-contain rounded-lg bg-white p-2"
                  />
                  <button
                    type="button"
                    onClick={() => setQrImage("")}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <Button
            type="submit"
            className="flex-1 bg-[#00E676] text-[#121212] hover:bg-[#00E676]/90 neon-glow-hover font-semibold py-6 text-lg"
          >
            Add Turf
          </Button>
        </div>
      </form>
    </div>
  );
}