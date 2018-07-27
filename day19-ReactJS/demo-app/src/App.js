import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ParamsExample from './examples/url-params.js';
import BasicExample from './examples/Base.js';
import AuthExample from './examples/Redirects';



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {/* <BasicExample></BasicExample> */}
        <ParamsExample></ParamsExample>
        {/* <AuthExample></AuthExample> */}
      </div>
    );
  }
}

export default App;