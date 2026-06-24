"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Doughnut, Scatter } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

type ChartType = "bar" | "line" | "doughnut" | "scatter";

interface ChartProps {
  type: ChartType;
  data: {
    labels?: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string | string[];
    }[];
  };
  caption?: string;
}

const defaultColors = {
  primary: "#3A7D5C",
  secondary: "#5B9B7A",
  muted: "#8A8A92",
  teal: "#4A8B8B",
  slate: "#6A7A8A",
};

export default function Chart({ type, data, caption }: ChartProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          font: { family: "Inter, system-ui, sans-serif" },
          color: "#4A4A50",
        },
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(26,26,30,0.06)" },
        ticks: { font: { family: "Inter, system-ui, sans-serif" } },
      },
      y: {
        grid: { color: "rgba(26,26,30,0.06)" },
        ticks: { font: { family: "Inter, system-ui, sans-serif" } },
        beginAtZero: true,
      },
    },
  };

  // Apply default colors if not specified
  const styledData = {
    ...data,
    datasets: data.datasets.map((ds, i) => ({
      ...ds,
      backgroundColor: ds.backgroundColor ?? (
        i === 0 ? defaultColors.primary :
        i === 1 ? defaultColors.teal :
        defaultColors.muted
      ),
      borderColor: ds.borderColor ?? (
        i === 0 ? defaultColors.primary :
        i === 1 ? defaultColors.teal :
        defaultColors.muted
      ),
    })),
  };

  const renderChart = () => {
    switch (type) {
      case "bar":
        return <Bar data={styledData} options={options} />;
      case "line":
        return <Line data={styledData} options={options} />;
      case "doughnut":
        return <Doughnut data={styledData} options={options} />;
      case "scatter":
        return <Scatter data={styledData} options={options} />;
      default:
        return null;
    }
  };

  return (
    <figure className="my-8">
      <div className="p-4 border border-border-subtle rounded-md bg-surface-elevated">
        {renderChart()}
      </div>
      {caption && (
        <figcaption className="mt-2 text-tiny text-text-muted text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
