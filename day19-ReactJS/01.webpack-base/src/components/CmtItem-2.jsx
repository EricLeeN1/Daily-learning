import React from 'react';

// 使用function构造函数，定义普通的无状态组件
export default function CmtItem(props) {
    return <div>
        <h2>评论人：{props.user}</h2>
        <p>评论内容：{props.content}</p>
    </div>
}