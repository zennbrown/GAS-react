import path from 'path';
import { gulpReactBuild as lg } from './logger';
import timer from '../util/timer';

const gulp = require('gulp');
const inlinesource = require('gulp-inline-source');
const replace = require('gulp-replace');

// do some error handling

const gulpReactBuild = () => new Promise((resolve) => {
  const tm = timer().start();
  lg.start();
  const input = path.join(process.cwd(), '/build/index.html');
  const output = path.join(process.cwd(), '/clasp/');
  gulp.src(input)
    .pipe(replace('.js"></script>', '.js" inline></script>'))
    .pipe(replace('rel="stylesheet">', 'rel="stylesheet" inline>'))
    .pipe(inlinesource({
      compress: false,
      ignore: ['png'],
    }))
    .pipe(gulp.dest(output))
    .on('end', (err) => {
      if (err) console.log(err);
      lg.success(tm.end());
      resolve();
    });
});
export default gulpReactBuild;
