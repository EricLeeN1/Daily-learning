function Person(name,age) {
    this.name = name;
    this.age = age;
    //实例属性
}
// info属性，直接挂载给了构造函数，所以他是静态属性
Person.info = 'aaaaaa';

const p1 = new Person('duoduo','18');
console.log('====================================');
console.log(p1.name);
console.log(p1.age);
console.log(p1.info);// undefined
//【静态属性】：通过构造函数，直接访问到的属性，叫做静态属性;

// 通过new 出来的实例，访问到的属性，叫做【实例属性】。
console.log('====================================');


// ----------------分割线------------------------

// 创建了一个动物类
class Animal{
    // 类中的构造器
    // 每一个类中，都有一个构造器，如果我们程序员没有手动指定构造器，那么可以认为类内部有个隐形的、看不见的空的构造器，类似于constructor(){}
    // 构造器的作用，就是，每当new 这个类的时候，必然会优先执行构造器中的代码
    constructor(name,age){
        // 实例属性
        this.name = name;
        this.age = age;
    };

    // 在class内部，通过static修饰的属性，就是静态属性。
    static info = "eee";
}
const a1 = new Animal('大黄',3);

console.log('====================================');
console.log(a1);
console.log(a1.age);
console.log(a1.info);
console.log(Animal.info);
console.log('====================================');