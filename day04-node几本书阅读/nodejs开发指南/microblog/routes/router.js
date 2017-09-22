var express = require('express');
var router = express.Router();

var Dog = require('../schema/dogSchema');


router.showIndex = function (req,res,next) {
    res.json({title: 'Express'});
};
router.showHello = function (req,res,next) {
    res.send('The time is ' + new Date().toString());
};

router.showUsers = function (req,res,next) {
    res.send('user:'+req.params.username);
};
module.exports = router;