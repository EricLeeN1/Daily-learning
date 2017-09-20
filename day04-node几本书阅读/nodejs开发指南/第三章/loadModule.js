var hello1 = require('./module');

hello1.setName("Eric");

var hello2 = require('./module');

hello2.setName("Eric2");

hello1.sayHello();