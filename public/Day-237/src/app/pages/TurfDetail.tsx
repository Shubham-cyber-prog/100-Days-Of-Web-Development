import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import {
  ArrowLeft,
  MapPin,
  Star,
  Clock,
  Shield,
  Wifi,
  Car,
  Coffee,
  Users,
  Minus,
  Plus,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Calendar } from "../components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { LeafletMap } from "../components/LeafletMap";

// Mock turf data
const mockTurf = {
  id: 1,
  name: "Green Valley Sports Arena",
  location: "Koramangala, Bangalore",
  images: [
    "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=1200",
    "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200",
    "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200",
  ],
  price: 1500,
  sports: ["Cricket", "Football", "Badminton"],
  rating: 4.8,
  reviews: 124,
  covered: true,
  open24x7: false,
  amenities: [
    { icon: Car, label: "Parking" },
    { icon: Shield, label: "Washroom" },
    { icon: Coffee, label: "Cafeteria" },
    { icon: Wifi, label: "WiFi" },
  ],
  description:
    "Premium sports facility with state-of-the-art infrastructure. Perfect for professional matches and training sessions.",
  maxPlayers: 22,
  lat: 12.9352,
  lng: 77.6245,
};

const timeSlots = [
  "6:00 AM - 7:00 AM",
  "7:00 AM - 8:00 AM",
  "8:00 AM - 9:00 AM",
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 1:00 PM",
  "1:00 PM - 2:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
  "5:00 PM - 6:00 PM",
  "6:00 PM - 7:00 PM",
  "7:00 PM - 8:00 PM",
  "8:00 PM - 9:00 PM",
  "9:00 PM - 10:00 PM",
];

// Mock QR code for payment
const mockQRCode = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=UPI://pay?pa=turfowner@upi&pn=TurfOwner&am=";

