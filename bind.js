Function.prototype.myBind = function (context = window, ...args) {
    if(this === Function.prototype) return undefined;

    const _this = this;
    return function F(...argsOther) {
        if(this instanceof F) {
            return new _this(...args, ...argsOther);
        }
        return _this.apply(context, args.concat(argsOther));
    }

}