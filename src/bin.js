import init from './init/init';
import bundle from './bundle/bundle';
import getConfig from './getConfig';

const commandLineArgs = require('command-line-args');

/* first - parse the main command */
const mainDefinitions = [
  { name: 'command', defaultOption: true }
];
const mainOptions = commandLineArgs(mainDefinitions, { stopAtFirstUnknown: true });
const argv = mainOptions._unknown || [];
getConfig(argv).then((config) => {
  switch (mainOptions.command) {
    case 'init': return init(config);
    case 'bundle': return bundle(config);
    default: console.log('Unknown command. use init or bundle');
  }
}).catch(console.log);
