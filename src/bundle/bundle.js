import gulpReactBuild from './gulpReactBuild';
import bundleServer from './bundleServer';
import createReactApp from './createReactApp';
import timer from '../util/timer';
import { bundle as lg } from './logger';

const parseOptions = (options) => {
  if (typeof options.reactBuildDirectory !== 'string') throw new Error('reactBuildDirectory must be a string');
};

const defaults = {
  reactBuildDirectory: '/build/'
};

const bundle = (_options = {}) => {
  lg.start();
  const tm = timer().start();
  const options = { ...defaults, ..._options };
  parseOptions(options);
  createReactApp(options)
    .then(() => gulpReactBuild(options))
    .then(() => bundleServer(options))
    .then(() => lg.success(tm.end()))
    .catch(console.log);
};

export default bundle;
