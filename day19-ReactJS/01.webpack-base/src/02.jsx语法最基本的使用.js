import React from 'react';
import ReactDOM from "react-dom";

// const mydiv = React.createElement('div', {
//     id: "myDiv",
//     title: "div aaa"
// }, '合适一个div');

// html是最优秀的标记语言、
// 在JS文件中，默认不能写这样类似HTML的标记，否则打包会失败。
// 可以使用babel来转化比你这些JS中的标签；
// 大家注意：这种在JS中，混合写入类似于html的语法叫做JSX;符合XML规范的JS；
// JSX语法的本质，还是在运行的时候，被转换成了const mydiv = React.createElement()形式来写；
const mydiv = <div id ="mydiv" title="divaaa">这是一个div元素</div>;

ReactDOM.render(mydiv,document.getElementById('app'))