"use client";

import { useState } from "react";

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

export default function CreateLeadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validation
    if (!name.trim()) {
      setError("Lead name is required");
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await fetchWithErrorHandling("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, source }),
      });

      if (result.success || result.id) {
        setSuccess("✓ Lead created successfully!");
        setName("");
        setEmail("");
        setPhone("");
        setSource("");

        // Optional: Reload page after success
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        throw new Error(result.message || "Failed to create lead");
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      console.error("Error creating lead:", error);

      let errorMsg = "Failed to create lead";

      if (error.message.includes("Failed to fetch")) {
        errorMsg = "Network error. Please check your connection.";
      } else if (error.name === "AbortError") {
        errorMsg = "Request timeout. Please try again.";
      } else if (error.message.includes("HTTP")) {
        errorMsg = `Server error: ${error.message}`;
      } else if (error.message.includes("validation")) {
        errorMsg = error.message;
      }

      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Lead</h2>

      {/* Success Message */}
      {success && (
        <div
          style={{
            padding: "12px 16px",
            marginBottom: "16px",
            backgroundColor: "#efe",
            border: "1px solid #8f8",
            borderRadius: "4px",
            color: "#080",
            fontSize: "14px",
          }}
        >
          {success}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div
          style={{
            padding: "12px 16px",
            marginBottom: "16px",
            backgroundColor: "#fee",
            border: "1px solid #f88",
            borderRadius: "4px",
            color: "#c33",
            fontSize: "14px",
          }}
        >
          ⚠️ {error}
        </div>
      )}

      <input
        placeholder="Name *"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        disabled={loading}
      />
      <br />

      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <br />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        disabled={loading}
      />
      <br />

      <input
        placeholder="Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        disabled={loading}
      />
      <br />

      <button disabled={loading}>
        {loading ? "Creating..." : "Create Lead"}
      </button>
    </form>
  );
}
