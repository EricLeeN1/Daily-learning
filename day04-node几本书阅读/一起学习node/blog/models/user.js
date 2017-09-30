var crypto = require('crypto');
var mongodb = require('./db');

function User(user) {
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
};

module.exports = User;

//存储用户信息
User.prototype.save = function (callback) {
    //要存入数据库的用户文档
    var md5 = crypto.createHash('md5'),
        email_MD5 = md5.update(this.email.toLowerCase()).digest('hex'),
        avatar = "http://www.gravatar.com/avatar/" + email_MD5 + "?s=48";
    var user = {
        name:this.name,
        password:this.password,
        email:this.email,
        avatar:avatar
    };
    //打开数据库
    mongodb.open(function (err,db) {
        if (err) {
            return callback(err);
        }
        // 读取users集合
        db.collection('users',function (err,collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //将用户数据插入users集合
            collection.insert(user,{safe:true},function (err,user) {
                mongodb.close();//关闭数据库
                callback(null,user[0]);
            });
        });
    });
};

//读取用户信息
User.get = function (name,callback) {
    //打开数据库
    mongodb.open(function (err,db) {
        if (err) {
            return callback(err);
        }
        //读取users集合
        db.collection('users',function (err,collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //查找用户名(name键)值为name一个文档
            collection.findOne({
                name:name
            },function (err,user) {
                mongodb.close();
                if (user) {
                    return callback(null,user);//成功！返回查询到的用户名称
                }
                callback(err);
                // 查找失败
            });
        });
    });
};