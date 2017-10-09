var express = require('express');
var router = express.Router();
var crypto = require('crypto'),
    fs = require('fs'),
    User = require('../models/user'),
    Post = require('../models/post'),
    Comment = require('../models/comment');
/* GET home page. */
router.index = function (req, res, next) {
    //判断是否是第一页，并把请求的页数转换成number类型
    var page = req.query.p ? parseInt(req.query.p) : 1;
    //查询并返回第page页的10篇文章
    Post.getTen(null, page, function (err, articles, total) {
        if (err) {
            articles = [];
        }
        res.json({
            msgcode:1,
            msg:"获取成功",
            data:{
                title:"主页",
                articles:articles,
                isFirstPage: (page - 1) == 0,
                isLastPage: ((page - 1) * 10 + articles.length) == total,
                user: req.session.user,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            }
        });
        // res.render('index', {
        //     title: '主页',
        //     articles: articles,
        //     page: page,
        //     isFirstPage: (page - 1) == 0,
        //     isLastPage: ((page - 1) * 10 + articles.length) == total,
        //     user: req.session.user,
        //     success: req.flash('success').toString(),
        //     error: req.flash('error').toString()
        // });
    });
};

// 注册页面
router.reg = function (req, res, next) {
    res.render('reg', {
        title: '注册',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
};
// 注册验证
router.doReg = function (req, res, next) {
    // res.render('index', { title: 'Express' });
    var name = req.body.name,
        password = req.body.password,
        resurepassword = req.body['resurepassword'];
    //检验用户两次输入的密码是否一致
    if (resurepassword != password) {
        req.flash('error', '两次输入的密码不一致!');
        return res.redirect('/reg');
    }
    //生成密码的MD5值

    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    var newUser = new User({
        name: req.body.name,
        password: password,
        email: req.body.email
    });
    //检查用户名是否已经存在
    User.get(newUser.name, function (err, user) {
        if (user) {
            req.flash('error', '用户已经存在！');
            return res.redirect('/reg');
        }
        //如果用户不存在则新增用户
        newUser.save(function (err, user) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/reg');
            }
            req.session.user = user;//用户信息存入session
            req.flash('success', '注册成功!');
            res.redirect('/');//注册成功返回主页
        });
    });
};
//登录页面
router.login = function (req, res, next) {
    res.render('login', {
        title: '登录',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
};
//登录验证
router.doLogin = function (req, res, next) {
    // res.render('index', { title: 'Express' });
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    //检查用户是否存在
    User.get(req.body.name, function (err, user) {
        if (!user) {
            req.flash('error', '用户不存在!');
            return res.redirect('/login');//用户不存在则跳转到登录页
        }
        //检查密码是否一致
        if (user.password != password) {
            req.flash('error', '密码错误!');
            return res.redirect('/login');//密码错误则跳转到登录页
        }
        //用户名密码都匹配后，将用户信息存入session
        req.session.user = user;
        req.flash('success', '登录成功!');
        res.redirect('/');
    });
};
//发表文章页面
router.post = function (req, res, next) {
    res.render('post', {
        title: '发表',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
};
//发表文章验证
router.doPost = function (req, res, next) {
    var currentUser = req.session.user,
        tags = [{"tag": req.body.tag1}, {"tag": req.body.tag2}, {"tag": req.body.tag3}],
        post = new Post(currentUser.name, currentUser.avatar, req.body.title, tags, req.body.article);
    post.save(function (err) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        req.flash('success', '发布成功！');
        res.redirect('/');
    });
};
// 发表评论页面
router.doArticle = function (req, res, next) {
    var date = new Date(),
        time = date.getFullYear() + '-' + (date.getMonth() - 0 + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
    var md5 = crypto.createHash('md5'),
        email_MD5 = md5.update(req.body.email.toLowerCase()).digest('hex'),
        avatar = "http://www.gravatar.com/avatar/" + email_MD5 + "?s=48";
    var comment = {
        name: req.body.name,
        avatar: avatar,
        email: req.body.email,
        website: req.body.website,
        time: time,
        content: req.body.content
    };
    var newComment = new Comment(req.params.name, req.params.day, req.params.title, comment);
    newComment.save(function (err) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        req.flash('success', '留言成功！');
        res.redirect('back');//留言成功后返回到该文章页。
    });
};
//登出页面
router.logout = function (req, res, next) {
    req.session.user = null;
    req.flash('success', '登出成功！');
    res.redirect('/');
};
//上传文件页面
router.upload = function (req, res, next) {
    res.render('upload', {
        title: '文件上传',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    })
};
// 上传文件验证页面
router.doUpload = function (req, res, next) {
    console.log(1111);
    for (var i in req.files) {
        console.log('这个是不是没走？');
        if (req.files[i].size == 0) {
// 使用同步方式删除一个文件
            fs.unlinkSync(req.files[i].path);
            console.log('Successfully removed an empty file!');
        } else {
            var target_path = './public/images/' + req.files[i].name;
// 使用同步方式重命名一个文件
            fs.renameSync(req.files[i].path, target_path);
            console.log('Successfully renamed a file!');
        }
    }
    req.flash('success', '文件上传成功!');
    res.redirect('/upload');
};
//存档页面
router.archive = function (req, res) {
    Post.getArchive(function (err, articles) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        res.render('archive', {
            title: '存档',
            articles: articles,
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });
};
//标签页面
router.tags = function (req, res, next) {
    Post.getTags(function (err, articles) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        res.render('tags', {
            title: "标签",
            articles: articles,
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });
};
//特定标签页面
router.tag = function (req, res, next) {
    Post.getTag(req.params.tag, function (err, articles) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        res.render('tag', {
            title: "TAG：" + req.params.tag,
            articles: articles,
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });
};
//搜索页面
router.search = function (req, res, next) {
    Post.search(req.query.keyword, function (err, articles) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        res.render('search', {
            title: "Search：" + req.query.keyword,
            articles: articles,
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });
};
//友情链接
router.links = function (req, res, next) {
    res.render('links', {
        title: '友情链接',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
};
//用户个人中心页面
router.user = function (req, res) {
    var page = req.query.p ? parseInt(req.query.p) : 1;
    //检查用户是否存在
    User.get(req.params.name, function (err, user) {
        if (!user) {
            req.flash('error', '用户不存在');
            return res.redirect('/');//用户不存在则跳转到主页
        }
        //查询并返回该用户第page也的10篇文章
        Post.getTen(user.name, page, function (err, articles, total) {
            if (err) {
                req.flash('error', err);
            }
            res.render('user', {
                title: user.name,
                articles: articles,
                user: req.session.user,
                isFirstPage: (page - 1) == 0,
                isLastPage: ((page - 1) * 10 + articles.length) == total,
                page: page,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        });
    })
};
//文章详情页面
router.article = function (req, res) {
    Post.getOne(req.params._id, function (err, article) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');//没找到就返回主页
        }
        console.log(req.params._id,article);
        res.render('article', {
            title: req.params.title,
            article: article,
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        })
    });
};
// 编辑文章页面
router.edit = function (req, res) {
    var currentUser = req.session.user;
    Post.edit(currentUser.name, req.params.day, req.params.title, function (err, article) {
        if (err) {
            req.flash('error', err);
            return res.redirect('back');
        }
        res.render('edit', {
            title: '编辑',
            article: article,
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });
};
// 保存文章页面
router.doEdit = function (req, res) {
    var currentUser = req.session.user;
    Post.update(currentUser.name, req.params.day, req.params.title, req.body.article, function (err) {
        var url = '/u/' + req.params.name + '/' + req.params.day + '/' + req.params.title;
        if (err) {
            req.flash('error', err);
            return res.redirect(url);//出错! 返回文章页
        }
        req.flash('success', '修改成功!');
        res.redirect(url);//成功！返回文章页
    });
};
//删除文章操作
router.remove = function (req, res) {
    var currentUser = req.session.user;
    Post.remove(currentUser.name, req.params.day, req.params.title, function (err) {
        var url = '/u/' + req.params.name + '/' + req.params.day + '/' + req.params.title;
        if (err) {
            req.flash('error', err);
            return res.redirect('back');
        }
        req.flash('success', '删除成功!');
        res.redirect('/');
    });
};
//转载文章操作
router.reprint = function (req, res) {
    Post.edit(req.params.name, req.params.day, req.params.title, function (err, article) {
        if (err) {
            req.flash('error', err);
            return res.redirect(back);
        }
        var currentUser = req.session.user,
            reprint_from = {name: article.name, day: article.time.day, title: article.title},
            reprint_to = {name: currentUser.name, head: currentUser.avatar};
        Post.reprint(reprint_from, reprint_to, function (err, article) {
            if (err) {
                req.flash('error', err);
                return res.redirect('back');
            }
            req.flash('success', '转载成功!');
            var url = '/u/' + article.name + '/' + article.time.day + '/' + article.title;
//跳转到转载后的文章页面
            res.redirect(url);
        });
    });
};
//不同情况检查是否登录
router.checkLogin = function (req, res, next) {
    if (!req.session.user) {
        req.flash('error', '未登录!');
        res.redirect('/login');
    }
    next();
};
router.checkNotLogin = function (req, res, next) {
    if (req.session.user) {
        req.flash('error', '已登录!');
        res.redirect('back');
    }
    next();
};
// checkNotLogin 和  checkLogin 用来检测是否登陆，并通过  next() 转移控制权，
// 检测到未登录则跳转到登录页，检测到已登录则跳转到上一个页面。
module.exports = router;
