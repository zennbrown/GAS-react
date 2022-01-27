import path from 'path';
import fs from 'fs';
import webpack from 'webpack';

import { bundleServer as lg } from './logger';
import timer from '../util/timer';

// eslint-disable-next-line consistent-return
const build = async (options) => new Promise((resolve, reject) => {
  if (options.server.skip) return resolve();
  const bannerText = fs.readFileSync(path.resolve(__dirname, '../src/api/serverAppend.js')).toString();

  const tm = timer().start();
  lg.start();

  const tsPath = path.join(process.cwd(), '/server/index.ts');
  const jsPath = path.join(process.cwd(), '/server/index.js');

  const entry = fs.existsSync(tsPath) ? tsPath : jsPath;

  if (!entry) {
    return reject(new Error('Unable to resolve entry file server/index.(js/ts)'));
  }

  const loaderPath = require.resolve('ts-loader');

  const tsConfigPath = path.resolve(process.cwd(), './server/tsconfig.json');

  webpack({
    entry,
    cache: false,
    mode: 'production',
    resolve: {
      extensions: ['.ts', '.js']
    },
    context: path.resolve(__dirname, '../'),
    target: ['es2020'],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: loaderPath,
          options: {
            context: path.resolve(process.cwd(), './server/'),
            configFile: tsConfigPath
          }
        }
      ]
    },
    optimization: {
      minimize: false
    },
    plugins: [
      new webpack.BannerPlugin({ banner: bannerText, raw: true })
    ],
    output: {
      filename: 'api.js',
      chunkFormat: false,
      path: path.join(process.cwd(), 'clasp'),
    },
  }, (err, stats) => { // [Stats Object](#stats-object)
    if (err) {
      reject(err);
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
      reject(new Error('Unable to compile server'));
      return;
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    // Log result...
    lg.success(tm.end());
    resolve();
  });
});

export default build;
