var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();

event.on('some_event',function () {
    console.log('一些事件触发');
});
setTimeout(function () {
    event.emit('some_event');
},1000);