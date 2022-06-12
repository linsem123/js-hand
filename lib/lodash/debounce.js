function debounce(event, time, callNow) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);

    if(callNow && !timer) {
      event.apply(this, args);
    }

    timer = setTimeout(() => { // this point at return function, not excute function
      event.apply(this, args);
    }, time)
  }
}