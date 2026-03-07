import { useState } from "react";
import axios from "axios";

function AddDeviceModal({ setShowModal, refresh }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [type, setType] = useState("Light");

  const deviceTypes = [
    "Light", "Smart Bulb", "LED Strip",
    "Fan", "AC", "Heater", "Thermostat",
    "Security Camera", "Door Lock",
    "Smart Plug", "Energy Meter",
    "Smart TV", "Speaker",
    "Refrigerator", "Microwave",
    "Garage Door", "Custom Device"
  ];

  const addDevice = async () => {
    if (!name || !room) {
      alert("Please fill all fields");
      return;
    }

    await axios.post(
      "http://localhost:5000/api/devices",
      { name, room, type },
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );

    refresh();
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-slate-900 p-8 rounded-3xl w-96 border border-white/10">
        <h2 className="text-2xl mb-6 font-semibold">Add Device</h2>

        <input
          placeholder="Device Name"
          className="w-full p-3 mb-4 rounded-xl bg-white/10 text-white"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Room Name (e.g. Living Room)"
          className="w-full p-3 mb-4 rounded-xl bg-white/10 text-white"
          onChange={(e) => setRoom(e.target.value)}
        />

        <select
          className="w-full p-3 mb-6 rounded-xl bg-white/10 text-white"
          onChange={(e) => setType(e.target.value)}
        >
          {deviceTypes.map((deviceType, index) => (
            <option key={index}>{deviceType}</option>
          ))}
        </select>

        <div className="flex justify-between">
          <button
            onClick={addDevice}
            className="bg-green-600 px-5 py-2 rounded-xl"
          >
            Add
          </button>

          <button
            onClick={() => setShowModal(false)}
            className="bg-red-600 px-5 py-2 rounded-xl"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddDeviceModal;