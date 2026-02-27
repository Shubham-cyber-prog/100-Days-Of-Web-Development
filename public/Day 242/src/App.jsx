import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import CoinCard from "./components/CoinCard";
import Watchlist from "./components/Watchlist";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    fetchCoins();
    const interval = setInterval(fetchCoins, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchCoins = async () => {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 50,
          page: 1,
          sparkline: false,
        },
      }
    );
    setCoins(res.data);
  };

  const addToWatchlist = (coin) => {
    if (!watchlist.find((c) => c.id === coin.id)) {
      setWatchlist([...watchlist, coin]);
    }
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <Navbar search={search} setSearch={setSearch} />
      <div className="p-6 grid md:grid-cols-4 gap-6">
        <div className="md:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCoins.map((coin) => (
            <CoinCard
              key={coin.id}
              coin={coin}
              addToWatchlist={addToWatchlist}
            />
          ))}
        </div>
        <Watchlist watchlist={watchlist} />
      </div>
    </div>
  );
}

export default App;