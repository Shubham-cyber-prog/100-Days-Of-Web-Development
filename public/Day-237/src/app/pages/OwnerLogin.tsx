import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { motion } from "motion/react";
import { Building2, Mail, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function OwnerLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ email: "", password: "" });

    // Validation
    let hasErrors = false;
    const newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "Email is required";
      hasErrors = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      hasErrors = true;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      hasErrors = true;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    // Simulate login
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem(
        "turfbook_owner",
        JSON.stringify({
          email: formData.email,
          name: "Turf Owner",
          role: "owner",
        })
      );
      setIsLoading(false);
      navigate("/owner/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#121212] relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1459865264687-595d652de67e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Sports Field"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#121212] via-[#121212]/95 to-[#1B5E20]/20" />
      </div>

      {/* Glow Effects */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#00E676]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#1B5E20]/20 rounded-full blur-[120px]" />

      {/* Header */}
      <header className="relative z-10 border-b border-[#1B5E20] bg-[#1E1E1E]/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/home" className="flex items-center gap-2">
              <div className="text-2xl font-bold">
                <span className="text-[#00E676]">Turf</span>
                <span className="text-white">Book</span>
              </div>
            </Link>
            <Button
              variant="ghost"
              onClick={() => navigate("/home")}
              className="text-white hover:text-[#00E676] transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Login Card */}
          <div className="bg-[#1E1E1E] rounded-[24px] p-8 border border-[#1B5E20] shadow-[0_8px_32px_rgba(0,230,118,0.1)]">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-br from-[#00E676] to-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(0,230,118,0.3)]"
            >
              <Building2 className="w-8 h-8 text-[#121212]" />
            </motion.div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-center mb-2">
              <span className="text-white">Owner </span>
              <span className="text-[#00E676]">Login</span>
            </h1>
            <p className="text-[#BDBDBD] text-center mb-8">
              Manage your turfs and bookings
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#BDBDBD]" />
                  <Input
                    type="email"
                    placeholder="owner@turfbook.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="pl-10 bg-[#121212] border-[#1B5E20] text-white placeholder:text-[#757575] focus:border-[#00E676] h-12 transition-all duration-300"
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#BDBDBD]" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="pl-10 pr-10 bg-[#121212] border-[#1B5E20] text-white placeholder:text-[#757575] focus:border-[#00E676] h-12 transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#BDBDBD] hover:text-[#00E676] transition-colors duration-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-[#00E676] hover:text-[#00E676]/80 transition-colors duration-300"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#00E676] text-[#121212] hover:bg-[#00E676]/90 font-semibold text-lg transition-all duration-300 shadow-[0_0_20px_rgba(0,230,118,0.3)] hover:shadow-[0_0_30px_rgba(0,230,118,0.5)]"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Building2 className="h-5 w-5" />
                  </motion.div>
                ) : (
                  "Login to Dashboard"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#1B5E20]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#1E1E1E] text-[#BDBDBD]">
                  New to TurfBook?
                </span>
              </div>
            </div>

            {/* Register Link */}
            <div className="text-center">
              <button
                onClick={() => navigate("/owner/signup")}
                className="text-[#00E676] hover:text-[#00E676]/80 font-medium transition-colors duration-300"
              >
                Register as Turf Owner →
              </button>
            </div>
          </div>

          {/* Info Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-[#757575] text-sm mt-6"
          >
            Manage bookings, slots, and payments in one place
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}