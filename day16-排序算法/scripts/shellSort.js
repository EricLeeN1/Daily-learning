const {floor} = Math;
//这个和插入排序相同，只不过加了step
Array.prototype.shellInsertSort = function (startIndex, step) {
  let i, j;
  for (i = startIndex + step; i < this.length; i += step) {
    let val = this[i];
    for (j = i - step; j >= 0 && this[j] > val; j -= step) {
      this[j + step] = this[j];
    }
    this[j + step] = val;
  }
};
Array.prototype.shellSort = function () {
  let i, step;
  for (step = floor(this.length / 2); step > 0; step = floor(step / 2)) {
    for (i = 0; i < step; i++) {
      this.shellInsertSort(i, step);
    }
  }
};
let arr = [43, 21, 10, 5, 9, 15, 32, 57, 35];
arr.shellSort(true);
console.log(arr);;