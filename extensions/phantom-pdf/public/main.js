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

	var _PhantomEditor = __webpack_require__(1);

	var _PhantomEditor2 = _interopRequireDefault(_PhantomEditor);

	var _PhantomProperties = __webpack_require__(11);

	var _PhantomProperties2 = _interopRequireDefault(_PhantomProperties);

	var _PhantomTitle = __webpack_require__(13);

	var _PhantomTitle2 = _interopRequireDefault(_PhantomTitle);

	var _constants = __webpack_require__(12);

	var Constants = _interopRequireWildcard(_constants);

	var _jsreportStudio = __webpack_require__(10);

	var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_jsreportStudio2.default.registerPropertyComponent('phantom pdf', _PhantomProperties2.default, function (entity) {
	  return entity.__entitySet === 'templates' && entity.recipe === 'phantom-pdf';
	});

	_jsreportStudio2.default.registerTabEditorComponent(Constants.PHANTOM_TAB_EDITOR, _PhantomEditor2.default);
	_jsreportStudio2.default.registerTabTitleComponent(Constants.PHANTOM_TAB_TITLE, _PhantomTitle2.default);

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
	        name: entity._id + '_phantom' + tab.headerOrFooter,
	        mode: 'handlebars',
	        value: entity.phantom ? entity.phantom[tab.headerOrFooter] : '',
	        onUpdate: function onUpdate(v) {
	          return _onUpdate((0, _assign2.default)({}, entity, { phantom: (0, _assign2.default)({}, entity.phantom, (0, _defineProperty3.default)({}, tab.headerOrFooter, v)) }));
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
	        key: this.props.entity._id + '_phantom' + type,
	        _id: this.props.entity._id,
	        headerOrFooter: type,
	        editorComponentKey: Constants.PHANTOM_TAB_EDITOR,
	        titleComponentKey: Constants.PHANTOM_TAB_TITLE
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var _props = this.props;
	      var entity = _props.entity;
	      var onChange = _props.onChange;

	      var phantom = entity.phantom || {};

	      var changePhantom = function changePhantom(change) {
	        return onChange((0, _assign2.default)({}, entity, { phantom: (0, _assign2.default)({}, entity.phantom, change) }));
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
	            'margin'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text', placeholder: '1cm', value: phantom.margin || '',
	            onChange: function onChange(v) {
	              return changePhantom({ margin: v.target.value });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'header height'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text', placeholder: '1cm', value: phantom.headerHeight || '',
	            onChange: function onChange(v) {
	              return changePhantom({ headerHeight: v.target.value });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'header'
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
	            'footer height'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text', placeholder: '1cm', value: phantom.footerHeight || '',
	            onChange: function onChange(v) {
	              return changePhantom({ footerHeight: v.target.value });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'footer'
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
	            'paper format'
	          ),
	          _react2.default.createElement(
	            'select',
	            { value: phantom.format || '', onChange: function onChange(v) {
	                return changePhantom({ format: v.target.value });
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
	            'paper width'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text', placeholder: '1cm', value: phantom.paperWidth || '',
	            onChange: function onChange(v) {
	              return changePhantom({ paperWidth: v.target.value });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'paper height'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text', placeholder: '1cm', value: phantom.paperHeight || '',
	            onChange: function onChange(v) {
	              return changePhantom({ paperHeight: v.target.value });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'orientation'
	          ),
	          _react2.default.createElement(
	            'select',
	            { value: phantom.orientation || '', onChange: function onChange(v) {
	                return changePhantom({ orientation: v.target.value });
	              } },
	            _react2.default.createElement(
	              'option',
	              { key: 'portrait', value: 'portrait' },
	              'portrait'
	            ),
	            _react2.default.createElement(
	              'option',
	              { key: 'landscape', value: 'landscape' },
	              'landscape'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'print delay'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text', placeholder: '1000', value: phantom.printDelay || '',
	            onChange: function onChange(v) {
	              return changePhantom({ printDelay: v.target.value });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'resource timeout'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text', placeholder: '1000', value: phantom.resourceTimeout || '',
	            onChange: function onChange(v) {
	              return changePhantom({ resourceTimeout: v.target.value });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            { title: 'window.PHANTOM_HTML_TO_PDF_READY=true;' },
	            'wait for printing trigger'
	          ),
	          _react2.default.createElement('input', {
	            type: 'checkbox', title: 'window.PHANTOM_HTML_TO_PDF_READY=true;', checked: phantom.waitForJS === true,
	            onChange: function onChange(v) {
	              return changePhantom({ waitForJS: v.target.checked });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'block javascript'
	          ),
	          _react2.default.createElement('input', {
	            type: 'checkbox', checked: phantom.blockJavaScript === true,
	            onChange: function onChange(v) {
	              return changePhantom({ blockJavaScript: v.target.checked });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'use custom phantomjs'
	          ),
	          _react2.default.createElement('input', {
	            type: 'checkbox', checked: phantom.customPhantomJS === true,
	            onChange: function onChange(v) {
	              return changePhantom({ customPhantomJS: v.target.checked });
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
	var PHANTOM_TAB_TITLE = exports.PHANTOM_TAB_TITLE = 'PHANTOM_TAB_TITLE';
	var PHANTOM_TAB_EDITOR = exports.PHANTOM_TAB_EDITOR = 'PHANTOM_TAB_EDITOR';

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