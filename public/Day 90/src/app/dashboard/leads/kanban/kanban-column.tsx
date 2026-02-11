"use client";

import { useDroppable } from "@dnd-kit/core";
import DraggableLead from "./draggable-lead";

export default function KanbanColumn({
  status,
  leads,
}: {
  status: string;
  leads: any[];
}) {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className="border rounded-lg p-3 bg-gray-50 min-h-[300px]"
    >
      <h2 className="font-semibold mb-3">{status}</h2>

      <div className="space-y-2">
        {leads.map((lead) => (
          <DraggableLead key={lead.id} lead={lead} />
        ))}

        {leads.length === 0 && (
          <p className="text-gray-400 text-sm">No leads</p>
        )}
      </div>
    </div>
  );
}
