import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  phone: String,
});

export default mongoose.model("Patient", patientSchema);