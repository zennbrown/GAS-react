import autoExternal from 'rollup-plugin-auto-external';
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs';

module.exports = [{
  input: './src/index.js',
  output: {
    file: 'dist/gas-react.js',
    format: 'cjs',
  },
  plugins: [preserveShebangs(), autoExternal()],
}];
