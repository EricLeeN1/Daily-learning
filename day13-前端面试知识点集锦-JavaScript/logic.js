console.log("0 || 1 = " + (0 || 1));
console.log("1 || 2 = " + (1 || 2));
console.log("0 && 1 = " + (0 && 1));
console.log("1 && 2 = " + (1 && 2));
console.log(1 && 2 && 0); //0
console.log(1 && 0 && 1); //0
console.log(1 && 2 && 3); //3
console.log(1 || 2 || 0); //1
console.log(0 || 2 || 1); //2
console.log(0 || 0 || false); //false
console.log(false == '0')
console.log(false === '0');
var a = {},
    b = {
        key: 'b'
    },
    c = {
        key: 'c'
    };

a[b] = 123;
a[c] = 456;
console.log(a[b]);

console.log((function f(n){return ((n > 1) ? n * f(n-1) : n)})(5));
(function(x) {
    return (function(y) {
        console.log(y);
        console.log(x);
    })(2)
})(1);