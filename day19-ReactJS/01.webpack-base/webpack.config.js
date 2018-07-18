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
    mode: 'development', //production
    // mode: 'production', //production,
    // output: "",
    plugins: [
        htmlPlugin
    ],
    module: { // 要打包的第三方模块
        rules: [{ // 第三方匹配规则
                test: /\.js|jsx$/,
                use: "babel-loader",
                exclude: /node_modules/, // 千万别忘记添加exclude排除项
                // options: {
                //     presets: ['latest'],
                //     plugins: ['transform-runtime']
                // }
            }, { //打包处理第三方loader
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader', //可以在css-loader值，通过？追加参数，
                    // 其中有个固定的参数，叫做modules，表示为普通的CSS样式表，启用模块化
                ]
            }, {
                test: /\.jpg|png|gif|bmp$/,
                use: 'url-loader'
            }, {
                test: /\.ttf|woff|woff2|eot|svg$/,
                use: 'url-loader' // 打包处理 字体文件的loader
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader?modules&localIdentName=[path][name]-[local]-[hash:8]', 'sass-loader'] //打包处理scss文件的loader
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader?modules&localIdentName=[path][name]-[local]-[hash:8]', 'less-loader'] //打包处理scss文件的loader
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'], //表示这几个文件的后缀名可省略不写，
        alias: { // 表示别名
            '@': path.join(__dirname, './src') //这样，@就表示项目根目录中src这一层路径
        }
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