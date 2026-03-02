import { Mail, Lock, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-purple-50 via-blue-50 to-white">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, var(--gradient-from) 0%, var(--gradient-to) 100%)'
            }}>
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-semibold">SummarizeAI</span>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg border border-border">
            <h2 className="text-2xl font-semibold mb-2">Welcome back</h2>
            <p className="text-muted-foreground mb-6">Sign in to your account to continue</p>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
              {/* Email */}
              <div>
                <label className="block text-sm mb-2">Email</label>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full h-12 pl-11 pr-4 rounded-xl bg-input-background border border-transparent focus:border-border focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm mb-2">Password</label>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full h-12 pl-11 pr-4 rounded-xl bg-input-background border border-transparent focus:border-border focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="text-purple-600 hover:text-purple-700">Forgot password?</a>
              </div>

              {/* Sign In Button */}
              <motion.button
                type="submit"
                className="w-full h-12 rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-shadow"
                style={{
                  background: 'linear-gradient(135deg, var(--gradient-from) 0%, var(--gradient-to) 100%)'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign In
              </motion.button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-muted-foreground">Or continue with</span>
                </div>
              </div>

              {/* Google Sign In */}
              <motion.button
                type="button"
                className="w-full h-12 rounded-xl border border-border hover:bg-accent transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continue with Google</span>
              </motion.button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Don't have an account? <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">Sign up</a>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <motion.div 
          className="relative z-10 max-w-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1727949236862-b8692b9d1dc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBpbGx1c3RyYXRpb24lMjBncmFkaWVudHxlbnwxfHx8fDE3NzE4NzIyMjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Workspace illustration"
              className="w-full h-64 object-cover rounded-2xl mb-6"
            />
            <h3 className="text-2xl font-semibold text-white mb-3">
              AI-Powered Document Intelligence
            </h3>
            <p className="text-purple-100">
              Transform lengthy documents into concise, actionable summaries in seconds. 
              Save time and boost productivity with intelligent AI analysis.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
