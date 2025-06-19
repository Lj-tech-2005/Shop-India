'use client';

import { axiosApiInstance, notify } from "@/app/library/helper";
import React, { useState, useEffect, use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { emptyCart } from "@/redux/features/cartSlice";
import Link from "next/link";
import { useRazorpay } from "react-razorpay";

const Checkout = () => {
  const { Razorpay } = useRazorpay()
  const user = useSelector((state) => state.user.data);
  const cart = useSelector((state) => state.cart);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [paymentMode, setPaymentMode] = useState(null); // null = not selected
  const router = useRouter();
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (
    !isClient ||
    !user ||
    !user.shipping_address ||
    user.shipping_address.length === 0 ||
    !cart
  ) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  const isFormValid = selectedAddress !== null && paymentMode !== null && cart.final_total > 0;

  const handlePlaceOrder = () => {
    if (!isFormValid) return;

    axiosApiInstance
      .post("/order/order-place", {
        user_id: user._id,
        order_total: cart.final_total,
        payment_mode: paymentMode,
        shipping_details: user.shipping_address[selectedAddress],
      })
      .then((response) => {
        const data = response.data;

        if (data.flag !== 1) {
          notify(data.message, data.flag);
          return;
        }

        if (paymentMode === 0) {
          dispatch(emptyCart());
          notify(data.message, data.flag);
          router.push(`/thankyou/${data.order_id}`);


        } else {

          const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_id,
            currency: "INR",
            name: "Apna Market",
            description: "Test Transaction",
            order_id: response.data.razorpay_order_id, // Generate order_id on server
            handler: (razorpay_response) => {
              axiosApiInstance.post("/order/success", {
                order_id: data.order_id, // ✅ not response.data
                user_id: user._id,       // ✅ correct key
                razorpay_response
              }).then((res) => {
                if (res.data.flag === 1) {
                  dispatch(emptyCart());
                  notify(res.data.message || "Payment successful", 1);
                  router.push(`/thankyou/${data.order_id}`);
                } else {
                  notify(res.data.message || "Payment success but something went wrong.", 0);
                }
              }).catch((err) => {
                console.error(err);
                notify("Something went wrong while saving payment info.", 0);
              });
            }
            ,
            prefill: {
              name: user?.data?.name,
              email: user?.data?.email,
              contact: user?.data?.contact,
            },
            theme: {
              color: "#F37254",
            },
          };

          const razorpayInstance = new Razorpay(options);
          razorpayInstance.open();

          // razorpayInstance.error(

          //   (razorpay_error)=>{

          //     console.log(razorpay_error)

          //   }

          // )

        }

      })
      .catch((error) => {
        console.error("Order placement error:", error);
        notify("Order could not be placed. Please try again.", 0);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left section - Billing/Shipping Details */}
        <div className="lg:col-span-2 bg-white shadow-md rounded-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Checkout</h2>

          {/* Address Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Billing Detail</h3>
            {user.shipping_address.map((address, index) => (
              <div
                key={index}
                onClick={() => setSelectedAddress(index)}
                className={`mb-4 p-4 rounded border transition cursor-pointer ${selectedAddress === index
                  ? "border-teal-500 bg-teal-50"
                  : "border-gray-300"
                  }`}
              >
                <p className="font-medium">{address.name}</p>
                <p>{address.contact}</p>
                <p>{address.addressLine1}</p>
                {address.addressLine2 && <p>{address.addressLine2}</p>}
                <p>
                  {address.city}, {address.state}, {address.postalCode}
                </p>
                <p>{address.country}</p>
              </div>
            ))}
            <Link href={"/profile"}>
              <div className="inline-block px-4 py-2 bg-teal-500 text-white rounded cursor-pointer">
                + Add New
              </div>
            </Link>
          </div>

          {/* Payment Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
            <div className="flex gap-4">
              <button
                onClick={() => setPaymentMode(0)}
                className={`flex-1 p-3 rounded border text-center font-medium transition cursor-pointer ${paymentMode === 0
                  ? "bg-teal-500 text-white border-teal-500"
                  : "bg-gray-50 border-gray-300 text-gray-700"
                  }`}
              >
                Cash on Delivery (COD)
              </button>
              <button
                onClick={() => setPaymentMode(1)}
                className={`flex-1 p-3 rounded border text-center font-medium transition cursor-pointer ${paymentMode === 1
                  ? "bg-teal-500 text-white border-teal-500"
                  : "bg-gray-50 border-gray-300 text-gray-700"
                  }`}
              >
                Online Payment
              </button>
            </div>
          </div>
        </div>

        {/* Right section - Order Summary */}
        <div className="bg-white shadow-md rounded-md p-6">
          <h3 className="text-xl font-semibold mb-4">Your Order</h3>

          <div className="bg-gray-50 p-4 rounded border mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Product Total</span>
              <span>₹{cart?.original_total}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Discount</span>
              <span className="text-green-600">
                - ₹{cart?.original_total - cart?.final_total}
              </span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t pt-2 mt-2">
              <span>Total</span>
              <span className="text-teal-600">₹{cart?.final_total}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={!isFormValid}
            className={`w-full py-3 rounded-md font-medium transition ${isFormValid
              ? "bg-teal-500 text-white hover:bg-teal-600 cursor-pointer"
              : "bg-gray-300 text-white cursor-not-allowed"
              }`}
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
