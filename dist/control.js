/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isArray = isArray;
exports.makeArray = makeArray;
exports.isFunction = isFunction;
exports.isObject = isObject;
exports.isNumeric = isNumeric;
exports.isInteger = isInteger;
exports.isEmpty = isEmpty;
exports.isEvent = isEvent;
exports.isBlob = isBlob;
exports.isFile = isFile;
exports.isDate = isDate;
exports.isString = isString;
exports.isBoolean = isBoolean;
exports.isUrl = isUrl;
exports.isNode = isNode;
exports.isElement = isElement;
exports.genTraversalHandler = genTraversalHandler;
exports.deepClone = deepClone;
exports.deepAssign = deepAssign;
exports.uuid = uuid;
exports.S4 = S4;
exports.rand = rand;
exports.runRejectableQueue = runRejectableQueue;
exports.setFrozenAttr = setFrozenAttr;
exports.setAttrGetterAndSetter = setAttrGetterAndSetter;
exports.camelize = camelize;
exports.decodeUTF8 = decodeUTF8;
exports.padding = padding;
exports.formatTime = formatTime;

// **********************  judgement   ************************
/**
 * check if the code running in browser environment (not include worker env)
 * @returns {Boolean}
 */
var inBrowser = exports.inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';
/**
 * to check whether a variable is array
 */
function isArray(arr) {
  return Array.isArray(arr);
}

/**
 * 转变一个类数组对象为数组
 */
function makeArray(obj) {
  return Array.from(obj);
}

/**
 * 判断是否为function
 * @param  {Anything}  obj [description]
 * @return {Boolean}     [description]
 */
function isFunction(obj) {
  return typeof obj === 'function';
}

/**
 * 判断是否是对象
 * @param  {Anything}  obj 传入对象
 * @return {Boolean}     [description]
 */
function isObject(obj) {
  // incase of arrow function and array
  return !!obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && Object(obj) === obj && String(obj) === '[object Object]' && !isFunction(obj) && !isArray(obj);
}
/**
 * 判断是否为数字
 * @param  {Anything}  obj [description]
 * @return {Boolean}     [description]
 */
function isNumeric(obj) {
  return !isArray(obj) && obj - Number.parseFloat(obj) + 1 >= 0;
}
/**
 * 判断是否为整数
 * @param  {Anything}  obj [description]
 * @return {Boolean}     [description]
 */
function isInteger(num) {
  return Number.isInteger(num);
}

/**
 * 判断是否为空
 * @param  {Anything}  obj [description]
 * @return {Boolean}     [description]
 * @example
 * "", {}, [], 0, null, undefined, false 为空
 */
