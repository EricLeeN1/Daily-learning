    1. 模 式  可通过 require 使用  注册PATH
    本地模式  是  否
    全局模式  否  是
    
    2. 在命令行下执行 node debug debug.js ，将会启动调试工具：
    3. Node.js 调试命令
      命 令  功 能
      run  执行脚本，在第一行暂停
      restart  重新执行脚本
      cont, c  继续执行，直到遇到下一个断点
      next, n  单步执行
      step, s  单步执行并进入函数
      out, o  从函数中步出
      setBreakpoint(), sb()  在当前行设置断点
      setBreakpoint(‘f()’), sb(...)  在函数f的第一行设置断点
      setBreakpoint(‘script.js’, 20), sb(...)  在 script.js 的第20行设置断点
      clearBreakpoint, cb(...)  清除所有断点
      backtrace, bt  显示当前的调用栈
      list(5)  显示当前执行到的前后5行代码
      watch(expr)  把表达式 expr 加入监视列表
      unwatch(expr)  把表达式 expr 从监视列表移除
      watchers  显示监视列表中所有的表达式和值
      repl  在当前上下文打开即时求值环境
      kill  终止当前执行的脚本
      scripts  显示当前已加载的所有脚本
      version  显示 V8 的版本
    4. 无参数的  npm install 的功能就是
     检查当前目录下的 package.json，并自动安装所有指定的依赖。