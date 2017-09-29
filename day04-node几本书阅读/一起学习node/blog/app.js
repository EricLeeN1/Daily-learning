var express = require('express');
var session = require('express-session');
var path = require('path');
var fs = require('fs');
var settings = require('./settings');
var flash = require('connect-flash');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var routes = require('./routes/router');

var app = express();

// view engine setup通过以下两行代码设置了模版引擎和页面模版的存储位置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());
app.set('title', 'My Site');
console.log(app.get('title'));
// app.use(function (req, res, next) {
//     app.locals.title = "My App";
// });
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images/', 'favicon.ico')));
// app.use(logger('dev'));
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname + '/logs/', 'access.log'), {flags: 'a'});

//for  setup the logger
app.use(logger('combined', {stream: accessLogStream}));
//for  parse application/json
app.use(bodyParser.json());
//for  parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// for parsing multipart/form-data
app.use(bodyParser({keepExtensions: true, uploadDir: './public/images'}));
// app.use(multer());// for parsing multipart/form-data
app.use(cookieParser());
app.use(session({
    secret: 'Eric',
    cookie: {maxAge: 80000},
    resave: false,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.route('/')
    .get(routes.index);
app.route('/reg')
    .all(routes.checkNotLogin)
    .get(routes.reg)
    .post(routes.doReg);
app.route('/login')
    .all(routes.checkNotLogin)
    .get(routes.login)
    .post(routes.doLogin);
app.route('/post')
    .all(routes.checkLogin)
    .get(routes.post)
    .post(routes.doPost);
app.route('/logout')
    .get(routes.checkLogin)
    .get(routes.logout);
app.route('/upload')
    .all(routes.checkLogin)
    .get(routes.upload)
    .post(routes.doUpload);
app.route('/archive')
    .get(routes.archive)
app.route('/u/:name')
    .get(routes.user);
app.route('/u/:name/:day/:title')
    .get(routes.article)
    .post(routes.doArticle);
app.route('/edit/:name/:day/:title')
    .all(routes.checkLogin)
    .get(routes.edit)
    .post(routes.doEdit);
app.route('/remove/:name/:day/:title')
    .all(routes.checkLogin)
    .get(routes.remove);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler错误捕获页面处理
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
app.listen(3000);
module.exports = app;
