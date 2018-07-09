let var1;

/**
 * 一、空(null,undefined)验证
 */
{
    // if (var1 !== null || var1 !== undefined || var1 !== '') {
    //     let var11 = var1;
    // }
    // 简洁版
    let var11 = var1 || '';
}


/**
 * 二、数组
 */
{
    // let a = new Array();
    // a[0] = "myString1";
    // a[1] = "myString2";
    // a[2] = "myString3";
    // 简洁版
    let a = ["myString1", "myString2", "myString3"]
}


/**
 * 三、if true ... else的优化
 */
{
    let big;
    if (x > 10) {
        big = true;
    } else {
        big = false;
    }
    //简洁版
    let big = x > 10 ? true : false;
}


/**
 * 四、变量声明
 */
{
    let x;
    let y;
    let z = 3;
    //简洁版
    let x, y, z = 3;
}


/**
 * 五、赋值语句的简化
 */
{
    x = x + 1;
    minusCount = minusCount - 1;
    y = y * 10;
    // 简洁版
    x++;
    minusCount--;
    y *= 10;
}


/**
 * 六、避免使用RegExp对象
 */
{
    var re = new RegExp("\d+(.)+\d+", "igm"),
        result = re.exec("padding 01234 text text 56789 padding");
    console.log(result); //"01234 text text 56789"  
    // 简洁版
    var result = /d+(.)+d+/igm.exec("padding 01234 text text 56789 padding");
    console.log(result); //"01234 text text 56789"
}

/**
 * 七、IF条件优化
 */
{
    if (likeJavaScript === true)
        let c;
    if (c != true) {
        // do something...
    }
    // 简洁版
    if (likeJavaScript) {}
    let c;
    if (!c) {
        // do something...
    }
}

/**
 * 八、charAt()的替代品
 */
{
    // 简化前：
    "myString".charAt(0);
    // 简洁版
    "myString" [0]; // 返回 'm'
}

/**
 * 九、函数调用还可以更短
 */
{
    function x() {
        console.log('x')
    };

    function y() {
        console.log('y')
    };
    let z = 3;
    if (z == 3) {
        x();
    } else {
        y();
    }
    // 简洁版
    function x() {
        console.log('x')
    };

    function y() {
        console.log('y')
    };
    let z = 3;
    (z == 3 ? x : y)();
}

/**
 * 十、如何优雅的表示大数字
 */
{
    // 在JavaScript中，有一个简写数字的方法，也许你忽略了。1e7表示10000000。
    for (let i = 0; i < 10000000; i++) {}
    // 简洁版
    for (let i = 0; i < 1e7; i++) {}
}