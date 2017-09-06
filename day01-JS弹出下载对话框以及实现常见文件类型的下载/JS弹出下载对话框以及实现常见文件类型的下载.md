#JS弹出下载对话框以及实现常见文件类型的下载

    2017/9/6 15:17:15 

##1.写在前面

    JS 要实现下载功能，一般都是这么几个过程：
        生成下载的 URL，动态创建一个 A 标签，并将其 href 指向生成的 URL，然后触发 A 标签的单击事件，这样就会弹出下载对话框，从而实现了一个下载的功能。
    
    这里所说的下载，有时候也可以理解为保存。出于安全考虑，JS 肯定无法直接调用 FileAPI 写文件到磁盘，但是却可以通过下载来变相实现保存功能。

##2.几个备用知识点

###2.1. JS 触发单击事件

    既然是用 A 标签模拟，那么肯定要知道 JS 如何主动触发单击事件。

    最简单的触发单击事件肯定是elem.click()，平时在不需要考虑兼容性的场合我都是这么干的，但是毕竟这个方法有兼容性（具体兼容性如何没做过测试），所以还是要掌握一个通用的方法。

    以下代码是网上比较容易找到的一段代码，我在前面加了一段MouseEvent的判断：

    /**
     * 触发单击事件
     * @param elem 需要触发事件的DOM对象
    */
    function fireClickEvent(elem)
    {
    var event;
    if(window.MouseEvent) event = new MouseEvent('click');
    else
    {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    elem.dispatchEvent(event);
    }

###2.2. HTML5 的 download 属性

    这个属性很重要，它可以指定下载文件名，并且可以告诉浏览器目标链接是一个下载链接，不是一个普通链接，我们看下面代码就能看出区别了：
    <a href="data:text/txt;charset=utf-8,测试下载纯文本" download="测试.txt" >下载1</a>
    <a href="data:text/txt;charset=utf-8,测试下载纯文本">下载2</a>
    可以发现，下载1按钮能够实现下载，点击下载2链接时直接在浏览器打开文件内容了。
    补充说明：
    file:///模式下貌似不生效；
    链接指向一些第三方链接时也不会生效，具体有待研究；
    
###2.3. JS 弹出下载对话框

    假如给我们的不是一个下载地址而是一个 blob 对象，我们可以通过URL.createObjectURL来给blob对象生成临时 URL，并且可以利用 HTML5 的download属性来指定下载的文件名，好家伙，有了这 2 个东西我们就可以实现一个 “万能” 的弹出下载对话框方法了。

    综上所述，我又在fireClickEvent的基础上继续简单封装了一个openDownloadDialog方法，使用如下：

    openDownloadDialog(url, saveName)
    openDownloadDialog(blob, saveName)
    代码如下：

    /**
    * 通用的打开下载对话框方法，没有测试过具体兼容性
    * @param url 下载地址，也可以是一个blob对象，必选
    * @param saveName 保存文件名，可选
    */
    function openDownloadDialog(url, saveName)
    {
    if(typeof url == 'object' && url instanceof Blob)
    {
        url = URL.createObjectURL(url); // 创建blob地址
    }
    var aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    var event;
    if(window.MouseEvent) event = new MouseEvent('click');
    else
    {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
    }

##3.JS 实现常见文件类型的下载

###3.1. JS 生成 CSV 文件并下载

    csv 是一种逗号分隔的表格文件格式，可以很好的被 Excel 支持，由于其文件格式简单，所以经常用在简单的表格上面。最重要的是它是一种纯文本格式，可以很轻松地用 JS 来生成而不借助第三方库。

####3.1.1. CSV 格式示例

    如下：

    姓名,期中成绩,期末成绩
    张三,58,95
    李四,98,74
    王二,47,38
    刘能,15,100
    黄五,87,68

####3.1.2. 初次尝试

    首先想到的是使用data:text/txt;来实现，先看一下下载纯文本：
    <a download="测试.txt" href="data:text/txt;charset=utf-8,测试下载纯文本">下载</a>
    以上代码没毛病，然后再换成 csv。换 csv 的最大问题就是如何处理换行，很简单，用encodeURIComponent编码一下就可以了：

    <button onclick="test()">下载CSV</button>
    <script>
    function test()
    {
    var csv = '姓名,期中成绩,期末成绩\n张三,58,95\n李四,98,74';
    var a = document.createElement('a');
    a.href = 'data:text/txt;charset=utf-8,'+encodeURIComponent(csv);
    a.download = '测试.csv';
    a.click(); // 这里偷个懒，直接用click模拟
    }
    </script>

####3.1.3. 解决 CSV 乱码问题

    虽然我们用的是 UTF-8 编码，下载后你会发现，用文本编辑器打开没问题，但是用 Excel 打开乱码：

    别急，原因就是少了一个\ufeffBOM 头，改成这样就没问题了：

    <button onclick="test()">下载CSV</button>
    <script>
    function test()
    {
    var csv = '姓名,期中成绩,期末成绩\n张三,58,95\n李四,98,74';
    var a = document.createElement('a');
    a.href = 'data:text/txt;charset=utf-8,\ufeff'+encodeURIComponent(csv);
    a.download = '测试.csv';
    a.click(); // 这里偷个懒，直接用click模拟
    }
    </script>

####3.1.4. 继续解决下载文件名的问题

    大部分浏览器可能都没啥问题，但是一些比较老的 Chrome 可能下载的时候指定的 download 就是不生效，此时可以用 blob 来解决：

    var csv = '姓名,期中成绩,期末成绩\n张三,58,95\n李四,98,74';
    var blob = new Blob(['\ufeff' + data], {type: 'text/csv,charset=UTF-8'});
    openDownloadDialog(blob, '测试.csv')；
    建议一般情况下都用这种方法，稳妥一点。

###3.1.5. 最后总结

    不考虑兼容性的保存 CSV 方法：

    /**
    * 保存CSV文件
    * @params csv csv文件内容
    * @params saveName 保存的文件名
    */
    function saveCSV(csv, saveName)
    {
    var a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(csv);
    a.download = saveName;
    a.click();
    }

    考虑兼容性的保存 CSV 方法：

    /**
     * 保存CSV文件
    * @params csv csv文件内容
    * @params saveName 保存的文件名
    */
    function saveCSV(csv, saveName)
    {
    var blob = new Blob(['\ufeff' + csv], {type: 'text/csv,charset=UTF-8'});
    openDownloadDialog(blob, saveName)；
    }

###3.2. JS 实现纯文本的下载保存

    掌握了 csv，再去下载纯文本基本上就没啥问题了，就是换一下文件类型而已：

    var csv = '你好，我是小泽同学！\n测试换行！';
    var blob = new Blob([data], {type: 'text/txt,charset=UTF-8'});
    openDownloadDialog(blob, '测试.csv')；

###3.3. JS 实现图片的下载保存

    网页上一般要保存图片都是从 canvas 里面拿到的图片数据，通过toDataURL转换为 base64 数据：

    /**
    * 将某个canvas保存为图片
    * @param canvasObj canvas对象
    * @param saveName 保存的名称
    * @param type 保存的图片格式，如 image/png
    * @param quality 图片质量，可选0-1
    */
    function saveImage(canvasObj, saveName, type, quality)
    {
    if(!canvasObj) return;
    type = type || 'image/png';
    quality = quality || 0.92;
    var url = canvasObj.toDataURL(type, quality).replace(/image\/.*?;/, 'image/octet-stream;');
    openDownloadDialog(url, saveName);
    }

##4.扩展

    关于文件保存，不嫌麻烦的话，GitHub 上面有个比较出名的库：
    https://github.com/eligrey/FileSaver.js/ 
    demo：https://eligrey.com/demos/FileSaver.js/