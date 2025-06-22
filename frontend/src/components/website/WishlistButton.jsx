'use client';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { axiosApiInstance } from "@/app/library/helper";

export default function WishlistButton({ productId }) {
  const userId = useSelector((state) => state.user?.data?._id);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Check if already in wishlist
  useEffect(() => {
    const checkWishlist = async () => {
      if (userId && productId) {
        try {
          const res = await axiosApiInstance.post("/wishlist/check", {
            userId,
            productId,
          });
          setIsWishlisted(res?.data?.inWishlist);
        } catch (err) {
          console.error("Wishlist check error", err);
        }
      }
    };
    checkWishlist();
  }, [userId, productId]);

  // ✅ Toggle wishlist
  const handleToggle = async () => {
    if (!userId) {
      alert("Please login to use wishlist");
      return;
    }

    setLoading(true);
    try {
      const url = isWishlisted ? "/wishlist/remove" : "/wishlist/add";
      const res = await axiosApiInstance.post(url, { userId, productId });
      if (res?.data?.flag === 1) {
        setIsWishlisted(!isWishlisted);
      }
    } catch (err) {
      console.error("Wishlist toggle error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className="text-xl cursor-pointer text-red-500 hover:scale-110 transition-all"
      title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
    >
      {isWishlisted ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
}
