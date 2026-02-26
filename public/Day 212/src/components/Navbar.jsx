function Navbar({ setToken, setShowModal }) {
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Smart Home Dashboard</h1>

      <div className="flex gap-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-xl"
        >
          + Add Device
        </button>

        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;