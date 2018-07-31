#考察点:
	1. ajax
	2. deferred
	3. 跨域 --需要考察
	4. 模板引擎 --需要考察
	5. JavaScript简介
	6. 数据类型
	7. 原生获取输入框值
	8. JS执行
	9. dom操作增、删、改、查、复制、创建
	10. json理解
	11. 略
	12. 闭包
	13. this对象 --需要考察
	14. JS创建对象的几种方式（es5）
	15. get和post的区别,何时使用post
	16. null和undefined的区别？
	17. 请写出js内存泄漏的问题?--需要考察
	18. css阻塞，js阻塞？
	19. 略
	20. 事件冒泡机制 --需要考察
	21. split()与join() 
	22. Promise  -需要考察
	23. Javascript垃圾回收机制 --需要考察
	24. 原型（prototype）理解
	25. typeof与instanceof的区别
	26. node.js的理解
	27. NPM
	28. typeof bar === “object” 判断问题
	29. 立即执行函数作用域
	30. 立即执行函数作用域
	31. IIFE立即执行函数 --需要考察
	32. (‘use strict’)
	33. return
	34. NAN
	35. 0.1+0.2
	36. isInteger(x) 是否是整数
	37. 定时机制和时间循环
	38. 回文字符串80字符内函数
	39. sum方法扩展
	40. for循环经典问题
	41. reverse
	42. 字符串数字混合运算
	43. 堆栈溢出 --需要考察
	44. for循环经典 --需要考察
	45. 逻辑判断&& || !=
	46. 逻辑判断
	47. 设置对象属性问题
	48. 递归
	49. 闭包
	50. call/apply/bind()--需要考察
	51. 深度优先搜索 


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

##11、ionic和angularjs的区别? 

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

##14、JavaScript对象的几种创建方式? 

**详细参考 -> JavaScript对象的几种创建方式.html**

    1. (1) 工厂模式
        引用该对象的时候，这里使用的是 var x = Parent()而不是 var x = new Parent();因为后者会可能出现很多问题（前者也成为工厂经典方式,后者称之为混合工厂方式），不推荐使用new的方式使用该对象
    2. (2) 构造函数方式
    3. (3) 原型模式
    4. (4) 混合的构造函数，原型方式（推荐）
    5. (5) 动态原型方式

##15、get和post的区别,何时使用post 

    1. (1)、作用：
        - get 是从服务器上获取数据，post 是向服务器传送数据。 get 请求返回 request - URI 所指出的任意信息。
        - Post 请求用来发送电子邮件、新闻或发送能由交互用户填写的表格。这是唯一需要在请求中发送body的请求。使用Post请求时需要在报文首部 Content - Length 字段中指出body的长度。 
    2. (2)、get 是把参数数据队列加到提交表单的ACTION属性所指的URL中，值和表单内各个字段一一对应，在URL中可以看到。post是通过HTTP post机制，将表单内各个字段与其内容放置在HTML HEADER内一起传送到ACTION属性所指的URL地址，用户看不到这个过程。 
    3. (3)、对于 get 方式，服务器端用Request.QueryString获取变量的值，对于 post 方式，服务器端用Request.Form获取提交的数据。 
    4. (4)、get 传送的数据量较小，不能大于2KB。post 传送的数据量较大，一般被默认为不受限制。但理论上，IIS4中最大量为80KB，IIS5中为100KB。 用IIS过滤器的只接受get参数，所以一般大型搜索引擎都是用get方式。
    5. (5)get安全性非常低，post 安全性相对较高。如果这些数据是中文数据而且是非敏感数据，那么使用get；如果用户输入的数据不是中文字符而且包含敏感数据，那么还是使用 post 为好。

