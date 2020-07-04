import fs from 'fs';
import path from 'path';

const checkReactApp = () => new Promise((resolve, reject) => {
  const appjsPath = path.join(process.cwd(), '/src/App.js');
  if (fs.existsSync(appjsPath)) {
    resolve();
  } else reject('You need to run this from a react project route directory');
});

export default checkReactApp;
