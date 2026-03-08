"use client";
import React from "react";
import Chart from "react-apexcharts";

type Props = {
  title: string;
  data: number[];
  labels: string[];
  colorScheme?: string[];
};

const DonutChartComponent: React.FC<Props> = ({
  title,
  data,
  labels,
  colorScheme = ["#3b82f6", "#10b981", "#ef4444", "#f59e0b"],
}) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      id: "donut-chart",

      zoom: { enabled: false },
    },

    colors: colorScheme,
    dataLabels: { enabled: true },
    stroke: {
      width: 0,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "60%",
        },
      },
    },
    legend: {
      position: "bottom",
      labels: {
        colors: "#9ca3af",
      },
    },
    tooltip: {
      theme: "dark",
    },
    labels: labels,
  };

  const series = data;

  return (
    <div className="p-4 rounded-2xl shadow-sm w-full bg-white">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-black text-lg font-semibold">{title}</h2>
      </div>
      <Chart options={options} series={series} type="donut" height={250} />
    </div>
  );
};

export default DonutChartComponent;
