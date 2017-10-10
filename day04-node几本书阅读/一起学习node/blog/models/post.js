var mongodb = require('./db');
var ObjectID = require('mongodb').ObjectID;
var markdown = require('markdown').markdown;

function Post(name, avatar, title, tags, article) {
    this.name = name;
    this.avatar = avatar;
    this.title = title;
    this.tags = tags;
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
        avatar: this.avatar,
        time: time,
        title: this.title,
        tags: this.tags,
        article: this.article,
        comments: [],
        reprint_info: {},
        pv: 0
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

Post.getOne = function (_id, callback) {
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
                "_id":new ObjectID(_id)
            }, function (err, doc) {
                mongodb.close();
                if (err) {
                    return callback(err);
                } else if (doc) {
                    //解析markdown为html
                    // console.log(doc);
                    doc.article = markdown.toHTML(doc.article);
                    if (doc.comments.length > 0) {
                        // doc.comments.forEach(function (comment) {
                        //     comment.content = markdown.toHTML(comment.content);
                        // });
                    }
                    ;
                    callback(null, doc);//返回查询的一篇文章
                } else {
                    return callback(err);
                }
            });
            //每访问 1 次，pv 值增加 1
            collection.update({
                "_id":new ObjectID(_id)
            }, {
                $inc: {"pv": 1}
            }, function (err, res) {
                if (err) {
                    callback(err);
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
//读取 posts 集合
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
//查询要删除的文档
            collection.findOne({
                "name": name,
                "time.day": day,
                "title": title
            }, function (err, doc) {
                if (err) {
                    mongodb.close();
                    return callback(err);
                }
//如果有 reprint_from，即该文章是转载来的，先保存下来
                var reprint_from = "";
                if (doc.reprint_info.reprint_from) {
                    reprint_from = doc.reprint_info.reprint_from;
                }
                if (reprint_from != "") {
//更新原文章所在文档的 reprint_to
                    collection.update({
                        "name": reprint_from.name,
                        "time.day": reprint_from.day,
                        "title": reprint_from.title
                    }, {
                        $pull: {
                            "reprint_info.reprint_to": {
                                "name": name,
                                "day": day,
                                "title": title
                            }
                        }
                    }, function (err) {
                        if (err) {
                            mongodb.close();
                            return callback(err);
                        }
                    });
                }
//删除转载来的文章所在的文档
                collection.remove({
                    "name": name,
                    "time.day": day,
                    "title": title
                }, {
                    w: 1
                }, function (err) {
                    mongodb.close();
                    if (err) {
                        return callback(err);
                    }
                    callback(null);
                });
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

//返回所有标签
Post.getTags = function (callback) {
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
//distinct 用来找出给定键的所有不同值
            collection.distinct("tags.tag", function (err, docs) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, docs);
            });
        });
    });
};

//返回含有特定标签的所有文章
Post.getTag = function (tag, callback) {
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
//通过tags.tag 查询并返回只含有name、time、title键的文档组成的数组
            collection.find({
                "tags.tag": tag
            }, {
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

//返回通过标题关键字查询的所有文章
Post.search = function (keyword, callback) {
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
            var pattern = new RegExp("^.*" + keyword + ".*$", "i");
            collection.find({
                "title": pattern
            }, {
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

//转载一篇文章
Post.reprint = function (reprint_from, reprint_to, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
//找到被转载的原文档
            collection.findOne({
                "name": reprint_from.name,
                "time.day": reprint_from.day,
                "title": reprint_from.title
            }, function (err, doc) {
                if (err) {
                    mongodb.close();
                    return callback(err);
                }
                var date = new Date();
                var time = {
                    date: date,
                    year: date.getFullYear(),
                    month: date.getFullYear() + "-" + (date.getMonth() + 1),
                    day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
                    minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes()
                }
                delete doc._id;
                doc.name = reprint_to.name;
                doc.head = reprint_to.head;
                doc.time = time;
                doc.title = (doc.title.search(/[转载]/) > -1) ? doc.title : "[转载]" + doc.title;
                doc.comments = [];
                doc.reprint_info = {"reprint_from": reprint_from};
                doc.pv = 0;
//更新被转载的原文档的 reprint_info 内的 reprint_to
                collection.update({
                    "name": reprint_from.name,
                    "time.day": reprint_from.day,
                    "title": reprint_from.title
                }, {
                    $push: {
                        "reprint_info.reprint_to": {
                            "name": reprint_to.name,
                            "day": time.day,
                            "title": doc.title
                        }
                    }
                }, function (err, result) {
                    if (err) {
                        mongodb.close();
                        return callback(err);
                    }
                });
//将转载生成的副本修改后存入数据库，并返回存储后的文档
                collection.insert(doc, {
                    safe: true
                }, function (err, post) {
                    mongodb.close();
                    if (err) {
                        return callback(err);
                    }
                    callback(err, post[0]);
                });
            });
        });
    });
};
module.exports = Post;