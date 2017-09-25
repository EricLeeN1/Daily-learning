##较之前的一些收获

###参数处理

    req.query ： 处理 get 请求
    req.params ： 处理 /:xxx 形式的 get 请求
    req.body ： 处理 post 请求
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
        
###

    