import gulpReactBuild from './gulpReactBuild';
import bundleServer from './bundleServer';

const parseOptions = (options) => {
  if (typeof options.reactBuildDirectory !== 'string') throw new Error('reactBuildDirectory must be a string');
};

const defaults = {
  reactBuildDirectory: '/build/'
};

const bundle = (_options = {}) => {
  const options = { ...defaults, ..._options };
  parseOptions(options);
  gulpReactBuild(options)
    .then(() => bundleServer(options))
    .then(() => console.log('success'))
    .catch((err) => console.log(err));
};

export default bundle;
