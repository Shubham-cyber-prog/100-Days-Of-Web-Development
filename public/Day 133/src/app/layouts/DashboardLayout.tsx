import { Outlet, useNavigate, useLocation } from "react-router";
import { useState } from "react";
import {
  Package,
  LayoutDashboard,
  ShoppingCart,
  Users,
  FileText,
  Settings,
  Search,
  Bell,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Suppliers", href: "/suppliers", icon: Users },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="size-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Package className="size-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">
                InventoryPro
              </span>
            </div>
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="size-6 text-gray-600" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive =
                location.pathname === item.href ||
                (item.href !== "/" && location.pathname.startsWith(item.href));
              
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.href);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="size-5" />
                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="size-10 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center text-white font-medium">
                JD
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                  John Doe
                </div>
                <div className="text-xs text-gray-500 truncate">
                  admin@company.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navbar */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 flex-1">
              <button
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="size-6 text-gray-600" />
              </button>

              {/* Search bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search products, orders..."
                  className="pl-10 h-10 bg-gray-50 border-gray-200"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="size-5 text-gray-600" />
                <span className="absolute top-1 right-1 size-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <div className="size-8 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      JD
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="font-medium">John Doe</div>
                    <div className="text-xs text-gray-500 font-normal">
                      admin@company.com
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    <Settings className="size-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="size-4 mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
