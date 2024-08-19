// interceptor.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {
  interceptMethod<T extends object, K extends keyof T>(target: T, propertyKey: K, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
      console.log(`拦截到 ${String(propertyKey)} 方法调用，参数为:`, args);
      const result = originalMethod.apply(this, args);
      console.log(` ${String(propertyKey)} 方法执行完毕，结果为:`, result);
      return result;
    };

    return descriptor;
  }
}