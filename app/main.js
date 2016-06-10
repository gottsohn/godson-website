import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import backgroundImage from 'file!./images/background.png';

document.body.style.backgroundImage = `url("${backgroundImage}")`;
ReactDOM.render(<App />, document.getElementById('root'));
