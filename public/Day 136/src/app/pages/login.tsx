import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Shield, Mail, Chrome, Github } from "lucide-react";
import { motion } from "motion/react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-500 via-purple-500 to-violet-600 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <span className="text-white text-2xl">ContentGuard AI</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 flex items-center justify-center flex-1"
        >
          <div className="max-w-md">
            <div className="relative">
              {/* Animated scanning effect */}
              <div className="w-96 h-96 bg-white/10 backdrop-blur-md rounded-3xl p-8 relative">
                <div className="absolute inset-0 rounded-3xl border-2 border-white/30"></div>
                
                {/* AI Scanning Animation */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent"
                  animate={{ y: [0, 384, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                
                <div className="flex flex-col gap-4 mt-12">
                  {[
                    { text: "Analyzing content...", delay: 0 },
                    { text: "Detecting toxicity...", delay: 0.5 },
                    { text: "Checking spam patterns...", delay: 1 },
                    { text: "Verifying compliance...", delay: 1.5 },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: item.delay, duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                      className="flex items-center gap-3 text-white/80"
                    >
                      <div className="w-2 h-2 rounded-full bg-white/60"></div>
                      <span>{item.text}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-white/60 text-sm">Accuracy</div>
                    <div className="text-white text-2xl mt-1">94.2%</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-white/60 text-sm">Response</div>
                    <div className="text-white text-2xl mt-1">2.3s</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative z-10"
        >
          <p className="text-white/80">
            Protect your community with AI-powered content moderation
          </p>
        </motion.div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <h1 className="text-3xl mb-2">Welcome back</h1>
            <p className="text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Button variant="outline" className="h-11">
              <Mail className="w-5 h-5" />
            </Button>
            <Button variant="outline" className="h-11">
              <Chrome className="w-5 h-5" />
            </Button>
            <Button variant="outline" className="h-11">
              <Github className="w-5 h-5" />
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Don't have an account?{" "}
            <button className="text-primary hover:underline">
              Contact sales
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
