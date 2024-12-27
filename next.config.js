/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
    // Remove unoptimized setting since Vercel handles image optimization
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;