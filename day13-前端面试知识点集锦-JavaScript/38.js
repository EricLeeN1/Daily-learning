function isPalindrome(str) {
    str = str.replace(/\W/g, '').toLowerCase();
    return (str == str.split('').reverse().join(''));
}
let a = '上海自来水来自海上';

console.log('====================================');
console.log(isPalindrome(a));//true
console.log('====================================');