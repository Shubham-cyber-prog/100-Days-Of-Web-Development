import formatAnalyticsData from "./formatAnalyticsData";
import csv from "csv-stringify/sync";

export default function generateCSV(data: any): string {
  const formattedData = formatAnalyticsData(data);
  return csv.stringify(formattedData, {
    header: true,
    quoted: true,
    quoted_empty: true,
  });
}
