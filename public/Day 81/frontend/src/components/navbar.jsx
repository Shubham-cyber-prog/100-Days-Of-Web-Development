// src/components/Navbar.jsx
import React from "react";


const Navbar = ({ isSignedIn, onSignIn, onRegister }) => {
  return (
    <nav className="navbar">
      <div className="logo">🏥 MyHealth</div>

      {isSignedIn && (
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Help</a></li>
        </ul>
      )}

      <div className="auth-buttons">
        {!isSignedIn ? (
          <>
            <button className="signin" onClick={onSignIn}>Sign In</button>
            <button className="register" onClick={onRegister}>Register</button>
          </>
        ) : (
          <span className="welcome">Welcome, Doctor 👋</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;