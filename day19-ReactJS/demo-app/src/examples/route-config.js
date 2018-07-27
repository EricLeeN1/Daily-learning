import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// 路由配置
// Some folks find value in a centralized route config.
// A route config is just data. React is great at mapping
// data into components, and <Route> is a component.

////////////////////////////////////////////////////////////
// first our route components
const Main = () => <h2>Main</h2>;

const Sandwiches = () => <h2>Sandwiches</h2>;

const Tacos = ({ routes }) => (
  <div>
    <h2>Tacos</h2>
    <ul>
      <li>
        <Link to="/tacos/bus">Bus</Link>
      </li>
      <li>
        <Link to="/tacos/cart">Cart</Link>
      </li>
    </ul>

    {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
  </div>
);
// 渲染对应的Tacos组件里面包含了子路由

const Bus = () => <h3>Bus</h3>;
const Cart = ({ routes }) => (<div>
    <h3>Cart</h3>
    <ul>
        <li>
            <Link to="/tacos/cart/bench">Bench</Link>
        </li>
        <li>
            <Link to="/tacos/cart/ford">Ford</Link>
        </li>
    </ul>
    {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
</div>);
const Bench = () => <h4>Bench</h4>;
const Ford = () => <h4>Ford</h4>;

////////////////////////////////////////////////////////////
// then our route config
const routes = [
  {
    path: "/sandwiches",
    component: Sandwiches
  },
  {
    path: "/tacos",
    component: Tacos,
    routes: [
      {
        path: "/tacos/bus",
        component: Bus
      },
      {
        path: "/tacos/cart",
        component: Cart,
        routes:[
           {
            path: "/tacos/cart/ford",
            component: Ford,
           },
           {
            path: "/tacos/cart/bench",
            component: Bench,
           }
        ]
      }
    ]
  }
];

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )}
  />
);
//根据路由返回来的路径渲染出路由组件路径对应配置文件中的path,如果遍历项中有routes的话继续传递。

const RouteConfigExample = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/tacos">Tacos</Link>
        </li>
        <li>
          <Link to="/sandwiches">Sandwiches</Link>
        </li>
      </ul>

      {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
    </div>
  </Router>
);

export default RouteConfigExample;