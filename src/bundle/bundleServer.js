import path from 'path';
import fs from 'fs';

import rollup from 'rollup';
import ruResolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

import { bundleServer as lg } from './logger';
import timer from '../util/timer';

const terserOptions = {
  mangle: {
    reserved: ['doGet', 'apiListener'],
    toplevel: false
  },
  compress: {
    toplevel: false,
    unused: false
  }
};

async function build(options) {
  if (options.skipServer) return Promise.resolve();
  // see below for details on the options
  const inputOptions = {
    input: path.join(process.cwd(), '/server/index.js'),
    plugins: [ruResolve(), options.compress && terser(terserOptions)],
    context: process.cwd()
  };
  const outputOptions = {
    file: path.join(process.cwd(), '/clasp/api.js'),
    compact: false,
    format: 'es',
    globals: ['api'],
    banner: `${fs.readFileSync(path.resolve(__dirname, '../src/api/serverAppend.js'))}{`,
    footer: '}'
  };

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
