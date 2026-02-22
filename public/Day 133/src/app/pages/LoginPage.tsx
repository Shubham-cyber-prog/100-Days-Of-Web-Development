import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Package } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, validate credentials
    navigate("/");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Illustration panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-indigo-800 p-12 flex-col justify-between">
        <div className="flex items-center gap-3 text-white">
          <Package className="size-8" />
          <span className="text-2xl font-semibold">InventoryPro</span>
        </div>
        
        <div className="text-white">
          <h1 className="text-4xl font-bold mb-4">
            Manage Your Inventory
            <br />
            with Ease
          </h1>
          <p className="text-indigo-100 text-lg">
            Track products, manage orders, and gain insights into your business
            operations all in one place.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-white">
          <div>
            <div className="text-3xl font-bold">500+</div>
            <div className="text-indigo-200 text-sm">Active Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold">10k+</div>
            <div className="text-indigo-200 text-sm">Products Tracked</div>
          </div>
          <div>
            <div className="text-3xl font-bold">99.9%</div>
            <div className="text-indigo-200 text-sm">Uptime</div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back
              </h2>
              <p className="text-gray-600">
                Sign in to your account to continue
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
                  Forgot password?
                </a>
              </div>

              <Button type="submit" className="w-full h-11 bg-indigo-600 hover:bg-indigo-700">
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Sign up
              </a>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            © 2026 InventoryPro. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
