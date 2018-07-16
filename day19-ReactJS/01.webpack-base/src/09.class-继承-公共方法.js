// 这是父类【大家可以直接把父类，理解为原型对象prototype】
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    //打招呼 实例方法
    sayHello() {
        console.log('大家好');
    }
}

// 子类，美国人
// 在class类中可以使用extends关键字，实现子类继承父类；
// 语法：   class 子类 extends 父类 {}
class American extends Person {
    constructor(name, age) {
        // 问题1：为什么一定要在constructor中调用super
        //  答案：因为如果一个子类，通过extends关键字继承了父类，那么，在子类的constructor构造函数中，必须优先调用一下super（）；
        // 问题2：super是个什么东西？
        //  答案：super（）是一个函数，而且他是父类的构造器；子类中的super,其实就是父类中,constructor构造器的一个引用；
        // 问题3：为什么调用了super(),a1实例的name和age都变成了undefined了？
        super(name, age);
    }
}

const a1 = new American('JACK', 20);
console.log('====================================');
console.log(a1);
console.log('====================================');
a1.sayHello();

// 子类中国人；
class Chinese extends Person {
    // name 姓名
    // age 年龄
    // IDNumber 身份证号[中国人独有的]，既然是独有的，就不适合挂载到父类上。
    constructor(name, age, IDNumber) {
        super(name, age);
        this.IDNumber = IDNumber;
    }
}

const c1 = new Chinese('张三', 22, '12345678987654321');

console.log('====================================');
console.log(c1);
console.log('====================================');
c1.sayHello();