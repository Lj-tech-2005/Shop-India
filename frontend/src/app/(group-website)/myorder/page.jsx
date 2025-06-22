'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { getUserOrders } from '@/app/library/api-call';
import { axiosApiInstance, notify } from '@/app/library/helper';

export default function OrdersPage() {
  const user = useSelector((state) => state.user.data);
  const router = useRouter();

  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) {
      // ❌ User not logged in — redirect
      router.push('/login');
    } else {
      fetchUserOrders();
    }
  }, [user]);

  const fetchUserOrders = async () => {
    try {
      const response = await getUserOrders(user._id);
      setUserOrders(response.orders);
    } catch (error) {
      console.error(error);
      notify("Failed to load orders", 0);
    } finally {
      setLoading(false);
    }
  };

  const getOrderStatusLabel = (status) => {
    switch (status) {
      case 0: return 'Placed';
      case 1: return 'Payment Successful';
      case 2: return 'Processing';
      case 3: return 'Shipped';
      case 4: return 'Out for Delivery';
      case 5: return 'Delivered';
      case 6: return 'Cancelled';
      case 7: return 'Returned';
      default: return 'Unknown';
    }
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case 0: return 'bg-blue-100 text-blue-700';
      case 1: return 'bg-green-100 text-green-700';
      case 2: return 'bg-yellow-100 text-yellow-700';
      case 3: return 'bg-indigo-100 text-indigo-700';
      case 4: return 'bg-purple-100 text-purple-700';
      case 5: return 'bg-emerald-100 text-emerald-700';
      case 6: return 'bg-red-100 text-red-600';
      case 7: return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleCancelOrder = async (orderId) => {
    const reasons = {
      1: "Ordered by mistake",
      2: "Found cheaper elsewhere",
      3: "Shipping is taking too long",
      4: "Other"
    };

    const reasonKey = prompt(
      `Please select a reason number for cancellation:\n` +
      Object.entries(reasons).map(([key, val]) => `${key}. ${val}`).join('\n')
    );

    if (!reasonKey || !reasons[reasonKey]) {
      return notify("Order cancellation aborted or invalid reason selected.", 0);
    }

    const selectedReason = reasons[reasonKey];

    try {
      const res = await axiosApiInstance.post('/order/cancel-order', {
        order_id: orderId,
        user_id: user._id,
        reason: selectedReason,
      });

      notify(res.data.message, res.data.flag);
      if (res.data.flag === 1) fetchUserOrders();
    } catch (err) {
      notify("Failed to cancel order", 0);
      console.error(err);
    }
  };

  const handleReturnOrder = async (orderId) => {
    try {
      const res = await axiosApiInstance.post('/order/return-order', {
        order_id: orderId,
        user_id: user._id
      });

      notify(res.data.message, res.data.flag);
      if (res.data.flag === 1) fetchUserOrders();
    } catch (err) {
      notify("Failed to return order", 0);
      console.error(err);
    }
  };

  if (!user?._id || loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1360px] p-9 mx-auto">
      <h2 className="text-[24px] font-bold mb-6">My Orders</h2>

      {userOrders && userOrders.length > 0 ? (
        userOrders.map((order) => (
          <div
            key={order._id}
            className="mb-6 border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 bg-white"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">
                  <span className="text-gray-800 font-semibold">Order Date:</span>{' '}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm">
                  <span className="text-gray-800 font-semibold">Payment Status:</span>{' '}
                  <span
                    className={`inline-block px-2 py-0.5 text-xs rounded-full font-semibold ${order.payment_status === 'success'
                      ? 'bg-green-100 text-green-700'
                      : order.payment_status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-600'
                      }`}
                  >
                    {order.payment_status}
                  </span>
                </p>
                <p className="text-sm">
                  <span className="text-gray-800 font-semibold">Order Status:</span>{' '}
                  <span
                    className={`inline-block px-2 py-0.5 text-xs rounded-full font-semibold ${getOrderStatusColor(
                      order.order_status
                    )}`}
                  >
                    {getOrderStatusLabel(order.order_status)}
                  </span>
                </p>
              </div>

              <div className="text-right font-bold text-lg text-teal-600">
                ₹{order.order_total}
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {order.product_details.map((item, index) => (
                <div key={index} className="flex items-center gap-4 py-4">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/images/product/${item.product_id?.thumbnail}`}
                    alt={item.product_id?.name}
                    className="w-16 h-16 object-cover rounded-lg border"
                    onError={(e) => (e.target.src = '/placeholder.png')}
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{item.product_id?.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.qty} | Price: ₹{item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              {[0, 1, 2].includes(order.order_status) && Number(order.payment_mode) === 0 && (
                <button
                  onClick={() => handleCancelOrder(order._id)}
                  className="text-red-600 font-medium hover:underline text-sm"
                >
                  Cancel Order
                </button>
              )}

              {order.order_status === 5 && (
                <button
                  onClick={() => handleReturnOrder(order._id)}
                  className="text-orange-600 font-medium hover:underline ml-4 text-sm"
                >
                  Return Order
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">You have no orders yet.</p>
      )}
    </div>
  );
}
