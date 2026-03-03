import { create } from "zustand";
import { projects as initialProjects, type Project } from "@/data/dummy";

interface ProjectStore {
  projects: Project[];
  addProject: (p: Omit<Project, "id" | "client" | "bidsCount" | "status">) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: initialProjects,
  addProject: (p) =>
    set((state) => ({
      projects: [
        {
          ...p,
          id: String(Date.now()),
          status: "open",
          client: { name: "Sarah Mitchell", avatar: "SM", rating: 4.9 },
          bidsCount: 0,
        },
        ...state.projects,
      ],
    })),
}));
