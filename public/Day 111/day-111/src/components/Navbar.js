import { Search, Home, User, MessageCircle, Bell, Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <div className="h-16 w-full bg-white shadow-md fixed top-0 left-0 z-50 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-4">
        <span className="text-2xl font-bold text-blue-600 cursor-pointer">SocialApp</span>
      </div>

      <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-1/3">
        <Search size={18} className="text-gray-500" />
        <input 
          type="text" 
          placeholder="Search for friends, posts..." 
          className="bg-transparent border-none outline-none ml-2 text-sm w-full"
        />
      </div>

      <div className="flex items-center gap-4 md:gap-6 text-gray-600">
        <div className="flex items-center gap-4">
            <span className="cursor-pointer hover:text-blue-500 hidden sm:block">
                <div className="relative">
                    <Home size={24} />
                </div>
            </span>
            <span className="cursor-pointer hover:text-blue-500">
                <div className="relative">
                    <User size={24} />
                </div>
            </span>
            <span className="cursor-pointer hover:text-blue-500 relative">
                <MessageCircle size={24} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
            </span>
            <span className="cursor-pointer hover:text-blue-500 relative">
                <Bell size={24} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">1</span>
            </span>
        </div>
        
        <img 
            src="https://i.pravatar.cc/150?img=8" 
            alt="profile" 
            className="w-8 h-8 rounded-full object-cover cursor-pointer border border-gray-300" 
        />
        
        <div className="md:hidden">
            <Menu size={24} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;