var express = require('express');
var router = express.Router();
var crypto = require('crypto'),
    fs = require('fs'),
    User = require('../models/user'),
    Post = require('../models/post');
/* GET home page. */
router.index = function (req, res, next) {
    Post.getAll(null, function (err, articles) {
        if (err) {
            articles = [];
        }
        res.render('index', {
            title: '主页',
            articles: articles,
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
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
//发表页面
router.post = function (req, res, next) {
    res.render('post', {
        title: '发表',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
};
//发表验证
router.doPost = function (req, res, next) {
    var currentUser = req.session.user,
        post = new Post(currentUser.name, req.body.title, req.body.article);
    post.save(function (err) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        req.flash('success', '发布成功！');
        res.redirect('/')
    });
};
//登出页面
router.logout = function (req, res, next) {
    req.session.user = null;
    req.flash('success', '登出成功！');
    res.redirect('/');
};
router.upload = function (req, res, next) {
    res.render('upload', {
        title: '文件上传',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    })
};
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

//用户页面
router.user = function (req, res) {
    //检查用户是否存在
    User.get(req.params.name, function (err, user) {
        if (!user) {
            req.flash('error', '用户不存在');
            return res.redirect('/');//用户不存在则跳转到主页
        }
        //查询并返回该用户的所有文章
        Post.getAll(user.name, function (err, articles) {
            if (err) {
                req.flash('error', err);
            }
            res.render('user', {
                title: user.name,
                articles: articles,
                user: req.session.user,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        });
    })
};

//文章页面

router.article = function (req, res) {
    Post.getOne(req.params.name, req.params.day, req.params.title, function (err, article) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');//没找到就返回主页
        }
        res.render('article', {
            title: req.params.title,
            article: article,
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        })
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