##16、null和undefined的区别？

    (1)、null是一个表示”无”的对象，转为数值时为0；undefined是一个表示”无”的原始值，转为数值时为NaN。当声明的变量还未被初始化时，变量的默认值为undefined。 
    (2)、null用来表示尚未存在的对象，常用来表示函数企图返回一个不存在的对象。 
    (3)、undefined表示”缺少值”，就是此处应该有一个值，但是还没有定义。典型用法是： 
    a、变量被声明了，但没有赋值时，就等于undefined。 
    b、调用函数时，应该提供的参数没有提供，该参数等于undefined。 
    c、对象没有赋值的属性，该属性的值为undefined。 
    d、函数没有返回值时，默认返回undefined。 
    (4)、null表示”没有对象”，即该处不应该有值。典型用法是： 
    a、作为函数的参数，表示该函数的参数不是对象。
    b、作为对象原型链的终点。
 
##17、请写出js内存泄漏的问题? 

    (1)、IE7/8 DOM对象或者ActiveX对象循环引用导致内存泄漏 
        a、多个对象循环引用 
        b、循环引用自己 
    (2)、基础的DOM泄漏 
        当原有的DOM被移除时，子结点引用没有被移除则无法回收。 
    (3)、timer定时器泄漏 
        这个时候你无法回收buggyObject,解决办法，先停止timer然后再回收

