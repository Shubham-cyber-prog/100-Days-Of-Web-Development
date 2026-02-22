import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  consultedBefore: { type: Boolean, default: false },
  prescriptionFile: { type: String }, // store file path or cloud URL
  slot: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Okay", "Postponed"], default: "Pending" }
}, { timestamps: true });

export default mongoose.model("Appointment", appointmentSchema);