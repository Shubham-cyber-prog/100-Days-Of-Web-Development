import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

function ChartModal({ coin, close }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchChart();
  }, []);

  const fetchChart = async () => {
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart`,
        { params: { vs_currency: "usd", days: 7 } }
      );
      setChartData(res.data.prices);
    } catch (error) {
      console.error("Error fetching chart:", error);
    }
  };

  const data = {
    labels: chartData.map((p) =>
      new Date(p[0]).toLocaleDateString()
    ),
    datasets: [
      {
        label: `${coin.name} Price`,
        data: chartData.map((p) => p[1]),
        borderColor: "#06b6d4",
        backgroundColor: "rgba(6,182,212,0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50">
      <div className="bg-gray-900 p-8 rounded-3xl w-11/12 md:w-2/3 shadow-2xl">

        <h2 className="text-2xl font-bold mb-6 text-cyan-400">
          {coin.name} - 7 Day Trend
        </h2>

        {chartData.length > 0 ? (
          <Line data={data} />
        ) : (
          <p className="text-gray-400">Loading chart...</p>
        )}

        <button
          onClick={close}
          className="mt-6 px-6 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ChartModal;