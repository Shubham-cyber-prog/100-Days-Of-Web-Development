import { Rss, Users, Video, Bookmark, HelpCircle, Briefcase, Calendar } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: <Rss size={20} />, label: "Feed" },
    { icon: <Users size={20} />, label: "Friends" },
    { icon: <Video size={20} />, label: "Videos" },
    { icon: <Users size={20} />, label: "Groups" },
    { icon: <Bookmark size={20} />, label: "Bookmarks" },
    { icon: <Briefcase size={20} />, label: "Jobs" },
    { icon: <Calendar size={20} />, label: "Events" },
    { icon: <HelpCircle size={20} />, label: "Questions" },
  ];

  return (
    <div className="sticky top-20 h-[calc(100vh-80px)] overflow-y-auto custom-scrollbar p-2">
      <ul className="space-y-1">
        {menuItems.map((item, index) => (
          <li key={index}>
            <button className="flex items-center gap-4 px-4 py-3 w-full text-gray-700 hover:bg-gray-200 rounded-lg transition-colors text-left">
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
      
      <hr className="my-4 border-gray-300" />
      
      <div className="px-4">
        <h4 className="text-gray-500 font-semibold mb-3 text-sm">CLOSE FRIENDS</h4>
        <ul className="space-y-3">
            {[11, 12, 13, 14].map((friendId) => (
                <li key={friendId} className="flex items-center gap-3 cursor-pointer hover:bg-gray-200 p-2 rounded-lg transition">
                    <img src={`https://i.pravatar.cc/150?img=${friendId}`} alt="friend" className="w-8 h-8 rounded-full" />
                    <span className="text-sm font-medium text-gray-700">Friend User {friendId}</span>
                </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;