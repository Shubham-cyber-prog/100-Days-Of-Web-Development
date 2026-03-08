import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
  name: String,
  room: String,
  type: String,
  status: { type: Boolean, default: false },
  temperature: { type: Number, default: 22 },
  powerUsage: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Device", deviceSchema);