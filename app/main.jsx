import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import backgroundImage from 'file!./images/background.png';
import {} from 'file?name=favicon.ico!./favicon.ico';

document.body.style.backgroundImage = `url("${backgroundImage}")`;
ReactDOM.render(<App />, document.getElementById('root'));
