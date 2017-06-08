// @flow
// **********************  judgement   ************************
/**
 * check if the code running in browser environment (not include worker env)
 * @returns {Boolean}
 */
export const inBrowser =
    typeof window !== 'undefined' &&
    Object.prototype.toString.call(window) !== '[object Object]';
/**
 * to check whether a variable is array
 */
export function isArray (arr: any): boolean %checks {
  return Array.isArray(arr);
}

/**
 * 转变一个类数组对象为数组
 */
export function makeArray (obj: any): Array<any> {
  return Array.from(obj);
}

/**
 * 判断是否为function
 * @param  {Anything}  obj [description]
 * @return {Boolean}     [description]
 */
export function isFunction (obj: any): boolean %checks {
  return typeof obj === 'function';
}

/**
 * 判断是否是对象
 * @param  {Anything}  obj 传入对象
 * @return {Boolean}     [description]
 */
export function isObject (obj: any): boolean %checks {
  // incase of arrow function and array
  return !!obj && typeof obj === 'object' && Object(obj) === obj && String(obj) === '[object Object]' && !isFunction(obj) && !isArray(obj);
}
/**
 * 判断是否为数字
 * @param  {Anything}  obj [description]
 * @return {Boolean}     [description]
 */
export function isNumeric (obj: any): boolean %checks {
  return !isArray(obj) && (obj - Number.parseFloat(obj) + 1) >= 0;
}
/**
 * 判断是否为整数
 * @param  {Anything}  obj [description]
 * @return {Boolean}     [description]
 */
export function isInteger (num: any): boolean %checks {
  return Number.isInteger(num);
}

/**
 * 判断是否为空
 * @param  {Anything}  obj [description]
 * @return {Boolean}     [description]
 * @example
 * "", {}, [], 0, null, undefined, false 为空
 */
export function isEmpty (obj: any): boolean {
  if(isArray(obj)) {
    return obj.length === 0;
  } else if(isObject(obj)) {
    return Object.keys(obj).length === 0;
  } else {
    return !obj;
  }
}
/**
 * 判断是否为事件
 * @param  {Anything}  obj [description]
 * @return {Boolean}     [description]
 */
export function isEvent (obj: any): boolean %checks {
  return obj instanceof Event || obj.originalEvent instanceof Event;
}
/**
 * 判断是否为blob
 * @param  {Anything}  obj [description]
 * @return {Boolean}     [description]
 */
export function isBlob (obj: any): boolean %checks {
  return obj instanceof Blob;
}
/**
 * 判断是否为file上传的文件
 * @param  {Anything}  obj [description]
 * @return {Boolean}     [description]
 */
export function isFile (obj: any): boolean %checks {
  return isBlob(obj) && isString(obj.name);
}
/**
 * 判断是否为日期对象
 * @param  {Anything}  obj [description]
 * @return {Boolean}     [description]
 */
export function isDate (obj: any): boolean %checks {
  return Object.prototype.toString.call(obj) === '[object Date]';
}
/**
 * 判断是否是string
 * @param  {Anything}  str [description]
 * @return {Boolean}     [description]
 */
export function isString (str: any): boolean %checks {
  return typeof str === 'string';
   // || str instanceof String;
   // not support new String() because of flow
}
/**
 * is Boolean or not
 * @param  {Anything} bool
 * @return {Boolean}
 */
export function isBoolean (bool: any): boolean %checks {
  return typeof bool === 'boolean';
}
/**
 * 判断是否为url且必须要带有协议头
 * @param  {Anything}  str [description]
 * @return {Boolean}     [description]
 */
export function isUrl (str: any): boolean %checks {
  return isString(str) && !!str.match(/^((https?|ftp|rtsp|mms):\/\/)(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6}|localhost)(:[0-9]{1,4})?((\/?)|(\/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+\/?)$/i);
}
/**
 * to test if a HTML node
 * @param  {Anything}  obj [description]
 * @return {Boolean}     [description]
 */
export function isNode (obj: any): boolean %checks {
  return !!(typeof Node === 'object'
      ? obj instanceof Node
      : obj &&
        typeof obj === 'object' &&
        typeof obj.nodeType === 'number' &&
        typeof obj.nodeName === 'string');
}
/**
 * to test if a HTML element
 * @param  {Anything}  obj [description]
 * @return {Boolean}     [description]
 */
