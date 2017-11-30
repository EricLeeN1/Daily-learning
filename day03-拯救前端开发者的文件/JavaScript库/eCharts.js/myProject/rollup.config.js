// 这个插件用于在 `node_module` 文件夹（即 npm 用于管理模块的文件夹）中寻找模块。比如，代码中有
// `import 'echarts/lib/chart/line';` 时，这个插件能够寻找到
// `node_module/echarts/lib/chart/line.js` 这个模块文件。
import nodeResolve from 'rollup-plugin-node-resolve';
// 用于压缩构建出的代码。
import uglify from 'rollup-plugin-uglify';
// 用于多语言支持（如果不需要可忽略此 plugin）。
// import ecLangPlugin from 'echarts/build/rollup-plugin-ec-lang';

export default {
    name: 'myProject',
    // 入口代码文件，就是刚才所创建的文件。
    input: './line.js',
    plugins: [
        nodeResolve(),
        // ecLangPlugin({lang: 'en'}),
        // 消除代码中的 __DEV__ 代码段，从而不在控制台打印错误提示信息。
        uglify()
    ],
    output: {
        // 以 UMD 格式输出，从而能在各种浏览器中加载使用。
        format: 'umd',
        // 输出 source map 便于调试。
        sourcemap: true,
        // 输出文件的路径。
        file: 'lib/line.min.js'
    }
};