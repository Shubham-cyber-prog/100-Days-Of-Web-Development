"use client";
import React from "react";
import Chart from "react-apexcharts";
import { useQuery } from "@apollo/client";
import { GET_ALL_ANALYTICS } from "@/app/gql/Dashboard";

interface RevenueOverTimeChartProps {
  startDate: string;
  endDate: string;
}

interface MonthlyTrend {
  labels: string[];
  revenue: number[];
}

interface RevenueAnalytics {
  totalRevenue: number;
  monthlyTrends: MonthlyTrend;
}

interface GetAllAnalyticsData {
  revenueAnalytics: RevenueAnalytics;
}

interface GetAllAnalyticsVars {
  params: {
    startDate: string;
    endDate: string;
  };
}

const RevenueOverTimeChart: React.FC<RevenueOverTimeChartProps> = ({
  startDate,
  endDate,
}) => {
  const { data, loading, error } = useQuery<
    GetAllAnalyticsData,
    GetAllAnalyticsVars
  >(GET_ALL_ANALYTICS, {
    variables: {
      params: { startDate, endDate },
    },
  });

  if (loading) {
    return <div>Loading chart...</div>;
  }

  if (error || !data?.revenueAnalytics) {
    return (
      <div>Error loading data: {error?.message || "No data available"}</div>
    );
  }

  const { totalRevenue, monthlyTrends } = data.revenueAnalytics;
  const { labels, revenue } = monthlyTrends;

  const monthlyTarget = 10000;
  const targetData = labels.map(() => monthlyTarget);
  const totalTarget = targetData.reduce((sum, value) => sum + value, 0);

  const total = totalRevenue + totalTarget;
  const revenuePercentage = total ? (totalRevenue / total) * 100 : 0;
  const targetPercentage = total ? (totalTarget / total) * 100 : 0;

  const series = [
    {
      name: "Total Revenue",
      data: revenue,
      color: "#6366F1",
    },
    {
      name: "Total Target",
      data: targetData,
      color: "#FBBF24",
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      height: 350,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      categories: labels.map((label) => {
        const date = new Date(label);
        return `${date.toLocaleString("default", {
          month: "short",
        })} ${date.getFullYear()}`;
      }),
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value: number) => {
          if (value >= 1000) {
            return `$${(value / 1000).toFixed(0)}K`;
          }
          return `$${value.toFixed(0)}`;
        },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value: number) =>
          `$${value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      },
    },
    markers: {
      size: 4,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      labels: {
        colors: ["#00C4B4", "#F59E0B"],
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Revenue Over Time
        </h2>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <span className="w-4 h-4 rounded-full bg-indigo-500 mr-2"></span>
            <span className="text-sm font-medium text-gray-700">
              Total Revenue: $
              {totalRevenue.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}{" "}
              {revenuePercentage.toFixed(0)}%
            </span>
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 rounded-full bg-[#FBBF24] mr-2"></span>
            <span className="text-sm font-medium text-gray-700">
              Total Target: $
              {totalTarget.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}{" "}
              {targetPercentage.toFixed(0)}%
            </span>
          </div>
        </div>
      </div>
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default RevenueOverTimeChart;
