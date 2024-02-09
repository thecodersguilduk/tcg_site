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
/* harmony import */ var _modules_expression_interest__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @modules/expression-interest */ "./resources/js/modules/expression-interest/index.js");
/* harmony import */ var _modules_course_cta_header__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @modules/course-cta-header */ "./resources/js/modules/course-cta-header/index.js");
/* harmony import */ var _modules_course_apply_validation__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @modules/course-apply-validation */ "./resources/js/modules/course-apply-validation/index.js");
/* harmony import */ var _modules_stripe__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @modules/stripe */ "./resources/js/modules/stripe/index.js");
// Import local modules
















/***/ }),

/***/ "./resources/js/modules/course-apply-validation/index.js":
/*!***************************************************************!*\
  !*** ./resources/js/modules/course-apply-validation/index.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @utilities/selectors */ "./resources/js/utilities/selectors/index.js");

var courseApplyValidation = function courseApplyValidation() {
  if (!_utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].courseApply) return;
  var submitBtn = _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].applyBtnSubmit;
  var form = document.forms.namedItem('courseApply');
  form.addEventListener('change', function (e) {
    var input = e.target.closest('.form-input-field') || e.target.closest('.form-checkbox');
    if (!input) return;
    if (input.type === 'radio' || input.type === 'checkbox') {
      input = form.querySelectorAll("input[name='".concat(input.name, "']"));
      input.forEach(function (item) {
        item.setAttribute('data-valid', true);
      });
    } else {
      input.value !== '' ? input.setAttribute('data-valid', true) : input.setAttribute('data-valid', false);
    }
    var invalidInputs = this.querySelectorAll('[data-valid="false"]');
    if (submitBtn) {
      submitBtn.disabled = invalidInputs.length > 0 ? true : false;
    }
  });
}();
/* harmony default export */ __webpack_exports__["default"] = (courseApplyValidation);

/***/ }),

/***/ "./resources/js/modules/course-cta-header/index.js":
/*!*********************************************************!*\
  !*** ./resources/js/modules/course-cta-header/index.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @utilities/selectors */ "./resources/js/utilities/selectors/index.js");

var courseCTAHeader = function courseCTAHeader() {
  var coursePage = document.getElementById('course');
  if (!coursePage) return;
  var header = _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].header;
  document.addEventListener('scroll', function (e) {
    var scroll = window.scrollY;
    if (scroll > 125) {
      header.style.height = '0';
      header.style.overflow = 'hidden';
    } else {
      header.style.height = 'unset';
      header.style.overflow = 'unset';
    }
  });
}();
/* harmony default export */ __webpack_exports__["default"] = (courseCTAHeader);

/***/ }),

/***/ "./resources/js/modules/expression-interest/index.js":
/*!***********************************************************!*\
  !*** ./resources/js/modules/expression-interest/index.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @utilities/selectors */ "./resources/js/utilities/selectors/index.js");

