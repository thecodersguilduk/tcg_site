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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/dotenv/lib/main.js":
/*!*****************************************!*\
  !*** ./node_modules/dotenv/lib/main.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/* @flow */
/*::

type DotenvParseOptions = {
  debug?: boolean
}

// keys and values from src
type DotenvParseOutput = { [string]: string }

type DotenvConfigOptions = {
  path?: string, // path to .env file
  encoding?: string, // encoding of .env file
  debug?: string // turn on logging for debugging purposes
}

type DotenvConfigOutput = {
  parsed?: DotenvParseOutput,
  error?: Error
}

*/

const fs = __webpack_require__(/*! fs */ "./node_modules/node-libs-browser/mock/empty.js")
const path = __webpack_require__(/*! path */ "./node_modules/path-browserify/index.js")

function log (message /*: string */) {
  console.log(`[dotenv][DEBUG] ${message}`)
}

const NEWLINE = '\n'
const RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/
const RE_NEWLINES = /\\n/g
const NEWLINES_MATCH = /\n|\r|\r\n/

// Parses src into an Object
function parse (src /*: string | Buffer */, options /*: ?DotenvParseOptions */) /*: DotenvParseOutput */ {
  const debug = Boolean(options && options.debug)
  const obj = {}

  // convert Buffers before splitting into lines and processing
  src.toString().split(NEWLINES_MATCH).forEach(function (line, idx) {
    // matching "KEY' and 'VAL' in 'KEY=VAL'
    const keyValueArr = line.match(RE_INI_KEY_VAL)
    // matched?
    if (keyValueArr != null) {
      const key = keyValueArr[1]
      // default undefined or missing values to empty string
      let val = (keyValueArr[2] || '')
      const end = val.length - 1
      const isDoubleQuoted = val[0] === '"' && val[end] === '"'
      const isSingleQuoted = val[0] === "'" && val[end] === "'"

      // if single or double quoted, remove quotes
      if (isSingleQuoted || isDoubleQuoted) {
        val = val.substring(1, end)

        // if double quoted, expand newlines
        if (isDoubleQuoted) {
          val = val.replace(RE_NEWLINES, NEWLINE)
        }
      } else {
        // remove surrounding whitespace
        val = val.trim()
      }

      obj[key] = val
    } else if (debug) {
      log(`did not match key and value when parsing line ${idx + 1}: ${line}`)
    }
  })

  return obj
}

// Populates process.env from .env file
function config (options /*: ?DotenvConfigOptions */) /*: DotenvConfigOutput */ {
  let dotenvPath = path.resolve(process.cwd(), '.env')
  let encoding /*: string */ = 'utf8'
  let debug = false

  if (options) {
    if (options.path != null) {
      dotenvPath = options.path
    }
    if (options.encoding != null) {
      encoding = options.encoding
    }
    if (options.debug != null) {
      debug = true
    }
  }

  try {
    // specifying an encoding returns a string instead of a buffer
    const parsed = parse(fs.readFileSync(dotenvPath, { encoding }), { debug })

    Object.keys(parsed).forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
        process.env[key] = parsed[key]
      } else if (debug) {
        log(`"${key}" is already defined in \`process.env\` and will not be overwritten`)
      }
    })

    return { parsed }
  } catch (e) {
    return { error: e }
  }
}

module.exports.config = config
module.exports.parse = parse

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/node-libs-browser/mock/empty.js":
/*!******************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/empty.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/path-browserify/index.js":
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./resources/js/main.js":
/*!******************************!*\
  !*** ./resources/js/main.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_mobile_nav__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @modules/mobile-nav */ "./resources/js/modules/mobile-nav/index.js");
