const lg = console.log;

export const gulpReactBuild = {
  start: () => lg('Converting react build into GAS friendly bundle'),
  success: (time) => lg(`Completed in ${time}ms`)
};
export const bundleServer = {
  start: () => lg('Converting server source into GAS friendly bundle'),
  success: (time) => lg(`Completed in ${time}ms`)
};
