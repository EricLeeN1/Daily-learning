const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin'); //导入 在内存中自动生成index页面的插件

// 创建一个插件的实例对象

const htmlPlugin = new HtmlWebPackPlugin({
    template: path.join(__dirname, './src/index.html'), //源文件
    filename: "index.html" //生成的内存中首页的名称
});


// 向外暴露一个大包的配置对象  因为webpack是基于Node构建的，所以webpack支持所有Node Api和语法。
// webpack 默认智能打包处理.js后缀名类型的文件；像.png .vue无法主动处理，所以要配置第三方的loader
module.exports = {
    // 在webapck4.x中，有个很大的特性，就是约定大于配置  约定默认的打包路径是 src->index.js
    // entry:'',
    // mode: 'development' //production
    mode: 'production', //production,
    // output: "",
    plugins: [
        htmlPlugin
    ],
    module: { // 要打包的第三方模块
        rules: [{ // 第三方匹配规则
            test: /\.js|jsx$/,
            use: "babel-loader",
            exclude: /node_modules/, // 排除项
            // options: {
            //     presets: ['latest'],
            //     plugins: ['transform-runtime']
            // }
        }]
    },
    performance: {

        hints: "warning", // 枚举

        maxAssetSize: 300000, // 整数类型（以字节为单位）

        maxEntrypointSize: 500000, // 整数类型（以字节为单位）

        assetFilter: function (assetFilename) {

            // 提供资源文件名的断言函数

            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');

        }

    }
}

// es6中向外导出模块的API，与之对应的是import ** from *标识符*  这里目前不支持
// export default{}
// Node支持的特性？ 如果Chrome浏览器支持，那么Node就支持。