import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  deviceId: mongoose.Schema.Types.ObjectId,
  action: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("ActivityLog", logSchema);