// Define the Promise constructor function
function Promise(executor) {
  // Initialize the Promise state as "pending"
  this.PromiseState = "pending";
  // Initialize the Promise result as null
  this.PromiseReuslt = null;
  // Initialize an array to store callback functions
  this.callbacks = [];

  // Save the context of this Promise instance
  const self = this;

  // Define the resolve function
  function resolve(res) {
    // If the Promise is not pending, exit the function
    if (self.PromiseState !== "pending") return;
    // Set the Promise state to "fulfilled"
    self.PromiseState = "fulfilled";
    // Set the Promise result to the resolved value
    self.PromiseReuslt = res;
    // Execute all onResolved callbacks asynchronously
    setTimeout(() => {
      self.callbacks.forEach((cb) => {
        if (cb.onResolved) {
          cb.onResolved(self.PromiseReuslt);
        }
      });
    });
  }

  // Define the reject function
  function reject(err) {
    // If the Promise is not pending, exit the function
    if (self.PromiseState !== "pending") return;
    // Set the Promise state to "rejected"
    self.PromiseState = "rejected";
    // Set the Promise result to the rejected value
    self.PromiseReuslt = err;
    // Execute all onRejected callbacks asynchronously
    setTimeout(() => {
      self.callbacks.forEach((cb) => {
        if (cb.onRejected) {
          cb.onRejected(self.PromiseReuslt);
        }
      });
    });
  }

  // Execute the executor function with resolve and reject as arguments
  try {
    executor(resolve, reject);
  } catch (error) {
    // If an error is thrown in the executor function, reject the Promise
    reject(error);
  }
}

// Define the then method on the Promise prototype
Promise.prototype.then = function (onResolved, onRejected) {
  // Save the context of this Promise instance
  const self = this;
  // If onResolved is not a function, replace it with a function that returns its argument
  if (typeof onResolved !== "function") {
    onResolved = (v) => v;
  }
  // If onRejected is not a function, replace it with a function that throws its argument
  if (typeof onRejected !== "function") {
    onRejected = (err) => {
      throw err;
    };
  }
  // Return a new Promise
  return new Promise((resolve, reject) => {
    // Define a function to handle the result of the callback
    const handler = function (callback) {
      try {
        // Execute the callback with the Promise result
        const res = callback(self.PromiseReuslt);
        // If the callback returns a Promise, chain it
        if (res instanceof Promise) {
          res.then(resolve, reject);
        } else {
          // If the callback returns a non-Promise value, resolve the new Promise with it
          resolve(res);
        }
      } catch (error) {
        // If an error is thrown in the callback, reject the new Promise
        reject(error);
      }
    };

    // If the Promise is fulfilled, execute onResolved asynchronously
    if (this.PromiseState === "fulfilled") {
      setTimeout(() => {
        handler(onResolved);
      });
    }

    // If the Promise is rejected, execute onRejected asynchronously
    if (this.PromiseState === "rejected") {
      setTimeout(() => {
        handler(onRejected);
      });
    }

    // If the Promise is pending, store the callbacks for later execution
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

// Define the catch method on the Promise prototype
Promise.prototype.catch = function (onRejected) {
  // Call then with undefined as onResolved and onRejected as onRejected
  return this.then(undefined, onRejected);
};

// Define the static resolve method on the Promise constructor
Promise.resolve = function (value) {
  // Return a new Promise that resolves with the given value
  return new Promise((resolve, reject) => {
    // If the value is a Promise, chain it
    if (value instanceof Promise) {
      value.then(resolve, reject);
    } else {
      // If the value is not a Promise, resolve the new Promise with it
      resolve(value);
    }
  });
};

// Define the static reject method on the Promise constructor
Promise.reject = function (value) {
  // Return a new Promise that rejects with the given value
  return new Promise((resolve, reject) => {
    reject(value);
  });
};

// Define the static all method on the Promise constructor
Promise.all = function (promises) {
  // Initialize a counter and a result array
  let count = 0;
  const promiseResultList = new Array(promises.length);
  // Return a new Promise
  return new Promise((resolve, reject) => {
    // For each promise in the input array
    for (let i = 0; i < promises.length; i++) {
      // Chain the promise
      promises[i].then(
        (res) => {
          // On resolve, store the result and increment the counter
          promiseResultList[i] = res;
          count++;
          // If all promises are resolved, resolve the new Promise with the result array
          if (count === promises.length) {
            resolve(promiseResultList);
          }
        },
        // On reject, reject the new Promise
        reject
      );
    }
  });
};

// Define the static race method on the Promise constructor
Promise.race = function (promises) {
  // Return a new Promise
  return new Promise((resolve, reject) => {
    // For each promise in the input array
    for (let i = 0; i < promises.length; i++) {
      // Chain the promise
      promises[i].then(
        // On resolve, resolve the new Promise
        resolve,
        // On reject, reject the new Promise
        reject
      );
    }
  });
};