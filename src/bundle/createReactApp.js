import { spawnSync } from 'child_process';
import { createReactApp as lg } from './logger';
import timer from '../util/timer';

export default (options) => new Promise((resolve, reject) => {
  if (options.skipReact) return resolve();
  const tm = timer().start();
  lg.start();
  const ls = spawnSync('react-scripts', ['build'], { env: { ...process.env, GENERATE_SOURCEMAP: false }, shell: true });
  if (ls.error) reject(ls.error);
  else {
    lg.success(tm.end());
    resolve();
  }
});
