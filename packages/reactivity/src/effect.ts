export function effect(fn, options: any = {}) {
  const effect = createReactEffect(fn, options);
  // 判断一下
  if (!options.lazy) {
    effect(); // 默认执行
  }
  return effect;
}

function createReactEffect(fn, options) {
  const effect = function reactiveEffect() {
    fn(); // 执行用户的方法
  };
  return effect;
}
