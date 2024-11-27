const isDevelopment = process.env.NODE_ENV === 'development';

const nextConfig = {
  basePath: '/ui',
  assetPrefix: '/ui-static',
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|swf|ogv)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/ui-static/videos/',
          outputPath: 'static/videos/',
          name: '[name].[hash].[ext]',
        },
      },
    });
    return config;
  },
  images: {
    domains: ['s3-us-west-2.amazonaws.com', 'via.placeholder.com', 'localhost'],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;