##18、哪些地方会出现css阻塞，哪些地方会出现js阻塞？

    1. js的阻塞特性：
        所有浏览器在下载JS的时候，会阻止一切其他活动，比如其他资源的下载，内容的呈现等等。直到JS下载、解析、执行完毕后才开始继续并行下载其他资源并呈现内容。为了提高用户体验，新一代浏览器都支持并行下载JS，但是JS下载仍然会阻塞其它资源的下载（例如.图片，css文件等）。 
        由于浏览器为了防止出现JS修改DOM树，需要重新构建DOM树的情况，所以就会阻塞其他的下载和呈现。 
        嵌入JS会阻塞所有内容的呈现，而外部JS只会阻塞其后内容的显示，2种方式都会阻塞其后资源的下载。也就是说外部样式不会阻塞外部脚本的加载，但会阻塞外部脚本的执行。
    2. CSS怎么会阻塞加载？
        CSS本来是可以并行下载的，在什么情况下会出现阻塞加载了(在测试观察中，IE6下CSS都是阻塞加载） 
        当CSS后面跟着嵌入的JS的时候，该CSS就会出现阻塞后面资源下载的情况。而当把嵌入JS放到CSS前面，就不会出现阻塞的情况了。 
        根本原因：因为浏览器会维持html中css和js的顺序，样式表必须在嵌入的JS执行前先加载、解析完。而嵌入的JS会阻塞后面的资源加载，所以就会出现上面CSS阻塞下载的情况。
    3. JS应该放在什么位置？
    (1)、放在底部，虽然放在底部照样会阻塞所有呈现，但不会阻塞资源下载。 
    (2)、如果嵌入JS放在head中，请把嵌入JS放在CSS头部。 
    (3)、使用defer（只支持IE） 
    (4)、不要在嵌入的JS中调用运行时间较长的函数，如果一定要用，可以用setTimeout来调用
    4. Javascript无阻塞加载具体方式
        1. 将脚本放在底部。\还是放在head中，用以保证在js加载前，能加载出正常显示的页面。\<script>标签放在\前。 
        2. 成组脚本：由于每个\<script>标签下载时阻塞页面解析过程，所以限制页面的\<script>总数也可以改善性能。适用于内联脚本和外部脚本。
        3. 非阻塞脚本：等页面完成加载后，再加载js代码。也就是，在window.onload事件发出后开始下载代码。 
        4. 其他方法 
        （1）defer属性：支持IE4和fierfox3.5更高版本浏览器 
        （2）动态脚本元素：文档对象模型（DOM）允许你使用js动态创建HTML的几乎全部文档内容。代码如下：
            `<script>
                var script=document.createElement("script");
                script.type="text/javascript";
                script.src="file.js";
                document.getElementsByTagName("head")[0].appendChild(script);
            </script>`
        此技术的重点在于：无论在何处启动下载，文件额下载和运行都不会阻塞其他页面处理过程。即使在head里（除了用于下载文件的http链接）。

##19、对比Flash与ajax哪个好？

 
##20、请你解释一下事件冒泡机制 

    a、在一个对象上触发某类事件（比如单击onclick事件），如果此对象定义了此事件的处理程序，那么此事件就会调用这个处理程序，如果没有定义此事件处理程序或者事件返回true，那么这个事件会向这个对象的父级对象传播，从里到外，直至它被处理（父级对象所有同类事件都将被激活），或者它到达了对象层次的最顶层，即document对象（有些浏览器是window）。 
    b、冒泡型事件：事件按照从最特定的事件目标到最不特定的事件目标(document对象)的顺序触发 
    c、js冒泡机制是指如果某元素定义了事件A，如click事件，如果触发了事件之后，没有阻止冒泡事件，那么事件将向父级元素传播，触发父类的click函数。

    //阻止冒泡时间方法，兼容ie(e.cancleBubble)和ff(e.stopProgation)
    `function stopBubble(e){
        var evt = e||window.event;
        evt.stopPropagation?evt.stopPropagation():  (evt.cancelBubble=true);//阻止冒泡
        evt.preventDefault
    }`

##21、请你说说split()与join() 函数的区别? 

    前者是切割成数组的形式，后者是将数组转换成字符串Join 函数获取一批字符串，然后用分隔符字符串将它们联接起来，从而返回一个字符串。Split 函数获取一个字符串，然后在分隔符处将其断开，从而返回一批字符串。但是，这两个函数之间的主要区别在于 Join 可以使用任何分隔符字符串将多个字符串连接起来，而 Split 只能使用一个字符分隔符将字符串断开。 
    简单地说，如果你用split，是把一串字符（根据某个分隔符）分成若干个元素存放在一个数组里。而Join是把数组中的字符串连成一个长串，可以大体上认为是split的逆操作。

##22、说说你对Promise的理解? 

    ES6 原生提供了 Promise 对象。 
    所谓 Promise，就是一个对象，用来传递异步操作的消息。它代表了某个未来才会知道结果的事件（通常是一个异步操作），并且这个事件提供统一的 API，可供进一步处理。 
    Promise 对象有以下两个特点。 
    (1)、对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称 Fulfilled）和 Rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 Promise 这个名字的由来，它的英语意思就是「承诺」，表示其他手段无法改变。 
    (2)、一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise 对象的状态改变，只有两种可能：从 Pending 变为 Resolved 和从 Pending 变为 Rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。就算改变已经发生了，你再对 Promise 对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

    有了 Promise 对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise 对象提供统一的接口，使得控制异步操作更加容易。

    Promise 也有一些缺点。首先，无法取消 Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。第三，当处于 Pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

##23、谈谈你对Javascript垃圾回收机制的理解？ 

    (1)、标记清除（mark and sweep）

    这是JavaScript最常见的垃圾回收方式，当变量进入执行环境的时候，比如函数中声明一个变量，垃圾回收器将其标记为“进入环境”，当变量离开环境的时候（函数执行结束）将其标记为“离开环境”。 
    垃圾回收器会在运行的时候给存储在内存中的所有变量加上标记，然后去掉环境中的变量以及被环境中变量所引用的变量（闭包），在这些完成之后仍存在标记的就是要删除的变量了

    (2)、引用计数(reference counting)

    在低版本IE中经常会出现内存泄露，很多时候就是因为其采用引用计数方式进行垃圾回收。引用计数的策略是跟踪记录每个值被使用的次数，当声明了一个 变量并将一个引用类型赋值给该变量的时候这个值的引用次数就加1，如果该变量的值变成了另外一个，则这个值得引用次数减1，当这个值的引用次数变为0的时 候，说明没有变量在使用，这个值没法被访问了，因此可以将其占用的空间回收，这样垃圾回收器会在运行的时候清理掉引用次数为0的值占用的空间。 
    在IE中虽然JavaScript对象通过标记清除的方式进行垃圾回收，但BOM与DOM对象却是通过引用计数回收垃圾的，也就是说只要涉及BOM及DOM就会出现循环引用问题。

##24、说说你对原型（prototype）理解?

    JavaScript是一种通过原型实现继承的语言与别的高级语言是有区别的，像java，C#是通过类型决定继承关系的，JavaScript是的动态的弱类型语言，总之可以认为JavaScript中所有都是对象，在JavaScript中，原型也是一个对象，通过原型可以实现对象的属性继承，JavaScript的对象中都包含了一个” prototype”内部属性，这个属性所对应的就是该对象的原型。

    “prototype”作为对象的内部属性，是不能被直接访问的。所以为了方便查看一个对象的原型，Firefox和Chrome内核的JavaScript引擎中提供了”proto“这个非标准的访问器（ECMA新标准中引入了标准对象原型访问器”Object.getPrototype(object)”）。

    原型的主要作用就是为了实现继承与扩展对象。
 
##25、typeof与instanceof的区别是什么？

    在 JavaScript 中，判断一个变量的类型可以用typeof

    (1)、数字类型， typeof 返回的值是 number。比如说：typeof(1)，返回值是number 
    (2)、字符串类型， typeof 返回的值是 string。比如typeof(“123”)返回值是string。 
    (3)、布尔类型， typeof 返回的值是 boolean 。比如typeof(true)返回值是boolean。 
    (4)、对象、数组、null 返回的值是 object 。比如typeof(window)，typeof(document)，typeof(null)返回的值都是object。 
    (5)、函数类型，返回的值是 function。比如：typeof(eval)，typeof(Date)返回的值都是function。 
    (6)、不存在的变量、函数或者undefined，将返回undefined。比如：typeof(abc)、typeof(undefined)都返回undefined。

    在 JavaScript 中,instanceof用于判断某个对象是否被另一个函数构造。

    使用 typeof 运算符时采用引用类型存储值会出现一个问题，无论引用的是什么类型的对象，它都返回 “object”。ECMAScript 引入了另一个 Java 运算符 instanceof 来解决这个问题。instanceof 运算符与 typeof 运算符相似，用于识别正在处理的对象的类型。与 typeof 方法不同的是，instanceof 方法要求开发者明确地确认对象为某特定类型。
 
##26、说说你对node.js的理解

    a、Node.js 是一个基于Google Chrome V8 引擎的 JavaScript 运行环境。Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。Node.js 的包管理器 npm，是全球最大的开源库生态系统。 
    b、能方便地搭建响应速度快、易于扩展的网络应用，Node.js 使用事件驱动， 非阻塞I/O 模型而得以轻量和高效，非常适合在分布式设备上运行的数据密集型的实时应用。 
    c、简单说Node.js就是运行在服务器端的JavaScript，是现在流行的语言中能同时运行在前端与后台的程序语言
 
##27、NPM(包管理器)作用是什么?

    NPM是随同NodeJS一起安装的包管理工具，能解决NodeJS代码部署上的很多问题，常见的使用场景有以下几种： 
    a、允许用户从NPM服务器下载别人编写的第三方包到本地使用。 -> `npm install --save-dev 包名` 多个包名用空格隔开
    b、允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用。 -> `npm adduser`
    c、允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用。-> `npm publish`
    
##28.使用 typeof bar === “object” 判断 bar 是不是一个对象有神马潜在的弊端？如何避免这种弊端？

	使用 typeof 的弊端是显而易见的(这种弊端同使用 instanceof)：

	let obj = {};
	let arr = [];
 
	console.log(typeof obj === 'object');  //true
	console.log(typeof arr === 'object');  //true
	console.log(typeof null === 'object');  //true
	从上面的输出结果可知，typeof bar === “object” 并不能准确判断 bar 就是一个 Object。可以通过 Object.prototype.toString.call(bar) === “[object Object]” 来避免这种弊端：

	let obj = {};
	let arr = [];
 
	console.log(Object.prototype.toString.call(obj));  //[object Object]
	console.log(Object.prototype.toString.call(arr));  //[object Array]
	console.log(Object.prototype.toString.call(null));  //[object Null]
	另外，为了珍爱生命，请远离 ==： 
	珍爱生命

	而 [] === false 是返回 false 的。

##29.下面的代码会在 console 输出神马？为什么？

	(function(){
  		var a = b = 3;
	})();
 
	console.log("a defined? " + (typeof a !== 'undefined'));   
	console.log("b defined? " + (typeof b !== 'undefined'));
	这跟变量作用域有关，输出换成下面的：

	console.log(b); //3
	console,log(typeof a); //undefined
	拆解一下自执行函数中的变量赋值：

	b = 3;
	var a = b;
	所以 b 成了全局变量，而 a 是自执行函数的一个局部变量。

##30.下面的代码会在 console 输出神马？为什么？

	var myObject = {
    	foo: "bar",
    	func: function() {
        	var self = this;
        	console.log("outer func:  this.foo = " + this.foo);
        	console.log("outer func:  self.foo = " + self.foo);
        	(function() {
            	console.log("inner func:  this.foo = " + this.foo);
            	console.log("inner func:  self.foo = " + self.foo);
        	}());
    	}
	};
	myObject.func();
	第一个和第二个的输出不难判断，在 ES6 之前，JavaScript 只有函数作用域，所以 func 中的 IIFE 有自己的独立作用域，并且它能访问到外部作用域中的 self，所以第三个输出会报错，因为 this 在可访问到的作用域内是 undefined，第四个输出是 bar。如果你知道闭包，也很容易解决的：

	(function(test) {
            console.log("inner func:  this.foo = " + test.foo);  //'bar'
            console.log("inner func:  self.foo = " + self.foo);
	}(self));


##31.将 JavaScript 代码包含在一个函数块中有神马意思呢？为什么要这么做？

	换句话说，为什么要用立即执行函数表达式（Immediately-Invoked Function Expression）。

	IIFE 有两个比较经典的使用场景，一是类似于在循环中定时输出数据项，二是类似于 JQuery/Node 的插件和模块开发。

	for(var i = 0; i < 5; i++) {
    	setTimeout(function() {
        	console.log(i);  
    	}, 1000);
	}
	上面的输出并不是你以为的0，1，2，3，4，而输出的全部是5，这时 IIFE 就能有用了：

	for(var i = 0; i < 5; i++) {
    	(function(i) {
      	setTimeout(function() {
        	console.log(i);  
      	}, 1000);
    	})(i)
	}
	而在 JQuery/Node 的插件和模块开发中，为避免变量污染，也是一个大大的 IIFE：

	(function($) { 
        //代码
 	} )(jQuery);

##32.在严格模式(‘use strict’)下进行 JavaScript 开发有神马好处？

	消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
	消除代码运行的一些不安全之处，保证代码运行的安全；
	提高编译器效率，增加运行速度；
	为未来新版本的Javascript做好铺垫。 

##33.下面两个函数的返回值是一样的吗？为什么？
	function foo1(){
  		return {
      		bar: "hello"
  		};
	}
 
	function foo2(){
  		return
  		{
      		bar: "hello"
  		};
	}
	
	在编程语言中，基本都是使用分号（;）将语句分隔开，这可以增加代码的可读性和整洁性。而在JS中，如若语句各占独立一行，通常可以省略语句间的分号（;），JS 解析器会根据能否正常编译来决定是否自动填充分号：

	var test = 1 + 2;
	console.log(test);  //3
	在上述情况下，为了正确解析代码，就不会自动填充分号了，但是对于 return 、break、continue 等语句，如果后面紧跟换行，解析器一定会自动在后面填充分号(;)，所以上面的第二个函数就变成了这样：

	function foo2()
	{
  		return;
  	{
      	bar: "hello"
  	};
	}
	所以第二个函数是返回 undefined。

##34.神马是 NaN，它的类型是神马？怎么测试一个值是否等于 NaN?

	NaN 是 Not a Number 的缩写，JavaScript 的一种特殊数值，其类型是 Number，可以通过 isNaN(param) 来判断一个值是否是 NaN：

	console.log(isNaN(NaN)); //true
	console.log(isNaN(23)); //false
	console.log(isNaN('ds')); //true
	console.log(isNaN('32131sdasd')); //true
	console.log(NaN === NaN); //false
	console.log(NaN === undefined); //false
	console.log(undefined === undefined); //false
	console.log(typeof NaN); //number
	console.log(Object.prototype.toString.call(NaN)); //[object Number]
	ES6 中，isNaN() 成为了 Number 的静态方法：Number.isNaN().

##35.解释一下下面代码的输出

	console.log(0.1 + 0.2);   //0.30000000000000004
	console.log(0.1 + 0.2 == 0.3);  //false
	JavaScript 中的 number 类型就是浮点型，JavaScript 中的浮点数采用IEEE-754 格式的规定，这是一种二进制表示法，可以精确地表示分数，比如1/2，1/8，1/1024，每个浮点数占64位。但是，二进制浮点数表示法并不能精确的表示类似0.1这样 的简单的数字，会有舍入误差。

	由于采用二进制，JavaScript 也不能有限表示 1/10、1/2 等这样的分数。在二进制中，1/10(0.1)被表示为 0.00110011001100110011…… 注意 0011 是无限重复的，这是舍入误差造成的，所以对于 0.1 + 0.2 这样的运算，操作数会先被转成二进制，然后再计算：

	0.1 => 0.0001 1001 1001 1001…（无限循环）
	0.2 => 0.0011 0011 0011 0011…（无限循环）
	双精度浮点数的小数部分最多支持 52 位，所以两者相加之后得到这么一串 0.0100110011001100110011001100110011001100…因浮点数小数位的限制而截断的二进制数字，这时候，再把它转换为十进制，就成了 0.30000000000000004。

	对于保证浮点数计算的正确性，有两种常见方式。

	一是先升幂再降幂：

	function add(num1, num2){
  		let r1, r2, m;
  		r1 = (''+num1).split('.')[1].length;
  		r2 = (''+num2).split('.')[1].length;
 
  		m = Math.pow(10,Math.max(r1,r2));
  		return (num1 * m + num2 * m) / m;
	}
	console.log(add(0.1,0.2));   //0.3
	console.log(add(0.15,0.2256)); //0.3756
	二是是使用内置的 toPrecision() 和 toFixed() 方法，注意，方法的返回值字符串。

	function add(x, y) {
    	return x.toPrecision() + y.toPrecision()
	}
	console.log(add(0.1,0.2));  //"0.10.2"
	
##36.实现函数 isInteger(x) 来判断 x 是否是整数

	可以将 x 转换成10进制，判断和本身是不是相等即可：

	function isInteger(x) { 
    	return parseInt(x, 10) === x; 
	}
	ES6 对数值进行了扩展，提供了静态方法 isInteger() 来判断参数是否是整数：

	Number.isInteger(25) // true
	Number.isInteger(25.0) // true
	Number.isInteger(25.1) // false
	Number.isInteger("15") // false
	Number.isInteger(true) // false
	JavaScript能够准确表示的整数范围在 -2^53 到 2^53 之间（不含两个端点），超过这个范围，无法精确表示这个值。ES6 引入了Number.MAX_SAFE_INTEGER 和 Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限，并提供了 Number.isSafeInteger() 来判断整数是否是安全型整数。

##37.在下面的代码中，数字 1-4 会以什么顺序输出？为什么会这样输出？

	(function() {
    	console.log(1); 
    	setTimeout(function(){console.log(2)}, 1000); 
    	setTimeout(function(){console.log(3)}, 0); 
    	console.log(4);
	})();
	这个就不多解释了，主要是 JavaScript 的定时机制和时间循环，不要忘了，JavaScript 是单线程的。详解可以参考 从setTimeout谈JavaScript运行机制。
	
	//1432

##38.写一个少于 80 字符的函数，判断一个字符串是不是回文字符串

	function isPalindrome(str) {
    	str = str.replace(/\W/g, '').toLowerCase();
    	return (str == str.split('').reverse().join(''));
	}
	//上海自来水来自海上 -> true

##39.写一个按照下面方式调用都能正常工作的 sum 方法

	console.log(sum(2,3));   // Outputs 5
	console.log(sum(2)(3));  // Outputs 5
	针对这个题，可以判断参数个数来实现：

	function sum() {
  		var fir = arguments[0];
  		if(arguments.length === 2) {
    		return arguments[0] + arguments[1]
  		} else {
 			return function(sec) {
       			return fir + sec;
    		}
  		}
	}
	
##40.根据下面的代码片段回答后面的问题

	for (var i = 0; i < 5; i++) {
  		var btn = document.createElement('button');
  		btn.appendChild(document.createTextNode('Button ' + i));
  		btn.addEventListener('click', function(){ console.log(i); });
  		document.body.appendChild(btn);
	}
	1、点击 Button 4，会在控制台输出什么？ //5 5 5 5 5
	2、给出一种符合预期的实现方式

	答案：1、点击5个按钮中的任意一个，都是输出5 
	2、参考 IIFE，或改成let

##41.下面的代码会输出什么？为什么？

	var arr1 = "john".split(''); [ 'n', 'h', 'o', 'j', [ 'j', 'o', 'n', 'e', 's' ] ]
	var arr2 = arr1.reverse(); [ 'n', 'h', 'o', 'j', [ 'j', 'o', 'n', 'e', 's' ] ]
	var arr3 = "jones".split(''); ['j','o','n','e','s']
	arr2.push(arr3);
	console.log("array 1: length=" + arr1.length + " last=" + arr1.slice(-1));
	console.log("array 2: length=" + arr2.length + " last=" + arr2.slice(-1));
	//array 1: length=5 last=j,o,n,e,s
	//array 2: length=5 last=j,o,n,e,s
	
	MDN 上对于 reverse() 的描述是酱紫的：

	Description 
	The reverse method transposes the elements of the calling array object in place, mutating the array, and returning a reference to the array.
	reverse() 会改变数组本身，并返回原数组的引用。

	slice 的用法请参考：slice

##42.下面的代码会输出什么？为什么？

	console.log(1 +  "2" + "2");
	console.log(1 +  +"2" + "2");
	console.log(1 +  -"1" + "2");
	console.log(+"1" +  "1" + "2");
	console.log( "A" - "B" + "2");
	console.log( "A" - "B" + 2);
	需要注意三个点：

	多个数字和数字字符串混合运算时，跟操作数的位置有关
	console.log(2 + 1 + '3'); / /‘33’
	console.log('3' + 2 + 1); //'321'
	数字字符串之前存在数字中的正负号(+/-)时，会被转换成数字
	console.log(typeof '3');   // string
	console.log(typeof +'3');  //number
	同样，可以在数字前添加 ”，将数字转为字符串

	console.log(typeof 3);   // number
	console.log(typeof (''+3));  //string
	对于运算结果不能转换成数字的，将返回 NaN
	console.log('a' * 'sd');   //NaN
	console.log('A' - 'B');  // NaN


##43.如果 list 很大，下面的这段递归代码会造成堆栈溢出。如果在不改变递归模式的前提下修善这段代码？

	var list = readHugeList();
 
	var nextListItem = function() {
    	var item = list.pop();
 
    	if (item) {
        	// process the list item...
        	nextListItem();
    	}
	};
	解决方式是加个定时器：

	var list = readHugeList();
 
	var nextListItem = function() {
    	var item = list.pop();
 
    	if (item) {
        	// process the list item...
        	setTimeout( nextListItem, 0);
		}
	};
	
##44.下面的代码会输出什么？为啥？

	for (var i = 0; i < 5; i++) {
  		setTimeout(function() { console.log(i); }, i * 1000 );
	}//5,5,5,5,5

##45.解释下列代码的输出

	console.log("0 || 1 = "+(0 || 1));//0 || 1 = 1
	console.log("1 || 2 = "+(1 || 2));//1 || 2 = 1
	console.log("0 && 1 = "+(0 && 1));//0 && 1 = 0
	console.log("1 && 2 = "+(1 && 2));//1 && 2 = 2
	逻辑与和逻辑或运算符会返回一个值，并且二者都是短路运算符：
	
	逻辑与返回第一个是 false 的操作数 或者 最后一个是 true的操作数
	console.log(1 && 2 && 0);  //0
	console.log(1 && 0 && 1);  //0
	console.log(1 && 2 && 3);  //3
	如果某个操作数为 false，则该操作数之后的操作数都不会被计算

	逻辑或返回第一个是 true 的操作数 或者 最后一个是 false的操作数
	console.log(1 || 2 || 0); //1
	console.log(0 || 2 || 1); //2
	console.log(0 || 0 || false); //false
	如果某个操作数为 true，则该操作数之后的操作数都不会被计算

	如果逻辑与和逻辑或作混合运算，则逻辑与的优先级高：

	console.log(1 && 2 || 0); //2
	console.log(0 || 2 && 1); //1
	console.log(0 && 2 || 1); //1
	在 JavaScript，常见的 false 值：

	0, '0', +0, -0, false, '',null,undefined,null,NaN
	要注意空数组([])和空对象({}):

	console.log([] == false) //true
	console.log({} == false) //false
	console.log(Boolean([])) //true
	console.log(Boolean({})) //true
	所以在 if 中，[] 和 {} 都表现为 true：

##46.解释下面代码的输出

	console.log(false == '0')//true
	console.log(false === '0')//false
	请参考前面第14题运算符转换规则的图。

##47.解释下面代码的输出

	var a={},
    b={key:'b'},
    c={key:'c'};
 
	a[b]=123;
	a[c]=456;
 
	console.log(a[b]);
	输出是 456，参考原文的解释：
	这样做的原因是：在设置对象属性时，JavaScript将隐式地细化参数值。在这种情况下，由于B和C都是对象，它们都将被转换为“[object object ]”。因此，[b] AND[C]既等价于[[对象[object ] ] ]，也可以互换使用。因此，设置或引用A[C]与设置或引用[B]完全一样。

##48.解释下面代码的输出

	console.log((function f(n){return ((n > 1) ? n * f(n-1) : n)})(10));//3628800
	结果是10的阶乘。这是一个递归调用，为了简化，我初始化 n=5，则调用链和返回链如下：
	//120
	
##49.解释下面代码的输出

	(function(x) {
    	return (function(y) {
    		console.log(y);//2
        	console.log(x);//1
    	})(2)
	})(1);//1
	输出1，闭包能够访问外部作用域的变量或参数。

##50.解释下面代码的输出，并修复存在的问题

	var hero = {
    	_name: 'John Doe',
    	getSecretIdentity: function (){
        	return this._name;
    	}
	};
 
	var stoleSecretIdentity = hero.getSecretIdentity;
 
	console.log(stoleSecretIdentity());
	console.log(hero.getSecretIdentity());
	将 getSecretIdentity 赋给 stoleSecretIdentity，等价于定义了 stoleSecretIdentity 函数：

	var stoleSecretIdentity =  function (){
        return this._name;
	}
	stoleSecretIdentity 的上下文是全局环境，所以第一个输出 undefined。若要输出 John Doe，则要通过 call 、apply 和 bind 等方式改变 stoleSecretIdentity 的this 指向(hero)。
	stoleSecretIdentity.bind(hero)()；
	第二个是调用对象的方法，输出 John Doe。

##51.给你一个 DOM 元素，创建一个能访问该元素所有子元素的函数，并且要将每个子元素传递给指定的回调函数。

	函数接受两个参数：

	DOM
	指定的回调函数 
	原文利用 深度优先搜索(Depth-First-Search) 给了一个实现：
	function Traverse(p_element,p_callback) {
   		p_callback(p_element);
   		var list = p_element.children;
   		for (var i = 0; i < list.length; i++) {
       		Traverse(list[i],p_callback);  // recursive call
   		}
	}