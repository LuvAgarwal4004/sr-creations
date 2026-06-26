/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
        domains:["lh3.googleusercontent.com","res.cloudinary.com"],
          remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
    ],
  },
};

export default nextConfig;
