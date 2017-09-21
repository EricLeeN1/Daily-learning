var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/user/:username', function(req, res, next) {
  res.send('user:'+req.params.username);
});

module.exports = router;
