/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['shop-india.onrender.com'],
  },
  output: 'standalone', // ✅ correct for server app (optional but safe)
};

export default nextConfig;
