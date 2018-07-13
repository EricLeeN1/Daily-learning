// 1. 引包
import React from 'react';

//第一种创建组件的方式
export default function Hello(props) {//创建并暴露组件
    // 如果在一个组件中return一个null,则表示此组件是空的，什么都不渲染。
    // return null
    // 在组件中，必须返回一个合法的JSX虚拟DOM元素
    console.log('====================================');
    console.log(props);
    console.log('====================================');
    // 结论：不论是Vue还是React，组件中的props永远都是只读的；不能被重新赋值
    return <h1 title={props.name}>{props.name}--{props.age}岁--{props.gender == 1 ? '男' : '女'}</h1>
};

//把组件暴露出去
// export default Hello;