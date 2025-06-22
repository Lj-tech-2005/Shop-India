'use client';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosApiInstance } from "@/app/library/helper";
import Link from "next/link";
import { FaHeart } from "react-icons/fa"; // 💖 Heart icon from react-icons

export default function WishlistPage() {
  const userId = useSelector((state) => state.user?.data?._id);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!userId) return;
      try {
        const res = await axiosApiInstance.get(`/wishlist/list/${userId}`);
        const productList = res?.data?.wishlist || [];
        setProducts(productList);
      } catch (err) {
        console.error("Failed to fetch wishlist", err);
      }
    };
    fetchWishlist();
  }, [userId]);

  const handleRemove = async (productId) => {
    try {
      await axiosApiInstance.post("/wishlist/remove", {
        userId,
        productId,
      });
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      console.error("Remove failed", err);
    }
  };

  return (
    <div className="max-w-[1360px] mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>

      {products.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product._id} className="p-2">
              <div className="relative bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-[400px] justify-between border border-gray-100 transform hover:scale-105">

                {/* ❤️ Heart Remove Button */}
                <button
                  onClick={() => handleRemove(product._id)}
                  className="absolute top-2 right-2 z-10 bg-white p-1 rounded-full shadow hover:scale-110 transition-transform"
                  title="Remove from wishlist"
                >
                  <FaHeart className="text-red-500 w-5 h-5" />
                </button>

                {/* Image Section */}
                <Link href={`/singleproduct/${product._id}`} className="relative w-full h-[220px] rounded-xl overflow-hidden bg-gray-50">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/product/${product.thumbnail}`}
                    alt={product.name}
                    className="w-full h-full object-contain p-2"
                  />
                  {product.discountPercentage > 0 && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      -{product.discountPercentage}%
                    </span>
                  )}
                  <span className={`absolute top-3 right-3 mr-7 text-white text-xs font-bold px-2 py-1 rounded-full ${product.topSelling ? 'bg-green-600' : 'bg-blue-500'}`}>
                    {product.topSelling ? 'Top Selling' : 'New Arrival'}
                  </span>
                </Link>

                {/* Product Info */}
                <div className="flex flex-col mt-4">
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px]">{product.name}</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-lg font-bold text-blue-600">₹{product.finalPrice}</span>
                    {product.originalPrice > product.finalPrice && (
                      <span className="text-sm line-through text-gray-400">₹{product.originalPrice}</span>
                    )}
                  </div>
                  <div className="mt-3">
                    {product.stock > 0 ? (
                      <span className="text-sm text-green-600 font-medium">In Stock</span>
                    ) : (
                      <span className="text-sm text-red-500 font-medium">Out of Stock</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
