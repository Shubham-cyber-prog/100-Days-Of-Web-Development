import { useState } from "react";
import { Link } from "react-router";
import {
  Search,
  Bell,
  User,
  MapPin,
  Filter,
  Map,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { FeaturedCarousel } from "../components/FeaturedCarousel";
import { FilterSidebar } from "../components/FilterSidebar";
import { TurfCard } from "../components/TurfCard";
import { MapView } from "../components/MapView";
import { MyBookings } from "../components/MyBookings";
import { MatchSection } from "../components/MatchSection";
import { useTurfs } from "../context/TurfContext";

export function Home() {
  const { turfs } = useTurfs();
  const [activeTab, setActiveTab] = useState("home");
  const [showFilter, setShowFilter] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "map">(
    "grid",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  const isLoggedIn = !!localStorage.getItem("turfbook_user");

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "Booking Confirmed",
      message: "Your booking at Green Valley Sports Arena is confirmed for Feb 15, 2026",
      time: "2 hours ago",
      isRead: false,
      type: "success",
    },
    {
      id: 2,
      title: "Match Request",
      message: "John Doe wants to join your cricket match at Champions Ground",
      time: "5 hours ago",
      isRead: false,
      type: "info",
    },
    {
      id: 3,
      title: "Payment Received",
      message: "Payment of ₹1500 received successfully",
      time: "1 day ago",
      isRead: true,
      type: "success",
    },
    {
      id: 4,
      title: "Booking Reminder",
      message: "Your booking at Elite Football Turf is tomorrow at 6:00 PM",
      time: "1 day ago",
      isRead: true,
      type: "info",
    },
  ];

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Filter turfs based on search query and show only Active turfs
  const filteredTurfs = turfs.filter((turf) => {
    // Only show Active turfs to players
    if (turf.status !== "Active") return false;
    
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return (
      turf.name.toLowerCase().includes(query) ||
      turf.location.toLowerCase().includes(query) ||
      turf.sports.some((sport) => sport.toLowerCase().includes(query))
    );
  });

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-[#1E1E1E] border-b border-[#1B5E20] backdrop-blur-custom">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between gap-2 md:gap-4">
            {/* Logo */}
            <Link
              to="/home"
              className="flex items-center gap-2"
              onClick={() => setActiveTab("home")}
            >
              <div className="text-xl md:text-2xl font-bold">
                <span className="text-[#00E676]">Turf</span>
                <span className="text-white">Book</span>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#BDBDBD]" />
              <Input
                placeholder="Search turfs, locations, sports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#121212] border-[#1B5E20] text-white placeholder:text-[#BDBDBD] focus:border-[#00E676]"
              />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1 md:gap-2">
              <Link to="/owner" className="hidden sm:block">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-[#00E676] text-xs md:text-sm px-2 md:px-4"
                >
                  Owner Login
                </Button>
              </Link>

              <Button
                onClick={() => setShowNotifications(!showNotifications)}
                variant="ghost"
                size="icon"
                className="text-white hover:text-[#00E676] relative h-8 w-8 md:h-10 md:w-10"
              >
                <Bell className="h-4 w-4 md:h-5 md:w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#00E676] rounded-full pulse-glow"></span>
                )}
              </Button>

              <Button
                onClick={() => setActiveTab("bookings")}
                variant="ghost"
                size="sm"
                className={`hidden lg:flex text-white hover:text-[#00E676] ${
                  activeTab === "bookings"
                    ? "text-[#00E676]"
                    : ""
                }`}
              >
                My Bookings
              </Button>

              <Button
                onClick={() => setActiveTab("matches")}
                variant="ghost"
                size="sm"
                className={`hidden lg:flex text-white hover:text-[#00E676] ${
                  activeTab === "matches"
                    ? "text-[#00E676]"
                    : ""
                }`}
              >
                Matches
              </Button>

              {isLoggedIn ? (
                <Link to="/profile">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-[#00E676] h-8 w-8 md:h-10 md:w-10"
                  >
                    <User className="h-4 w-4 md:h-5 md:w-5" />
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button className="bg-[#00E676] text-[#121212] hover:bg-[#00E676]/90 neon-glow-hover text-xs md:text-sm px-3 md:px-4 h-8 md:h-10">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#BDBDBD]" />
              <Input
                placeholder="Search turfs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#121212] border-[#1B5E20] text-white placeholder:text-[#BDBDBD]"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowNotifications(false)}
          />
          
          {/* Notifications Panel */}
          <div className="fixed top-20 right-4 z-50 w-96 max-w-[calc(100vw-2rem)] bg-[#1E1E1E] border border-[#1B5E20] rounded-[14px] shadow-2xl card-elevation animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#1B5E20]">
              <h3 className="text-white font-semibold text-lg">Notifications</h3>
              {unreadCount > 0 && (
                <span className="bg-[#00E676] text-[#121212] text-xs font-bold px-2 py-1 rounded-full">
                  {unreadCount} New
                </span>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-[500px] overflow-y-auto">
              {notifications.length > 0 ? (
                <div className="divide-y divide-[#1B5E20]">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-[#121212] cursor-pointer transition-colors ${
                        !notification.isRead ? "bg-[#1B5E20]/10" : ""
                      }`}
                    >
                      <div className="flex gap-3">
                        {/* Status Indicator */}
                        <div className="flex-shrink-0 mt-1">
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-[#00E676] rounded-full pulse-glow" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-semibold text-sm mb-1">
                            {notification.title}
                          </h4>
                          <p className="text-[#BDBDBD] text-xs mb-2 line-clamp-2">
                            {notification.message}
                          </p>
                          <span className="text-[#00E676] text-xs">
                            {notification.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Bell className="h-12 w-12 text-[#BDBDBD] mx-auto mb-3 opacity-50" />
                  <p className="text-[#BDBDBD] text-sm">No notifications yet</p>
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-[#1B5E20]">
                <Button
                  variant="ghost"
                  className="w-full text-[#00E676] hover:text-[#00E676] hover:bg-[#00E676]/10"
                  onClick={() => setShowNotifications(false)}
                >
                  Mark all as read
                </Button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Main Content */}
      {activeTab === "home" && (
        <main className="container mx-auto px-4 py-4 md:py-6">
          {/* Featured Carousel */}
          <FeaturedCarousel
            turfs={turfs.filter((t) => t.hasOffer && t.status === "Active")}
          />

          {/* Filter & Map Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Available Turfs
            </h2>

            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                onClick={() => setShowFilter(!showFilter)}
                variant="outline"
                size="sm"
                className={`border-[#1B5E20] text-white hover:border-[#00E676] ${showFilter ? "bg-[#00E676]/20 border-[#00E676]" : ""} text-[#000000] flex-1 sm:flex-none`}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>

              <div className="flex bg-[#1E1E1E] rounded-[14px] border border-[#1B5E20] overflow-hidden">
                <Button
                  onClick={() => setViewMode("grid")}
                  variant="ghost"
                  size="sm"
                  className={`rounded-none ${viewMode === "grid" ? "bg-[#00E676] text-[#121212]" : "text-white"} text-xs md:text-sm px-3 md:px-4`}
                >
                  Grid
                </Button>
                <Button
                  onClick={() => setViewMode("map")}
                  variant="ghost"
                  size="sm"
                  className={`rounded-none ${
                    viewMode === "map"
                      ? "bg-[#00E676] text-[#121212]"
                      : "text-white"
                  } text-xs md:text-sm px-3 md:px-4`}
                >
                  <Map className="h-4 w-4 mr-1 md:mr-2" />
                  Map
                </Button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* Filter Sidebar */}
            {showFilter && viewMode === "grid" && (
              <div className="w-full lg:w-80 flex-shrink-0">
                <FilterSidebar />
              </div>
            )}

            {/* Main Content */}
            <div className="flex-1">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                  {filteredTurfs.map((turf) => (
                    <TurfCard key={turf.id} turf={turf} />
                  ))}
                </div>
              ) : (
                <MapView turfs={filteredTurfs} />
              )}
            </div>
          </div>
        </main>
      )}

      {activeTab === "bookings" && <MyBookings />}
      {activeTab === "matches" && <MatchSection />}

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#1E1E1E] border-t border-[#1B5E20] lg:hidden backdrop-blur-xl">
        <div className="flex items-center justify-around px-2 py-3">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 ${
              activeTab === "home"
                ? "text-[#00E676]"
                : "text-[#BDBDBD]"
            }`}
          >
            <MapPin className="h-5 w-5" />
            <span className="text-xs font-medium">Turfs</span>
          </button>

          <button
            onClick={() => setActiveTab("bookings")}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 ${
              activeTab === "bookings"
                ? "text-[#00E676]"
                : "text-[#BDBDBD]"
            }`}
          >
            <Bell className="h-5 w-5" />
            <span className="text-xs font-medium">Bookings</span>
          </button>

          <button
            onClick={() => setActiveTab("matches")}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 ${
              activeTab === "matches"
                ? "text-[#00E676]"
                : "text-[#BDBDBD]"
            }`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs font-medium">Matches</span>
          </button>

          <Link to="/owner">
            <button className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 text-[#BDBDBD]">
              <User className="h-5 w-5" />
              <span className="text-xs font-medium">Owner</span>
            </button>
          </Link>
        </div>
      </nav>

      {/* Spacer for mobile bottom nav */}
      <div className="h-20 lg:hidden"></div>
    </div>
  );
}