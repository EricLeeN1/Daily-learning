import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ParamsExample from './examples/url-params.js';
import BasicExample from './examples/Base.js';
import AuthExample from './examples/Redirects';
import CustomLinkExample from './examples/Custom-Link';
import PreventingTransitionsExample from './examples/preventing-transitions';
import NoMatchExample from './examples/no-match';
import RecursiveExample from './examples/recursive-paths';
import SidebarExample from './examples/sidebar';
import AnimationExample from './examples/animated-transitions';
import AmbiguousExample from './examples/ambiguous-matches';
import RouteConfigExample from './examples/route-config';
import ModalGallery from './examples/modal-gallery';
import StaticRouterExample from './examples/static-router';



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
        {/* <ParamsExample></ParamsExample> */}
        {/* <AuthExample></AuthExample> */}
        {/* <CustomLinkExample></CustomLinkExample> */}
        {/* <PreventingTransitionsExample></PreventingTransitionsExample> */}
        {/* <NoMatchExample></NoMatchExample> */}
        {/* <RecursiveExample></RecursiveExample> */}
        {/* <SidebarExample></SidebarExample> */}
        {/* <AnimationExample></AnimationExample> */}
        {/* <AmbiguousExample></AmbiguousExample> */}
        {/* <RouteConfigExample></RouteConfigExample> */}
        {/* <ModalGallery></ModalGallery> */}
        {/* <StaticRouterExample></StaticRouterExample> */}
      </div>
    );
  }
}

export default App;