/* harmony import */ var _modules_lazyload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @modules/lazyload */ "./resources/js/modules/lazyload/index.js");
/* harmony import */ var _modules_show_hide__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @modules/show-hide */ "./resources/js/modules/show-hide/index.js");
/* harmony import */ var _modules_header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @modules/header */ "./resources/js/modules/header/index.js");
/* harmony import */ var _modules_header__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_modules_header__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _modules_form_validating__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @modules/form-validating */ "./resources/js/modules/form-validating/index.js");
/* harmony import */ var _modules_load_posts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @modules/load-posts */ "./resources/js/modules/load-posts/index.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @modules/slider */ "./resources/js/modules/slider/index.js");
/* harmony import */ var _modules_faqs_accordion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @modules/faqs-accordion */ "./resources/js/modules/faqs-accordion/index.js");
/* harmony import */ var _modules_modals__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @modules/modals */ "./resources/js/modules/modals/index.js");
/* harmony import */ var _modules_vacancy_filters__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @modules/vacancy-filters */ "./resources/js/modules/vacancy-filters/index.js");
/* harmony import */ var _modules_submenu__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @modules/submenu */ "./resources/js/modules/submenu/index.js");
// Import local modules












/***/ }),

/***/ "./resources/js/modules/faqs-accordion/index.js":
/*!******************************************************!*\
  !*** ./resources/js/modules/faqs-accordion/index.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @utilities/selectors */ "./resources/js/utilities/selectors/index.js");


var faqAccordion = function faqAccordion() {
  if (!_utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].faqSection) return;
  _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].faqSection.addEventListener('click', function (e) {
    var btn = e.target.closest('.faq-btn');
    if (!btn) return;
    var content = btn.nextElementSibling;
    var angle = btn.querySelector('.svg-inline--fa');
    btn.classList.contains('faq-btn--active') ? btn.classList.remove('faq-btn--active') : btn.classList.add('faq-btn--active');

    if (content.style.maxHeight) {
      angle.classList.add('fa-angle-down');
      angle.classList.remove('fa-angle-up');
      content.style.maxHeight = null;
    } else {
      angle.classList.remove('fa-angle-down');
      angle.classList.add('fa-angle-up');
      content.style.maxHeight = "".concat(content.scrollHeight, "px");
    }
  });
}();

/* harmony default export */ __webpack_exports__["default"] = (faqAccordion);

/***/ }),

/***/ "./resources/js/modules/form-validating/index.js":
/*!*******************************************************!*\
  !*** ./resources/js/modules/form-validating/index.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @utilities/selectors */ "./resources/js/utilities/selectors/index.js");


function messageExists(el, attr) {
  return el.nextElementSibling && el.nextElementSibling.getAttribute(attr) ? true : false;
}

