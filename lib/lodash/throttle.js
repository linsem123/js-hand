// for the entire events: no first time
function throttle1(event, time) {
  let timer = null;
  return function(...args) {
    if(!timer) {
      timer = setTimeout(() => {
        timer = null;
        event.apply(this, args);
      }, time)
    }
  }
}

// for the entire events: no last time
function throttle2(event, time) {
  let pre = 0;
  return function(...args) {
    if(Date.now() - pre > time) {
      pre = Date.now();
      event.apply(this, args);
    }
  }
}

// combination with the first time and the last time
function throttle(event, time) {
  let pre = 0;
  let timer = null;
  return function(...args) {
    if(Date.now() - pre > time) {
      pre = Date.now();
      event.apply(this, args)
    } else if(!timer) {
      timer = setTimeout(() => {
        timer = null;
        event.apply(this, timer);
      }, time)
    }
  }
}
