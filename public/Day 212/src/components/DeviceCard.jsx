import { useState } from "react";
import axios from "axios";

function DeviceCard({ device, refresh }) {
  // 🔥 Frontend-only toggle state
  const [isOn, setIsOn] = useState(device.status || false);

  const toggleDevice = () => {
    setIsOn((prev) => !prev);
  };

  // 🗑 Backend delete logic (kept)
  const deleteDevice = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/devices/${device._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      refresh && refresh();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-xl hover:scale-105 transition duration-300">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white">
          {device.name}
        </h3>

        {/* Status Dot */}
        <div
          className={`w-3 h-3 rounded-full transition ${
            isOn
              ? "bg-green-500 shadow-lg shadow-green-500/50"
              : "bg-red-500 shadow-lg shadow-red-500/50"
          }`}
        />
      </div>

      {/* Device Info */}
      <p className="text-sm text-gray-400 mb-6">
        {device.room} • {device.type}
      </p>

      {/* IoT Toggle Switch (Frontend Only) */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium">
          {isOn ? "Device ON" : "Device OFF"}
        </span>

        <button
          onClick={toggleDevice}
          className={`relative w-14 h-7 rounded-full transition duration-300 ${
            isOn ? "bg-green-600" : "bg-gray-600"
          }`}
        >
          <div
            className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
              isOn ? "translate-x-7" : ""
            }`}
          />
        </button>
      </div>

      {/* Delete Button */}
      <button
        onClick={deleteDevice}
        className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-xl text-sm transition"
      >
        Remove Device
      </button>
    </div>
  );
}

export default DeviceCard;