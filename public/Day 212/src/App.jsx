import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isSignup, setIsSignup] = useState(false);

  if (token) return <Dashboard setToken={setToken} />;

  return isSignup ? (
    <Signup setIsSignup={setIsSignup} />
  ) : (
    <Login setToken={setToken} setIsSignup={setIsSignup} />
  );
}

export default App;