export function isElement (obj: any): boolean %checks {
  return !!(typeof HTMLElement === 'object'
    ? obj instanceof HTMLElement
    : obj &&
      typeof obj === 'object' &&
      obj !== null &&
      obj.nodeType === 1 &&
      typeof obj.nodeName === 'string');
}
// **********************  对象操作  ************************

/**
 * 生成深度遍历函数的处理器，常用于生成深度拷贝等
 * @param  {Function} fn 遍历到深度变量的时候的操作
 * @return {Function}     可用的操作函数
 */
export function genTraversalHandler (fn: Function): Function {
  function recursiveFn (source, target, key) {
    if(isArray(source) || isObject(source)) {
      target = target || (isObject(source) ? {} : []);
      for(const key in source) {
        target[key] = recursiveFn(source[key], target[key], key);
      }
      return target;
    }
    return fn(source, target, key);
  };
  return recursiveFn;
};
const _deepAssign = genTraversalHandler(val => val);
/**
 * 对象克隆
 * @param  {Array|Object} source 传其他值会直接返回
 * @return {clone-target}        [description]
 */
export function deepClone<T: Object | Array<any>> (source: T): T {
  if(!isObject(source) && !isArray(source)) {
    throw new TypeError('deepClone only accept Object or Array');
  }
  return _deepAssign(source);
};
/**
 * merge multiple objects
 * @param  {...Object} args [description]
 * @return {merge-object}         [description]
 */
