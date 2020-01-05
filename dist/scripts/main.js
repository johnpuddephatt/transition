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
/******/ 	__webpack_require__.p = "/app/themes/transition/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(12);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__barba_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__barba_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__barba_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__barba_css__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__barba_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__barba_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_Router__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__routes_common__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__routes_home__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__routes_project__ = __webpack_require__(11);
// import external dependencies
__webpack_require__(2);



// Import everything from autoload


// import local dependencies





/** Populate Router instance with DOM routes */
window.routes = new __WEBPACK_IMPORTED_MODULE_2__util_Router__["a" /* default */]({
  // All pages
  common: __WEBPACK_IMPORTED_MODULE_3__routes_common__["a" /* default */],
  // Home page
  home: __WEBPACK_IMPORTED_MODULE_4__routes_home__["a" /* default */],
  // Project pages
  singleProjects: __WEBPACK_IMPORTED_MODULE_5__routes_project__["a" /* default */],
});

// Load Events
document.addEventListener('DOMContentLoaded', function (){ return window.routes.loadEvents(); });

document.addEventListener('DOMContentLoaded', function () {
  var wipe = document.querySelector('.pageload--wipe circle');
  __WEBPACK_IMPORTED_MODULE_0__barba_core___default.a.use(__WEBPACK_IMPORTED_MODULE_1__barba_css___default.a);
  __WEBPACK_IMPORTED_MODULE_0__barba_core___default.a.init({
    debug: true,
    transitions: [{
      before: function before(e) {
        wipe.setAttribute('cx', e.trigger.offsetLeft);
        wipe.setAttribute('cy', e.trigger.offsetTop);
        wipe.setAttribute('class','triggered');
      },
      after: function after() {
        document.body.className = document.querySelector('main').dataset.barbaClass; // copy new classes onto body class
        console.log('after');
        wipe.removeAttribute('class');
        window.routes.loadEvents();
      },
    }],
  });
});


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the W3C SOFTWARE AND DOCUMENT NOTICE AND LICENSE.
 *
 *  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 */
