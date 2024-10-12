/** @type {import('next').NextConfig} */
import withVideos from 'next-videos';

const nextConfig = withVideos({
    webpack(config, options) {
        return config;
    },
});

export default nextConfig;
