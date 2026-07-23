"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminProtected({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");

    if (!token) {
      router.replace("/admin-login");
    } else {
      setAuthorized(true);
    }

    // Move this inside a setTimeout to allow router.replace to process
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 300); // Slight delay helps ensure routing is handled

    return () => clearTimeout(timeout);
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0f172a] text-white flex-col space-y-4">
        <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
        <p className="text-sm tracking-wider text-gray-300">Checking authorization...</p>
      </div>
    );
  }

  return authorized ? <>{children}</> : null;
}
