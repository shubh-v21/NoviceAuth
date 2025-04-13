/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true, // ✅ This disables ESLint during `next build`
      },
};

export default nextConfig;
