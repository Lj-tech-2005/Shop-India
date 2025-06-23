"use client";

import React, { useEffect, useState } from "react";
import { axiosApiInstance } from "@/app/library/helper";

export default function AdminTopProducts() {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    async function fetchTop() {
      try {
        const res = await axiosApiInstance.get("admin/top-products");
        if (res.data.flag === 1) {
          setTopProducts(res.data.data);
        }
      } catch (err) {
        console.error("Error loading top products", err);
      }
    }

    fetchTop();
  }, []);

  if (!topProducts.length) return <p>Loading Top Products...</p>;

  return (
    <div className="bg-white cursor-pointer p-4 rounded-xl shadow-lg">
      <h3 className="text-lg font-bold mb-4 text-gray-700">Top 5 Selling Products</h3>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2">Product</th>
            <th className="py-2">Qty Sold</th>
            <th className="py-2">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {topProducts.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="py-2">{item.name}</td>
              <td className="py-2">{item.qty}</td>
              <td className="py-2">₹{item.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
