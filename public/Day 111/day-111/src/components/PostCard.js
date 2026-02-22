import { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <img src={post.userImg} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
          <div>
            <h3 className="font-semibold text-gray-900">{post.username}</h3>
            <span className="text-sm text-gray-500">{post.timeAgo}</span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal /></button>
      </div>

      <p className="text-gray-800 mb-3">{post.desc}</p>
      {post.img && (
        <img src={post.img} alt="post content" className="w-full h-64 object-cover rounded-lg mb-4" />
      )}

      <div className="flex items-center justify-between border-t pt-3 text-gray-500">
        <button 
          onClick={handleLike}
          className={`flex items-center gap-2 ${liked ? 'text-red-500' : 'hover:text-red-500'} transition-colors`}
        >
          <Heart fill={liked ? "currentColor" : "none"} size={20} />
          <span>{likeCount} Likes</span>
        </button>
        
        <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
          <MessageCircle size={20} />
          <span>Comment</span>
        </button>
        
        <button className="flex items-center gap-2 hover:text-green-500 transition-colors">
          <Share2 size={20} />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;