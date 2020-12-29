const merge = require('webpack-merge');
const common = require('./webpack.common');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// This config will produce production build using optimization strategy that will combine node_modules
// into one bundle except if they are imported dynamically.
module.exports = merge(common, {
  mode: 'production',

  // "A separate source map is generated and no link from bundled code to source map file
  // Source: https://webpack.js.org/configuration/devtool/#production
  // --
  // Differences between 'hidden-source-map' and 'source-map':
  // 'hidden-source-map': "Uncaught TypeError: Cannot read property 'xxx' of undefined at eval (main.js:1)"
  //  secure, if we want to know the source down to line number, we must trace it using the map file (usually upload it to error reporting service)
  // 'source-map': "Uncaught TypeError: Cannot read property 'xxx' of undefined at eval (index.tsx:8)"
  //  not secure, user can see it (if it's uploaded)
  devtool: 'hidden-source-map',

  plugins: [
    new Dotenv({
      path: './.env',
      safe: true,
      systemvars: true,
      defaults: true,
    }),

    new MiniCssExtractPlugin({
      // Still unknown: it's extracting all CSS into single files (except for CSS in dynamically imported module).
      // Fortunately, that should be good for performance.
      // From the docs,  extracting all CSS into single file requires another config:
      // https://github.com/webpack-contrib/mini-css-extract-plugin#extracting-all-css-in-a-single-file
      filename: '[name].[contenthash].css',
    }),

    // So we will be able to type APP_VERSION on dev console to get app version.
    // Why not merge it with dotenv-webpack? dotenv is for "external" constants, VERSION is "internal" constants.
    // In the future, this might need upgrade if we want to include commit hash in this VERSION string.
    // Will need to work with infra team on how to approach it.
    new webpack.DefinePlugin({
      APP_VERSION: JSON.stringify('0.0.1'),
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
