##较之前的一些收获

###参数处理

    req.query ： 处理 get 请求
    req.params ： 处理 /:xxx 形式的 get 请求
    req.body ： 处理 post 请求
        就是 POST 请求信息解析过后的对象
    req.param() ： 可以处理 get 和 post 请求，但查找优先级由高到低为req.params→req.body→req.query
    
###使用模版引擎
    
    通过以下两行代码设置了模板引擎和页面模板的存储位置
    `app.set('views', __dirname + '/views');
     app.set('view engine', 'ejs');`
    调用res.render()渲染模版,并将其产生的页面直接返回给客户端。
    它接受两个参数，第一个是模板的名称，即views 目录下的模板文件名，扩展名 .ejs 可选。=>index.ejs
    第二个参数是传递给模板的数据，用于模板翻译。{title:"express"}=>res.render('index', { title: 'Express' });
    之后模板引擎会把index.ejs中的 <%= title %> 替换成 Express。
    ejs 的标签系统非常简单，它只有以下3种标签。
    <% code %>：JavaScript 代码。
    <%= code %>：显示替换过 HTML 特殊字符的内容。
    <%- code %>：显示原始 HTML 内容。
    注意：<%= code %> 和  <%- code %> 的区别，当变量 code 为字符串时，两者没有区别。当 code 比如为  <h1>hello</h1>
    时， <%= code %> 会原样输出  <h1>hello</h1> ，而  <%- code %> 则会输出 H1 大的 hello。
    ejs->for循环模版
    `<ul>
     <% for(var i=0; i<supplies.length; i++) {%>
     <li><%= supplies[i] %></li>
     <% } %>
     </ul>`
     
###页面布局
    
    不再使用之前的layout.ejs进行页面布局，转而使用include
    `<%- include b %>` =>b是一个模版b.ejs   
    
###设置静态文件目录为public
    
    通过一下代码设置
    `app.use(express.static(path.join(__dirname, 'public')))`;
    
###区分get跟post

    自定义两个前缀明显区分
        
###settings.js设置

    db是数据库的名称
    host是数据库的地址
    cookieSecret是用于Cookie加密的

###模版设置

    由于一般网页共有头部和尾部，这两个部分即可设置为模版
    <%- include header %>
    这是主页
    <%- include footer %>
    
###mongodb与mongoose区别

    1. mongodb需要每次打开关闭数据库，mongoose只打开一次
    
###其他一些方法

    res.redirect： 重定向功能，实现页面的跳转
    
###一些包的介绍与学习

    1. markdown
        1. 链接
            [http://www.baidu.com](http://www.baidu.com "百度一下")；一些简单的方法，
        2. 插图
            ![](/images/1.png)
    
#需要注意的一些方面

    1. 每当我们给博客添加新功能以后，都要清空数据库，之后在重新启动   