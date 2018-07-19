#webpack4.学习

##一、全局安装webpack及webpack-cli
npm install webpack webpack-cli -g
##二、本地安装
npm install webpack -D
##三、创建基本的webpack4.x项目
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

##四、webpack中使用的包

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
	sass-loader -> 用来处理sass/scss文件 
	node-sass -> sass-loader依赖
	less
	less-loader-> 用来处理less文件