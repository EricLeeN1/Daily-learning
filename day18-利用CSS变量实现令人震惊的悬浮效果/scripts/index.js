window.onload = function () {
    document.querySelector('button').onmousemove = function (e) {
        const x = e.pageX - e.target.offsetLeft;
        const y = e.pageY - e.target.offsetTop;
        e.target.style.setProperty('--x',`${x}px`);
        e.target.style.setProperty('--x',`${y}px`);
    }
}