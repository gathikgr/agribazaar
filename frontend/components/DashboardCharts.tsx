"use client";

import { Bar, Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler);

export function DashboardCharts() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="card">
        <h3 className="mb-3 text-sm font-semibold">Price Trend</h3>
        <Line
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May"],
            datasets: [{ label: "₹/Ton", data: [20000, 21300, 22000, 22700, 23500], borderColor: "#15803d", backgroundColor: "#bbf7d0", fill: true }]
          }}
        />
      </div>
      <div className="card">
        <h3 className="mb-3 text-sm font-semibold">Yield Projection</h3>
        <Bar
          data={{
            labels: ["Q1", "Q2", "Q3", "Q4"],
            datasets: [{ label: "Tons", data: [95, 118, 131, 149], backgroundColor: "#22c55e" }]
          }}
        />
      </div>
    </div>
  );
}
