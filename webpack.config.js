const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: "./src/index.js", // Adjust the entry point according to your project
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "bundle.js", // Output filename
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply this loader to .js files
        exclude: /node_modules/, // Exclude node_modules directory
        use: {
          loader: "babel-loader", // Use Babel for JavaScript files
        },
      },
    ],
  },
  node: {
    module: "empty", // Treat 'module' import as empty
  },
  plugins: [
    // Replace original require statement for pdf.worker.js
    new webpack.NormalModuleReplacementPlugin(
      /worker-loader!\.\/build\/pdf\.worker\.js$/,
      "worker-loader?esModule=false!" +
        path.join(
          __dirname,
          "node_modules",
          "pdfjs-dist",
          "build",
          "pdf.worker.js"
        )
    ),
    // Ignore warnings about missing WASM modules
    new webpack.IgnorePlugin({ resourceRegExp: /FetchCompileWasmPlugin$/ }),
    new webpack.IgnorePlugin({
      resourceRegExp: /FetchCompileAsyncWasmPlugin$/,
    }),
  ],
};
