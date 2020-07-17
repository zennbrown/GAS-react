import init from './init/init';
import bundle from './bundle/bundle';

const arg = process.argv[2];

if (arg === 'init') init();
else if (arg === 'bundle') bundle();
else console.log('unknown command. use init or bundle');
