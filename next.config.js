/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Treat ESLint warnings as warnings (not errors) during build.
  // We run lint separately in CI; this prevents @next/next/no-img-element
  // warnings from halting the Vercel build.
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ["app", "components", "lib"],
  },
};

module.exports = nextConfig;
