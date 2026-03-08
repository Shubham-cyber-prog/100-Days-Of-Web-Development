import { useState } from "react";
import axios from "axios";

function AddRoomModal({ setShowRoomModal, refreshRooms }) {
  const [name, setName] = useState("");
  const token = localStorage.getItem("token");

  const addRoom = async () => {
    if (!name) return alert("Room name required");

    await axios.post(
      "http://localhost:5000/api/rooms",
      { name },
      { headers: { Authorization: token } }
    );

    refreshRooms();
    setShowRoomModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-slate-900 p-8 rounded-3xl w-96 border border-white/10">
        <h2 className="text-2xl mb-6 font-semibold">Create Room</h2>

        <input
          placeholder="Room Name"
          className="w-full p-3 mb-6 rounded-xl bg-white/10 text-white"
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex justify-between">
          <button
            onClick={addRoom}
            className="bg-green-600 px-5 py-2 rounded-xl"
          >
            Add
          </button>

          <button
            onClick={() => setShowRoomModal(false)}
            className="bg-red-600 px-5 py-2 rounded-xl"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddRoomModal;