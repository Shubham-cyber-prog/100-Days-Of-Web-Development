"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Lead = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  status: string;
};

export default function LeadsList() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data) => {
        setLeads(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading leads...</p>;
  if (!leads.length) return <p>No leads yet.</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.map((lead) => (
          <TableRow key={lead.id}>
            <TableCell>{lead.name}</TableCell>
            <TableCell>{lead.email ?? "-"}</TableCell>
            <TableCell>{lead.phone ?? "-"}</TableCell>
            <TableCell>
              <Select
                    defaultValue={lead.status}
                    onValueChange={async (value) => {
                        // Optimistic UI
                        setLeads((prev) =>
                        prev.map((l) =>
                            l.id === lead.id ? { ...l, status: value } : l
                        )
                        );

                        await fetch("/api/leads", {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            leadId: lead.id,
                            status: value,
                        }),
                        });
                    }}
                    >

                <SelectTrigger className="w-[130px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NEW">NEW</SelectItem>
                  <SelectItem value="CONTACTED">CONTACTED</SelectItem>
                  <SelectItem value="QUALIFIED">QUALIFIED</SelectItem>
                  <SelectItem value="CONVERTED">CONVERTED</SelectItem>
                  <SelectItem value="LOST">LOST</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
