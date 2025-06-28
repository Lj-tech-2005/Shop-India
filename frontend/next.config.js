/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['shop-india.onrender.com'],
  },
  output: 'standalone', // safe for Render deployment
};

module.exports = nextConfig;
