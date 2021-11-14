import { spawn } from 'child_process';
import { createReactApp as lg } from './logger';
import timer from '../util/timer';

export default (options) => new Promise((resolve, reject) => {
  if (options.react.skip) return resolve();
  const tm = timer().start();
  lg.start();

  const ls = spawn('npm', ['run', 'build'], { env: { ...process.env, GENERATE_SOURCEMAP: false }, shell: true });

  ls.stdout.on('data', (data) => {
    console.log(`create-react-app: ${data}`);
  });

  ls.on('close', (code) => {
    if (code >= 0) {
      lg.success(tm.end());
      return resolve();
    }
    return reject(new Error('Unable to compile react app using create-react-app'));
  });

  return null;
});
