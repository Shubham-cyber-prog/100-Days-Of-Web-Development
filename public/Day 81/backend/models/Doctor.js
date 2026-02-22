import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  email: String,
});

export default mongoose.model("Doctor", doctorSchema);