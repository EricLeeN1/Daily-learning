var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27018/dog');

var db = mongoose.connection;
db.on('error', console.error.bind(console, '连接错误:'));
db.once('open', function () {
    console.log('连接数据库成功');
});
module.exports = db;