import path from 'path';
import fs from 'fs';
import webpack from 'webpack';

import { bundleServer as lg } from './logger';
import timer from '../util/timer';

// eslint-disable-next-line consistent-return
const build = (options) => new Promise((resolve, reject) => {
  if (options.server.skip) return resolve();
  const bannerText = fs.readFileSync(path.resolve(__dirname, '../src/api/serverAppend.js')).toString();

  const tm = timer().start();
  lg.start();

  webpack({
    entry: path.join(process.cwd(), '/server/api.js'),
    plugins: [
      new webpack.BannerPlugin({ banner: bannerText, raw: true })
    ],
    output: {
      filename: 'path.js',
      path: path.join(process.cwd(), 'clasp'),
    },
  }, (err, stats) => { // [Stats Object](#stats-object)
    if (err || stats.hasErrors()) {
      reject();
    }

    lg.success(tm.end());
    resolve();
  });
});

export default build;
