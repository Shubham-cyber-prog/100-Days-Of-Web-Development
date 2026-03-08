import { Link } from "react-router-dom";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

function Post({ post }) {
  const { user } = useAuth();
  const hasLiked = post.likes?.includes(user.uid);

  const toggleLike = async () => {
    const postRef = doc(db, "posts", post.id);
    await updateDoc(postRef, {
      likes: hasLiked
        ? arrayRemove(user.uid)
        : arrayUnion(user.uid),
    });
  };

  return (
    <div className="post-card">
      <Link to={`/profile/${post.userId}`} className="post-user">
        @{post.username}
      </Link>

      <p className="post-text">{post.text}</p>

      <div className="post-actions">
        <button onClick={toggleLike}>
          {hasLiked ? "💔 Unlike" : "❤️ Like"}
        </button>
        <span>{post.likes?.length || 0} likes</span>
      </div>
    </div>
  );
}

export default Post;
