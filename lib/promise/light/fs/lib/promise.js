function Promise(executor) {
  this.PromiseState = 'pending';
  this.PromiseReuslt = null;

  const self = this;
  function resolve(res) {
    // 1. Set Promise status
    self.PromiseState = 'fullfilled';
    // 2. Set Promise result
    self.PromiseReuslt = res;
  }

  function reject(err) {
     // 1. Set Promise status
     self.PromiseState = 'rejected';
     // 2. Set Promise result
     self.PromiseReuslt = err;
  }

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
  
}

Promise.prototype.then = function(onResolved, onRejected) {

}