import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'server.aptech.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
