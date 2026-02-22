import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Footer from "../components/footer.jsx";
import Navbar from "../components/navbar.jsx";
const HomePage = () => {
   const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => setIsSignedIn(true);
  const handleRegister = () => alert("Redirect to Register page...");

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <Navbar
        isSignedIn={isSignedIn}
        onSignIn={handleSignIn}
        onRegister={handleRegister}
      />

      {/* Hero Section */}
      <header className="hero">
        <h1>Welcome to MyHealth Portal</h1>
        <p>Your trusted healthcare companion for appointments, prescriptions, and more.</p>
        <h4>Made with ❤️ by Sunetra Bar</h4>
        <button className="cta">Get Started</button>
      </header>

      {/* Inline Boxes Section */}
      <section className="inline-boxes">
        <div className="box" onClick={() => navigate("/dashboard")}>
          Doctor Dashboard
        </div>
        <div className="box" onClick={() => navigate("/check-status")}>
          Check Status
        </div>
        <div className="box" onClick={() => navigate("/appointment")}>
          Appointment Booking
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;