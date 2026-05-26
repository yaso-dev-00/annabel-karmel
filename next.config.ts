import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/advice/baby-nutrition",
        destination: "/category/nutrition/baby-nutrition",
        permanent: true,
      },
      {
        source: "/babys-hydration",
        destination: "/babys-hydration-2",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
