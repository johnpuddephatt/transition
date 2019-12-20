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
module.exports = __webpack_require__(9);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_Router__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__routes_common__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__routes_home__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__routes_about__ = __webpack_require__(8);
// import external dependencies
__webpack_require__(2);

// Import everything from autoload


// import local dependencies





/** Populate Router instance with DOM routes */
var routes = new __WEBPACK_IMPORTED_MODULE_0__util_Router__["a" /* default */]({
  // All pages
  common: __WEBPACK_IMPORTED_MODULE_1__routes_common__["a" /* default */],
  // Home page
  home: __WEBPACK_IMPORTED_MODULE_2__routes_home__["a" /* default */],
  // About Us page, note the change from about-us to aboutUs.
  aboutUs: __WEBPACK_IMPORTED_MODULE_3__routes_about__["a" /* default */],
});

// Load Events
document.addEventListener('DOMContentLoaded', function (){ return routes.loadEvents(); });


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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__camelCase__ = __webpack_require__(4);


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
/* 4 */
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
/* 5 */
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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__(7);

var SplitType = window.SplitType;

/* harmony default export */ __webpack_exports__["a"] = ({
  init: function init() {
    // JavaScript to be fired on the home page

  },
  finalize: function finalize() {
    // JavaScript to be fired on the home page, after the init JS
    new SplitType('.loading--title', { split: 'chars', tagName: 'span' });

    (function aboutIntersectionObserver() {
      var callback = function (entries) {
        entries.forEach(function (entry) {
          if(entry.intersectionRatio > 0) {
            entry.target.classList.add('in-view');
          }
        });
      };
      var options = {
        // rootMargin: '0px 0px',
        threshold: 0.1,
      }
      var observer = new IntersectionObserver(callback, options);
      var target = document.querySelector('.home-about');
      observer.observe(target);
    })();

    (function projectsIntersectionObserver() {
      var height = window.innerHeight;
      var targets = document.querySelectorAll('.home-projects--list li');
      var targetHeight = targets[0].clientHeight;
      var callback = function (entries) {
        entries.forEach(function (entry) {
          if(entry.intersectionRatio > 0.5) {
            entry.target.classList.add('active');
          }
          else{
            entry.target.classList.remove('active');
          }
        });
      };

      var options = {
        rootMargin: ("-" + ((height - targetHeight)/2) + "px 0px"),
        threshold: 0.5,
      }
      var observer = new IntersectionObserver(callback, options);
      targets.forEach(function (target) {
        observer.observe(target);
      });

    })();



    // let heroSplit = new SplitType('.loading--title', { split: 'words,chars', tagName: 'span' });
    // window.addEventListener('resize', ()=>{
    //   heroSplit.revert();
    //   new SplitType('.loading--title', { split: 'words,chars', tagName: 'span' });
    // });
  },
});


/***/ }),
/* 7 */
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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  init: function init() {
    // JavaScript to be fired on the about us page
  },
});


/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map