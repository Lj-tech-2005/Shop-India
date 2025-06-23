/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'your-production-domain.com'],
  },
  output: 'standalone',  // ✅ Add this line
};

export default nextConfig;
