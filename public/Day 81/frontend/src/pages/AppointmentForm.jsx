import React, { useState } from "react";
import "./AppointmentForm.css";

const AppointmentForm = () => {

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    description: "",
    location: "",
    consultedBefore: "no",
    prescription: null,
    slot: "",
  });

  const slots = [
    "2026-01-10 10:00 AM",
    "2026-01-10 11:00 AM",
    "2026-01-10 02:00 PM",
    "2026-01-11 09:00 AM",
    "2026-01-11 01:00 PM",
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:5000/api/appointments/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    alert("Appointment submitted successfully!");
    console.log(data);
  } catch (err) {
    console.error("Error submitting appointment:", err);
  }
};
  return (
    <>  
     
    <div className="appointment-form">
      <h2>📋 Book an Appointment</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <label>
          Patient Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        {/* Age */}
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </label>

        {/* Problem Description */}
        <label>
          Problem Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>

        {/* Location */}
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>

        {/* Consulted Before */}
        <label>
          Have you consulted this doctor or another doctor before?
          <select
            name="consultedBefore"
            value={formData.consultedBefore}
            onChange={handleChange}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </label>

        {/* Prescription Upload (conditional) */}
        {formData.consultedBefore === "yes" && (
          <label>
            Upload Previous Prescription:
            <input
              type="file"
              name="prescription"
              onChange={handleChange}
            />
          </label>
        )}

        {/* Appointment Slot */}
        <label>
          Choose Appointment Slot:
          <select
            name="slot"
            value={formData.slot}
            onChange={handleChange}
            required
          >
            <option value="">-- Select a slot --</option>
            {slots.map((s, idx) => (
              <option key={idx} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        {/* Submit */}
        <button type="submit">Book Appointment ✅</button>
      </form>
    </div>
    </>

  );
};

export default AppointmentForm;