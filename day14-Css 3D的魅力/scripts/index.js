window.onload = function () {
    let boxs = document.getElementsByClassName('cube-box');
    setInterval(() => {
        for (let item in boxs) {
            if (boxs[item].style) boxs[item].style.height = `${Math.random()*100}px`;
        }
    }, 3000);
}