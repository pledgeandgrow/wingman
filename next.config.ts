import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.pexels.com','lh3.googleusercontent.com'],
  },
  async rewrites() {
    return [
      {
        source: '/socket.io/:path*',
        destination: '/api/socket.io/:path*',
      },
    ];
  },
  webpack: (config) => {
    config.externals = [...config.externals, 'bufferutil', 'utf-8-validate'];
    return config;
  },
};

export default nextConfig;

