"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export default function DraggableLead({ lead }: { lead: any }) {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: lead.id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="bg-white p-2 rounded border text-sm cursor-grab active:cursor-grabbing"
    >
      <p className="font-medium">{lead.name}</p>
      <p className="text-gray-500">{lead.email}</p>
    </div>
  );
}

