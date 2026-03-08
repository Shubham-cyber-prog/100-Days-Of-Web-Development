import { LogsViewer } from '../components/LogsViewer';

export default function Logs() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="bg-gray-900 p-8 border-b border-gray-800">
        <h2 className="text-2xl font-semibold text-white mb-2">System Logs</h2>
        <p className="text-gray-400">
          Real-time logging and monitoring across all services
        </p>
      </div>
      <div className="flex-1">
        <LogsViewer />
      </div>
    </div>
  );
}
