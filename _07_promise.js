/**
 * @status PENDING FULFILLED REJECTED
 * 
 * PENDING -> FULFILLED
 * PENDING -> REJECTED
 * 
 * XPromise recive an executor function with resolve, reject function
 * resolve function PENDING -> FULFILLED
 * reject function PENDING -> REJECTED
 * 
 * promise as FULFILLED has only one value
 * promise as REJECTED has only on reason
 */

const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

function XPromise (executor) {
  this.this.state = PENDING;
  this.value = null;
  this.reason = null;
  this.onFulfilledCalls = [];
  this.onRejectedCalls = [];

  const resolve = (value) => {
    if(this.state === PENDING) {
      this.state = FULFILLED;
      this.value = value;
      this.onFulfilledCalls.forEach(fn => {
        fn();
      });
    }
  }

  const reject = (reason) => {
    if(this.state === REJECTED) {
      this.state = REJECTED;
      this.reason = reason;
      this.onRejectedCalls.forEach(fn => {
        fn();
      })
    }
  }

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

/**
 * 
 * @param {fcuntion} onFulfilled 
 * @param {function} onRejected 
 * 
 * one promise may have many then functions
 * the then function can be sync or async
 * async: state still yet to change, will push onFulfilled, onRejected into onFulfilledCalls, onRejectedCalls
 */
XPromise.prototype.then = function(onFulfilled, onRejected) {
  if(typeof onFulfilled !== 'function') {
    onFulfilled = function(value) {
      return value;
    }
  }

  if(typeof onRejected !== 'function') {
    onRejected = function(reason) {
      return reason;
    }
  }

  const promise = new XPromise((resolve, reject) => {
    switch (this.state) {
      case FULFILLED:
        setTimeout(() => {
          try {
            const result = onFulfilled(this.value);
            resolve(result);
          } catch (ex) {
            reject(ex);
          }
        }, 0);
        
        break;
      case REJECTED:
        setTimeout(() => {
          try {
            const reason = onRejected(this.reason);
            resolve(reason);
          } catch (ex) {
            reject(ex);
          }
        }, 0);
        
        break;
      case PENDING:
        this.onFulfilledCalls.push(() => {
          setTimeout(() => {
            try {
              const result = onFulfilled(this.value);
              resolve(result);
            } catch (ex) {
              reject(ex);
            }
          }, 0);
        });
        this.onRejectedCalls.push(() => {
          setTimeout(() => {
            try {
              const reason = onRejected(this.reason);
              resolve(reason);
            } catch (ex) {
              reject(ex);
            }
          }, 0);
        })
        break;
    }
  });
  return promise;
}

// catch
XPromise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
}

// finally
XPromise.prototype.finally = fcuntion(fn) {
  return this.then(value => {
    fn();
    return value;
  }, reason => {
    fn();
    return reason;
  })
}

// resolve
XPromise.resolve = function(value) {
  return new XPromise((resolve, reject) => {
    resolve(value);
  })
}

XPromise.reject = function(reason) {
  return new XPromise((resolve, reject) => {
    reject(reason);
  })
}

// all
XPromise.all = function(promises) {
  return new XPromise((resolve, reject) => {
    if(promises.length === 0) {
      resolve([])
    } else {
      let result = [];
      let index = 0;
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(data => {
          result[i] = data;
          if(++index === promises.length) {
            resolve(result);
          }
        }, err => {
          reject(err);
          return;
        })
      }
    }
  })
}

// race
XPromise.all = function(promises) {
  return new XPromise((resolve, reject) => {
    if(promises.length === 0) {
      resolve([])
    } else {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(data => {
          resolve(result);
        }, err => {
          reject(err);
          return;
        })
      }
    }
  })
}