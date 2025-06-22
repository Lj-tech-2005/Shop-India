'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '@/app/library/api-call';
import { axiosApiInstance, notify } from '@/app/library/helper';
import { setUser } from '@/redux/features/userSlice';

export default function Profile() {
  const [hasMounted, setHasMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('account');
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', userId: '' });
  const [shippingAddresses, setShippingAddresses] = useState([{ addressLine1: '', addressLine2: '', city: '', state: '', postalCode: '', country: '', contact: '' }]);
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const token = useSelector((state) => state.user.token);

  console.log(userOrders)
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserOrders();
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        userId: user._id
      });

      if (user.shipping_address?.length) {
        setShippingAddresses(user.shipping_address);
      }
    }
  }, [user]);

  const fetchUserOrders = async () => {
    const response = await getUserOrders(user._id);
    setUserOrders(response.orders); // ✅ fix
  };


  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosApiInstance.put('user/update-profile', formData);
      if (res.data.flag === 1) {
        dispatch(setUser({ data: res.data.user, token }));
      }
      notify(res.data.msg, res.data.flag);
    } catch (err) {
      console.error(err);
      notify('Something went wrong!', 0);
    }
  };

  const handleAddressChange = (index, field, value) => {
    const updated = shippingAddresses.map((addr, i) => i === index ? { ...addr, [field]: value } : addr);
    setShippingAddresses(updated);
  };

  const handleAddressSubmit = async (e, index) => {
    e.preventDefault();
    try {
      const payload = { ...shippingAddresses[index], index, userId: user._id };
      const res = await axiosApiInstance.put('user/update-address', payload);
      if (res.data.flag === 1 && res.data.user?.shipping_address) {
        dispatch(setUser({ data: res.data.user, token }));
        setShippingAddresses(res.data.user.shipping_address);
      }
      notify(res.data.msg, res.data.flag);
    } catch (err) {
      console.error(err);
      notify('Something went wrong', 0);
    }
  };

  const addNewAddress = () => {
    if (shippingAddresses.length < 3) {
      setShippingAddresses([...shippingAddresses, { addressLine1: '', addressLine2: '', city: '', state: '', postalCode: '', country: '', contact: '' }]);
    }
  };

  const handleUploadPhoto = async () => {
    if (!selectedFile || !user?._id) return notify("Please select an image first", 0);
    const formData = new FormData();
    formData.append("profileImage", selectedFile);
    formData.append("userId", user._id);
    try {
      const res = await axiosApiInstance.put('user/upload-profile-image', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      if (res.data.flag === 1) {
        dispatch(setUser({ data: res.data.user, token }));
        setPreview(null);
        setSelectedFile(null);
        notify(res.data.msg, 1);
      } else {
        notify(res.data.msg, 0);
      }
    } catch (err) {
      console.error(err);
      notify("Image upload failed", 0);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handlePasswordChange = (e) => setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return notify('New Password and Confirm Password do not match', 'error');
    }
    try {
      const res = await axiosApiInstance.post('user/change-password', { ...passwordData, userId: user._id });
      notify('Password changed successfully', 'success');
      dispatch(setUser(res.data.user));
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      console.log(err);
      notify(err?.response?.data?.msg || 'Password change failed', 'error');
    }
  };

  if (!hasMounted || !user) return <div className="w-full h-screen flex items-center justify-center"><p className="text-gray-500 text-sm">Loading profile...</p></div>;
  const TabButton = ({ tabKey, label }) => (
    <button
      onClick={() => setActiveTab(tabKey)}
      className={`w-full text-left cursor-pointer px-4 py-2 text-sm font-medium rounded-lg transition ${activeTab === tabKey
        ? 'text-white bg-teal-500'
        : 'text-gray-700 bg-white border hover:bg-gray-100'
        }`}
    >
      {label}
    </button>
  );


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
      reason: selectedReason, // ✅ sending reason text, not number
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



  return (
    <div className="min-h-screen max-w-[1360px] mx-auto py-5">
      <div className="bg-[#FFFFFF] p-7 rounded-[10px] mb-6 text-[14px] text-[#999999] font-bold">
        Home / pages / <span className="text-black font-semibold">Profile</span>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 sm:p-10 flex flex-col lg:flex-row gap-10">
        {/* Sidebar */}
        <div className="w-full lg:w-1/3">
          <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-start">

            {preview ? (
              <img src={preview} alt="Preview" />
            ) : hasMounted && user?.profileImage ? (
              <img
                className='h-50 w-50 rounded-[50%]'
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/images/profile/${user.profileImage}`}
                alt="User Avatar"
                onError={(e) => (e.target.src = "/profile.png")}
              />
            ) : (
              <img src="/profile.png" alt="Default Avatar" />
            )}


            <input
              type="file"
              accept="image/*"
              className="mb-4"
              onChange={handleImageChange}
            />

            <button
              onClick={handleUploadPhoto}  // ✅ अपलोड करने वाला फ़ंक्शन जो आपने backend से जोड़ा होगा
              className="bg-teal-500 cursor-pointer hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg transition mb-4"
            >
              Upload Photo
            </button>

            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-sm text-gray-500 mb-6">{user?.email}</p>

            <div className="space-y-3  w-full">
              <TabButton tabKey="account" label="Account info" />
              <TabButton tabKey="order" label="My order" />
              <TabButton tabKey="address" label="My address" />
              <TabButton tabKey="password" label="Change password" />
            </div>
          </div>
        </div>

        {/* Main Tab Content */}
        <div className="w-full lg:w-2/3">
          {activeTab === 'account' && (
            <div>
              <h2 className="text-[24px] font-bold mb-6">Account Info</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-4 cursor-pointer bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-6 rounded-lg transition"
                >
                  SAVE
                </button>
              </form>
            </div>
          )}
          {activeTab === 'order' && (
            <div>
              <h2 className="text-[24px] font-bold mb-6">My Orders</h2>

              {userOrders && userOrders.length > 0 ? (
                userOrders.map((order) => (
                  <div
                    key={order._id}
                    className="mb-6 border cursor-pointer border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 bg-white"
                  >
                    {/* Order Header */}
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

                    {/* Products List */}
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

                    {/* Optional Cancel/Return Actions */}
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
          )}




          {activeTab === 'address' && (
            <div>
              <h2 className="text-[24px] font-bold mb-6">My Address</h2>

              {shippingAddresses.map((address, index) => (
                <form
                  key={index}
                  className="space-y-5 mb-10 border border-gray-200 rounded-xl p-6"
                  onSubmit={(e) => handleAddressSubmit(e, index)}
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Address Line 1 <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      name="addressLine1"
                      value={address.addressLine1}
                      onChange={(e) => handleAddressChange(index, 'addressLine1', e.target.value)}
                      placeholder="123 Main St"
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
                    <input
                      name="addressLine2"
                      value={address.addressLine2}
                      onChange={(e) => handleAddressChange(index, 'addressLine2', e.target.value)}
                      placeholder="Apartment, suite, unit, etc. (optional)"
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        name="city"
                        value={address.city}
                        onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                        placeholder="Your city"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        name="state"
                        value={address.state}
                        onChange={(e) => handleAddressChange(index, 'state', e.target.value)}
                        placeholder="Your state"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Postal Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        name="postalCode"
                        value={address.postalCode}
                        onChange={(e) => handleAddressChange(index, 'postalCode', e.target.value)}
                        placeholder="123456"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        name="country"
                        value={address.country}
                        onChange={(e) => handleAddressChange(index, 'country', e.target.value)}
                        placeholder="Your country"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact (Optional)</label>
                    <input
                      name="contact"
                      value={address.contact}
                      onChange={(e) => handleAddressChange(index, 'contact', e.target.value)}
                      placeholder="+91 9876543210"
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-4 cursor-pointer bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-6 rounded-lg transition"
                  >
                    Save Address
                  </button>
                </form>
              ))}

              {shippingAddresses.length < 3 && (
                <button
                  type="button"
                  onClick={addNewAddress}
                  className="bg-gray-200 cursor-pointer hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg"
                >
                  + Add New Address
                </button>
              )}
            </div>
          )}




          {activeTab === 'password' && (
            <div>
              <h2 className="text-[24px] font-bold mb-6">Change Password</h2>
              <form onSubmit={handlePasswordSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="••••••••"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                    placeholder="••••••••"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="••••••••"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-4 cursor-pointer bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-6 rounded-lg transition"
                >
                  Change Password
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
