import { useState } from "react";
import ChartModal from "./ChartModal";

function CoinCard({ coin, addToWatchlist }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative group bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-3xl shadow-2xl transition duration-300 hover:scale-105 hover:border-cyan-400/40">

        {/* Glow Overlay (Fixed) */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition duration-500 blur-xl pointer-events-none"></div>

        <div className="relative flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={coin.image} alt={coin.name} className="w-10 h-10" />
            <div>
              <h2 className="font-semibold text-lg">{coin.name}</h2>
              <p className="text-sm text-gray-400 uppercase">{coin.symbol}</p>
            </div>
          </div>

          <button
            onClick={() => addToWatchlist(coin)}
            className="text-yellow-400 text-xl hover:scale-125 transition"
          >
            ★
          </button>
        </div>

        <p className="mt-6 text-2xl font-bold">
          ${coin.current_price.toLocaleString()}
        </p>

        <p
          className={`mt-2 font-medium ${
            coin.price_change_percentage_24h > 0
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {coin.price_change_percentage_24h?.toFixed(2)}%
        </p>

        <button
          onClick={() => setOpen(true)}
          className="relative mt-6 w-full py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-purple-600 hover:to-cyan-500 transition duration-300"
        >
          View Analytics
        </button>
      </div>

      {open && <ChartModal coin={coin} close={() => setOpen(false)} />}
    </>
  );
}

export default CoinCard;