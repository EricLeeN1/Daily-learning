#node包学习

##1.express-session（缓存）

	1. 安装：$ npm install express-session
	2. API：`var  session  = require （' express-session '）`
	3. default cookie = `{ path: '/', httpOnly: true, secure: false, maxAge: null }`
		1. cookie.domain => 指定Cookie的作用域，默认情况下，不设置任何域。
		2. cookie.expires => 指定Cookie的有效期，默认情况不设置有效期，大多数客户端在退出web浏览器的时候会删除cookie。
			tips：如果同时设置expires和maxAge，最后一个定义的生效；expires不应该直接设置，应该用maxAge选项
		3. cookie.httpOnly => 指定HttpOnly是否设置，默认是设置的
			设置为true时，需要小心，客户端的JavaScript不被允许查看文档的cookie
		4.  cookie.maxAge => 指定Cookie的有效时间（以毫秒为单位），可以通过获取当前服务器的毫秒时间并加上maxAge值来设定，默认情况下，不设置值。
		5.  cookie.path => 指定Cookie的路径，默认为'/'，它是作用域domain的根路径。
		6.  cookie.sameSite => 指定属性sameSite的值，布尔值或者字符串。
			1.  true => 严格的相同时才会执行。
			2.  false => 不设置
			3.  lax => 设置lax相同的站点强制执行
			4.  strict => 设置严格相同的站点才执行
			5.  未标准化，以后可能会改
		7. cookie.secure => 指定Cookie的安全性问题，默认没设置。
			1. 如果设为true，但浏览器没有https链接，cookie不会被设置，安全Cookie需要HTTPS。如果http访问，cookie也不会设置。
			2. 推荐设为true，需要启用https的网站。
			3. 如果设为true并且代理后面有node文件。需要设置trust proxy => `app.set('trust proxy', 1) // trust first proxy`
    4. `app.use(session({
    secret: 'Eric',
    cookie: {maxAge: 80000},
    resave:false,
    saveUninitialized: true
    }));`
			
##2.connect-flash（这里的flash应该是发送的意思）
    
    1. connect-flash是用于存储消息的会话的特殊区域。消息被写入到flash中，并在显示给用户后清除。flash通常与重定向（res.redirects('/')）一起使用，确保将消息提供给将要呈现的下一页。
    2. 安装：$ npm install connect-flash
    3. `app.use(flash());`
    4. 在使用flash中间件的情况下，所有requests都会有一个req.flash()函数用来发送信息
        1. `req.flash('error', '两次输入的密码不一致!');
            return res.redirect('/reg');`
        2. `req.flash('success', '注册成功!');
            res.redirect('/');//注册成功返回主页`
        3. `res.render('index', {
            title: '主页',
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
            });`
        4. render渲染时候固定写成3那样，但是req.flash可以改成不同的提示句（3中单引号中文部分）

##3. serve-favicon（）

    1. 安装：$ npm install serve-favicon
    2. API：
        favicon(path, options)
    3. `app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))`
        1. 一般放在加载了包之后的最开头.
        2. 此时的路径指的是public文件夹下的favicon.ico,如果是public文件夹内别的文件夹下的favicon，在public后面加文件夹地址或者favicon之前添加都行

