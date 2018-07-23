import React from 'react';

export default function Hello(props) {
    console.log(props);
    return <h1 title={props.name}>{props.name}--{props.age}岁--{props.gender == 1 ? '男' : '女'}</h1>
};