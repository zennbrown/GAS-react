import path from 'path';

const fs = require('fs');

const getConfig = () => new Promise((resolve) => {
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

export default getConfig;
