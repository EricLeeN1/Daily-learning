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

七、webpack中使用的包

	`cnpm i html-webpack-plugin -D`
	webpack
	webpack-cli
	webpack-dev-server
	html-webpack-plugin
	