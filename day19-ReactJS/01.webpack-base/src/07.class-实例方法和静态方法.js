function Person(name, age) {
    this.name = name;
    this.age = age;
    //实例属性
}
// info属性，直接挂载给了构造函数，所以他是静态属性
Person.info = 'aaaaaa';
// 这是实例方法
Person.prototype.say = function () {
    console.log('这是Person的实例方法');
}
Person.show = function () {
    console.log('这是Person的静态show方法');

}

const p1 = new Person('duoduo', '18');
console.log('====================================');
console.log(p1.name);
console.log(p1.age);
console.log(p1.info); // undefined
p1.say(); // 这是实例方法
// p1.show(); // 这是静态方法
//【静态属性】：通过构造函数，直接访问到的属性，叫做静态属性;

// 通过new 出来的实例，访问到的属性，叫做【实例属性】。
console.log('====================================');


// ----------------分割线------------------------

// 创建了一个动物类
// 在class的{}内，只能写构造器，静态方法和静态属性、实例方法
class Animal {
    // var a = 10;// 
    // 类中的构造器
    // 每一个类中，都有一个构造器，如果我们程序员没有手动指定构造器，那么可以认为类内部有个隐形的、看不见的空的构造器，类似于constructor(){}
    // 构造器的作用，就是，每当new 这个类的时候，必然会优先执行构造器中的代码
    constructor(name, age) {
        // 实例属性
        this.name = name;
        this.age = age;
    };

    // 在class内部，通过static修饰的属性，就是静态属性。（今后用的不多）
    static info = "eee";


    // 这是动物的实例方法（今后会经常用到实例方法）
    jiao() {
        console.log('动物的实例方法');
    }
    static show() {
        // 静态方法
        // 这是动物类的静态方法（今后用的不多）
        console.log('====================================');
        console.log('这是实例方法');
        console.log('====================================');
    }
}
const a1 = new Animal('大黄', 3);

console.log('====================================');
console.log(a1);
console.log(a1.age);
console.log(a1.info);
console.log(Animal.info);
console.log('====================================');
Animal.show();