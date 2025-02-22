// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require('dotenv').config();

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/helloworld.html",
      filename: "helloworld.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/talktoanadvisor.html",
      filename: "talktoanadvisor.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pcra.html",
      filename: "pcra.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/403b.html",
      filename: "403b.html",
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed)
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
