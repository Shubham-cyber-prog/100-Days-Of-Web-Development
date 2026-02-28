import { 
  LayoutDashboard, 
  CreditCard, 
  Calendar, 
  BarChart3, 
  Wallet, 
  Settings,
  Plus
} from 'lucide-react';
import { Button } from './ui/button';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  onAddSubscription: () => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'subscriptions', label: 'All Subscriptions', icon: CreditCard },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'payments', label: 'Payment Methods', icon: Wallet },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ activeView, onViewChange, onAddSubscription }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Subscription</h1>
            <p className="text-sm text-gray-500">Tracker</p>
          </div>
        </div>

        <Button 
          onClick={onAddSubscription}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-6"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Subscription
        </Button>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
