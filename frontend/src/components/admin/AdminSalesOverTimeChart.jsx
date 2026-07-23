"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { axiosApiInstance } from "@/app/library/helper";

// Register chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title
);

export default function AdminSalesOverTimeChart() {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axiosApiInstance.get("admin/sales-over-time"); // Adjust if base path differs
        if (res.data.flag === 1) {
          setSalesData(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching sales over time:", err);
      }
    }

    fetchData();
  }, []);

  if (!salesData.length) return <p>Loading Sales Trend Chart...</p>;

  const labels = salesData.map(item => item._id.date);
  const qtyData = salesData.map(item => item.totalQty);
  const revenueData = salesData.map(item => item.totalRevenue);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Quantity Sold",
        data: qtyData,
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Revenue",
        data: revenueData,
        borderColor: "#FF6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Sales Over Time",
      },
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="bg-white p-4 cursor-pointer rounded-xl shadow-lg">
      <Line data={chartData} options={options} />
    </div>
  );
}
