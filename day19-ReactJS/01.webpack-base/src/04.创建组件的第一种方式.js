// 1. 引包
import React from 'react';
import ReactDOM from 'react-dom';

//第一种创建组件的方式
function Hello(props) {
    // 如果在一个组件中return一个null,则表示此组件是空的，什么都不渲染。
    // return null
    // 在组件中，必须返回一个合法的JSX虚拟DOM元素
    console.log('====================================');
    console.log(props);
    console.log('====================================');
    // 结论：不论是Vue还是React，组件中的props永远都是只读的；不能被重新赋值
    return <h1 title={props.name}>{props.name}--{props.age}岁--{props.gender==1?'男':'女'}</h1>
};

const user = {
    name:"Eric",
    age:"25",
    gender:"1"
}

// 2. 调用render函数渲染，JSX,XML比HTML严格多了；
// 什么情况下需要使用{}呢？当我们需要在JSX控制的区域内，写JS表达式了，则需要把JS代码写到{}中；
// ReactDOM.render( <Hello name={user.name} age={user.age} gender={user.gender}>
//     {/*直接把组件的名称，以标签形式，丢到页面行即可*/}
// </Hello>,document.getElementById('app'));
ReactDOM.render( <Hello {...user}>
    {/*直接把组件的名称，以标签形式，丢到页面行即可*/}
</Hello>,document.getElementById('app'));

var o2 = {
    age:22,
    address:'中国北京',
    phone:'139999'
}

var o1 = {
    name:"zs",
    ...o2//展开运算符
}

console.log('====================================');
console.log(o1);
console.log('====================================');

