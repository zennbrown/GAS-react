import path from 'path';

const fs = require('fs');

const updatePackageJson = () => new Promise((resolve) => {
  const jsonPath = path.join(process.cwd(), '/package.json');
  fs.readFile(jsonPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    } else {
      const obj = JSON.parse(data); // now it an object
      obj.scripts.bundle = 'gas-react bundle';
      const json = JSON.stringify(obj, null, 2); // convert it back to json
      fs.writeFile(jsonPath, json, 'utf8', (err1) => { // write it back
        if (err1) throw err1;
        resolve();
      });
    }
  });
});

export default updatePackageJson;
