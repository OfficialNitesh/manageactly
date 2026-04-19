/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Remove optimizeCss - requires critters package and slows cold starts
};

export default nextConfig;
