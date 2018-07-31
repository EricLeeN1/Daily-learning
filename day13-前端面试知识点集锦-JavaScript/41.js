var arr1 = "john".split(''); //[ 'n', 'h', 'o', 'j', [ 'j', 'o', 'n', 'e', 's' ] ]
var arr2 = arr1.reverse(); //[ 'n', 'h', 'o', 'j', [ 'j', 'o', 'n', 'e', 's' ] ]
var arr3 = "jones".split(''); //]j o n e s]
arr2.push(arr3);
console.log('====================================');
console.log(arr1);
console.log(arr2);
console.log(arr3);
console.log('====================================');
console.log("array 1: length=" + arr1.length + " last=" + arr1.slice(-1));
console.log("array 2: length=" + arr2.length + " last=" + arr2.slice(-1));