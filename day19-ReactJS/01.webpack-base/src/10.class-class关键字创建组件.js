// 1. 引包
import React from 'react';

//创建组件
class Movie extends React.Component{
    // render 函数的作用，是渲染当前组件所对应的虚拟DOM组件。
    // 构造器
    constructor(){
        // 由于Movie组件，继承了React.Component这个父类，所以自定义的构造器中，必须调用super();
        super();
        // 只有调用了super（）以后，才能使用this关键字
        this.state = {// 这个this.state = {}就相当于Vue中的data(){return {}}
            msg:"大家好，我是class创建的Movie组件"
        };
    }
    render(){
        // return null;
        //在class关键字创建的组件中，如果想使用 外界传递过来的props参数，不需接受，直接通过this.props中.***来访问即可
        //在class内部组件中，this表示当前组件的实例对象；
        // 注意：不论是class,还是普通function创建的组件，他们的props都是只读的，不能被赋值。
        // this.props.name = '李四';
        this.state.msg="修改后的MSG";
        // 在class 创建的组件中，this.state上的数据，都是可读可写的、
        return <div>{this.state.msg} -- {this.props.name}</div>
    }
}

export default Movie;