import React from "react";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

export default function ThankYouPage({ params }) {
     const { order_id } = params;
 ;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-50 via-white to-teal-50 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-lg w-full text-center border border-gray-200">
        <div className="animate-bounce-slow mb-4">
          <FaCheckCircle className="mx-auto h-20 w-20 text-teal-500" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank You for Your Order!</h1>
        <p className="text-gray-600 mb-6">
          We’ve received your order and will process it shortly.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg border mb-6">
          <p className="text-sm text-gray-500">Your Order ID</p>
          <p className="text-xl font-mono font-semibold text-gray-800">{order_id}</p>
        </div>

        <p className="text-sm text-gray-500 mb-8">
          A confirmation email will be sent to you with the full details.
        </p>

        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-full bg-teal-500 text-white font-medium shadow-md hover:bg-teal-600 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
