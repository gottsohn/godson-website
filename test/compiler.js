const babel = require('babel-core');
const fs = require('fs');

// borrowed from https://github.com/babel/babel-jest/blob/master/index.js
const es6compiler = (module, filename) => {
  'use strict';

  // Ignore all files within node_modules
  if (!~filename.indexOf('node_modules') && babel.util.canCompile(filename)) {
    const src = fs.readFileSync(filename, 'utf8');
    const compiled = babel.transform(src, {
      filename: filename,
      presets: ['react', 'es2015', 'stage-0']
    }).code;

    return module._compile(compiled, filename);
  }

  return module;
};

require.extensions['.jsx'] = es6compiler;
require.extensions['.css'] = () => null;
