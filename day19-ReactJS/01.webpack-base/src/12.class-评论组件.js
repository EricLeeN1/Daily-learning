// 1. 引包
import React from 'react';
import ReactDOM from 'react-dom';

// 使用function构造函数，定义普通的无状态组件
function CmtItem(props){
    return <div>
        <h2>评论人：{props.user}</h2>
        <p>评论内容：{props.content}</p>
    </div>
}

// 使用class关键字，定义父组件
class CmtList extends React.Component{
    constructor(){
        super();
        this.state = {
            CommentList:[//评论列表数据
                {id:1,user:"张三",content:"哈哈，沙发"},
                {id:2,user:"李四",content:"哈哈，板凳"},
                {id:3,user:"王五",content:"哈哈，凉席"},
                {id:4,user:"赵六",content:"哈哈，砖头"},
                {id:5,user:"田七",content:"哈哈，楼下山炮"},
            ]
        };
    }
    render(){
        return <div>
            <h1>这是评论列表组件</h1>
            {this.state.CommentList.map(item => <CmtItem {...item} key={item.id}></CmtItem>)}
        </div>
    }
}

// 3.渲染
ReactDOM.render( <div>
    <CmtList></CmtList>
</div>,document.getElementById('app'));