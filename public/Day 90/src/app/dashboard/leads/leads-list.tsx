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

/**
 * Generic fetch wrapper with comprehensive error handling
 */
async function fetchWithErrorHandling(
  url: string,
  options?: RequestInit,
  retries: number = 3
): Promise<any> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Check response status
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText || response.statusText}`);
      }

      // Validate JSON
      const contentType = response.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        throw new Error("Invalid response format: expected JSON");
      }

      return await response.json();
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      lastError = error;

      const isRetryable =
        error instanceof TypeError ||
        error.name === "AbortError" ||
        error.message.includes("HTTP");

      if (attempt < retries && isRetryable) {
        console.warn(
          `Retry attempt ${attempt}/${retries} for ${url}:`,
          error.message
        );
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
        continue;
      }

      throw error;
    }
  }

  throw lastError || new Error("Unknown error");
}

export default function LeadsList() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [retryCount, setRetryCount] = useState(0);

  const loadLeads = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchWithErrorHandling("/api/leads");

      if (!Array.isArray(data)) {
        throw new Error("Invalid response: expected array of leads");
      }

      setLeads(data);
      setRetryCount(0);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      console.error("Failed to load leads:", error);

      let errorMsg = "Failed to load leads";

      if (error.message.includes("Failed to fetch")) {
        errorMsg = "Network error. Please check your connection.";
      } else if (error.name === "AbortError") {
        errorMsg = "Request timeout. The server may be unresponsive.";
      } else if (error.message.includes("HTTP")) {
        errorMsg = `Server error: ${error.message}`;
      }

      setError(errorMsg);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    // Optimistic UI update
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );

    try {
      const result = await fetchWithErrorHandling("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId,
          status: newStatus,
        }),
      });

      if (!result.success) {
        throw new Error(result.message || "Failed to update lead status");
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      console.error("Error updating lead status:", error);

      // Revert optimistic update
      setLeads((prev) =>
        prev.map((l) => {
          if (l.id === leadId) {
            return {
              ...l,
              status: l.status, // Revert to previous status
            };
          }
          return l;
        })
      );

      // Show error message
      let errorMsg = "Failed to update lead status";

      if (error.message.includes("Failed to fetch")) {
        errorMsg = "Network error. Status update cancelled.";
      } else if (error.name === "AbortError") {
        errorMsg = "Request timeout. Please try again.";
      } else if (error.message.includes("HTTP")) {
        errorMsg = `Server error: ${error.message}`;
      }

      alert(`⚠️ ${errorMsg}`);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>Loading leads...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          backgroundColor: "#fee",
          borderRadius: "8px",
        }}
      >
        <p style={{ color: "#c33", marginBottom: "10px" }}>⚠️ {error}</p>
        <button
          onClick={() => {
            loadLeads();
            setRetryCount((c) => c + 1);
          }}
          style={{
            padding: "8px 16px",
            backgroundColor: "#333",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Retry ({retryCount})
        </button>
      </div>
    );
  }

  if (!leads.length) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>No leads yet.</p>
      </div>
    );
  }

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
                value={lead.status}
                onValueChange={(value) => handleStatusChange(lead.id, value)}
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
