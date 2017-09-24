var mongoose = require('mongoose');
var db = require('../models/mongooseDb.js');

//1.定义图表结构
var dogSchema = mongoose.Schema({
    name: String,
    age: Number,
    address: String,
    familyMember: [{
        father: String,
        age: Number
    }, {
        mother: String,
        age: Number
    }, {
        siblings: [{
            siblingName: String,
            age: Number,
            bloodRelationship: String
        }]
    }],
    birthDay: {type: Date, default: Date.now},
    black: {type: Boolean, default: false},
    label: {
        weight: Number,
        purity: Boolean,
        shape: String
    }
});
//1.第一步的补充 => 添加key
dogSchema.add({
    others: String,
    color: String
});
//常用schema图表类型    String Number Date Buffer Boolean Mixed ObjectId Array

//2.创建一个模型通过mongoose.model(modelName, schema)
var Dog = mongoose.model('Dog', dogSchema);

var black = new Dog({name: "Two Black"});

//3.给定义的表结构的方法对象指定一个speak函数
dogSchema.methods.speak = function (cb) {
    var greeting = this.name ? "Woof name is " + this.name : "I don't have a name";
    return cb(err, greeting);
};
// 4.给表结构的静态方法对象指定一个函数
dogSchema.statics.findByNames = function (name, cb) {
    return this.find({"name": name}, cb);
};

var white = new Dog({name: "Little White"});
// Dog.findByNames("Little White", function (err, dogs) {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(dogs);
// });

// // 把小白写入数据库，成功后小白会叫一下;
// white.save(function (err, white) {
//     if (err) {
//         console.error(err);
//         return;
//     } else {
//         // white.speak();
//     }
// });

// //查找并打印所有的狗狗，返回来的应该也是一个数组
// Dog.find(function (err, dogs) {
//     if (err) {
//         console.error(err);
//         return;
//     } else {
//         console.log(dogs);
//         // dogs
//     }
// });

// //有参数的查找,返回的是一个数组
// Dog.find({name: /^Little/}, function (err, dog) {
//     if (err) {
//         console.error(err);
//         return;
//     } else {
//         console.log(dog);
//         //dog typeof =>Array
//     }
// });
module.exports = Dog;