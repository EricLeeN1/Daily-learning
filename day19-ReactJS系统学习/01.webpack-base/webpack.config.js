// 向外暴露一个大包的配置对象  因为webpack是基于Node构建的，所以webpack支持所有Node Api和语法。
module.exports = {
    // 在webapck4.x中，有个很大的特性，就是约定大于配置  约定默认的打包路径是 src->index.js
    // entry:'',
    // mode: 'development' //production
    mode: 'production', //production,
    // output: ""
}

// es6中向外导出模块的API，与之对应的是import ** from *标识符*  这里目前不支持
// export default{}
// Node支持的特性？ 如果Chrome浏览器支持，那么Node就支持。