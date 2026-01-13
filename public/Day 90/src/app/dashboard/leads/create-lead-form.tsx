"use client";

import { useState } from "react";

export default function CreateLeadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, source }),
    });

    setName("");
    setEmail("");
    setPhone("");
    setSource("");
    setLoading(false);

    // quick refresh
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Lead</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <br />

      <input
        placeholder="Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <br />

      <button disabled={loading}>
        {loading ? "Creating..." : "Create Lead"}
      </button>
    </form>
  );
}
