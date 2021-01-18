import gulpReactBuild from './gulpReactBuild';
import bundleServer from './bundleServer';
import createReactApp from './createReactApp';
import timer from '../util/timer';
import { bundle as lg } from './logger';

const bundle = async (config) => {
  try {
    lg.start();
    const tm = timer().start();
    await createReactApp(config);
    await gulpReactBuild(config);
    await bundleServer(config);
    lg.success(tm.end());
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default bundle;
