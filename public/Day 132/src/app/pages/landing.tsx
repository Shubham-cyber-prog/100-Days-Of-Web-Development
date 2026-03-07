import { Link } from "react-router";
import { motion } from "motion/react";
import { 
  Bot, 
  MessageSquare, 
  Zap, 
  Mic, 
  TrendingUp, 
  Puzzle,
  ChevronRight,
  Twitter,
  Github,
  Linkedin,
  Star,
  Sparkles
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export default function LandingPage() {
  const features = [
    {
      icon: MessageSquare,
      title: "Smart Conversations",
      description: "Natural language understanding with context-aware responses"
    },
    {
      icon: Zap,
      title: "Task Automation",
      description: "Automate repetitive tasks and workflows seamlessly"
    },
    {
      icon: Mic,
      title: "Voice Commands",
      description: "Hands-free control with advanced voice recognition"
    },
    {
      icon: TrendingUp,
      title: "Data Insights",
      description: "Real-time analytics and intelligent recommendations"
    },
    {
      icon: Puzzle,
      title: "Custom Integrations",
      description: "Connect with your favorite tools and platforms"
    },
    {
      icon: Sparkles,
      title: "AI-Powered",
      description: "Cutting-edge machine learning for superior performance"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      content: "This AI assistant has transformed how our team collaborates. It's like having an extra team member.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Developer",
      content: "The automation capabilities are incredible. I save at least 10 hours every week.",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Marketing Director",
      content: "The insights and analytics have helped us make better data-driven decisions.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fb] via-[#f0f1f9] to-[#e8eaf6]">
      {/* Header */}
      <header className="border-b border-white/20 backdrop-blur-md bg-white/40 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] bg-clip-text text-transparent">
                AI Assistant
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" className="rounded-2xl">
                  Sign In
                </Button>
              </Link>
              <Link to="/login">
                <Button className="rounded-2xl bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] hover:opacity-90">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/20 mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-[#4f46e5]" />
              <span className="text-sm text-gray-600">Powered by Advanced AI</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#06b6d4] bg-clip-text text-transparent leading-tight">
              Your Intelligent AI Assistant for Everything
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Automate tasks, have natural conversations, get instant insights, and boost your productivity with our cutting-edge AI-powered virtual assistant.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="rounded-2xl bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] hover:opacity-90 text-lg px-8 py-6 shadow-lg shadow-indigo-500/30">
                  Get Started
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/dashboard/chat">
                <Button size="lg" variant="outline" className="rounded-2xl text-lg px-8 py-6 border-2">
                  Try Demo
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* AI Illustration Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16"
          >
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-[#4f46e5]/20 to-[#06b6d4]/20 blur-3xl rounded-full" />
              <Card className="relative backdrop-blur-xl bg-white/70 border-white/40 shadow-2xl rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="aspect-video rounded-2xl bg-gradient-to-br from-[#4f46e5]/10 to-[#7c3aed]/10 flex items-center justify-center">
                    <Bot className="w-32 h-32 text-[#4f46e5] opacity-50" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to supercharge your workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full backdrop-blur-xl bg-white/70 border-white/40 rounded-3xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/30">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] bg-clip-text text-transparent">
            Loved by Teams Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what our users have to say
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full backdrop-blur-xl bg-white/70 border-white/40 rounded-3xl">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#06b6d4] text-[#06b6d4]" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/20 backdrop-blur-md bg-white/40 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] bg-clip-text text-transparent">
                  AI Assistant
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Your intelligent companion for a smarter workflow.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-[#4f46e5] transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-[#4f46e5] transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-[#4f46e5] transition-colors">Use Cases</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-[#4f46e5] transition-colors">About</a></li>
                <li><a href="#" className="hover:text-[#4f46e5] transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-[#4f46e5] transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center hover:bg-[#4f46e5] hover:text-white transition-all">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center hover:bg-[#4f46e5] hover:text-white transition-all">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center hover:bg-[#4f46e5] hover:text-white transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2026 AI Assistant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
