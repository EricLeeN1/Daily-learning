#React.js

##一、library与Framework的区分
- library（库）：
	- 小而巧的库，只提供了一些特定的API
	- jQuery，Zpeto
	- 优点：很方便的从一个库切换到另一个库，代码几乎不会改变
- Framework（框架）：
	- 大而全的框架
	- 提供了一整套的解决方案，如果在项目中间想切换到另外一个框架，是比较困难的。
##二、前端三大主流框架

- Angular.js->出来最早的前端框架
- Vue.js->最火（关注的人比较多）的前端框架
- React.js->最流行（用的人比较多）的前端框架

##三、React与Vue的对比

###1. 组件化方面
####a. 什么是模块化：
- 是从**代码**的角度进行分析；
- 把一些可复用的代码，抽离为单个的模块；
- 便于项目的维护和开发；
####b. 什么是组件化：
- 是从**UI界面**的角度来进行分析；
- 把一些可复用的UI元素，抽离为单独的组件；
- 便于项目的维护和开发；
####c. 组件化的好处：
- 随着项目规模的增大，手里的组件越来越多；
- 很方便就能把现有组件拼接为一个完整的页面；
- 便于项目的维护和开发；
####d. Vue是如何实现组件化：
- 通过`.vue`文件来创建对应的组件；
	- template	结构
	- script	行为
	- style	样式
####e. React如何实现组件化：
- React中，一切都是以JS来表现的；
- ES6要会用。ES7(async和await)
###2. 开发团队方面
- React是由Facebook前端官方团队进行维护和更新的；
- Vue尤雨溪及其团队维护；
###3. 社区方面
- Vue出现的晚，社区比React小；
- React出现的早，社区完善；
###4. 移动APP开发
- Vue结合Weex提供了迁移到移动端APP开发的体验；
- React,结合ReactNative，提供无缝迁移到移动APP的开发体验；

##四、为什么要学习React
- 设计优秀，一切基于JS并且实现了组件化开发的思想；
- 开发团队实力强悍，不会断更；
- 社区强大，很多问题都能找到对应的解决方案；
- 提供了无缝转到ReactNative上的开发体验，

##五、React中几个核心的概念
1. **虚拟DOM（Virtual Document	Object	Model）**
	- **DOM的本质是什么：**浏览器中的概念，用JS对象来表示页面上的元素，并提供了操作DOM对象的API；
	- **为什么是React中的虚拟DOM：**是框架中的概念，是程序员用JS对象来模拟页面上的DOM和DOM嵌套；
	- **为什么要实现虚拟DOM（虚拟DOM的目的）：**为了实现页面中，DOM元素的高效更新
	- **DOM和虚拟DOM的区别**
		- **DOM**:浏览器中提供的概念；用JS对象，表示页面上的元素，并提供了操作元素的API
		- **虚拟DOM**：是框架中的概念；而是开发框架的程序员，手动用JS对象来模拟DOM元素和嵌套关系；
			- **本质：**用JS对象来模拟DOM元素和嵌套关系；
			- **目的：**就是为了实现页面元素的高效更新；
2. **Diff算法**
	- **tree diff:**新旧两颗DOM树，逐层对比的过程，就是Tree Diff;当整颗DOM逐层对比完毕，则所有需要被按需更新的元素，必然能够找到；
	- **component diff:**在进行Tree Diff的时候，每一层中，组件级别的对比，叫做Component Diff；
		- 如果对比前后，组件的类型相同，则暂时认为此组件不需要被更新；
		- 如果对比前后，组件类型不同，则需要移除旧组件，创建新组件，并追加到页面上；
	- **element diff:**在进行组件对比的时候，如果两个组件类型相同，则需要进行元素级别的对比，这叫做Element Diff;

##六、创建基本的webpack4.x项目
1. 运行`npm init -y`快速初始化项目
2. 在项目根目录创建`src`源代码目录和`dist`发布目录
3. 在src目录下创建`index.html`
4. 使用cnpm安装webpack及脚手架，运行`cnpm i webpack webpack-cli -D`
	- 全局运行`npm i cnpm -g`
5. **tips：**webpack4.x提供了约定大于配置的概念；目的是为了尽量减少配置文件的体积；
	- 默认约定了
		- 打包的入口是`src`->`index.js`
		- 打包的输出文件是`dist`->`main.js`
		- 4.x中新增了`mode`选项，可选的值为：`development`、`production`

	- `"dev": "webpack-dev-server --open firefox --port 3000  --hot --progress --compress"`
		- `--open firefox：`设置自动打开浏览器，如果不加参数默认浏览器打开。
		- `--port 3000`设置端口号为3000
		- `--compress`设置压缩
		- `--hot`设置热替换
		- `--progress`设置显示进度

