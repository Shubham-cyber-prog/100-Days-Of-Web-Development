import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WaitlistForm } from "@/components/waitlist-form";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapIcon, 
  Users2Icon, 
  MessageCircle, 
  Zap, 
  MapPin, 
  BuildingIcon, 
  MessagesSquareIcon, 
  Menu, 
  X 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";

// --- Constants & Data ---

const FADE_IN = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const FEATURES = [
  {
    title: "Location-Based",
    description: "Find professionals in your city, neighborhood, or anywhere you choose.",
    icon: <MapIcon className="w-10 h-10 text-blue-600" />
  },
  {
    title: "Instant Connection",
    description: "Join conversations immediately with real-time chat and instant notifications.",
    icon: <Zap className="w-10 h-10 text-blue-600" />
  },
  {
    title: "Interest Matching",
    description: "Connect with professionals who share your interests and career goals.",
    icon: <Users2Icon className="w-10 h-10 text-blue-600" />
  }
];

const STEPS = [
  {
    number: "1",
    title: "Enter Your Field",
    description: "Tell us about your profession and areas of interest.",
    icon: <BuildingIcon className="w-8 h-8 text-primary" />
  },
  {
    number: "2",
    title: "Location Detection",
    description: "We automatically detect your location to find relevant connections.",
    icon: <MapPin className="w-8 h-8 text-primary" />
  },
  {
    number: "3",
    title: "Join Conversations",
    description: "Connect in AI-created rooms with professionals in your area.",
    icon: <MessagesSquareIcon className="w-8 h-8 text-primary" />
  }
];

// --- Sub-Components ---

const Navbar = () => {
  const [, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Discover", path: "/discover" },
    { name: "Chat", path: "/chat" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50 shadow-sm transition-all">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => setLocation('/')}
          >
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
              <MessageCircle className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">IntelliCircle</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <button 
                key={link.name}
                onClick={() => setLocation(link.path)} 
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" onClick={() => setLocation('/discover')}>
              Discover
            </Button>
            <Button onClick={() => setLocation('/chat')} className="bg-blue-600 hover:bg-blue-700">
              Start Chatting
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t bg-white overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-4">
              {navLinks.map((link) => (
                <button 
                  key={link.name}
                  onClick={() => { setLocation(link.path); setIsOpen(false); }}
                  className="text-left text-lg font-medium text-gray-700 hover:text-blue-600"
                >
                  {link.name}
                </button>
              ))}
              <div className="border-t pt-4 flex flex-col gap-2">
                <Button variant="outline" className="w-full" onClick={() => setLocation('/discover')}>
                  Discover
                </Button>
                <Button className="w-full bg-blue-600" onClick={() => setLocation('/chat')}>
                  Start Chatting
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HeroSection = () => {
  const [, setLocation] = useLocation();

  return (
    <section className="relative px-4 py-16 md:py-32 bg-gradient-to-br from-blue-50 via-indigo-50 to-white overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          className="text-center space-y-6"
          initial="initial"
          animate="animate"
          variants={FADE_IN}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Connect Locally. <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Network Globally.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join location-based professional chat rooms. Find colleagues in your area, 
            share ideas, and build meaningful connections based on shared interests.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              size="lg" 
              onClick={() => setLocation('/discover')}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 h-12 px-8 text-base"
            >
              <MapPin className="h-5 w-5 mr-2" />
              Find Nearby Rooms
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setLocation('/chat')}
              className="w-full sm:w-auto h-12 px-8 text-base border-blue-200 hover:bg-blue-50 text-blue-700"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Browse All Rooms
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Main Component ---

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      <HeroSection />

      {/* Features Section */}
      <section className="px-4 py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose IntelliCircle?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Everything you need to build a powerful local network.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border-none shadow-lg shadow-blue-900/5 hover:shadow-xl transition-shadow">
                  <CardContent className="p-8 text-center space-y-4">
                    <div className="flex justify-center p-3 bg-blue-50 rounded-full w-fit mx-auto">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-16 md:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <Card className="p-6 h-full relative border-none shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  <CardContent className="space-y-4 pt-6 z-10 relative">
                    <div className="flex justify-center mb-4">{step.icon}</div>
                    <h3 className="text-xl font-semibold text-center">{step.title}</h3>
                    <p className="text-muted-foreground text-center">{step.description}</p>
                  </CardContent>
                  {/* Decorative Number */}
                  <span className="absolute -top-4 -right-4 text-8xl font-black text-slate-100 -z-0 select-none">
                    {step.number}
                  </span>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist / CTA Section */}
      <section className="px-4 py-20 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Waitlist</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Be among the first to experience the future of professional networking.
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl border">
               <WaitlistForm />
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} IntelliCircle. All rights reserved.</p>
      </footer>
    </div>
  );
}