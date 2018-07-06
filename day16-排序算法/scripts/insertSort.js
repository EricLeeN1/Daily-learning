Array.prototype.insertSort = function () {
    let i, j;
    for (i = 1; i < this.length; i++) {   //i表示当前要向前插入的数字的索引，从1(即第2个数)开始前插
      let val = this[i];   //记录当前要前插的数的大小
      /*
      * 用指针j来遍历第i个数字前面的，已经排好序的子数组。当j没有指到头，并且j的数字大于要插入的数字时，说明
      * j还要向前遍历，直到发现一个比要插入数字小的位置pos，然后将这个数字插到pos+1处。如果j已经指到头了，
      * 到了-1了还没有找到比当前数字小的位置，就把当前数字放在索引0处。
      * */
      for (j = i - 1; j >= 0 && this[j] > val; j--) {  
        this[j + 1] = this[j];
      }
      this[j + 1] = val;
    }
  };
  let arr = [43, 21, 10, 5, 9, 15, 32, 57, 35];
  arr.insertSort();
  console.log(arr);