var validateForm = function validateForm() {
  if (_utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].contactForm) {
    var input, regex, invalidInputs, errorMessage, errorContainer;
    _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].contactForm.addEventListener('change', function (e) {
      input = e.target.closest('.form-checkbox');
      if (!input) return;

      if (input.value !== '') {
        input.setAttribute('data-valid', true);
      } else {
        input.setAttribute('data-valid', false);
      }

      invalidInputs = this.querySelectorAll('[data-valid="false"]');
      console.log(invalidInputs.length);
      _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].applyFormSubmit.disabled = invalidInputs.length > 0 ? true : false;
    }); // Attach keyup event to a contact form

    _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].contactForm.addEventListener('keyup', function (e) {
      // Get the input element
      input = e.target.closest('.form-input-field'); // If event occured somewhere else than on input field - return;

      if (!input) return; // Check if input element has a sibling element with data-message attribute attached

      if (messageExists(input, 'data-message')) {
        errorContainer = input.nextElementSibling;
        errorMessage = input.nextElementSibling.getAttribute('data-message');
      } // In input field has data-regex attribute


      if (input.hasAttribute('data-regex')) {
        // Assign the value to regex variable
        regex = RegExp(input.getAttribute('data-regex')); // Compare user input with provided regex

        if (regex.test(input.value)) {
          // If user input matches regex - check if it has data-valid attr, and change the attribute value, so the input becomes 'valid'
          input.hasAttribute('data-valid') ? input.setAttribute('data-valid', 'true') : null; // Check if input contains specified class, if so - remove it

          input.classList.contains('form-input-field--invalid') ? input.classList.remove('form-input-field--invalid') : null; // Check if current input element has errorContainer and errorMessage attached

          if (errorContainer && errorContainer) {
            // Change text content to be empty and hide the element itself
            errorContainer.textContent === errorMessage ? errorContainer.textContent = null : null;
            errorContainer.setAttribute('aria-hidden', 'false');
          } // Check if event key is navigation key, if so - do nothing

        } else if (!input.value && e.which === 9 || e.which === 8 || e.which >= 37 && e.which <= 40) {
          return; // Check if current input is email field, if so - break of the function
        } else if (input === _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].emailInput) {
          return; // If none of the specified above conditions are met:
        } else {
          // If input has data-valid attr - make it hold invlaid state
          input.hasAttribute('data-valid') ? input.setAttribute('data-valid', 'false') : null; // If input doesn't contain invalid input class - attach it to the existing class list, if not - do nothing

          input.classList.contains('form-input-field--invalid') ? null : input.classList.add('form-input-field--invalid'); // Check if current input element has errorContainer and errorMessage attached

          if (errorContainer && errorContainer) {
            // If so - display error message and make element visible
            errorContainer.textContent === errorMessage ? null : errorContainer.textContent = errorMessage;
            errorContainer.setAttribute('aria-hidden', 'true');
          }
        }
      } // Keeps track of 'invalid' input fields


      invalidInputs = this.querySelectorAll('[data-valid="false"]'); // If there are no invalid input fields - make button available, else - disable it

      console.log(invalidInputs.length);
      _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].applyFormSubmit.disabled = invalidInputs.length > 0 ? true : false;
    }); // Attach focusout event to a contact form (can't use 'blur' event, because it doesn't bubble)

    _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].contactForm.addEventListener('focusout', function (e) {
      input = e.target.closest('.form-input-field');
      if (!input) return;

      if (messageExists(input, 'data-message')) {
        errorContainer = e.target.nextElementSibling;
        errorMessage = e.target.nextElementSibling.getAttribute('data-message');
      }

      if (!input.hasAttribute('data-regex') && input.type !== 'textarea') {
        if (input.value !== '') {
          input.setAttribute('data-valid', true);
        }
      } // Check if input, where event occured - has no value and contains a required class


      if (!input.value && input.classList.contains('required')) {
        // If it does - append red border
        input.classList.contains('border-red-100') ? null : input.classList.add('border-red-100'); // Show 'Required' pop-up on the top of the form

        _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].requiredPopUp.classList.contains('hidden') ? _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].requiredPopUp.classList.remove('hidden') : null;
      } else {
        // Else - remove red border
        input.classList.contains('border-red-100') ? input.classList.remove('border-red-100') : null;
      } // Check if current input is the email field, not empty and has a data-regex attribute


      if (input === _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].emailInput && input.hasAttribute('data-regex') && input.value) {
        // Assign and convert data-regex value into a regular expression
        regex = RegExp(input.getAttribute('data-regex')); // Compare input value with provided regex

        if (!regex.test(e.target.value)) {
          input.classList.contains('form-input-field--invalid') ? null : input.classList.add('form-input-field--invalid');

          if (errorContainer && errorContainer) {
            errorContainer.textContent === errorMessage ? null : errorContainer.textContent = errorMessage;
            errorContainer.setAttribute('aria-hidden', 'false');
          }
        }
      }

      invalidInputs = this.querySelectorAll('[data-valid="false"]');
      console.log(invalidInputs.length);
      _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].applyFormSubmit.disabled = invalidInputs.length > 0 ? true : false;
    });
  } else {
    return;
  }
}();

/* harmony default export */ __webpack_exports__["default"] = (validateForm);

/***/ }),

/***/ "./resources/js/modules/header/index.js":
/*!**********************************************!*\
  !*** ./resources/js/modules/header/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// import $$ from '@utilities/selectors';
// const headerScroll = function headerScroll() {
//   window.addEventListener('scroll', function() {
//     if ( window.scrollY > 0 ) {
//       $$.header.classList.add('bg-white', 'border-grey-100', 'border-b-2');
//     } else {
//       $$.header.classList.remove('bg-white', 'border-grey-100', 'border-b-2');
//     }
//   });
// }();
// export default headerScroll;

/***/ }),

