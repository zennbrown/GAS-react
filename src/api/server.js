export default {
  env: 'prod',
  on: (path, cb) => {
    /* global paths__ */
    paths__[path] = cb;
  }
};