##4.morgan（打印请求日志等开发模式和生产模式都可以用）
    
    1. 安装：var morgan = require('morgan')；
    2. API：
        1. morgan(format, options)
     3. 定义日志的格式
         1. Using a predefined format string -> 字符串
            morgan('tiny')
        2. Using format string of predefined tokens -> 使用预定义令牌
            morgan(':method :url :status :res[content-length] - :response-time ms')
        3. Using a custom format function -> 使用预定义格式函数
            morgan(function (tokens, req, res) {
              return [
                tokens.method(req, res),
                tokens.url(req, res),
                tokens.status(req, res),
                tokens.res(req, res, 'content-length'), '-',
                tokens['response-time'](req, res), 'ms'
              ].join(' ')
           })；
    4. 实际使用 -> 默认已安装并请求加载包
        1. 单一文件
            `var accessLogStream = fs.createWriteStream(path.join(__dirname+'/logs/', 'access.log'), {flags: 'a'});
            // setup the logger
            app.use(logger('combined', {stream: accessLogStream}));`
        2. 日志文件循环
            1. var rfs = require('rotating-file-stream') -> 加载这个包
            2. `var logDirectory = path.join(__dirname, 'log')
            // ensure log directory exists -> 确定路径一定要存在
            fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
            // create a rotating write stream //创建一个循环写入流
            var accessLogStream = rfs('access.log', {
            interval: '1d', // rotate daily  -> 循环日期
            path: logDirectory
            })
            // setup the logger -> 设置logger
            app.use(morgan('combined', {stream: accessLogStream}))`
        3. 使用自定义的令牌格式
            1. var uuid = require('node-uuid') -> 加载这个包
            2. `morgan.token('id', function getId (req) {
                    return req.id
                })
                var app = express()
                app.use(assignId)
                app.use(morgan(':id :method :url :response-time'))
                app.get('/', function (req, res) {
                    res.send('hello, world!')
                })
                function assignId (req, res, next) {
                    req.id = uuid.v4()
                    next()
                }`

##5.cookie-parser（解析cookie）
    
    1. 安装：$ npm install cookie-parser
    2. API：`app.use(cookieParser())`
    3. 用法：app.use(cookieParser());
        1.  `app.use(cookieParser())
            1.  //若需要使用签名，需要指定一个secret,字符串,否者会报错 -> app.use(cookiePareser('Eric'));
            app.get('/', function(req, res) {
            console.log('Cookies: ', req.cookies)
            })`

##6.body-parser(解析器)
    
    1. 安装：$ npm install body-parser
    2. 请求：var bodyParser = require('body-parser')
    3. 穿插一个参数处理(bodyParser用来处理post请求为其提供一个body对象,将表单的各种name转化为键，各种值为值)
        1. req.query ： 处理 get 请求
        2. req.params ： 处理 /:xxx 形式的 get 请求
        3. req.body ： 处理 post 请求
        就是 POST 请求信息解析过后的对象
        4. req.param() ： 可以处理 get 和 post 请求，但查找优先级由高到低为req.params→req.body→req.query
    4. 提供以下解析器
        1. JSON body parser
        2. Raw body parser
        3. Text body parser
        4. URL-encoded form body parser
    5. 使用
        1. 最简单的设置
            1. // parse application/json -> 解析请求header为application/json
                app.use(bodyParser.json());
                // parse application/x-www-form-urlencoded -> 解析请求header为application/x-www-form-urlencoded
                app.use(bodyParser.urlencoded({extended: false}));
        2. Express里使用body解析器的最推荐的方法
            1. // create application/json parser -> 创建一个application/json解析器
                var jsonParser = bodyParser.json()
                // create application/x-www-form-urlencoded parser -> 创建一个application/x-www-form-urlencoded解析器
                var urlencodedParser = bodyParser.urlencoded({ extended: false })
                // POST /login gets urlencoded bodies -> 得到一个urlencoded的body对象
                app.post('/login', urlencodedParser, function (req, res) {
                if (!req.body) return res.sendStatus(400)
                res.send('welcome, ' + req.body.username)
                })
                // POST /api/users gets JSON bodies -> 得到一个Json的body对象
                app.post('/api/users', jsonParser, function (req, res) {
                if (!req.body) return res.sendStatus(400)
                // create user in req.body
                })
        3. 改变解析器的可接受类型-Content-Type ->内容类型
            1. // parse various different custom JSON types as JSON ->将各种不同的定制JSON类型解析为JSON
            app.use(bodyParser.json({ type: 'application/*+json' }))
            // parse some custom thing into a Buffer -> 将一些自定义的东西解析为缓冲区
            app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
            // parse an HTML body into a string -> 将HTML主体解析成字符串
            app.use(bodyParser.text({ type: 'text/html' }))

##7.formidable（用于解析表单数据的js模块，尤其是文件上传。）貌似已经被express内置了、那就算了不学了。

    1. 安装：$ npm install formidable
    