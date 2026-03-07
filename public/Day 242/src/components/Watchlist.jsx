function Watchlist({ watchlist }) {
  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-3xl shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
        Watchlist
      </h2>

      {watchlist.length === 0 ? (
        <p className="text-gray-400">No favorites added yet</p>
      ) : (
        watchlist.map((coin) => (
          <div
            key={coin.id}
            className="flex justify-between items-center mb-4 p-3 bg-black/30 rounded-xl hover:bg-black/50 transition"
          >
            <p>{coin.name}</p>
            <p className="text-cyan-400 font-semibold">
              ${coin.current_price.toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Watchlist;