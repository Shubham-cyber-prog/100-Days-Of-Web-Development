import { NavLink } from "react-router";
import { LayoutDashboard, Users, UsersRound, Receipt, Activity, BarChart3, Settings, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import AddExpenseModal from "./AddExpenseModal";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/friends", label: "Friends", icon: Users },
  { path: "/groups", label: "Groups", icon: UsersRound },
  { path: "/expenses", label: "Expenses", icon: Receipt },
  { path: "/activity", label: "Activity", icon: Activity },
  { path: "/reports", label: "Reports", icon: BarChart3 },
  { path: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  return (
    <>
      <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 p-4">
        <Button 
          onClick={() => setIsAddExpenseOpen(true)}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white mb-6"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Expense
        </Button>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-emerald-50 text-emerald-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`h-5 w-5 ${isActive ? "text-emerald-600" : "text-gray-500"}`} />
                    <span className="font-medium">{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      <AddExpenseModal open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen} />
    </>
  );
}
