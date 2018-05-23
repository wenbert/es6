const path = require("path");

module.exports = {
  mode: 'development',
  entry: "./src/js/base.js",
  output: {
    //path: path.resolve(__dirname, "public"),
    path: path.resolve(__dirname),
    filename: "base.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["babel-preset-env"]
          }
        }
      }
    ]
  }
};