import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DeviceCard from "../components/DeviceCard";
import AddDeviceModal from "../components/AddDeviceModal";

function Dashboard({ setToken }) {
  const [devices, setDevices] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    const res = await axios.get("http://localhost:5000/api/devices", {
      headers: { Authorization: token },
    });
    setDevices(res.data);
  };

  // 🔥 Dynamically generate rooms from devices
  const rooms = ["All", ...new Set(devices.map((d) => d.room))];

  const filteredDevices =
    selectedRoom === "All"
      ? devices
      : devices.filter((d) => d.room === selectedRoom);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      <Sidebar
        rooms={rooms}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
      />

      <div className="flex-1 p-8">
        <Navbar setToken={setToken} setShowModal={setShowModal} />

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {filteredDevices.map((device) => (
            <DeviceCard
              key={device._id}
              device={device}
              refresh={fetchDevices}
            />
          ))}
        </div>
      </div>

      {showModal && (
        <AddDeviceModal
          setShowModal={setShowModal}
          refresh={fetchDevices}
        />
      )}
    </div>
  );
}

export default Dashboard;