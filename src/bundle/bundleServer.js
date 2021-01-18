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

  webpack({
    entry: path.join(process.cwd(), '/server/index.js'),
    mode: 'production',
    plugins: [
      new webpack.BannerPlugin({ banner: bannerText, raw: true })
    ],
    output: {
      filename: 'api.js',
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
