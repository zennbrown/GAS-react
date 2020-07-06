import autoExternal from 'rollup-plugin-auto-external';
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs';

module.exports = [{
  input: './src/bin.js',
  output: {
    file: 'dist/bin.js',
    format: 'cjs',
  },
  plugins: [preserveShebangs(), autoExternal()],
},
{
  input: './src/entry.js',
  output: {
    file: 'dist/entry.js',
    format: 'es',
  },
  plugins: [preserveShebangs(), autoExternal()],
}];
