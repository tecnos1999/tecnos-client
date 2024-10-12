/** @type {import('next').NextConfig} */
import withVideos from 'next-videos';

const nextConfig = withVideos({
    webpack(config, options) {
        return config;
    },
    images: {
        domains: ['s3-us-west-2.amazonaws.com', 'via.placeholder.com'],
      },
});

export default nextConfig;
