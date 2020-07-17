import gulpReactBuild from './gulpReactBuild';
import bundleServer from './bundleServer';
import createReactApp from './createReactApp';
import timer from '../util/timer';
import { bundle as lg } from './logger';
import getConfig from './getConfig';
import defaultOptions from './defaultOptions';

const parseOptions = (options) => {
  if (typeof options.compress !== 'boolean') throw new Error('compress must be a boolean');
};

const bundle = async (_options = {}) => {
  try {
    const config = await getConfig();
    lg.start();
    const tm = timer().start();
    const options = { ...defaultOptions, ...config, ..._options };
    parseOptions(options);
    await createReactApp(options);
    await gulpReactBuild(options);
    await bundleServer(options);
    lg.success(tm.end());
  } catch (err) {
    console.log(err);
  }
};

export default bundle;
