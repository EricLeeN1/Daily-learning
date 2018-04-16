##1、谈谈你对Ajax的理解？(概念、特点、作用) 
    1. 定义：AJAX全称为“Asynchronous JavaScript And XML”（异步JavaScript和XML） 是指一种创建交互式网页应用的开发技术、改善用户体验，实现无刷新效果。
    2. 优点：
        - 不需要插件支持
        - 优秀的用户体验
        - 提高Web程序的性能
        - 减轻服务器和带宽的负担
    3. 缺点：
        - 破坏浏览器“前进”、“后退”按钮的正常功能，可通过简单的插件弥补。
        - 对搜索引擎的支持不足。

##2、说说你对延迟对象deferred的理解? 

    1. 定义：简单说，deferred对象就是jQuery的回调函数解决方案。在英语中，defer的意思是”延迟”，所以deferred对象的含义就是”延迟”到未来某个点再执行。 
    它解决了如何处理耗时操作的问题，对那些操作提供了更好的控制，以及统一的编程接口。
    2. 功能
        - 实现链式操作
        - 指定同一操作的多个回调函数
        - 为多个操作指定回调函数
        - 普通操作的回调函数接口

##3、什么是跨域，如何实现跨域访问? 

    1. 定义：跨域是指不同域名之间相互访问。 
    JavaScript同源策略的限制，A域名下的JavaScript无法操作B或是C域名下的对象
    2. 实现：
        (1)、JSONP跨域：利用script脚本允许引用不同域下的js实现的，将回调方法带入服务器，返回结果时回调。
        (2)、跨域资源共享（CORS） -> jQuery.support.cors = true;
        跨域资源共享（CORS）是一种网络浏览器的技术规范，它为Web服务器定义了一种方式，允许网页从不同的域访问其资源。
    3. 上述两种实现方式的区别：
        a、 JSONP只能实现GET请求，而CORS支持所有类型的HTTP请求。 
        b、 使用CORS，开发者可以使用普通的XMLHttpRequest发起请求和获得数据，比起JSONP有更好的错误处理。 
        c、 JSONP主要被老的浏览器支持，它们往往不支持CORS，而绝大多数现代浏览器都已经支持了CORS。

##4、为什么要使用模板引擎？

    a、模板引擎（这里特指用于Web开发的模板引擎）是为了使用户界面与业务数据（内容）分离而产生的，它可以生成特定格式的文档，用于网站的模板引擎就会生成一个标准的HTML文档。 
    b、在一些示例中javascript有大量的html字符串，html中有一些像onclick样的javascript，这样javascript中有html，html中有javascript，代码的偶合度很高，不便于修改与维护，使用模板引擎可以解决问题。

##5、JavaScript是一门什么样的语言，它有哪些特点？

    1. JavaScript 是一种脚本语言，官方名称为 ECMAScript（因定义语言的标准为 ECMA-262）。
    2. JS 的主要特点： 
        a、语法类似于常见的高级语言，如 C 和 Java； 
        b、脚本语言，不需要编译就可以由解释器直接运行； 
        c、 变量松散定义，属于弱类型语言； 
        d、面向对象的。 
    3. JS 最初是为网页设计而开发的，现在也是Web 开发的重要语言。它支持对浏览器（浏览器对象模型，BOM）和HTML 文档（文档对象模型，DOM）进行操作而使网页呈现动态的交互特性。 
    4. 严格的说，JS只是ECMAScript 的一种实现，是ECMAScript和BOM、DOM组成的一种Web 开发技术。
## 6、JavaScript的数据类型有哪些？ 

    1. 基本数据类型：字符串String、数字Number、布尔Boolean
    2. 复合数据类型：数组Array、对象Object
    3. 特殊数据类型：Null空对象、Undefined未定义

##7、已知ID的Input输入框，如何获取这个输入框的输入值？(不使用第三方框架)

    document.getElementById("ID").value

##8、根据你的理解,请简述JavaScript脚本的执行原理?

    JavaScript是一种动态、弱类型、基于原型的语言，通过浏览器可以直接执行。 
    当浏览器遇到\<script> 标记的时候，浏览器会执行之间的javascript代码。嵌入的js代码是顺序执行的，每个脚本定义的全局变量和函数，都可以被后面执行的脚本所调用。 变量的调用，必须是前面已经声明，否则获取的变量值是undefined。

