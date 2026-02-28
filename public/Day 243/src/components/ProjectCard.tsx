import { Link } from "react-router-dom";
import { Clock, DollarSign, Users } from "lucide-react";
import StatusBadge from "./StatusBadge";
import type { Project } from "@/data/dummy";

const ProjectCard = ({ project }: { project: Project }) => (
  <Link
    to={`/project/${project.id}`}
    className="group block rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
  >
    <div className="flex items-start justify-between">
      <h3 className="font-display text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
        {project.title}
      </h3>
      <StatusBadge status={project.status} />
    </div>
    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{project.description}</p>
    <div className="mt-4 flex flex-wrap gap-2">
      {project.skills.map((s) => (
        <span key={s} className="rounded-md bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
          {s}
        </span>
      ))}
    </div>
    <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
      <span className="flex items-center gap-1"><DollarSign size={14} />{project.budget}</span>
      <span className="flex items-center gap-1"><Clock size={14} />{project.deadline}</span>
      <span className="flex items-center gap-1"><Users size={14} />{project.bidsCount} bids</span>
    </div>
  </Link>
);

export default ProjectCard;
