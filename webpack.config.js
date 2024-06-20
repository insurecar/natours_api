const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  entry: {
    main: "./server.js",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /express[\/\\]lib[\/\\]view\.js$/,
        exclude: /node_modules/,
        use: "null-loader",
      },
    ],
  },

  performance: {
    maxAssetSize: 244 * 1024, // 244 KiB
    maxEntrypointSize: 244 * 1024, // 244 KiB
  },
  plugins: [
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
    }),
  ],
  resolve: {
    fallback: {
      buffer: require.resolve("buffer/"),
      zlib: require.resolve("browserify-zlib"),
      querystring: require.resolve("querystring-es3"),
      path: require.resolve("path-browserify"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      os: require.resolve("os-browserify/browser"),
      http: require.resolve("stream-http"),
      string_decoder: require.resolve("string_decoder/"),
      assert: require.resolve("assert/"),
      util: require.resolve("util/"),
      url: require.resolve("url/"),
      vm: require.resolve("vm-browserify"),
      fs: false,
      net: false,
      async_hooks: false,
    },
  },
  mode: "production",
};
