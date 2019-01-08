const path = require("path");
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  // Changed the entry point to a .tsx file
  entry: "./server.ts",
  // Enable sourcemaps for debugging Webpack's output
  devtool: "source-map",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"],
    plugins: [new TsConfigPathsPlugin({ configFileName: './tsconfig.server.json'})]
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "server.js"
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { 
        test: /\.ts?$/, 
        loader: "awesome-typescript-loader" 
      }
    ]
  },

  // this excludes node js files that dont need to bundled
  externals: [nodeExternals()]
}