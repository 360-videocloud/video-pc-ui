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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(2);

__webpack_require__(12);

var _ui = __webpack_require__(3);

var _ui2 = _interopRequireDefault(_ui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var visionUi = {
  name: 'visionUi',
  el: 'vision-ui',
  create: function create() {
    var config = (0, _utils.isObject)(this.$config) ? (0, _utils.deepAssign)(defaultConfig, this.$config) : defaultConfig;
    // this.$dom.classList.add('vision-ui');
    (0, _ui2.default)(this.$dom, config);
  },
  destroy: function destroy() {
    this.$dom.removeChild(this.button);
  },

  events: {
    pause: function pause() {},
    play: function play() {},
    load: function load() {}
  },
  methods: {}
};

window.vision_ui = visionUi;

/***/ }),
/* 1 */,
/* 2 */
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

/***/ }),
/* 3 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/yandeqiang/Desktop/git/video-pc-ui/src/ui.js'");

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/yandeqiang/Desktop/git/video-pc-ui/src/ui.css'");

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
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
	fixUrls = __webpack_require__(11);

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
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(10)(content, {"insertAt":"bottom"});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js??ref--1-1!../node_modules/postcss-loader/index.js??ref--1-2!./ui.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js??ref--1-1!../node_modules/postcss-loader/index.js??ref--1-2!./ui.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);