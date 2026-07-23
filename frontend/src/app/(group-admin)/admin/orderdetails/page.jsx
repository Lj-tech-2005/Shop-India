'use client';

import React, { useEffect, useState } from 'react';
import { axiosApiInstance, notify } from '@/app/library/helper';
import Image from 'next/image';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentFilter, setPaymentFilter] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      const res = await axiosApiInstance.get('/order/get-all-orders');
      setOrders(res.data.orders || []);
    } catch (error) {
      console.error(error);
      notify('Failed to load orders', 0);
    } finally {
      setLoading(false);
    }
  };

  console.log(orders)

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

  const filteredOrders = orders
    .filter(order => !paymentFilter || order.payment_status === paymentFilter)
    .filter(order => orderStatusFilter === '' || order.order_status === parseInt(orderStatusFilter))
    .filter(order => {
      if (!dateFilter) return true;
      const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
      return orderDate === dateFilter;
    })
    .sort((a, b) => sortOrder === 'asc' ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt));

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">📦 Admin - All Orders</h2>

      <div className="flex flex-wrap gap-4 mb-6">
        <select
          onChange={(e) => setPaymentFilter(e.target.value)}
          value={paymentFilter}
          className="bg-white cursor-pointer text-gray-800 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value="">All Payments</option>
          <option value="success">Success</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>

        <select
          onChange={(e) => setOrderStatusFilter(e.target.value)}
          value={orderStatusFilter}
          className="bg-white cursor-pointer text-gray-800 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value="">All Statuses</option>
          <option value="0">Placed</option>
          <option value="1">Payment Successful</option>
          <option value="2">Processing</option>
          <option value="3">Shipped</option>
          <option value="4">Out for Delivery</option>
          <option value="5">Delivered</option>
          <option value="6">Cancelled</option>
          <option value="7">Returned</option>
        </select>

        <select
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
          className="bg-white cursor-pointer text-gray-800 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="bg-white cursor-pointer text-gray-800 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div className="overflow-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-gray-100 text-gray-700 font-semibold text-left">
            <tr>
              <th className="p-4 border">#</th>
              <th className="p-4 border min-w-[180px]">User Name</th>
              <th className="p-4 border min-w-[200px]">Order ID</th>
              <th className="p-4 border min-w-[180px]">User ID</th>
              <th className="p-4 border min-w-[280px]">Products</th>
              <th className="p-4 border">Total</th>
              <th className="p-4 border">Payment</th>
              <th className="p-4 border min-w-[160px]">Order Status</th>
              <th className="p-4 border">Address</th>
              <th className="p-4 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={order._id} className="hover:bg-gray-50 transition">
                <td className="p-4 border text-center">{index + 1}</td>
                <td className="p-4 border text-xs text-gray-700 break-all min-w-[180px]">{order.user_name || 'N/A'}</td>
                <td className="p-4 border text-xs text-gray-700 break-all min-w-[200px]">{order._id}</td>
                <td className="p-4 border text-xs text-gray-600 break-all min-w-[180px]">{order.user_id}</td>
                <td className="p-4 border space-y-2">
                  {order.product_details.map((item, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/images/product/${item.product_id?.thumbnail}`}
                        width={40}
                        height={40}
                        alt="thumb"
                        className="border rounded"
                      />
                      <div>
                        <p className="text-xs font-semibold">{item.product_id?.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                      </div>
                    </div>
                  ))}
                </td>
                <td className="p-4 border font-medium text-center text-teal-700">₹{order.order_total}</td>
                <td className="p-4 border text-center">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${order.payment_status === 'success'
                    ? 'bg-green-100 text-green-700'
                    : order.payment_status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-600'
                    }`}>
                    {order.payment_status}
                  </span>
                  <p className="text-xs text-gray-600 mt-1">{order.payment_mode ? 'Online' : 'COD'}</p>
                </td>
                <td className="p-4 border text-center">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getOrderStatusColor(order.order_status)}`}> 
                    {getOrderStatusLabel(order.order_status)}
                  </span>
                </td>
                <td className="p-4 border text-xs text-gray-600 min-w-[180px]">
                  <p>{order.shipping_details.addressLine1}</p>
                  <p>{order.shipping_details.addressLine2}</p>
                  <p>{order.shipping_details.city}, {order.shipping_details.state} - {order.shipping_details.postalCode}</p>
                  <p>{order.shipping_details.country}</p>
                  <p>📞 {order.shipping_details.contact}</p>
                </td>
                <td className="p-4 border text-xs text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