var expressionInterest = function expressionInterest() {
  if (!_utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].expressionInterestForm) return;
  var content = document.getElementById("content");
  var hasBeenOpened = false;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !hasBeenOpened) {
        _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].expressionInterestForm.classList.add("modal--active");
        hasBeenOpened = true;
      }
    });
  });
  observer.observe(content);
}();
/* harmony default export */ __webpack_exports__["default"] = (expressionInterest);

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
      if (_utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].submitBtn) {
        _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].submitBtn.disabled = invalidInputs.length > 0 ? true : false;
      } else {
        _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].applyFormSubmit.disabled = invalidInputs.length > 0 ? true : false;
      }
    });
    // Attach keyup event to a contact form
    _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].contactForm.addEventListener('keyup', function (e) {
      // Get the input element
      input = e.target.closest('.form-input-field');
      // If event occured somewhere else than on input field - return;
      if (!input) return;

      // Check if input element has a sibling element with data-message attribute attached
      if (messageExists(input, 'data-message')) {
        errorContainer = input.nextElementSibling;
        errorMessage = input.nextElementSibling.getAttribute('data-message');
      }

      // In input field has data-regex attribute
      if (input.hasAttribute('data-regex')) {
        // Assign the value to regex variable
        regex = RegExp(input.getAttribute('data-regex'));

        // Compare user input with provided regex
        if (regex.test(input.value)) {
          // If user input matches regex - check if it has data-valid attr, and change the attribute value, so the input becomes 'valid'
          input.hasAttribute('data-valid') ? input.setAttribute('data-valid', 'true') : null;

          // Check if input contains specified class, if so - remove it
          input.classList.contains('form-input-field--invalid') ? input.classList.remove('form-input-field--invalid') : null;

          // Check if current input element has errorContainer and errorMessage attached
          if (errorContainer && errorContainer) {
            // Change text content to be empty and hide the element itself
            errorContainer.textContent === errorMessage ? errorContainer.textContent = null : null;
            errorContainer.setAttribute('aria-hidden', 'false');
          }

          // Check if event key is navigation key, if so - do nothing
        } else if (!input.value && e.which === 9 || e.which === 8 || e.which >= 37 && e.which <= 40) {
          return;

          // Check if current input is email field, if so - break of the function
        } else if (input === _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].emailInput) {
          return;

          // If none of the specified above conditions are met:
        } else {
          // If input has data-valid attr - make it hold invlaid state
          input.hasAttribute('data-valid') ? input.setAttribute('data-valid', 'false') : null;

          // If input doesn't contain invalid input class - attach it to the existing class list, if not - do nothing
          input.classList.contains('form-input-field--invalid') ? null : input.classList.add('form-input-field--invalid');

          // Check if current input element has errorContainer and errorMessage attached
          if (errorContainer && errorContainer) {
            // If so - display error message and make element visible
            errorContainer.textContent === errorMessage ? null : errorContainer.textContent = errorMessage;
            errorContainer.setAttribute('aria-hidden', 'true');
          }
        }
      }

      // Keeps track of 'invalid' input fields
      invalidInputs = this.querySelectorAll('[data-valid="false"]');
      // If there are no invalid input fields - make button available, else - disable it

      if (_utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].submitBtn) {
        _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].submitBtn.disabled = invalidInputs.length > 0 ? true : false;
      } else {
        _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].applyFormSubmit.disabled = invalidInputs.length > 0 ? true : false;
      }
    });

    // Attach focusout event to a contact form (can't use 'blur' event, because it doesn't bubble)
    _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].contactForm.addEventListener('focusout', function (e) {
      input = e.target.closest('.form-input-field');
      //console.log(input.value);
      if (!input) return;
      if (messageExists(input, 'data-message')) {
        errorContainer = e.target.nextElementSibling;
        errorMessage = e.target.nextElementSibling.getAttribute('data-message');
      }
      if (!input.hasAttribute('data-regex') && input.type !== 'textarea') {
        if (input.value !== '') {
          input.setAttribute('data-valid', true);
        }
      }

      // Check if input, where event occured - has no value and contains a required class
      if (!input.value && input.classList.contains('required')) {
        // If it does - append red border
        input.classList.contains('border-red-100') ? null : input.classList.add('border-red-100');

        // Show 'Required' pop-up on the top of the form
        _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].requiredPopUp.classList.contains('hidden') ? _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].requiredPopUp.classList.remove('hidden') : null;
      } else {
        // Else - remove red border
        input.classList.contains('border-red-100') ? input.classList.remove('border-red-100') : null;
      }

      // Check if current input is the email field, not empty and has a data-regex attribute
      if (input === _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].emailInput && input.hasAttribute('data-regex') && input.value) {
        // Assign and convert data-regex value into a regular expression
        regex = RegExp(input.getAttribute('data-regex'));

        // Compare input value with provided regex
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
      if (_utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].submitBtn) {
        _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].submitBtn.disabled = invalidInputs.length > 0 ? true : false;
      } else {
        _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].applyFormSubmit.disabled = invalidInputs.length > 0 ? true : false;
      }
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
      img.src = src;
      // img.srcset = srcset

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
    if (childEl.classList) {
      if (childEl.classList.contains(className)) {
        child = childEl;
      }
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

/***/ "./resources/js/modules/stripe/index.js":
/*!**********************************************!*\
  !*** ./resources/js/modules/stripe/index.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @utilities/selectors */ "./resources/js/utilities/selectors/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var stripe = function () {
  if (!_utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].stripeCheckoutBtn) return;
  _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].stripeCheckoutBtn.addEventListener('click', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
      var title, price, response, data;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            e.preventDefault();
            title = this.getAttribute('data-course-title');
            price = this.getAttribute('data-price');
            _context.next = 5;
            return fetch('/.netlify/functions/stripeHandler', {
              method: 'POST',
              body: JSON.stringify({
                title: title,
                price: price
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            });
          case 5:
            response = _context.sent;
            _context.next = 8;
            return response.json();
          case 8:
            data = _context.sent;
            window.location.href = data.checkoutUrl;
          case 10:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
}();
/* harmony default export */ __webpack_exports__["default"] = (stripe);

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
  var navlinks = document.getElementById('nav-links');
  var mobileNav = document.getElementById('mobile-nav');
  navlinks.addEventListener('click', toggleSubMenu);
  mobileNav.addEventListener('click', toggleSubMenu);
  function toggleSubMenu(e) {
    var target = e.target;
    if (target.nodeName.toLowerCase() === 'li') {
      //now open thesubmenu of the li just clicked on
      var currentSubMenu = target.querySelector('.submenu');
      if (currentSubMenu.classList.contains('block')) {
        currentSubMenu.classList.remove('block');
        currentSubMenu.classList.add('hidden');
      } else {
        currentSubMenu.classList.remove('hidden');
        currentSubMenu.classList.add('block');
      }

      //close all the submenus
      var submenus = document.querySelectorAll('.submenu');
      submenus.forEach(function (menu) {
        console.log(menu.parentElement);
        if (menu.classList.contains('block') && target.innerText.toLowerCase() !== menu.parentElement.innerText.toLowerCase()) {
          // console.log('were here');
          menu.classList.remove('block');
          menu.classList.add('hidden');
          // console.log(menu.classList);
        }
      });
      currentSubMenu.addEventListener('mouseleave', function (e) {
        currentSubMenu.classList.remove('block');
        currentSubMenu.classList.add('hidden');
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
}();

// const filterOptions = document.querySelector('.filterOptions')
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
  courseApply: document.getElementById('courseApply'),
  applyBtnSubmit: document.getElementById('apply-btn-submit'),
  body: document.querySelector('body'),
  wrapper: document.getElementById('wrapper'),
  header: document.getElementById('header'),
  courseCTAHeader: document.getElementById('cours-cta-header'),
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
  expressionInterestForm: document.getElementById('expression-of-interest'),
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
  submenu: document.querySelector('.submenu'),
  stripeCheckoutBtn: document.getElementById('buy-now-btn')
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

__webpack_require__(/*! /home/steve/tcg_site/resources/js/main.js */"./resources/js/main.js");
module.exports = __webpack_require__(/*! /home/steve/tcg_site/resources/sass/main.scss */"./resources/sass/main.scss");


/***/ })

/******/ });