function EventEmitter(maxAccount = 10) {
  this._maxListeners = maxAccount;
  this._events = {};
}

// add event
EventEmitter.prototype.addListener = function (type, listener, isPrepend) {
  if(!this._events) {
    this._events = {};
  }

  if (this._events[type]) {
    // maxAccount
    if(isPrepend) {
      this._events[type].unshift(listener);
    } else {
      this._events[type].push(listener);
    }
  } else {
    this._events[type] = [listener];
  }
}

// remove event
EventEmitter.prototype.removeListener = function(type, listener) {
  if(Array.isArray(this._events[type])) {
    if(!listener) {
      delete this._events[type];
    } else {
      this._events[type] = this._events[type].filter(e => e !== listener && e.origin !== listener);
    }
  }
}

// once
EventEmitter.prototype.once = function(type, listener) {
  const only = (...args) => {
    listener.apply(this, args);
    this._events.removeListener(type, listener);
  }

  only.origin = listener;
  this.addListener(type, only);
}

// emit event type
EventEmitter.prototype.emit = function(type, ...args) {
  if(Array.isArray(this._events[type])) {
    this._events[type].forEach(fn => {
      fn.apply(this, args);
    });
  }
}

// set maxAccount
EventEmitter.prototype.setMaxListeners = function(count) {
  this.maxAccount = count;
}