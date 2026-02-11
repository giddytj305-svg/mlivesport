/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co', // Used in the hero section example
      },
      {
        protocol: 'https',
        hostname: 'apiskeith.vercel.app', // In case the API returns images
      }
    ],
  },
};

export default nextConfig;
