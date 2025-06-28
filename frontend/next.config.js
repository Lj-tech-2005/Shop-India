/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['shop-india-backend.onrender.com'],
  },
  output: 'standalone', // safe for Render deployment
};

module.exports = nextConfig;
