import React, { useState } from "react";
import "./CheckStatusForm.css";

const CheckStatusForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Generic fetch wrapper with error handling and retry logic
   */
  const fetchWithErrorHandling = async (url, options = {}, retries = 3) => {
    let lastError;

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

        const res = await fetch(url, {
          ...options,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        // Check response status
        if (!res.ok) {
          const errorData = await res.text();
          throw new Error(`HTTP ${res.status}: ${errorData || res.statusText}`);
        }

        // Verify content type
        const contentType = res.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
          throw new Error('Invalid response format: expected JSON');
        }

        return await res.json();
      } catch (err) {
        lastError = err;
        
        // Determine if error is retryable
        const isRetryable = err instanceof TypeError || 
                           err.name === 'AbortError' ||
                           (err.message && err.message.includes('HTTP'));

        if (attempt < retries && isRetryable) {
          console.warn(`Retry attempt ${attempt}/${retries} for ${url}:`, err.message);
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt)); // Exponential backoff
          continue;
        }

        throw err;
      }
    }

    throw lastError;
  };

  const handleCheck = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!age.trim() || isNaN(age)) {
      setError("Please enter a valid age");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await fetchWithErrorHandling(
        "http://localhost:5000/api/appointments/status",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, age }),
        }
      );

      if (data.appointment) {
        setAppointment(data.appointment);
        setError("");
      } else {
        setError(data.message || "No appointment found");
        setAppointment(null);
      }
    } catch (err) {
      console.error("Error checking status:", err);
      
      let errorMsg = "Unable to check appointment status";
      
      if (err.message.includes("Failed to fetch")) {
        errorMsg = "Network error. Please check your connection and ensure the server is running.";
      } else if (err.name === "AbortError") {
        errorMsg = "Request timeout. The server may be unresponsive.";
      } else if (err.message.includes("HTTP")) {
        errorMsg = `Server error: ${err.message}`;
      }
      
      setError(errorMsg);
      setAppointment(null);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!appointment) {
      setError("No appointment selected");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await fetchWithErrorHandling(
        `http://localhost:5000/api/appointments/update/${appointment._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(appointment),
        }
      );

      setAppointment(data);
      setError("");
      // Show success message
      alert("✓ Appointment updated successfully!");
    } catch (err) {
      console.error("Error updating appointment:", err);
      
      let errorMsg = "Failed to update appointment";
      
      if (err.message.includes("Failed to fetch")) {
        errorMsg = "Network error. Cannot reach the server.";
      } else if (err.name === "AbortError") {
        errorMsg = "Request timeout. Please try again.";
      } else if (err.message.includes("HTTP")) {
        errorMsg = `Server error: ${err.message}`;
      }
      
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="status-container">
      <div className="status-card">
        <h2>🔍 Check Appointment Status</h2>
        
        {/* Error Display */}
        {error && (
          <div style={{
            padding: "12px 16px",
            marginBottom: "16px",
            backgroundColor: "#fee",
            border: "1px solid #f88",
            borderRadius: "4px",
            color: "#c33",
            fontSize: "14px"
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleCheck} className="status-form">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            disabled={loading}
          />
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
            type="number"
            required
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Checking..." : "Check Status"}
          </button>
        </form>

        {appointment && (
          <div className="result-card">
            <h3>
              Status: <span className={`status-label ${appointment.status.toLowerCase()}`}>
                {appointment.status}
              </span>
            </h3>
            <form onSubmit={handleUpdate} className="edit-form">
              <label>
                Problem Description:
                <textarea
                  value={appointment.description}
                  onChange={(e) => setAppointment({ ...appointment, description: e.target.value })}
                  disabled={loading}
                />
              </label>
              <label>
                Slot:
                <input
                  type="text"
                  value={appointment.slot}
                  onChange={(e) => setAppointment({ ...appointment, slot: e.target.value })}
                  disabled={loading}
                />
              </label>
              <button type="submit" className="update-btn" disabled={loading}>
                {loading ? "Updating..." : "Update Appointment"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckStatusForm;