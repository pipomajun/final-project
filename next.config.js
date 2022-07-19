/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org'],
  },
  compiler: {
    emotion: true,
  },
};

module.exports = nextConfig;
