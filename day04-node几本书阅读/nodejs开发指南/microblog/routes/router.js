var express = require('express');
var router = express.Router();

var Dog = require('../schema/dogSchema');


router.showIndex = function (req, res, next) {
    Dog.statics.findByNames("Little White", function (err, result) {
        if (err) {
            console.log(err);
            return console.error(err);
        }
        res.json({title: result});
    });
};
router.showHello = function (req, res, next) {
    res.send('The time is ' + new Date().toString());
};

router.showUsers = function (req, res, next) {
    res.send('user:' + req.params.username);
};
module.exports = router;