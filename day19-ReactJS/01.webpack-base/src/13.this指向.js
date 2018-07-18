btn.onclick = function () {
    //this指向btn，谁调用这个函数，this指向谁
}

btn.onclick = () => {
    //箭头函数里面this指向外部this。这时由于外部没有内容，指向window
    // this -> window
    setTimeout(() => {
        // this->外部btn
    }, 1000);
}

setTimeout(function () {
    // this指向window
}, 2000);