//webpack入口文件，假设main.js还是我们的入口文件
// console.log('o1122');
// webpack-dev-server 打包好的main.js是托管到了内存中；所以在项目根目录中看不到；
// 但是我们可以认为，在项目根目录中，有一个看不见的main.js

// 1. 导入包
// 这个导入时候，接受的成员名称，必须这么写;
import React from 'react'; // 创建组件、虚拟DOM元素，生命周期
import ReactDOM from 'react-dom';// 把创建好的组件和虚拟DOM放到页面上展示的 


//2. 创建虚拟DOM元素
// 这是创建虚拟DOM元素的API <h1 title="啊，五环" id="myh1">你比四环多一环</h1>
// 第一个参数：字符串类型的参数，表示要创建的标签的名称
// 第二个参数：对象类型的参数或null，表示创建的元素的属性节点
// 第三个参数：子节点(包括其他虚拟DOM获取文本子节点)
// 参数n：其他子节点
// <h1 title="啊，五环" id="myh1">你比四环多一环</h1>
const myh1 = React.createElement('h1', {
    title: '啊，五环',
    id: "myh1"
}, "你比四环多一环");

const mydiv = React.createElement('div',null,'这是一个div元素',myh1); 

//3. 渲染虚拟元素到页面上
// 参数1：要渲染的那个虚拟DOM元素
// 参数2：指定页面上一个容器做容器，是一个DOM元素而不是选择器

ReactDOM.render(mydiv,document.getElementById('app'));

