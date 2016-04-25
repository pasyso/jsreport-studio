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

	var _regenerator = __webpack_require__(1);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator2 = __webpack_require__(2);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _PermissionProperties = __webpack_require__(3);

	var _PermissionProperties2 = _interopRequireDefault(_PermissionProperties);

	var _jsreportStudio = __webpack_require__(11);

	var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_jsreportStudio2.default.initializeListeners.push((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
	  return _regenerator2.default.wrap(function _callee$(_context) {
	    while (1) {
	      switch (_context.prev = _context.next) {
	        case 0:
	          if (_jsreportStudio2.default.authentication) {
	            _jsreportStudio2.default.properties.push(_PermissionProperties2.default);
	          }

	        case 1:
	        case 'end':
	          return _context.stop();
	      }
	    }
	  }, _callee, undefined);
	})));

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['regenerator'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['helpers/asyncToGenerator'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _keys = __webpack_require__(4);

	var _keys2 = _interopRequireDefault(_keys);

	var _getPrototypeOf = __webpack_require__(5);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(6);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(7);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(8);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(9);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(10);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PermissionProperties = function (_Component) {
	  (0, _inherits3.default)(PermissionProperties, _Component);

	  function PermissionProperties() {
	    (0, _classCallCheck3.default)(this, PermissionProperties);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(PermissionProperties).apply(this, arguments));
	  }

	  (0, _createClass3.default)(PermissionProperties, [{
	    key: 'selectUsers',
	    value: function selectUsers(entities) {
	      return (0, _keys2.default)(entities).filter(function (k) {
	        return entities[k].__entitySet === 'users' && !entities[k].__isNew;
	      }).map(function (k) {
	        return entities[k];
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var entity = _props.entity;
	      var entities = _props.entities;
	      var _onChange = _props.onChange;

	      var users = this.selectUsers(entities);

	      if (entity.__entitySet === 'users') {
	        return _react2.default.createElement('div', null);
	      }

	      var selectValues = function selectValues(el) {
	        var res = [];
	        for (var i = 0; i < el.options.length; i++) {
	          if (el.options[i].selected) {
	            res.push(el.options[i].value);
	          }
	        }

	        return res;
	      };

	      return _react2.default.createElement(
	        'div',
	        { className: 'properties-section' },
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'read permissions'
	          ),
	          _react2.default.createElement(
	            'select',
	            {
	              multiple: true, value: entity.readPermissions || [],
	              onChange: function onChange(v) {
	                return _onChange({ _id: entity._id, readPermissions: selectValues(v.target) });
	              } },
	            users.map(function (e) {
	              return _react2.default.createElement(
	                'option',
	                { key: e._id, value: e._id },
	                e.username
	              );
	            })
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'write permissions'
	          ),
	          _react2.default.createElement(
	            'select',
	            {
	              multiple: true, value: entity.writePermissions || [],
	              onChange: function onChange(v) {
	                return _onChange({ _id: entity._id, writePermissions: selectValues(v.target) });
	              } },
	            users.map(function (e) {
	              return _react2.default.createElement(
	                'option',
	                { key: e._id, value: e._id },
	                e.username
	              );
	            })
	          )
	        )
	      );
	    }
	  }]);
	  return PermissionProperties;
	}(_react.Component);

	exports.default = PermissionProperties;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['core-js/object/keys'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['core-js/object/get-prototype-of'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['helpers/classCallCheck'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['helpers/createClass'];

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['helpers/possibleConstructorReturn'];

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['helpers/inherits'];

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = Studio.libraries['react'];

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = Studio;

/***/ }
/******/ ]);