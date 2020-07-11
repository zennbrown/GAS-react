#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = _interopDefault(require('path'));
var copyDir = _interopDefault(require('copy-dir'));
var cls = _interopDefault(require('cli-select'));
var clc = _interopDefault(require('cli-color'));
var fs$1 = _interopDefault(require('fs'));
var rollup = _interopDefault(require('rollup'));
var ruResolve = _interopDefault(require('rollup-plugin-node-resolve'));
var child_process = require('child_process');

const fs = require('fs');

const updatePackageJson = () => new Promise((resolve) => {
  const jsonPath = path.join(process.cwd(), '/package.json');
  fs.readFile(jsonPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    } else {
      const obj = JSON.parse(data); // now it an object
      obj.scripts.build = 'gas-react bundle';
      const json = JSON.stringify(obj, null, 2); // convert it back to json
      fs.writeFile(jsonPath, json, 'utf8', (err1) => { // write it back
        if (err1) throw err1;
        resolve();
      });
    }
  });
});

// eslint-disable-next-line no-new
const copyDirPromise = (from, to, options) => new Promise((resolve) => {
  copyDir(from, to, options, (err) => {
    if (err) {
      throw err;
    }
    resolve();
  });
});

const copyProjectDirectory = () => (copyDirPromise(path.join(__dirname, '../copy'), process.cwd(), {
  utimes: true, // keep add time and modify time
  mode: true, // keep file mode
  cover: true // cover file when exists, default is true
}));

const openingQuestion = () => cls({
  values: ['Yes', 'No'],
  valueRenderer: (value, selected) => {
    if (selected) {
      return clc.red(value);
    }
    return value;
  },
  cleanup: false,
});

const openingAnswer = (answer) => new Promise((resolve, reject) => {
  if (answer.value === 'Yes') resolve();
  else {
    console.log('okay we hope to see you again');
    reject();
  }
});

const checkReactApp = () => new Promise((resolve, reject) => {
  const appjsPath = path.join(process.cwd(), '/src/App.js');
  if (fs$1.existsSync(appjsPath)) {
    resolve();
  } else reject('You need to run this from a react project route directory');
});

const init = () => {
  console.log('Hey, are you ready to googlify your react App?');
  checkReactApp()
    .then(openingQuestion)
    .then(openingAnswer)
    .then(copyProjectDirectory)
    .then(updatePackageJson)
    .then(() => console.log('done'))
    .catch(console.error);
  // ask if they wish to add sample hello world app
};

const lg = console.log;

const gulpReactBuild = {
  start: () => lg('Converting react build into GAS friendly bundle'),
  success: (time) => lg(`Completed in ${time}ms`)
};
const bundle = {
  start: () => lg('Okay.... Lets GAS this app!'),
  success: (time) => lg(`Your app is GASSED. Complete in ${time}ms`)
};
const bundleServer = {
  start: () => lg('Converting server source into GAS friendly bundle'),
  success: (time) => lg(`Completed in ${time}ms`)
};
const createReactApp = {
  start: () => lg('Building productionized React App using create-react-app'),
  success: (time) => lg(`Completed in ${time}ms`)
};

var timer = () => {
  const time = Date.now();
  return { start: () => ({ end: () => Date.now() - time }) };
};

const gulp = require('gulp');
const inlinesource = require('gulp-inline-source');
const replace = require('gulp-replace');

// do some error handling

const gulpReactBuild$1 = () => new Promise((resolve) => {
  const tm = timer().start();
  gulpReactBuild.start();
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
      gulpReactBuild.success(tm.end());
      resolve();
    });
});

// see below for details on the options
const inputOptions = {
  input: path.join(process.cwd(), '/server/index.js'),
  plugins: [ruResolve()],
  context: process.cwd()
};
const outputOptions = {
  file: path.join(process.cwd(), '/clasp/api.js'),
  compact: true,
  format: 'es',
  globals: ['api'],
  banner: `${fs$1.readFileSync(path.resolve(__dirname, '../src/api/serverAppend.js'))}
{`,
  footer: '}'
};

async function build() {
  return new Promise((resolve) => {
    const tm = timer().start();
    bundleServer.start();
    // create a bundle
    rollup.rollup(inputOptions)
      .then((bundle) => bundle.write(outputOptions))
      .then(() => {
        bundleServer.success(tm.end());
        resolve();
      });
  });
}

var createReactApp$1 = () => new Promise((resolve, reject) => {
  const tm = timer().start();
  createReactApp.start();
  const ls = child_process.spawnSync('react-scripts', ['build'], { env: { ...process.env, GENERATE_SOURCEMAP: false }, shell: true });
  if (ls.error) reject(ls.error);
  else {
    createReactApp.success(tm.end());
    resolve();
  }
});

const parseOptions = (options) => {
  if (typeof options.reactBuildDirectory !== 'string') throw new Error('reactBuildDirectory must be a string');
};

const defaults = {
  reactBuildDirectory: '/build/'
};

const bundle$1 = (_options = {}) => {
  bundle.start();
  const tm = timer().start();
  const options = { ...defaults, ..._options };
  parseOptions(options);
  createReactApp$1()
    .then(() => gulpReactBuild$1())
    .then(() => build())
    .then(() => bundle.success(tm.end()))
    .catch(console.log);
};

const arg = process.argv[2];

if (arg === 'init') init();
else if (arg === 'bundle') bundle$1();
else console.log('unknown command. use init or bundle');
