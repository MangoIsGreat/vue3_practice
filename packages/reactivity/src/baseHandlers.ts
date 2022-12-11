import { isObject } from "@vue/shared";
import { reactive, readonly } from "./reactive";

function createGetter(isReadonly = false, shallow = false) {
  return function get(target, key, receiver) {
    const res = Reflect.get(target, key, receiver);
    if (!isReadonly) {
      // 非只读
      // 依赖收集
    }
    if (shallow) { // 浅代理
      return res;
    }
    if (isObject(res)) { // 懒代理 -- 性能优化
      return isReadonly ? readonly(res) : reactive(res); // 递归
    }
    return res;
  };
}

const get = createGetter(); // 不是只读，是深度
const shallowGet = createGetter(false, true); // 不是只读，是浅的
const readonlyGet = createGetter(true);
const shallowReadonlyGet = createGetter(true, true);

export const reactiveHandlers = {
  get,
};

export const shallowReactiveHandlers = {
  get: shallowGet,
};

export const readonlyHandlers = {
  get: readonlyGet,
};

export const shallowReadonlyHandlers = {
  get: shallowReadonlyGet,
};
