const withVideos = require('next-videos');

/** @type {import('next').NextConfig} */
const nextConfig = withVideos({
  webpack(config, options) {
    return config;
  },
  images: {
    domains: ['s3-us-west-2.amazonaws.com', 'via.placeholder.com'],
  },
});

module.exports = nextConfig;
