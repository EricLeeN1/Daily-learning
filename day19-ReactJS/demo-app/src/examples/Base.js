import React, { Component } from 'react';
import { BrowserRouter as Router, Route,  Link   } from "react-router-dom";

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)
// home组件

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)
//About组件

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)
//topic组件，显示匹配的参数

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
        {/* topics/rendering */}
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
        {/* topics/components */}
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
        {/* topics/props-v-state */}
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.path}/:topicId`} component={Topic}/>
    {/* 匹配二级路由后，将标题渲染到组件里面展示 */}
    <Route exact path={match.path} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
    {/* 如果路由等于原路由的话。对应渲染请重新选择一个标题，精确匹配 */}
  </div>
)//二级路由,会自动带上父路径/topics

const BasicExample = () => (
  <Router>
    {/* 最外层要用Router包裹 */}
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li> 
        {/* // 分别对应三个组件 home about topics */}
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      {/* 默认是模糊匹配'/','about','/topics'都会显示组件home */}
      {/* exact是精确匹配 '/'就被指定对应显示组件home*/}
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </Router>
)

export default BasicExample;