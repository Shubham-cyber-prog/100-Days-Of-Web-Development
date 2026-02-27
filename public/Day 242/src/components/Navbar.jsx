function Navbar({ search, setSearch }) {
  return (
    <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10 p-4 flex justify-between items-center shadow-lg">
      <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        CryptoPulse
      </h1>

      <input
        type="text"
        placeholder="Search cryptocurrency..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-4 py-2 rounded-xl bg-black/40 border border-cyan-400/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 outline-none transition w-64"
      />
    </div>
  );
}

export default Navbar;