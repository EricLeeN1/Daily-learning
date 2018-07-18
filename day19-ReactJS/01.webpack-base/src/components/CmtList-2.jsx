import React from "react";

// 导入列表组件需要的样式表
// 问题：这个样式表，是指在List组件中生效吗？
// 经过实验，发现，直接导入css样式表，默认是在全局上，整个项目都生效的！

// 思考:Vue组件中的样式表，有没有冲突的问题？？
// 答案：Vue组件中的样式表，也有冲突的问题；但是可以使用<style scoped></style>
// 疑问:React中，有没有类似于scoped这样的指令呢？
// 答案：没有，因为在React中，根本就没有指令的概念；
import cssobj from '@/css/cmtList.scss';


//如果在引用某个包的时候，这个包被安装到了node_modules目录中，则可以省略node_modules这层目录，直接以包名开始引入自己的模块；或样式表
//自己规定：第三方的样式表，都是以.css结尾，这样，我们不要为普通的.css启用模块化
//自己的样式表，都要以.scss或.less结尾，只为.scss或.less文件启用模块化
import 'bootstrap/dist/css/bootstrap.css';//引入css，没有被模块化，不需要接收
console.log('====================================');
console.log(bootcss);
console.log('====================================');


// 导入评论项子组件
import CmtItem from '@/components/CmtItem-2';

// 使用class关键字，定义父组件
export default class CmtList extends React.Component {
    constructor() {
        super();
        this.state = {
            CommentList: [//评论列表数据
                { id: 1, user: "张三", content: "哈哈，沙发" },
                { id: 2, user: "李四", content: "哈哈，板凳" },
                { id: 3, user: "王五", content: "哈哈，凉席" },
                { id: 4, user: "赵六", content: "哈哈，砖头" },
                { id: 5, user: "田七", content: "哈哈，楼下山炮" },
            ]
        };
    }
    render() {
        return <div>
            {/* <h1 className={cssobj.title+" test"}>这是评论列表组件</h1> */}
            <h1 className={[cssobj.title,"test"].join(' ')}>这是评论列表组件</h1>
            {/* <button className={[bootcss.btn,bootcss['btn-primary']].join(' ')}>按钮</button> */}
            <button className="btn btn-primary">按钮</button>
            <div className="panel panel-primary">111</div>
            {this.state.CommentList.map(item => <CmtItem {...item} key={item.id}></CmtItem>)}
        </div>
    }
}