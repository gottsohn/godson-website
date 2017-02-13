const fs = require('fs'),
    ReactTools = require('react-tools'),
    origJs = require.extensions['.jsx'];

// A module that exports a single, stubbed-out React Component.
const reactStub = 'module.exports = require("react").createClass({render:function(){return null;}});';

// Should this file be stubbed out for testing?
const shouldStub = (filename) => {
  'use strict';
  if (!global.reactModulesToStub) return false;
  // Check if the file name ends with any stub path.
  var stubs = global.reactModulesToStub;
  for (var i = 0; i < stubs.length; i++) {
    if (filename.substr(-stubs[i].length) == stubs[i]) {
      return true;
    }
  }
  return false;
};

// Transform a file via JSX/Harmony or stubbing.
const transform = (filename) => {
  'use strict';
  if (shouldStub(filename)) {
    return reactStub;
  } else {
    var content = fs.readFileSync(filename, 'utf8');
    return ReactTools.transform(content, {harmony: true});
  }
};

// Install the compiler.
require.extensions['.jsx'] = (module, filename) => {
  'use strict';
  // optimization: code in a distribution should never go through JSX compiler.
  if (filename.indexOf('node_modules/') >= 0) {
    return (origJs || require.extensions['.jsx'])(module, filename);
  }

  return module._compile(transform(filename), filename);
};

module.exports = {
  transform: transform,
  shouldStub: shouldStub
};
