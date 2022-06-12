Function.prototype.myCall = function (context = window, ...args) {
    // this -> function
    if(this === Function.prototype) return undefined;// to avoid myCall being called directly
    
    const fn = Symbol();
    context[fn] = this;
    const result = context[fn](...args);
    delete context[fn];
    return result;
}

// test

