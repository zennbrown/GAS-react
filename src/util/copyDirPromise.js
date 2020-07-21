import copyDir from 'copy-dir';

// eslint-disable-next-line no-new
const copyDirPromise = (from, to, options) => new Promise((resolve, reject) => {
  copyDir(from, to, options, (err) => {
    if (err) reject(err);
    else resolve();
  });
});

export default copyDirPromise;
