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

	var _ScriptEditor = __webpack_require__(1);

	var _ScriptEditor2 = _interopRequireDefault(_ScriptEditor);

	var _ScriptProperties = __webpack_require__(10);

	var _ScriptProperties2 = _interopRequireDefault(_ScriptProperties);

	var _jsreportStudio = __webpack_require__(9);

	var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_jsreportStudio2.default.registerEntitySet({ name: 'scripts', faIcon: 'fa-cogs', visibleName: 'script' });
	_jsreportStudio2.default.registerPropertyComponent(_ScriptProperties2.default.title, _ScriptProperties2.default, function (entity) {
	  return entity.__entitySet === 'templates';
	});
	_jsreportStudio2.default.registerTabEditorComponent('scripts', _ScriptEditor2.default);

	_jsreportStudio2.default.previewListeners.push(function (request, entities) {
	  if (!request.template.scripts) {
	    return;
	  }

	  request.template.scripts = request.template.scripts.map(function (s) {
	    var script = _jsreportStudio2.default.getEntityByShortid(s.shortid, false);

	    if (!script) {
	      return s;
	    }

	    return script;
	  }).filter(function (s) {
	    return !s.__isNew || s.content;
	  });
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

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(11);

	var _extends3 = _interopRequireDefault(_extends2);

	var _assign = __webpack_require__(2);

	var _assign2 = _interopRequireDefault(_assign);

	var _keys = __webpack_require__(12);

	var _keys2 = _interopRequireDefault(_keys);

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
	      var scripts = ScriptProperties.getSelectedScripts(this.props.entity, this.props.entities);

	      return _react2.default.createElement(
	        'span',
	        null,
	        scripts.map(function (s) {
	          return _react2.default.createElement(
	            'span',
	            { key: s.shortid },
	            s.name + ' '
	          );
	        })
	      );
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.removeInvalidScriptReferences();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      this.removeInvalidScriptReferences();
	    }
	  }, {
	    key: 'removeInvalidScriptReferences',
	    value: function removeInvalidScriptReferences() {
	      var _props = this.props;
	      var entity = _props.entity;
	      var entities = _props.entities;
	      var onChange = _props.onChange;


	      if (!entity.scripts) {
	        return;
	      }

	      var updatedScripts = entity.scripts.filter(function (s) {
	        return (0, _keys2.default)(entities).filter(function (k) {
	          return entities[k].__entitySet === 'scripts' && entities[k].shortid === s.shortid;
	        }).length;
	      });

	      if (updatedScripts.length !== entity.scripts.length) {
	        onChange({ _id: entity._id, scripts: updatedScripts });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props2 = this.props;
	      var entity = _props2.entity;
	      var entities = _props2.entities;
	      var _onChange = _props2.onChange;

	      var scripts = this.selectScripts(entities);

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
	            'select',
	            { title: 'Use CTRL to deselect item and also to select multiple options. The order of selected scripts is reflected on the server',
	              multiple: true, size: '7', value: entity.scripts ? entity.scripts.map(function (s) {
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
	          ),
	          entity.scripts && entity.scripts.length ? _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	              'span',
	              null,
	              'Run order:'
	            ),
	            this.renderOrder()
	          ) : _react2.default.createElement('div', null)
	        )
	      );
	    }
	  }], [{
	    key: 'getSelectedScripts',
	    value: function getSelectedScripts(entity, entities) {
	      var getName = function getName(s) {
	        var foundScripts = (0, _keys2.default)(entities).map(function (k) {
	          return entities[k];
	        }).filter(function (sc) {
	          return sc.shortid === s.shortid;
	        });

	        return foundScripts.length ? foundScripts[0].name : '';
	      };

	      return (entity.scripts || []).map(function (s) {
	        return (0, _extends3.default)({}, s, {
	          name: getName(s)
	        });
	      });
	    }
	  }, {
	    key: 'title',
	    value: function title(entity, entities) {
	      if (!entity.scripts || !entity.scripts.length) {
	        return 'scripts';
	      }

	      return 'scripts: ' + ScriptProperties.getSelectedScripts(entity, entities).map(function (s) {
	        return s.name;
	      }).join(', ');
	    }
	  }]);
	  return ScriptProperties;
	}(_react.Component);

	exports.default = ScriptProperties;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['helpers/extends'];

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['core-js/object/keys'];

/***/ }
/******/ ]);