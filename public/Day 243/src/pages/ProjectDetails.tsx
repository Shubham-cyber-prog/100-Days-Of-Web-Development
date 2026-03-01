import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, DollarSign, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import StatusBadge from "@/components/StatusBadge";
import BidCard from "@/components/BidCard";
import { useProjectStore } from "@/store/projectStore";
import { sampleBids } from "@/data/dummy";

const ProjectDetails = () => {
  const { id } = useParams();
  const allProjects = useProjectStore((s) => s.projects);
  const project = allProjects.find((p) => p.id === id) || allProjects[0];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <Link to="/freelancer/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft size={16} /> Back to Projects
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-start justify-between">
                <h1 className="font-display text-2xl font-bold text-card-foreground">{project.title}</h1>
                <StatusBadge status={project.status} />
              </div>
              <p className="mt-4 text-muted-foreground leading-relaxed">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.skills.map((s) => (
                  <span key={s} className="rounded-md bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">{s}</span>
                ))}
              </div>
              <div className="mt-6 flex gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><DollarSign size={16} />{project.budget}</span>
                <span className="flex items-center gap-1.5"><Calendar size={16} />{project.deadline}</span>
              </div>
            </div>

            {/* Bidding Form */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h2 className="font-display text-lg font-semibold text-card-foreground">Submit a Bid</h2>
              <form className="mt-4 space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <Label htmlFor="amount">Bid Amount ($)</Label>
                  <Input id="amount" type="number" placeholder="3500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="proposal">Your Proposal</Label>
                  <Textarea id="proposal" rows={4} placeholder="Describe why you're the best fit for this project..." />
                </div>
                <Button className="rounded-xl">Submit Bid</Button>
              </form>
            </div>

            {/* Bids */}
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground mb-4">Bids ({sampleBids.length})</h2>
              <div className="space-y-4">
                {sampleBids.map((b) => <BidCard key={b.id} bid={b} />)}
              </div>
            </div>
          </div>

          {/* Sidebar - Client Info */}
          <div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card sticky top-24">
              <h3 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wider">Client</h3>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent font-display text-sm font-semibold text-accent-foreground">
                  {project.client.avatar}
                </div>
                <div>
                  <p className="font-display font-semibold text-card-foreground">{project.client.name}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star size={14} className="fill-warning text-warning" />
                    {project.client.rating}
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Projects Posted</span>
                  <span className="font-medium text-card-foreground">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Spent</span>
                  <span className="font-medium text-card-foreground">$24,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Member Since</span>
                  <span className="font-medium text-card-foreground">Jan 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
