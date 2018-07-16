// 1. 引包
import React from 'react';
import ReactDOM from 'react-dom';

// 2.导入文件
import Movie from './10.class-class关键字创建组件';

const user = {
    name:"zs",
    age:22,
    gender:"男"
}

// 3.渲染
ReactDOM.render( <div>
    123，
    {/* *这里的Movie标签，其实就是Movie类的一个实力对象。*/}
    <Movie {...user}></Movie>
</div>,document.getElementById('app'));



