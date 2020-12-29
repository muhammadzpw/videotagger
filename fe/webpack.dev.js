const merge = require('webpack-merge');
const common = require('./webpack.common');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// This config is used for development. It will watch for changes using webpack-dev-server
// The scrip "buildDev" is for PoC purpose only. There should be no real use-case in which we need the output
// outside webpack-dev-server.
module.exports = merge(common, {
  mode: 'development',

  // 'eval' is not supported by error-overlay-webpack-plugin.
  // We need special cases option of SourceMap, i.e. for some 3rd party tools, So we use cheap-module-source-map.
  // A SourceMap without column-mappings that simplifies loader Source Maps to a single mapping per line.
  // See https://webpack.js.org/configuration/devtool/#special-cases
  // --
  // When there's error, it will produce error, for example:
  // "Uncaught TypeError: Cannot read property 'xxx' of undefined at Module.2YZa (index.tsx:32)"
  devtool: 'cheap-module-source-map',

  devServer: {
    port: 3000,
    historyApiFallback: true,
    contentBase: './dist',
  },

  plugins: [
    new Dotenv({
      path: './.env',
      safe: true,
      systemvars: false,
      silent: true,
      defaults: true,
    }),
    new MiniCssExtractPlugin({
      // Still unknown: it's extracting all CSS into single files (except for CSS in dynamically imported module).
      // Fortunately, that should be good for performance.
      // From the docs,  extracting all CSS into single file requires another config:
      // https://github.com/webpack-contrib/mini-css-extract-plugin#extracting-all-css-in-a-single-file
      filename: '[name].css',
    }),
    // See webpack.prod.js to see why we need this
    new webpack.DefinePlugin({
      APP_VERSION: JSON.stringify('dev'),
    }),
  ],

  // Source: https://hackernoon.com/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
  optimization: {
    // Without `runtimeChunk`, the hash value(s) will be different even though there's no update.
    // This is because webpack includes certain boilerplate, specifically the runtime and manifest, in the entry chunk.
    // With this, we centralize the runtime and manifest into one file so the content will stay the same if there's no update, hence same hash.
    // https://webpack.js.org/guides/caching/
    runtimeChunk: 'single',

    splitChunks: {
      // Indicates which chunks will be selected for optimization. Unless we have exception, we should provide `all`
      // because it means that chunks can be shared even between async and non-async chunks.
      // https://webpack.js.org/plugins/split-chunks-plugin/#splitchunkschunks
      chunks: 'all',

      // Everything else will use defaults from webpack
      // Maximum 3 files (unless it's dynamic import)
      // Minimum file size of 30 KB (all smaller files would be joined together, again unless it's dynamic import)
    },
  },
});
