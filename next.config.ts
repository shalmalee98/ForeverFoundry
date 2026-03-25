import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Allow placeholder gallery images in the live preview */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
    ],
  },
  /** Legacy Vite pages still in repo — lint only App Router code in CI later */
  eslint: {
    ignoreDuringBuilds: true,
  },
  /** Legacy Vite routes under src/pages — tighten types when migrating fully to App Router */
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
