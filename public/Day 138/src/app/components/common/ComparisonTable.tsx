import { CheckCircle, XCircle, Minus } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

interface ComparisonItem {
  feature: string;
  values: (string | number | boolean)[];
}

interface ComparisonTableProps {
  title: string;
  headers: string[];
  data: ComparisonItem[];
}

export function ComparisonTable({ title, headers, data }: ComparisonTableProps) {
  const renderCell = (value: string | number | boolean) => {
    if (typeof value === "boolean") {
      return value ? (
        <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
      ) : (
        <XCircle className="w-5 h-5 text-red-600 mx-auto" />
      );
    }
    if (value === "-" || value === "N/A") {
      return <Minus className="w-5 h-5 text-gray-400 mx-auto" />;
    }
    return <span className="text-sm text-gray-900">{value}</span>;
  };

  return (
    <Card className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Feature
              </th>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-4 text-center text-sm font-semibold text-gray-900"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {row.feature}
                </td>
                {row.values.map((value, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 text-center">
                    {renderCell(value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
