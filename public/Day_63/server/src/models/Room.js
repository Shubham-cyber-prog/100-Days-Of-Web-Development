const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema(
  {
    code: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    participants: [{ socketId: String, displayName: String }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Room', RoomSchema);