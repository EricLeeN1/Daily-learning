const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
    template: path.resolve(__dirname, './src/index.html'),
    filename: "index.html"
});

module.exports = {
    mode: "development",
    // entry:"",
    // output:"",
    plugins: [
        htmlPlugin
    ],
    module: {
        rules: [{
            test: /\.js|jsx$/,
            use: "babel-loader",
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.jpg|png|gif|bmp$/,
            use: 'url-loader'
        }, {
            test: /\.ttf|woff|woff2|eot|svg$/,
            use: 'url-loader' // 打包处理 字体文件的loader
        }, {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader?modules&localIdentName=[path][name]-[local]-[hash:8]', 'sass-loader'] //打包处理scss文件的loader
        }, {
            test: /\.less$/,
            use: ['style-loader', 'css-loader?modules&localIdentName=[path][name]-[local]-[hash:8]', 'less-loader'] //打包处理scss文件的loader
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'], //表示这几个文件的后缀名可省略不写，
        alias: { // 表示别名
            '@': path.resolve(__dirname, './src') //这样，@就表示项目根目录中src这一层路径
        }
    }
}