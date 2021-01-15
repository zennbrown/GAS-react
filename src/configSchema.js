const _property = true;
const _parent = true;

export default {
  server: {
    _parent,
    compress: {
      _property, default: true, types: ['boolean'], cla: { name: 'compress', type: Boolean, alias: 'c' }
    },
    skip: {
      _property, default: false, types: ['boolean'], cla: { name: 'skip-server', type: Boolean, alias: 's' }
    },
  },
  react: {
    _parent,
    skip: {
      _property, default: false, types: ['boolean'], cla: { name: 'skip-react', type: Boolean, alias: 'r' }
    }
  },
  output: {
    _parent,
    directory: {
      _property, default: 'clasp', types: ['string'], cla: { name: 'output-directory', type: String, alias: 'o' }
    }
  }
};
