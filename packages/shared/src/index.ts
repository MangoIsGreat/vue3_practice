export function isObject(target) {
  return typeof target === "object" && target != null;
}

export const extend = Object.assign;

export const isArray = Array.isArray;

export const isFuction = (val) => typeof val === 'function';

export const isNumber = (val) => typeof val === 'number';

export const isString = (val) => typeof val === 'string';

// 判断数组的key是不是整数
export const isIntegerKey = (key) => parseInt(key) + '' === key;

// 对象中是否有这个属性
const hasOwnProperty = Object.prototype.hasOwnProperty;
export const hasOwn = (val, key) => hasOwnProperty.call(val, key);