function isEmpty(obj) {
  if (isArray(obj)) {
    return obj.length === 0;
  } else if (isObject(obj)) {
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
function isEvent(obj) {
  return obj instanceof Event || obj.originalEvent instanceof Event;
}
/**
 * 判断是否为blob
 * @param  {Anything}  obj [description]
 * @return {Boolean}     [description]
 */
function isBlob(obj) {
  return obj instanceof Blob;
}
/**
 * 判断是否为file上传的文件
 * @param  {Anything}  obj [description]
 * @return {Boolean}     [description]
 */
function isFile(obj) {
  return isBlob(obj) && isString(obj.name);
}
/**
 * 判断是否为日期对象
 * @param  {Anything}  obj [description]
 * @return {Boolean}     [description]
 */
function isDate(obj) {
  return Object.prototype.toString.call(obj) === '[object Date]';
}
/**
 * 判断是否是string
 * @param  {Anything}  str [description]
 * @return {Boolean}     [description]
 */
function isString(str) {
  return typeof str === 'string';
  // || str instanceof String;
  // not support new String() because of flow
}
/**
 * is Boolean or not
 * @param  {Anything} bool
 * @return {Boolean}
 */
function isBoolean(bool) {
  return typeof bool === 'boolean';
}
/**
 * 判断是否为url且必须要带有协议头
 * @param  {Anything}  str [description]
 * @return {Boolean}     [description]
 */
function isUrl(str) {
  return isString(str) && !!str.match(/^((https?|ftp|rtsp|mms):\/\/)(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6}|localhost)(:[0-9]{1,4})?((\/?)|(\/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+\/?)$/i);
}
/**
 * to test if a HTML node
 * @param  {Anything}  obj [description]
 * @return {Boolean}     [description]
 */
function isNode(obj) {
  return !!((typeof Node === 'undefined' ? 'undefined' : _typeof(Node)) === 'object' ? obj instanceof Node : obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && typeof obj.nodeType === 'number' && typeof obj.nodeName === 'string');
}
/**
 * to test if a HTML element
 * @param  {Anything}  obj [description]
 * @return {Boolean}     [description]
 */
function isElement(obj) {
  return !!((typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === 'object' ? obj instanceof HTMLElement : obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string');
}
// **********************  对象操作  ************************

/**
 * 生成深度遍历函数的处理器，常用于生成深度拷贝等
 * @param  {Function} fn 遍历到深度变量的时候的操作
 * @return {Function}     可用的操作函数
 */
function genTraversalHandler(fn) {
  function recursiveFn(source, target, key) {
    if (isArray(source) || isObject(source)) {
      target = target || (isObject(source) ? {} : []);
      for (var _key in source) {
        target[_key] = recursiveFn(source[_key], target[_key], _key);
      }
      return target;
    }
    return fn(source, target, key);
  };
  return recursiveFn;
};
var _deepAssign = genTraversalHandler(function (val) {
  return val;
});
/**
 * 对象克隆
 * @param  {Array|Object} source 传其他值会直接返回
 * @return {clone-target}        [description]
 */
function deepClone(source) {
  if (!isObject(source) && !isArray(source)) {
    throw new TypeError('deepClone only accept Object or Array');
  }
  return _deepAssign(source);
};
/**
 * merge multiple objects
 * @param  {...Object} args [description]
 * @return {merge-object}         [description]
 */
function deepAssign() {
  for (var _len = arguments.length, args = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
    args[_key2] = arguments[_key2];
  }

  if (args.length < 2) {
    throw new Error('deepAssign accept two and more argument');
  }
  for (var i = args.length - 1; i > -1; i--) {
    if (!isObject(args[i]) && !isArray(args[i])) {
      throw new TypeError('deepAssign only accept Object or Array');
    }
  }
  var target = args.shift();
  args.forEach(function (source) {
    return _deepAssign(source, target);
  });
  return target;
}
// **********************  计算类    ************************
// 计算获取某种东西或者计算出某种东西
// ********************************************************
// 生成uuid
function uuid() {
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
}
// 生成四个随机数
function S4() {
  return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
}
// 生成任意长度的随机数
function rand(length) {
  var str = '';
  while (str.length < length) {
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
function runRejectableQueue(queue) {
  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key3 = 1; _key3 < _len2; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return new Promise(function (resolve, reject) {
    var step = function step(index) {
      if (index >= queue.length) {
        resolve();
        return;
      }
      var result = isFunction(queue[index]) ? queue[index].apply(queue, args) : queue[index];
      if (result === false) return reject('stop');
      return Promise.resolve(result).then(function () {
        return step(index + 1);
      }).catch(function () {
        return reject('stop');
      });
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
function setFrozenAttr(obj, key, value) {
  if (!isObject(obj)) throw TypeError('setFrozenAttr obj parameter must be Object');
  if (!isString(key)) throw TypeError('setFrozenAttr key parameter must be String');
  Object.defineProperty(obj, key, {
    value: value,
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
function setAttrGetterAndSetter(obj, key) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      get = _ref.get,
      set = _ref.set;

  var prefix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '__';

  if (!isObject(obj)) throw TypeError('setAttrGetterAndSetter obj parameter must be Object');
  if (!isString(key)) throw TypeError('setAttrGetterAndSetter key parameter must be String');
  var originalData = obj[key];
  if (!isFunction(get)) {
    Object.defineProperty(obj, prefix + key, {
      value: originalData,
      configurable: true,
      writable: true,
      enumerable: false
    });
    get = function get() {
      return this[prefix + key];
    };
    if (set && isFunction(set)) {
      var originSetter = set;
      set = function set() {
        for (var _len3 = arguments.length, args = Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
          args[_key4] = arguments[_key4];
        }

        this[prefix + key] = originSetter.call.apply(originSetter, [this].concat(args));
      };
    }
  }
  Object.defineProperty(obj, key, { get: get, set: set });
}
/**
 * camelize any string
 * @param  {string} str only accept string!
 * @return {string}     camelize string
 */
function camelize(str, isBig) {
  return str.replace(/(^|[^a-zA-Z]+)([a-zA-Z])/g, function (match, spilt, initials, index) {
    return !isBig && index === 0 ? initials.toLowerCase() : initials.toUpperCase();
  });
}

function checkContinuation(uint8array, start, checkLength) {
  var array = uint8array;
  if (start + checkLength < array.length) {
    while (checkLength--) {
      if ((array[++start] & 0xC0) !== 0x80) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}

// decodeUTF8
function decodeUTF8(uint8array) {
  var out = [];
  var input = uint8array;
  var i = 0;
  var length = uint8array.length;

  while (i < length) {
    if (input[i] < 0x80) {
      out.push(String.fromCharCode(input[i]));
      ++i;
      continue;
    } else if (input[i] < 0xC0) {
      // fallthrough
    } else if (input[i] < 0xE0) {
      if (checkContinuation(input, i, 1)) {
        var ucs4 = (input[i] & 0x1F) << 6 | input[i + 1] & 0x3F;
        if (ucs4 >= 0x80) {
          out.push(String.fromCharCode(ucs4 & 0xFFFF));
          i += 2;
          continue;
        }
      }
    } else if (input[i] < 0xF0) {
      if (checkContinuation(input, i, 2)) {
        var _ucs = (input[i] & 0xF) << 12 | (input[i + 1] & 0x3F) << 6 | input[i + 2] & 0x3F;
        if (_ucs >= 0x800 && (_ucs & 0xF800) !== 0xD800) {
          out.push(String.fromCharCode(_ucs & 0xFFFF));
          i += 3;
          continue;
        }
      }
    } else if (input[i] < 0xF8) {
      if (checkContinuation(input, i, 3)) {
        var _ucs2 = (input[i] & 0x7) << 18 | (input[i + 1] & 0x3F) << 12 | (input[i + 2] & 0x3F) << 6 | input[i + 3] & 0x3F;
        if (_ucs2 > 0x10000 && _ucs2 < 0x110000) {
          _ucs2 -= 0x10000;
          out.push(String.fromCharCode(_ucs2 >>> 10 | 0xD800));
          out.push(String.fromCharCode(_ucs2 & 0x3FF | 0xDC00));
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
var raf = exports.raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (cb) {
  return setTimeout(cb, 17);
};

// cancelAnimationFrame
var caf = exports.caf = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.msCancelAnimationFrame || window.oCancelAnimationFrame || function (id) {
  clearTimeout(id);
};

// 0-9 的数，根据要求的位数，格式化为 09...
function padding(num, bit) {}

// video 事件格式化
function formatTime(time) {
  var minute = Math.floor(time / 60);
  if (minute < 10) {
    minute = '0' + minute;
  }
  var second = Math.floor(time % 60);
  if (second < 10) {
    second = '0' + second;
  }
  return minute + ':' + second;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.NodeWrap = undefined;
exports.getAttr = getAttr;
exports.setAttr = setAttr;
exports.addClassName = addClassName;
exports.removeClassName = removeClassName;
exports.hasClassName = hasClassName;
exports.removeEvent = removeEvent;
exports.addEvent = addEvent;
exports.addDelegate = addDelegate;
exports.removeDelegate = removeDelegate;
exports.getStyle = getStyle;
exports.setStyle = setStyle;
exports.query = query;
exports.findParents = findParents;
exports.$ = $;

var _utils = __webpack_require__(0);

var _event = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* @module dom
* @author huzunjie
* @description 一些常用的DOM判断及操作方法，可以使用dom.$('*')包装DOM，实现类jQuery的链式操作；当然这里的静态方法也可以直接使用。
*/

var _divEl = document.createElement('div');
var _textAttrName = 'textContent' in _divEl ? 'textContent' : 'innerText';
var _arrPrototype = Array.prototype;

/**
 * 读取HTML元素属性值
 * @param {HTMLElement} el 目标元素
 * @param {String} attrName 目标属性名称
 * @return {String}
 */
function getAttr(el, attrName) {
  return el.getAttribute(attrName);
}

/**
 * 设置HTML元素属性值
 * @param {HTMLElement} el 目标元素
 * @param {String} attrName 目标属性名称
 * @param {String} attrVal 目标属性值
 */
function setAttr(el, attrName, attrVal) {
  if (attrVal === undefined) {
    el.removeAttribute(attrName);
  } else {
    el.setAttribute(attrName, attrVal);
  }
}

/**
 * 为HTML元素添加className
 * @param {HTMLElement} el 目标元素
 * @param {String} cls 要添加的className（多个以空格分割）
 */
function addClassName(el, cls) {
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  var clsArr = cls.split(/\s+/);
  if (el.classList) {
    clsArr.forEach(function (c) {
      return el.classList.add(c);
    });
  } else {
    var curCls = ' ' + (el.className || '') + ' ';
    clsArr.forEach(function (c) {
      curCls.indexOf(' ' + c + ' ') === -1 && (curCls += ' ' + c);
    });
    el.className = curCls.trim();
  }
}

/**
 * 为HTML元素移除className
 * @param {HTMLElement} el 目标元素
 * @param {String} cls 要移除的className（多个以空格分割）
 */
function removeClassName(el, cls) {
  if (!cls || !(cls = cls.trim())) {
    return;
  }

  var clsArr = cls.split(/\s+/);
  if (el.classList) {
    clsArr.forEach(function (c) {
      return el.classList.remove(c);
    });
  } else {
    var curCls = ' ' + el.className + ' ';
    clsArr.forEach(function (c) {
      var tar = ' ' + c + ' ';
      while (curCls.indexOf(tar) !== -1) {
        curCls = curCls.replace(tar, ' ');
      }
    });
    el.className = curCls.trim();
  }
}

/**
 * 检查HTML元素是否已设置className
 * @param {HTMLElement} el 目标元素
 * @param {String} className 要检查的className
 * @return {Boolean}
 */
function hasClassName(el, className) {
  return new RegExp('(?:^|\\s)' + className + '(?=\\s|$)').test(el.className);
}

/**
 * 为HTML元素移除事件监听
 * @param {HTMLElement} el 目标元素
 * @param {String} type 事件名称
 * @param {Function} handler 处理函数
 * @param {Boolean} once 是否只监听一次
 * @param {Boolean} capture 是否在捕获阶段的监听
 */
function removeEvent(el, type, handler) {
  var once = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var capture = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  if (once) {
    /* 尝试从缓存中读取包装后的方法 */
    var handlerWrap = (0, _event.removeEventCache)(el, type + '_once', handler);
    if (handlerWrap) {
      handler = handlerWrap;
    }
  }
  el.removeEventListener(type, handler, capture);
}

/**
 * 为HTML元素添加事件监听
 * @param {HTMLElement} el 目标元素
 * @param {String} type 事件名称
 * @param {Function} handler 处理函数
 * @param {Boolean} once 是否只监听一次
 * @param {Boolean} capture 是否在捕获阶段监听
 */
function addEvent(el, type, handler) {
  var once = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var capture = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  if (once) {
    var oldHandler = handler;
    handler = function () {
      return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        oldHandler.apply(this, args);
        removeEvent(el, type, handler, once, capture);
      };
    }();
    /* 将包装后的方法记录到缓存中 */
    (0, _event.addEventCache)(el, type + '_once', oldHandler, handler);
  }

  el.addEventListener(type, handler, capture);
}

/**
 * 为HTML元素添加事件代理
 * @param {HTMLElement} el 目标元素
 * @param {String} selector 要被代理的元素
 * @param {String} type 事件名称
 * @param {Function} handler 处理函数
 * @param {Boolean} capture 是否在捕获阶段监听
 */
function addDelegate(el, selector, type, handler) {
  var capture = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;


  var handlerWrap = function handlerWrap(e) {
    var targetEls = findParents(e.srcElement, el, true);
    var targetEl = query(selector, el, true).find(function (seEl) {
      return targetEls.find(function (tgEl) {
        return seEl === tgEl;
      });
    });
    targetEl && handler.apply(targetEl, arguments);
  };
  /* 将包装后的方法记录到缓存中 */
  (0, _event.addEventCache)(el, type + '_delegate_' + selector, handler, handlerWrap);
  el.addEventListener(type, handlerWrap, capture);
}

/**
 * 为HTML元素移除事件代理
 * @param {HTMLElement} el 目标元素
 * @param {String} selector 要被代理的元素
 * @param {String} type 事件名称
 * @param {Function} handler 处理函数
 * @param {Boolean} capture 是否在捕获阶段监听
 */
function removeDelegate(el, selector, type, handler) {
  var capture = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  /* 尝试从缓存中读取包装后的方法 */
  var handlerWrap = (0, _event.removeEventCache)(el, type + '_delegate_' + selector, handler);
  handlerWrap && el.removeEventListener(type, handlerWrap, capture);
}

/**
 * 读取HTML元素样式值
 * @param {HTMLElement} el 目标元素
 * @param {String} key 样式key
 * @return {String}
 */
function getStyle(el, key) {
  return (el.currentStyle || document.defaultView.getComputedStyle(el, null))[key];
}

/**
 * 设置HTML元素样式值
 * @param {HTMLElement} el 目标元素
 * @param {String} key 样式key
 * @param {String} val 样式值
 */
function setStyle(el, key, val) {
  el.style[key] = val;
}

/**
 * 根据选择器查询目标元素
 * @param {String} selector 选择器,用于 querySelectorAll
 * @param {HTMLElement} container 父容器
 * @param {Boolean} toArray 强制输出为数组
 * @return {NodeList|Array}
 */
function query(selector) {
  var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  var toArray = arguments[2];

  var retNodeList = container.querySelectorAll(selector);
  return toArray ? (0, _utils.makeArray)(retNodeList) : retNodeList;
}

/**
 * 查找元素的父节点们
 * @param {HTMLElement} el 目标元素
 * @param {HTMLElement} endEl 最大父容器（不指定则找到html）
 * @param {Boolean} haveEl 包含当前元素
 * @param {Boolean} haveEndEl 包含设定的最大父容器
 */
function findParents(el) {
  var endEl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var haveEl = arguments[2];
  var haveEndEl = arguments[3];

  var retEls = [];
  if (haveEl) {
    retEls.push(el);
  }
  while (el && el.parentNode !== endEl) {
    el = el.parentNode;
    el && retEls.push(el);
  }
  if (haveEndEl) {
    retEls.push(endEl);
  }
  return retEls;
}

/**
 * 根据选择器查询并得到目标元素的wrap包装器
 * @param {String} selector 选择器,另外支持 HTMLString||NodeList||NodeArray||HTMLElement
 * @param {HTMLElement} container 父容器
 * @return {Object}
 */
function $(selector, container) {
  return selector.constructor === NodeWrap ? selector : new NodeWrap(selector, container);
}

/**
 * @class NodeWrap
 * @description
 * NodeWrap DOM包装器，用以实现基本的链式操作
 * new dom.NodeWrap('*') 相当于 dom.$('*')
 * 这里面用于DOM操作的属性方法都是基于上面静态方法实现，有需要可以随时修改补充
 * @param {String} selector 选择器(兼容 String||HTMLString||NodeList||NodeArray||HTMLElement)
 * @param {HTMLElement} container 父容器（默认为document）
 * @return {nodeWrap}
 */

var NodeWrap = function () {
  function NodeWrap(selector) {
    var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

    _classCallCheck(this, NodeWrap);

    var _this = this;
    _this.selector = selector;

    /* String||NodeList||HTMLElement 识别处理 */
    var elsArr = void 0;
    if (selector && selector.constructor === NodeList) {
      /* 支持直接传入NodeList来构建包装器 */
      elsArr = (0, _utils.makeArray)(selector);
    } else if ((0, _utils.isArray)(selector)) {
      /* 支持直接传入Node数组来构建包装器 */
      elsArr = selector;
    } else if ((0, _utils.isString)(selector)) {
      if (selector.indexOf('<') === 0) {
        /* 支持直接传入HTML字符串来新建DOM并构建包装器 */
        _divEl.innerHTML = selector;
        elsArr = query('*', _divEl, true);
      } else {
        /* 支持直接传入字符串选择器来查找DOM并构建包装器 */
        elsArr = query(selector, container, true);
      }
    } else {
      /* 其他任意对象直接构建包装器 */
      elsArr = [selector];
    }
    Object.assign(_this, elsArr);

    /* NodeWrap本意可以 extends Array省略构造方法中下面这部分代码，但目前编译不支持 */
    _this.length = elsArr.length;
  }

  /**
   * 循环遍历DOM集合
   * @param {Function} fn 遍历函数 fn(item, i)
   * @return {this}
   */


  NodeWrap.prototype.each = function each() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _arrPrototype.forEach.apply(this, args);
    return this;
  };

  /**
   * 添加元素到DOM集合
   * @param {Function} el 要加入的元素
   * @return {this}
   */
  NodeWrap.prototype.push = function push() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    _arrPrototype.push.apply(this, args);
    return this;
  };

  /**
   * 截取DOM集合片段，并得到新的包装器splice
   * @param {Nubmer} start
   * @param {Nubmer} count
   * @return {NodeWrap} 新的DOM集合包装器
   */
  NodeWrap.prototype.splice = function splice() {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return $(_arrPrototype.splice.apply(this, args));
  };

  /**
   * 查找子元素
   * @param {String} selector 选择器
   * @return {NodeWrap} 新的DOM集合包装器
   */
  NodeWrap.prototype.find = function find(selector) {
    var childs = [];
    this.each(function (el) {
      childs = childs.concat(query(selector, el, true));
    });
    var childsWrap = $(childs);
    childsWrap.parent = this;
    childsWrap.selector = selector;
    return childsWrap;
  };

  /**
   * 添加子元素
   * @param {HTMLElement} childEls 要添加的HTML元素
   * @return {this}
   */


  NodeWrap.prototype.append = function append(childEls) {
    var childsWrap = $(childEls);
    var firstEl = this[0];
    childsWrap.each(function (newEl) {
      return firstEl.appendChild(newEl);
    });
    return this;
  };

  /**
   * 将元素集合添加到指定容器
   * @param {HTMLElement} parentEl 要添加到父容器
   * @return {this}
   */


  NodeWrap.prototype.appendTo = function appendTo(parentEl) {
    $(parentEl).append(this);
    return this;
  };

  /**
   * DOM集合text内容读写操作
   * @param {String} val 文本内容（如果有设置该参数则执行写操作，否则执行读操作）
   * @return {this}
   */


  NodeWrap.prototype.text = function text(val) {
    if (arguments.length === 0) {
      return this[0][_textAttrName];
    }
    return this.each(function (el) {
      el[_textAttrName] = val;
    });
  };

  /**
   * DOM集合HTML内容读写操作
   * @param {String} html html内容（如果有设置该参数则执行写操作，否则执行读操作）
   * @return {this}
   */


  NodeWrap.prototype.html = function html(_html) {
    if (arguments.length === 0) {
      return this[0].innerHTML;
    }
    return this.each(function (el) {
      el.innerHTML = _html;
    });
  };

  /**
   * DOM集合属性读写操作
   * @param {String} name 属性名称
   * @param {String} val 属性值（如果有设置该参数则执行写操作，否则执行读操作）
   * @return {this}
   */


  NodeWrap.prototype.attr = function attr(name, val) {
    if (arguments.length === 1) {
      return getAttr(this[0], name);
    }
    return this.each(function (el) {
      return setAttr(el, name, val);
    });
  };

  /**
   * DOM集合dataset读写操作
   * @param {String} key 键名
   * @param {Any} val 键值（如果有设置该参数则执行写操作，否则执行读操作）
   * @return {this}
   */


  NodeWrap.prototype.data = function data(key, val) {
    if (arguments.length === 0) {
      return this[0].dataset || {};
    }
    if (arguments.length === 1) {
      return (this[0].dataset || {})[key];
    }
    return this.each(function (el) {
      (el.dataset || (el.dataset = {}))[key] = val;
    });
  };

  /**
   * DOM集合样式读写操作
   * @param {String} key 样式key
   * @param {String} val 样式值（如果有设置该参数则执行写操作，否则执行读操作）
   * @return {this}
   */


  NodeWrap.prototype.css = function css(key, val) {
    if (arguments.length === 1) {
      return getStyle(this[0], key);
    }
    return this.each(function (el) {
      return setStyle(el, key, val);
    });
  };

  /**
   * 为DOM集合增加className
   * @param {String} cls 要增加的className
   * @return {this}
   */


  NodeWrap.prototype.addClass = function addClass(cls) {
    return this.each(function (el) {
      return addClassName(el, cls);
    });
  };

  /**
   * 移除当前DOM集合的className
   * @param {String} cls 要移除的className
   * @return {this}
   */


  NodeWrap.prototype.removeClass = function removeClass(cls) {
    return this.each(function (el) {
      return removeClassName(el, cls);
    });
  };

  /**
   * 检查索引0的DOM是否有className
   * @param {String} cls 要检查的className
   * @return {this}
   */


  NodeWrap.prototype.hasClass = function hasClass(cls) {
    return hasClassName(this[0], cls);
  };

  /**
   * 为DOM集合添加事件监听
   * @param {String} type 事件名称
   * @param {Function} handler 处理函数
   * @param {Boolean} once 是否只监听一次
   * @param {Boolean} capture 是否在捕获阶段监听
   * @return {this}
   */


  NodeWrap.prototype.on = function on(type, handler) {
    var once = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    return this.each(function (el) {
      return addEvent(el, type, handler, once, capture);
    });
  };

  /**
   * 为DOM集合解除事件监听
   * @param {String} type 事件名称
   * @param {Function} handler 处理函数
   * @param {Boolean} once 是否只监听一次
   * @param {Boolean} capture 是否在捕获阶段监听
   * @return {this}
   */


  NodeWrap.prototype.off = function off(type, handler) {
    var once = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    return this.each(function (el) {
      return removeEvent(el, type, handler, once, capture);
    });
  };

  /**
   * 为DOM集合绑定事件代理
   * @param {String} selector 目标子元素选择器
   * @param {String} type 事件名称
   * @param {Function} handler 处理函数
   * @param {Boolean} capture 是否在捕获阶段监听
   * @return {this}
   */


  NodeWrap.prototype.delegate = function delegate(selector, type, handler) {
    var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    return this.each(function (el) {
      return addDelegate(el, selector, type, handler, capture);
    });
  };

  /**
   * 为DOM集合解绑事件代理
   * @param {String} selector 目标子元素选择器
   * @param {String} type 事件名称
   * @param {Function} handler 处理函数
   * @param {Boolean} capture 是否在捕获阶段监听
   * @return {this}
   */


  NodeWrap.prototype.undelegate = function undelegate(selector, type, handler) {
    var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    return this.each(function (el) {
      return removeDelegate(el, selector, type, handler, capture);
    });
  };

  return NodeWrap;
}();

exports.NodeWrap = NodeWrap;
;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _dom = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Base = function () {
  function Base(parent) {
    _classCallCheck(this, Base);

    this.parent = parent;
    this.fns = [];
    // this.defaultOption = {
    //   html: '',
    //   event: {}
    // };
  }

  Base.prototype.create = function create() {
    this.createEl();
    this.addAllEvent();
  };

  Base.prototype.allReady = function allReady() {};

  Base.prototype.destroy = function destroy() {
    this.removeAllEvent();
    this.parent.$dom.removeChild(this.$dom);
  };

  Base.prototype.createEl = function createEl() {
    this.$dom = document.createElement(this.tag);
    this.$dom.innerHTML = this.option.html;
    this.parent.$dom.appendChild(this.$dom);
  };

  Base.prototype.trans = function trans(name) {
    var _this = this;

    this.fns[name] = this.fns[name] || function () {
      return _this[name].apply(_this, arguments);
    };
    return this.fns[name];
  };

  Base.prototype.addAllEvent = function addAllEvent() {
    var _this2 = this;

    Object.keys(this.option.defaultEvent).forEach(function (item) {
      (0, _dom.addEvent)(_this2.$dom, item, _this2.trans(_this2.option.defaultEvent[item]));
    });
    this.option.event && Object.keys(this.option.event).forEach(function (item) {
      (0, _dom.addEvent)(_this2.$dom, item, _this2.option.event[item]);
    });
  };

  Base.prototype.removeAllEvent = function removeAllEvent() {
    var _this3 = this;

    Object.keys(this.option.defaultEvent).forEach(function (item) {
      (0, _dom.removeEvent)(_this3.$dom, item, _this3.trans(_this3.option.defaultEvent[item]));
    });
    this.option.event && Object.keys(this.option.event).forEach(function (item) {
      (0, _dom.removeEvent)(_this3.$dom, item, _this3.option.event[item]);
    });
  };

  return Base;
}();

exports.default = Base;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(0);

var _dom = __webpack_require__(1);

__webpack_require__(16);

var _createchild = __webpack_require__(6);

/**
 * 插件默认配置
 */
var defaultConfig = {
  play: true, // 底部播放暂停按钮
  volume: true, // 声音控制
  progressBar: true, // 播放进度控制条
  progressTime: true, // 播放时间
  screen: true // 全屏控制
  // extend: {
  //   xxx: {
  //     position: 'null',
  //   }
  // }
};

var visionControl = {
  name: 'visionControl',
  el: 'vision-control',
  data: {
    children: {}
  },
  create: function create() {
    // this.live = this.$videoConfig.type === 'live';
    var config = (0, _utils.isObject)(this.$config) ? (0, _utils.deepAssign)(defaultConfig, this.$config) : defaultConfig;
    // this.$dom.classList.add('vision-ui');
    this.children = (0, _createchild.createChild)(this, config);
  },
  destroy: function destroy() {
    this.children.map(function (item) {
      item.destroy();
    });
    this.$dom.parentNode.removeChild(this.$dom);
  },
  inited: function inited() {
    for (var i in this.children) {
      this.children[i].allReady();
    }
  },

  events: {
    play: function play() {
      this.children.play && this.children.play.changeState('play');
      this.hideItself();
    },
    pause: function pause() {
      this.children.play && this.children.play.changeState('pause');
    },
    load: function load() {},
    durationchange: function durationchange() {
      this.children.progressTime && this.children.progressTime.updateTotal();
    },
    timeupdate: function timeupdate() {
      this.progressUpdate();
    },
    progress: function progress() {
      this.children.progressBar && this.children.progressBar.progress();
    },
    volumechange: function volumechange() {
      this.volumeUpdate();
    },
    keydown: function keydown(e) {
      e.stopPropagation();
      switch (e.keyCode) {
        case 32:
          {
            e.preventDefault();
            this.children.play && this.children.play.click();
            break;
          }
        case 37:
          {
            e.preventDefault();
            var reduceTime = this.currentTime - 10;
            this.currentTime = reduceTime < 0 ? 0 : reduceTime;
            this.progressUpdate();
            break;
          }
        case 39:
          {
            e.preventDefault();
            var raiseTime = this.currentTime + 10;
            this.currentTime = raiseTime > this.duration ? this.duration : raiseTime;
            this.progressUpdate();
            break;
          }
        case 38:
          {
            e.preventDefault();
            var raiseVolume = this.volume + 0.1;
            this.volume = raiseVolume > 1 ? 1 : raiseVolume;
            this.volumeUpdate();
            break;
          }
        case 40:
          {
            e.preventDefault();
            var reduceVolume = this.volume - 0.1;
            this.volume = reduceVolume < 0 ? 0 : reduceVolume;
            this.volumeUpdate();
            break;
          }
        case 27:
          {
            e.preventDefault();
            this.children.screen && this.children.screen.narrowScreen();
            break;
          }
      }
    },
    mousemove: function mousemove(e) {
      this.showItself();
      this.hideItself();
    }
  },
  methods: {
    progressUpdate: function progressUpdate() {
      this.children.progressBar && this.children.progressBar.update();
      this.children.progressTime && this.children.progressTime.updatePass();
    },
    volumeUpdate: function volumeUpdate() {
      this.children.volume && this.children.volume.update();
    },
    hideItself: function hideItself() {
      var _this = this;

      window.clearTimeout(this.timeId);
      this.timeId = setTimeout(function () {
        (0, _dom.setStyle)(_this.$dom, 'display', 'none');
      }, 2000);
    },
    showItself: function showItself() {
      (0, _dom.setStyle)(this.$dom, 'display', 'flex');
    }
  }
};

window.visionControl = visionControl;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

var _dom = __webpack_require__(1);

var _base = __webpack_require__(2);

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * play 配置
 */

var defaultOption = {
  html: '\n    <vision-control-state-play></vision-control-state-play>\n    <vision-control-state-pause></vision-control-state-pause>\n  ',
  defaultEvent: {
    click: 'click'
  }
};

var Play = function (_Base) {
  _inherits(Play, _Base);

  function Play(parent, option) {
    _classCallCheck(this, Play);

    var _this = _possibleConstructorReturn(this, _Base.call(this, parent));

    _this.tag = 'vision-control-state';
    _this.option = (0, _utils.deepAssign)(defaultOption, (0, _utils.isObject)(option) ? option : {});
    _this.init();
    return _this;
  }

  Play.prototype.init = function init() {
    _Base.prototype.create.call(this);
    (0, _dom.addClassName)(this.$dom, 'flex-item');
    this.changeState('pause');
  };

  Play.prototype.changeState = function changeState(state) {
    var nextState = state === 'play' ? 'pause' : 'play';
    this.state = state;
    (0, _dom.addClassName)(this.parent.$dom, nextState);
    (0, _dom.removeClassName)(this.parent.$dom, state);
  };

  Play.prototype.click = function click() {
    var nextState = this.state === 'play' ? 'pause' : 'play';
    this.changeState(nextState);
    this.parent.$emit(nextState);
  };

  return Play;
}(_base2.default);

exports.default = Play;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

var _dom = __webpack_require__(1);

var _base = __webpack_require__(2);

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * progressBar 配置
 */

var defaultOption = {
  html: '\n    <vision-progressbar-bg></vision-progressbar-bg>\n\t\t<vision-progressbar-buffer></vision-progressbar-buffer>\n\t\t<vision-progressbar-all></vision-progressbar-all>\n\t\t<vision-progressbar-tip></vision-progressbar-tip>\n  ',
  defaultEvent: {
    click: 'click',
    mousedown: 'mousedown',
    mouseenter: 'mouseenter'
  }
};

var ProgressBar = function (_Base) {
  _inherits(ProgressBar, _Base);

  function ProgressBar(parent, option) {
    _classCallCheck(this, ProgressBar);

    var _this = _possibleConstructorReturn(this, _Base.call(this, parent));

    _this.tag = 'vision-progressbar';
    _this.option = (0, _utils.deepAssign)(defaultOption, (0, _utils.isObject)(option) ? option : {});
    _this.init();
    return _this;
  }

  ProgressBar.prototype.init = function init() {
    _Base.prototype.create.call(this);
    this.$buffer = (0, _dom.$)('vision-progressbar-buffer', this.$dom);
    this.$all = (0, _dom.$)('vision-progressbar-all', this.$dom);
    this.$tip = (0, _dom.$)('vision-progressbar-tip', this.$dom);
    this.$track = (0, _dom.$)('vision-progressbar-track', this.$dom);
    (0, _dom.addClassName)(this.$dom, 'flex-item flex-item-free');
  };

  ProgressBar.prototype.click = function click(e) {
    this.parent.currentTime = e.layerX / this.$dom.offsetWidth * this.parent.duration;
    this.update();
  };

  ProgressBar.prototype.mousedown = function mousedown(e) {
    this.startX = e.clientX;
    this.startTime = this.parent.currentTime;
    (0, _dom.addEvent)(window, 'mousemove', this.trans('draging'));
    (0, _dom.addEvent)(window, 'mouseup', this.trans('dragEnd'));
    (0, _dom.addEvent)(window, 'contextmenu', this.trans('dragEnd'));
    (0, _dom.removeEvent)(this.parent.$dom, 'timeupdate', this.trans('update'));
  };

  ProgressBar.prototype.mouseenter = function mouseenter() {
    (0, _dom.addEvent)(this.$dom, 'mousemove', this.trans('tipDown'));
    (0, _dom.addEvent)(this.$dom, 'mouseleave', this.trans('tipEnd'));
  };

  /**
   * 缓存进度条更新 progress 事件
   */


  ProgressBar.prototype.progress = function progress() {
    console.log(this);
    var buffer = this.buffered;
    var bufferWidth = buffer / this.parent.currentTime * 100 + '%';
    this.$buffer.css('width', bufferWidth);
  };

  /**
   * requestAnimationFrame 来更新进度条, timeupdate 事件
   */


  ProgressBar.prototype.update = function update() {
    var timeWidth = this.parent.currentTime ? this.parent.currentTime / this.parent.duration * 100 + '%' : 0;
    this.$all.css('width', timeWidth);
  };

  /**
   * 开始拖拽
   * @param {EventObject} e 鼠标事件
   */


  ProgressBar.prototype.draging = function draging(e) {
    this.endX = e.clientX;
    var dragTime = (this.endX - this.startX) / this.$dom.offsetWidth * this.parent.duration;
    var dragAfterTime = (this.startTime + dragTime).toFixed(2);
    this.parent.currentTime = dragAfterTime < 0 ? 0 : dragAfterTime > this.parent.duration ? this.parent.duration : dragAfterTime;
    this.update();
  };

  /**
   * 结束拖拽
   */


  ProgressBar.prototype.dragEnd = function dragEnd() {
    this.startX = 0;
    this.startTime = 0;
    (0, _dom.removeEvent)(window, 'mousemove', this.trans('draging'));
    (0, _dom.removeEvent)(window, 'mouseup', this.trans('dragEnd'));
    (0, _dom.removeEvent)(window, 'contextmenu', this.trans('dragEnd'));
    (0, _dom.addEvent)(this.parent.$dom, 'timeupdate', this.trans('update'));
  };

  ProgressBar.prototype.tipDown = function tipDown(e) {
    (0, _dom.addEvent)(this.$dom, 'mousemove', this.trans('tipShow'));
    (0, _dom.addEvent)(this.$dom, 'mouseleave', this.trans('tipEnd'));
  };

  ProgressBar.prototype.tipShow = function tipShow(e) {
    var time = e.layerX / this.$dom.offsetWidth * this.parent.duration;
    time = time < 0 ? 0 : time > this.parent.duration ? this.parent.duration : time;
    var tipContent = (0, _utils.formatTime)(time);
    this.$tip.text(tipContent);
    this.$tip.css('display', 'inline-block');
    this.$tip.css('left', e.layerX + 'px');
  };

  ProgressBar.prototype.tipEnd = function tipEnd(e) {
    (0, _dom.removeEvent)(this.$dom, 'mousemove', this.trans('tipShow'));
    (0, _dom.removeEvent)(this.$dom, 'mouseleave', this.trans('tipEnd'));
    this.$tip.css('display', 'none');
  };

  return ProgressBar;
}(_base2.default);

exports.default = ProgressBar;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.createChild = createChild;

var _play = __webpack_require__(4);

var _play2 = _interopRequireDefault(_play);

var _volume = __webpack_require__(21);

var _volume2 = _interopRequireDefault(_volume);

var _progressbar = __webpack_require__(5);

var _progressbar2 = _interopRequireDefault(_progressbar);

var _progresstime = __webpack_require__(28);

var _progresstime2 = _interopRequireDefault(_progresstime);

var _screen = __webpack_require__(25);

var _screen2 = _interopRequireDefault(_screen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 1. 将所有的 ui component 输出到 html 结构中
 * 2. 为这些 component 绑定响应的事件
 * @param {*} dom 所有 ui 节点的子容器
 * @param {*} config 关于 ui 的一些列设置
 * @return {Array} 所有子节点
 */

function createChild(plugin, config) {
  var children = {};
  if (config.play) {
    children.play = new _play2.default(plugin, config.play);
  }
  if (config.volume) {
    children.volume = new _volume2.default(plugin, config.volume);
  }
  if (config.progressBar && !plugin.live) {
    children.progressBar = new _progressbar2.default(plugin, config.progressBar);
  }
  if (config.progressTime) {
    children.progressTime = new _progresstime2.default(plugin, config.progressTime);
  }
  if (config.screen) {
    children.screen = new _screen2.default(plugin, config.screen);
  }
  return children;
} // import control from 'control/base.js';

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.CustEvent = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.emitEventCache = emitEventCache;
exports.addEventCache = addEventCache;
exports.removeEventCache = removeEventCache;

var _utils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* @module event
* @author huzunjie
* @description 自定义事件基础类
*/

/* 缓存事件监听方法及包装，内部数据格式：
 * targetIndex_<type:'click|mouseup|done'>: [ [
 *   function(){ ... handler ... },
 *   function(){ ... handlerWrap ... handler.apply(target, arguments) ... },
 *   isOnce
 * ]]
 */
var _evtListenerCache = Object.create(null);
_evtListenerCache.count = 0;

/**
 * 得到某对象的某事件类型对应的监听队列数组
 * @param  {Object}  target 发生事件的对象
 * @param {String} type 事件类型(这里的时间类型不只是名称，还是缓存标识，可以通过添加后缀来区分)
 * @return {Array}
 */
function getEvtTypeCache(target, type) {

  var evtId = target.__evt_id;
  if (!evtId) {

    /* 设置__evt_id不可枚举 */
    Object.defineProperty(target, '__evt_id', {
      writable: true,
      enumerable: false,
      configurable: true
    });

    /* 空对象初始化绑定索引 */
    evtId = target.__evt_id = ++_evtListenerCache.count;
  }

  var typeCacheKey = evtId + '_' + type;
  var evtTypeCache = _evtListenerCache[typeCacheKey];
  if (!evtTypeCache) {
    evtTypeCache = _evtListenerCache[typeCacheKey] = [];
  }

  return evtTypeCache;
}

/**
 * 触发事件监听方法
 * @param  {Object}  target 发生事件的对象
 * @param {String} type 事件类型
 * @param {Object} eventObj 触发事件时要传回的event对象
 * @return {undefined}
 */
function emitEventCache(target, type, eventObj) {
  var evt = Object.create(null);
  evt.type = type;
  evt.target = target;
  if (eventObj) {
    Object.assign(evt, (0, _utils.isObject)(eventObj) ? eventObj : { data: eventObj });
  }
  getEvtTypeCache(target, type).forEach(function (item) {
    (item[1] || item[0]).apply(target, [evt]);
  });
}

/**
 * 添加事件监听到缓存
 * @param  {Object}  target 发生事件的对象
 * @param {String} type 事件类型
 * @param {Function} handler 监听函数
 * @param {Boolean} isOnce 是否单次执行
 * @param {Function} handlerWrap
 * @return {undefined}
 */
function addEventCache(target, type, handler) {
  var isOnce = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var handlerWrap = arguments[4];

  if ((0, _utils.isFunction)(isOnce) && !handlerWrap) {
    handlerWrap = isOnce;
    isOnce = undefined;
  }
  var handlers = [handler, undefined, isOnce];
  if (isOnce && !handlerWrap) {
    handlerWrap = function handlerWrap() {
      removeEventCache(target, type, handler, isOnce);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      handler.apply(target, args);
    };
  }
  if (handlerWrap) {
    handlers[1] = handlerWrap;
  }
  getEvtTypeCache(target, type).push(handlers);
}

/**
 * 移除事件监听
 * @param  {Object}  target 发生事件的对象
 * @param {String} type 事件类型
 * @param {Function} handler 监听函数
 * @return {undefined}
 */
function removeEventCache(target, type, handler) {
  var isOnce = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var typeCache = getEvtTypeCache(target, type);

  if (handler || isOnce) {
    /* 有指定 handler 则清除对应监听 */
    var handlerId = -1;
    var handlerWrap = void 0;
    typeCache.find(function (item, i) {
      if ((!handler || item[0] === handler) && (!isOnce || item[2])) {
        handlerId = i;
        handlerWrap = item[1];
        return true;
      }
    });
    if (handlerId !== -1) {
      typeCache.splice(handlerId, 1);
    }
    return handlerWrap;
  } else {
    /* 未指定 handler 则清除type对应的所有监听 */
    typeCache.length = 0;
  }
}

/**
 * @class CustEvent
 * @description
 * Event 自定义事件类
 * 1. 可以使用不传参得到的实例作为eventBus使用
 * 2. 可以通过指定target，用多个实例操作同一target对象的事件管理
 * 3. 当设定target时，可以通过设置assign为true，来给target实现"on\once\off\emit"方法
 * @param  {Object}  target 发生事件的对象（空则默认为event实例）
 * @param  {Boolean}  assign 是否将"on\once\off\emit"方法实现到target对象上
 * @return {event}
 */

var CustEvent = exports.CustEvent = function () {
  function CustEvent(target, assign) {
    _classCallCheck(this, CustEvent);

    /* 设置__target不可枚举 */
    Object.defineProperty(this, '__target', {
      writable: true,
      enumerable: false,
      configurable: true
    });
    this.__target = this;

    if (target) {
      if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object') {
        throw new Error('CusEvent target are not object');
      }
      this.__target = target;

      /* 为target实现on\once\off\emit */
      if (assign) {
        for (var mth in this) {
          target[mth] = this[mth];
        }
      }
    }
  }

  /**
   * 添加事件监听
   * @param {String} type 事件类型
   * @param {Function} handler 监听函数
   * @param {Boolean} isOnce 单次监听类型
   * @return {event}
   */


  CustEvent.prototype.on = function on(type, handler) {
    var isOnce = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    addEventCache(this.__target, type, handler, isOnce);
    return this;
  };

  /**
   * 添加事件监听,并且只执行一次
   * @param {String} type 事件类型
   * @param {Function} handler 监听函数
   * @return {event}
   */


  CustEvent.prototype.once = function once(type, handler) {
    return this.on(type, handler, true);
  };

  /**
   * 移除事件监听
   * @param {String} type 事件类型
   * @param {Function} handler 监听函数(不指定handler则清除type对应的所有事件监听)
   * @param {Boolean} isOnce 单次监听类型
   * @return {event}
   */


  CustEvent.prototype.off = function off(type, handler) {
    var isOnce = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    removeEventCache(this.__target, type, handler, isOnce);
    return this;
  };

  /**
   * 触发事件监听函数
   * @param {String} type 事件类型
   * @return {event}
   */


  CustEvent.prototype.emit = function emit(type, data) {
    emitEventCache(this.__target, type, { data: data });
    return this;
  };

  return CustEvent;
}();

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)(undefined);
// imports


// module
exports.push([module.i, "/* 默认隐藏 */\nvision-volume-bar,\nvision-progressbar-tip,\nvision-screen-full,\nvision-screen-small,\nvision-control-state-play,\nvision-control-state-pause{\n  display: none;\n}\n\nvision-control.full vision-screen-full,\nvision-control.small vision-screen-small,\nvision-volume.mute vision-volume-state-mute,\nvision-volume.low vision-volume-state-low,\nvision-volume.high vision-volume-state-high,\nvision-control.play vision-control-state-play,\nvision-control.pause vision-control-state-pause{\n  display: inline-block;\n  width: 100%;\n  height: 100%;\n}\n\nvision-control{\n  position: absolute;\n  width: 100%;\n  height: 2em;\n  left: 0;\n  bottom: 0;\n  font-size: 18px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -ms-flex-wrap: nowrap;\n      flex-wrap: nowrap;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  background: #000;\n  border-top: 1px solid #e2e2e2;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  font-family: '';\n}\n\n/*flex 布局*/\nvision-control .flex-item{\n  -webkit-box-ordinal-group: 2;\n      -ms-flex-order: 1;\n          order: 1;\n  -webkit-box-flex: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  -ms-flex-preferred-size: 2em;\n      flex-basis: 2em;\n  padding: .3em .1em;\n}\n\nvision-control .flex-item-free{\n  -webkit-box-ordinal-group: 2;\n      -ms-flex-order: 1;\n          order: 1;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n}\nvision-control .flex-item-2{\n  -ms-flex-preferred-size: 4em;\n      flex-basis: 4em;\n}\n\nvision-control .flex-item-3{\n  -ms-flex-preferred-size: 6em;\n      flex-basis: 6em;\n}\n\n/*播放器状态， 播放／暂停*/\n\nvision-control-state-play{\n  background: url(" + __webpack_require__(18) + ");\n  background-repeat: no-repeat;\n  background-size: auto 100%;\n}\n\nvision-control-state-pause{\n  background: url(" + __webpack_require__(17) + ");\n  background-repeat: no-repeat;\n  background-size: auto 100%;\n}\n\n/*播放器控制条*/\n\nvision-progressbar{\n  position: relative;\n\tcursor: pointer;\n  margin-right: .5em;\n}\n\n\nvision-progressbar-all,\nvision-progressbar-buffer,\nvision-progressbar-bg{\n  position: absolute;\n  top:1em;\n  left: 0;\n  display: inline-block;\n  height: 3px;\n}\nvision-progressbar-bg{\n  width: 100%;\n  background: #4c4c4c;\n}\nvision-progressbar-buffer{\n  width: 0;\n  background: #6f6f6f;\n}\nvision-progressbar-all{\n\tbackground: #de698c;\n}\nvision-progressbar-all:after{\n\tcontent: '';\n\tposition: absolute;\n\tright: -.2em;\n\ttop: -.3em;\n\tdisplay: inline-block;\n\twidth: .8em;\n\theight: .8em;\n\tborder-radius: .8em;\n\tbackground: #fff;\n}\nvision-progressbar-tip{\n\tposition: absolute;\n\tbottom: .5em;\n  top: -1.5em;\n\tleft: 0;\n\tz-index: 10;\n\twidth: 3em;\n\theight: 1.5em;\n  background: #fff;\n  margin-left: -1.5em;\n  line-height: 1.5em;\n  border-radius: 4px;\n  color: #000;\n  text-align: center;\n  font-size: 14px;\n}\n\n/*时间显示*/\nvision-progresstime{\n  line-height: 2.5em;\n  color: #fff;\n  font-weight: normal;\n  font-size: 14px;\n}\n\nvision-progresstime-pass,\nvision-progresstime-total{\n  display: inline-block;\n  width: 50%;\n}\n\nvision-progresstime-total{\n  margin-left: -.7em;\n}\n/*音量控制*/\n\nvision-volume{\n  cursor: pointer;\n  margin-right: 1em;\n}\n\nvision-volume-state{\n  display: inline-block;\n  height: 100%;\n  width: 100%;\n}\n\nvision-volume-state-mute{\n  background: url(" + __webpack_require__(24) + ");\n  background-repeat: no-repeat;\n  background-size: auto 100%;\n}\n\nvision-volume-state-low{\n  background: url(" + __webpack_require__(23) + ");\n  background-repeat: no-repeat;\n  background-size: auto 100%;\n}\n\nvision-volume-state-high{\n  background: url(" + __webpack_require__(22) + ");\n  background-repeat: no-repeat;\n  background-size: auto 100%;\n}\n\nvision-volume-bar{\n  position: relative;\n  height: 100%;\n  width: 60%;\n  margin-left: .3em;\n}\n\n\nvision-volume-bar-all,\nvision-volume-bar-bg{\n  position: absolute;\n  top: .7em;\n  left: 0;\n  display: inline-block;\n  height: 3px;\n}\nvision-volume-bar-bg{\n  width: 100%;\n  background: #4c4c4c;\n}\nvision-volume-bar-all{\n\tbackground: #de698c;\n}\nvision-volume-bar-all:after{\n\tcontent: '';\n\tposition: absolute;\n\tright: -.2em;\n\ttop: -.3em;\n\tdisplay: inline-block;\n\twidth: .8em;\n\theight: .8em;\n\tborder-radius: .8em;\n\tbackground: #fff;\n}\n\n/*全屏*/\n\nvision-screen-small{\n  background: url(" + __webpack_require__(27) + ");\n  background-repeat: no-repeat;\n  background-size: auto 100%;\n}\n\nvision-screen-full{\n  background: url(" + __webpack_require__(26) + ");\n  background-repeat: no-repeat;\n  background-size: auto 100%;\n}\n", ""]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap) {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
  var base64 = new Buffer(JSON.stringify(sourceMap)).toString('base64');
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

  return '/*# ' + data + ' */';
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13).Buffer))

/***/ }),
/* 11 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 12 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(8)
var ieee754 = __webpack_require__(11)
var isArray = __webpack_require__(12)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [],
	fixUrls = __webpack_require__(15);

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	options.attrs.type = "text/css";

	attachTagAttrs(styleElement, options.attrs);
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	attachTagAttrs(linkElement, options.attrs);
	insertStyleElement(options, linkElement);
	return linkElement;
}

function attachTagAttrs(element, attrs) {
	Object.keys(attrs).forEach(function (key) {
		element.setAttribute(key, attrs[key]);
	});
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement, options);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
	and there is no publicPath defined then lets turn convertToAbsoluteUrls
	on by default.  Otherwise default to the convertToAbsoluteUrls option
	directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls){
		css = fixUrls(css);
	}

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 15 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	var fixedCss = css.replace(/url *\( *(.+?) *\)/g, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(14)(content, {"insertAt":"bottom"});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js??ref--1-1!../node_modules/postcss-loader/index.js??ref--1-2!./control.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js??ref--1-1!../node_modules/postcss-loader/index.js??ref--1-2!./control.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNDkyMTYxODY2NDMwIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEyMzAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTY4Ni40ODAzNTggMTE5LjU2MDAyNmMwLTMyLjM3NzQwOCAyNi4zMjU1NzUtNTguNjQ0NjU1IDU4LjY0NDY1NS01OC42NDQ2NTUgMzIuMzg2NjE4IDAgNTguNjQ1Njc4IDI2LjQyMDc0MyA1OC42NDU2NzggNTguNjQ0NjU1bDAgNzgxLjkzMDc3OWMwIDMyLjM3NjM4NS0yNi4zMjU1NzUgNTguNjQ0NjU1LTU4LjY0NTY3OCA1OC42NDQ2NTUtMzIuMzg1NTk1IDAtNTguNjQ0NjU1LTI2LjQxOTcxOS01OC42NDQ2NTUtNTguNjQ0NjU1TDY4Ni40ODAzNTggMTE5LjU2MDAyNnpNMjE3LjMyMTA3MiAxMTkuNTYwMDI2YzAtMzIuMzc3NDA4IDI2LjMyNTU3NS01OC42NDQ2NTUgNTguNjQ1Njc4LTU4LjY0NDY1NSAzMi4zODU1OTUgMCA1OC42NDQ2NTUgMjYuNDIwNzQzIDU4LjY0NDY1NSA1OC42NDQ2NTVsMCA3ODEuOTMwNzc5YzAgMzIuMzc2Mzg1LTI2LjMyNTU3NSA1OC42NDQ2NTUtNTguNjQ0NjU1IDU4LjY0NDY1NS0zMi4zODU1OTUgMC01OC42NDU2NzgtMjYuNDE5NzE5LTU4LjY0NTY3OC01OC42NDQ2NTVMMjE3LjMyMTA3MiAxMTkuNTYwMDI2eiIgcC1pZD0iMTIzMSIgZmlsbD0iI2ZmZmZmZiI+PC9wYXRoPjwvc3ZnPg=="

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNDkyMTYyMDEyNDQ1IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE4MzgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTEyMi4xMTI2NjQgOTUzLjk4ODQ2bDgxNi4zNzExNzItNDA3Ljk1NDMxOWMwLjcyMzQ3Ny0wLjM0MjgwOCAxLjQxMTEzOS0wLjY4OTcwOCAyLjA5OTgyNC0xLjA1MTk1OWwxLjEwNzIxNy0wLjU1MDUzOSAwLTAuMDc3NzcxYzExLjY0NDIwMS02Ljc1NzkxNCAxOS40ODg4NjctMTkuMzc3MzI2IDE5LjQ4ODg2Ny0zMy44Mjc0MzMgMC0xNC40NTIxNTMtNy44NDQ2NjUtMjcuMDcwNTQyLTE5LjQ4ODg2Ny0zMy44Mjg0NTZsMC0wLjIyODE5N0wxMjAuMjQxMDM3IDY1Ljk1NTE1NGMtMS4xNDUwOC0wLjY0OTc5OS0yLjMxMDYyNS0xLjI0MTI3LTMuNTEzMDEtMS43NzY0NmwtMi40ODE1MTgtMS4yNDAyNDctMC4yMzAyNDQgMC4xNzA4OTJjLTQuMDQ3MTc2LTEuNDMxNjA1LTguNDE4NzQtMi4xOTYwMTUtMTIuOTYyMjItMi4xOTYwMTUtMjEuNTg5NzE0IDAtMzkuMDk2NDM3IDE3LjUwNjcyMi0zOS4wOTY0MzcgMzkuMDk2NDM3IDAgMC4xOTIzODIgMCAwLjM4MjcxNyAwIDAuNTkzNTE4bDAgODIxLjI3NjkwMiAwLjAxODQyIDBjMC40Mzg5OTggMjEuMjEwMDY4IDE3Ljc1NDM2MyAzOC4yNTUyNzkgMzkuMDc4MDE3IDM4LjI1NTI3OUMxMDguODA1NTkgOTYwLjEzNTQ2IDExNi4wNDAzNjUgOTU3Ljg4NzI1NiAxMjIuMTEyNjY0IDk1My45ODg0NnoiIHAtaWQ9IjE4MzkiIGZpbGw9IiNmZmZmZmYiPjwvcGF0aD48L3N2Zz4="

/***/ }),
/* 19 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

var _dom = __webpack_require__(1);

var _base = __webpack_require__(2);

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Volume 配置
 */

var defaultOption = {
  html: '\n    <vision-volume-state>\n      <vision-volume-state-mute></vision-volume-state-mute>\n      <vision-volume-state-low></vision-volume-state-low>\n      <vision-volume-state-high></vision-volume-state-high>\n    </vision-volume-state>\n    <vision-volume-bar>\n      <vision-volume-bar-bg></vision-volume-bar-bg>\n      <vision-volume-bar-all></vision-volume-bar-all>\n    </vision-volume-bar>\n  ',
  defaultEvent: {
    click: 'click',
    mousedown: 'mousedown',
    mouseenter: 'mouseenter',
    mouseleave: 'mouseleave'
  }
};

var Volume = function (_Base) {
  _inherits(Volume, _Base);

  function Volume(parent, option) {
    _classCallCheck(this, Volume);

    var _this = _possibleConstructorReturn(this, _Base.call(this, parent));

    _this.tag = 'vision-volume';
    _this.parent.preVolume = 0;
    _this.option = (0, _utils.deepAssign)(defaultOption, (0, _utils.isObject)(option) ? option : {});
    _this.init();
    return _this;
  }

  Volume.prototype.allReady = function allReady() {
    this.update();
  };

  Volume.prototype.init = function init() {
    _Base.prototype.create.call(this);
    this.$state = (0, _dom.$)('vision-volume-state', this.$dom);
    this.$bar = (0, _dom.$)('vision-volume-bar', this.$dom);
    this.$all = (0, _dom.$)('vision-volume-bar-all', this.$dom);
    this.$bg = (0, _dom.$)('vision-volume-bar-bg', this.$dom);
    (0, _dom.addClassName)(this.$dom, 'flex-item flex-item-1');
  };

  Volume.prototype.changeState = function changeState() {
    if (this.parent.volume === 0) {
      this.state = 'mute';
    } else if (this.parent.volume > 0 && this.parent.volume <= 0.5) {
      this.state = 'low';
    } else if (this.parent.volume > 0.5 && this.parent.volume <= 1) {
      this.state = 'high';
    }
    (0, _dom.removeClassName)(this.$dom, 'mute low high');
    (0, _dom.addClassName)(this.$dom, this.state);
  };

  Volume.prototype.click = function click(e) {
    if (e.path.indexOf(this.$state[0]) !== -1) {
      this.stateClick(e);
    } else if (e.path.indexOf(this.$bar[0]) !== -1) {
      this.barClick(e);
    }
  };

  Volume.prototype.stateClick = function stateClick() {
    var currentVolume = this.parent.volume;
    this.parent.volume = currentVolume === 0 ? this.parent.preVolume : 0;
    this.parent.preVolume = currentVolume;
    this.changeState();
  };

  Volume.prototype.barClick = function barClick(e) {
    var volume = e.layerX / this.$bg[0].offsetWidth;
    this.parent.volume = volume < 0 ? 0 : volume > 1 ? 1 : volume;
    this.update();
  };

  Volume.prototype.mousedown = function mousedown(e) {
    this.startX = e.clientX;
    this.startVolume = this.parent.volume;
    (0, _dom.addEvent)(window, 'mousemove', this.trans('draging'));
    (0, _dom.addEvent)(window, 'mouseup', this.trans('dragEnd'));
    (0, _dom.addEvent)(window, 'contextmenu', this.trans('dragEnd'));
    (0, _dom.removeEvent)(this.parent.$dom, 'volumechange', this.trans('update'));
    (0, _dom.removeEvent)(this.$dom, 'mouseenter', this.trans('mouseenter'));
    (0, _dom.removeEvent)(this.$dom, 'mouseleave', this.trans('mouseleave'));
  };

  Volume.prototype.update = function update() {
    this.changeState();
    this.$all.css('width', this.parent.volume * 100 + '%');
  };

  /**
   * 开始拖拽
   * @param {EventObject} e 鼠标事件
   */


  Volume.prototype.draging = function draging(e) {
    this.endX = e.clientX;
    var dragVolume = (this.endX - this.startX) / this.$dom.offsetWidth;
    var dragAfterVolume = (this.startVolume + dragVolume).toFixed(2);
    this.parent.volume = dragAfterVolume < 0 ? 0 : dragAfterVolume > 1 ? 1 : dragAfterVolume;
    this.update();
  };

  /**
   * 结束拖拽
   */


  Volume.prototype.dragEnd = function dragEnd() {
    this.startX = 0;
    this.startTime = 0;
    (0, _dom.removeEvent)(window, 'mousemove', this.trans('draging'));
    (0, _dom.removeEvent)(window, 'mouseup', this.trans('dragEnd'));
    (0, _dom.removeEvent)(window, 'contextmenu', this.trans('dragEnd'));
    (0, _dom.addEvent)(this.parent.$dom, 'volumechange', this.trans('update'));
    (0, _dom.addEvent)(this.$dom, 'mouseenter', this.trans('mouseenter'));
    (0, _dom.addEvent)(this.$dom, 'mouseleave', this.trans('mouseleave'));
  };

  Volume.prototype.mouseenter = function mouseenter() {
    (0, _dom.addClassName)(this.$dom, 'flex-item-3');
    (0, _dom.removeClassName)(this.$dom, 'flex-item-1');
    this.$bar.css('display', 'inline-block');
    this.$state.css('width', '30%');
  };

  Volume.prototype.mouseleave = function mouseleave() {
    (0, _dom.addClassName)(this.$dom, 'flex-item-1');
    (0, _dom.removeClassName)(this.$dom, 'flex-item-3');
    this.$state.css('width', '100%');
    this.$bar.css('display', 'none');
  };

  return Volume;
}(_base2.default);

exports.default = Volume;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNDkyMTYxOTQ4OTM2IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE0MzIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIxOC40OTU4MjggMzM0LjYwOTg3MWMtMC4zOTA5MDMtMC4wMTk0NDMtMC43NzM2MTktMC4wMTk0NDMtMS4xNjQ1MjItMC4wMTk0NDNMMTAwLjAyMjU1MyAzMzQuNTkwNDI4Yy0yMS43NDQyMzMgMC0zOS4wODcyMjcgMTcuNDQ4Mzk0LTM5LjA4NzIyNyAzOS4wMDEyNjlsMCAyNzMuODY2NDE1YzAgMjEuNTUxODUyIDE3LjUwNTY5OSAzOC45OTkyMjMgMzkuMDg3MjI3IDM4Ljk5OTIyM2wxMTcuMzA4NzUzIDBjMC4wNTczMDUgMCAwLjExMzU4NyAwIDAuMTcxOTE1IDBsMCAwLjE1MzQ5NiAyODcuMjIwNTYgMTg1Ljk3NTY2OGM2LjgyNDQyOSA1Ljg0MjA1NSAxNS42OTEzNzcgOS4zNTQwNDIgMjUuMzcwODMxIDkuMzU0MDQyIDIxLjU5MDczNyAwIDM5LjA5NjQzNy0xNy41MDU2OTkgMzkuMDk2NDM3LTM5LjA5NTQxMyAwLTEuNzk0ODc5LTAuMTI0ODQzLTMuNTUxODk2LTAuMzU0MDY0LTUuMjcwMDI3TDU2OC44MzY5ODUgMTgzLjQ3MzY4NWMwLjIyOTIyMS0xLjcxODEzMSAwLjM1NDA2NC0zLjQ3NTE0OCAwLjM1NDA2NC01LjI2OTAwNCAwLTIxLjU5MDczNy0xNy41MDU2OTktMzkuMDk2NDM3LTM5LjA5NjQzNy0zOS4wOTY0MzctOC44OTU2MDEgMC0xNy4xMDU1ODYgMi45Nzc4MjEtMjMuNjgyMzc1IDcuOTc5NzQyTDIxOC40OTU4MjggMzM0LjYwOTg3MXoiIHAtaWQ9IjE0MzMiIGZpbGw9IiNmZmZmZmYiPjwvcGF0aD48cGF0aCBkPSJNNzU3Ljg1ODAxMiA5NTMuNDkxMTMzbDAuMDg1OTU4IDAuMDc1NzI1YzEyMy44NzYzMzItMTA3LjUxNDY4OSAyMDIuMjExNDQ1LTI2Ni4xMzMyOSAyMDIuMjExNDQ1LTQ0My4wNDE0NDIgMC0xNzcuMjE0MTIxLTc4LjYwMzIxOS0zMzYuMDYyOTY1LTIwMi44NTEwMTEtNDQzLjYxNjU0bC0wLjExNDYxIDAuMTE0NjFjLTQuOTYzMDM1LTMuODE3OTU1LTExLjE3NjU1LTYuMTA5MTM4LTE3LjkyNTI1NS02LjEwOTEzOC0xNi4xOTc5MTQgMC0yOS4zMjI4MzkgMTMuMTMzMTEyLTI5LjMyMjgzOSAyOS4zMjE4MTYgMCA2Ljc1NzkxNCAyLjI4MDk1IDEyLjk4MTY2MiA2LjEwOTEzOCAxNy45MjYyNzhsLTAuMzMzNTk4IDAuMzQyODA4YzAuODIxNzE1IDAuNzA2MDgxIDEuNjQxMzgzIDEuMzkzNzQzIDIuNDYyMDc1IDIuMTE5MjY3IDEuMTczNzMyIDEuMjAyMzg1IDIuNDUyODY1IDIuMzI5MDQ1IDMuODE3OTU1IDMuMzIxNjUyIDExMC4wNTQ1MzUgOTYuNzEwNjIyIDE3OS41MTM0OSAyMzguNTUwMDcxIDE3OS41MTM0OSAzOTYuNTc4MjI0IDAgMTU4LjAyNzEzLTY5LjQ1ODk1NSAyOTkuODY2NTc4LTE3OS41MTM0OSAzOTYuNTc3MjAxLTEuMzY1MDkgMC45OTM2My0yLjY0NDIyMyAyLjExODI0NC0zLjgxNzk1NSAzLjMyMTY1Mi0wLjYwMDY4MSAwLjUzMzE0My0xLjIxMjYxOCAxLjA0ODg4OS0xLjgyMjUwOCAxLjU2NDYzNWwwLjIyOTIyMSAwLjIzMDI0NGMtNC4xNTI1NzcgNS4wNTgyMDMtNi42NDMzMDQgMTEuNTMwNjE0LTYuNjQzMzA0IDE4LjU5MzQ3NCAwIDE2LjE4ODcwNCAxMy4xMjQ5MjUgMjkuMzIxODE2IDI5LjMyMjgzOSAyOS4zMjE4MTZDNzQ2LjMxNzE2NSA5NjAuMTM0NDM3IDc1Mi43OTg3ODYgOTU3LjY1MTg5NiA3NTcuODU4MDEyIDk1My40OTExMzN6IiBwLWlkPSIxNDM0IiBmaWxsPSIjZmZmZmZmIj48L3BhdGg+PHBhdGggZD0iTTcxMy45OTgwODUgNzI5LjM1NDMzbDAuMjM4NDMgMC4yNDc2NGM1NS4zODAzMDgtNTYuNDMwMjIgODkuNTMyMTI5LTEzMy43NjQ1NCA4OS41MzIxMjktMjE5LjA3NzU3NyAwLTg1LjQwOTIyOS0zNC4yMjg1NjktMTYyLjgwMDg1My04OS43MDQwNDUtMjE5LjI0OTQ5M2wtMC4yNjgxMDYgMC4yNjcwODNjLTQuODg2Mjg3LTMuNjQ2MDQtMTAuOTY2NzczLTUuODIxNTg5LTE3LjU0MzU2MS01LjgyMTU4OS0xNi4xOTc5MTQgMC0yOS4zMjI4MzkgMTMuMTMzMTEyLTI5LjMyMjgzOSAyOS4zMjE4MTYgMCA2LjU2NjU1NiAyLjE2NjMzOSAxMi42NTcyNzQgNS44MjI2MTIgMTcuNTQ0NTg1bC0wLjE2MjcwNiAwLjE3MDg5MmMwLjc3MzYxOSAwLjc4MjgyOSAxLjU0NzIzOSAxLjU4NDA3OCAyLjMxMDYyNSAyLjM4NjM1IDAuMDc1NzI1IDAuMDc2NzQ4IDAuMTUyNDczIDAuMTcxOTE1IDAuMjM4NDMgMC4yNDg2NjMgNDMuMzYyNiA0NS41ODcyNjggNjkuOTgzOTExIDEwNy4yNDg2MjkgNjkuOTgzOTExIDE3NS4xMzI3MTYgMCA2Ny44ODQwODctMjYuNjIxMzExIDEyOS41NDQ0MjUtNjkuOTgzOTExIDE3NS4xMzE2OTMtMC4wODU5NTggMC4wNzc3NzEtMC4xNjI3MDYgMC4xNzE5MTUtMC4yMzg0MyAwLjI0NzY0LTAuNzA2MDgxIDAuNzQ1OTktMS40MjIzOTYgMS40NzE1MTQtMi4xMzg3MSAyLjIxNDQzNWwwLjE0NDI4NiAwLjEzNDA1M2MtMy43NTE0NDEgNC45MjYxOTYtNS45NzYxMDggMTEuMDkyNjM5LTUuOTc2MTA4IDE3Ljc1NDM2MyAwIDE2LjE4ODcwNCAxMy4xMjQ5MjUgMjkuMzIxODE2IDI5LjMyMjgzOSAyOS4zMjE4MTZDNzAyLjkyNTkxMiA3MzUuMzI4MzkxIDcwOS4wNzI5MTMgNzMzLjExMzk1NyA3MTMuOTk4MDg1IDcyOS4zNTQzM3oiIHAtaWQ9IjE0MzUiIGZpbGw9IiNmZmZmZmYiPjwvcGF0aD48L3N2Zz4="

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNDkyMTYyMDIxNDU3IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIwNDAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTI5OS43MzcxMyAzMDQuNDM3Njg3Yy0zLjg0NzYzMS0zLjcyMTc2NS05LjEzNzEwMS02LjA2NDExMy0xNC45NzA5Ny02LjA2NDExM0w5NC42Njk2MzggMjk4LjM3MzU3NWMtMTIuMDg1MjQ2IDAtMjEuNTEzOTkgOS40OTIxODgtMjEuNTEzOTkgMjEuMjQyODEzTDczLjE1NTY0OCA3MDUuMzMxMTkzYzAgMTEuNDk5OTE1IDkuNjM4NTIxIDIxLjI0MzgzNyAyMS41MTM5OSAyMS4yNDM4MzdsMTkwLjA5NzU0NiAwYzUuMDU5MjI2IDAgOS42NTg5ODctMS42NzMxMDYgMTMuMjk3ODY0LTQuNDc0OTE4TDY0Ny4zOTgyNDggOTYwLjYxOTQ4NGwwLTMuMDA5NTQ0YzEuOTIzODE2IDIuNjc1OTQ2IDUuMDU5MjI2IDQuNDcyODcxIDguNjE0MTkyIDQuNDcyODcxIDUuNjY2MDQ2IDAgMTAuNTc5OTYzLTQuODA4NTE2IDEwLjU3OTk2My0xMC43NDY3NjJsMC04NzcuNzY2NDc0YzAtNS44OTYyOS00Ljc0NzExNy0xMC43MDU4MjktMTAuNTc5OTYzLTEwLjcwNTgyOS0zLjE3NzM2NiAwLTYuMTI1NTExIDEuNTA2MzA3LTguMTEyNzcyIDMuODQ3NjMxTDI5OS43MzcxMyAzMDQuNDM3Njg3ek04NTUuMTAwNzU0IDI0NS43Mjc1NDFjLTE3LjY2NzM4MiAxLjgzOTkwNS0zMC40NjM4MjYgMTcuNTIxMDQ5LTI4LjY0NDM4NyAzNC45NTgxODYgMC4xNjc4MjIgMS41ODkxOTUgMC41NjQ4NjUgMy4wNTI1MjIgMC45NjE5MDggNC41MTU4NWwxLjQyMTM3MiA0LjIyMzE4NS0wLjA4Mjg4OCAwLjEyNTg2N2MyNy4zNDc4NTggNTYuOTk1MDg1IDQ1Ljg3MTc0NyAxMTkuMzAyMTUzIDUyLjg1NTgxMiAxODUuNjY0NTgzIDkuNjE3MDMyIDkxLjM2OTk4Ny0zLjM4ODE2NyAxNzkuODUxMTgxLTMzLjk5NzMwMiAyNjAuMzkwNDk1bDAuMDQxOTU2IDAuMDQxOTU2LTAuNjY5MjQyIDIuMzQwMzAxIDAuNjY5MjQyIDAuMjUxNzMzYy0wLjA0MTk1NiAwLjA4MzkxMS0wLjA0MTk1NiAwLjE2NzgyMi0wLjA4MzkxMSAwLjIwOTc3OGwtMC43MTAxNzUgMC0xLjY3MzEwNiA1LjgxMjM3OS0xLjY1MTYxNiA1LjgxMjM3OWMtMC44MTU1NzUgMi44NDM3NjgtMC42MjcyODcgOC4xOTY2ODMtMC42NDg3NzYgOC4yODA1OTRsMC4zMzQ2MjEgMi42MzM5OWMxLjgzOTkwNSAxNy40NzgwNyAxOC4wODU5MTQgMjcuNzIzNDEyIDM1LjczMTgwNiAyNS44ODQ1MyA3LjY1MzMwNy0wLjc5NTEwOSAxNC40NDgwNi00LjUxNjg3NCAxOS41Mjg3NzUtOS44Mjc4MzMgMC4wNjM0NDUtMC4wNDE5NTYgMC4xMDU0MDEtMC4xNjc4MjIgMC4xNDYzMzMtMC4yMDk3NzggMC43NTMxNTMtMC43OTMwNjIgMS4yMTM2NDEtMS44ODA4MzcgMS44ODE4Ni0yLjc1OTg1NyAzLjI2MjMtNS42ODY1MTMgNy4yNTUyNDEtMTYuNjg1MDA4IDcuMjU1MjQxLTE2LjY4NTAwOCAzMy42NDIyMTUtODkuMTA5NTA0IDQ4LjIzNTU4NC0xODcuMzM2NjY2IDM3LjYxNDY4OS0yODguMjgxNzI5LTcuNjUzMzA3LTcyLjkyNzk2My0yNy40NzM3MjUtMTQxLjkyNDM4My01Ny4zMjk3MDYtMjA0LjY5MDkxNmwtMC4zNzY1NzcgMC4xNjc4MjJDODgyLjIzODgzNCAyNTIuMjUwMDk0IDg2OS4zMTg1NyAyNDQuMjIxMjM0IDg1NS4xMDA3NTQgMjQ1LjcyNzU0MXoiIHAtaWQ9IjIwNDEiIGZpbGw9IiNmZmZmZmYiPjwvcGF0aD48L3N2Zz4="

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNDkyMTYyMDAyOTYzIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE2MzYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTIyNS42ODA0NjEgMzI2LjU5ODQwNmMtMC40MTk1NTYtMC4wMTk0NDMtMC44MTg2NDUtMC4wMTk0NDMtMS4yMzcxNzctMC4wMTk0NDNMMTAxLjgxMjMxNSAzMjYuNTc4OTYzYy0yMi43NTMyMTMgMC00MC44NzY5ODkgMTguMjQyNDgtNDAuODc2OTg5IDQwLjc3NzcyOWwwIDI4Ni4zMzY0MjRjMCAyMi41MzQyMjYgMTguMzAyODU1IDQwLjc3NzcyOSA0MC44NzY5ODkgNDAuNzc3NzI5bDEyMi42Mjk5NDUgMGMwLjA3OTgxOCAwIDAuMTE5NzI3IDAgMC4xOTg1MjEgMGwwIDAuMTU3NTg5IDMwMC4yODkyMDQgMTk0LjQ0NDU1MWM3LjEyNTI4MSA2LjEwODExNSAxNi40MDU2NDUgOS43ODE3ODQgMjYuNTI2MTQzIDkuNzgxNzg0IDIyLjU3MzExMSAwIDQwLjg3NDk0My0xOC4zMDE4MzEgNDAuODc0OTQzLTQwLjg3ODAxMyAwLTEuODc1NzItMC4xMTk3MjctMy43MTE1MzItMC4zNjAyMDQtNS41MDk0ODFMNTkxLjk3MDg2OCAxNjguNTgxNTFjMC4yMzk0NTQtMS43OTU5MDIgMC4zNjAyMDQtMy42MzI3MzcgMC4zNjAyMDQtNS41MDk0ODEgMC0yMi41NzQxMzUtMTguMzAyODU1LTQwLjg3Njk4OS00MC44NzQ5NDMtNDAuODc2OTg5LTkuMzAxODUzIDAtMTcuODg0MzIyIDMuMTEzOTIxLTI0Ljc1MDcwNyA4LjM0MzAxNUwyMjUuNjgwNDYxIDMyNi41OTg0MDZ6TTg1OS41Njc0ODUgNTEwLjUyNDM5Mmw5MS45NTIyNDgtOTEuOTUxMjI1YzExLjQ5NTgyMi0xMS41MTczMTEgMTEuNTc2NjYzLTMwLjU1ODk5My0wLjEzOTE3LTQyLjI3NDgyNi0xMS43OTU2NTEtMTEuNzk1NjUxLTMwLjYzNjc2NC0xMS43NTU3NDItNDIuMjczODAyLTAuMTQwMTkzbC05MS45NTMyNzIgOTEuOTUzMjcyLTkxLjk1MDIwMi05MS45NTMyNzJjLTExLjYzOTA4NS0xMS42MTY1NzItMzAuNDc5MTc1LTExLjY1NTQ1OC00Mi4yNzU4NDkgMC4xNDAxOTMtMTEuNzE1ODMzIDExLjcxNTgzMy0xMS42MzM5NjggMzAuNzU3NTE0LTAuMTM5MTcgNDIuMjc0ODI2bDkxLjk1MjI0OCA5MS45NTEyMjUtOTEuOTUyMjQ4IDkxLjk1MzI3MmMtMTEuNDk0Nzk5IDExLjUxNTI2NS0xMS41NzY2NjMgMzAuNTU2OTQ2IDAuMTM5MTcgNDIuMjcyNzc5IDExLjc5NjY3NCAxMS43OTY2NzQgMzAuNjM2NzY0IDExLjc1Njc2NSA0Mi4yNzU4NDkgMC4xNDAxOTNsOTEuOTUwMjAyLTkxLjk1MTIyNSA5MS45NTMyNzIgOTEuOTUxMjI1YzExLjYzNjAxNSAxMS42MTc1OTUgMzAuNDc3MTI5IDExLjY1NzUwNCA0Mi4yNzM4MDItMC4xNDAxOTMgMTEuNzE1ODMzLTExLjcxNDgwOSAxMS42MzQ5OTEtMzAuNzU3NTE0IDAuMTM5MTctNDIuMjcyNzc5TDg1OS41Njc0ODUgNTEwLjUyNDM5MnoiIHAtaWQ9IjE2MzciIGZpbGw9IiNmZmZmZmYiPjwvcGF0aD48L3N2Zz4="

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

var _dom = __webpack_require__(1);

var _base = __webpack_require__(2);

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Screen 配置
 */

var defaultOption = {
  html: '\n    <vision-screen-full></vision-screen-full>\n    <vision-screen-small></vision-screen-small>\n  ',
  defaultEvent: {
    click: 'click'
  }
};

var Screen = function (_Base) {
  _inherits(Screen, _Base);

  function Screen(parent, option) {
    _classCallCheck(this, Screen);

    var _this = _possibleConstructorReturn(this, _Base.call(this, parent));

    _this.tag = 'vision-screen';
    _this.state = 'small';
    _this.option = (0, _utils.deepAssign)(defaultOption, (0, _utils.isObject)(option) ? option : {});
    _this.init();
    return _this;
  }

  Screen.prototype.init = function init() {
    _Base.prototype.create.call(this);
    this.changeState(this.state);
    (0, _dom.addClassName)(this.$dom, 'flex-item');
  };

  Screen.prototype.changeState = function changeState(state) {
    var removeState = state === 'small' ? 'full' : 'small';
    (0, _dom.addClassName)(this.parent.$dom, state);
    (0, _dom.removeClassName)(this.parent.$dom, removeState);
  };

  Screen.prototype.click = function click() {
    this.state = this.state === 'small' ? 'full' : 'small';
    this.changeState(this.state);
    this.screenChange();
  };

  Screen.prototype.screenChange = function screenChange() {
    // 辨认 用户浏览器是那种 webkit moz ms
    this.screenAPI = '';
    if (document.webkitCancelFullScreen) {
      this.screenAPI = ['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitFullscreenElement'];
    } else if (document.mozCancelFullScreen) {
      this.screenAPI = ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozfullscreenchange', 'mozFullScreenElement'];
    } else if (document.msExitFullscreen) {
      this.screenAPI = ['msRequestFullscreen', 'msExitFullscreen', 'msfullscreenchange', 'msFullscreenElement'];
    } else if (document.exitFullscreen) {
      this.screenAPI = ['requestFullScreen', 'exitFullscreen', 'fullscreenchange', 'fullscreenElement'];
    }
    if (this.state === 'full') {
      // this.enlargeScreen();
    } else {
        // this.narrowScreen();
      }
  };

  return Screen;
}(_base2.default);

exports.default = Screen;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNDkwMDg3MjIyNjAyIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQyOTkiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTQ0OCA1NTQuNjY2NjY3Yy02LjQgMC0xMC42NjY2NjcgMi4xMzMzMzMtMTQuOTMzMzMzIDYuNEw4NS4zMzMzMzMgOTA4LjggODUuMzMzMzMzIDY2MS4zMzMzMzNjMC0xMi44LTguNTMzMzMzLTIxLjMzMzMzMy0yMS4zMzMzMzMtMjEuMzMzMzMzcy0yMS4zMzMzMzMgOC41MzMzMzMtMjEuMzMzMzMzIDIxLjMzMzMzM2wwIDI5OC42NjY2NjdjMCAxMi44IDguNTMzMzMzIDIxLjMzMzMzMyAyMS4zMzMzMzMgMjEuMzMzMzMzbDI5OC42NjY2NjcgMGMxMi44IDAgMjEuMzMzMzMzLTguNTMzMzMzIDIxLjMzMzMzMy0yMS4zMzMzMzMgMC0xMi44LTguNTMzMzMzLTIxLjMzMzMzMy0yMS4zMzMzMzMtMjEuMzMzMzMzTDExNS4yIDkzOC42NjY2NjdsMzQ3LjczMzMzMy0zNDcuNzMzMzMzYzQuMjY2NjY3LTQuMjY2NjY3IDYuNC04LjUzMzMzMyA2LjQtMTQuOTMzMzMzQzQ2OS4zMzMzMzMgNTYzLjIgNDYwLjggNTU0LjY2NjY2NyA0NDggNTU0LjY2NjY2N3pNOTYwIDQyLjY2NjY2NyA2NjEuMzMzMzMzIDQyLjY2NjY2N2MtMTIuOCAwLTIxLjMzMzMzMyA4LjUzMzMzMy0yMS4zMzMzMzMgMjEuMzMzMzMzIDAgMTIuOCA4LjUzMzMzMyAyMS4zMzMzMzMgMjEuMzMzMzMzIDIxLjMzMzMzM2wyNDcuNDY2NjY3IDBMNTYxLjA2NjY2NyA0MzMuMDY2NjY3QzU1Ni44IDQzNy4zMzMzMzMgNTU0LjY2NjY2NyA0NDEuNiA1NTQuNjY2NjY3IDQ0OGMwIDEyLjggOC41MzMzMzMgMjEuMzMzMzMzIDIxLjMzMzMzMyAyMS4zMzMzMzMgNi40IDAgMTAuNjY2NjY3LTIuMTMzMzMzIDE0LjkzMzMzMy02LjRMOTM4LjY2NjY2NyAxMTUuMiA5MzguNjY2NjY3IDM2Mi42NjY2NjdjMCAxMi44IDguNTMzMzMzIDIxLjMzMzMzMyAyMS4zMzMzMzMgMjEuMzMzMzMzczIxLjMzMzMzMy04LjUzMzMzMyAyMS4zMzMzMzMtMjEuMzMzMzMzTDk4MS4zMzMzMzMgNjRDOTgxLjMzMzMzMyA1MS4yIDk3Mi44IDQyLjY2NjY2NyA5NjAgNDIuNjY2NjY3eiIgcC1pZD0iNDMwMCIgZmlsbD0iI2ZmZmZmZiI+PC9wYXRoPjwvc3ZnPg=="

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNDkwMDg3MjQ1MTYyIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ3NTUiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTQ0OCA1NTQuNjY2NjY3IDE0OS4zMzMzMzMgNTU0LjY2NjY2N2MtMTIuOCAwLTIxLjMzMzMzMyA4LjUzMzMzMy0yMS4zMzMzMzMgMjEuMzMzMzMzIDAgMTIuOCA4LjUzMzMzMyAyMS4zMzMzMzMgMjEuMzMzMzMzIDIxLjMzMzMzM2wyNDcuNDY2NjY3IDBMNDkuMDY2NjY3IDk0NS4wNjY2NjdDNDQuOCA5NDkuMzMzMzMzIDQyLjY2NjY2NyA5NTMuNiA0Mi42NjY2NjcgOTYwYzAgMTIuOCA4LjUzMzMzMyAyMS4zMzMzMzMgMjEuMzMzMzMzIDIxLjMzMzMzMyA2LjQgMCAxMC42NjY2NjctMi4xMzMzMzMgMTQuOTMzMzMzLTYuNEw0MjYuNjY2NjY3IDYyNy4yIDQyNi42NjY2NjcgODc0LjY2NjY2N2MwIDEyLjggOC41MzMzMzMgMjEuMzMzMzMzIDIxLjMzMzMzMyAyMS4zMzMzMzNzMjEuMzMzMzMzLTguNTMzMzMzIDIxLjMzMzMzMy0yMS4zMzMzMzNMNDY5LjMzMzMzMyA1NzZDNDY5LjMzMzMzMyA1NjMuMiA0NjAuOCA1NTQuNjY2NjY3IDQ0OCA1NTQuNjY2NjY3ek05ODEuMzMzMzMzIDY0YzAtMTIuOC04LjUzMzMzMy0yMS4zMzMzMzMtMjEuMzMzMzMzLTIxLjMzMzMzMy02LjQgMC0xMC42NjY2NjcgMi4xMzMzMzMtMTQuOTMzMzMzIDYuNEw1OTcuMzMzMzMzIDM5Ni44IDU5Ny4zMzMzMzMgMTQ5LjMzMzMzM2MwLTEyLjgtOC41MzMzMzMtMjEuMzMzMzMzLTIxLjMzMzMzMy0yMS4zMzMzMzNzLTIxLjMzMzMzMyA4LjUzMzMzMy0yMS4zMzMzMzMgMjEuMzMzMzMzbDAgMjk4LjY2NjY2N2MwIDEyLjggOC41MzMzMzMgMjEuMzMzMzMzIDIxLjMzMzMzMyAyMS4zMzMzMzNsMjk4LjY2NjY2NyAwYzEyLjggMCAyMS4zMzMzMzMtOC41MzMzMzMgMjEuMzMzMzMzLTIxLjMzMzMzM3MtOC41MzMzMzMtMjEuMzMzMzMzLTIxLjMzMzMzMy0yMS4zMzMzMzNMNjI3LjIgNDI2LjY2NjY2NyA5NzQuOTMzMzMzIDc4LjkzMzMzM0M5NzkuMiA3NC42NjY2NjcgOTgxLjMzMzMzMyA3MC40IDk4MS4zMzMzMzMgNjR6IiBwLWlkPSI0NzU2IiBmaWxsPSIjZmZmZmZmIj48L3BhdGg+PC9zdmc+"

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

var _dom = __webpack_require__(1);

var _base = __webpack_require__(2);

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * progressTime 配置
 */

var defaultOption = {
  html: '\n    <vision-progresstime-pass>00:00</vision-progresstime-pass>\n    <vision-progresstime-total>\n      <span>/</span>\n      <vision-progresstime-total-value>00:00</vision-progresstime-total-value>\n    </vision-progresstime-total>\n  ',
  defaultEvent: {}
};

var ProgressTime = function (_Base) {
  _inherits(ProgressTime, _Base);

  function ProgressTime(parent, option) {
    _classCallCheck(this, ProgressTime);

    var _this = _possibleConstructorReturn(this, _Base.call(this, parent));

    _this.tag = 'vision-progresstime';
    _this.option = (0, _utils.deepAssign)(defaultOption, (0, _utils.isObject)(option) ? option : {});
    _this.init();
    return _this;
  }

  ProgressTime.prototype.init = function init() {
    _Base.prototype.create.call(this);
    this.$total = (0, _dom.$)('vision-progresstime-total-value', this.$dom);
    this.$pass = (0, _dom.$)('vision-progresstime-pass', this.$dom);
    (0, _dom.addClassName)(this.$dom, 'flex-item flex-item-3');
  };

  ProgressTime.prototype.updatePass = function updatePass() {
    this.$pass.text((0, _utils.formatTime)(this.parent.currentTime));
  };

  ProgressTime.prototype.updateTotal = function updateTotal() {
    this.$total.text((0, _utils.formatTime)(this.parent.duration));
  };

  return ProgressTime;
}(_base2.default);

exports.default = ProgressTime;

/***/ })
/******/ ]);
//# sourceMappingURL=control.js.map