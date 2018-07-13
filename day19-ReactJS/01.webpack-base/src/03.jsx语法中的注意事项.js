// 1. 引包
import React from 'react';
import ReactDOM from 'react-dom';



let a = 10;
let b = 'Hello China';
let boo  = true;
let title = "999";
const h1 = <h1>红红火火恍恍惚惚</h1>;
const arr = [
    <h2>这是h2</h2>,
    <h3>这是h3</h3>,
];
const arrStr = ['毛利','柯南','小兰','灰原哀'];
//定义一个空数组，将来用来存放名称标签
const nameArr=[];
// 注意react中需要把key添加给被for或map或forEach直接控制的元素
arrStr.forEach(item=>{
    const temp = <h5 key={item}>{item}</h5>;
    nameArr.push(temp);
});

//数组的map方法
const result = arrStr.map(item=>{
    return item + '~~';
});
console.log(result);



// 2. 调用render函数渲染，JSX,XML比HTML严格多了；
// 什么情况下需要使用{}呢？当我们需要在JSX控制的区域内，写JS表达式了，则需要把JS代码写到{}中；
ReactDOM.render( <div> {
            a + b
        } <hr/>
        {b}
        <hr/>
        {boo?'条件为真':'条件错误'}
        <p title={title}>有标题的哦！</p>
        {h1}
        <hr/>
        {/*arr*/}
        <hr/>
        {
            //nameArr
        }
        <hr/>
        {arrStr.map(item=><h3 key={item} className="h3">{item}</h3>)}
        </div>,document.getElementById('app'));