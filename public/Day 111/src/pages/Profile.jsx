import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import Post from "../components/Post";

function Profile() {
  const { uid } = useParams();
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();
  const isOwnProfile = user.uid === uid;
  const isFollowing = userData?.followers?.includes(user.uid);

  const toggleFollow = async () => {
  const profileRef = doc(db, "users", uid);
  const currentUserRef = doc(db, "users", user.uid);

  try {
    if (isFollowing) {
      await updateDoc(profileRef, {
        followers: arrayRemove(user.uid),
      });
      await updateDoc(currentUserRef, {
        following: arrayRemove(uid),
      });
    } else {
      await updateDoc(profileRef, {
        followers: arrayUnion(user.uid),
      });
      await updateDoc(currentUserRef, {
        following: arrayUnion(uid),
      });
    }
  } catch (err) {
    console.error("Follow error:", err);
  }
};


  // 🔹 Fetch user profile
  useEffect(() => {
    const fetchUser = async () => {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserData(userSnap.data());
      }
    };

    fetchUser();
  }, [uid]);

  // 🔹 Fetch user's posts
  useEffect(() => {
    const q = query(
      collection(db, "posts"),
      where("userId", "==", uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(userPosts);
    });

    return unsubscribe;
  }, [uid]);

  if (!userData) {
    return <p style={{ textAlign: "center" }}>Loading profile...</p>;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h2>@{userData.username}</h2>
<p>{userData.email}</p>

<p>
  {userData.followers?.length || 0} followers ·{" "}
  {userData.following?.length || 0} following
</p>

{!isOwnProfile && (
  <button onClick={toggleFollow}>
    {isFollowing ? "Unfollow" : "Follow"}
  </button>
)}

<hr />


      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Profile;
