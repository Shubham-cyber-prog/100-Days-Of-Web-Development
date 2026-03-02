import { HardDrive, Database, FolderOpen } from "lucide-react";
import { useVMContext } from "../context/VMContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export default function Storage() {
  const { vms } = useVMContext();

  const totalStorage = 1000; // GB
  const usedStorage = vms.reduce((sum, vm) => sum + vm.storageUsage, 0);
  const freeStorage = totalStorage - usedStorage;

  // Prepare pie chart data
  const pieData = [
    ...vms.map((vm, index) => ({
      name: vm.name,
      value: vm.storageUsage,
      color: `hsl(${(index * 360) / vms.length}, 70%, 60%)`,
    })),
    { name: "Free Space", value: freeStorage, color: "#333" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl text-foreground mb-1">Storage Management</h2>
        <p className="text-sm text-muted-foreground">Monitor storage allocation and usage</p>
      </div>

      {/* Storage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <HardDrive className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <div className="text-2xl text-foreground">{totalStorage} GB</div>
              <div className="text-sm text-muted-foreground">Total Storage</div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Database className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <div className="text-2xl text-foreground">{usedStorage.toFixed(0)} GB</div>
              <div className="text-sm text-muted-foreground">Used Storage</div>
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="h-2 rounded-full bg-green-500 transition-all"
              style={{ width: `${(usedStorage / totalStorage) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <FolderOpen className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <div className="text-2xl text-foreground">{freeStorage.toFixed(0)} GB</div>
              <div className="text-sm text-muted-foreground">Free Storage</div>
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="h-2 rounded-full bg-purple-500 transition-all"
              style={{ width: `${(freeStorage / totalStorage) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Storage Distribution Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg text-foreground mb-6">Storage Distribution</h3>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #333",
                  borderRadius: "4px",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* VM Storage Details */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-lg text-foreground">Storage by Virtual Machine</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-6 py-3 text-sm text-muted-foreground">VM Name</th>
                <th className="text-left px-6 py-3 text-sm text-muted-foreground">OS</th>
                <th className="text-left px-6 py-3 text-sm text-muted-foreground">Storage Used</th>
                <th className="text-left px-6 py-3 text-sm text-muted-foreground">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {vms.map((vm) => (
                <tr key={vm.id} className="border-b border-border hover:bg-accent/50">
                  <td className="px-6 py-4 text-sm text-foreground">{vm.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{vm.os}</td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {vm.storageUsage.toFixed(1)} GB
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-muted rounded-full h-2 max-w-xs">
                        <div
                          className="h-2 rounded-full bg-green-500"
                          style={{ width: `${(vm.storageUsage / totalStorage) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground min-w-[4rem]">
                        {((vm.storageUsage / totalStorage) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
