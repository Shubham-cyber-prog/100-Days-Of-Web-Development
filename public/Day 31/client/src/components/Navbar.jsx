import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  console.log("STYLED NAVBAR LOADED");
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex gap-6 font-medium text-gray-700">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/jobs" className="hover:text-blue-600">Jobs</Link>

          {user?.role === "jobseeker" && (
            <Link to="/my-applications" className="hover:text-blue-600">
              My Applications
            </Link>
          )}

          {user?.role === "employer" && (
            <>
              <Link to="/post-job" className="hover:text-blue-600">
                Post Job
              </Link>
              <Link to="/employer-dashboard" className="hover:text-blue-600">
                Dashboard
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-gray-600">{user.name}</span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