(function() {
'use strict';

// Exit early if we're not running in a browser.
if (typeof window !== 'object') {
  return;
}

// Exit early if all IntersectionObserver and IntersectionObserverEntry
// features are natively supported.
if ('IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype) {

  // Minimal polyfill for Edge 15's lack of `isIntersecting`
  // See: https://github.com/w3c/IntersectionObserver/issues/211
  if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
    Object.defineProperty(window.IntersectionObserverEntry.prototype,
      'isIntersecting', {
      get: function () {
        return this.intersectionRatio > 0;
      }
    });
  }
  return;
}


/**
 * A local reference to the document.
 */
var document = window.document;


/**
 * An IntersectionObserver registry. This registry exists to hold a strong
 * reference to IntersectionObserver instances currently observing a target
 * element. Without this registry, instances without another reference may be
 * garbage collected.
 */
var registry = [];


/**
 * Creates the global IntersectionObserverEntry constructor.
 * https://w3c.github.io/IntersectionObserver/#intersection-observer-entry
 * @param {Object} entry A dictionary of instance properties.
 * @constructor
 */
function IntersectionObserverEntry(entry) {
  this.time = entry.time;
  this.target = entry.target;
  this.rootBounds = entry.rootBounds;
  this.boundingClientRect = entry.boundingClientRect;
  this.intersectionRect = entry.intersectionRect || getEmptyRect();
  this.isIntersecting = !!entry.intersectionRect;

  // Calculates the intersection ratio.
  var targetRect = this.boundingClientRect;
  var targetArea = targetRect.width * targetRect.height;
  var intersectionRect = this.intersectionRect;
  var intersectionArea = intersectionRect.width * intersectionRect.height;

  // Sets intersection ratio.
  if (targetArea) {
    // Round the intersection ratio to avoid floating point math issues:
    // https://github.com/w3c/IntersectionObserver/issues/324
    this.intersectionRatio = Number((intersectionArea / targetArea).toFixed(4));
  } else {
    // If area is zero and is intersecting, sets to 1, otherwise to 0
    this.intersectionRatio = this.isIntersecting ? 1 : 0;
  }
}


/**
 * Creates the global IntersectionObserver constructor.
 * https://w3c.github.io/IntersectionObserver/#intersection-observer-interface
 * @param {Function} callback The function to be invoked after intersection
 *     changes have queued. The function is not invoked if the queue has
 *     been emptied by calling the `takeRecords` method.
 * @param {Object=} opt_options Optional configuration options.
 * @constructor
 */
function IntersectionObserver(callback, opt_options) {

  var options = opt_options || {};

  if (typeof callback != 'function') {
    throw new Error('callback must be a function');
  }

  if (options.root && options.root.nodeType != 1) {
    throw new Error('root must be an Element');
  }

  // Binds and throttles `this._checkForIntersections`.
  this._checkForIntersections = throttle(
      this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);

  // Private properties.
  this._callback = callback;
  this._observationTargets = [];
  this._queuedEntries = [];
  this._rootMarginValues = this._parseRootMargin(options.rootMargin);

  // Public properties.
  this.thresholds = this._initThresholds(options.threshold);
  this.root = options.root || null;
  this.rootMargin = this._rootMarginValues.map(function(margin) {
    return margin.value + margin.unit;
  }).join(' ');
}


/**
 * The minimum interval within which the document will be checked for
 * intersection changes.
 */
IntersectionObserver.prototype.THROTTLE_TIMEOUT = 100;


/**
 * The frequency in which the polyfill polls for intersection changes.
 * this can be updated on a per instance basis and must be set prior to
 * calling `observe` on the first target.
 */
IntersectionObserver.prototype.POLL_INTERVAL = null;

/**
 * Use a mutation observer on the root element
 * to detect intersection changes.
 */
IntersectionObserver.prototype.USE_MUTATION_OBSERVER = true;


/**
 * Starts observing a target element for intersection changes based on
 * the thresholds values.
 * @param {Element} target The DOM element to observe.
 */
IntersectionObserver.prototype.observe = function(target) {
  var isTargetAlreadyObserved = this._observationTargets.some(function(item) {
    return item.element == target;
  });

  if (isTargetAlreadyObserved) {
    return;
  }

  if (!(target && target.nodeType == 1)) {
    throw new Error('target must be an Element');
  }

  this._registerInstance();
  this._observationTargets.push({element: target, entry: null});
  this._monitorIntersections();
  this._checkForIntersections();
};


/**
 * Stops observing a target element for intersection changes.
 * @param {Element} target The DOM element to observe.
 */
IntersectionObserver.prototype.unobserve = function(target) {
  this._observationTargets =
      this._observationTargets.filter(function(item) {

    return item.element != target;
  });
  if (!this._observationTargets.length) {
    this._unmonitorIntersections();
    this._unregisterInstance();
  }
};


/**
 * Stops observing all target elements for intersection changes.
 */
IntersectionObserver.prototype.disconnect = function() {
  this._observationTargets = [];
  this._unmonitorIntersections();
  this._unregisterInstance();
};


/**
 * Returns any queue entries that have not yet been reported to the
 * callback and clears the queue. This can be used in conjunction with the
 * callback to obtain the absolute most up-to-date intersection information.
 * @return {Array} The currently queued entries.
 */
IntersectionObserver.prototype.takeRecords = function() {
  var records = this._queuedEntries.slice();
  this._queuedEntries = [];
  return records;
};


/**
 * Accepts the threshold value from the user configuration object and
 * returns a sorted array of unique threshold values. If a value is not
 * between 0 and 1 and error is thrown.
 * @private
 * @param {Array|number=} opt_threshold An optional threshold value or
 *     a list of threshold values, defaulting to [0].
 * @return {Array} A sorted list of unique and valid threshold values.
 */
IntersectionObserver.prototype._initThresholds = function(opt_threshold) {
  var threshold = opt_threshold || [0];
  if (!Array.isArray(threshold)) threshold = [threshold];

  return threshold.sort().filter(function(t, i, a) {
    if (typeof t != 'number' || isNaN(t) || t < 0 || t > 1) {
      throw new Error('threshold must be a number between 0 and 1 inclusively');
    }
    return t !== a[i - 1];
  });
};


/**
 * Accepts the rootMargin value from the user configuration object
 * and returns an array of the four margin values as an object containing
 * the value and unit properties. If any of the values are not properly
 * formatted or use a unit other than px or %, and error is thrown.
 * @private
 * @param {string=} opt_rootMargin An optional rootMargin value,
 *     defaulting to '0px'.
 * @return {Array<Object>} An array of margin objects with the keys
 *     value and unit.
 */
IntersectionObserver.prototype._parseRootMargin = function(opt_rootMargin) {
  var marginString = opt_rootMargin || '0px';
  var margins = marginString.split(/\s+/).map(function(margin) {
    var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
    if (!parts) {
      throw new Error('rootMargin must be specified in pixels or percent');
    }
    return {value: parseFloat(parts[1]), unit: parts[2]};
  });

  // Handles shorthand.
  margins[1] = margins[1] || margins[0];
  margins[2] = margins[2] || margins[0];
  margins[3] = margins[3] || margins[1];

  return margins;
};


/**
 * Starts polling for intersection changes if the polling is not already
 * happening, and if the page's visibility state is visible.
 * @private
 */
IntersectionObserver.prototype._monitorIntersections = function() {
  if (!this._monitoringIntersections) {
    this._monitoringIntersections = true;

    // If a poll interval is set, use polling instead of listening to
    // resize and scroll events or DOM mutations.
    if (this.POLL_INTERVAL) {
      this._monitoringInterval = setInterval(
          this._checkForIntersections, this.POLL_INTERVAL);
    }
    else {
      addEvent(window, 'resize', this._checkForIntersections, true);
      addEvent(document, 'scroll', this._checkForIntersections, true);

      if (this.USE_MUTATION_OBSERVER && 'MutationObserver' in window) {
        this._domObserver = new MutationObserver(this._checkForIntersections);
        this._domObserver.observe(document, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
      }
    }
  }
};


/**
 * Stops polling for intersection changes.
 * @private
 */
IntersectionObserver.prototype._unmonitorIntersections = function() {
  if (this._monitoringIntersections) {
    this._monitoringIntersections = false;

    clearInterval(this._monitoringInterval);
    this._monitoringInterval = null;

    removeEvent(window, 'resize', this._checkForIntersections, true);
    removeEvent(document, 'scroll', this._checkForIntersections, true);

    if (this._domObserver) {
      this._domObserver.disconnect();
      this._domObserver = null;
    }
  }
};


/**
 * Scans each observation target for intersection changes and adds them
 * to the internal entries queue. If new entries are found, it
 * schedules the callback to be invoked.
 * @private
 */
IntersectionObserver.prototype._checkForIntersections = function() {
  var rootIsInDom = this._rootIsInDom();
  var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();

  this._observationTargets.forEach(function(item) {
    var target = item.element;
    var targetRect = getBoundingClientRect(target);
    var rootContainsTarget = this._rootContainsTarget(target);
    var oldEntry = item.entry;
    var intersectionRect = rootIsInDom && rootContainsTarget &&
        this._computeTargetAndRootIntersection(target, rootRect);

    var newEntry = item.entry = new IntersectionObserverEntry({
      time: now(),
      target: target,
      boundingClientRect: targetRect,
      rootBounds: rootRect,
      intersectionRect: intersectionRect
    });

    if (!oldEntry) {
      this._queuedEntries.push(newEntry);
    } else if (rootIsInDom && rootContainsTarget) {
      // If the new entry intersection ratio has crossed any of the
      // thresholds, add a new entry.
      if (this._hasCrossedThreshold(oldEntry, newEntry)) {
        this._queuedEntries.push(newEntry);
      }
    } else {
      // If the root is not in the DOM or target is not contained within
      // root but the previous entry for this target had an intersection,
      // add a new record indicating removal.
      if (oldEntry && oldEntry.isIntersecting) {
        this._queuedEntries.push(newEntry);
      }
    }
  }, this);

  if (this._queuedEntries.length) {
    this._callback(this.takeRecords(), this);
  }
};


/**
 * Accepts a target and root rect computes the intersection between then
 * following the algorithm in the spec.
 * TODO(philipwalton): at this time clip-path is not considered.
 * https://w3c.github.io/IntersectionObserver/#calculate-intersection-rect-algo
 * @param {Element} target The target DOM element
 * @param {Object} rootRect The bounding rect of the root after being
 *     expanded by the rootMargin value.
 * @return {?Object} The final intersection rect object or undefined if no
 *     intersection is found.
 * @private
 */
IntersectionObserver.prototype._computeTargetAndRootIntersection =
    function(target, rootRect) {

  // If the element isn't displayed, an intersection can't happen.
  if (window.getComputedStyle(target).display == 'none') return;

  var targetRect = getBoundingClientRect(target);
  var intersectionRect = targetRect;
  var parent = getParentNode(target);
  var atRoot = false;

  while (!atRoot) {
    var parentRect = null;
    var parentComputedStyle = parent.nodeType == 1 ?
        window.getComputedStyle(parent) : {};

    // If the parent isn't displayed, an intersection can't happen.
    if (parentComputedStyle.display == 'none') return;

    if (parent == this.root || parent == document) {
      atRoot = true;
      parentRect = rootRect;
    } else {
      // If the element has a non-visible overflow, and it's not the <body>
      // or <html> element, update the intersection rect.
      // Note: <body> and <html> cannot be clipped to a rect that's not also
      // the document rect, so no need to compute a new intersection.
      if (parent != document.body &&
          parent != document.documentElement &&
          parentComputedStyle.overflow != 'visible') {
        parentRect = getBoundingClientRect(parent);
      }
    }

    // If either of the above conditionals set a new parentRect,
    // calculate new intersection data.
    if (parentRect) {
      intersectionRect = computeRectIntersection(parentRect, intersectionRect);

      if (!intersectionRect) break;
    }
    parent = getParentNode(parent);
  }
  return intersectionRect;
};


/**
 * Returns the root rect after being expanded by the rootMargin value.
 * @return {Object} The expanded root rect.
 * @private
 */
IntersectionObserver.prototype._getRootRect = function() {
  var rootRect;
  if (this.root) {
    rootRect = getBoundingClientRect(this.root);
  } else {
    // Use <html>/<body> instead of window since scroll bars affect size.
    var html = document.documentElement;
    var body = document.body;
    rootRect = {
      top: 0,
      left: 0,
      right: html.clientWidth || body.clientWidth,
      width: html.clientWidth || body.clientWidth,
      bottom: html.clientHeight || body.clientHeight,
      height: html.clientHeight || body.clientHeight
    };
  }
  return this._expandRectByRootMargin(rootRect);
};


/**
 * Accepts a rect and expands it by the rootMargin value.
 * @param {Object} rect The rect object to expand.
 * @return {Object} The expanded rect.
 * @private
 */
IntersectionObserver.prototype._expandRectByRootMargin = function(rect) {
  var margins = this._rootMarginValues.map(function(margin, i) {
    return margin.unit == 'px' ? margin.value :
        margin.value * (i % 2 ? rect.width : rect.height) / 100;
  });
  var newRect = {
    top: rect.top - margins[0],
    right: rect.right + margins[1],
    bottom: rect.bottom + margins[2],
    left: rect.left - margins[3]
  };
  newRect.width = newRect.right - newRect.left;
  newRect.height = newRect.bottom - newRect.top;

  return newRect;
};


/**
 * Accepts an old and new entry and returns true if at least one of the
 * threshold values has been crossed.
 * @param {?IntersectionObserverEntry} oldEntry The previous entry for a
 *    particular target element or null if no previous entry exists.
 * @param {IntersectionObserverEntry} newEntry The current entry for a
 *    particular target element.
 * @return {boolean} Returns true if a any threshold has been crossed.
 * @private
 */
IntersectionObserver.prototype._hasCrossedThreshold =
    function(oldEntry, newEntry) {

  // To make comparing easier, an entry that has a ratio of 0
  // but does not actually intersect is given a value of -1
  var oldRatio = oldEntry && oldEntry.isIntersecting ?
      oldEntry.intersectionRatio || 0 : -1;
  var newRatio = newEntry.isIntersecting ?
      newEntry.intersectionRatio || 0 : -1;

  // Ignore unchanged ratios
  if (oldRatio === newRatio) return;

  for (var i = 0; i < this.thresholds.length; i++) {
    var threshold = this.thresholds[i];

    // Return true if an entry matches a threshold or if the new ratio
    // and the old ratio are on the opposite sides of a threshold.
    if (threshold == oldRatio || threshold == newRatio ||
        threshold < oldRatio !== threshold < newRatio) {
      return true;
    }
  }
};


/**
 * Returns whether or not the root element is an element and is in the DOM.
 * @return {boolean} True if the root element is an element and is in the DOM.
 * @private
 */
IntersectionObserver.prototype._rootIsInDom = function() {
  return !this.root || containsDeep(document, this.root);
};


/**
 * Returns whether or not the target element is a child of root.
 * @param {Element} target The target element to check.
 * @return {boolean} True if the target element is a child of root.
 * @private
 */
IntersectionObserver.prototype._rootContainsTarget = function(target) {
  return containsDeep(this.root || document, target);
};


/**
 * Adds the instance to the global IntersectionObserver registry if it isn't
 * already present.
 * @private
 */
IntersectionObserver.prototype._registerInstance = function() {
  if (registry.indexOf(this) < 0) {
    registry.push(this);
  }
};


/**
 * Removes the instance from the global IntersectionObserver registry.
 * @private
 */
IntersectionObserver.prototype._unregisterInstance = function() {
  var index = registry.indexOf(this);
  if (index != -1) registry.splice(index, 1);
};


/**
 * Returns the result of the performance.now() method or null in browsers
 * that don't support the API.
 * @return {number} The elapsed time since the page was requested.
 */
function now() {
  return window.performance && performance.now && performance.now();
}


/**
 * Throttles a function and delays its execution, so it's only called at most
 * once within a given time period.
 * @param {Function} fn The function to throttle.
 * @param {number} timeout The amount of time that must pass before the
 *     function can be called again.
 * @return {Function} The throttled function.
 */
function throttle(fn, timeout) {
  var timer = null;
  return function () {
    if (!timer) {
      timer = setTimeout(function() {
        fn();
        timer = null;
      }, timeout);
    }
  };
}


/**
 * Adds an event handler to a DOM node ensuring cross-browser compatibility.
 * @param {Node} node The DOM node to add the event handler to.
 * @param {string} event The event name.
 * @param {Function} fn The event handler to add.
 * @param {boolean} opt_useCapture Optionally adds the even to the capture
 *     phase. Note: this only works in modern browsers.
 */
function addEvent(node, event, fn, opt_useCapture) {
  if (typeof node.addEventListener == 'function') {
    node.addEventListener(event, fn, opt_useCapture || false);
  }
  else if (typeof node.attachEvent == 'function') {
    node.attachEvent('on' + event, fn);
  }
}


/**
 * Removes a previously added event handler from a DOM node.
 * @param {Node} node The DOM node to remove the event handler from.
 * @param {string} event The event name.
 * @param {Function} fn The event handler to remove.
 * @param {boolean} opt_useCapture If the event handler was added with this
 *     flag set to true, it should be set to true here in order to remove it.
 */
function removeEvent(node, event, fn, opt_useCapture) {
  if (typeof node.removeEventListener == 'function') {
    node.removeEventListener(event, fn, opt_useCapture || false);
  }
  else if (typeof node.detatchEvent == 'function') {
    node.detatchEvent('on' + event, fn);
  }
}


/**
 * Returns the intersection between two rect objects.
 * @param {Object} rect1 The first rect.
 * @param {Object} rect2 The second rect.
 * @return {?Object} The intersection rect or undefined if no intersection
 *     is found.
 */
function computeRectIntersection(rect1, rect2) {
  var top = Math.max(rect1.top, rect2.top);
  var bottom = Math.min(rect1.bottom, rect2.bottom);
  var left = Math.max(rect1.left, rect2.left);
  var right = Math.min(rect1.right, rect2.right);
  var width = right - left;
  var height = bottom - top;

  return (width >= 0 && height >= 0) && {
    top: top,
    bottom: bottom,
    left: left,
    right: right,
    width: width,
    height: height
  };
}


/**
 * Shims the native getBoundingClientRect for compatibility with older IE.
 * @param {Element} el The element whose bounding rect to get.
 * @return {Object} The (possibly shimmed) rect of the element.
 */
function getBoundingClientRect(el) {
  var rect;

  try {
    rect = el.getBoundingClientRect();
  } catch (err) {
    // Ignore Windows 7 IE11 "Unspecified error"
    // https://github.com/w3c/IntersectionObserver/pull/205
  }

  if (!rect) return getEmptyRect();

  // Older IE
  if (!(rect.width && rect.height)) {
    rect = {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };
  }
  return rect;
}


/**
 * Returns an empty rect object. An empty rect is returned when an element
 * is not in the DOM.
 * @return {Object} The empty rect.
 */
function getEmptyRect() {
  return {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0
  };
}

/**
 * Checks to see if a parent element contains a child element (including inside
 * shadow DOM).
 * @param {Node} parent The parent element.
 * @param {Node} child The child element.
 * @return {boolean} True if the parent node contains the child node.
 */
function containsDeep(parent, child) {
  var node = child;
  while (node) {
    if (node == parent) return true;

    node = getParentNode(node);
  }
  return false;
}


/**
 * Gets the parent node of an element or its host element if the parent node
 * is a shadow root.
 * @param {Node} node The node whose parent to get.
 * @return {Node|null} The parent node or null if no parent exists.
 */
function getParentNode(node) {
  var parent = node.parentNode;

  if (parent && parent.nodeType == 11 && parent.host) {
    // If the parent is a shadow root, return the host element.
    return parent.host;
  }

  if (parent && parent.assignedSlot) {
    // If the parent is distributed in a <slot>, return the parent of a slot.
    return parent.assignedSlot.parentNode;
  }

  return parent;
}


// Exposes the constructors globally.
window.IntersectionObserver = IntersectionObserver;
window.IntersectionObserverEntry = IntersectionObserverEntry;

}());


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,n){ true?module.exports=n():"function"==typeof define&&define.amd?define(n):(t=t||self).barba=n()}(this,(function(){function t(t,n){for(var r=0;r<n.length;r++){var e=n[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}function n(n,r,e){return r&&t(n.prototype,r),e&&t(n,e),n}function r(){return(r=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&(t[e]=r[e])}return t}).apply(this,arguments)}function e(t,n){t.prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n}function i(t){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function o(t,n){return(o=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}function u(t,n,r){return(u=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}()?Reflect.construct:function(t,n,r){var e=[null];e.push.apply(e,n);var i=new(Function.bind.apply(t,e));return r&&o(i,r.prototype),i}).apply(null,arguments)}function f(t){var n="function"==typeof Map?new Map:void 0;return(f=function(t){if(null===t||-1===Function.toString.call(t).indexOf("[native code]"))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==n){if(n.has(t))return n.get(t);n.set(t,r)}function r(){return u(t,arguments,i(this).constructor)}return r.prototype=Object.create(t.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),o(r,t)})(t)}function s(t,n){try{var r=t()}catch(t){return n(t)}return r&&r.then?r.then(void 0,n):r}"undefined"!=typeof Symbol&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator"))),"undefined"!=typeof Symbol&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));var c,a="2.9.6",h=function(){};!function(t){t[t.off=0]="off",t[t.error=1]="error",t[t.warning=2]="warning",t[t.info=3]="info",t[t.debug=4]="debug"}(c||(c={}));var v=c.off,l=function(){function t(t){this.t=t}t.getLevel=function(){return v},t.setLevel=function(t){return v=c[t]};var n=t.prototype;return n.error=function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];this.i(console.error,c.error,n)},n.warn=function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];this.i(console.warn,c.warning,n)},n.info=function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];this.i(console.info,c.info,n)},n.debug=function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];this.i(console.log,c.debug,n)},n.i=function(n,r,e){r<=t.getLevel()&&n.apply(console,["["+this.t+"] "].concat(e))},t}(),d=O,m=E,p=g,w=x,b=T,y="/",P=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g");function g(t,n){for(var r,e=[],i=0,o=0,u="",f=n&&n.delimiter||y,s=n&&n.whitelist||void 0,c=!1;null!==(r=P.exec(t));){var a=r[0],h=r[1],v=r.index;if(u+=t.slice(o,v),o=v+a.length,h)u+=h[1],c=!0;else{var l="",d=r[2],m=r[3],p=r[4],w=r[5];if(!c&&u.length){var b=u.length-1,g=u[b];(!s||s.indexOf(g)>-1)&&(l=g,u=u.slice(0,b))}u&&(e.push(u),u="",c=!1);var E=m||p,x=l||f;e.push({name:d||i++,prefix:l,delimiter:x,optional:"?"===w||"*"===w,repeat:"+"===w||"*"===w,pattern:E?A(E):"[^"+k(x===f?x:x+f)+"]+?"})}}return(u||o<t.length)&&e.push(u+t.substr(o)),e}function E(t,n){return function(r,e){var i=t.exec(r);if(!i)return!1;for(var o=i[0],u=i.index,f={},s=e&&e.decode||decodeURIComponent,c=1;c<i.length;c++)if(void 0!==i[c]){var a=n[c-1];f[a.name]=a.repeat?i[c].split(a.delimiter).map((function(t){return s(t,a)})):s(i[c],a)}return{path:o,index:u,params:f}}}function x(t,n){for(var r=new Array(t.length),e=0;e<t.length;e++)"object"==typeof t[e]&&(r[e]=new RegExp("^(?:"+t[e].pattern+")$",R(n)));return function(n,e){for(var i="",o=e&&e.encode||encodeURIComponent,u=!e||!1!==e.validate,f=0;f<t.length;f++){var s=t[f];if("string"!=typeof s){var c,a=n?n[s.name]:void 0;if(Array.isArray(a)){if(!s.repeat)throw new TypeError('Expected "'+s.name+'" to not repeat, but got array');if(0===a.length){if(s.optional)continue;throw new TypeError('Expected "'+s.name+'" to not be empty')}for(var h=0;h<a.length;h++){if(c=o(a[h],s),u&&!r[f].test(c))throw new TypeError('Expected all "'+s.name+'" to match "'+s.pattern+'"');i+=(0===h?s.prefix:s.delimiter)+c}}else if("string"!=typeof a&&"number"!=typeof a&&"boolean"!=typeof a){if(!s.optional)throw new TypeError('Expected "'+s.name+'" to be '+(s.repeat?"an array":"a string"))}else{if(c=o(String(a),s),u&&!r[f].test(c))throw new TypeError('Expected "'+s.name+'" to match "'+s.pattern+'", but got "'+c+'"');i+=s.prefix+c}}else i+=s}return i}}function k(t){return t.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function A(t){return t.replace(/([=!:$/()])/g,"\\$1")}function R(t){return t&&t.sensitive?"":"i"}function T(t,n,r){for(var e=(r=r||{}).strict,i=!1!==r.start,o=!1!==r.end,u=r.delimiter||y,f=[].concat(r.endsWith||[]).map(k).concat("$").join("|"),s=i?"^":"",c=0;c<t.length;c++){var a=t[c];if("string"==typeof a)s+=k(a);else{var h=a.repeat?"(?:"+a.pattern+")(?:"+k(a.delimiter)+"(?:"+a.pattern+"))*":a.pattern;n&&n.push(a),s+=a.optional?a.prefix?"(?:"+k(a.prefix)+"("+h+"))?":"("+h+")?":k(a.prefix)+"("+h+")"}}if(o)e||(s+="(?:"+k(u)+")?"),s+="$"===f?"$":"(?="+f+")";else{var v=t[t.length-1],l="string"==typeof v?v[v.length-1]===u:void 0===v;e||(s+="(?:"+k(u)+"(?="+f+"))?"),l||(s+="(?="+k(u)+"|"+f+")")}return new RegExp(s,R(r))}function O(t,n,r){return t instanceof RegExp?function(t,n){if(!n)return t;var r=t.source.match(/\((?!\?)/g);if(r)for(var e=0;e<r.length;e++)n.push({name:e,prefix:null,delimiter:null,optional:!1,repeat:!1,pattern:null});return t}(t,n):Array.isArray(t)?function(t,n,r){for(var e=[],i=0;i<t.length;i++)e.push(O(t[i],n,r).source);return new RegExp("(?:"+e.join("|")+")",R(r))}(t,n,r):function(t,n,r){return T(g(t,r),n,r)}(t,n,r)}d.match=function(t,n){var r=[];return E(O(t,r,n),r)},d.regexpToFunction=m,d.parse=p,d.compile=function(t,n){return x(g(t,n),n)},d.tokensToFunction=w,d.tokensToRegExp=b;var S={container:"container",history:"history",namespace:"namespace",prefix:"data-barba",prevent:"prevent",wrapper:"wrapper"},j=new(function(){function t(){this.o=S,this.u=new DOMParser}var n=t.prototype;return n.toString=function(t){return t.outerHTML},n.toDocument=function(t){return this.u.parseFromString(t,"text/html")},n.toElement=function(t){var n=document.createElement("div");return n.innerHTML=t,n},n.getHtml=function(t){return void 0===t&&(t=document),this.toString(t.documentElement)},n.getWrapper=function(t){return void 0===t&&(t=document),t.querySelector("["+this.o.prefix+'="'+this.o.wrapper+'"]')},n.getContainer=function(t){return void 0===t&&(t=document),t.querySelector("["+this.o.prefix+'="'+this.o.container+'"]')},n.removeContainer=function(t){document.body.contains(t)&&t.parentNode.removeChild(t)},n.addContainer=function(t,n){var r=this.getContainer();r?this.s(t,r):n.appendChild(t)},n.getNamespace=function(t){void 0===t&&(t=document);var n=t.querySelector("["+this.o.prefix+"-"+this.o.namespace+"]");return n?n.getAttribute(this.o.prefix+"-"+this.o.namespace):null},n.getHref=function(t){if(t.tagName&&"a"===t.tagName.toLowerCase()){if("string"==typeof t.href)return t.href;var n=t.getAttribute("href")||t.getAttribute("xlink:href");if(n)return this.resolveUrl(n.baseVal||n)}return null},n.resolveUrl=function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];var e=n.length;if(0===e)throw new Error("resolveUrl requires at least one argument; got none.");var i=document.createElement("base");if(i.href=arguments[0],1===e)return i.href;var o=document.getElementsByTagName("head")[0];o.insertBefore(i,o.firstChild);for(var u,f=document.createElement("a"),s=1;s<e;s++)f.href=arguments[s],i.href=u=f.href;return o.removeChild(i),u},n.s=function(t,n){n.parentNode.insertBefore(t,n.nextSibling)},t}()),M=new(function(){function t(){this.h=[],this.v=-1}var e=t.prototype;return e.init=function(t,n){this.l="barba";var r={ns:n,scroll:{x:window.scrollX,y:window.scrollY},url:t};this.h.push(r),this.v=0;var e={from:this.l,index:0,states:[].concat(this.h)};window.history&&window.history.replaceState(e,"",t)},e.change=function(t,n,r){if(r&&r.state){var e=r.state,i=e.index;n=this.m(this.v-i),this.replace(e.states),this.v=i}else this.add(t,n);return n},e.add=function(t,n){var r=this.size,e=this.p(n),i={ns:"tmp",scroll:{x:window.scrollX,y:window.scrollY},url:t};this.h.push(i),this.v=r;var o={from:this.l,index:r,states:[].concat(this.h)};switch(e){case"push":window.history&&window.history.pushState(o,"",t);break;case"replace":window.history&&window.history.replaceState(o,"",t)}},e.update=function(t,n){var e=n||this.v,i=r({},this.get(e),{},t);this.set(e,i)},e.remove=function(t){t?this.h.splice(t,1):this.h.pop(),this.v--},e.clear=function(){this.h=[],this.v=-1},e.replace=function(t){this.h=t},e.get=function(t){return this.h[t]},e.set=function(t,n){return this.h[t]=n},e.p=function(t){var n="push",r=t,e=S.prefix+"-"+S.history;return r.hasAttribute&&r.hasAttribute(e)&&(n=r.getAttribute(e)),n},e.m=function(t){return Math.abs(t)>1?t>0?"forward":"back":0===t?"popstate":t>0?"back":"forward"},n(t,[{key:"current",get:function(){return this.h[this.v]}},{key:"state",get:function(){return this.h[this.h.length-1]}},{key:"previous",get:function(){return this.v<1?null:this.h[this.v-1]}},{key:"size",get:function(){return this.h.length}}]),t}()),L=function(t,n){try{var r=function(){if(!n.next.html)return Promise.resolve(t).then((function(t){var r=n.next;if(t){var e=j.toElement(t);r.namespace=j.getNamespace(e),r.container=j.getContainer(e),r.html=t,M.update({ns:r.namespace});var i=j.toDocument(t);document.title=i.title}}))}();return Promise.resolve(r&&r.then?r.then((function(){})):void 0)}catch(t){return Promise.reject(t)}},$=d,_={__proto__:null,update:L,nextTick:function(){return new Promise((function(t){window.requestAnimationFrame(t)}))},pathToRegexp:$},q=function(){return window.location.origin},B=function(t){return void 0===t&&(t=window.location.href),U(t).port},U=function(t){var n,r=t.match(/:\d+/);if(null===r)/^http/.test(t)&&(n=80),/^https/.test(t)&&(n=443);else{var e=r[0].substring(1);n=parseInt(e,10)}var i,o=t.replace(q(),""),u={},f=o.indexOf("#");f>=0&&(i=o.slice(f+1),o=o.slice(0,f));var s=o.indexOf("?");return s>=0&&(u=D(o.slice(s+1)),o=o.slice(0,s)),{hash:i,path:o,port:n,query:u}},D=function(t){return t.split("&").reduce((function(t,n){var r=n.split("=");return t[r[0]]=r[1],t}),{})},F=function(t){return void 0===t&&(t=window.location.href),t.replace(/(\/#.*|\/|#.*)$/,"")},H={__proto__:null,getHref:function(){return window.location.href},getOrigin:q,getPort:B,getPath:function(t){return void 0===t&&(t=window.location.href),U(t).path},parse:U,parseQuery:D,clean:F};function I(t,n,r){return void 0===n&&(n=2e3),new Promise((function(e,i){var o=new XMLHttpRequest;o.onreadystatechange=function(){if(o.readyState===XMLHttpRequest.DONE)if(200===o.status)e(o.responseText);else if(o.status){var n={status:o.status,statusText:o.statusText};r(t,n),i(n)}},o.ontimeout=function(){var e=new Error("Timeout error ["+n+"]");r(t,e),i(e)},o.onerror=function(){var n=new Error("Fetch error");r(t,n),i(n)},o.open("GET",t),o.timeout=n,o.setRequestHeader("Accept","text/html,application/xhtml+xml,application/xml"),o.setRequestHeader("x-barba","yes"),o.send()}))}var C=function(t){return!!t&&("object"==typeof t||"function"==typeof t)&&"function"==typeof t.then};function N(t,n){return void 0===n&&(n={}),function(){for(var r=arguments.length,e=new Array(r),i=0;i<r;i++)e[i]=arguments[i];var o=!1,u=new Promise((function(r,i){n.async=function(){return o=!0,function(t,n){t?i(t):r(n)}};var u=t.apply(n,e);o||(C(u)?u.then(r,i):r(u))}));return u}}var X=new(function(t){function n(){var n;return(n=t.call(this)||this).logger=new l("@barba/core"),n.all=["ready","page","reset","currentAdded","currentRemoved","nextAdded","nextRemoved","beforeOnce","once","afterOnce","before","beforeLeave","leave","afterLeave","beforeEnter","enter","afterEnter","after"],n.registered=new Map,n.init(),n}e(n,t);var r=n.prototype;return r.init=function(){var t=this;this.registered.clear(),this.all.forEach((function(n){t[n]||(t[n]=function(r,e){t.registered.has(n)||t.registered.set(n,new Set),t.registered.get(n).add({ctx:e||{},fn:r})})}))},r.do=function(t){for(var n=this,r=arguments.length,e=new Array(r>1?r-1:0),i=1;i<r;i++)e[i-1]=arguments[i];if(this.registered.has(t)){var o=Promise.resolve();return this.registered.get(t).forEach((function(t){o=o.then((function(){return N(t.fn,t.ctx).apply(void 0,e)}))})),o.catch((function(r){n.logger.debug("Hook error ["+t+"]"),n.logger.error(r)}))}return Promise.resolve()},r.clear=function(){var t=this;this.all.forEach((function(n){delete t[n]})),this.init()},r.help=function(){this.logger.info("Available hooks: "+this.all.join(","));var t=[];this.registered.forEach((function(n,r){return t.push(r)})),this.logger.info("Registered hooks: "+t.join(","))},n}(h)),z=function(){function t(t){if(this.P=[],"boolean"==typeof t)this.g=t;else{var n=Array.isArray(t)?t:[t];this.P=n.map((function(t){return $(t)}))}}return t.prototype.checkHref=function(t){if("boolean"==typeof this.g)return this.g;var n=U(t).path;return this.P.some((function(t){return null!==t.exec(n)}))},t}(),G=function(t){function n(n){var r;return(r=t.call(this,n)||this).k=new Map,r}e(n,t);var i=n.prototype;return i.set=function(t,n,r){return this.k.set(t,{action:r,request:n}),{action:r,request:n}},i.get=function(t){return this.k.get(t)},i.getRequest=function(t){return this.k.get(t).request},i.getAction=function(t){return this.k.get(t).action},i.has=function(t){return!this.checkHref(t)&&this.k.has(t)},i.delete=function(t){return this.k.delete(t)},i.update=function(t,n){var e=r({},this.k.get(t),{},n);return this.k.set(t,e),e},n}(z),Q=function(){return!window.history.pushState},W=function(t){return!t.el||!t.href},J=function(t){var n=t.event;return n.which>1||n.metaKey||n.ctrlKey||n.shiftKey||n.altKey},K=function(t){var n=t.el;return n.hasAttribute("target")&&"_blank"===n.target},V=function(t){var n=t.el;return void 0!==n.protocol&&window.location.protocol!==n.protocol||void 0!==n.hostname&&window.location.hostname!==n.hostname},Y=function(t){var n=t.el;return void 0!==n.port&&B()!==B(n.href)},Z=function(t){var n=t.el;return n.getAttribute&&"string"==typeof n.getAttribute("download")},tt=function(t){return t.el.hasAttribute(S.prefix+"-"+S.prevent)},nt=function(t){return Boolean(t.el.closest("["+S.prefix+"-"+S.prevent+'="all"]'))},rt=function(t){var n=t.href;return F(n)===F()&&B(n)===B()},et=function(t){function n(n){var r;return(r=t.call(this,n)||this).suite=[],r.tests=new Map,r.init(),r}e(n,t);var r=n.prototype;return r.init=function(){this.add("pushState",Q),this.add("exists",W),this.add("newTab",J),this.add("blank",K),this.add("corsDomain",V),this.add("corsPort",Y),this.add("download",Z),this.add("preventSelf",tt),this.add("preventAll",nt),this.add("sameUrl",rt,!1)},r.add=function(t,n,r){void 0===r&&(r=!0),this.tests.set(t,n),r&&this.suite.push(t)},r.run=function(t,n,r,e){return this.tests.get(t)({el:n,event:r,href:e})},r.checkLink=function(t,n,r){var e=this;return this.suite.some((function(i){return e.run(i,t,n,r)}))},n}(z),it=function(t){function n(r,e){var i;void 0===e&&(e="Barba error");for(var o=arguments.length,u=new Array(o>2?o-2:0),f=2;f<o;f++)u[f-2]=arguments[f];return(i=t.call.apply(t,[this].concat(u))||this).error=r,i.label=e,Error.captureStackTrace&&Error.captureStackTrace(function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(i),n),i.name="BarbaError",i}return e(n,t),n}(f(Error)),ot=function(){function t(t){void 0===t&&(t=[]),this.logger=new l("@barba/core"),this.all=[],this.once=[],this.A=[{name:"namespace",type:"strings"},{name:"custom",type:"function"}],t&&(this.all=this.all.concat(t)),this.update()}var n=t.prototype;return n.add=function(t,n){switch(t){case"rule":this.A.splice(n.position||0,0,n.value);break;case"transition":default:this.all.push(n)}this.update()},n.resolve=function(t,n){var r=this;void 0===n&&(n={});var e=n.once?this.once:this.all;e=e.filter(n.self?function(t){return t.name&&"self"===t.name}:function(t){return!t.name||"self"!==t.name});var i=new Map,o=e.find((function(e){var o=!0,u={};return!(!n.self||"self"!==e.name)||(r.A.reverse().forEach((function(n){o&&(o=r.R(e,n,t,u),e.from&&e.to&&(o=r.R(e,n,t,u,"from")&&r.R(e,n,t,u,"to")),e.from&&!e.to&&(o=r.R(e,n,t,u,"from")),!e.from&&e.to&&(o=r.R(e,n,t,u,"to")))})),i.set(e,u),o)})),u=i.get(o),f=[];if(f.push(n.once?"once":"page"),n.self&&f.push("self"),u){var s,c=[o];Object.keys(u).length>0&&c.push(u),(s=this.logger).info.apply(s,["Transition found ["+f.join(",")+"]"].concat(c))}else this.logger.info("No transition found ["+f.join(",")+"]");return o},n.update=function(){var t=this;this.all=this.all.map((function(n){return t.T(n)})).sort((function(t,n){return t.priority-n.priority})).reverse().map((function(t){return delete t.priority,t})),this.once=this.all.filter((function(t){return void 0!==t.once}))},n.R=function(t,n,r,e,i){var o=!0,u=!1,f=t,s=n.name,c=s,a=s,h=s,v=i?f[i]:f,l="to"===i?r.next:r.current;if(i?v&&v[s]:v[s]){switch(n.type){case"strings":default:var d=Array.isArray(v[c])?v[c]:[v[c]];l[c]&&-1!==d.indexOf(l[c])&&(u=!0),-1===d.indexOf(l[c])&&(o=!1);break;case"object":var m=Array.isArray(v[a])?v[a]:[v[a]];l[a]?(l[a].name&&-1!==m.indexOf(l[a].name)&&(u=!0),-1===m.indexOf(l[a].name)&&(o=!1)):o=!1;break;case"function":v[h](r)?u=!0:o=!1}u&&(i?(e[i]=e[i]||{},e[i][s]=f[i][s]):e[s]=f[s])}return o},n.O=function(t,n,r){var e=0;return(t[n]||t.from&&t.from[n]||t.to&&t.to[n])&&(e+=Math.pow(10,r),t.from&&t.from[n]&&(e+=1),t.to&&t.to[n]&&(e+=2)),e},n.T=function(t){var n=this;t.priority=0;var r=0;return this.A.forEach((function(e,i){r+=n.O(t,e.name,i+1)})),t.priority=r,t},t}(),ut=function(){function t(t){void 0===t&&(t=[]),this.logger=new l("@barba/core"),this.S=!1,this.store=new ot(t)}var r=t.prototype;return r.get=function(t,n){return this.store.resolve(t,n)},r.doOnce=function(t){var n=t.data,r=t.transition;try{var e=function(){i.S=!1},i=this,o=r||{};i.S=!0;var u=s((function(){return Promise.resolve(i.j("beforeOnce",n,o)).then((function(){return Promise.resolve(i.once(n,o)).then((function(){return Promise.resolve(i.j("afterOnce",n,o)).then((function(){}))}))}))}),(function(t){i.S=!1,i.logger.debug("Transition error [before/after/once]"),i.logger.error(t)}));return Promise.resolve(u&&u.then?u.then(e):e())}catch(t){return Promise.reject(t)}},r.doPage=function(t){var n=t.data,r=t.transition,e=t.page,i=t.wrapper;try{var o=function(t){if(u)return t;f.S=!1},u=!1,f=this,c=r||{},a=!0===c.sync||!1;f.S=!0;var h=s((function(){function t(){return Promise.resolve(f.j("before",n,c)).then((function(){var t=!1;function r(r){return t?r:Promise.resolve(f.remove(n)).then((function(){return Promise.resolve(f.j("after",n,c)).then((function(){}))}))}var o=function(){if(a)return s((function(){return Promise.resolve(f.add(n,i)).then((function(){return Promise.resolve(f.j("beforeLeave",n,c)).then((function(){return Promise.resolve(f.j("beforeEnter",n,c)).then((function(){return Promise.resolve(Promise.all([f.leave(n,c),f.enter(n,c)])).then((function(){return Promise.resolve(f.j("afterLeave",n,c)).then((function(){return Promise.resolve(f.j("afterEnter",n,c)).then((function(){}))}))}))}))}))}))}),(function(t){if(f.M(t))throw new it(t,"Transition error [sync]")}));var r=function(r){return t?r:s((function(){var t=function(){if(!1!==o)return Promise.resolve(f.add(n,i)).then((function(){return Promise.resolve(f.j("beforeEnter",n,c)).then((function(){return Promise.resolve(f.enter(n,c,o)).then((function(){return Promise.resolve(f.j("afterEnter",n,c)).then((function(){}))}))}))}))}();if(t&&t.then)return t.then((function(){}))}),(function(t){if(f.M(t))throw new it(t,"Transition error [before/after/enter]")}))},o=!1,u=s((function(){return Promise.resolve(f.j("beforeLeave",n,c)).then((function(){return Promise.resolve(Promise.all([f.leave(n,c),L(e,n)]).then((function(t){return t[0]}))).then((function(t){return o=t,Promise.resolve(f.j("afterLeave",n,c)).then((function(){}))}))}))}),(function(t){if(f.M(t))throw new it(t,"Transition error [before/after/leave]")}));return u&&u.then?u.then(r):r(u)}();return o&&o.then?o.then(r):r(o)}))}var r=function(){if(a)return Promise.resolve(L(e,n)).then((function(){}))}();return r&&r.then?r.then(t):t()}),(function(t){if(f.S=!1,t.name&&"BarbaError"===t.name)throw f.logger.debug(t.label),f.logger.error(t.error),t;throw f.logger.debug("Transition error [page]"),f.logger.error(t),t}));return Promise.resolve(h&&h.then?h.then(o):o(h))}catch(t){return Promise.reject(t)}},r.once=function(t,n){try{return Promise.resolve(X.do("once",t,n)).then((function(){return n.once?N(n.once,n)(t):Promise.resolve()}))}catch(t){return Promise.reject(t)}},r.leave=function(t,n){try{return Promise.resolve(X.do("leave",t,n)).then((function(){return n.leave?N(n.leave,n)(t):Promise.resolve()}))}catch(t){return Promise.reject(t)}},r.enter=function(t,n,r){try{return Promise.resolve(X.do("enter",t,n)).then((function(){return n.enter?N(n.enter,n)(t,r):Promise.resolve()}))}catch(t){return Promise.reject(t)}},r.add=function(t,n){try{return j.addContainer(t.next.container,n),X.do("nextAdded",t),Promise.resolve()}catch(t){return Promise.reject(t)}},r.remove=function(t){try{return j.removeContainer(t.current.container),X.do("currentRemoved",t),Promise.resolve()}catch(t){return Promise.reject(t)}},r.M=function(t){return t.message?!/Timeout error|Fetch error/.test(t.message):!t.status},r.j=function(t,n,r){try{return Promise.resolve(X.do(t,n,r)).then((function(){return r[t]?N(r[t],r)(n):Promise.resolve()}))}catch(t){return Promise.reject(t)}},n(t,[{key:"isRunning",get:function(){return this.S},set:function(t){this.S=t}},{key:"hasOnce",get:function(){return this.store.once.length>0}},{key:"hasSelf",get:function(){return this.store.all.some((function(t){return"self"===t.name}))}},{key:"shouldWait",get:function(){return this.store.all.some((function(t){return t.to&&!t.to.route||t.sync}))}}]),t}(),ft=function(){function t(t){var n=this;this.names=["beforeLeave","afterLeave","beforeEnter","afterEnter"],this.byNamespace=new Map,0!==t.length&&(t.forEach((function(t){n.byNamespace.set(t.namespace,t)})),this.names.forEach((function(t){X[t](n.L(t))})))}return t.prototype.L=function(t){var n=this;return function(r){var e=t.match(/enter/i)?r.next:r.current,i=n.byNamespace.get(e.namespace);return i&&i[t]?N(i[t],i)(r):Promise.resolve()}},t}();Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(t){var n=this;do{if(n.matches(t))return n;n=n.parentElement||n.parentNode}while(null!==n&&1===n.nodeType);return null});var st={container:null,html:"",namespace:"",url:{hash:"",href:"",path:"",port:null,query:{}}};return new(function(){function t(){this.version=a,this.schemaPage=st,this.Logger=l,this.logger=new l("@barba/core"),this.plugins=[],this.hooks=X,this.dom=j,this.helpers=_,this.history=M,this.request=I,this.url=H}var e=t.prototype;return e.use=function(t,n){var r=this.plugins;r.indexOf(t)>-1?this.logger.warn("Plugin ["+t.name+"] already installed."):"function"==typeof t.install?(t.install(this,n),r.push(t)):this.logger.warn("Plugin ["+t.name+'] has no "install" method.')},e.init=function(t){var n=void 0===t?{}:t,e=n.transitions,i=void 0===e?[]:e,o=n.views,u=void 0===o?[]:o,f=n.schema,s=void 0===f?S:f,c=n.requestError,a=n.timeout,h=void 0===a?2e3:a,v=n.cacheIgnore,d=void 0!==v&&v,m=n.prefetchIgnore,p=void 0!==m&&m,w=n.preventRunning,b=void 0!==w&&w,y=n.prevent,P=void 0===y?null:y,g=n.debug,E=n.logLevel;if(l.setLevel(!0===(void 0!==g&&g)?"debug":void 0===E?"off":E),this.logger.info(this.version),Object.keys(s).forEach((function(t){S[t]&&(S[t]=s[t])})),this.$=c,this.timeout=h,this.cacheIgnore=d,this.prefetchIgnore=p,this.preventRunning=b,this._=this.dom.getWrapper(),!this._)throw new Error("[@barba/core] No Barba wrapper found");this._.setAttribute("aria-live","polite"),this.q();var x=this.data.current;if(!x.container)throw new Error("[@barba/core] No Barba container found");if(this.cache=new G(d),this.prevent=new et(p),this.transitions=new ut(i),this.views=new ft(u),null!==P){if("function"!=typeof P)throw new Error("[@barba/core] Prevent should be a function");this.prevent.add("preventCustom",P)}this.history.init(x.url.href,x.namespace),this.B=this.B.bind(this),this.U=this.U.bind(this),this.D=this.D.bind(this),this.F(),this.plugins.forEach((function(t){return t.init()}));var k=this.data;k.trigger="barba",k.next=k.current,k.current=r({},this.schemaPage),this.hooks.do("ready",k),this.once(k),this.q()},e.destroy=function(){this.q(),this.H(),this.history.clear(),this.hooks.clear(),this.plugins=[]},e.force=function(t){window.location.assign(t)},e.go=function(t,n,r){var e;if(void 0===n&&(n="barba"),this.transitions.isRunning)this.force(t);else if(!(e="popstate"===n?this.history.current&&this.url.getPath(this.history.current.url)===this.url.getPath(t):this.prevent.run("sameUrl",null,null,t))||this.transitions.hasSelf)return n=this.history.change(t,n,r),r&&(r.stopPropagation(),r.preventDefault()),this.page(t,n,e)},e.once=function(t){try{var n=this;return Promise.resolve(n.hooks.do("beforeEnter",t)).then((function(){function r(){return Promise.resolve(n.hooks.do("afterEnter",t)).then((function(){}))}var e=function(){if(n.transitions.hasOnce){var r=n.transitions.get(t,{once:!0});return Promise.resolve(n.transitions.doOnce({transition:r,data:t})).then((function(){}))}}();return e&&e.then?e.then(r):r()}))}catch(t){return Promise.reject(t)}},e.page=function(t,n,e){try{var i=function(){var t=o.data;return Promise.resolve(o.hooks.do("page",t)).then((function(){var n=s((function(){var n=o.transitions.get(t,{once:!1,self:e});return Promise.resolve(o.transitions.doPage({data:t,page:u,transition:n,wrapper:o._})).then((function(){o.q()}))}),(function(){0===l.getLevel()&&o.force(t.current.url.href)}));if(n&&n.then)return n.then((function(){}))}))},o=this;o.data.next.url=r({href:t},o.url.parse(t)),o.data.trigger=n;var u=o.cache.has(t)?o.cache.update(t,{action:"click"}).request:o.cache.set(t,o.request(t,o.timeout,o.onRequestError.bind(o,n)),"click").request,f=function(){if(o.transitions.shouldWait)return Promise.resolve(L(u,o.data)).then((function(){}))}();return Promise.resolve(f&&f.then?f.then(i):i())}catch(t){return Promise.reject(t)}},e.onRequestError=function(t){this.transitions.isRunning=!1;for(var n=arguments.length,r=new Array(n>1?n-1:0),e=1;e<n;e++)r[e-1]=arguments[e];var i=r[0],o=r[1],u=this.cache.getAction(i);return this.cache.delete(i),!(this.$&&!1===this.$(t,u,i,o)||("click"===u&&this.force(i),1))},e.prefetch=function(t){var n=this;this.cache.has(t)||this.cache.set(t,this.request(t,this.timeout,this.onRequestError.bind(this,"barba")).catch((function(t){n.logger.error(t)})),"prefetch")},e.F=function(){!0!==this.prefetchIgnore&&(document.addEventListener("mouseover",this.B),document.addEventListener("touchstart",this.B)),document.addEventListener("click",this.U),window.addEventListener("popstate",this.D)},e.H=function(){!0!==this.prefetchIgnore&&(document.removeEventListener("mouseover",this.B),document.removeEventListener("touchstart",this.B)),document.removeEventListener("click",this.U),window.removeEventListener("popstate",this.D)},e.B=function(t){var n=this,r=this.I(t);if(r){var e=this.dom.getHref(r);this.prevent.checkHref(e)||this.cache.has(e)||this.cache.set(e,this.request(e,this.timeout,this.onRequestError.bind(this,r)).catch((function(t){n.logger.error(t)})),"enter")}},e.U=function(t){var n=this.I(t);if(n)return this.transitions.isRunning&&this.preventRunning?(t.preventDefault(),void t.stopPropagation()):void this.go(this.dom.getHref(n),n,t)},e.D=function(t){this.go(this.url.getHref(),"popstate",t)},e.I=function(t){for(var n=t.target;n&&!this.dom.getHref(n);)n=n.parentNode;if(n&&!this.prevent.checkLink(n,t,this.dom.getHref(n)))return n},e.q=function(){var t=this.url.getHref(),n={container:this.dom.getContainer(),html:this.dom.getHtml(),namespace:this.dom.getNamespace(),url:r({href:t},this.url.parse(t))};this.C={current:n,next:r({},this.schemaPage),trigger:void 0},this.hooks.do("reset",this.data)},n(t,[{key:"data",get:function(){return this.C}},{key:"wrapper",get:function(){return this._}}]),t}())}));
//# sourceMappingURL=barba.umd.js.map


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,i){ true?module.exports=i():"function"==typeof define&&define.amd?define(i):(t=t||self).barbaCss=i()}(this,function(){var t="2.1.15";return new(function(){function i(){this.name="@barba/css",this.version=t,this.prefix="barba",this.callbacks={},this.t=!1}var n=i.prototype;return n.install=function(t){this.logger=new t.Logger(this.name),this.logger.info(this.version),this.barba=t,this.i=this.i.bind(this),this.s=this.s.bind(this),this.h=this.h.bind(this)},n.init=function(){this.barba.hooks.before(this.o,this),this.barba.hooks.beforeOnce(this.o,this),this.barba.hooks.beforeOnce(this.u,this),this.barba.hooks.afterOnce(this.m,this),this.barba.hooks.beforeLeave(this.P,this),this.barba.hooks.afterLeave(this.v,this),this.barba.hooks.beforeEnter(this.l,this),this.barba.hooks.afterEnter(this.p,this),this.barba.transitions.once=this.i,this.barba.transitions.leave=this.s,this.barba.transitions.enter=this.h,this.barba.transitions.store.all.unshift({name:"barba",once:function(){},leave:function(){},enter:function(){}}),this.barba.transitions.store.update()},n.start=function(t,i){try{var n=this;return n.add(t,i),Promise.resolve(n.barba.helpers.nextTick()).then(function(){return n.add(t,i+"-active"),Promise.resolve(n.barba.helpers.nextTick()).then(function(){})})}catch(t){return Promise.reject(t)}},n.next=function(t,i){try{var n=this;return n.t=n.g(t),Promise.resolve(n.t?new Promise(function(r){try{return n.cb=r,n.callbacks[i]=r,t.addEventListener("transitionend",r,!1),Promise.resolve(n.barba.helpers.nextTick()).then(function(){return n.remove(t,i),n.add(t,i+"-to"),Promise.resolve(n.barba.helpers.nextTick()).then(function(){})})}catch(t){return Promise.reject(t)}}):(n.remove(t,i),Promise.resolve(n.barba.helpers.nextTick()).then(function(){return n.add(t,i+"-to"),Promise.resolve(n.barba.helpers.nextTick()).then(function(){})})))}catch(t){return Promise.reject(t)}},n.end=function(t,i){try{return this.remove(t,i+"-to"),this.remove(t,i+"-active"),t.removeEventListener("transitionend",this.callbacks[i]),this.t=!1,Promise.resolve()}catch(t){return Promise.reject(t)}},n.add=function(t,i){t.classList.add(this.prefix+"-"+i)},n.remove=function(t,i){t.classList.remove(this.prefix+"-"+i)},n.o=function(t,i){this.prefix=i.name||"barba"},n.g=function(t){return"0s"!==getComputedStyle(t).transitionDuration},n.u=function(t){return this.start(t.next.container,"once")},n.i=function(t,i){try{var n=this;return Promise.resolve(n.barba.hooks.do("once",t,i)).then(function(){return n.next(t.next.container,"once")})}catch(t){return Promise.reject(t)}},n.m=function(t){return this.end(t.next.container,"once")},n.P=function(t){return this.start(t.current.container,"leave")},n.s=function(t,i){try{var n=this;return Promise.resolve(n.barba.hooks.do("leave",t,i)).then(function(){return n.next(t.current.container,"leave")})}catch(t){return Promise.reject(t)}},n.v=function(t){return this.end(t.current.container,"leave"),this.barba.transitions.remove(t),Promise.resolve()},n.l=function(t){return 1===this.barba.history.size?Promise.resolve():this.start(t.next.container,"enter")},n.h=function(t,i){try{var n=this;return Promise.resolve(n.barba.hooks.do("enter",t,i)).then(function(){return n.next(t.next.container,"enter")})}catch(t){return Promise.reject(t)}},n.p=function(t){return 1===this.barba.history.size?Promise.resolve():this.end(t.next.container,"enter")},i}())});
//# sourceMappingURL=barba-css.umd.js.map


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__camelCase__ = __webpack_require__(6);


/**
 * DOM-based Routing
 *
 * Based on {@link http://goo.gl/EUTi53|Markup-based Unobtrusive Comprehensive DOM-ready Execution} by Paul Irish
 *
 * The routing fires all common scripts, followed by the page specific scripts.
 * Add additional events for more control over timing e.g. a finalize event
 */
var Router = function Router(routes) {
  this.routes = routes;
};

/**
 * Fire Router events
 * @param {string} route DOM-based route derived from body classes (`<body class="...">`)
 * @param {string} [event] Events on the route. By default, `init` and `finalize` events are called.
 * @param {string} [arg] Any custom argument to be passed to the event.
 */
Router.prototype.fire = function fire (route, event, arg) {
    if ( event === void 0 ) event = 'init';

  document.dispatchEvent(new CustomEvent('routed', {
    bubbles: true,
    detail: {
      route: route,
      fn: event,
    },
  }));

  var fire = route !== '' && this.routes[route] && typeof this.routes[route][event] === 'function';
  if (fire) {
    this.routes[route][event](arg);
  }
};

/**
 * Automatically load and fire Router events
 *
 * Events are fired in the following order:
 ** common init
 ** page-specific init
 ** page-specific finalize
 ** common finalize
 */
Router.prototype.loadEvents = function loadEvents () {
    var this$1 = this;

  // Fire common init JS
  this.fire('common');

  // Fire page-specific init JS, and then finalize JS
  document.body.className
    .toLowerCase()
    .replace(/-/g, '_')
    .split(/\s+/)
    .map(__WEBPACK_IMPORTED_MODULE_0__camelCase__["a" /* default */])
    .forEach(function (className) {
      this$1.fire(className);
      this$1.fire(className, 'finalize');
    });

  // Fire common finalize JS
  this.fire('common', 'finalize');
};

/* harmony default export */ __webpack_exports__["a"] = (Router);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * the most terrible camelizer on the internet, guaranteed!
 * @param {string} str String that isn't camel-case, e.g., CAMeL_CaSEiS-harD
 * @return {string} String converted to camel-case, e.g., camelCaseIsHard
 */
/* harmony default export */ __webpack_exports__["a"] = (function (str) { return ("" + (str.charAt(0).toLowerCase()) + (str.replace(/[\W_]/g, '|').split('|')
  .map(function (part) { return ("" + (part.charAt(0).toUpperCase()) + (part.slice(1))); })
  .join('')
  .slice(1))); });;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  init: function init() {
    // JavaScript to be fired on all pages
  },
  finalize: function finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
  },
});


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_typesplit__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_typesplit___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_typesplit__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_inView__ = __webpack_require__(10);



var SplitType = window.SplitType;

/* harmony default export */ __webpack_exports__["a"] = ({
  init: function init() {
    // JavaScript to be fired on the home page
  },
  finalize: function finalize() {
    // JavaScript to be fired on the home page, after the init JS

    console.log('home.js');

    new SplitType('.loading--title', { split: 'chars', tagName: 'span' });
    new SplitType('.home-projects .section-title', { split: 'chars', tagName: 'span' });

    Object(__WEBPACK_IMPORTED_MODULE_1__util_inView__["a" /* default */])('.home-about', 0.1);
    Object(__WEBPACK_IMPORTED_MODULE_1__util_inView__["a" /* default */])('.home-blog', 0.1);

    Object(__WEBPACK_IMPORTED_MODULE_1__util_inView__["a" /* default */])('.home-projects .section-title', 1);
    Object(__WEBPACK_IMPORTED_MODULE_1__util_inView__["a" /* default */])('.home-blog .section-title', 1);
    Object(__WEBPACK_IMPORTED_MODULE_1__util_inView__["a" /* default */])('.home-projects--project', 0.5);

    // Not in use, was for experimental project list layout
    // (function projectsIntersectionObserver() {
    //   let height = window.innerHeight;
    //   let targets = document.querySelectorAll('.home-projects--list li');
    //   if(targets.length) {
    //     let targetHeight = targets[0].clientHeight;
    //     let callback = function (entries) {
    //       entries.forEach(entry => {
    //         if(entry.intersectionRatio > 0.5) {
    //           entry.target.classList.add('active');
    //         }
    //         else{
    //           entry.target.classList.remove('active');
    //         }
    //       });
    //     }
    //
    //     let options = {
    //       rootMargin: `-${(height - targetHeight)/2}px 0px`,
    //       threshold: 0.5,
    //     }
    //     let observer = new IntersectionObserver(callback, options);
    //     targets.forEach(target => {
    //       observer.observe(target);
    //     });
    //   }
    // })();

  },
});


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * SplitType
 * A javascript utility that splits text into individual lines, words, and characters
 * so they can be animated and styled independently.
 * @updated: 6/6/2016
 * @author: Luke Peavey
 * @version: 1.0
 * @license MIT
 */


// Support module loaders
(function ( global, factory ) {
  if ( true ) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof exports !== 'undefined' ) {
    module.exports = factory();
  } else {
    factory();
  }
})( this, function factory() {
  window.SplitType = (function ( window, document, undefined ) {
    // Fail silently on ancient browsers ( IE <= 8 )
    if ( ! document.addEventListener || ! Function.prototype.bind ) return;

    'use strict';
    // global vars
    var DEBUG                 = false;
    var expando               = 'splitType' + (new Date() * 1);
    var cache                 = {};
    var uid                   = 0;
    var push                  = Array.prototype.push;
    var slice                 = Array.prototype.slice;
    var keys                  = Object.keys;
    var hasOwn                = Object.prototype.hasOwnProperty;
    var defineProperty        = Object.defineProperty;
    var defineProperties      = Object.defineProperties;
    var getPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var createFragment        = document.createDocumentFragment.bind( document );
    var createTextNode        = document.createTextNode.bind( document );

    /**
     * The global default settings used for all SplitType calls. Default
     * settings can be modified via the static 'defaults' property on the
     * SplitType constructor.
     * @private
     */
    var _defaults = {
      splitClass : '',
      lineClass  : 'line',
      wordClass  : 'word',
      charClass  : 'char',
      split      : 'lines, words, chars',
      position   : 'relative',
      absolute   : false, // alternate syntax for setting position.
      tagName    : 'div',
      DEBUG      : false,
    };


    /***********************
     - Utility Functions -
     ***********************/
    function isObject( obj ) {
      return obj !== null && typeof obj === 'object';
    }

    function isArraylike( obj ) {
      return isObject( obj ) && typeof obj.length === 'number' && obj.length > 0; // returns false for empty arrays,
                                                                                  // which is fine for our purposes
    }

    function isPlainObject( obj ) {
      return isObject( obj ) && Object.prototype.toString.call( obj ) === '[object Object]';
    }

    function isNode( obj ) {
      return isObject( obj ) && /^(1|3|11)$/.test( obj.nodeType );
    }

    function isString( obj ) {
      return typeof obj === 'string';
    }

    /**
     * Iterates array, arraylike, and plain objects
     * NOTE: non-iterable objects gets passed through
     * @param object object|array - the array or object to iterate
     * @param callback function - a function to be executed once for each item in the array.
     * @param thisArg object - the context for the callback function
     */
    function forEach( object, callback, thisArg ) {
      var obj    = Object( object ); // the target object
      var values = isArraylike( obj ) ? obj : ( isPlainObject( obj ) ? keys( obj ) : [ obj ] ); // the values to
                                                                                                // traverse (see doc
                                                                                                // comment)
      var length = parseInt( values.length ) || 0; // the length of values
      var index  = 0; // index
      // Iterate through the values, execute the callback with three arguments:
      // 1) the current item 2) the current index 3) the object being traversed.
      for ( ; index < length; index ++ ) {
        callback.call( thisArg, values[ index ], index, obj );
      }
    }

    /**
     * Merges user options with default settings (shallow).
     * Returns a new object without modifying source objects.
     * Only keys that exist on target obj will be copied to the new object.
     * @note: non-writable properties on the target object will not be over-ridden
     * @returns object
     */
    function extend( target, object ) {
      target = Object( target );
      object = Object( object );
      return Object.getOwnPropertyNames( target ).reduce( function ( extended, key ) {
        return defineProperty( extended, key, getPropertyDescriptor( object, key ) || getPropertyDescriptor( target, key ) );
      }, {} )
    }

    /**
     * Associates arbitrary data with DOM nodes or other objects.
     * (shortened version of jquery's data method)
     * @param element object - the element for which data is being set or retrieved.
     * @param key string (optional) - the name of the data property to set or retrieve.
     * @param value mixed (optional) - Sets the value of the specified key. any type of data.
     */
    function Data( element, key, value ) {
      var data = {}, id;

      if ( isObject( element ) ) {
        id   = element[ expando ] || ( element[ expando ] = ++ uid );
        data = cache[ id ] || ( cache[ id ] = {} );
      }
      // Get data
      if ( value === undefined ) {
        if ( key === undefined ) {
          return data; // if no key or value is given, return the data store object
        }
        return data[ key ];
      }
      // Set data
      else if ( key !== undefined ) {
        data[ key ] = value;
        return value;
      }
    }

    // Remove all associated with the given element
    function RemoveData( element ) {
      var id = element && element[ expando ];
      if ( id ) {
        delete element[ id ]; // remove the id property from the element
        delete cache[ id ]; // delete the data store for the element from the cache
      }
    }

    /**
     * Create element with attributes
     * @param name {string} The name of the element to create
     * @param attributes {object} (optional) any html attribute, plus several DOM properties:
     * innerHTML, textContent, children (chilren takes an array and child nodes)
     * @returns elem
     */
    function createElement( name, attributes ) {
      var elem = document.createElement( name );

      if ( attributes === undefined ) {
        return elem;
      }
      // Handle attributes
      forEach( attributes, function ( name ) {
        var value = attributes[ name ];
        if ( value === null ) return;
        switch ( name ) {
          // 'text' sets the text content
          case 'textContent':
            elem.textContent = value;
            break;
          // 'html' sets the innerHTML
          case 'innerHTML':
            elem.innerHTML = value;
            break;
          // 'children' one or more child nodes to insert into the element - can be single node, nodelist, array
          case 'children':
            forEach( value, function ( child ) {
              isNode( child ) && elem.appendChild( child )
            } );
            break;
          // handle standard attributes
          default:
            elem.setAttribute( name, value );
        }
      } )
      return elem;
    }

    /**
     * Handles the target elements parameter.
     * Target elements can be passed into splitType in several different forms:
     * Selector string, element, array/nodelist/jquery object, deep array
     * This method converts those different formats into a plain array of elements.
     * @returns:  {array}  the target elements
     */
    function _processElements( elements ) {
      var elementsArray = [],
          selector, isId, ID, len, len2, i, k;
      // A. If elements is a selector string...
      // ==> If its a single ID selector, use getElementById (super fast)
      // ==> otherwise use querySelectorAll to find the set of matched elements.
      if ( isString( elements ) ) {
        selector = elements.trim();
        isId     = selector[ 0 ] === '#' && ! /[^\w]/.test( ID = selector.slice( 1 ) );
        elements = isId ? document.getElementById( ID ) : document.querySelectorAll( selector );
      }
      // B. if we're certain that elements is a single node or nodelist,
      // convert it to an array and return here.
      if ( selector || isNode( elements ) ) {
        return isNode( elements ) ? [ elements ] : slice.call( elements );
      }

      // if elements is an array or jquery/object...
      // flatten it if necessary, remove any non-element values, and return the result.
      if ( isArraylike( elements ) ) {
        for ( i = 0, len = elements.length; i < len; i ++ ) {
          if ( isArraylike( elements[ i ] ) ) {
            for ( k = 0, len2 = elements[ i ].length; k < len2; k ++ ) {
              if ( isNode( elements[ i ][ k ] ) ) {
                elementsArray.push( elements[ i ][ k ] );
              }
            }
          } else if ( isNode( elements[ i ] ) ) {
            elementsArray.push( elements[ i ] );
          }
        }
      }
      return elementsArray;
    }

    /**
     * Splits the text content of a single element using to the settings for the SplitType instance.
     * By "split", we mean the process of breaking down plain text into separate components
     * (lines, words, and characters) and wrapping each one in its own element.
     * There are three possible split types: lines, words, and characters. Each one is optional,
     * so text can be split into any combination of the three types.
     *
     * 'this' refers to the splitType instance from which this function was called.
     * @param element node - the target element for the split operation.
     */
    function _split( element ) {
      // Let o equal the settings for this SplitTypes instance.
      var settings   = this.settings,
          // the tag name for split text nodes
          TAG_NAME   = settings.tagName,
          // A unique string to tempNodeorarily replace <br> tags
          BR_SYMBOL  = 'B' + (new Date() * 1) + 'R',
          // The plain text content of the target element
          TEXT_CONTENT,
          // the split types to use (ie lines, words, characters)
          types      = settings.split,
          // (boolean) true if text is being split into lines
          splitLines = types.indexOf( 'lines' ) !== - 1,
          // (boolean) true if text is being split into words
          splitWords = types.indexOf( 'words' ) !== - 1,
          // (boolean) true if text is being split into characters
          splitChars = types.indexOf( 'chars' ) !== - 1,
          // (boolean) true if position is set to absolute
          isAbsolute = settings.position === 'absolute' || settings.absolute === true,
          // An empty element node
          tempNode   = createElement( 'div' ),
          // An array of the split lines in the current element
          lineNodes  = [],
          // An array of the split words in the current element
          wordNodes  = [],
          // An array of the split characters in the current element
          charNodes  = [],
          lineNode,
          wordNode,
          charNode,
          splitText;


      /*---------------------------------------
       SPLIT TEXT INTO WORDS AND CHARACTERS
       -----------------------------------------*/

      // 1. splitText is a wrapper to hold the HTML structure while its being built.
      splitText = splitLines ? createElement( 'div' ) : createFragment();

      // 2. Get the element's text content.
      //    temporarily replace <br> tags with a unique string before extracting text.
      tempNode.innerHTML = element.innerHTML.replace( /<br\s*\/?>/g, (' ' + BR_SYMBOL + ' ') );
      TEXT_CONTENT       = tempNode.textContent.replace( /\s+/g, ' ' ).trim(); // remove extra white space

      // 3. Iterate over each word in the text.
      //    Create an array of wrapped the word elements (wordNodes).
      //    WORD (string) refers to the current word in the loop.
      wordNodes = TEXT_CONTENT.split( ' ' ).map( function ( WORD ) {

        // a. If the current word is a symbol representing a br tag,
        //    append a <br> tag to splitText and continue to the next word
        if ( WORD === BR_SYMBOL ) {
          splitText.appendChild( createElement( 'br' ) );
          return null; // br tag is not added to the array of wordNodes
        }

        // b. If Splitting Text Into Characters...
        if ( splitChars ) {

          // i. Iterate through the characters in the current word
          //    CHAR (string) refers to the current character in the loop
          //    currentWordCharNodes is array of the wrapped character elements in this word
          var currentWordCharNodes = WORD.split( '' ).map( function ( CHAR ) {
            // Create an element to wrap the current character.
            charNode = createElement( TAG_NAME, {
              class       : settings.charClass + ' ' + settings.splitClass,
              style       : "display: inline-block;",
              textContent : CHAR
            } );
            return charNode;
          } );

          // ii. push the character nodes for this word to charNodes
          push.apply( charNodes, currentWordCharNodes );

        } // END IF;

        // c. If Splitting Text Into Words...
        if ( splitWords || splitLines ) {

          // i. Let wordNode be an element to wrap the current word.
          wordNode = createElement( TAG_NAME, {
            class       : ( settings.wordClass + ' ' + settings.splitClass ),
            style       : 'display: inline-block; position:' + ( splitWords ? 'relative' : 'static;' ),
            // It contains the character nodes, or the word (plain text).
            children    : splitChars ? currentWordCharNodes : null,
            textContent : ! splitChars ? WORD : null
          } );

          // ii. Append wordNode to splitText.
          splitText.appendChild( wordNode );

        } // END IF;

        // d. If NOT Splitting Words...
        else {
          // i. Append the character nodes directly to splitText.
          forEach( currentWordCharNodes, function ( charNode ) {
            splitText.appendChild( charNode );
          } )
        }

        // e. Add a space after the word.
        splitText.appendChild( createTextNode( ' ' ) );

        return wordNode;

      }, this ).filter( function ( el ) {
        return el
      } ); // remove any undefined/null entries from the array
      // end forEach

      // 4. Now remove the original contents of the target element and insert the split text.
      element.innerHTML = '';
      element.appendChild( splitText );

      // 5. Add the split words/chars in this element to the array of all split words/chars.
      push.apply( this.words, wordNodes );
      push.apply( this.chars, charNodes );

      // STOP HERE If not splitting text into lines or using absolute positioning
      if ( ! isAbsolute && ! splitLines ) {
        return;
      }

      /*---------------------------------
       GET STYLES AND POSITIONS
       ----------------------------------*/

      // There is no built-in way to detect natural line breaks in text (when a block of text
      // wraps to fit its container). So in order to split text into lines, we have to detect
      // line breaks by checking the top offset of words. This is why text was split into words
      // first. To apply absolute positioning, its also necessary to record the size and position
      // of every split node (lines, words, characters).

      // To consolidate DOM getting/settings, this is all done at the same time, before actually
      // splitting text into lines, which involves restructuring the DOM again.

      var lines = [],
          currentLine,
          lineOffsetY,
          lineHeight,
          contentBox,
          elementHeight,
          elementWidth,
          nodes,
          parent,
          nextsib,
          cs,
          align;

      // nodes is a live HTML collection of the nodes in this element
      nodes = Data( element ).nodes = element.getElementsByTagName( TAG_NAME );

      // Cache the element's parent and next sibling (for DOM removal).
      parent  = element.parentElement;
      nextsib = element.nextElementSibling;

      // get the computed style object for the element
      cs    = window.getComputedStyle( element );
      align = cs.textAlign;

      // If using absolute position...
      if ( isAbsolute ) {

        // Let contentBox be an object containing the width and offset position of the element's
        // content box (the area inside padding box). This is needed (for absolute positioning)
        // to set the width and position of line elements, which have not been created yet.
        contentBox = {
          left  : splitText.offsetLeft,
          top   : splitText.offsetTop,
          width : splitText.offsetWidth
        };

        // Let elementWidth and elementHeight equal the actual width/height of the element.
        // Also check if the element has inline height or width styles already set.
        // If it does, cache those values for later.
        elementWidth  = element.offsetWidth;
        elementHeight = element.offsetHeight;

        Data( element ).cssWidth  = element.style.width;
        Data( element ).cssHeight = element.style.height;
      }

      // 6. Iterate over every split text node
      forEach( nodes, function ( node ) {
        if ( node === splitText ) return;

        var isWord = node.parentElement === splitText;
        var wordOffsetY;
        // a. Detect line breaks by checking the top offset of word nodes.
        //    For each line, create an array (line) containing the words in that line.
        if ( splitLines && isWord ) {
          // wordOffsetY is the top offset of the current word.
          wordOffsetY = Data( node ).top = node.offsetTop;

          // If wordOffsetY is different than the value of lineOffsetY...
          // Then this word is the beginning of a new line.
          // Set lineOffsetY to value of wordOffsetY.
          // Create a new array (line) to hold the words in this line.
          if ( wordOffsetY !== lineOffsetY ) {
            lineOffsetY = wordOffsetY;
            lines.push( currentLine = [] );
          }

          // Add the current word node to the line array
          currentLine.push( node );
        }

        // b. Get the size and position of all split text nodes.
        if ( isAbsolute ) {
          // The values are stored using the data method
          // All split nodes have the same height (lineHeight). So its only retrieved once.
          // If offset top has already been cached (step 11 a) use the stored value.
          Data( node ).top    = wordOffsetY || node.offsetTop;
          Data( node ).left   = node.offsetLeft;
          Data( node ).width  = node.offsetWidth;
          Data( node ).height = lineHeight || ( lineHeight = node.offsetHeight );
        }

      } ) // END LOOP

      // 7. Remove the element from the DOM
      parent.removeChild( element );


      /*--------------------------------
       SPLIT LINES
       ----------------------------------*/

      if ( splitLines ) {

        // 8. Let splitText be a new document createFragment to hold the HTML structure.
        splitText = createFragment();

        // 9. Iterate over the arrays in lines (see 11 b)
        //     Let line be the array of words in the current line.
        //     Return an array of the wrapped line elements (lineNodes)
        lineNodes = lines.map( function ( line ) {

          // a. Create a new element (lineNode) to wrap the current line.
          //    Append lineNode to splitText.
          splitText.appendChild(
            lineNode = createElement( TAG_NAME, {
              class : settings.lineClass + ' ' + settings.splitClass,
              style : 'display: block; text-align:' + align + '; width: 100%;'
            } )
          );

          // b. store size/position values for the line element.
          if ( isAbsolute ) {
            Data( lineNode ).type   = 'line';
            Data( lineNode ).top    = Data( line[ 0 ] ).top; // the offset top of the first word in the line
            Data( lineNode ).height = lineHeight;
          }

          // c. Iterate over the word elements in the current line.
          //    wordNode refers to the current word in the loop.
          forEach( line, function ( wordNode ) {

            // i. If splitting text into words,
            // just append wordNode to the line element.
            if ( splitWords ) {
              lineNode.appendChild( wordNode );

              // ii. If NOT splitting into words...
              //     if splitting characters append the char nodes to the line element
            } else if ( splitChars ) {
              slice.call( wordNode.children ).forEach( function ( charNode ) {
                lineNode.appendChild( charNode );
              } )
            }
            // iii. If NOT splitting into words OR characters...
            //      append the plain text content of the word to the line element
            else {
              lineNode.appendChild( createTextNode( wordNode.textContent ) )
            }
            // iV. add a space after the word
            lineNode.appendChild( createTextNode( ' ' ) );
          } ) // END LOOP

          return lineNode;
        } ) // END LOOP

        // 10. Insert the new splitText
        element.replaceChild( splitText, element.firstChild );

        // 11. Add the split line elements to the array of all split lines
        push.apply( this.lines, lineNodes );
      }

      /*---------------------------------
       SET ABSOLUTE POSITION
       ----------------------------------*/

      // Apply absolute positioning to all split text elements (lines, words, and characters).
      // The size and relative position of split nodes has already been recorded. Now we use those
      // values to set each element to absolute position. However, positions were logged before
      // text was split into lines (step 13 - 15). So some values need to be recalcated to account
      // for the modified DOM structure.

      if ( isAbsolute ) {

        // 12. Set the width/height of the parent element, so it does not collapse when its
        //     child nodes are set to absolute position.
        element.style.width  = element.style.width || elementWidth + 'px';
        element.style.height = elementHeight + 'px';

        // 13. Iterate over all split nodes.
        //     Let node be current node in the loop
        forEach( nodes, function ( node ) {

          // a. Let isLine be true if the current node is a line element
          //    Let isLineChild be true if the current node is a direct child of a line element.
          var isLine      = Data( node ).type === 'line';
          var isLineChild = ! isLine && Data( node.parentElement ).type === 'line';

          // b. Set the top position of the current node.
          //    If its a line node, we use the top offset of its first child (see step 14 b)
          //    If its the child of line node, then its top offset is zero
          node.style.top = isLineChild ? 0 : Data( node ).top + 'px';

          // c. Set the left position of the current node.
          //    If its a line node, this this is equal to the left offset of contentBox (step 9).
          //    If its the child of a line node, the cached valued must be recalculated so its
          //    relative to the line node (which didn't exist when value was initially checked).
          // NOTE: the value is recalculated without querying the DOM again
          node.style.left = isLine ? (contentBox.left + 'px') :
          ( isLineChild ? ( Data( node ).left - contentBox.left ) :
            Data( node ).left ) + 'px';

          // d. Set the height of the current node to the cached value.
          node.style.height = Data( node ).height + 'px';

          // e. Set the width of the current node.
          //    If its a line element, width is equal to the width of the contentBox (see step 9).
          node.style.width = isLine ? (contentBox.width + 'px') : Data( node ).width + 'px';

          // f. Finally, set the node's position to absolute.
          node.style.position = 'absolute';
        } )
      } // end if;

      // 14. Re-attach the element to the DOM
      if ( nextsib ) parent.insertBefore( element, nextsib );
      else parent.appendChild( element );

    } // End Function

    /***************************
     SplitType Constructor
     ***************************/

    function SplitType( elements, options ) {
      // Allow the SplitType constructor to be called without 'new'
      if ( ! ( this instanceof SplitType ) ) {
        return new SplitType( elements, options );
      }
      this.isSplit  = false;
      // Merge options with defaults
      this.settings = extend( _defaults, options );
      // Prepare target elements
      this.elements = _processElements( elements );

      if ( this.elements.length ) {
        // Store the original HTML content of each target element
        this.originals = this.elements.map( function ( element ) {
          return ( Data( element ).html = Data( element ).html || element.innerHTML );
        } );

        // Initiate the split operation.
        this.split();
      }
    }


    /*********************************
     PUBLIC PROPERTIES AND METHODS
     *********************************/

    /**
     * SplitType.defaults
     * A public property on the global SplitType object that allows users to access or modify the
     * default settings. Multiple settings can be changed at once by assigning an object to
     * SplitType.defaults containing the settings you wish to change. This will merge the new settings
     * with the internal _defaults object, not overwrite it.
     * To access the current settings: SplitType.defaults
     * To modify settings: SplitType.defaults = {setting1: 'new value', setting2: 'new value'}
     * @public
     * @static
     */
    defineProperty( SplitType, 'defaults', {
      get : function () {
        return _defaults;
      },
      set : function ( object ) {
        _defaults = extend( _defaults, object );
      }
    } );

    /**
     * instance.split()
     * Splits text in the target elements. This method gets called automatically when a new SplitType
     * instance is created. The method can also be called manually to re-split text with new options.
     * @param newOptions: (object) modifies the settings for the splitType instance.
     * @public
     */
    SplitType.prototype.split = function split( newOptions ) {
      // If any of the target elements have already been split,
      // revert them back to their original content before splitting them.
      this.revert();

      // Create arrays to hold the split lines, words, and characters for this instance.
      // These are public properties which can be accessed on the SplitType instance.
      this.lines = [];
      this.words = [];
      this.chars = [];

      // cache vertical scroll position before splitting
      var scrollPos = [ window.pageXoffset, window.pageYoffset ];

      // If new options were passed into the split() method, update settings for the instance.
      if ( newOptions !== undefined ) {
        this.settings = extend( this.settings, newOptions );
      }

      // Call the _split function to split the text in each target element
      forEach( this.elements, function ( element ) {
        _split.call( this, element );
        Data( element ).isSplit = true; // Set isSplit to true for this element.
      }, this );

      // Set isSplit to true for the SplitType instance
      this.isSplit = true;

      // Set scroll position to cached value.
      window.scrollTo.apply( window, scrollPos );

      // Clear data Cache
      forEach( this.elements, function ( element ) {
        var nodes = Data( element ).nodes || [];
        for ( var i = 0, len = nodes.length; i < len; i ++ ) {
          RemoveData( nodes[ i ] );
        }
      } )
    }

    /**
     * revert
     * Reverts the target elements back to their original html content.
     * @public
     */
    SplitType.prototype.revert = function revert() {
      // Delete the arrays of split text elements from the SplitType instance.
      // @NOTE: these properties are non-writable, that is why they have to be
      // deleted instead of just setting their value to null.
      if ( this.isSplit ) {
        this.lines = this.words = this.chars = null;
      }

      // Remove split text from target elements and restore original content
      forEach( this.elements, function ( elem ) {
        if ( Data( elem ).isSplit && Data( elem ).html ) {
          elem.innerHTML    = Data( elem ).html;
          elem.style.height = Data( elem ).cssHeight || '';
          elem.style.width  = Data( elem ).cssWidth || '';
          this.isSplit      = false;
        }
      }, this );
    }
    return SplitType;
  })( window, document )
} )

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Use intersection observer to detect when an element is in view
 */
/* harmony default export */ __webpack_exports__["a"] = (function (elem,threshold,rootMargin) {

  if(!(elem instanceof Element || elem instanceof HTMLDocument)) {
    elem = document.querySelectorAll(elem);
  }

  if(!elem) { return; }

  var callback = function (entries) {
    entries.forEach(function (entry) {
      if(entry.intersectionRatio >= options.threshold) {
        entry.target.classList.add('in-view');
      }
    });
  };

  var options = {
    rootMargin: rootMargin || '0px 0px',
    threshold: threshold,
  }

  var observer = new IntersectionObserver(callback, options);
  elem.forEach(function (elem) {
    observer.observe(elem);
  });
});


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// import 'typesplit';

// const SplitType = window.SplitType;

/* harmony default export */ __webpack_exports__["a"] = ({
  init: function init() {
    // JavaScript to be fired on the home page
  },
  finalize: function finalize() {
    // JavaScript to be fired on the home page, after the init JS
    // new SplitType('.entry-header--title', { split: 'words,chars', tagName: 'span' });
  },
});


/***/ }),
/* 12 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map