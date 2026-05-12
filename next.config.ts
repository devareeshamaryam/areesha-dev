 import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // ✅ base64 images ke liye
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gbeeaxusofxyrmjavymh.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;