import { Link } from "react-router";
import { ArrowRight, Users, FileText, Calendar, BarChart3, MessageSquare, Bell, Shield, Zap, Globe } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const features = [
  {
    icon: FileText,
    title: "Report Issues",
    description: "Easily report community issues with photos and location tracking.",
    color: "text-primary",
  },
  {
    icon: Calendar,
    title: "Events",
    description: "Discover and RSVP to local community events and gatherings.",
    color: "text-secondary",
  },
  {
    icon: BarChart3,
    title: "Polls & Voting",
    description: "Participate in community decisions through democratic polls.",
    color: "text-accent",
  },
  {
    icon: MessageSquare,
    title: "Community Chat",
    description: "Connect with neighbors through real-time messaging.",
    color: "text-info",
  },
  {
    icon: Bell,
    title: "Notices",
    description: "Stay updated with important community announcements.",
    color: "text-warning",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is protected with enterprise-grade security.",
    color: "text-success",
  },
];

const stats = [
  { label: "Active Members", value: "12,450" },
  { label: "Issues Resolved", value: "3,284" },
  { label: "Events This Month", value: "48" },
  { label: "Community Score", value: "98%" },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Community Manager",
    image: "https://images.unsplash.com/photo-1761957374132-a5137e99f26c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBncm91cCUyMGRpdmVyc2UlMjBwZW9wbGV8ZW58MXx8fHwxNzcxNTY5NTczfDA&ixlib=rb-4.1.0&q=80&w=1080",
    quote: "This platform has transformed how our community collaborates. We've never been more connected!",
  },
  {
    name: "Michael Chen",
    role: "Resident",
    image: "https://images.unsplash.com/photo-1670634076643-5ac6cf92a3dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjaXR5JTIwbmVpZ2hib3Job29kfGVufDF8fHx8MTc3MTY1MDI1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    quote: "Reporting issues is now effortless, and I can see real progress being made in our neighborhood.",
  },
  {
    name: "Emily Rodriguez",
    role: "Event Organizer",
    image: "https://images.unsplash.com/photo-1751666526244-40239a251eae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNvbW11bml0eSUyMHZvbHVudGVlcnN8ZW58MXx8fHwxNzcxNjUwMjU4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    quote: "The events feature makes organizing community gatherings so much easier. Amazing tool!",
  },
];

export function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                <Users className="size-5 text-white" />
              </div>
              <span className="font-semibold">Smart Community Hub</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Join Community</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4" variant="secondary">
              <Zap className="size-3 mr-1" />
              Open Source Community Platform
            </Badge>
            <h1 className="mb-6">
              Build Stronger Communities
              <span className="block bg-gradient-to-r from-primary via-secondary to-primary-light bg-clip-text text-transparent">
                Together
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Smart Community Hub empowers residents to collaborate, report issues, share updates, and access local services—all in one modern platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2" asChild>
                <Link to="/signup">
                  Join Community
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/app">View Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats */}
      <section className="py-12 border-y border-border bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4">Everything Your Community Needs</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive suite of tools designed to make community management effortless and engaging.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className={`size-12 rounded-lg bg-muted flex items-center justify-center mb-4 ${feature.color}`}>
                      <Icon className="size-6" />
                    </div>
                    <h3 className="mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-32 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4">Loved by Communities Worldwide</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what members are saying about Smart Community Hub.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="size-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Globe className="size-16 mx-auto mb-6 opacity-90" />
          <h2 className="mb-4 text-white">Ready to Transform Your Community?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of communities already using Smart Community Hub to build better, more connected neighborhoods.
          </p>
          <Button size="lg" variant="secondary" className="gap-2" asChild>
            <Link to="/signup">
              Get Started Free
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                  <Users className="size-5 text-white" />
                </div>
                <span className="font-semibold">Community Hub</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Building stronger communities through technology.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Features</a></li>
                <li><a href="#" className="hover:text-foreground">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Blog</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms</a></li>
                <li><a href="#" className="hover:text-foreground">License</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© 2026 Smart Community Hub. Open source and community-driven.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}