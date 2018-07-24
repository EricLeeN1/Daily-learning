const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const Server = require('./server');

const htmlPlugin = new HtmlWebPackPlugin({
    template: path.resolve(__dirname, './src/index.html'), // 配置文件模版
    filename: "index.html", // 配置输出文件名和路径,
    minify: { // 压缩HTML的配置
        minifyCSS: true, // 压缩 HTML 中出现的 CSS 代码
        minifyJS: true // 压缩 HTML 中出现的 JS 代码
    }
});

module.exports = {
    mode: "development",
    // entry:"",
    entry: './src/index.js', // 默认入口
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'bundle-[hash].js' // 默认./dist/main.js
    },
    module: {
        rules: [{
                // resource: { // resource 的匹配条件
                // },
                test: /\.js|jsx$/,
                include: [
                    path.resolve(__dirname, 'src')
                ], // 指定哪些路径下的文件需要经过 loader 处理 
                // 如果要使用 issuer 匹配，便是 issuer: { test: ... }
                exclude: /node_modules/, // 指定那些路径下的文件不需要经过loader处理
                use: [{
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true
                    }
                }]
            }, {
                test: /\.css$/, // 1. 匹配条件
                use: [ // 2. 匹配规则后应用结果  //1跟2是loader的匹配规则中最关键的因素
                    'style-loader',
                    'css-loader'
                ],
                include: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'src/styles'),
                ] // 一个object即一条规则
            }, {
                test: /\.png|gif|bmp|svg|jpe?g|webp$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: './[name].min.[ext]',
                        outputPath: 'images',
                        publicPath: "/dist/"
                    }
                }, {
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: { // 压缩 jpeg 的配置
                            progressive: true,
                            quality: 65 //0~100
                        },
                        optipng: { // 使用 imagemin-optipng 压缩 png，enable: false 为关闭
                            enabled: true,
                        },
                        pngquant: { // 使用 imagemin-pngquant 压缩 png
                            quality: '65-90',
                            speed: 4
                        },
                        gifsicle: { // 压缩 gif 的配置
                            interlaced: false,
                        },
                        webp: { // 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
                            quality: 75
                        },
                    }
                }, {

                    loader: 'url-loader',
                    options: {
                        limit: 8192, // 单位是 Byte，当文件小于 8KB 时作为 DataURL 处理
                    },
                }],
                include: [
                    path.resolve(__dirname, 'src/images/')
                ]
            },
            {
                test: /\.ttf|woff|woff2|eot$/,
                use: 'url-loader' // 打包处理 字体文件的loader
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    // 因为这个插件需要干涉模块转换的内容，所以需要使用它对应的loader
                    use: ['css-loader?modules&localIdentName=[path][name]-[local]-[hash:8]&sourceMap=true', 'sass-loader'] //打包处理scss文件的loader 
                }),
                include: [
                    path.resolve(__dirname, 'src/styles/')
                ]
            },
            {
                test: /\.less$/,
                // 导出.css文件的写法
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    // 因为这个插件需要干涉模块转换的内容，所以需要使用它对应的loader
                    use: ['css-loader?modules&localIdentName=[path][name]-[local]-[hash:8]', 'less-loader'] //打包处理scss文件的loader 
                })
                // 不需要额外输出.css文件的写法什么都不要时候的写法
                // use: ['style-loader', 'css-loader?modules&localIdentName=[path][name]-[local]-[hash:8]', 'less-loader'] //打包处理scss文件的loader
            }
        ]
    },
    // 代码模块路径解析的配置
    resolve: {
        modules: [ // 这种配置在某种程度上可以简化模块的查找，提升构建速度。
            "node_modules", // 如果有一些类库是放在一些奇怪的地方的，你可以添加自定义的路径或者目录
            path.resolve(__dirname, 'node_modules'), // 指定当前目录下的 node_modules 优先查找,
            "assets/sprite" // css在哪里能找到sprite图
        ],
        extensions: ['.js', '.jsx', '.json'], //表示这几个文件的后缀名可省略不写，
        alias: { // 表示别名
            '@': path.resolve(__dirname, './src') //这样，@就表示项目根目录中src这一层路径
        },
        // 配置 target === "web" 或者 target === "webworker" 时 mainFields 默认值是：
        //   mainFields: ['browser', 'module', 'main'],

        // target 的值为其他时，mainFields 默认值为：
        mainFields: ["module", "main"],
        mainFiles: ['index'], // 你可以添加其他默认使用的文件名,通常情况下我们也无须修改这个配置，index.js 基本就是约定俗成的了。
        // resolveLoader: { //用于配置解析 loader 时的 resolve 配置，原本 resolve 的配置项在这个字段下基本都有。
        // extensions: ['.js', '.json'],
        // mainFields: ['loader', 'main'],
        // } //我们一般遵从标准的使用方式，使用默认配置，然后把 loader 安装在项目根路径下的 node_modules 下就可以了。
    },
    plugins: [
        htmlPlugin,
        new UglifyPlugin({
            sourceMap: true, //是否生成.map文件
            parallel: 4, //是否启用并行化，
            cache: true, //是否启用缓存
            uglifyOptions: {
                ecma: 6,
                warnings: false,
                output: {
                    comments: false,
                    beautify: false
                },
                toplevel: false,
                nameCache: null,
                ie8: false,
                keep_classnames: undefined,
                keep_fnames: false,
                safari10: false,
            }
        }),
        new ExtractTextPlugin('./styles/[name]-[hash].css'),
        // 使用 uglifyjs-webpack-plugin 来压缩 JS 代码
        // 默认已经使用了 JS 代码压缩的插件
        // mode: production 时会自动压缩，
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true), // const PRODUCTION = true;
            VERSION: JSON.stringify('5fa3b9'), // const VERSION = '5fa3b9';
            BROWSER_SUPPORTS_HTML5: true, // const BROWSER_SUPPORTS_HTML5 = true;
            TWO: '1+1',
            CONSTANTS: {
                APP_VERSION: JSON.stringify('1.1.2') // const CONSTANTS = { APP_VERSION: '1.1.2' }
            }
        }),
        new CopyWebpackPlugin([{
                from: 'src/file.txt',
                to: 'build/file.txt',
            }, // 顾名思义，from 配置来源，to 配置目标路径
            {
                from: 'src/favicon.ico',
                to: './favicon.ico',
            }, // 配置项可以使用 glob
            // 可以配置很多项复制规则...
        ]),
        new webpack.ProvidePlugin({
            identifier: ['module', 'property', 'default'] // 即引用 module 下的 property，类似 import { property } from 'module'
            // ...
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), //IgnorePlugin 配置的参数有两个，第一个是匹配引入模块路径的正则表达式，第二个是匹配模块的对应上下文，即所在目录名。
        new webpack.NamedModulesPlugin, // 用于启动HMR时可以显示模块的相对路径
        new webpack.HotModuleReplacementPlugin, // hot Module Replacement的插件
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, 'src/ico'), // 准备合并成sprit的图片存放文件夹
                glob: '*.png' // 哪类图片
            },
            target: {
                image: path.resolve(__dirname, 'src/assets/sprite.png'), // sprite图片保存路径
                css: path.resolve(__dirname, 'src/assets/_sprites.scss') // 生成的sass保存在哪里
            },
            apiOptions: {
                cssImageRef: "~sprite.png" //css根据该指引找到sprite图
            }
        })
    ],
    devServer: Server
}