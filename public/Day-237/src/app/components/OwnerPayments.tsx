import { useState } from "react";
import { Check, X, Clock, Calendar, User, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

const mockPayments = [
  {
    id: 1,
    bookingRef: "TRF-001-240215",
    playerName: "Rahul Kumar",
    playerPhone: "+91 9876543210",
    turfName: "Green Valley Sports Arena",
    date: "2026-02-15",
    timeSlots: ["10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM"],
    amount: 3000,
    paymentStatus: "Pending",
    screenshot: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Payment",
  },
  {
    id: 2,
    bookingRef: "TRF-002-240216",
    playerName: "Amit Sharma",
    playerPhone: "+91 9876543211",
    turfName: "Champions Cricket Ground",
    date: "2026-02-16",
    timeSlots: ["6:00 PM - 7:00 PM"],
    amount: 2000,
    paymentStatus: "Pending",
    screenshot: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Payment",
  },
  {
    id: 3,
    bookingRef: "TRF-003-240214",
    playerName: "Vikas Patel",
    playerPhone: "+91 9876543212",
    turfName: "Elite Football Turf",
    date: "2026-02-14",
    timeSlots: ["4:00 PM - 5:00 PM"],
    amount: 1200,
    paymentStatus: "Confirmed",
  },
  {
    id: 4,
    bookingRef: "TRF-004-240213",
    playerName: "Sanjay Reddy",
    playerPhone: "+91 9876543213",
    turfName: "Green Valley Sports Arena",
    date: "2026-02-13",
    timeSlots: ["3:00 PM - 4:00 PM"],
    amount: 1500,
    paymentStatus: "Rejected",
  },
];

export function OwnerPayments() {
  const [payments, setPayments] = useState(mockPayments);
  const [filter, setFilter] = useState("all");

  const handleConfirmPayment = (paymentId: number) => {
    setPayments(
      payments.map((p) =>
        p.id === paymentId ? { ...p, paymentStatus: "Confirmed" } : p
      )
    );
  };

  const handleRejectPayment = (paymentId: number) => {
    setPayments(
      payments.map((p) =>
        p.id === paymentId ? { ...p, paymentStatus: "Rejected" } : p
      )
    );
  };

  const filteredPayments = payments.filter((payment) => {
    if (filter === "all") return true;
    return payment.paymentStatus.toLowerCase() === filter.toLowerCase();
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500";
      case "confirmed":
        return "bg-[#00E676]/20 text-[#00E676] border-[#00E676]";
      case "rejected":
        return "bg-red-500/20 text-red-500 border-red-500";
      default:
        return "bg-[#BDBDBD]/20 text-[#BDBDBD] border-[#BDBDBD]";
    }
  };

  const stats = {
    total: payments.length,
    pending: payments.filter((p) => p.paymentStatus === "Pending").length,
    confirmed: payments.filter((p) => p.paymentStatus === "Confirmed").length,
    rejected: payments.filter((p) => p.paymentStatus === "Rejected").length,
    totalRevenue: payments
      .filter((p) => p.paymentStatus === "Confirmed")
      .reduce((sum, p) => sum + p.amount, 0),
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Payment Management</h2>
        <p className="text-[#BDBDBD]">Review and manage booking payments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#1E1E1E] rounded-[14px] p-6 card-elevation">
          <p className="text-[#BDBDBD] text-sm mb-2">Total Payments</p>
          <p className="text-white text-3xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-[#1E1E1E] rounded-[14px] p-6 card-elevation border-2 border-yellow-500/30">
          <p className="text-[#BDBDBD] text-sm mb-2">Pending</p>
          <p className="text-yellow-500 text-3xl font-bold">{stats.pending}</p>
        </div>
        <div className="bg-[#1E1E1E] rounded-[14px] p-6 card-elevation border-2 border-[#00E676]/30">
          <p className="text-[#BDBDBD] text-sm mb-2">Confirmed</p>
          <p className="text-[#00E676] text-3xl font-bold">{stats.confirmed}</p>
        </div>
        <div className="bg-[#1E1E1E] rounded-[14px] p-6 card-elevation">
          <p className="text-[#BDBDBD] text-sm mb-2">Total Revenue</p>
          <p className="text-[#00E676] text-3xl font-bold">₹{stats.totalRevenue}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {["all", "pending", "confirmed", "rejected"].map((status) => (
          <Button
            key={status}
            onClick={() => setFilter(status)}
            variant="outline"
            className={`capitalize whitespace-nowrap ${ filter === status ? "bg-[#00E676] border-[#00E676]" : "border-[#1B5E20] text-white hover:border-[#00E676]" } text-[#000000]`}
          >
            {status}
          </Button>
        ))}
      </div>

      {/* Payments Grid */}
      {filteredPayments.length === 0 ? (
        <div className="bg-[#1E1E1E] rounded-[14px] p-12 text-center card-elevation">
          <p className="text-[#BDBDBD] text-lg">No payments found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPayments.map((payment) => (
            <div
              key={payment.id}
              className="bg-[#1E1E1E] rounded-[14px] p-6 card-elevation hover:border-[#00E676] border-2 border-transparent transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Left Section - Payment Info */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white font-bold text-lg">
                          {payment.turfName}
                        </h3>
                        <Badge className={getStatusColor(payment.paymentStatus)}>
                          {payment.paymentStatus}
                        </Badge>
                      </div>
                      <p className="text-[#BDBDBD] text-sm">
                        Ref: {payment.bookingRef}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#00E676] text-2xl font-bold">
                        ₹{payment.amount}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[#00E676]" />
                      <div>
                        <p className="text-white text-sm">{payment.playerName}</p>
                        <p className="text-[#BDBDBD] text-xs">
                          {payment.playerPhone}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#00E676]" />
                      <span className="text-white text-sm">
                        {new Date(payment.date).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#00E676]" />
                      <span className="text-white text-sm">
                        {payment.timeSlots.length} slot(s)
                      </span>
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="flex flex-wrap gap-2">
                    {payment.timeSlots.map((slot, index) => (
                      <div
                        key={index}
                        className="bg-[#121212] px-3 py-1 rounded-full border border-[#1B5E20] text-[#BDBDBD] text-xs"
                      >
                        {slot}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Section - Actions */}
                {payment.paymentStatus === "Pending" && (
                  <div className="flex flex-col gap-3 min-w-[200px]">
                    {payment.screenshot && (
                      <div className="bg-[#121212] rounded-lg p-3 border border-[#1B5E20]">
                        <p className="text-[#BDBDBD] text-xs mb-2 text-center">
                          Payment Screenshot
                        </p>
                        <img
                          src={payment.screenshot}
                          alt="Payment proof"
                          className="w-full h-24 object-contain rounded"
                        />
                      </div>
                    )}

                    <div className="flex gap-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button className="flex-1 bg-[#00E676] text-[#121212] hover:bg-[#00E676]/90 neon-glow-hover">
                            <Check className="w-4 h-4 mr-2" />
                            Confirm
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-[#1E1E1E] border-[#1B5E20]">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-white">
                              Confirm Payment?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-[#BDBDBD]">
                              This will approve the booking and confirm the payment
                              of ₹{payment.amount} has been received.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-[#121212] text-white border-[#1B5E20]">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleConfirmPayment(payment.id)}
                              className="bg-[#00E676] text-[#121212] hover:bg-[#00E676]/90"
                            >
                              Confirm Payment
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-[#1E1E1E] border-[#1B5E20]">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-white">
                              Reject Payment?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-[#BDBDBD]">
                              This will reject the booking and notify the player
                              that the payment was not verified.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-[#121212] text-white border-[#1B5E20]">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleRejectPayment(payment.id)}
                              className="bg-red-500 text-white hover:bg-red-600"
                            >
                              Reject Payment
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
