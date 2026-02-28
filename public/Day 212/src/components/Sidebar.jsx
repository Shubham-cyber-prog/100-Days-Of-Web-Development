function Sidebar({ rooms, selectedRoom, setSelectedRoom }) {
  return (
    <div className="w-72 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6">
      <h2 className="text-2xl font-bold mb-6">Rooms</h2>

      {rooms.map((room, index) => (
        <div
          key={index}
          onClick={() => setSelectedRoom(room)}
          className={`p-3 rounded-xl cursor-pointer mb-2 transition ${
            selectedRoom === room
              ? "bg-green-600"
              : "hover:bg-white/10"
          }`}
        >
          {room}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;