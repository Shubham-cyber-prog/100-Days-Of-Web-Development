import { motion } from "motion/react";
import { Calendar, Clock, User, Phone, IndianRupee, Check, X, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

const mockBookings = [
  {
    id: 1,
    playerName: "Rahul Sharma",
    phone: "+91 98765 43210",
    turfName: "Regional Sports Arena",
    date: "Feb 16, 2026",
    time: "6:00 PM - 7:00 PM",
    amount: 1000,
    paymentStatus: "paid",
    status: "confirmed",
  },
  {
    id: 2,
    playerName: "Priya Patel",
    phone: "+91 98765 43211",
    turfName: "Elite Cricket Stadium",
    date: "Feb 17, 2026",
    time: "7:00 PM - 8:00 PM",
    amount: 1500,
    paymentStatus: "paid",
    status: "confirmed",
  },
  {
    id: 3,
    playerName: "Amit Kumar",
    phone: "+91 98765 43212",
    turfName: "Regional Sports Arena",
    date: "Feb 18, 2026",
    time: "8:00 PM - 9:00 PM",
    amount: 1000,
    paymentStatus: "paid",
    status: "pending",
  },
  {
    id: 4,
    playerName: "Sneha Reddy",
    phone: "+91 98765 43213",
    turfName: "Metro Sports Complex",
    date: "Feb 19, 2026",
    time: "5:00 PM - 6:00 PM",
    amount: 1200,
    paymentStatus: "paid",
    status: "pending",
  },
  {
    id: 5,
    playerName: "Vikram Singh",
    phone: "+91 98765 43214",
    turfName: "Champions Ground",
    date: "Feb 20, 2026",
    time: "6:00 PM - 7:00 PM",
    amount: 1100,
    paymentStatus: "paid",
    status: "rejected",
  },
];

export function BookingLogs() {
  const [bookings, setBookings] = useState(mockBookings);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const handleApprove = (bookingId: number) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId ? { ...booking, status: "confirmed" } : booking
      )
    );
    // In real app, send notification to player
    console.log(`Booking ${bookingId} approved`);
  };

  const handleRejectClick = (bookingId: number) => {
    setSelectedBookingId(bookingId);
    setShowRejectDialog(true);
  };

  const handleRejectConfirm = () => {
    if (selectedBookingId) {
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === selectedBookingId
            ? { ...booking, status: "rejected", rejectionReason }
            : booking
        )
      );
      // In real app, send notification to player with rejection reason
      console.log(`Booking ${selectedBookingId} rejected with reason: ${rejectionReason}`);
    }
    setShowRejectDialog(false);
    setRejectionReason("");
    setSelectedBookingId(null);
  };

  const getStatusBadge = (status: string) => {
    const configs = {
      confirmed: {
        bg: "bg-[#1B5E20]",
        text: "text-[#00E676]",
        icon: Check,
      },
      pending: {
        bg: "bg-yellow-500/20",
        text: "text-yellow-500",
        icon: AlertCircle,
      },
      rejected: {
        bg: "bg-[#3A1A1A]",
        text: "text-[#FF6B6B]",
        icon: X,
      },
    };

    const config = configs[status as keyof typeof configs];
    const Icon = config.icon;

    return (
      <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${config.bg} ${config.text}`}>
        <Icon className="w-4 h-4" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPaymentStatusBadge = (status: string) => {
    const isPaid = status.toLowerCase() === "paid";
    return (
      <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
        isPaid ? "bg-[#1B5E20] text-[#00E676]" : "bg-yellow-500/20 text-yellow-500"
      }`}>
        <Check className="w-3 h-3" />
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">Booking Logs</h2>
          <p className="text-[#BDBDBD] text-sm sm:text-base lg:text-lg">View all your turf bookings</p>
        </div>
        
        <div className="flex gap-2 sm:gap-3">
          <select className="bg-[#1E1E1E] text-white px-3 sm:px-4 py-2 rounded-xl border border-[#1B5E20] focus:border-[#00E676] focus:outline-none focus:ring-2 focus:ring-[#00E676]/20 transition-all duration-300 text-sm">
            <option>All Status</option>
            <option>Confirmed</option>
            <option>Pending</option>
            <option>Rejected</option>
          </select>
          
          <button className="px-4 sm:px-6 py-2 bg-[#00E676] text-[#121212] rounded-xl font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,230,118,0.6)] text-sm">
            Export
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-[#1E1E1E] rounded-xl p-3 sm:p-4 border border-[#1B5E20]">
          <p className="text-[#BDBDBD] text-xs sm:text-sm mb-1">Total Bookings</p>
          <p className="text-white text-xl sm:text-2xl font-bold">5</p>
        </div>
        <div className="bg-[#1E1E1E] rounded-xl p-3 sm:p-4 border border-[#1B5E20]">
          <p className="text-[#BDBDBD] text-xs sm:text-sm mb-1">Revenue Generated</p>
          <p className="text-[#00E676] text-xl sm:text-2xl font-bold">₹5,800</p>
        </div>
        <div className="bg-[#1E1E1E] rounded-xl p-3 sm:p-4 border border-[#1B5E20]">
          <p className="text-[#BDBDBD] text-xs sm:text-sm mb-1">Pending Payments</p>
          <p className="text-[#BDBDBD] text-xl sm:text-2xl font-bold">₹1,000</p>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-[#1E1E1E] rounded-xl sm:rounded-2xl border border-[#1B5E20] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1B5E20]">
                <th className="text-left p-3 sm:p-4 text-[#BDBDBD] font-semibold text-xs sm:text-sm">Player</th>
                <th className="text-left p-3 sm:p-4 text-[#BDBDBD] font-semibold text-xs sm:text-sm hidden lg:table-cell">Turf</th>
                <th className="text-left p-3 sm:p-4 text-[#BDBDBD] font-semibold text-xs sm:text-sm">Date & Time</th>
                <th className="text-left p-3 sm:p-4 text-[#BDBDBD] font-semibold text-xs sm:text-sm">Amount</th>
                <th className="text-left p-3 sm:p-4 text-[#BDBDBD] font-semibold text-xs sm:text-sm">Payment</th>
                <th className="text-left p-3 sm:p-4 text-[#BDBDBD] font-semibold text-xs sm:text-sm">Status</th>
                <th className="text-left p-3 sm:p-4 text-[#BDBDBD] font-semibold text-xs sm:text-sm hidden md:table-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <motion.tr
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-b border-[#1B5E20] hover:bg-[#1A1A1A] transition-colors duration-300"
                >
                  <td className="p-3 sm:p-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1B5E20] flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#00E676]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-white font-semibold text-xs sm:text-sm truncate">{booking.playerName}</p>
                        <p className="text-[#BDBDBD] text-xs flex items-center gap-1">
                          <Phone className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{booking.phone}</span>
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 sm:p-4 hidden lg:table-cell">
                    <p className="text-white text-xs sm:text-sm">{booking.turfName}</p>
                  </td>
                  <td className="p-3 sm:p-4">
                    <div className="flex flex-col gap-0.5 sm:gap-1">
                      <p className="text-white flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-[#00E676] flex-shrink-0" />
                        <span className="truncate">{booking.date}</span>
                      </p>
                      <p className="text-[#BDBDBD] text-xs flex items-center gap-1 sm:gap-1.5">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">{booking.time}</span>
                      </p>
                    </div>
                  </td>
                  <td className="p-3 sm:p-4">
                    <p className="text-[#00E676] font-bold flex items-center gap-1 text-xs sm:text-sm">
                      <IndianRupee className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      {booking.amount}
                    </p>
                  </td>
                  <td className="p-3 sm:p-4">
                    {getPaymentStatusBadge(booking.paymentStatus)}
                  </td>
                  <td className="p-3 sm:p-4">
                    {getStatusBadge(booking.status)}
                  </td>
                  <td className="p-3 sm:p-4 hidden md:table-cell">
                    <div className="flex gap-2">
                      {booking.status === "pending" && (
                        <Button
                          size="sm"
                          onClick={() => handleApprove(booking.id)}
                          className="bg-[#00E676] text-[#121212] font-semibold"
                        >
                          Approve
                        </Button>
                      )}
                      {booking.status === "pending" && (
                        <Button
                          size="sm"
                          onClick={() => handleRejectClick(booking.id)}
                          className="bg-[#FF6B6B] text-[#121212] font-semibold"
                        >
                          Reject
                        </Button>
                      )}
                      <Button
                        size="sm"
                        className="bg-[#00E676] text-[#121212] font-semibold"
                      >
                        View Details
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="bg-[#1E1E1E] border-[#1B5E20] sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">Reject Booking</DialogTitle>
            <DialogDescription className="text-[#BDBDBD]">
              Please provide a reason for rejecting this booking. The player will be notified.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="rejectionReason" className="text-white">Rejection Reason</Label>
              <Input
                id="rejectionReason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="e.g., Turf maintenance scheduled"
                className="bg-[#121212] border-[#1B5E20] text-white focus:border-[#00E676]"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              onClick={() => setShowRejectDialog(false)}
              variant="outline"
              className="border-[#1B5E20] text-white hover:border-[#00E676]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleRejectConfirm}
              disabled={!rejectionReason.trim()}
              className="bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
            >
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}