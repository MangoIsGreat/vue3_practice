import { isObject } from "@vue/shared";
import { reactive, readonly } from "./reactive";
import { TrackOpType } from "./operations";
import { Track } from "./effect";

// get
function createGetter(isReadonly = false, shallow = false) {
  return function get(target, key, receiver) {
    const res = Reflect.get(target, key, receiver);
    if (!isReadonly) {
      // 收集依赖，等数据变化后更新视图
      // 收集effect
      Track(target, TrackOpType.GET, key);
    }
    if (shallow) {
      // 浅代理
      return res;
    }
    if (isObject(res)) {
      // 懒代理(数据必须要使用了才会跑这个方法，否则不会跑这个方法) -- 性能优化
      return isReadonly ? readonly(res) : reactive(res); // 递归
    }
    return res;
  };
}

const get = createGetter(); // 不是只读，是深度
const shallowGet = createGetter(false, true); // 不是只读，是浅的
const readonlyGet = createGetter(true);
const shallowReadonlyGet = createGetter(true, true);

// set
function createSetter(shallow = false) {
  return function set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver);
    return result;
  };
}

const set = createSetter();
const shallowSet = createSetter(true);

export const reactiveHandlers = {
  get,
  set,
};

export const shallowReactiveHandlers = {
  get: shallowGet,
  set: shallowSet,
};

export const readonlyHandlers = {
  get: readonlyGet,
  set: (target, key, value) => {
    console.log(`set on key is falid`);
  },
};

export const shallowReadonlyHandlers = {
  get: shallowReadonlyGet,
  set: (target, key, value) => {
    console.log(`set on key is falid`);
  },
};
