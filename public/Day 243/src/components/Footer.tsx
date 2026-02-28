import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <h3 className="font-display text-lg font-bold text-gradient">FreelanceHub</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Connecting talented freelancers with amazing projects worldwide.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold text-foreground">For Clients</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/client/dashboard" className="hover:text-foreground transition-colors">Post a Project</Link></li>
            <li><Link to="/" className="hover:text-foreground transition-colors">How It Works</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold text-foreground">For Freelancers</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/freelancer/dashboard" className="hover:text-foreground transition-colors">Browse Projects</Link></li>
            <li><Link to="/register" className="hover:text-foreground transition-colors">Create Profile</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold text-foreground">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><span className="hover:text-foreground transition-colors cursor-pointer">About Us</span></li>
            <li><span className="hover:text-foreground transition-colors cursor-pointer">Contact</span></li>
            <li><span className="hover:text-foreground transition-colors cursor-pointer">Privacy Policy</span></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
        © 2026 FreelanceHub. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
