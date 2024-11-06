/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, options) {
      config.module.rules.push({
        test: /\.(mp4|webm|ogg|swf|ogv)$/,
        use: {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/videos/',
            outputPath: 'static/videos/',
            name: '[name].[hash].[ext]',
          },
        },
      });
      return config;
    },
    images: {
      domains: ['s3-us-west-2.amazonaws.com', 'via.placeholder.com'],
    },
    assetPrefix: process.env.REACT_APP_ENV === 'development'
        ? 'http://tecnos-gateway/ui-static'
        : 'http://tecnos-gateway/ui-static',
  };
  
  export default nextConfig;
  