export function deepAssign<T: any> (...args: Array<T>): T & T {
  if(args.length < 2) {
    throw new Error('deepAssign accept two and more argument');
  }
  for(let i = args.length - 1; i > -1; i--) {
    if(!isObject(args[i]) && !isArray(args[i])) {
      throw new TypeError('deepAssign only accept Object or Array');
    }
  }
  const target = args.shift();
  args.forEach(source => _deepAssign(source, target));
  return target;
}
// **********************  计算类    ************************
// 计算获取某种东西或者计算出某种东西
// ********************************************************
// 生成uuid
export function uuid () {
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
}
// 生成四个随机数
export function S4 () {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
// 生成任意长度的随机数
export function rand (length: number): string {
  let str = '';
  while(str.length < length) {
    str += S4();
  }
  return str.slice(0, length);
}
// ********************** class operation ***************************
// class MixinBuilder {
//   constructor (superclass) {
//     this.superclass = superclass || class {};
//   }

//   with (...mixins) {
//     return mixins.reduce((c, mixin) => mixin(c), this.superclass);
//   }
// }
// export const mix = (superclass) => {
//   return new MixinBuilder(superclass);
// };
/**
 * run a queue one by one.If include function reject or return false it will stop
 * @param  {Array} queue the queue which we want to run one by one
 * @return {Promise}    tell us whether a queue run finished
 */
export function runRejectableQueue (queue: Array<any>, ...args: any): Promise<*> {
  return new Promise((resolve, reject) => {
    const step = index => {
      if(index >= queue.length) {
        resolve();
        return;
      }
      const result = isFunction(queue[index])
        ? queue[index](...args)
        : queue[index];
      if(result === false) return reject('stop');
      return Promise.resolve(result)
        .then(() => step(index + 1))
        .catch(() => reject('stop'));
    };
    step(0);
  });
}
/**
 * set an attribute to an object which is frozen.
 * Means you can't remove it, iterate it or rewrite it.
 * @param {Object} obj
 * @param {string} key
 * @param {Anything} value
 */
export function setFrozenAttr (obj: Object, key: string, value: any) {
  if(!isObject(obj)) throw TypeError('setFrozenAttr obj parameter must be Object');
  if(!isString(key)) throw TypeError('setFrozenAttr key parameter must be String');
  Object.defineProperty(obj, key, {
    value,
    configurable: false,
    enumerable: false,
    writable: false
  });
}
/**
 * set attr on an Object. We will bind getter and setter on it if you provide to us
 * @param {Object} obj
 * @param {string} key
 * @param {Function} options.get
 * @param {Function} options.set
 * @param {String} prefix the origin data's prefix. We do not plan to save it by closure.
 */
export function setAttrGetterAndSetter (obj: Object, key: string, {get, set}: {get: ?Function, set: ?Function} = {}, prefix: string = '__') {
  if(!isObject(obj)) throw TypeError('setAttrGetterAndSetter obj parameter must be Object');
  if(!isString(key)) throw TypeError('setAttrGetterAndSetter key parameter must be String');
  const originalData = obj[key];
  if(!isFunction(get)) {
    Object.defineProperty(obj, prefix + key, {
      value: originalData,
      configurable: true,
      writable: true,
      enumerable: false
    });
    get = function () {return this[prefix + key];};
    if(set && isFunction(set)) {
      const originSetter = set;
      set = function (...args) {
        this[prefix + key] = originSetter.call(this, ...args);
      };
    }
  }
  Object.defineProperty(obj, key, {get, set});
}
/**
 * camelize any string
 * @param  {string} str only accept string!
 * @return {string}     camelize string
 */
export function camelize (str: string, isBig: ?boolean): string {
  return str.replace(/(^|[^a-zA-Z]+)([a-zA-Z])/g, function (match, spilt, initials, index) {
    return (!isBig && index === 0)
      ? initials.toLowerCase()
      : initials.toUpperCase();
  });
}

function checkContinuation (uint8array, start, checkLength) {
  const array = uint8array;
  if (start + checkLength < array.length) {
    while (checkLength--) {
      if ((array[++start] & 0xC0) !== 0x80) {return false;}
    }
    return true;
  } else {
    return false;
  }
}

// decodeUTF8
export function decodeUTF8 (uint8array: any) {
  const out = [];
  const input = uint8array;
  let i = 0;
  const length = uint8array.length;

  while (i < length) {
    if (input[i] < 0x80) {
      out.push(String.fromCharCode(input[i]));
      ++i;
      continue;
    } else if (input[i] < 0xC0) {
            // fallthrough
    } else if (input[i] < 0xE0) {
      if (checkContinuation(input, i, 1)) {
        const ucs4 = (input[i] & 0x1F) << 6 | (input[i + 1] & 0x3F);
        if (ucs4 >= 0x80) {
          out.push(String.fromCharCode(ucs4 & 0xFFFF));
          i += 2;
          continue;
        }
      }
    } else if (input[i] < 0xF0) {
      if (checkContinuation(input, i, 2)) {
        const ucs4 = (input[i] & 0xF) << 12 | (input[i + 1] & 0x3F) << 6 | input[i + 2] & 0x3F;
        if (ucs4 >= 0x800 && (ucs4 & 0xF800) !== 0xD800) {
          out.push(String.fromCharCode(ucs4 & 0xFFFF));
          i += 3;
          continue;
        }
      }
    } else if (input[i] < 0xF8) {
      if (checkContinuation(input, i, 3)) {
        let ucs4 = (input[i] & 0x7) << 18 | (input[i + 1] & 0x3F) << 12 |
                         (input[i + 2] & 0x3F) << 6 | (input[i + 3] & 0x3F);
        if (ucs4 > 0x10000 && ucs4 < 0x110000) {
          ucs4 -= 0x10000;
          out.push(String.fromCharCode((ucs4 >>> 10) | 0xD800));
          out.push(String.fromCharCode((ucs4 & 0x3FF) | 0xDC00));
          i += 4;
          continue;
        }
      }
    }
    out.push(String.fromCharCode(0xFFFD));
    ++i;
  }
  return out.join('');
}

// requestAnimationFrame
export const raf = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function (cb) { return setTimeout(cb, 17); };

// cancelAnimationFrame
export const caf = window.cancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.webkitCancelRequestAnimationFrame ||
    window.msCancelAnimationFrame ||
    window.oCancelAnimationFrame ||
    function (id) { clearTimeout(id); };

// 0-9 的数，根据要求的位数，格式化为 09...
export function padding (num, bit) {
}

// video 事件格式化
export function formatTime (time) {
  let minute = Math.floor(time / 60);
  if(minute < 10) {
      minute = '0' + minute;
  }
  let second = Math.floor(time % 60);
  if(second < 10) {
      second = '0' + second;
  }
  return minute + ':' + second;
}