##七、webpack中使用的包

	`-D` -> 工具
	`-S` -> 开发到上线都要使用的包
	`cnpm i html-webpack-plugin -D` -> 写法
	webpack
	webpack-cli -> webpack脚手架
	webpack-dev-server -> webpack服务
	html-webpack-plugin -> html打包
	babel-core
	babel-loader
	babel-plugin-transform-runtime
	babel-preset-env
	babel-preset-react
	babel-preset-stage-0
	react -> 专门用于创建组件，同时组件的生命周期都在这个包中
	react-dom -> 专门进行DOM操作的，最主要的应用场景就是`ReactDOM.render()`
	css-loader
	style-loader
	url-loader -> 用来处理文字，图片
	file-loader -> url-loader依赖项之一
	
##八、项目中使用react

1. 运行`cnpm i react react-dom -S`安装包
	- **react** -> 专门用于创建组件和虚拟DOM的，同时组件的生命周期都在这个包中
	- **react-dom** -> 专门进行DOM操作的，最主要的应用场景就是`ReactDOM.render()`
2. 在`index.html`页面中，创建容器：
	<!-- 容器，将来，使用React创建的虚拟DOM元素，都会被渲染到这个指定的容器中--> 
	- `<div id="app"></div>`
3. 导入包 
	- `import React from 'react';`
	- `import ReactDOM from 'react-dom';`
4. 创建虚拟DOM元素：
	- //创建虚拟DOM元素
	- // 这是创建虚拟DOM元素的API <h1 title="啊，五环" id="myh1">你比四环多一环</h1>
	- // 第一个参数：字符串类型的参数，表示要创建的标签的名称
	- // 第二个参数：对象类型的参数，表示创建的元素的属性节点
	- // 第三个参数：子节点
	- const myh1 = React.createElement('h1', {title: '啊，五环',id: "myh1"}, "你比四环多一环");
5. 渲染：
	- // 参数1：要渲染的那个虚拟DOM元素
	- // 参数2：指定页面上一个容器做容器，是一个DOM元素而不是选择器
	- ReactDOM.render(myh1,document.getElementById('app'));
##九、JSX语法
	定义：就是符合xml规范的JS语法；（语法格式相对来说，要比HTML严谨很多）
1. 如何启用JSx语法
	- 安装`babel`插件
		- 运行`cnpm i babel-core babel-loader babel-plugin-transform-runtime -D`
		- 运行`cnpm i babel-preset-env babel-preset-stage-0 -D`
	- 安装能够识别转换JSX语法的包`babel-preset-react`
		- 运行`cnpm i babel-preset-react -D`
	- 添加`.babelrc`配置文件
		- `{"presets": [
        "env",
        "stage-0",
        "react"
    ],
    "plugins": [
        "transform-runtime"
    ]}` 
    - 添加babel-loader配置项：
	    - `module: { // 要打包的第三方模块
        rules: [{ // 第三方匹配规则
            test: /\.js|jsx$/,
            use: "babel-loader",
            exclude: /node_modules/, // 排除项
            // options: {
            //     presets: ['latest'],
            //     plugins: ['transform-runtime']
            // }
        }]
    },`
2. **JSX语法的本质：**并不是直接把jsx渲染到页面上，而是内部先转换成了createElement形式，再渲染。
3. **再JSX中混合写入js表达式：**在JSX语法中，要把JS代码写到{}中
	- 渲染数字
	- 渲染字符串
	- 渲染布尔值
	- 为属性绑定值
	- 渲染JSX元素
	- 渲染JSX元素数组
	- 将普通字符数组，转为JSX数组并渲染到页面上【两种方案】
4. **在JSX中写注释：**推荐使用{/*这是注释*/}
5. **在JSX中的元素添加class类名：**
	- 需要使用`className`来替代`class`；
	- `htmlFor`替换label的`for`属性 
6. 在JSX创建DOM的时候，所有的节点，必须有唯一的根元素进行包裹；
7. 在JSX语法中，标签必须成对出现，如果是但标签，则必须自闭和！
8. 当编译引擎，在编译JSX代码的时候，如果遇到了`<`那么就去把它当做HTML代码去编译，如果遇到了`{}`就把花括号内的代码当做普通JS代码去编译；

##十、组件
###1). React中创建组件
####第1种--创建组件的方式
**使用构造函数来创建组件，**如果需要接收外界传递的数据,需要在构造函数的参数列表中使用`props`来接收；必须要向外return一个合法的JSX创建的虚拟DOM；

- 创建组件

	function Hello(){
		//return null
		<div>Hello 组件</div>
	}
- 为组件传递数据

		// 使用组件并为组件传递props数据
		<Hello name={user.name} age={user.age} gender={user.gender}>
		
		// 在构造函数中，使用props形参，接收外界传递过来的数据
		function Hello(props) {
    		// 结论：不论是Vue还是React，组件中的props永远都是只读的；不能被重新赋值
    		return <h1 title={props.name}>{props.name}--{props.age}岁--{props.gender==1?'男':'女'}</h1>
		};
