// 1. 引包
import React from 'react';
import ReactDOM from 'react-dom';

// 导入Hello组件
// 默认，如果不做单独的配置的话，不能省略.jsx名称
// import Hello from './components/Hello';

// 注意：这里的@符号，表示根目录目录中的src这一层目录
import Hello from '@/components/Hello';

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

