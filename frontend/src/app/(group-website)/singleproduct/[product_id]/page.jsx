'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getproduct } from '@/app/library/api-call';
import {  FaBalanceScale, FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPinterestP } from 'react-icons/fa';
import AddToCart from '@/components/website/AddToCart';
import Buynow from '@/components/website/Buynow';
import WishlistButton from '@/components/website/WishlistButton';

export default function SingalProduct({ params }) {
  const productId = params?.product_id;
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  // const [qty, setQty] = useState(1);

  // ✅ Step 1: Function to convert plain text to HTML
  const convertToHTML = (text) => {
    return text
      ?.split('\n\n')
      .map(para => `<p>${para.replace(/\n/g, '<br />')}</p>`)
      .join('');
  };

  useEffect(() => {
    async function fetchProduct() {
      const response = await getproduct(productId, null, null, null, 0, null, null, 1, true);
      if (response?.products) {
        setProduct(response.products);
        setMainImage(`${process.env.NEXT_PUBLIC_API_BASE_URL}images/product/${response.products.thumbnail}`);
      }
    }
    fetchProduct();
  }, [productId]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-[300px] text-gray-500 text-lg">
        Loading product details...
      </div>
    );
  }

  // ✅ Step 2: Use the function to create formattedDescription
  const formattedDescription = convertToHTML(product?.longDescription || '');

  return (
    <div className="max-w-[1360px] mx-auto px-4">
      {/* Breadcrumb */}
      <div className="text-sm rounded-[10px] p-4 my-5 bg-white text-gray-500">
        Home / Shop / {product.categoryId?.name || 'Category'} /{" "}
        <span className="text-black font-semibold">{product.name}</span>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Image Gallery */}
          <div className="flex flex-col items-center">
            <span className="text-xs bg-black text-white px-2 py-0.5 rounded mb-2">NEW</span>
            <Image
              src={mainImage}
              alt={product.name}
              width={300}
              height={100}
              className="object-contain rounded-lg"
            />
            <div className="flex gap-3 overflow-x-auto mt-4 pb-2">
              {[product.thumbnail, ...product.images].map((img, i) => (
                <img
                  key={i}
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/product/${img}`}
                  alt={`thumb-${i}`}
                  className={`h-20 w-20 object-cover rounded-lg border cursor-pointer ${mainImage.includes(img) ? 'ring-2 ring-teal-500' : ''}`}
                  onClick={() =>
                    setMainImage(`${process.env.NEXT_PUBLIC_API_BASE_URL}images/product/${img}`)
                  }
                />
              ))}
            </div>
          </div>

          {/* Middle Details */}
          <div className="space-y-4">
            <h2 className="font-semibold text-xl md:text-2xl">{product.name}</h2>

            <p className="text-xl font-semibold text-green-700">
              ₹{product.finalPrice}
              {product.originalPrice > product.finalPrice && (
                <span className="ml-2 line-through text-gray-400 text-sm">₹{product.originalPrice}</span>
              )}
            </p>

            <p className="text-sm text-gray-600">{product.shortDescription}</p>

            <div className="flex gap-2">
              <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded">FREE SHIPPING</span>
              <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded">DISCOUNT {product.discountPercentage}%</span>
            </div>

            {/* COLORS */}
            {product.colors?.length > 0 && (
              <div>
                <p className="text-sm font-medium">COLOR OPTIONS</p>
                <div className="flex gap-2 mt-2">
                  {product.colors.map((color, index) => (
                    <div key={index} className="flex items-center gap-1 border px-2 py-1 rounded text-xs">
                      <span
                        className="inline-block w-4 h-4 rounded-full"
                        style={{ backgroundColor: color.Hexcode || '#000' }}
                      ></span>
                      <span>{color.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* META */}
            <div className="text-sm text-black space-y-1">
              <p><strong>SKU:</strong> {product._id.slice(-6)}</p>
              <p><strong>CATEGORY:</strong> {product.categoryId?.name}</p>
              <p><strong>BRAND:</strong> {product.brandId?.name}</p>
            </div>

            {/* SOCIAL */}
            <div className="flex gap-3 mt-6 text-gray-600 text-base">
              {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPinterestP].map((Icon, i) => (
                <div key={i} className="bg-[#E1E3EB] p-2 rounded-[17.5px]">
                  <Icon />
                </div>
              ))}
            </div>
          </div>

          {/* Right Summary */}
          <div className="w-full max-w-[320px]">
            <div className="bg-[#EDEFF6] p-4 rounded-2xl space-y-4">
              <h2 className="text-2xl font-bold">₹{product.finalPrice}</h2>
              <p className="text-green-600 text-sm">{product.stock ? "In Stock" : "Out of Stock"}</p>

              <AddToCart product={product} />
              {/* <button className="w-full bg-yellow-400 text-black py-2 rounded hover:bg-yellow-500">BUY WITH PayPal</button> */}
              <Buynow product={product}/>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                {/* <p><FaHeart className="inline mr-1" /> Wishlist</p> */}
                <WishlistButton productId={product._id}/>
                <p><FaBalanceScale className="inline mr-1" /> Compare</p>
              </div>

              <div className="border-t pt-2">
                <p className="text-sm font-semibold">Guaranteed Safe Checkout</p>
                <Image className="mt-4" src="/pay.png" alt="Payments" width={250} height={30} />
              </div>
            </div>

            <div className="mt-9 p-5 py-9 rounded-2xl bg-[#EDEFF6]">
              <div className="bg-[#333333] text-white p-2 rounded text-center w-fit mb-2">
                <p className="text-sm">Quick Order 24/7</p>
              </div>
              <p className="text-xl font-bold">(025) 3886 25 16</p>
            </div>

            <div className="flex gap-4 mt-4 text-sm items-center">
              <img src="/symbol.png" alt="symbol" />
              <p className="text-xs text-black">Ships from <strong>India</strong></p>
            </div>
          </div>
        </div>

        {/* ✅ Final Step: Properly formatted longDescription */}
        <div className="mt-10 p-4 bg-white rounded-xl overflow-x-auto">
          <h3 className="text-lg font-semibold mb-2">Product Description</h3>
          <div
            className="rich-text-content"
            dangerouslySetInnerHTML={{ __html: product.longDescription }}
          />
        </div>

      </div>
    </div>
  );
}
