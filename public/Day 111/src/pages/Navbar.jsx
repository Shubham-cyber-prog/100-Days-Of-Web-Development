import "../styles/navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/">SocialNet</Link>
      </div>

      <div className="nav-right">
        <Link to={`/profile/${user.uid}`}>@{user.email.split("@")[0]}</Link>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
