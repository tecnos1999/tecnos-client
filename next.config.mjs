const nextConfig = {
    webpack(config, options) {
        config.module.rules.push({
            test: /\.(mp4|webm|ogg|swf|ogv)$/,
            use: {
                loader: 'file-loader',
                options: {
                    publicPath: `${process.env.REACT_APP_ENV === 'development' ? 'http://localhost:8080/ui-static' : 'https://89.33.44.227/ui-static'}/videos/`,
                    outputPath: 'static/videos/',
                    name: '[name].[hash].[ext]',
                },
            },
        });


        return config;
    },
    images: {
        domains: ['s3-us-west-2.amazonaws.com', 'via.placeholder.com', 'localhost', '**'],
    },

    assetPrefix: process.env.REACT_APP_ENV === 'development'
        ? 'http://localhost:8080/ui-static'
        : 'http://89.33.44.227:8080/ui-static',


    reactStrictMode: true,
    async rewrites() {
        return [
          {
            source: "/ui/:path*",
            destination: "/:path*",
          },
        ];
      },
};

export default nextConfig;
