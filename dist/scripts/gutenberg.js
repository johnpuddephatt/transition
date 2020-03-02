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
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ({

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(19);
module.exports = __webpack_require__(20);


/***/ }),

/***/ 19:
/***/ (function(module, exports) {

wp.domReady( function() {

  wp.data.dispatch( 'core/edit-post').removeEditorPanel( 'taxonomy-panel-category' ) ;
  wp.data.dispatch( 'core/edit-post').removeEditorPanel( 'taxonomy-panel-post_tag' );
  wp.data.dispatch( 'core/edit-post').removeEditorPanel( 'discussion-panel' );

  wp.blocks.unregisterBlockType( 'core/verse' );
  wp.blocks.unregisterBlockType( 'core/cover' );
  wp.blocks.unregisterBlockType( 'core/more' );
  wp.blocks.unregisterBlockType( 'core/code' );
  wp.blocks.unregisterBlockType( 'core/nextpage' );
  wp.blocks.unregisterBlockType( 'core/preformatted' );
  wp.blocks.unregisterBlockType( 'core/html' );
  wp.blocks.unregisterBlockType( 'core/embed' );
  wp.blocks.unregisterBlockType( 'core/archives' );
  wp.blocks.unregisterBlockType( 'core/categories' );
  wp.blocks.unregisterBlockType( 'core/calendar' );
  wp.blocks.unregisterBlockType( 'core/tag-cloud' );
  wp.blocks.unregisterBlockType( 'core/rss' );
  wp.blocks.unregisterBlockType( 'core/search' );
  wp.blocks.unregisterBlockType( 'core/shortcode' );
  wp.blocks.unregisterBlockType( 'core/latest-posts' );
  wp.blocks.unregisterBlockType( 'core/latest-comments' );
  wp.blocks.unregisterBlockType( 'core/spacer' );

  wp.blocks.unregisterBlockStyle( 'core/quote', 'default' );
  wp.blocks.unregisterBlockStyle( 'core/image', 'circle-mask' );
  wp.blocks.unregisterBlockStyle( 'core/pullquote', 'solid-color' );

  wp.blocks.registerBlockStyle( 'core/paragraph', {
      name: 'two-columns',
      label: 'Two columns',
  } );

  wp.blocks.registerBlockStyle( 'core/image', {
      name: 'full-width',
      label: 'Full width',
  } );

});


/***/ }),

/***/ 20:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });
//# sourceMappingURL=gutenberg.js.map