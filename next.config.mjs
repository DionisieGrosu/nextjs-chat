/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
    ],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  // compiler: {
  // removeConsole: process.env.NODE_ENV === "development" ? false : true,
  // },
};

export default nextConfig;
