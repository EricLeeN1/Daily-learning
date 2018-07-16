// 1. 引包
import React from 'react';
import ReactDOM from 'react-dom';

// 导入评论项子组件
import CmtItem from '@/components/CmtItem';
// 导入列表组件
import CmtList from '@/components/CmtList';


// 3.渲染
ReactDOM.render( <div>
    <CmtList></CmtList>
</div>,document.getElementById('app'));