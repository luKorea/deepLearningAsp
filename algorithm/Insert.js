/** 
 * @author korealu
 * @email korealu@foxmail.com
 * @description 插入排序
 */


let arr = [1, 42, 76, 99, 87, 54, 110, 1243, 32432, 432, 432];

/**
 * @method insertSort
 * @params arr {Array}
 * @returns Array
 */
let insertSort = (arr) => {
    let handle = [],
        len = arr.length;
    handle.push(arr[0]);
    for (let i = 1; i < len; i++) {
        let n1 = arr[i];
        for (let j = handle.length - 1; j >= 0; j--) {
            let n2 = handle[j];
            if (n1 > n2) {
                handle.splice(j + 1, 0, n1);
                break;
            }
            if (j === 0) {
                handle.unshift(n1);
            }
        }
    }
    return handle;
}
arr = insertSort(arr);
console.log(arr);