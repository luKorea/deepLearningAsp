//TODO 数组中堆栈内存的应用
var arr1 = [3, 4], arr2 = arr1;
arr2[0] = 1; // arr2 = arr1 = [1, 4]
arr2 = [5, 6]; //  arr2 = [5, 6]
arr2[1] = 3; // arr2 = [5, 3]
arr1[1] = 0; // arr1 = [1, 0]
console.log(arr1, arr2);