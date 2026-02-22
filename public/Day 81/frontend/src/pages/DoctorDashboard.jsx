import React, { useState, useEffect } from "react";
import "./DoctorDashboard.css";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState({});
  // inside DoctorDashboard.jsx
const uniquePatients = Array.from(
  new Map(appointments.map(a => [a.name, { name: a.name, age: a.age }])).values()
);
  // Fetch appointments from backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/appointments/all");
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };
    fetchAppointments();
  }, []);

  // Change appointment status
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const updated = await res.json();
      setAppointments(
        appointments.map((a) => (a._id === updated._id ? updated : a))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // Postpone appointment
  const handlePostpone = async (id, newDate) => {
    if (!newDate) return;
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: newDate, status: "Postponed" }),
      });
      const updated = await res.json();
      setAppointments(
        appointments.map((a) => (a._id === updated._id ? updated : a))
      );
    } catch (err) {
      console.error("Error postponing appointment:", err);
    }
  };

  // Prescription upload (local state for now)
  const handlePrescriptionUpload = (appointmentId, e) => {
    const file = e.target.files[0];
    if (file) {
      setPrescriptions({
        ...prescriptions,
        [appointmentId]: file.name,
      });
    }
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">🩺 Doctor Dashboard</h1>
      <section className="card patientList">
  <h2>👨‍👩‍👧 Patient List</h2>
  <ul>
    {uniquePatients.map((p, idx) => (
      <li key={idx} className="list-item">
        <span className="patient-name">{p.name}</span> (Age: {p.age})
      </li>
    ))}
  </ul>
</section>

      {/* Appointment Management */}
      <section className="card">
        <h2>📅 Appointment Management</h2>
        <ul>
          {appointments.map((a) => (
            <li key={a._id} className="appointment-item">
              <div>
                <span className="appointment-patient">{a.name}</span> — {a.date} at {a.time}
                <span className={`status ${a.status.toLowerCase()}`}> [{a.status}]</span>
              </div>
              <div className="actions">
                <button onClick={() => handleStatusChange(a._id, "Okay")}>Okay</button>
                <input
                  type="date"
                  onChange={(e) => handlePostpone(a._id, e.target.value)}
                  className="date-input"
                />
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Prescription Upload */}
      <section className="card">
        <h2>💊 Prescription Upload</h2>
        <ul>
          {appointments.map((a) => (
            <li key={a._id} className="prescription-item">
              <span className="patient-name">{a.name}</span>
              <input
                type="file"
                onChange={(e) => handlePrescriptionUpload(a._id, e)}
              />
              {prescriptions[a._id] && (
                <span className="uploaded-file">Uploaded: {prescriptions[a._id]}</span>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default DoctorDashboard;