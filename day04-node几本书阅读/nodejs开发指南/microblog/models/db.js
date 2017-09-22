var settings = require('../settings');
var MongoClient = require('mongodb').MongoClient;

function _connectDB(callback) {
    var url = settings.url + settings.db;
    MongoClient.connect(url, function (err, db) {
        if (err) {
            callback(err,null);
            return;
        }
        console.log('已经连接服务器');
        callback(err,db);
    });
}
function init() {
    _connectDB(function (err,db) {
        if (err) {
            console.log(err);
            return;
        }
    })
}
init();

