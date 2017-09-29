var mongodb = require('./db');
var markdown = require('markdown').markdown;

function Post(name, title, article) {
    this.name = name;
    this.title = title;
    this.article = article;
};


//存储一篇文章及其相关信息
Post.prototype.save = function (callback) {
    var date = new Date();
    //存储各种时间格式，方便以后扩展
    var time = {
        date: date,
        year: date.getFullYear(),
        month: date.getFullYear() + '-' + (date.getMonth() - 0 + 1),
        day: date.getFullYear() + '-' + (date.getMonth() - 0 + 1) + '-' + date.getDate(),
        minute: date.getFullYear() + '-' + (date.getMonth() - 0 + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
    };
    //要存入数据库的文档
    var post = {
        name: this.name,
        time: time,
        title: this.title,
        article: this.article,
        comments: []
    };

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
            //将用户数据插入users集合
            collection.insert(post, {safe: true}, function (err, user) {
                mongodb.close();//关闭数据库
                callback(null);
            });
        });
    });
};

//一次读取十篇文章及其相关信息
Post.getTen = function (name, page, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取posts集合
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            var query = {};
            if (name) {
                query.name = name;
            }
            //使用count返回特定查询的文档书total
            collection.count(query, function (err, total) {
                //根据query对象查询，并跳过前（page-1）*10个结果，返回之后的十个结果
                collection.find(query, {
                    skip: (page - 1) * 10,
                    limit: 10
                }).sort({
                    time: -1
                }).toArray(function (err, docs) {
                    mongodb.close();
                    if (err) {
                        return callback(err);//查找失败，返回err
                    }
                    //解析Markdown为html
                    docs.forEach(function (doc) {
                        doc.article = markdown.toHTML(doc.article);
                    });
                    callback(null, docs, total);//查找成功！以数组形式返回查询的结果
                });
            });
        });
    });
};

//获取一篇文章

Post.getOne = function (name, day, title, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取posts集合
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //根据用户名、发表日期及文章名进行查询
            collection.findOne({
                "name": name,
                "time.day": day,
                "title": title
            }, function (err, doc) {
                mongodb.close();
                if (err) {
                    return callback(err);
                } else if (doc) {
                    //解析markdown为html
                    // console.log(doc);
                    doc.article = markdown.toHTML(doc.article);
                    doc.comments.forEach(function (comment) {
                        comment.content = markdown.toHTML(comment.content);
                    });
                    callback(null, doc);//返回查询的一篇文章
                } else {
                    return callback(err);
                }
            });
        });
    });
};


//返回原始发表的内容(markdown 格式)
Post.edit = function (name, day, title, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取posts集合
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //根据用户名、发表日期及文章名进行查询
            collection.findOne({
                "name": name,
                "time.day": day,
                "title": title
            }, function (err, doc) {
                mongodb.close();
                if (err) {
                    return callback(err);
                } else if (doc) {
                    callback(null, doc);//返回查询的一篇文章(markdown格式)
                } else {
                    return callback(err);
                }
            });
        });
    });
};

//更新改过的文章
Post.update = function (name, day, title, article, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取posts集合
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //更新文章内容
            collection.update({
                "name": name,
                "time.day": day,
                "title": title
            }, {
                $set: {article: article}
            }, function (err, result) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};

//删除文章
Post.remove = function (name, day, title, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取posts集合
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //根据用户名、日期和标题查找并删除一篇文章
            collection.remove({
                "name": name,
                "time.day": day,
                "title": title
            }, function (err, result) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};

//返回所有文章存档信息
Post.getArchive = function (callback) {
//打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
//读取 posts 集合
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
//返回只包含 name、time、title 属性的文档组成的存档数组
            collection.find({}, {
                "name": 1,
                "time": 1,
                "title": 1
            }).sort({
                time: -1
            }).toArray(function (err, docs) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, docs);
            });
        });
    });
};

module.exports = Post;