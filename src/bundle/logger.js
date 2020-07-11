const lg = console.log;

export const gulpReactBuild = {
  start: () => lg('Converting react build into GAS friendly bundle'),
  success: (time) => lg(`Completed in ${time}ms`)
};
export const bundle = {
  start: () => lg('Okay.... Lets GAS this app!'),
  success: (time) => lg(`Your app is GASSED. Complete in ${time}ms`)
};
export const bundleServer = {
  start: () => lg('Converting server source into GAS friendly bundle'),
  success: (time) => lg(`Completed in ${time}ms`)
};
export const createReactApp = {
  start: () => lg('Building productionized React App using create-react-app'),
  success: (time) => lg(`Completed in ${time}ms`)
};
