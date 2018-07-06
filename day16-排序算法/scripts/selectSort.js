Array.prototype.selectSort = function () {
    let i, j;
    for (i = 1; i < this.length; i++) { //表示本次是第i次遍历
        let maxIndex = 0;
        for (j = 0; j <= this.length - i; j++) { //访问子序列为arr[0:this.length-i]
            if (this[j] > this[maxIndex]) { //当前值大于当前最大值时，记录索引
                maxIndex = j;
            }
        }
        //将子数组最大值索引的值，与子数组末尾的值互换
        [this[this.length - i], this[maxIndex]] = [this[maxIndex], this[this.length - i]]
    }
};
let arr = [43, 21, 10, 5, 9, 15, 32, 57, 35];
arr.selectSort();
console.log(arr);