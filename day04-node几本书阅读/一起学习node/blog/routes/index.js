var express = require('express');
var router = express.Router();
var crypto = require('crypto'),
    User = require('../models/user');
/* GET home page. */
router.index = function (req, res, next) {
    res.render('index', {title: '主页'});
};
router.reg = function (req, res, next) {
    res.render('reg', {title: '注册'});
};
router.doReg = function (req, res, next) {
    // res.render('index', { title: 'Express' });
    var name = req.body.name,
        password = req.body.password,
        resurepassword = req.body['resurepassword'];
    //检验用户两次输入的密码是否一致
    if (resurepassword !=password) {
        req.flash('error','两次输入的密码不一致!');
        return res.redirect('/reg');
    }
    //生成密码的MD5值

    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    var newUser = new User({
        name:req.body.name,
        password:password,
        email:req.body.email
    });
    //检查用户名是否已经存在
    User.get(newUser.name,function (err,user) {
        if (user) {
            req.flash('error','用户已经存在！');
            return res.redirect('/reg');
        }
        //如果用户不存在则新增用户
        newUser.save(function (err,user) {
            if (err) {
                req.flash('error',err);
                return res.redirect('/reg');
            }
            req.session.user = user;//用户信息存入session
            req.flash('success','注册成功!');
            res.redirect('/');//注册成功返回主页
        });
    });
};
router.login = function (req, res, next) {
    res.render('login', {title: '登录'});
};
router.doLogin = function (req, res, next) {
    // res.render('index', { title: 'Express' });
};
router.post = function (req, res, next) {
    res.render('index', {title: '发布'});
};
router.doPost = function (req, res, next) {
    // res.render('index', { title: 'Express' });
};
router.logout = function (req, res, next) {
    res.render('index', {title: '登出'});
};

module.exports = router;
