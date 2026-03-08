import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    dob: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock signup - store user data
    localStorage.setItem("turfbook_user", JSON.stringify({
      email: formData.email,
      name: `${formData.firstName} ${formData.lastName}`,
      phone: formData.phone,
      dob: formData.dob
    }));
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-[#00E676]">Turf</span>
            <span className="text-white">Book</span>
          </h1>
          <p className="text-[#BDBDBD]">Create your account to get started.</p>
        </div>

        {/* Signup Card */}
        <div className="bg-[#1E1E1E] rounded-[14px] p-8 card-elevation">
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-white">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="bg-[#121212] border-[#1B5E20] text-white placeholder:text-[#BDBDBD] focus:border-[#00E676] focus:ring-[#00E676]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-white">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="bg-[#121212] border-[#1B5E20] text-white placeholder:text-[#BDBDBD] focus:border-[#00E676] focus:ring-[#00E676]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="bg-[#121212] border-[#1B5E20] text-white placeholder:text-[#BDBDBD] focus:border-[#00E676] focus:ring-[#00E676]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob" className="text-white">Date of Birth</Label>
                <Input
                  id="dob"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  className="bg-[#121212] border-[#1B5E20] text-white placeholder:text-[#BDBDBD] focus:border-[#00E676] focus:ring-[#00E676]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-[#121212] border-[#1B5E20] text-white placeholder:text-[#BDBDBD] focus:border-[#00E676] focus:ring-[#00E676]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-[#121212] border-[#1B5E20] text-white placeholder:text-[#BDBDBD] focus:border-[#00E676] focus:ring-[#00E676]"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#00E676] text-[#121212] hover:bg-[#00E676]/90 neon-glow-hover font-semibold"
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#BDBDBD]">
              Already have an account?{" "}
              <Link to="/login" className="text-[#00E676] hover:underline font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
