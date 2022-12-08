// 通过“函数柯理化”实现函数根据传参不同输出结果不同
const reactiveHandlers = {};
const shallowReactiveHandlers = {};
const readonlyHandlers = {};
const shallowReadonlyHandlers = {};

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

function createReactObj(target, isReadOnly, baseHandlers) {}
