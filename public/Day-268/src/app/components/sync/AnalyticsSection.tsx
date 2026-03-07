import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const syncSpeedData = [
  { time: "10:00", upload: 2.4, download: 3.2 },
  { time: "10:05", upload: 3.1, download: 2.8 },
  { time: "10:10", upload: 2.8, download: 4.1 },
  { time: "10:15", upload: 4.2, download: 3.5 },
  { time: "10:20", upload: 3.6, download: 3.8 },
  { time: "10:25", upload: 5.1, download: 4.2 },
];

export function AnalyticsSection() {
  return (
    <Card>
      <CardHeader className="border-b border-slate-200">
        <CardTitle>Sync Analytics</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-2 text-xs text-slate-600">Upload/Download Speed (MB/s)</div>
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={syncSpeedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="time" tick={{ fontSize: 10 }} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '12px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="upload" 
              stroke="#3b82f6" 
              strokeWidth={2}
              name="Upload"
            />
            <Line 
              type="monotone" 
              dataKey="download" 
              stroke="#10b981" 
              strokeWidth={2}
              name="Download"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
