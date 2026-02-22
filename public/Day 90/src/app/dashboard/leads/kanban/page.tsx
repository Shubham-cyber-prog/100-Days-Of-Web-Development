import { prisma } from "@/lib/prisma";
import KanbanBoard from "./kanban-board";

export default async function KanbanPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Leads Kanban</h1>
      <KanbanBoard leads={leads} />
    </div>
  );
}
