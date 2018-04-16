var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://127.0.0.1:27017/dog');
// 使用时 mongoose.model()，将使用默认的mongoose.connect()连接。

// 使用自定义链接时,用connection.model()代替
// var connection = mongoose.createConnection('mongodb://localhost:27017/test');
// var Tank = connection.model('Tank', yourSchema);

// var db = mongoose.connection;
db.on('error', console.error.bind(console, '连接错误:'));
db.once('open', function () {
    console.log('连接数据库成功');
});
module.exports = db;