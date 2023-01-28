// 定义effect-定义相关的属性
// effect收集依赖-更新视图
export function effect(fn, options: any = {}) {
  const effect = createReactEffect(fn, options);
  // 判断一下
  if (!options.lazy) {
    effect(); // 默认执行
  }
  return effect;
}

let uid = 0;
let activeEffect; // 保存当前的effect
const effectStack = []; // 定义栈结构，用于存储嵌套的effect(树形结构)
function createReactEffect(fn, options) {
  const effect = function reactiveEffect() {
    if (!effectStack.includes(effect)) {
      // 栈里不包含effect时入栈
      // 响应式的effect
      try {
        effectStack.push(effect); // 入栈
        activeEffect = effect;
        fn(); // 执行用户的方法
      } finally {
        effectStack.pop(); // 出栈
        activeEffect = effectStack[effectStack.length - 1]; // activeEffect取栈里最后一个effect
      }
    }
  };
  effect.id = uid++; // 区别effect
  effect._isEffect = true; // 区别effect是不是响应式的effect
  effect.raw = fn; // 保存用户的方法
  effect.options = options; // 保存用户的属性
  return effect;
}

// 收集effect，在获取数据的时候触发get
let targetMap = new WeakMap(); // 创建结构表
export function Track(target, type, key) {
  // key和我们的effect一一对应
  if (activeEffect === undefined) {
    // 没有在effect中使用
    return;
  }
  // 获取effect
  let depMap = targetMap.get(target);
  if (!depMap) {
    // 目标对象不存在时
    targetMap.set(target, (depMap = new Map()));
  }
  // 目标对象存在时
  let dep = depMap.get(key);
  if (!dep) {
    // 属性不存在时
    depMap.set(key, (dep = new Set()));
  }
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect); // 收集effect
  }
}
