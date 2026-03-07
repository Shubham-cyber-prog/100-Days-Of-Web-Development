import { Link } from "react-router-dom";
import { Briefcase, CheckCircle, Clock } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import StatusBadge from "@/components/StatusBadge";
import CreateProjectModal from "@/components/CreateProjectModal";
import { useProjectStore } from "@/store/projectStore";

const ClientDashboard = () => {
  const projects = useProjectStore((s) => s.projects);
  const stats = [
    { label: "Active Projects", value: String(projects.filter((p) => p.status !== "completed").length), icon: Briefcase, color: "text-primary" },
    { label: "Completed", value: String(projects.filter((p) => p.status === "completed").length), icon: CheckCircle, color: "text-success" },
    { label: "Pending Bids", value: String(projects.reduce((a, p) => a + p.bidsCount, 0)), icon: Clock, color: "text-warning" },
  ];

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar role="client" />
      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">Client Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back, Sarah!</p>
          </div>
          <CreateProjectModal />
        </header>

        <main className="p-6 space-y-8">
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

          <div className="rounded-2xl border border-border bg-card shadow-card">
            <div className="border-b border-border px-6 py-4">
              <h2 className="font-display text-lg font-semibold text-card-foreground">My Projects</h2>
            </div>
            <div className="divide-y divide-border">
              {projects.map((p) => (
                <Link
                  key={p.id}
                  to={`/project/${p.id}`}
                  className="flex items-center justify-between px-6 py-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-card-foreground truncate">{p.title}</p>
                    <p className="text-sm text-muted-foreground">{p.budget} · {p.bidsCount} bids</p>
                  </div>
                  <StatusBadge status={p.status} />
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientDashboard;