export function TurfDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [numPlayers, setNumPlayers] = useState(10);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isLoggedIn = !!localStorage.getItem("turfbook_user");

  const toggleSlot = (slot: string) => {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const totalAmount = selectedSlots.length * mockTurf.price;

  const handleConfirmBooking = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePaymentComplete = () => {
    setShowPaymentModal(false);
    setShowConfirmationModal(true);
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#1E1E1E] border-b border-[#1B5E20] backdrop-blur-custom">
        <div className="container mx-auto px-4 py-4">
          <Button
            onClick={() => navigate("/home")}
            variant="ghost"
            className="text-white hover:text-[#00E676]"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="relative rounded-[14px] overflow-hidden h-[400px] group">
              <img
                src={mockTurf.images[currentImageIndex]}
                alt={mockTurf.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Image Navigation */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {mockTurf.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? "w-8 bg-[#00E676] neon-glow"
                        : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Turf Info */}
            <div className="bg-[#1E1E1E] rounded-[14px] p-6 card-elevation">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {mockTurf.name}
                  </h1>
                  <div className="flex items-center gap-2 text-[#BDBDBD]">
                    <MapPin className="w-5 h-5 text-[#00E676]" />
                    <span>{mockTurf.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-[#121212] px-4 py-2 rounded-lg">
                  <Star className="w-5 h-5 fill-[#00E676] text-[#00E676]" />
                  <span className="text-white font-bold text-lg">
                    {mockTurf.rating}
                  </span>
                  <span className="text-[#BDBDBD]">({mockTurf.reviews})</span>
                </div>
              </div>

              {/* Sports */}
              <div className="flex gap-2 mb-6">
                {mockTurf.sports.map((sport) => (
                  <Badge
                    key={sport}
                    className="bg-[#1B5E20] text-[#00E676] border border-[#00E676]"
                  >
                    {sport}
                  </Badge>
                ))}
                {mockTurf.covered && (
                  <Badge className="bg-[#00E676]/20 text-[#00E676]">Covered</Badge>
                )}
                {mockTurf.open24x7 && (
                  <Badge className="bg-[#00E676]/20 text-[#00E676]">24/7</Badge>
                )}
              </div>

              {/* Description */}
              <p className="text-[#BDBDBD] mb-6">{mockTurf.description}</p>

              {/* Amenities */}
              <div>
                <h3 className="text-white font-semibold mb-3">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {mockTurf.amenities.map((amenity) => (
                    <div
                      key={amenity.label}
                      className="flex items-center gap-2 text-[#BDBDBD]"
                    >
                      <amenity.icon className="w-5 h-5 text-[#00E676]" />
                      <span>{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Preview */}
            <div className="bg-[#1E1E1E] rounded-[14px] p-6 card-elevation">
              <h3 className="text-white font-semibold mb-4">Location</h3>
              <LeafletMap
                lat={mockTurf.lat}
                lng={mockTurf.lng}
                locationName={mockTurf.location}
                height="256px"
                zoom={15}
              />
            </div>
          </div>

          {/* Right Column - Booking */}
          <div className="lg:col-span-1">
            <div className="bg-[#1E1E1E] rounded-[14px] p-6 card-elevation sticky top-24">
              <div className="mb-6">
                <p className="text-[#BDBDBD] text-sm mb-1">Price per hour</p>
                <p className="text-[#00E676] text-3xl font-bold">
                  ₹{mockTurf.price}
                </p>
              </div>

              {/* Date Selector */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3">Select Date</h3>
                <div className="bg-[#0F0F0F] rounded-[16px] border border-[#00E676]/30 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Time Slots */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3">
                  Select Time Slots
                </h3>
                <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => toggleSlot(slot)}
                      className={`px-3 py-2 rounded-lg text-sm transition-all border ${
                        selectedSlots.includes(slot)
                          ? "bg-[#00E676] text-[#121212] border-[#00E676] neon-glow"
                          : "bg-[#121212] text-white border-[#1B5E20] hover:border-[#00E676]"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of Players */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3">
                  Number of Players
                </h3>
                <div className="flex items-center justify-between bg-[#121212] rounded-lg p-3 border border-[#1B5E20]">
                  <Button
                    onClick={() => setNumPlayers(Math.max(1, numPlayers - 1))}
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-[#00E676]"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-white font-bold text-xl">{numPlayers}</span>
                  <Button
                    onClick={() =>
                      setNumPlayers(Math.min(mockTurf.maxPlayers, numPlayers + 1))
                    }
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-[#00E676]"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-[#BDBDBD] text-xs mt-1 text-center">
                  Max {mockTurf.maxPlayers} players
                </p>
              </div>

              {/* Total Amount */}
              {selectedSlots.length > 0 && (
                <div className="mb-6 bg-[#121212] rounded-lg p-4 border border-[#00E676]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#BDBDBD]">Selected Slots:</span>
                    <span className="text-white font-semibold">
                      {selectedSlots.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#BDBDBD]">Total Amount:</span>
                    <span className="text-[#00E676] font-bold text-2xl">
                      ₹{totalAmount}
                    </span>
                  </div>
                </div>
              )}

              {/* Confirm Button */}
              <Button
                onClick={handleConfirmBooking}
                disabled={selectedSlots.length === 0}
                className="w-full bg-[#00E676] text-[#121212] hover:bg-[#00E676]/90 neon-glow-hover font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="bg-[#1E1E1E] border-[#1B5E20] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl">Complete Payment</DialogTitle>
            <DialogDescription className="text-[#BDBDBD]">
              Scan the QR code to make payment
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 space-y-6">
            {/* QR Code */}
            <div className="bg-white rounded-lg p-4 mx-auto w-fit">
              <img
                src={`${mockQRCode}${totalAmount}`}
                alt="Payment QR Code"
                className="w-64 h-64"
              />
            </div>

            {/* Amount */}
            <div className="text-center">
              <p className="text-[#BDBDBD] mb-1">Amount to Pay</p>
              <p className="text-[#00E676] text-4xl font-bold">₹{totalAmount}</p>
            </div>

            <div className="bg-[#121212] rounded-lg p-4 border border-[#1B5E20]">
              <p className="text-[#BDBDBD] text-sm text-center">
                After completing the payment, click the button below
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={handlePaymentComplete}
              className="w-full bg-[#00E676] text-[#121212] hover:bg-[#00E676]/90 neon-glow-hover"
            >
              I've Completed Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmationModal} onOpenChange={setShowConfirmationModal}>
        <DialogContent className="bg-[#1E1E1E] border-[#1B5E20]">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl">
              Waiting for Confirmation
            </DialogTitle>
            <DialogDescription className="text-[#BDBDBD]">
              Your booking is pending owner confirmation
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 text-center">
            <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
            <p className="text-white mb-2">Payment Received!</p>
            <p className="text-[#BDBDBD] text-sm">
              The turf owner will review and confirm your booking shortly.
              You'll be notified once confirmed.
            </p>
          </div>

          <DialogFooter>
            <Link to="/home" className="w-full">
              <Button className="w-full bg-[#00E676] text-[#121212] hover:bg-[#00E676]/90">
                Go to Home
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}