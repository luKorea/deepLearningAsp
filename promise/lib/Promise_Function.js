/**
 * @author koreaLu
 * @email 643949593@qq.com
 * @version 1.0.0
 * @description 手写promise, ES5版本 IIFE
 */
(function(window) {
    const PENDING = 'pending', RESOLVED = 'resolved', REJECTED = 'rejected';
    /**
     * @method Promise
     * @param actuator  执行器函数
     * @constructor
     */

    // TODO promise函数
    function Promise(actuator) {
        const self = this;
        // 给promise对象指定status属性，初始值为pending
        self.status = PENDING;
        // 给我promise对象指定一个用户存储数据的属性
        self.data = undefined;
        // 定义每个元素的结构哦 {onResolved(){}, onRejected(){}}
        self.callbacks = [];

        function resolve(value) {
            // 如果当前状态不是pending，直接结束
            if (self.status !== PENDING) return;
            self.status = RESOLVED;
            self.data = value;
            // 如果有待执行的callback函数，立即异步执行回调函数onResolved()
            if (self.callbacks.length > 0) {
                setTimeout(() => {
                    self.callbacks.forEach(callbackObj => {
                        callbackObj.onResolved(value);
                      });
                })
            }
        }

        function reject(reason) {
            // 如果当前状态不是pending，直接结束
            if (self.status !== PENDING) return;
            self.status = REJECTED;
            self.data = reason;
            if (self.callbacks.length > 0) {
                setTimeout(() => {
                    self.callbacks.forEach(callbackObj => {
                        callbackObj.onRejected(reason);
                    });
                })
            }
        }

        //  立即执行actuator
        try {
            actuator(resolve, reject);
        } catch (error) {
            reject(error)
        }
    }

    // TODO Promise 原型对象上的方法
    /**
     * @description 指定成功或者失败后的回调函数，返回一个新的promise
     * @method then
     * @param onResolved
     * @param onRejected
     */
    Promise.prototype.then = function(onResolved, onRejected) {

        onResolved = typeof onResolved === 'function' ? onResolved : value => value;
        // 异常穿透
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};

        const self = this;
        return new Promise((resolve, reject) => {
            function handle(callback) {
                try {
                    const result = callback(self.data);
                    result instanceof Promise ? result.then(resolve, reject) : resolve(result);
                } catch (error) {
                    reject(error);
                }
            }
            if (self.status === PENDING) {
                self.callbacks.push({
                    onResolved(value) { handle(onResolved) },
                    onRejected(reason) { handle(onRejected) }
                });
            } else if (self.status === RESOLVED) {
                setTimeout(() => { handle(onResolved) });
            } else {
                setTimeout(() => { handle(onRejected) });
            }
        });
    };
    /**
     * @description 指定失败后的回调函数，返回一个新的promise
     * @method catch
     * @param onRejected
     * @type Function
     */
    Promise.prototype.catch = function(onRejected) {
        return this.then(undefined, onRejected);
    };
    // TODO  函数对象上的方法
    /**
     * @description 返回一个指定value的成功的resolve
     * @method resolve
     * @param value
     */
    Promise.resolve = function(value) {
        return new Promise((resolve, reject) => {
            //  1. value is promise  2. value is not promise
            value instanceof Promise ? value.then(resolve, reject) : resolve(value);
        });
    };
    /**
     * @description 返回一个指定reason的失败的reject
     * @method reject
     * @param reason
     */
    Promise.reject = function(reason) {
        return new Promise((resolve, reject) => {
           reject(reason);
        });
    };
    /**
     * @method resolveDelay
     * @param value
     * @param time
     */
    Promise.resolveDelay = function(value, time) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                value instanceof Promise ? value.then(resolve, reject) : resolve(value);
            }, time);
        })
    };
    /**
     * @method resolveDelay
     * @param reason
     * @param time
     */
    Promise.rejectDelay = function(reason, time) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(reason);
            }, time);
        });
    };
    /**
     * @description 只有当前promise都成功时，次啊返回
     * @method all
     * @param promises
     */
    Promise.all = function(promises) {
        return new Promise((resolve, reject) => {
            // 存储所有成功回调返回的结果
            const values = new Array(promises.length);
            // 用来保存成功保存promise对象的个数
            let count = 0;
            promises.forEach((promise, index) => {
                Promise.resolve(promise).then(
                    value => {
                        count++;
                        values[index] = value;
                        if (count === promises.length) resolve(values);
                    },
                    reason => reject(reason)
                );
            });
        });
    };
    /**
     * @description 结果由第一个完成的promise决定
     * @method race
     * @param promises
     */
    Promise.race = function(promises) {
        return new Promise((resolve, reject) => {
            promises.forEach((promise, index) => {
                Promise.resolve(promise).then(resolve, reject);
            });
        });
    };


    window.Promise = Promise;
})(window);
