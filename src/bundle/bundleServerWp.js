import path from 'path';

import GasPlugin from 'gas-webpack-plugin';
import { bundleServer as lg } from './logger';

const input = path.join(process.cwd(), '/server/index.js');
const output = path.join(process.cwd(), '/clasp/');

const webpack = require('webpack');

const bundleServer = () => new Promise((resolve, reject) => {
  lg.start();
  webpack({
    mode: 'production',
    devtool: false,
    context: process.cwd(),
    entry: input,
    plugins: [
      new GasPlugin(),
    ],
    output: {
      path: output,
      filename: 'Code.js',
    },
    optimization: {
      minimize: false
    /* minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          compress: { defaults: false, top_retain: true },

          output: { max_line_len: 100 },
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        },
      })]
      */
    },
  }, (err, stats) => { // Stats Object
    if (err || stats.hasErrors()) reject(err || stats);
    else {
      lg.success();
      resolve();
    }
  // Done processing
  });
});

export default bundleServer;
