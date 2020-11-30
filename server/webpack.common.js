/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  target: "node",
  entry: { main: path.resolve(__dirname, "src/index.ts") },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "node-bundle.js",
    devtoolModuleFilenameTemplate: '[absolute-resource-path]'
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: [".ts", ".js"],
  },
};
