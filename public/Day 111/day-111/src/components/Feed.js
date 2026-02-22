import { useState } from 'react';
import PostCard from './PostCard';

const Feed = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: 'Dev_Gaurav',
      userImg: 'https://i.pravatar.cc/150?img=11',
      timeAgo: '2 hours ago',
      desc: 'Day 111 of #100DaysOfCode! Building a social network UI today. 🚀',
      likes: 45,
      img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'
    },
    {
      id: 2,
      username: 'Jane Doe',
      userImg: 'https://i.pravatar.cc/150?img=5',
      timeAgo: '5 hours ago',
      desc: 'Just learned about Grid layout in CSS, it is a game changer!',
      likes: 12,
      img: null
    }
  ]);

  const [input, setInput] = useState("");

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newPost = {
      id: Date.now(),
      username: 'CurrentUser',
      userImg: 'https://i.pravatar.cc/150?img=8',
      timeAgo: 'Just now',
      desc: input,
      likes: 0,
      img: null
    };

    setPosts([newPost, ...posts]);
    setInput("");
  };

  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex gap-4">
          <img src="https://i.pravatar.cc/150?img=8" className="w-10 h-10 rounded-full" alt="curr" />
          <form onSubmit={handlePostSubmit} className="w-full">
            <input 
              type="text" 
              placeholder="What's on your mind?" 
              className="w-full bg-gray-100 rounded-full py-2 px-4 outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="What's on your mind?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </form>
        </div>
        <div className="flex justify-between mt-3 px-4">
            <button className="text-sm font-medium text-blue-500">Image</button>
            <button className="text-sm font-medium text-blue-500">Video</button>
            <button 
              onClick={handlePostSubmit}
              className="bg-blue-600 text-white text-sm px-4 py-1 rounded-full hover:bg-blue-700"
            >
              Post
            </button>
        </div>
      </div>

      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;