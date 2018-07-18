//#region React中绑定事件的标准格式,并在其中调用this.setState

import React from 'react';

export default class BindEvent extends React.Component {
    constructor() {
        super()
        // 私有数据
        this.state = {
            title: "",
            name: "张三",
            gender: "男",
            name: "zs"
        };
        console.log('====================================');
        console.log(this);
        console.log('====================================');
    }
    // 这是一个实例方法
    change = () => {
        //注意: react中，如果香味state中的数据重新赋值，不要使用this.state.*** = ****;
        // 应该调用React提供的this.setState({msg:'123'})

        this.setState({
            title: "努力，奋斗",
        }, function (res) {
            console.log('====================================');
            console.log(this.state.title);
            console.log('====================================');
        });
        // 在React中，推荐使用this.setState({});
        // 1. 在setState,只会把对应的state状态更新，不会覆盖其他的state状态
        // 2. this.setState方法的执行是异步的,如果大家在调用完成this.setState之后，又想立即拿到最新的state值，需要使用this.setState({},callback)
    }
    cons = () => {
        console.log(11111);
    }
    render() {
        return <div>
            {this.state.title ? this.state.title : 'BindEvent组件'}
            <hr />
            {/* 在React中有一套自己的事件绑定机制；事件名，是小驼峰命名 */}
            <button onClick={() => { this.change() }} >按钮</button>
            <button onClick={() => { this.cons() }} >按钮</button>
            {/* 注意：onClick只接受function作为处理函数 */}
            {/* 注意：箭头函数本身就是一个匿名的function函数 */}
        </div>
    }
}

//#endregion
