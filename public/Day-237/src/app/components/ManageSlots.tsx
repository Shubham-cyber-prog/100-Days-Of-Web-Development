import { useState } from "react";
import { Calendar, Clock, MapPin, User, Filter } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const mockBookings = [
  {
    id: 1,
    turfImage: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800",
    turfName: "Green Valley Sports Arena",
    location: "Koramangala, Bangalore",
    date: "2026-02-15",
    timeSlot: "10:00 AM - 11:00 AM",
    playerName: "Rahul Kumar",
    playerPhone: "+91 9876543210",
    paymentStatus: "Paid",
    status: "Booked",
  },
  {
    id: 2,
    turfImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    turfName: "Champions Cricket Ground",
    location: "Indiranagar, Bangalore",
    date: "2026-02-16",
    timeSlot: "6:00 PM - 7:00 PM",
    playerName: "Amit Sharma",
    playerPhone: "+91 9876543211",
    paymentStatus: "Pending",
    status: "Pending",
  },
  {
    id: 3,
    turfImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    turfName: "Elite Football Turf",
    location: "HSR Layout, Bangalore",
    date: "2026-02-10",
    timeSlot: "4:00 PM - 5:00 PM",
    playerName: "Vikas Patel",
    playerPhone: "+91 9876543212",
    paymentStatus: "Paid",
    status: "Played",
  },
  {
    id: 4,
    turfImage: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800",
    turfName: "Green Valley Sports Arena",
    location: "Koramangala, Bangalore",
    date: "2026-02-12",
    timeSlot: "3:00 PM - 4:00 PM",
    playerName: "Sanjay Reddy",
    playerPhone: "+91 9876543213",
    paymentStatus: "Refunded",
    status: "Cancelled",
  },
  {
    id: 5,
    turfImage: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800",
    turfName: "Victory Multi-Sport Complex",
    location: "Whitefield, Bangalore",
    date: "2026-02-18",
    timeSlot: "7:00 AM - 8:00 AM",
    playerName: "Kiran Singh",
    playerPhone: "+91 9876543214",
    paymentStatus: "Paid",
    status: "Booked",
  },
  {
    id: 6,
    turfImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    turfName: "Elite Football Turf",
    location: "HSR Layout, Bangalore",
    date: "2026-02-20",
    timeSlot: "5:00 PM - 6:00 PM",
    playerName: "Manoj Tiwari",
    playerPhone: "+91 9876543215",
    paymentStatus: "Paid",
    status: "Booked",
  },
];

export function ManageSlots() {
  const [dateFilter, setDateFilter] = useState("all");
  const [turfFilter, setTurfFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  const uniqueTurfs = Array.from(
    new Set(mockBookings.map((b) => b.turfName))
  );

  let filteredBookings = mockBookings;

  if (turfFilter !== "all") {
    filteredBookings = filteredBookings.filter((b) => b.turfName === turfFilter);
  }

  if (paymentFilter !== "all") {
    filteredBookings = filteredBookings.filter(
      (b) => b.paymentStatus.toLowerCase() === paymentFilter.toLowerCase()
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "booked":
        return "bg-[#00E676]/20 text-[#00E676] border-[#00E676]";
      case "pending":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500";
      case "played":
        return "bg-blue-500/20 text-blue-500 border-blue-500";
      case "cancelled":
        return "bg-red-500/20 text-red-500 border-red-500";
      default:
        return "bg-[#BDBDBD]/20 text-[#BDBDBD] border-[#BDBDBD]";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-[#00E676]/20 text-[#00E676]";
      case "pending":
        return "bg-yellow-500/20 text-yellow-500";
      case "refunded":
        return "bg-blue-500/20 text-blue-500";
      default:
        return "bg-[#BDBDBD]/20 text-[#BDBDBD]";
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Manage Slots</h2>
        <p className="text-[#BDBDBD]">View all bookings across your turfs</p>
      </div>

      {/* Filters */}
      <div className="bg-[#1E1E1E] rounded-[14px] p-6 card-elevation mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Filter className="w-5 h-5 text-[#00E676]" />
          <h3 className="text-white font-semibold">Filters</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-[#BDBDBD] text-sm">Turf Name</label>
            <Select value={turfFilter} onValueChange={setTurfFilter}>
              <SelectTrigger className="bg-[#121212] border-[#1B5E20] text-white">
                <SelectValue placeholder="All Turfs" />
              </SelectTrigger>
              <SelectContent className="bg-[#1E1E1E] border-[#1B5E20]">
                <SelectItem value="all">All Turfs</SelectItem>
                {uniqueTurfs.map((turf) => (
                  <SelectItem key={turf} value={turf}>
                    {turf}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-[#BDBDBD] text-sm">Payment Status</label>
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="bg-[#121212] border-[#1B5E20] text-white">
                <SelectValue placeholder="All Payments" />
              </SelectTrigger>
              <SelectContent className="bg-[#1E1E1E] border-[#1B5E20]">
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-[#BDBDBD] text-sm">Date</label>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="bg-[#121212] border-[#1B5E20] text-white">
                <SelectValue placeholder="All Dates" />
              </SelectTrigger>
              <SelectContent className="bg-[#1E1E1E] border-[#1B5E20]">
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Bookings Grid */}
      {filteredBookings.length === 0 ? (
        <div className="bg-[#1E1E1E] rounded-[14px] p-12 text-center card-elevation">
          <p className="text-[#BDBDBD] text-lg">No bookings found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-[#1E1E1E] rounded-[14px] overflow-hidden card-elevation hover:border-[#00E676] border-2 border-transparent transition-all group"
            >
              {/* Image Header */}
              <div className="relative h-32">
                <img
                  src={booking.turfImage}
                  alt={booking.turfName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <h3 className="text-white font-bold">{booking.turfName}</h3>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2 text-[#BDBDBD] text-sm">
                  <MapPin className="w-4 h-4 text-[#00E676]" />
                  <span>{booking.location}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#00E676]" />
                    <span className="text-white text-sm">
                      {new Date(booking.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#00E676]" />
                    <span className="text-white text-sm">{booking.timeSlot}</span>
                  </div>
                </div>

                <div className="bg-[#121212] rounded-lg p-3 border border-[#1B5E20]">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-4 h-4 text-[#00E676]" />
                    <span className="text-white font-medium text-sm">
                      {booking.playerName}
                    </span>
                  </div>
                  <p className="text-[#BDBDBD] text-xs ml-6">
                    {booking.playerPhone}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#1B5E20]">
                  <span className="text-[#BDBDBD] text-sm">Payment</span>
                  <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                    {booking.paymentStatus}
                  </Badge>
                </div>

                <Button className="w-full bg-[#00E676] text-[#121212] hover:bg-[#00E676]/90 neon-glow-hover">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