##9、DOM操作怎样添加、移除、移动、复制、创建和查找节点?

（1）创建新节点

    createDocumentFragment() //创建一个DOM片段
    createElement() //创建一个具体的元素
    createTextNode() //创建一个文本节点

（2）添加、移除、替换、插入

    appendChild()
    removeChild()
    replaceChild()
    insertBefore() //在已有的子节点前插入一个新的子节点

    （3）查找

    getElementsByTagName() //通过标签名称
    getElementsByName() //通过元素的Name属性的值(IE容错能力较强，会得到一个数组，其中包括id等于name值的)
    getElementById() //通过元素Id，唯一性

##10、说说你对json的理解?

    a、JSON 指的是 JavaScript 对象表示法（JavaScript Object Notation） 
    b、JSON 是轻量级的文本数据交换格式，并不是编程语言 
    c、JSON 独立于语言存在 
    d、JSON 具有自我描述性，更易理解 
    e、JSON 可以将 JavaScript 对象中表示的一组数据转换为字符串，然后就可以在函数之间轻松地传递这个字符串，或者在异步应用程序中将字符串从 Web 客户机传递给服务器端程序。这个字符串看起来有点儿古怪，但是JavaScript很容易解释它，而且 JSON 可以表示比”名称 / 值对”更复杂的结构。例如，可以表示数组和复杂的对象，而不仅仅是键和值的简单列表

11、ionic和angularjs的区别? 

    a、ionic是一个用来开发混合手机应用的，开源的，免费的代码库。可以优化html、css和js的性能，构建高效的应用程序，而且还可以用于构建Sass和AngularJS的优化。 
    b、AngularJS通过新的属性和表达式扩展了HTML。AngularJS可以构建一个单一页面应用程序（SPAs：Single Page Applications）。 
    c、Ionic是一个混合APP开发工具，它以AngularJS为中间脚本工具(称为库，似乎又不恰当)，所以，你如果要使用Ionic开发APP，就必须了解AngularJS。

##12、谈谈你对闭包的理解?

    (1)、使用闭包主要是为了设计私有的方法和变量。闭包的优点是可以避免全局变量的污染，缺点是闭包会常驻内存，会增大内存使用量，使用不当很容易造成内存泄露。 
    (2)、闭包有三个特性： 
        a、函数嵌套函数 
        b、函数内部可以引用外部的参数和变量 
        c、参数和变量不会被垃圾回收机制回收 

##13、谈谈你This对象的理解?

    (1)、js的this指向是不确定的，也就是说是可以动态改变的。call/apply 就是用于改变this指向的函数，这样设计可以让代码更加灵活，复用性更高 
    (2)、this 一般情况下，都是指向函数的拥有者。 
    (3)、在函数自执行里，this 指向的是 window 对象。 
    (4)、扩展：关于this，还有一个地方比较让人模糊的是在dom事件里，通常有如下3种情况： 
    a、使用标签属性注册事件，此时this指向的是window对象。 
    b、对与a，要让this指向input，可以将this作为参数传递。 
    c、使用addEventListener等注册事件。此时this也是指向 input。 

14、JavaScript对象的几种创建方式? 

**详细参考 -> JavaScript对象的几种创建方式.html**

    1. (1) 工厂模式
        引用该对象的时候，这里使用的是 var x = Parent()而不是 var x = new Parent();因为后者会可能出现很多问题（前者也成为工厂经典方式,后者称之为混合工厂方式），不推荐使用new的方式使用该对象
    2. (2) 构造函数方式
        1. 

##15、get和post的区别,何时使用post 
16、null和undefined的区别？ 
17、请写出js内存泄漏的问题? 
18、哪些地方会出现css阻塞，哪些地方会出现js阻塞？ 
19、对比Flash与ajax哪个好？ 
20、请你解释一下事件冒泡机制 
21、请你说说split()与join() 函数的区别? 
22、说说你对Promise的理解? 
23、谈谈你对Javascript垃圾回收机制的理解？ 
24、说说你对原型（prototype）理解? 
25、typeof与instanceof的区别是什么？ 
26、说说你对node.js的理解 
27、NPM(包管理器)作用是什么?