/***/ "./resources/js/modules/lazyload/index.js":
/*!************************************************!*\
  !*** ./resources/js/modules/lazyload/index.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @utilities/selectors */ "./resources/js/utilities/selectors/index.js");
/* harmony import */ var _utilities_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @utilities/helpers */ "./resources/js/utilities/helpers/index.js");



var Lazyload = function Lazyload() {
  // lazyload our images
  var images = _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].wrapper.querySelectorAll('[data-lazy]');

  if (Object(_utilities_helpers__WEBPACK_IMPORTED_MODULE_1__["exists"])(images)) {
    // options
    var options = {
      threshold: 0.5
    };

    var preloadImage = function preloadImage(img) {
      // find and store the image's data-lazy attribute
      // commented out for now, but if you want to go the extra mile, then you can do all the srcset attribute stuff on the images ;)
      // const srcset = img.dataset.srcset
      var src = img.dataset.lazy;
      img.src = src; // img.srcset = srcset
      // add a class of loaded
      // we can then use this as a hook for fade-in animations etc

      img.classList.add('loaded');
    };

    var lazyLoad = new IntersectionObserver(function (entries, lazyLoad) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          preloadImage(entry.target);
          lazyLoad.unobserve(entry.target);
        }
      });
    }, options);
    images.forEach(function (image) {
      lazyLoad.observe(image);
    });
  }
}();

/* harmony default export */ __webpack_exports__["default"] = (Lazyload);

/***/ }),

/***/ "./resources/js/modules/load-posts/index.js":
/*!**************************************************!*\
  !*** ./resources/js/modules/load-posts/index.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @utilities/selectors */ "./resources/js/utilities/selectors/index.js");


function displayEl(el, attr, hiddenClass) {
  el.classList.contains(hiddenClass) ? el.classList.remove(hiddenClass) : null;
  el.hasAttribute(attr) ? el.setAttribute(attr, 'false') : null;
}

var loadMorePosts = function loadMorePosts() {
  var maxItems = 9,
      hiddenClass = 'hidden',
      blogPostsArray = Array.from(_utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].blogPostList),
      attr = 'aria-hidden';

  if (!_utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].postContainer) {
    return;
  }

  blogPostsArray.splice(0, maxItems).forEach(function (el) {
    displayEl(el, attr, hiddenClass);
  });
  _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].loadMoreBtn.addEventListener('click', function () {
    blogPostsArray.splice(0, maxItems).forEach(function (el) {
      displayEl(el, attr, hiddenClass);
    });
    displayEl(_utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].scrollTopBtn, attr, hiddenClass);

    if (!blogPostsArray.length) {
      this.classList.add(hiddenClass);
      this.setAttribute(attr, true);
    }
  });
  _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].scrollTopBtn.addEventListener('click', function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
}();

/* harmony default export */ __webpack_exports__["default"] = (loadMorePosts);

/***/ }),

/***/ "./resources/js/modules/mobile-nav/index.js":
/*!**************************************************!*\
  !*** ./resources/js/modules/mobile-nav/index.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @utilities/selectors */ "./resources/js/utilities/selectors/index.js");


var mobileNav = function mobileNav() {
  _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].navToggle.addEventListener('click', function (e) {
    this.classList.toggle('burger-active');
    _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].mobileNavContainer.classList.toggle('opacity-0');
  });
}();

/* harmony default export */ __webpack_exports__["default"] = (mobileNav);

/***/ }),

/***/ "./resources/js/modules/modals/index.js":
/*!**********************************************!*\
  !*** ./resources/js/modules/modals/index.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @utilities/selectors */ "./resources/js/utilities/selectors/index.js");


