import autoExternal from 'rollup-plugin-auto-external';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';

module.exports = [{
  external: ['path', 'fs'],
  input: './src/bin.js',
  output: {
    banner: '#!/usr/bin/env node', // Add bin shebangs
    file: 'dist/bin.js',
    format: 'cjs',
    plugins: [getBabelOutputPlugin({
      presets: [
        ['@babel/preset-env', {
          targets: {
            node: '10'
          }
        }]
      ]
    })]
  },
  plugins: [autoExternal()]
},
{
  input: './src/entry.js',
  output: {
    file: 'dist/entry.js',
    format: 'es',
  },
  plugins: [autoExternal()],
}];
