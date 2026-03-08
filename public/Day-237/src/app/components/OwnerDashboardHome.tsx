import { TrendingUp, Calendar, DollarSign, Users } from "lucide-react";
import { motion } from "motion/react";

export function OwnerDashboardHome() {
  const stats = [
    {
      label: "Total Revenue",
      value: "₹45,280",
      change: "+12.5%",
      icon: DollarSign,
      color: "#00E676",
    },
    {
      label: "Bookings Today",
      value: "23",
      change: "+8.2%",
      icon: Calendar,
      color: "#00E676",
    },
    {
      label: "Active Turfs",
      value: "4",
      change: "0%",
      icon: TrendingUp,
      color: "#00E676",
    },
    {
      label: "Total Users",
      value: "1,247",
      change: "+18.9%",
      icon: Users,
      color: "#00E676",
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">Dashboard</h2>
        <p className="text-[#BDBDBD] text-sm sm:text-base lg:text-lg">Welcome back! Here's your turf overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-[#1E1E1E] rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-[#1B5E20] hover:border-[#00E676] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,230,118,0.2)]"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#1B5E20] flex items-center justify-center">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#00E676]" />
                </div>
                <span className="text-[#00E676] text-xs sm:text-sm font-semibold">{stat.change}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-[#BDBDBD] text-xs sm:text-sm">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-[#1E1E1E] rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-[#1B5E20]">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Recent Bookings</h3>
        <div className="space-y-3 sm:space-y-4">
          {[
            { name: "Rahul Sharma", turf: "Regional Arena", time: "6:00 PM - 7:00 PM", status: "Confirmed" },
            { name: "Priya Patel", turf: "Elite Stadium", time: "7:00 PM - 8:00 PM", status: "Confirmed" },
            { name: "Amit Kumar", turf: "Regional Arena", time: "8:00 PM - 9:00 PM", status: "Pending" },
          ].map((booking, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 bg-[#121212] rounded-xl hover:bg-[#1A1A1A] transition-all duration-300"
            >
              <div className="flex-1">
                <p className="text-white font-semibold text-sm sm:text-base">{booking.name}</p>
                <p className="text-[#BDBDBD] text-xs sm:text-sm">{booking.turf} • {booking.time}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold self-start sm:self-center ${
                  booking.status === "Confirmed"
                    ? "bg-[#1B5E20] text-[#00E676]"
                    : "bg-[#2A2A2A] text-[#BDBDBD]"
                }`}
              >
                {booking.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}