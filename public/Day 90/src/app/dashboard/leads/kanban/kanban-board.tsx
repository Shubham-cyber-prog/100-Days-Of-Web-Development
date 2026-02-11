"use client";

import { Lead, LeadStatus } from "@prisma/client";
import KanbanColumn from "./kanban-column";

type Props = {
  leads: Lead[];
};

export default function KanbanBoard({ leads }: Props) {
  const columns: LeadStatus[] = [
    "NEW",
    "CONTACTED",
    "QUALIFIED",
    "CONVERTED",
    "LOST",
  ];

  return (
    <div className="grid grid-cols-5 gap-4">
      {columns.map((status) => (
        <KanbanColumn
          key={status}
          status={status}
          leads={leads.filter((l) => l.status === status)}
        />
      ))}
    </div>
  );
}
