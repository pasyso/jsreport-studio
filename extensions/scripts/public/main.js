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

	var _extends2 = __webpack_require__(1);

	var _extends3 = _interopRequireDefault(_extends2);

	var _ScriptEditor = __webpack_require__(2);

	var _ScriptEditor2 = _interopRequireDefault(_ScriptEditor);

	var _ScriptProperties = __webpack_require__(11);

	var _ScriptProperties2 = _interopRequireDefault(_ScriptProperties);

	var _jsreportStudio = __webpack_require__(10);

	var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_jsreportStudio2.default.registerEntitySet({ name: 'scripts', faIcon: 'fa-cogs', visibleName: 'script' });
	_jsreportStudio2.default.properties.push(_ScriptProperties2.default);
	_jsreportStudio2.default.registerTabEditorComponent('scripts', _ScriptEditor2.default);

	_jsreportStudio2.default.previewListeners.push(function (request, entities) {
	  if (!request.template.scripts) {
	    return;
	  }

	  request.template.scripts = request.template.scripts.map(function (s) {
	    return (0, _extends3.default)({}, s, {
	      content: _jsreportStudio2.default.getEntityByShortid(s.shortid).content
	    });
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['helpers/extends'];

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

	var ScriptEditor = function (_Component) {
	  (0, _inherits3.default)(ScriptEditor, _Component);

	  function ScriptEditor() {
	    (0, _classCallCheck3.default)(this, ScriptEditor);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ScriptEditor).apply(this, arguments));
	  }

	  (0, _createClass3.default)(ScriptEditor, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var entity = _props.entity;
	      var _onUpdate = _props.onUpdate;


	      return _react2.default.createElement(_jsreportStudio.TextEditor, {
	        name: entity._id,
	        mode: 'javascript',
	        value: entity.content,
	        onUpdate: function onUpdate(v) {
	          return _onUpdate((0, _assign2.default)({}, entity, { content: v }));
	        }
	      });
	    }
	  }]);
	  return ScriptEditor;
	}(_react.Component);

	ScriptEditor.propTypes = {
	  entity: _react2.default.PropTypes.object.isRequired,
	  onUpdate: _react2.default.PropTypes.func.isRequired
	};
	exports.default = ScriptEditor;

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

	var _extends2 = __webpack_require__(1);

	var _extends3 = _interopRequireDefault(_extends2);

	var _keys = __webpack_require__(12);

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

	var ScriptProperties = function (_Component) {
	  (0, _inherits3.default)(ScriptProperties, _Component);

	  function ScriptProperties() {
	    (0, _classCallCheck3.default)(this, ScriptProperties);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ScriptProperties).apply(this, arguments));
	  }

	  (0, _createClass3.default)(ScriptProperties, [{
	    key: 'selectScripts',
	    value: function selectScripts(entities) {
	      return (0, _keys2.default)(entities).filter(function (k) {
	        return entities[k].__entitySet === 'scripts';
	      }).map(function (k) {
	        return entities[k];
	      });
	    }
	  }, {
	    key: 'renderOrder',
	    value: function renderOrder() {
	      var _this2 = this;

	      var scripts = (this.props.entity.scripts || []).map(function (s) {
	        return (0, _extends3.default)({}, s, {
	          name: (0, _keys2.default)(_this2.props.entities).map(function (k) {
	            return _this2.props.entities[k];
	          }).filter(function (sc) {
	            return sc.shortid === s.shortid;
	          })[0].name
	        });
	      });

	      return _react2.default.createElement(
	        'ol',
	        null,
	        scripts.map(function (s) {
	          return _react2.default.createElement(
	            'li',
	            { key: s.shortid },
	            s.name
	          );
	        })
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var entity = _props.entity;
	      var entities = _props.entities;
	      var _onChange = _props.onChange;

	      var scripts = this.selectScripts(entities);

	      if (entity.__entitySet !== 'templates') {
	        return _react2.default.createElement('div', null);
	      }

	      var selectValues = function selectValues(event, ascripts) {
	        var el = event.target;
	        var scripts = (0, _assign2.default)([], ascripts);

	        for (var i = 0; i < el.options.length; i++) {
	          if (el.options[i].selected) {
	            if (!scripts.filter(function (s) {
	              return s.shortid === el.options[i].value;
	            }).length) {
	              scripts.push({ shortid: el.options[i].value });
	            }
	          } else {
	            if (scripts.filter(function (s) {
	              return s.shortid === el.options[i].value;
	            }).length) {
	              scripts = scripts.filter(function (s) {
	                return s.shortid !== el.options[i].value;
	              });
	            }
	          }
	        }

	        return scripts;
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
	            'scripts'
	          ),
	          _react2.default.createElement(
	            'div',
	            null,
	            'Order:',
	            this.renderOrder()
	          ),
	          _react2.default.createElement(
	            'select',
	            {
	              multiple: true, value: entity.scripts ? entity.scripts.map(function (s) {
	                return s.shortid;
	              }) : [],
	              onChange: function onChange(v) {
	                return _onChange({ _id: entity._id, scripts: selectValues(v, entity.scripts) });
	              } },
	            scripts.map(function (s) {
	              return _react2.default.createElement(
	                'option',
	                { key: s.shortid, value: s.shortid },
	                s.name
	              );
	            })
	          )
	        )
	      );
	    }
	  }]);
	  return ScriptProperties;
	}(_react.Component);

	exports.default = ScriptProperties;

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['core-js/object/keys'];

/***/ }
/******/ ]);