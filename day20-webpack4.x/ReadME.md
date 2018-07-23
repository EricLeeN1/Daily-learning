#webpack4.学习

##一、 前置条件
	- **全局安装**
		webpack及webpack-cli -> npm install webpack webpack-cli -g
	- **本地安装**(需要不同版本需求时)
		npm install webpack -D
##二、创建基本的webpack4.x项目
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
	- **scripts中dev设置：**
		
		`"dev": "webpack-dev-server --open firefox --port 3000  --hot --progress --compress"`
		- `--open firefox：`设置自动打开浏览器为火狐，如果不加参数默认浏览器打开。
		- `--port 3000`设置端口号为3000
		- `--compress`设置压缩
		- `--hot`设置热替换
		- `--progress`设置显示进度

##三、入口
	
webpack 会读取这个文件，并从它开始解析依赖，然后进行打包。

		- 默认约定了
		- 打包的入口是`src`->`index.js`
		module.exports = {
  			entry: './src/index.js' 
		}
	
##四、loader
	
模块代码转换 -> 我们可以在`module.rules`字段下来配置相关的规则。
	
1.示例代码：


	`rules: [
    {
      test: /\.jsx?/, // 匹配文件路径的正则表达式，通常我们都是匹配文件类型后缀
      include: [
        path.resolve(__dirname, 'src') // 指定哪些路径下的文件需要经过 loader 处理
      ],
      use: 'babel-loader', // 指定使用的 loader
    },
  	],`
  	
2. **配置loader**
3. **规则条件配置**

	- { test: ... } 匹配特定条件
	- { include: ... } 匹配特定路径
	- { exclude: ... } 排除特定路径
	- { and: [...] }必须匹配数组中所有条件
	- { or: [...] } 匹配数组中任意一个条件
	- { not: [...] } 排除匹配数组中所有条件
	
4. 执行顺序

		前置 enforce: 'pre' // 指定为前置类型
		行内 enforce：'post' // 指定为后置类型
		普通
		后置
		
5. 使用noParse
	对于一些不需要解析依赖（即无依赖） 的第三方大型类库等，可以通过这个字段来配置，以提高整体的构建速度。
  		
  		`noParse: /jquery|lodash/, // 正则表达式
    	// 或者使用 function
    	noParse(content) {
      		return /jquery|lodash/.test(content)
    	}`
    	
##五、plugin

用于处理更多其他的一些构建任务提升能力

1. 压缩JS代码的 uglifyjs-webpack-plugin 插件；

		`const UglifyPlugin = require('uglifyjs-webpack-plugin')
		module.exports = {
  			plugins: [
    			new UglifyPlugin()
  			],
		}`
		
2. 定义环境变量 DefinePlugin 插件；
3. 生成CSS文件的 ExtractTextWebpackPlugin 等；
4. **操作流程：**
	1. 引包 `const UglifyPlugin = require('uglifyjs-webpack-plugin')；
	2. 添加到插件数组中
5. 常用插件功能及使用
	1. **DefinePlugin：**DefinePlugin 是 webpack 内置的插件，可以使用 webpack.DefinePlugin 直接获取。
		1. 用于创建一些在编译时可以配置的全局常量，这些常量的值我们可以在 webpack 的配置中去指定，
	2. **copy-webpack-plugin：**是用来复制文件的。
		1. 我们一般会把开发的所有源码和资源文件放在 src/ 目录下，构建的时候产出一个 build/ 目录，通常会直接拿 build 中的所有文件来发布。有些文件没经过 webpack 处理，但是我们希望它们也能出现在 build 目录下，这时就可以使用 CopyWebpackPlugin 来处理了。
	3. **extract-text-webpack-plugin：**用它来把依赖的 CSS 分离出来成为单独的文件。
	4. **ProvidePlugin：**是一个 webpack 内置的插件，我们可以直接使用 webpack.ProvidePlugin 来获取。
		1. 该组件用于引用某些模块作为应用运行时的变量，从而不必每次都用 require 或者 import：
	5. **IgnorePlugin:** 也是一个 webpack 内置的插件，可以直接使用 webpack.IgnorePlugin 来获取。
		1. 这个插件用于忽略某些特定的模块，让 webpack 不把这些指定的模块打包进去。例如我们使用 moment.js，直接引用后，里边有大量的 i18n 的代码，导致最后打包出来的文件比较大，而实际场景并不需要这些 i18n 的代码，这时我们可以使用 IgnorePlugin 来忽略掉这些代码文件。
##六、输出

输出即指 webpack 最终构建出来的静态文件，用 `output` 字段。
默认创建的输出内容就是 ./dist/main.js。


	`// 路径中使用 hash，每次构建时会有一个不同 hash 值，避免发布新版本时线上使用浏览器缓存
	module.exports = {
  		output: {
    		filename: '[name].js',
    		path: __dirname + '/dist/[hash]',
  		},
	}`
	
##七、用HMR提高开发效率

	即模块热替换，局部刷新。
	
	devServer: {
        hot: true //// dev server 的配置要启动 hot，或者在命令行中带参数开启
    }
    new webpack.NamedModulesPlugin,// 用于启动HMR时可以显示模块的相对路径
    new webpack.HotModuleReplacementPlugin,// hot Module Replacement的插件

##八、优化前端资源加载

	实现功能
	1. 精灵图
	2. 图片压缩
	3. base64
	4. 代码分离
	5. 按需加载模块
	6. Tree shaking
	7. sideEffects

###1. CSS Sprites

webpack-spritesmith

#最后、webpack中使用的包

	`-D` -> 工具
	`-S` -> 开发到上线都要使用的包
	`cnpm i html-webpack-plugin -D` -> 写法
	webpack
	webpack-cli -> webpack脚手架
	webpack-dev-server -> webpack服务
	html-webpack-plugin -> html打包
	extract-text-webpack-plugin -> 导出CSS文件，请安装最新版 -> npm install extract-text-webpack-plugin@next -D
	copy-webpack-plugin -> 复制文件
	babel-core
	babel-loader
	babel-plugin-transform-runtime
	babel-preset-env
	babel-preset-react
	babel-preset-stage-0
	react -> 专门用于创建组件，同时组件的生命周期都在这个包中
	react-dom -> 专门进行DOM操作的，最主要的应用场景就是`ReactDOM.render()`
	css-loader -> css-loader 负责解析 CSS 代码，主要是为了处理 CSS 中的依赖，例如 @import 和 url() 等引用外部文件的声明；
	style-loader -> style-loader 会将 css-loader 解析的结果转变成 JS 代码，运行时动态插入 style 标签来让 CSS 代码生效。
	url-loader -> 用来处理文字，图片
	file-loader -> 直接输出文件，把构建后的文件路径返回
	sass-loader -> 用来处理sass/scss文件 
	node-sass -> sass-loader依赖
	less
	less-loader-> 用来处理less文件
	webpack-dev-server -> 在本地开启一个简单的静态服务来进行开发
	webpack-dev-middleware -> 就是在 Express 中提供 webpack-dev-server 静态服务能力的一个中间件，我们可以很轻松地将其集成到现有的 Express 代码中去，就像添加一个 Express 中间件那么简单。