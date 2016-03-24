/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _List = __webpack_require__(1);

	var _List2 = _interopRequireDefault(_List);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	studio.routes.push({
	  path: '/studio/scripts',
	  component: _List2.default
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(2);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(4);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(5);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(6);

	var _inherits3 = _interopRequireDefault(_inherits2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = studio.react;
	var Component = studio.react.Component;

	var List = function (_Component) {
	  (0, _inherits3.default)(List, _Component);

	  function List() {
	    (0, _classCallCheck3.default)(this, List);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(List).apply(this, arguments));
	  }

	  (0, _createClass3.default)(List, [{
	    key: "render",
	    value: function render() {
	      return React.createElement(
	        "div",
	        null,
	        "Scripts"
	      );
	    }
	  }]);
	  return List;
	}(Component);

	exports.default = List;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = studio.runtime['core-js/object/get-prototype-of'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = studio.runtime['helpers/classCallCheck'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = studio.runtime['helpers/createClass'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = studio.runtime['helpers/possibleConstructorReturn'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = studio.runtime['helpers/inherits'];

/***/ }
/******/ ]);