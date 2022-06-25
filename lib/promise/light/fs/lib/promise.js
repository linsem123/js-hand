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
  return new Promise((resolve, reject) => {
    if (this.PromiseState === "fullfilled") {
      try {
        const res = onResolved(this.PromiseReuslt);
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

    if (this.PromiseState === "rejected") {
      onRejected(this.PromiseReuslt);
    }

    if (this.PromiseState === "pending") {
      this.callbacks.push({
        onResolved: function () {
          try {
            const res = onResolved(self.PromiseReuslt);
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
              resolve(res);
            }
          } catch (error) {
            reject(error);
          }
        },
        onRejected: function () {
          try {
            const res = onRejected(self.PromiseReuslt);
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
              resolve(res);
            }
          } catch (error) {
            reject(error);
          }
        },
      });
    }
  });
};