var displayModal = function displayModal() {
  var btn, dataAttr, modal;
  document.addEventListener('click', function (e) {
    btn = e.target.closest('[data-modal]');

    if (!btn) {
      return;
    }

    e.preventDefault();
    dataAttr = btn.hasAttribute('data-modal') ? btn.getAttribute('data-modal') : null;

    if (!dataAttr) {
      return;
    }

    modal = document.querySelector("#".concat(dataAttr));

    if (!modal) {
      return;
    }

    modal.classList.toggle('modal--active');
  });
}();

/* harmony default export */ __webpack_exports__["default"] = (displayModal);

/***/ }),

/***/ "./resources/js/modules/show-hide/index.js":
/*!*************************************************!*\
  !*** ./resources/js/modules/show-hide/index.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @utilities/selectors */ "./resources/js/utilities/selectors/index.js");


function getChildren(parent, className) {
  var child;

  if (!parent || !className || !parent.childNodes.length) {
    console.log("Please check if all correct arguments are provided for loopThroughChildren() function!");
    return;
  }

  var children = Array.from(parent.childNodes);
  children.map(function (childEl) {
    if (childEl.classList.contains(className)) {
      child = childEl;
    }
  });
  return child;
}

var ShowHide = function ShowHide() {
  var parentNode, content, iconUp, iconDown;
  _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].toggleShowHide.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      parentNode = this.parentNode;
      content = getChildren(parentNode, 'footer-dropdown-content');
      if (!content) return;
      iconDown = getChildren(this, 'fa-angle-down');
      iconUp = getChildren(this, 'fa-angle-up');
      content.maxHeight = content.scrollHeight;

      if (!content.style.maxHeight) {
        iconDown.classList.remove('fa-angle-down');
        iconDown.classList.add('fa-angle-up');
        content.classList.remove('opacity-0');
        content.style.maxHeight = "".concat(content.maxHeight, "px");
      } else {
        iconUp.classList.add('fa-angle-down');
        iconUp.classList.remove('fa-angle-up');
        content.classList.add('opacity-0');
        content.style.maxHeight = null;
      }
    });
  });
}();

/* harmony default export */ __webpack_exports__["default"] = (ShowHide);

/***/ }),

/***/ "./resources/js/modules/slider/index.js":
/*!**********************************************!*\
  !*** ./resources/js/modules/slider/index.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @utilities/selectors */ "./resources/js/utilities/selectors/index.js");


var sliderSettings = function () {
  var slick = document.querySelector('.testimonials__slider');
  if (!slick) return;
  return $('.testimonials__slider').slick({
    dots: true,
    prevArrow: $('.prev'),
    nextArrow: $('.next'),
    appendDots: $('.dots'),
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
  });
}();

/* harmony default export */ __webpack_exports__["default"] = (sliderSettings);

/***/ }),

/***/ "./resources/js/modules/submenu/index.js":
/*!***********************************************!*\
  !*** ./resources/js/modules/submenu/index.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @utilities/selectors */ "./resources/js/utilities/selectors/index.js");


var submenu = function submenu() {
  //   if (!$$.submenu) return;
  var navlinks = document.getElementById('nav-links');
  var mobileNav = document.getElementById('mobile-nav');
  navlinks.addEventListener('click', toggleSubMenu);
  mobileNav.addEventListener('click', toggleSubMenu);

  function toggleSubMenu(e) {
    var target = e.target;
    console.log(target.tagName);

    if (e.target.classList.contains('parent')) {
      e.preventDefault();
      var menu = target.querySelector('.submenu');
      menu.classList.toggle('hidden');
      menu.classList.toggle('block');
      menu.addEventListener('mouseleave', function (e) {
        menu.classList.add('hidden');
      });
    }

    if (target.tagName === 'path') {
      var _menu = target.parentElement.parentElement.querySelector('.submenu');

      _menu.classList.toggle('hidden');

      _menu.classList.toggle('block');

      _menu.addEventListener('mouseleave', function (e) {
        _menu.classList.add('hidden');
      });
    }

    if (target.tagName === 'svg') {
      var _menu2 = target.parentElement.querySelector('.submenu');

      _menu2.classList.toggle('hidden');

      _menu2.classList.toggle('block');

      _menu2.addEventListener('mouseleave', function (e) {
        _menu2.classList.add('hidden');
      });
    }
  }
}();