</Hello>
1. 父组件向子组件传递数据
2. 使用{...obj}属性扩展传递数据
3. 将组件封装到单独的文件中
4. tips:组件的名称首字母必须是大写；
5. 如何省略`.jsx`后缀名
	1. // 打开webpack.config.js,并在导出的配置中，新增如下节点：
	`resolve: {
        extensions: ['.js', '.jsx', '.json'] //表示这几个文件的后缀名可省略不写
    }`
6. 在导入组件的时候，配置和使用@路径符号
	1. 111
	`alias:{ // 表示别名
            '@':path.join(__dirname,'./src') //这样，@就表示项目根目录中src这一层路径
   	}`
####第2种--创建组件的方式
	使用class关键字来创建组件
	Es6中class关键字，是实现面向对象的新形式
#####了解ES6中class关键字的使用
	1. class中`constructor`的基本使用
	2. 实例属性和实例方法
	3. 静态属性和静态方法
	4. 使用`extends`关键字来实现继承
#####基于class关键字创建组件
1. 最基本的组件结构：
	1. 如果要使用class定义组件，必须让自己的组件，继承自React.Component; 
	`class 组件名称 extends React.Component{
		// 在组件内部，必须有render函数
		render(){
			// render函数中，必须返回合法的JSX
			return <div>这是class创建的组件</div>
		}
	}`
###2)、两种创建组件方式的对比；
> 注意：使用class关键字创建的组件，有自己的私有数据（this.state）和生命周期；

> 但是使用function创建的组件，只有props，没有自己的私有数据和生命周期函数。

1. 用**构造函数**创建出来的组件：叫做'无状态组件'【无状态组件今后用的不多】；
2. 用**class关键字**创建出来的组件：叫做'有状态组件'【今后用的最多】；
3. 什么情况下使用有状态组件？什么情况下使用无状态组件？
 	- 如果一个组件需要有自己的私有数据，则推荐使用：class创建的有状态组件；
 	- 如果一个组件不需要有私有的数据，则推荐使用：无状态组件；
 	- React官方说：无状态组件，由于没有自己的state和省名周期函数，所以运行效率会比有状态组件稍微高一些；
> **tips:**有状态组件和无状态组件之间的**本质区别**就是：有无state属性、和有无生命周期函数;

4. 组件中的`props`和`state/data`之间的区别
	- `props`中的数据都是外界传递过来的；
	- `state/data`中的数据，都是组件私有的；（通过Ajax获取回来的数据，一般都是私有数据）；
	- `props`中的数据都是只读的；不能重新赋值； 
	- `state/data`中的数据，都是可读可写的；

###3)、 渲染评论列表
**通过for循环生成多个组件**
1. 数据：

	`CommentList:[
    {id:1,user:"张三",content:"哈哈，沙发"},
    {id:2,user:"李四",content:"哈哈，板凳"},
    {id:3,user:"王五",content:"哈哈，凉席"},
    {id:4,user:"赵六",content:"哈哈，砖头"},
    {id:5,user:"田七",content:"哈哈，楼下山炮"},
	]`
###4）、设置样式

1. 使用普通的`style`样式
		
		<h1 style={{color:"red",fontWeight:200}}></h1> 
		
2. 启用css-modules
	1. 修改`webpack.config.js`这个配置文件，为`css-loader`添加参数：
		
			{ //打包处理第三方loader
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader?modules',//可以在css-loader值，通过？追加参数，
                // 其中有个固定的参数，叫做modules，表示为普通的CSS样式表，启用模块化
            ]
        	}
	2. 在需要的组件中，`import`导入样式表，并接收模块化的CSS样式表，启用CSS模块化
			
			import cssobj from '@/css/cmtItem.css';

	3. 在需要的HTML标签上，使用`className`指定模块化的样式：
			
			<h1 className={cssobj.title}></h1>
			
3. 使用`localIdentName`自定义生成的类名格式，可选的参数有：

	- [path]表示样式表`相对于项目根目录`所在路径
	- [name]表示样式表文件名称
	- [local]表示样式的类名定义名称
	- [hash:length]表示32位的hash值
	- 例子：
			 
			{ //打包处理第三方loader
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader?modules&localIdentName=[path][name]-[local]-[hash:8]',//可以在css-loader值，通过？追加参数，
                // 其中有个固定的参数，叫做modules，表示为普通的CSS样式表，启用模块化
            ]
        	}, 
        	
4. 使用`:local()`和`:global()`
	- `:local()`包裹的类名，是被模块化的类名，只能通过`className={cssObj.类名}`来使用，同时，`:local()`默认可以不写，这样，默认在样式表中定义的类名，都是被模块化的类名；
	- `:global()`包裹的类名，是全局生效的，不会被`css-modules`控制，定义的类名是什么，就是使用定义的类名`className="类名"`。

5. 注意：只有`.title`这样的类样式选择器，才会被模块化控制，类似于`body`这样的标签选择器，不会被模块化控制；