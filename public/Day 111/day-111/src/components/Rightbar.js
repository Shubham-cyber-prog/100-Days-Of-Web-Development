const Rightbar = () => {
  const onlineFriends = [1, 2, 3, 4, 5, 6];

  return (
    <div className="sticky top-20 h-[calc(100vh-80px)] overflow-y-auto custom-scrollbar p-2">
        <div className="flex items-center gap-3 mb-6 p-2">
            <img src="https://raw.githubusercontent.com/safak/youtube/react-social-ui/public/assets/gift.png" alt="gift" className="w-10 h-10" />
            <span className="text-sm text-gray-600">
                <b>Foster Coleman</b> and <b>3 others</b> have a birthday today.
            </span>
        </div>

        <div className="mb-6">
            <img 
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="ad" 
                className="w-full rounded-xl object-cover" 
            />
            <h4 className="font-bold text-gray-700 mt-2">Sponsored</h4>
            <p className="text-sm text-gray-500">Buy the best coffee in town!</p>
        </div>

        <h4 className="text-lg font-bold text-gray-700 mb-4">Online Friends</h4>
        <ul className="space-y-4">
            {onlineFriends.map((id) => (
                <li key={id} className="flex items-center gap-3 cursor-pointer relative">
                    <div className="relative">
                        <img 
                            src={`https://i.pravatar.cc/150?img=${id + 20}`} 
                            alt="friend" 
                            className="w-10 h-10 rounded-full object-cover border-2 border-white" 
                        />
                        <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                    </div>
                    <span className="font-semibold text-gray-700">Online User {id}</span>
                </li>
            ))}
        </ul>
    </div>
  );
};

export default Rightbar;