/* harmony default export */ __webpack_exports__["default"] = (submenu);

/***/ }),

/***/ "./resources/js/modules/vacancy-filters/index.js":
/*!*******************************************************!*\
  !*** ./resources/js/modules/vacancy-filters/index.js ***!
  \*******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @utilities/selectors */ "./resources/js/utilities/selectors/index.js");
/* harmony import */ var _site_globals_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../site/globals/config */ "./site/globals/config.js");
/* harmony import */ var _site_globals_config__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_site_globals_config__WEBPACK_IMPORTED_MODULE_1__);
__webpack_require__(/*! dotenv */ "./node_modules/dotenv/lib/main.js").config();




var vacancyFilters = function vacancyFilters() {
  if (!_utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].vacancies) return;
  var url = "https://".concat(_site_globals_config__WEBPACK_IMPORTED_MODULE_1___default.a.PROJECTID, ".api.sanity.io/v").concat(_site_globals_config__WEBPACK_IMPORTED_MODULE_1___default.a.apiVersion, "/<path>");
  console.log(_site_globals_config__WEBPACK_IMPORTED_MODULE_1___default.a);
}(); // const filterOptions = document.querySelector('.filterOptions')
// const resetIcon = document.querySelector('.resetIcon')
// const singleAd = Array.from(document.querySelectorAll('.singleAd'))
// const sortSelect = document.querySelector('.sort')
// const gridIcon = document.querySelector('.gridView')
// const listIcon = document.querySelector('.listView')
// const noresults = document.querySelector('.no-results')
// //const url = `https://${process.env.PROJECTID}.api.sanity.io/v${process.env.API_VERSION}/<path>`
// listIcon.addEventListener('click', toggleGrid)
// gridIcon.addEventListener('click', toggleGrid)
// filterOptions.addEventListener('change', e => {
//   //filter options is the container div for all the checkboxes.the event listener listens for any change, check/uncheck
//     if(e.target.classList.contains('location')){
//       let selectedLocation = join(e.target.value)
//         if(e.target.checked) {
//           locationArray.push(selectedLocation)
//         } else if (!e.target.checked){
//           let index = locationArray.indexOf(selectedLocation)
//           locationArray.splice(index, 1)
//         }
//     } else if(e.target.classList.contains('disability-confident-employer')){
//         let checkboxValue = join(e.target.value);
//         if(e.target.checked){
//         disabilityArray.push(checkboxValue)
//         } else if(!e.target.checked) {
//             let index = disabilityArray.indexOf(checkboxValue)
//             disabilityArray.splice(index, 1)
//         }
//     } else if(e.target.classList.contains('apprentince-standard')){
//         let checkboxValue = join(e.target.value);
//         if(e.target.checked){
//         standardArray.push(checkboxValue)
//         } else if(!e.target.checked) {
//             let index = standardArray.indexOf(checkboxValue)
//             standardArray.splice(index, 1)
//         }
//     }
//     singleAd.forEach(job => {
//       if(locationArray.length > 0 && disabilityArray.length > 0 && standardArray.length > 0){
//         ('triple array filter')
//         filtertriplearray(standardArray, disabilityArray, standardArray, job)
//       }
//       if(locationArray.length < 1 && disabilityArray.length > 0 && standardArray.length > 0){
//         ('double array filter')
//         filterdoublearray(disabilityArray, standardArray, job)
//       }
//       if(locationArray.length > 0 && disabilityArray.length < 1 && standardArray.length > 0){
//         ('double array filter')
//         filterdoublearray(locationArray, standardArray, job)
//       }
//       if(locationArray.length > 0 && disabilityArray.length > 0 && standardArray.length < 1){
//         ('double array filter')
//         filterdoublearray(locationArray, disabilityArray, job)
//       }
//       if(locationArray.length >= 1 && disabilityArray.length < 1 && standardArray.length < 1){
//         ('single array filter')
//         filterSingleArray(locationArray, job)
//       }
//       if(disabilityArray.length >= 1 && locationArray.length < 1 && standardArray.length < 1){
//         ('single array filter')
//         filterSingleArray(disabilityArray, job)
//       }
//       if(standardArray.length >= 1 && disabilityArray.length < 1 && locationArray.length < 1){
//         ('single array filter')
//         filterSingleArray(standardArray, job)
//       }
//       if(locationArray.length < 1 && disabilityArray.length < 1 && standardArray.length < 1){
//         reset()
//       }
//     })
// })
// resetIcon.addEventListener('click', reset);
// /* searchBar.addEventListener('keyup', e => {
// const searchString = e.target.value
// const jobs = document.querySelectorAll('.singleAd.flex');
//   jobs.forEach(job => {
//     if(!job.classList.includes(searchString)){
//       job.classList.add('hidden')
//       job.classList.remove('flex')
//     } else {
//       job.classList.add('flex')
//       job.classList.remove('hidden')
//     }
//   })
//   displayNumVacancies()
// }) */
// function toggleGrid(){
//   const jobs = document.querySelectorAll('.singleAd.flex')
//   const jobChildEl = jobs[0];
//   jobChildEl.parentNode.classList.toggle('flex-col')
//   jobChildEl.parentNode.classList.toggle('flex-row')
//   jobChildEl.parentNode.classList.toggle('flex-wrap')
//   jobs.forEach(job => {
//     job.classList.toggle('w-5/12')
//     job.classList.toggle('mx-auto')
//     job.firstElementChild.classList.toggle('h-full')
//   })
// }
// function filtertriplearray(arr1, arr2, arr3, el){
//     if(arr1.some(item=>Array.from(el.classList).includes(item)) && arr2.some(item=>Array.from(el.classList).includes(item)) && arr3.some(item=>Array.from(el.classList).includes(item))){
//       el.classList.remove('hidden')
//       el.classList.add('flex')
//     } else {
//       el.classList.add('hidden')
//       el.classList.remove('flex')
//     }
//     displayNumVacancies()
// }
// function filterdoublearray(arr1, arr2, el){
//     if(arr1.some(item=>Array.from(el.classList).includes(item)) && arr2.some(item=>Array.from(el.classList).includes(item))){
//       el.classList.remove('hidden')
//       el.classList.add('flex')
//     } else {
//       el.classList.add('hidden')
//       el.classList.remove('flex')
//     }
//     displayNumVacancies()
// }
// function filterSingleArray(arr, el){
//     if(arr.some(item=>Array.from(el.classList).includes(item))){
//     (arr, el)
//       el.classList.remove('hidden')
//       el.classList.add('flex')
//     } else {
//     (arr, el)
//       el.classList.add('hidden')
//       el.classList.remove('flex')
//     }
//     displayNumVacancies()
// }
// function join(string){
//     return string.replace(/\s+/g, '-').toLowerCase()
// }
// function reset(){
//   disabilityArray = []
//   locationArray = []
//   singleAd.forEach(ad => {
//     ad.classList.remove('hidden')
//     ad.classList.add('flex')
//   })
//   standardCheckbox.forEach(box => {
//     box.checked = false
//   })
//   locationCheckbox.forEach(box => {
//     box.checked = false
//   })
//   disabilityCheckbox.forEach(box => {
//     box.checked = false
//   })
//   displayNumVacancies()
// }
// function displayNumVacancies(){
//   const ads = document.querySelectorAll('.singleAd.flex');
//   const display = document.querySelector('.showing')
//   display.innerHTML = ads.length;
//   if(ads.length === 0){
//     noresults.classList.add('block')
//     noresults.classList.remove('hidden')
//   } else {
//     noresults.classList.remove('block')
//     noresults.classList.add('hidden')
//   }
// }
// displayNumVacancies()

