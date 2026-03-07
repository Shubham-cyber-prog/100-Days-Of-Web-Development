import { LineChart, Line, ResponsiveContainer } from "recharts";

interface ResourceGraphProps {
  data: number[];
  color?: string;
}

export function ResourceGraph({ data, color = "#3b82f6" }: ResourceGraphProps) {
  const chartData = data.map((value, index) => ({ value, index }));

  return (
    <ResponsiveContainer width="100%" height={60}>
      <LineChart data={chartData}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
