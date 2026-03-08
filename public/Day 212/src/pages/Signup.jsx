import { useState } from "react";
import axios from "axios";

function Signup({ setIsSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password }
      );

      alert("Registration Successful! Please Login.");
      setIsSignup(false);
    } catch (err) {
      alert("Registration Failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-10 rounded-3xl w-96 shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h1>

        <input
          className="w-full p-3 mb-4 rounded-lg bg-white/20 outline-none"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        />

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
          onClick={register}
          className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-xl transition"
        >
          Sign Up
        </button>

        <p className="text-center mt-6 text-sm text-gray-300">
          Already have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => setIsSignup(false)}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;