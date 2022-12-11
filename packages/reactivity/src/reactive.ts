import { isObject } from "@vue/shared";
import {
  reactiveHandlers,
  shallowReactiveHandlers,
  readonlyHandlers,
  shallowReadonlyHandlers,
} from "./baseHandlers";

// 通过“函数柯理化”实现函数根据传参不同输出结果不同
export function reactive(target) {
  return createReactObj(target, false, reactiveHandlers); // 高阶函数
}

export function shallowReactive(target) {
  return createReactObj(target, false, shallowReactiveHandlers); // 高阶函数
}

export function readonly(target) {
  return createReactObj(target, true, readonlyHandlers); // 高阶函数
}

export function shallowReadonly(target) {
  return createReactObj(target, true, shallowReadonlyHandlers); // 高阶函数
}

// 核心实现代理
const reactiveMap = new WeakMap(); // WeakMao中key必须为对象，且有自动的垃圾回收机制
const readonlyMap = new WeakMap();
function createReactObj(target, isReadOnly, baseHandlers) {
  // 非对象直接返回不处理
  if (!isObject(target)) {
    return target;
  }

  // 优化proxy
  const proxymap = isReadOnly ? readonlyMap : reactiveMap;
  const proxyEs = proxymap.get(target); // 对象已经被代理过
  if (proxyEs) {
    return proxyEs;
  }

  // 未被代理过则代理并添加到“map表”中
  const proxy = new Proxy(target, baseHandlers);
  proxymap.set(target, proxy);
  return proxy;
}
