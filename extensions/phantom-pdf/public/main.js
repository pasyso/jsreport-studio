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

	var _PhantomProperties = __webpack_require__(9);

	var _PhantomProperties2 = _interopRequireDefault(_PhantomProperties);

	var _PhantomTitle = __webpack_require__(11);

	var _PhantomTitle2 = _interopRequireDefault(_PhantomTitle);

	var _constants = __webpack_require__(10);

	var Constants = _interopRequireWildcard(_constants);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	Studio.properties.push(_PhantomProperties2.default);

	Studio.registerTabEditorComponent(Constants.PHANTOM_TAB_EDITOR, _PhantomEditor2.default);
	Studio.registerTabTitleComponent(Constants.PHANTOM_TAB_TITLE, _PhantomTitle2.default);

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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = Studio.react;
	var AceEditor = Studio.AceEditor;
	var Component = Studio.react.Component;

	var DataEditor = function (_Component) {
	  (0, _inherits3.default)(DataEditor, _Component);

	  function DataEditor() {
	    (0, _classCallCheck3.default)(this, DataEditor);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(DataEditor).apply(this, arguments));
	  }

	  (0, _createClass3.default)(DataEditor, [{
	    key: 'resize',
	    value: function resize() {
	      this.refs.ace.editor.resize();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var entity = _props.entity;
	      var onUpdate = _props.onUpdate;
	      var tab = _props.tab;


	      return React.createElement(AceEditor, {
	        key: entity._id + '_phantom' + tab.headerOrFooter,
	        mode: 'handlebars',
	        theme: 'chrome',
	        ref: 'ace',
	        name: entity._id + '_phantom' + tab.headerOrFooter,
	        width: '100%',
	        className: 'ace',
	        value: entity.phantom ? entity.phantom[tab.headerOrFooter] : '',
	        onChange: function onChange(v) {
	          return onUpdate((0, _assign2.default)({}, entity, { phantom: (0, _assign2.default)({}, entity.phantom, (0, _defineProperty3.default)({}, tab.headerOrFooter, v)) }));
	        },
	        editorProps: { $blockScrolling: true } });
	    }
	  }]);
	  return DataEditor;
	}(Component);

	DataEditor.propTypes = {
	  entity: React.PropTypes.object.isRequired,
	  tab: React.PropTypes.object.isRequired,
	  onUpdate: React.PropTypes.func.isRequired
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

	var _constants = __webpack_require__(10);

	var Constants = _interopRequireWildcard(_constants);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = Studio.react;
	var Component = Studio.react.Component;

	var Properties = function (_Component) {
	  (0, _inherits3.default)(Properties, _Component);

	  function Properties() {
	    (0, _classCallCheck3.default)(this, Properties);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Properties).apply(this, arguments));
	  }

	  (0, _createClass3.default)(Properties, [{
	    key: 'openHeaderFooter',
	    value: function openHeaderFooter(type) {
	      Studio.openTab({
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

	      if (entity.__entityType !== 'templates' || entity.recipe !== 'phantom-pdf') {
	        return React.createElement('div', null);
	      }

	      return React.createElement(
	        'div',
	        null,
	        'Phantom settings....',
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'div',
	            null,
	            'margin: ',
	            React.createElement('input', { type: 'text', placeholder: '1cm', value: phantom.margin || '', onChange: function onChange(v) {
	                return changePhantom({ margin: v.target.value });
	              } })
	          ),
	          React.createElement(
	            'button',
	            { onClick: function onClick() {
	                return _this2.openHeaderFooter('header');
	              } },
	            'open header'
	          ),
	          React.createElement(
	            'button',
	            { onClick: function onClick() {
	                return _this2.openHeaderFooter('footer');
	              } },
	            'open footer'
	          )
	        )
	      );
	    }
	  }]);
	  return Properties;
	}(Component);

	exports.default = Properties;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var PHANTOM_TAB_TITLE = exports.PHANTOM_TAB_TITLE = 'PHANTOM_TAB_TITLE';
	var PHANTOM_TAB_EDITOR = exports.PHANTOM_TAB_EDITOR = 'PHANTOM_TAB_EDITOR';

/***/ },
/* 11 */
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