/***/ }),

/***/ "./resources/js/utilities/helpers/index.js":
/*!*************************************************!*\
  !*** ./resources/js/utilities/helpers/index.js ***!
  \*************************************************/
/*! exports provided: page, exists */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "page", function() { return page; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exists", function() { return exists; });
/* harmony import */ var _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @utilities/selectors */ "./resources/js/utilities/selectors/index.js");

/**
 * @description Test if the body id is something
 * @param  		{string}
 * @return 		{bool}
 *
 */

var page = function page(name) {
  if (!name) {
    return _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].body.getAttribute('id');
  }

  return _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].body.getAttribute('id') == name;
};
/**
 * @description Check if element exists the page
 * @param  		{string} Element selector
 * @param  		{string} Minimum number of elements
 * @return 		{bool}
 */


var exists = function exists(el, limit) {
  return el.length > 0;
};



/***/ }),

/***/ "./resources/js/utilities/selectors/index.js":
/*!***************************************************!*\
  !*** ./resources/js/utilities/selectors/index.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_submenu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules/submenu */ "./resources/js/modules/submenu/index.js");

var $$ = {
  body: document.querySelector('body'),
  wrapper: document.getElementById('wrapper'),
  header: document.getElementById('header'),
  nav: document.getElementById('nav'),
  hero: document.getElementById('hero'),
  main: document.getElementById('main'),
  containerCentre: document.getElementById('container-centre'),
  containerRight: document.getElementById('container-right'),
  preFooter: document.getElementById('pre-footer'),
  footer: document.getElementById('footer'),
  navLinks: document.getElementById('nav-links'),
  navToggle: document.getElementById('nav-toggle'),
  mobileNavContainer: document.querySelector('.mobile-nav-container'),
  toggleShowHide: document.querySelectorAll('.toggle-show-hide'),
  contactForm: document.getElementById('contact-form'),
  applyFormSubmit: document.querySelector('.apply-form-submit'),
  inputFields: document.querySelectorAll('.form-input-field'),
  nameInput: document.getElementById('name'),
  emailInput: document.getElementById('email'),
  phoneNumberInput: document.getElementById('phone'),
  messageInput: document.getElementById('message'),
  formError: document.querySelectorAll('.form-error'),
  requiredFields: document.querySelectorAll('.required'),
  requiredPopUp: document.querySelector('.required-pop-up'),
  submitBtn: document.getElementById('submit'),
  regexInputs: document.querySelectorAll('[data-regex]'),
  postContainer: document.getElementById('posts-container'),
  blogPostList: document.querySelectorAll('[data-post]'),
  loadMoreBtn: document.getElementById('load-more'),
  scrollTopBtn: document.getElementById('scroll-top'),
  faqSection: document.querySelector('.faq'),
  vacancies: document.querySelector('.vacancies'),
  submenu: document.querySelector('.submenu')
};
/* harmony default export */ __webpack_exports__["default"] = ($$);

