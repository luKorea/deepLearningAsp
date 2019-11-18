/** 
 * @author korealu
 * @email korealu@foxmail.com
 * @description 快速排序
*/


let arr = [1, 4324, 35443, 4543, 34, 454];

let quickSort = (arr) => {
    // 结束递归
    if (arr.length <= 1) {
        return arr;
    }
    // 找出中间项
    let middleIndex = Math.floor(arr.length / 2);
    // 将中间项从数组中移除
    let middleValue = arr.splice(middleIndex, 1)[0];
    // 准备左右两个数组，循环剩下数组中的每一项，比较当前项小的放左边，反之放右边
    let arrLeft = [], arrRight = [], item = null, len = arr.length;
    for (let i = 0;i < len; i++) {
        item = arr[i];
        // 当前项与中间项比较
        item < middleValue ? arrLeft.push(item) : arrRight.push(item);
    }
    // 递归让左右两边的数组排序完
    return quickSort(arrLeft).concat(middleValue, quickSort(arrRight));
}

arr = quickSort(arr);
console.log(arr);

