// 1. 引包
import React from 'react';
import ReactDOM from 'react-dom';


// 3.渲染
ReactDOM.render( <div>
    123，
    {/* *这里的Movie标签，其实就是Movie类的一个实力对象。*/}
    <Movie {...user}></Movie>
</div>,document.getElementById('app'));