/***/ }),

/***/ "./resources/sass/main.scss":
/*!**********************************!*\
  !*** ./resources/sass/main.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./site/globals/config.js":
/*!********************************!*\
  !*** ./site/globals/config.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {__webpack_require__(/*! dotenv */ "./node_modules/dotenv/lib/main.js").config();

var config = {
  projectId: process.env.PROJECTID,
  dataset: process.env.DATASET,
  apiVersion: process.env.API_VERSION,
  token: process.env.TOKEN,
  //'sk5wgUiW1yj5HqoLWUNWucS0DuWdacfPBw83aFoFaAGJFnQL6wDRlSCJ5Xg1Nua5EHPqZ0UjC5N6gMmzKrYyXE9DbEFzJWagHQ20oSYclK9AxsjcmwbkzzzEWpJrvSO10xEevDS0AULCa9lfz8u22NM18R3sh0R84aTWCNq36kq1f5Pt8jra',
  useCdn: false
};
module.exports = config;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ 0:
/*!***************************************************************!*\
  !*** multi ./resources/js/main.js ./resources/sass/main.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/steve/codersguild/tcg_site/resources/js/main.js */"./resources/js/main.js");
module.exports = __webpack_require__(/*! /home/steve/codersguild/tcg_site/resources/sass/main.scss */"./resources/sass/main.scss");


/***/ })

/******/ });