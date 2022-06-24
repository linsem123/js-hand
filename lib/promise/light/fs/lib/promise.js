function Promise(executor) {
  this.PromiseState = 'pending';
  this.PromiseReuslt = null;

  const self = this;
  function resolve(res) {
    if (self.PromiseState !== 'pending') return;
    // 1. Set Promise status
    self.PromiseState = 'fullfilled';
    // 2. Set Promise result
    self.PromiseReuslt = res;
  }

  function reject(err) {
    if (self.PromiseState !== 'pending') return;
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
  if (this.PromiseState === 'fullfilled') {
    onResolved(this.PromiseReuslt);
  }

  if (this.PromiseState === 'rejected') {
    onRejected(this.PromiseReuslt);
  }
}