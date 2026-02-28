import { ServerData, ServerCard } from './ServerCard';

interface ServerStatusPanelProps {
  servers: ServerData[];
  onRemoveServer: (id: string) => void;
}

export function ServerStatusPanel({ servers, onRemoveServer }: ServerStatusPanelProps) {
  if (servers.length === 0) {
    return (
      <div className="bg-gray-950 rounded-lg border border-gray-800 p-8 text-center">
        <div className="text-gray-500 text-sm">No servers configured</div>
        <div className="text-gray-600 text-xs mt-2">Click "Add Server" to get started</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {servers.map((server) => (
        <ServerCard key={server.id} server={server} onRemove={onRemoveServer} />
      ))}
    </div>
  );
}
