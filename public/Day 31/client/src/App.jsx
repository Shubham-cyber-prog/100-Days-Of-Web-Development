import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyApplications from "./pages/MyApplications";
import EmployerDashboard from "./pages/EmployerDashboard";
import PostJob from "./pages/PostJob";
import PrivateRoute from "./components/PrivateRoute";
import EmployerRoute from "./components/EmployerRoute";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/my-applications"
            element={
              <PrivateRoute>
                <MyApplications />
              </PrivateRoute>
            }
          />

          <Route
            path="/post-job"
            element={
              <EmployerRoute>
                <PostJob />
              </EmployerRoute>
            }
          />

          <Route
            path="/employer-dashboard"
            element={
              <EmployerRoute>
                <EmployerDashboard />
              </EmployerRoute>
            }
          />
        </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
