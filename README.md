# website-godson

[![Javascript Version][javascript-image]][javascript-url]
[![React Version][reactjs-image]][reactjs-url]
[![Firebase Version][firebase-image]][firebase-url]
[![Material UI Version][material-ui-image]][material-ui-url]
[![License][license-image]][license-url]

Visit website [here](https://gottsohn.github.io).

## Overview
 - React
 - Material UI
 - Webpack

### React by default
The project runs with React by default and hot replacement of changes to the modules.

### CSS Modules
CSS files loaded into components are locally scoped and you can point to class names with javascript. You can also compose classes together, also from other files. These are also hot loaded. Read more about them [here](http://glenmaddern.com/articles/css-modules).

To turn off CSS Modules remove it from the `webpack.config.js` file.

### Babel and Linting
Both Node server and frontend code runs with Babel. And all of it is linted. With atom you install the `linter` package, then `linter-eslint` and `linter-jscs`. You are covered. Also run `npm run eslint` or `npm run jscs` to verify all files. I would recommend installing `language-babel` package too for syntax highlighting

[javascript-image]:https://img.shields.io/badge/Javascript-ES6-yellow.svg
[javascript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[reactjs-image]:https://img.shields.io/badge/ReactJS-15.1.0-blue.svg
[reactjs-url]: https://facebook.github.io/react
[firebase-image]:https://img.shields.io/badge/Firebase-3.0.4-orange.svg
[firebase-url]: https://firebase.google.com
[material-ui-image]:https://img.shields.io/badge/Material--UI-0.15.0-lightgrey.svg
[material-ui-url]: https://material-ui.org
[license-image]: https://img.shields.io/badge/License-MIT-red.svg
[license-url]: LICENSE
