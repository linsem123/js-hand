Function.prototype.myApply = function (context = window, args) {
    if (this === Function.prototype) {
        return undefined;
    }

    const fn = Symbol();
    context[fn] = this;
    let result;
    // typeof args
    if (Array.isArray(args)) {
        result = context[fn](...args);
    } else {
        result = context[fn]();
    }
    delete context[fn];
    return result;
}