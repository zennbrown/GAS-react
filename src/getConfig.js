import path from 'path';
import fs from 'fs';
import Options from 'ez-options';
import commandLineArgs from 'command-line-args';

import configSchema from './configSchema';

const getConfigJson = () => new Promise((resolve) => {
  const jsonPath = path.join(process.cwd(), '/gas.config.json');
  fs.readFile(jsonPath, 'utf8', (err, data) => {
    if (err) {
      resolve({});
    } else {
      const obj = JSON.parse(data);
      resolve(obj);
    }
  });
});

const getConfig = async (argv) => {
  const options = new Options(configSchema);
  const config = await getConfigJson();
  const [claDefs, inflate] = options.flat((el) => [el.cla.name, el.cla]);
  const claFlat = commandLineArgs(claDefs, { argv });
  const claInflated = inflate(claFlat);
  options.merge(config, claInflated);
  return options;
};

export default getConfig;
