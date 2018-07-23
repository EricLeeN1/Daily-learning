import React from 'react';
import ReactDOM from 'react-dom';

import './assets/_sprites.scss';

import Hello from './components/index';

console.log('Hello world');

console.log('Running App version ' + VERSION);
if (BROWSER_SUPPORTS_HTML5) {
    console.log('支持html5');
}

const user = {
    name: "123",
    gender: 1,
    age: 18
}

ReactDOM.render( < Hello {...user} / > , document.getElementById('app'));