/** 
 * @author korealu
 * @email korealu@foxmail.com
 * @description 冒泡排序: 让当前项与下一项进行比较
 * @date 2019-11-18
*/


/**
 * @method bulleSort
 * @param arr [Array]
 * @returns Array
 */  
let bulleSort = (arr) => {
    let len = arr.length - 1; 
    // 轮数
    for (let i = 0 ;i < len; i++) {
        // 次数
        for (let j = 0 ;j < len - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
             }
        }
    }
    return arr;
}

let arr = [1,2,43,6554,7,543,54];

console.log(bulleSort(arr));