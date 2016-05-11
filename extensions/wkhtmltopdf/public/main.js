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
	
	var _WKEditor = __webpack_require__(1);
	
	var _WKEditor2 = _interopRequireDefault(_WKEditor);
	
	var _WKProperties = __webpack_require__(11);
	
	var _WKProperties2 = _interopRequireDefault(_WKProperties);
	
	var _WKTitle = __webpack_require__(13);
	
	var _WKTitle2 = _interopRequireDefault(_WKTitle);
	
	var _constants = __webpack_require__(12);
	
	var Constants = _interopRequireWildcard(_constants);
	
	var _jsreportStudio = __webpack_require__(10);
	
	var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_jsreportStudio2.default.addPropertiesComponent('wkhtmltopdf', _WKProperties2.default, function (entity) {
	  return entity.__entitySet === 'templates' && entity.recipe === 'wkhtmltopdf';
	});
	
	_jsreportStudio2.default.addEditorComponent(Constants.WK_TAB_EDITOR, _WKEditor2.default);
	_jsreportStudio2.default.addTabTitleComponent(Constants.WK_TAB_TITLE, _WKTitle2.default);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _defineProperty2 = __webpack_require__(2);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _assign = __webpack_require__(3);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _getPrototypeOf = __webpack_require__(4);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(5);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(7);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(8);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _jsreportStudio = __webpack_require__(10);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var DataEditor = function (_Component) {
	  (0, _inherits3.default)(DataEditor, _Component);
	
	  function DataEditor() {
	    (0, _classCallCheck3.default)(this, DataEditor);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(DataEditor).apply(this, arguments));
	  }
	
	  (0, _createClass3.default)(DataEditor, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var entity = _props.entity;
	      var _onUpdate = _props.onUpdate;
	      var tab = _props.tab;
	
	
	      return _react2.default.createElement(_jsreportStudio.TextEditor, {
	        name: entity._id + '_wk' + tab.headerOrFooter,
	        mode: 'handlebars',
	        value: entity.wkhtmltopdf ? entity.wkhtmltopdf[tab.headerOrFooter] : '',
	        onUpdate: function onUpdate(v) {
	          return _onUpdate((0, _assign2.default)({}, entity, { wkhtmltopdf: (0, _assign2.default)({}, entity.wkhtmltopdf, (0, _defineProperty3.default)({}, tab.headerOrFooter, v)) }));
	        }
	      });
	    }
	  }]);
	  return DataEditor;
	}(_react.Component);
	
	DataEditor.propTypes = {
	  entity: _react2.default.PropTypes.object.isRequired,
	  tab: _react2.default.PropTypes.object.isRequired,
	  onUpdate: _react2.default.PropTypes.func.isRequired
	};
	exports.default = DataEditor;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['helpers/defineProperty'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['core-js/object/assign'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['core-js/object/get-prototype-of'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['helpers/classCallCheck'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['helpers/createClass'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['helpers/possibleConstructorReturn'];

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['helpers/inherits'];

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = Studio.libraries['react'];

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = Studio;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assign = __webpack_require__(3);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _getPrototypeOf = __webpack_require__(4);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(5);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(7);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(8);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _constants = __webpack_require__(12);
	
	var Constants = _interopRequireWildcard(_constants);
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _jsreportStudio = __webpack_require__(10);
	
	var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Properties = function (_Component) {
	  (0, _inherits3.default)(Properties, _Component);
	
	  function Properties() {
	    (0, _classCallCheck3.default)(this, Properties);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Properties).apply(this, arguments));
	  }
	
	  (0, _createClass3.default)(Properties, [{
	    key: 'openHeaderFooter',
	    value: function openHeaderFooter(type) {
	      _jsreportStudio2.default.openTab({
	        key: this.props.entity._id + '_wk' + type,
	        _id: this.props.entity._id,
	        headerOrFooter: type,
	        editorComponentKey: Constants.WK_TAB_EDITOR,
	        titleComponentKey: Constants.WK_TAB_TITLE
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var _props = this.props;
	      var entity = _props.entity;
	      var onChange = _props.onChange;
	
	      var wkhtmltopdf = entity.wkhtmltopdf || {};
	
	      var changeWK = function changeWK(change) {
	        return onChange((0, _assign2.default)({}, entity, { wkhtmltopdf: (0, _assign2.default)({}, entity.wkhtmltopdf, change) }));
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
	            'Metadata - title'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text', placeholder: 'document title', value: wkhtmltopdf.title || '',
	            onChange: function onChange(v) {
	              return changeWK({ title: v.target.value });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Paper size'
	          ),
	          _react2.default.createElement(
	            'select',
	            { value: wkhtmltopdf.pageSize || '', onChange: function onChange(v) {
	                return changeWK({ pageSize: v.target.value });
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
	              { key: 'A5', value: 'A5' },
	              'A5'
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
	            'Page width'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text', placeholder: '600px', value: wkhtmltopdf.pageWidth || '',
	            onChange: function onChange(v) {
	              return changeWK({ pageWidth: v.target.value });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Page height'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text', placeholder: '600px', value: wkhtmltopdf.pageHeight || '',
	            onChange: function onChange(v) {
	              return changeWK({ pageHeight: v.target.value });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { key: 'foo', className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Orientation'
	          ),
	          _react2.default.createElement(
	            'select',
	            { value: wkhtmltopdf.orientation || '', onChange: function onChange(v) {
	                return changeWK({ orientation: v.target.value });
	              } },
	            _react2.default.createElement(
	              'option',
	              { key: 'portrait', value: 'portrait' },
	              'Portrait'
	            ),
	            _react2.default.createElement(
	              'option',
	              { key: 'landscape', value: 'landscape' },
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
	            'Margin bottom'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text', placeholder: '10mm', value: wkhtmltopdf.marginBottom || '',
	            onChange: function onChange(v) {
	              return changeWK({ marginBottom: v.target.value });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Margin left'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text', placeholder: '10mm', value: wkhtmltopdf.marginLeft || '',
	            onChange: function onChange(v) {
	              return changeWK({ marginLeft: v.target.value });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Margin right'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text', placeholder: '10mm', value: wkhtmltopdf.marginRight || '',
	            onChange: function onChange(v) {
	              return changeWK({ marginRight: v.target.value });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Margin top'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text', placeholder: '10mm', value: wkhtmltopdf.marginTop || '',
	            onChange: function onChange(v) {
	              return changeWK({ marginTop: v.target.value });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Header height in mm'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text', placeholder: '10', value: wkhtmltopdf.headerHeight || '',
	            onChange: function onChange(v) {
	              return changeWK({ headerHeight: v.target.value });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Header'
	          ),
	          _react2.default.createElement(
	            'button',
	            { onClick: function onClick() {
	                return _this2.openHeaderFooter('header');
	              } },
	            'open in tab...'
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Header height in mm'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text', placeholder: '10', value: wkhtmltopdf.footerHeight || '',
	            onChange: function onChange(v) {
	              return changeWK({ footerHeight: v.target.value });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Footer'
	          ),
	          _react2.default.createElement(
	            'button',
	            { onClick: function onClick() {
	                return _this2.openHeaderFooter('footer');
	              } },
	            'open in tab...'
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Cover Page'
	          ),
	          _react2.default.createElement(
	            'button',
	            { onClick: function onClick() {
	                return _this2.openHeaderFooter('cover');
	              } },
	            'open in tab...'
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Table of contents'
	          ),
	          _react2.default.createElement('input', {
	            type: 'checkbox', checked: wkhtmltopdf.toc === true,
	            onChange: function onChange(v) {
	              return changeWK({ toc: v.target.checked });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'TOC header text'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text', value: wkhtmltopdf.tocHeaderText || '',
	            onChange: function onChange(v) {
	              return changeWK({ tocHeaderText: v.target.value });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'TOC text size shrink'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text', placeholder: '10mm', value: wkhtmltopdf.tocTextSizeShrink || '',
	            onChange: function onChange(v) {
	              return changeWK({ tocTextSizeShrink: v.target.value });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'TOC level indentation'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text', placeholder: '10mm', value: wkhtmltopdf.tocLevelIndentation || '',
	            onChange: function onChange(v) {
	              return changeWK({ tocLevelIndentation: v.target.value });
	            } })
	        )
	      );
	    }
	  }]);
	  return Properties;
	}(_react.Component);

	exports.default = Properties;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var WK_TAB_TITLE = exports.WK_TAB_TITLE = 'WK_TAB_TITLE';
	var WK_TAB_EDITOR = exports.WK_TAB_EDITOR = 'WK_TAB_EDITOR';

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (props) {
	  return React.createElement(
	    'span',
	    null,
	    props.entity.name + ' ' + props.tab.headerOrFooter
	  );
	};

/***/ }
/******/ ]);