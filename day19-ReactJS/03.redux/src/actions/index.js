// 将所有的action都放在actions目录中。
// 项目中的每一个具体的功能，都对应一个action
// 比如：添加任务、删除任务等

//action的特点：
// 1.action是一个对象
// 2.action对象中必须提供一个type属性，用来描述当前动作的类型
// 3.约定type的名称是一个字符串，并且名称全部为大写字母,多个单词之间使用下划线来链接_
// 将来reducer就是根据这个type，来判断动作的类型，执行相应的操作。

const addTodo = {
    type:'ADD_TODO',
    
}