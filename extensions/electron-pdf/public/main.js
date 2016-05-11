/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Properties = __webpack_require__(1);
	
	var _Properties2 = _interopRequireDefault(_Properties);
	
	var _jsreportStudio = __webpack_require__(9);
	
	var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_jsreportStudio2.default.addPropertiesComponent('electron-pdf', _Properties2.default, function (entity) {
	  return entity.__entitySet === 'templates' && entity.recipe === 'electron-pdf';
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assign = __webpack_require__(2);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _getPrototypeOf = __webpack_require__(3);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(4);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(5);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(6);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(7);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(8);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _jsreportStudio = __webpack_require__(9);
	
	var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Properties = function (_Component) {
	  (0, _inherits3.default)(Properties, _Component);
	
	  function Properties() {
	    (0, _classCallCheck3.default)(this, Properties);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Properties).apply(this, arguments));
	  }
	
	  (0, _createClass3.default)(Properties, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var entity = _props.entity;
	      var onChange = _props.onChange;
	
	      var electron = entity.electron || {};
	
	      var change = function change(_change) {
	        return onChange((0, _assign2.default)({}, entity, { electron: (0, _assign2.default)({}, entity.electron, _change) }));
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
	            'Margin type'
	          ),
	          _react2.default.createElement(
	            'select',
	            { value: electron.marginsType || 0, onChange: function onChange(v) {
	                return change({ marginsType: parseInt(v.target.value) });
	              } },
	            _react2.default.createElement(
	              'option',
	              { key: '0', value: '0' },
	              'Default'
	            ),
	            _react2.default.createElement(
	              'option',
	              { key: '1', value: '1' },
	              'None'
	            ),
	            _react2.default.createElement(
	              'option',
	              { key: '2', value: '2' },
	              'Minimum'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Paper format'
	          ),
	          _react2.default.createElement(
	            'select',
	            { value: electron.format || '', onChange: function onChange(v) {
	                return change({ format: v.target.value });
	              } },
	            _react2.default.createElement(
	              'option',
	              { key: 'A4', value: 'A4' },
	              'A4'
	            ),
	            _react2.default.createElement(
	              'option',
	              { key: 'A3', value: 'A3' },
	              'A3'
	            ),
	            _react2.default.createElement(
	              'option',
	              { key: 'Legal', value: 'Legal' },
	              'Legal'
	            ),
	            _react2.default.createElement(
	              'option',
	              { key: 'Letter', value: 'Letter' },
	              'Letter'
	            ),
	            _react2.default.createElement(
	              'option',
	              { key: 'Tabloid', value: 'Tabloid' },
	              'Tabloid'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Web Page width'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text', placeholder: '600', value: electron.width || '',
	            onChange: function onChange(v) {
	              return electron({ width: v.target.value });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Web Page height'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text', placeholder: '600', value: electron.height || '',
	            onChange: function onChange(v) {
	              return electron({ height: v.target.value });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Orientation'
	          ),
	          _react2.default.createElement(
	            'select',
	            { value: electron.landscape + '', onChange: function onChange(v) {
	                return change({ landscape: v.target.value === 'true' });
	              } },
	            _react2.default.createElement(
	              'option',
	              { key: 'false', value: 'false' },
	              'Portrait'
	            ),
	            _react2.default.createElement(
	              'option',
	              { key: 'true', value: 'true' },
	              'Landscape'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Print background'
	          ),
	          _react2.default.createElement('input', {
	            type: 'checkbox', checked: electron.printBackground === true,
	            onChange: function onChange(v) {
	              return change({ printBackground: v.target.checked });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Print delay'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text', placeholder: '800', value: electron.printDelay || '',
	            onChange: function onChange(v) {
	              return change({ printDelay: v.target.value });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            { title: 'window.JSREPORT_READY_TO_START=true;' },
	            'Wait for printing trigger'
	          ),
	          _react2.default.createElement('input', {
	            type: 'checkbox', title: 'window.JSREPORT_READY_TO_START=true;', checked: electron.waitForJS === true,
	            onChange: function onChange(v) {
	              return change({ waitForJS: v.target.checked });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Block javascript'
	          ),
	          _react2.default.createElement('input', {
	            type: 'checkbox', checked: electron.blockJavaScript === true,
	            onChange: function onChange(v) {
	              return change({ blockJavaScript: v.target.checked });
	            } })
	        )
	      );
	    }
	  }]);
	  return Properties;
	}(_react.Component);

	exports.default = Properties;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['core-js/object/assign'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['core-js/object/get-prototype-of'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['helpers/classCallCheck'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['helpers/createClass'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['helpers/possibleConstructorReturn'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['helpers/inherits'];

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = Studio.libraries['react'];

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = Studio;

/***/ }
/******/ ]);