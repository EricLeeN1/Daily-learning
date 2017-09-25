var express = require('express');
var router = express.Router();

/* GET home page. */
router.index=function(req, res, next) {
    res.render('index', { title: '主页' });
};
router.reg=function(req, res, next) {
    res.render('index', { title: '注册' });
};
router.doReg=function(req, res, next) {
    // res.render('index', { title: 'Express' });
};
router.login=function(req, res, next) {
    res.render('index', { title: '登录' });
};
router.doLogin=function(req, res, next) {
    // res.render('index', { title: 'Express' });
};
router.post=function(req, res, next) {
    res.render('index', { title: '发布' });
};
router.doPost=function(req, res, next) {
    // res.render('index', { title: 'Express' });
};
router.logout=function(req, res, next) {
    res.render('index', { title: '登出' });
};

module.exports = router;
