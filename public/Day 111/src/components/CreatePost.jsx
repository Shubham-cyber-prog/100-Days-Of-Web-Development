import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

function CreatePost() {
  const [text, setText] = useState("");
  const { user } = useAuth();

  const handlePost = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await addDoc(collection(db, "posts"), {
        text,
        userId: user.uid,
        username: user.email.split("@")[0],
        createdAt: serverTimestamp(),
        likes: [],
      });

      setText("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <form className="create-post" onSubmit={handlePost}>
      <textarea
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
      />
      <button type="submit">Post</button>
    </form>
  );
}

export default CreatePost;
