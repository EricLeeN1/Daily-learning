var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    name: String,
    size: String
}, { toJSON: { virtuals: true } });
var Tank = mongoose.model('Tank', schema);
// 用mongoose.model()时，model会默认用 mongoose connection
var small = new Tank({size: "small"});
small.save(function (err) {
    if (err) {
        return console.error(err);
    }else{
        //saved
    }
});

//或者
Tank.create({size:"small"},function (err,small) {
    if (err) {
        return console.error(err);
    }else{
        //saved
    }
});

