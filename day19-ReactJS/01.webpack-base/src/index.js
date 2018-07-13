// 1. 引包
import React from 'react';
import ReactDOM from 'react-dom';



let a = 10;
let b = 'Hello China';
let boo  = true;
let title = "999";


ReactDOM.render( <div> {
            a + b
        } <hr/>
        {b}
        <hr/>
        {boo?'条件为真':'条件错误'}
        <p title={title}>有标题的哦！</p>
        </div>,document.getElementById('app'));