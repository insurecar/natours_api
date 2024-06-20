const path = require("path");

module.exports = {
  entry: "./server.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
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
