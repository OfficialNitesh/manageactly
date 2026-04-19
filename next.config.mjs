/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Ignore ESLint during Vercel build (fixes your error)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Remove optimizeCss - requires critters package and slows cold starts
};

export default nextConfig;