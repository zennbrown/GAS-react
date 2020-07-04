import copyDir from 'copy-dir';

// eslint-disable-next-line no-new
const copyDirPromise = (from, to, options) => new Promise((resolve) => {
  copyDir(from, to, options, (err) => {
    if (err) {
      throw err;
    }
    resolve();
  });
});

export default copyDirPromise;
