"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const RecentlyViewedSection = () => {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    setRecent(items);
  }, []);

  if (recent.length === 0) return null;

  return (
    <div className="max-w-[1360px] mx-auto mt-12 px-4">
      <h2 className="text-xl font-bold mb-4">Recently Viewed Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {recent.map((item) => (
          <Link href={`/singleproduct/${item._id}`} key={item._id}>
            <div className="bg-white p-2 rounded shadow hover:shadow-md transition">
              <img
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/images/product/${item.thumbnail}`}
                alt={item.name}
                className="w-full h-36 object-contain bg-gray-50 rounded"
              />
              <h3 className="text-sm font-medium mt-2 line-clamp-2">{item.name}</h3>
              <p className="text-blue-600 font-bold text-sm">₹{item.finalPrice}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewedSection;
