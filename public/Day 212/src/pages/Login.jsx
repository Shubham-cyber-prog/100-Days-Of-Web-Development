import { useState } from "react";
import axios from "axios";

function Login({ setToken, setIsSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-10 rounded-3xl w-96 shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">
          Smart Home Login
        </h1>

        <input
          className="w-full p-3 mb-4 rounded-lg bg-white/20 outline-none"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 mb-6 rounded-lg bg-white/20 outline-none"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-xl transition"
        >
          Login
        </button>

        <p className="text-center mt-6 text-sm text-gray-300">
          Don't have an account?{" "}
          <span
            className="text-green-400 cursor-pointer"
            onClick={() => setIsSignup(true)}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;