Array.prototype.bubbleSort = function () {
    let i, j;
    for (i = 0; i < this.length; i++) { //表示本次是第i次遍历
        let changed = false;
        for (j = 0; j < this.length - i; j++) { //访问序列为arr[0:legnth-i]
            if (this[j] > this[j + 1]) { //发现一个数大于后一个数时，互换位置
                [this[j], this[j + 1]] = [this[j + 1], this[j]];
                // [this[j], this[j + 1]] = [this[j + 1], this[j]];
                changed = true;
            }
        }
        if (!changed) { //如果本轮遍历没有发现位置调整，结束排序函数
            break;
        }
    }
}
let arr = [43, 21, 10, 5, 9, 15, 32, 57, 35];
arr.bubbleSort();
console.log(arr);