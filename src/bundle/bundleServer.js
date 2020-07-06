import path from 'path';
import fs from 'fs';

import rollup from 'rollup';
import ruResolve from 'rollup-plugin-node-resolve';

import { bundleServer as lg } from './logger';
import timer from '../util/timer';

// see below for details on the options
const inputOptions = {
  input: path.join(process.cwd(), '/server/index.js'),
  plugins: [ruResolve()],
  context: process.cwd()
};
const outputOptions = {
  file: path.join(process.cwd(), '/clasp/api.js'),
  compact: true,
  format: 'es',
  globals: ['api'],
  banner: `${fs.readFileSync(path.resolve(__dirname, '../src/api/serverAppend.js'))}
{`,
  footer: '}'
};

async function build() {
  return new Promise((resolve) => {
    const tm = timer().start();
    lg.start();
    // create a bundle
    rollup.rollup(inputOptions)
      .then((bundle) => bundle.write(outputOptions))
      .then(() => {
        lg.success(tm.end());
        resolve();
      });
  });
}

export default build;
