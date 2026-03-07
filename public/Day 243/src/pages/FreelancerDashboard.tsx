import { Link } from "react-router-dom";
import { Briefcase, DollarSign, TrendingUp, Gavel } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/DashboardSidebar";
import ProjectCard from "@/components/ProjectCard";
import { useProjectStore } from "@/store/projectStore";

const stats = [
  { label: "Active Bids", value: "5", icon: Gavel, color: "text-primary" },
  { label: "Active Projects", value: "2", icon: Briefcase, color: "text-info" },
  { label: "Total Earnings", value: "$12,450", icon: DollarSign, color: "text-success" },
];

const FreelancerDashboard = () => {
  const projects = useProjectStore((s) => s.projects);
  return (
  <div className="flex min-h-screen">
    <DashboardSidebar role="freelancer" />
    <div className="flex-1">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
        <div>
          <h1 className="font-display text-xl font-bold text-foreground">Freelancer Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back, Alex!</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <TrendingUp size={16} className="text-success" />
          <span className="text-muted-foreground">Profile views up <span className="font-semibold text-success">12%</span></span>
        </div>
      </header>

      <main className="p-6 space-y-8">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <s.icon size={20} className={s.color} />
              </div>
              <p className="mt-2 font-display text-3xl font-bold text-card-foreground">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Browse Projects */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-lg font-semibold text-foreground">Browse Projects</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.filter((p) => p.status === "open").map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </main>
    </div>
  </div>
  );
};

export default FreelancerDashboard;
