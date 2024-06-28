/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ["arweave", "@irys/sdk"],
  },
};

export default nextConfig;
