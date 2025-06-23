"use client";

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { axiosApiInstance } from "@/app/library/helper";

// Register chart parts
ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminProductRevenueChart() {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    async function fetchStats() {
      try {
       const res = await axiosApiInstance.get('admin/product-sales-stats');
        if (res.data.flag === 1) {
          setSalesData(res.data.data);
        }
      } catch (err) {
        console.error("Error loading revenue chart", err);
      }
    }
    fetchStats();
  }, []);

  if (!salesData.length) return <p>Loading revenue chart...</p>;

  const labels = salesData.map(item => item.name);
  const revenue = salesData.map(item => item.revenue);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: revenue,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#8BC34A",
          "#795548",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Revenue Distribution by Product",
      },
    },
  };

  return (
    <div className="bg-white p-4 cursor-pointer rounded-lg shadow-md">
      <Doughnut data={chartData} options={options} />
    </div>
  );
}
