'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useRazorpay } from 'react-razorpay';
import { axiosApiInstance, notify } from '@/app/library/helper';
import { getproduct } from '@/app/library/api-call';
import Link from 'next/link';

const BuyNowCheckout = () => {
  const { Razorpay } = useRazorpay();
  const user = useSelector((state) => state.user.data);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [paymentMode, setPaymentMode] = useState(null);
  const [product, setProduct] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get('product_id');

  useEffect(() => {
    setIsClient(true);
    if (productId) {
      getproduct(productId, null, null, null, 0, null, null, 1, true)
        .then((res) => {
          let foundProduct = null;

          if (res?.product && res.product._id) {
            foundProduct = res.product;
          } else if (res?.products && res.products._id) {
            foundProduct = res.products;
          }

          if (foundProduct) {
            setProduct(foundProduct);
          } else {
            notify("Product not found", 0);
          }
        })
        .catch((err) => {
          console.error("Error fetching product:", err);
          notify("Failed to load product", 0);
        })
        .finally(() => setLoading(false));
    } else {
      notify("No product ID found", 0);
      setLoading(false);
    }
  }, [productId]);

  const isFormValid =
    user?.shipping_address?.length > 0 &&
    paymentMode !== null &&
    product?.finalPrice * qty > 0;

  const handlePlaceOrder = () => {
    if (!isFormValid) return;

    const payload = {
      user_id: user._id,
      payment_mode: paymentMode,
      order_total: product.finalPrice * qty,
      shipping_details: user.shipping_address[selectedAddress],
      product: {
        product_id: product._id,
        qty,
        price: product.finalPrice,
      },
    };

    axiosApiInstance.post("/order/buy-now", payload)
      .then((res) => {
        const data = res.data;
        if (data.flag !== 1) return notify(data.message, 0);

        if (paymentMode === 0) {
          notify("Order placed successfully!", 1);
          router.push(`/thankyou/${data.order_id}`);
        } else {
          const rzp = new Razorpay({
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_id,
            amount: product.finalPrice * qty * 100,
            currency: 'INR',
            name: "Shop India",
            description: "Payment",
            order_id: data.razorpay_order_id,
            handler: (response) => {
              axiosApiInstance.post("/order/success", {
                user_id: user._id,
                order_id: data.order_id,
                razorpay_response: response,
              }).then((r) => {
                notify("Payment successful!", 1);
                router.push(`/thankyou/${data.order_id}`);
              });
            },
            prefill: {
              name: user.name,
              email: user.email,
              contact: user.contact,
            },
            theme: { color: "#3399cc" },
          });

          rzp.open();
        }
      })
      .catch(() => notify("Order failed", 0));
  };

  if (!isClient || loading || !user || !user.shipping_address?.length) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="md:col-span-2 bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Buy Now - Checkout</h2>

          {/* Address */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Shipping Address</h3>
            {user.shipping_address.map((address, i) => (
              <div
                key={i}
                onClick={() => setSelectedAddress(i)}
                className={`p-4  rounded border mb-2 cursor-pointer transition ${selectedAddress === i ? "bg-teal-50 border-teal-500" : "border-gray-300"}`}
              >
                <p>{address.name} - {address.contact}</p>
                <p>{address.addressLine1}</p>
                <p>{address.city}, {address.state} - {address.postalCode}</p>
              </div>
            ))}
             <Link href={"/profile"}>
              <div className="inline-block px-4 py-2 bg-teal-500 text-white rounded cursor-pointer">
                + Add New
              </div>
            </Link>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="font-semibold mb-2">Payment Method</h3>
            <div className="flex gap-4">
              <button
                className={`flex-1 py-2 border cursor-pointer  rounded ${paymentMode === 0 ? "bg-teal-500 text-white" : "bg-gray-50"}`}
                onClick={() => setPaymentMode(0)}
              >
                Cash on Delivery
              </button>
              <button
                className={`flex-1 py-2 border cursor-pointer  rounded ${paymentMode === 1 ? "bg-teal-500 text-white" : "bg-gray-50"}`}
                onClick={() => setPaymentMode(1)}
              >
                Online Payment
              </button>
            </div>
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          {product ? (
            <>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/images/product/${product.thumbnail}`}
                  alt={product.name}
                  className="w-20 h-20 object-contain border rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold">{product.name}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm text-gray-600">₹{product.finalPrice}</span>
                    <div className="flex items-center border rounded px-2">
                      <button
                        onClick={() => qty > 1 && setQty(qty - 1)}
                        className="px-2 cursor-pointer text-lg font-bold"
                      >−</button>
                      <span className="px-2">{qty}</span>
                      <button
                        onClick={() => setQty(qty + 1)}
                        className="px-2 cursor-pointer  text-lg font-bold"
                      >+</button>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-teal-600">₹{product.finalPrice * qty}</span>
              </div>
            </>
          ) : (
            <div className="text-red-500">Product not available</div>
          )}

          <button
            onClick={handlePlaceOrder}
            disabled={!isFormValid}
            className={`mt-6 w-full py-2 cursor-pointer  rounded text-white font-semibold transition ${isFormValid ? "bg-teal-500 hover:bg-teal-600" : "bg-gray-300 cursor-not-allowed"}`}
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyNowCheckout;
