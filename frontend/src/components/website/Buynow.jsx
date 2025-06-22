'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { FaBolt } from 'react-icons/fa';

export default function Buynow({ product }) {
    const router = useRouter();
    const user = useSelector((state) => state.user?.data);


    const handleBuyNow = () => {
        if (!user) {
            alert("Please login first.");
            return;
        }


        router.push(`/buynow/checkout?product_id=${product._id}&qty=1`);

    };

    return (
        <button
            onClick={handleBuyNow}
            className="mt-2 w-full flex cursor-pointer items-center justify-center gap-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-300"
        >
            <FaBolt />
            Buy Now
        </button>
    );
}
