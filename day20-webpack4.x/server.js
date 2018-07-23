export default {
    public: "", // 用于指定静态服务的域名，默认是 http://localhost:8080/ 
    port: 8080, // 用于指定静态服务的端口,默认是8080,
    publicPath: "assets", // 字段用于指定构建好的静态文件在浏览器中用什么路径去访问,默认是/, publicPath的优先级高于contentBase
    proxy: { // 用于配置 webpack-dev-server 将特定 URL 的请求代理到另外一台服务器上。当你有单独的后端开发服务器用于请求 API 时，这个配置相当有用。
        '/api': {
            target: "http://localhost:3000", // 将 URL 中带有 /api 的请求代理到本地的 3000 端口的服务上
            pathRewrite: {
                '^/api': '' // 把 URL 中 path 部分的 `api` 移除掉
            }
        }
    },
    contentBase: path.join(__dirname, "public"), // 使用当前目录下的public 
    // contentBase: [path.join(__dirname, "public"), path.join(__dirname, 'assets')], // 也可以使用数组提供多个路径
    //用于配置提供额外静态文件内容的目录，之前提到的 publicPath 是配置构建好的结果以什么样的路径去访问，而 contentBase 是配置额外的静态文件内容的访问路径，即那些不经过 webpack 构建，但是需要在 webpack-dev-server 中提供访问的静态资源（如部分图片等）。推荐使用绝对路径：...
    before(app) {// before和after配置用于在webpack-dev-server定义额外的中间件。
        app.get('/some/path', function (req, res) { // 当访问 /some/path 路径时，返回自定义的 json 数据
            res.json({
                custom: 'response'
            })
        })
    },
    after(app) {// before和after配置用于在webpack-dev-server定义额外的中间件。
        app.get('/some/path', function (req, res) { // 当访问 /some/path 路径时，返回自定义的 json 数据
            res.json({
                custom: 'response'
            })
        })
    }// before在webpack-dev-server静态资源中间件处理之前，可以用于拦截部分请求返回特定内容，或者实现简单的数据mock,
    // after 在 webpack-dev-server 静态资源中间件处理之后，比较少用到，可以用于打印日志或者做一些额外处理。
}