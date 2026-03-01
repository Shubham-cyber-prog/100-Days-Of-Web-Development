import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Bot, Mail, Lock, Chrome, Github, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Separator } from "../components/ui/separator";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fb] via-[#f0f1f9] to-[#e8eaf6] flex items-center justify-center p-4">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4f46e5]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#06b6d4]/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Bot className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-semibold bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] bg-clip-text text-transparent">
            AI Assistant
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="backdrop-blur-xl bg-white/80 border-white/40 shadow-2xl rounded-3xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </CardTitle>
              <CardDescription>
                {isSignUp
                  ? "Sign up to get started with AI Assistant"
                  : "Sign in to your account to continue"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Social Login */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full rounded-2xl py-6 border-2 hover:bg-white/50 transition-all"
                  type="button"
                >
                  <Chrome className="w-5 h-5 mr-2" />
                  Continue with Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-2xl py-6 border-2 hover:bg-white/50 transition-all"
                  type="button"
                >
                  <Github className="w-5 h-5 mr-2" />
                  Continue with GitHub
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-2xl py-6 border-2 hover:bg-white/50 transition-all hover:border-[#4f46e5] hover:text-[#4f46e5]"
                  type="button"
                  onClick={() => navigate("/dashboard")}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Continue with AI Profile
                </Button>
              </div>

              <div className="relative">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
                  or
                </span>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10 rounded-2xl py-6 bg-white/50 border-2 focus:border-[#4f46e5] transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 rounded-2xl py-6 bg-white/50 border-2 focus:border-[#4f46e5] transition-all"
                      required
                    />
                  </div>
                </div>

                {!isSignUp && (
                  <div className="flex justify-end">
                    <a
                      href="#"
                      className="text-sm text-[#4f46e5] hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full rounded-2xl py-6 bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] hover:opacity-90 transition-all shadow-lg shadow-indigo-500/30"
                >
                  {isSignUp ? "Sign Up" : "Sign In"}
                </Button>
              </form>

              <div className="text-center text-sm">
                <span className="text-gray-600">
                  {isSignUp ? "Already have an account?" : "Don't have an account?"}
                </span>{" "}
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-[#4f46e5] font-semibold hover:underline"
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <p className="text-center text-sm text-gray-500 mt-6">
          By continuing, you agree to our{" "}
          <a href="#" className="text-[#4f46e5] hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-[#4f46e5] hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
