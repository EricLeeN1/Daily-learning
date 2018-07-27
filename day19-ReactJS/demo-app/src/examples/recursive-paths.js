import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// 递归路径
const PEEPS = [
  { id: 0, name: "Michelle", friends: [1, 2, 3] },
  { id: 1, name: "Sean", friends: [0, 3] },
  { id: 2, name: "Kim", friends: [0, 1, 3] },
  { id: 3, name: "David", friends: [1, 2] }
];

const find = id => PEEPS.find(p => p.id == id);

const RecursiveExample = () => (
  <Router>
    <Person match={{ params: { id: 0 }, url: "" }} />
  </Router>
);
// 默认执行第一个人的朋友信息展示
// 之后链接其余人的时候用的是id来匹配。通过iD再次调用自身。

const Person = ({ match }) => {
  const person = find(match.params.id);
  console.log('====================================');
  console.log(person);
  console.log('====================================');
  return (
    <div>
      <h3>{person.name}’s Friends</h3>
      <ul>
        {person.friends.map(id => (
          <li key={id}>
            <Link to={`${match.url}/${id}`}>{find(id).name}</Link>
          </li>
        ))}
      </ul>
      <Route path={`${match.url}/:id`} component={Person} />
    </div>
  );
};

export default RecursiveExample;