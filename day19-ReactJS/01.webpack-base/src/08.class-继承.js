// 这是父类【大家可以直接把父类，理解为原型对象prototype】
class Person{
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

// 子类，美国人
// 在class类中可以使用extends关键字，实现子类继承父类；
// 语法：   class 子类 extends 父类 {}
class American extends Person {
    
}

const a1 = new American('JACK', 20);
console.log('====================================');
console.log(a1);
console.log('====================================');

// 子类中国人；
class Chinese extends Person {
   
}

const c1 = new Chinese('张三', 22);

console.log('====================================');
console.log(c1);
console.log('====================================');