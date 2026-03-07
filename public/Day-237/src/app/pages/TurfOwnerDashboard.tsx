import { useState } from "react";
import { LayoutDashboard, PlusCircle, Calendar, Receipt, CreditCard, Building2, LogOut, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, Link } from "react-router";
import { AddTurfForm } from "../components/AddTurfForm";
import { ManageSlots } from "../components/ManageSlots";
import { MyTurfs } from "../components/MyTurfs";
import { OwnerPayments } from "../components/OwnerPayments";
import { OwnerDashboardHome } from "../components/OwnerDashboardHome";
import { BookingLogs } from "../components/BookingLogs";

export function TurfOwnerDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("turfbook_user");
    navigate("/home");
  };

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "my-turf", label: "My Turf", icon: Building2 },
    { id: "add-turf", label: "Add Turf", icon: PlusCircle },
    { id: "manage-slots", label: "Manage Slots", icon: Calendar },
    { id: "bookings", label: "Bookings", icon: Receipt },
    { id: "payments", label: "Payments", icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="lg:hidden bg-[#1E1E1E] border-b border-[#1B5E20] px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <Link to="/home" className="flex items-center gap-2">
          <h1 className="text-xl font-bold">
            <span className="text-[#00E676]">Turf</span>
            <span className="text-white">Book</span>
          </h1>
        </Link>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-[#00E676] hover:bg-[#2A2A2A] rounded-lg transition-all duration-300"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ 
            x: isSidebarOpen || window.innerWidth >= 1024 ? 0 : -100,
            opacity: isSidebarOpen || window.innerWidth >= 1024 ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className={`
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            fixed lg:sticky top-0 left-0 h-screen
            w-64 sm:w-72 bg-[#1E1E1E] border-r border-[#1B5E20] 
            flex flex-col z-50 transition-transform duration-300 ease-in-out
          `}
        >
          {/* Logo - Desktop Only */}
          <Link 
            to="/home" 
            className="hidden lg:flex p-6 border-b border-[#1B5E20] items-center gap-2 hover:bg-[#2A2A2A]/30 transition-all duration-300"
          >
            <h1 className="text-2xl font-bold">
              <span className="text-[#00E676]">Turf</span>
              <span className="text-white">Book</span>
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="flex-1 p-3 sm:p-4 space-y-1.5 sm:space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 relative ${
                    isActive
                      ? "bg-[#1B5E20] text-[#00E676] shadow-[0_0_20px_rgba(0,230,118,0.2)]"
                      : "text-[#BDBDBD] hover:bg-[#2A2A2A] hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-semibold text-sm sm:text-base">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-[#00E676] rounded-r-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-3 sm:p-4 border-t border-[#1B5E20]">
            <button
              className="w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-[#BDBDBD] hover:bg-[#2A2A2A] hover:text-white transition-all duration-300"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span className="font-semibold text-sm sm:text-base">Logout</span>
            </button>
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "dashboard" && <OwnerDashboardHome />}
            {activeTab === "add-turf" && <AddTurfForm />}
            {activeTab === "manage-slots" && <ManageSlots />}
            {activeTab === "bookings" && <BookingLogs />}
            {activeTab === "payments" && <OwnerPayments />}
            {activeTab === "my-turf" && <MyTurfs />}
          </motion.div>
        </div>
      </main>
    </div>
  );
}