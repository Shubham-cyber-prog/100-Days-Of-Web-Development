interface CodeViewerProps {
  code: string;
  filename: string;
}

export default function CodeViewer({ code, filename }: CodeViewerProps) {
  const lines = code.split('\n');

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-50 border-b px-4 py-2 flex items-center justify-between">
        <span className="text-sm font-medium">{filename}</span>
        <span className="text-xs text-gray-500">{lines.length} lines</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody>
            {lines.map((line, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-0.5 text-right text-xs text-gray-400 select-none border-r w-12 bg-gray-50">
                  {index + 1}
                </td>
                <td className="px-4 py-0.5">
                  <pre className="text-sm font-mono">
                    <code>{line || ' '}</code>
                  </pre>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
