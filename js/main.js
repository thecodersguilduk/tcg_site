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
    var angle = btn.querySelector('.fas');
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
    var input, regex, invalidInputs, errorMessage, errorContainer; // Attach keyup event to a contact form

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

      _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].submitBtn.disabled = invalidInputs.length ? true : false;
    }); // Attach focusout event to a contact form (can't use 'blur' event, because it doesn't bubble)

    _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].contactForm.addEventListener('focusout', function (e) {
      input = e.target.closest('.form-input-field');
      if (!input) return;

      if (messageExists(input, 'data-message')) {
        errorContainer = e.target.nextElementSibling;
        errorMessage = e.target.nextElementSibling.getAttribute('data-message');
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
      _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__["default"].submitBtn.disabled = invalidInputs.length ? true : false;
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
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @utilities/selectors */ "./resources/js/utilities/selectors/index.js");

$('.testimonials__slider').slick({
  dots: true,
  prevArrow: $('.prev'),
  nextArrow: $('.next'),
  appendDots: $('.dots'),
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1
});

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
  faqSection: document.querySelector('.faq')
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

/***/ 0:
/*!***************************************************************!*\
  !*** multi ./resources/js/main.js ./resources/sass/main.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/jurate/Desktop/tcg_site/resources/js/main.js */"./resources/js/main.js");
module.exports = __webpack_require__(/*! /Users/jurate/Desktop/tcg_site/resources/sass/main.scss */"./resources/sass/main.scss");


/***/ })

/******/ });