export default {
  env: 'prod',
  on: (path, cb) => {
    /* global paths__ */
    paths__[path] = cb;
  },
  before: (cb) => {
    /* global mwBefore__ */
    mwBefore__.push(cb);
  },
  after: (cb) => {
    /* global mwAfter__ */
    mwAfter__.push(cb);
  },
};
