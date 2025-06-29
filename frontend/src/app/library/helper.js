
import { toast } from "react-toastify";
import axios from "axios";


const axiosApiInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true, // required for cookie-based auth
});


function createSlug(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[\s\W-]+/g, '-')  // Replace spaces and non-word characters with hyphens
        .replace(/^-+|-+$/g, '');   // Remove leading/trailing hyphens
}


const notify = (msg, flag) => toast(msg, { type: flag ? "success" : "error" });

// function getCookies(name) {
//   if (typeof document === 'undefined') return null; // ✅ Safe for SSR

//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
//   return null;
// }


export const addToRecentlyViewed = (product) => {
  if (!product?._id) return;

  const existing = JSON.parse(localStorage.getItem("recentlyViewed")) || [];

  const updated = existing.filter(p => p._id !== product._id);
  updated.unshift(product);

  const limited = updated.slice(0, 10); // Only latest 10
  localStorage.setItem("recentlyViewed", JSON.stringify(limited));
};

export { createSlug, notify, axiosApiInstance}