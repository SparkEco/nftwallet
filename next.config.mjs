/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ["arweave", "@irys/sdk"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ar-io.net",
      },
    ],
  },
};

export default nextConfig;
