function Promise(executor) {
  this.PromiseState = "pending";
  this.PromiseReuslt = null;
  this.callbacks = [];

  const self = this;
  function resolve(res) {
    if (self.PromiseState !== "pending") return;
    // 1. Set Promise status
    self.PromiseState = "fullfilled";
    // 2. Set Promise result
    self.PromiseReuslt = res;
    // 3. Callbak
    self.callbacks.forEach((cb) => {
      if (cb.onResolved) {
        cb.onResolved(self.PromiseReuslt);
      }
    });
  }

  function reject(err) {
    if (self.PromiseState !== "pending") return;
    // 1. Set Promise status
    self.PromiseState = "rejected";
    // 2. Set Promise result
    self.PromiseReuslt = err;
    // 3. Callback
    self.callbacks.forEach((cb) => {
      if (cb.onRejected) {
        cb.onRejected(self.PromiseReuslt);
      }
    });
  }

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  const self = this;
  if (typeof onResolved !== 'function') {
    onResolved = v => v;
  }
  if (typeof onRejected !== 'function') {
    onRejected = err => {
      throw err;
    }
  }
  return new Promise((resolve, reject) => {
    const handler = function(callback) {
      try {
        const res = callback(self.PromiseReuslt);
        if (res instanceof Promise) {
          res.then(
            (r) => {
              resolve(r);
            },
            (e) => {
              reject(e);
            }
          );
        } else {
          // Resolve: pending -> fullfilled
          resolve(res);
        }
      } catch (error) {
        reject(error);
      }
    }

    if (this.PromiseState === "fullfilled") {
      handler(onResolved);
    }

    if (this.PromiseState === "rejected") {
      handler(onRejected);
    }

    if (this.PromiseState === "pending") {
      this.callbacks.push({
        onResolved: function () {
          handler(onResolved);
        },
        onRejected: function () {
          handler(onRejected);
        },
      });
    }
  });
};

Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected);
}

/**
 * 
 * @param {any} value 
 * @return Promise
 */
Promise.resolve = function(value) {
  return new Promise((resolve, reject) => {
    if (value instanceof Promise) {
      value.then(res => {
        resolve(res)
      }, err => {
        reject(err);
      })
    } else {
      resolve(value);
    }
  })
}

/**
 * 
 * @param {any} value 
 * @return Promise rejected
 */
Promise.reject = function(value) {
  return new Promise((resolve, reject) => {
    reject(value);
  })
}

/**
 * 
 * @param {Promise[]} promises 
 * @return Promise rejected
 */
Promise.all = function(promises) {
  let count = 0;
  const length = promises.length;
  const promiseResultList = new Array(length);
  return new Promise((resolve, reject) => {
    for (let i = 0; i < length; i++) {
      const promise = promises[i];
      promise.then(res => {
        count++;
        promiseResultList[i] = res;
        if (count === length) {
          resolve(promiseResultList);
        }
      }, err => {
        reject(err);
      });
    }
  });
}