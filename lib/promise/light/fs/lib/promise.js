function Promise(executor) {
  this.PromiseState = 'pending';
  this.PromiseReuslt = null;
  this.callback = {};

  const self = this;
  function resolve(res) {
    if (self.PromiseState !== 'pending') return;
    // 1. Set Promise status
    self.PromiseState = 'fullfilled';
    // 2. Set Promise result
    self.PromiseReuslt = res;
    // 3. Callbak
    if (self.callback.onResolved) {
      self.callback.onResolved(self.PromiseReuslt)
    }
  }

  function reject(err) {
    if (self.PromiseState !== 'pending') return;
     // 1. Set Promise status
     self.PromiseState = 'rejected';
     // 2. Set Promise result
     self.PromiseReuslt = err;
     // 3. Callback
     if (self.callback.onRejected) {
      self.callback.onRejected(self.PromiseReuslt)
    }
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

  if (this.PromiseState === 'pending') {
    this.callback = {
      onResolved,
      onRejected
    }
  }
}