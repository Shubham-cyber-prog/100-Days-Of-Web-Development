import Appointment from "../models/Appointment.js";

// Create new appointment
export const createAppointment = async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json({ message: "Appointment created", appointment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all appointments (Doctor Dashboard)
export const getAppointments = async (req, res) => {
  const appointments = await Appointment.find();
  res.json(appointments);
};

// Check status by name + age
export const checkStatus = async (req, res) => {
  const { name, age } = req.body;
  const appointment = await Appointment.findOne({ name, age });
  if (!appointment) return res.status(404).json({ message: "No appointment found" });
  res.json({ status: appointment.status, appointment });
};

// Update appointment (patient edit)
export const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const updated = await Appointment.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};