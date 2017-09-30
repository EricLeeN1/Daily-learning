/**
 * Created by Eric on 2017/9/29.
 */
var mongodb = require('./db');

function Comment(name, day, title, comment) {
    this.name = name;
    this.day = day;
    this.title = title;
    this.comment = comment;
};

//存储一条留言信息
Comment.prototype.save = function (callback) {
    var name = this.name,
        day = this.day,
        title = this.title,
        comment = this.comment;
//打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        // 读取posts集合
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //通过用户名，时间及标题查找文档，把一条留言对象添加到对象的Comments数组里
            collection.update({
                "name": name,
                "time.day": day,
                "title": title
            }, {$push: {"comments": comment}}, function (err, result) {
                mongodb.close();//关闭数据库
                callback(null);
            });
        });
    });
};


module.exports = Comment;