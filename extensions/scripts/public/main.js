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

	var _keys = __webpack_require__(1);

	var _keys2 = _interopRequireDefault(_keys);

	var _DataEditor = __webpack_require__(2);

	var _DataEditor2 = _interopRequireDefault(_DataEditor);

	var _DataProperties = __webpack_require__(11);

	var _DataProperties2 = _interopRequireDefault(_DataProperties);

	var _jsreportStudio = __webpack_require__(10);

	var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_jsreportStudio2.default.registerEntitySet({ name: 'data', faIcon: 'fa-database', visibleName: 'sample data' });
	_jsreportStudio2.default.properties.push(_DataProperties2.default);
	_jsreportStudio2.default.registerTabEditorComponent('data', _DataEditor2.default);

	_jsreportStudio2.default.onPreview = function (request, entities) {
	  if (!request.template.data || !request.template.data.shortid) {
	    return;
	  }

	  var dataDetails = (0, _keys2.default)(entities).map(function (e) {
	    return entities[e];
	  }).filter(function (d) {
	    return d.shortid === request.template.data.shortid && d.__entitySet === 'data';
	  });

	  if (!dataDetails.length) {
	    return;
	  }

	  request.data = dataDetails[0].dataJson;
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['core-js/object/keys'];

/***/ },
/* 2 */
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


	      return _react2.default.createElement(_jsreportStudio.TextEditor, {
	        name: entity._id,
	        mode: 'javascript',
	        value: entity.dataJson,
	        onUpdate: function onUpdate(v) {
	          return _onUpdate((0, _assign2.default)({}, entity, { dataJson: v }));
	        }
	      });
	    }
	  }]);
	  return DataEditor;
	}(_react.Component);

	DataEditor.propTypes = {
	  entity: _react2.default.PropTypes.object.isRequired,
	  onUpdate: _react2.default.PropTypes.func.isRequired
	};
	exports.default = DataEditor;

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

	var _keys = __webpack_require__(1);

	var _keys2 = _interopRequireDefault(_keys);

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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Properties = function (_Component) {
	  (0, _inherits3.default)(Properties, _Component);

	  function Properties() {
	    (0, _classCallCheck3.default)(this, Properties);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Properties).apply(this, arguments));
	  }

	  (0, _createClass3.default)(Properties, [{
	    key: 'selectDataItems',
	    value: function selectDataItems(entities) {
	      return (0, _keys2.default)(entities).filter(function (k) {
	        return entities[k].__entitySet === 'data';
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

	      var dataItems = this.selectDataItems(entities);

	      if (entity.__entitySet !== 'templates') {
	        return _react2.default.createElement('div', null);
	      }

	      return _react2.default.createElement(
	        'div',
	        { className: 'properties-section' },
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'data'
	          ),
	          _react2.default.createElement(
	            'select',
	            {
	              value: entity.data ? entity.data.shortid : '',
	              onChange: function onChange(v) {
	                return _onChange({ _id: entity._id, data: v.target.value !== 'empty' ? { shortid: v.target.value } : null });
	              } },
	            _react2.default.createElement(
	              'option',
	              { key: 'empty', value: 'empty' },
	              '- not selected -'
	            ),
	            dataItems.map(function (e) {
	              return _react2.default.createElement(
	                'option',
	                { key: e.shortid, value: e.shortid },
	                e.name
	              );
	            })
	          )
	        )
	      );
	    }
	  }]);
	  return Properties;
	}(_react.Component);

	exports.default = Properties;

/***/ }
/******/ ]);