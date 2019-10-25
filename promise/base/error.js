/**
 * @method f
 * RangeError: Maximum call stack size exceeded
 */
try {
    function f() {
        f()
    }
    f();
} catch (e) {
    console.log(e);
}
// /* TypeError: Cannot read property 'd' of undefined */
try {
    let demo;
    demo.max();
} catch (e) {

}
/* ReferenceError: b is not defined */
console.log(b);
/* SyntaxError: Unexpected identifier */
let a = a;
