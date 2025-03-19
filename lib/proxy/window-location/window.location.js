const originalLocation = window.location;

const locationProxy = new Proxy(originalLocation, {
  set(target, prop, value) {
    if (prop === 'href') {
      console.log('Intercepted window.location.href =', value);
      // 在这里添加你的拦截逻辑
      // 例如，阻止跳转或跳转到其他页面
      // target.href = 'your-custom-url';
      return true; // 表示设置成功
    }
    // 默认行为
    return Reflect.set(target, prop, value);
  },
  get(target, prop) {
    return Reflect.get(target, prop);
  },
});

// 将 window.location 替换为 Proxy
Object.defineProperty(window, 'location', {
  value: locationProxy,
  writable: false, // 防止被覆盖
});

// VM270:21 Uncaught TypeError: Cannot redefine property: location
//     at Object.defineProperty (<anonymous>)
//     at <anonymous>:21:8