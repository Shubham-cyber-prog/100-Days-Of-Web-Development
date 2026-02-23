import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - store user data
    localStorage.setItem("turfbook_user", JSON.stringify({
      email,
      name: "John Doe",
      phone: "+91 9876543210"
    }));
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-[#00E676]">Turf</span>
            <span className="text-white">Book</span>
          </h1>
          <p className="text-[#BDBDBD]">Welcome back! Please login to continue.</p>
        </div>

        {/* Login Card */}
        <div className="bg-[#1E1E1E] rounded-[14px] p-8 card-elevation">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#121212] border-[#1B5E20] text-white placeholder:text-[#BDBDBD] focus:border-[#00E676] focus:ring-[#00E676]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-[#121212] border-[#1B5E20] text-white placeholder:text-[#BDBDBD] focus:border-[#00E676] focus:ring-[#00E676]"
              />
            </div>

            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-[#00E676] hover:underline">
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#00E676] text-[#121212] hover:bg-[#00E676]/90 neon-glow-hover font-semibold"
            >
              Login
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#BDBDBD]">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#00E676] hover:underline font-semibold">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
