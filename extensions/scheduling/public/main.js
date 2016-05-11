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
	
	var _regenerator = __webpack_require__(1);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _asyncToGenerator2 = __webpack_require__(2);
	
	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
	
	var _ScheduleEditor = __webpack_require__(3);
	
	var _ScheduleEditor2 = _interopRequireDefault(_ScheduleEditor);
	
	var _ScheduleProperties = __webpack_require__(15);
	
	var _ScheduleProperties2 = _interopRequireDefault(_ScheduleProperties);
	
	var _DownloadButton = __webpack_require__(17);
	
	var _DownloadButton2 = _interopRequireDefault(_DownloadButton);
	
	var _jsreportStudio = __webpack_require__(18);
	
	var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_jsreportStudio2.default.initializeListeners.push((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
	  return _regenerator2.default.wrap(function _callee$(_context) {
	    while (1) {
	      switch (_context.prev = _context.next) {
	        case 0:
	          if (!(_jsreportStudio2.default.authentication && !_jsreportStudio2.default.authentication.user.isAdmin)) {
	            _context.next = 2;
	            break;
	          }
	
	          return _context.abrupt('return');
	
	        case 2:
	
	          _jsreportStudio2.default.addEntitySet({ name: 'schedules', faIcon: 'fa-calendar', visibleName: 'schedule' });
	          _jsreportStudio2.default.addEditorComponent('schedules', _ScheduleEditor2.default);
	          _jsreportStudio2.default.addPropertiesComponent(_ScheduleProperties2.default.title, _ScheduleProperties2.default, function (entity) {
	            return entity.__entitySet === 'schedules';
	          });
	          _jsreportStudio2.default.addToolbarComponent(_DownloadButton2.default);
	
	        case 6:
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
	
	var _regenerator = __webpack_require__(1);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _asyncToGenerator2 = __webpack_require__(2);
	
	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
	
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
	
	var _reactList = __webpack_require__(10);
	
	var _reactList2 = _interopRequireDefault(_reactList);
	
	var _ScheduleEditor = __webpack_require__(11);
	
	var _ScheduleEditor2 = _interopRequireDefault(_ScheduleEditor);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _activeReport = void 0;
	
	var ScheduleEditor = function (_Component) {
	  (0, _inherits3.default)(ScheduleEditor, _Component);
	
	  function ScheduleEditor() {
	    (0, _classCallCheck3.default)(this, ScheduleEditor);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ScheduleEditor).call(this));
	
	    _this.state = { tasks: [], active: null };
	    _this.skip = 0;
	    _this.top = 50;
	    _this.pending = 0;
	    return _this;
	  }
	
	  (0, _createClass3.default)(ScheduleEditor, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.lazyFetch();
	    }
	  }, {
	    key: 'openReport',
	    value: function () {
	      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(t) {
	        var reports, report;
	        return _regenerator2.default.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                if (!(t.state === 'success')) {
	                  _context.next = 10;
	                  break;
	                }
	
	                _context.next = 3;
	                return Studio.api.get('/odata/reports?$filter=taskId eq \'' + t._id + '\'');
	
	              case 3:
	                reports = _context.sent;
	                report = reports.value[0];
	
	                Studio.setPreviewFrameSrc('/reports/' + report._id + '/content');
	                this.setState({ active: t._id });
	                _activeReport = report;
	                _context.next = 13;
	                break;
	
	              case 10:
	                this.setState({ active: null });
	                _activeReport = null;
	                Studio.setPreviewFrameSrc('data:text/html;charset=utf-8,' + encodeURI(t.error || t.state));
	
	              case 13:
	              case 'end':
	                return _context.stop();
	            }
	          }
	        }, _callee, this);
	      }));
	
	      function openReport(_x) {
	        return ref.apply(this, arguments);
	      }
	
	      return openReport;
	    }()
	  }, {
	    key: 'lazyFetch',
	    value: function () {
	      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
	        var response;
	        return _regenerator2.default.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                if (!this.loading) {
	                  _context2.next = 2;
	                  break;
	                }
	
	                return _context2.abrupt('return');
	
	              case 2:
	
	                this.loading = true;
	                _context2.next = 5;
	                return Studio.api.get('/odata/tasks?$orderby=finishDate desc&$count=true&$top=' + this.top + '&$skip=' + this.skip + '&$filter=scheduleShortid eq \'' + this.props.entity.shortid + '\'');
	
	              case 5:
	                response = _context2.sent;
	
	                this.skip += this.top;
	                this.loading = false;
	                this.setState({ tasks: this.state.tasks.concat(response.value), count: response['@odata.count'] });
	                if (this.state.tasks.length <= this.pending && response.value.length) {
	                  this.lazyFetch();
	                }
	
	              case 10:
	              case 'end':
	                return _context2.stop();
	            }
	          }
	        }, _callee2, this);
	      }));
	
	      function lazyFetch() {
	        return ref.apply(this, arguments);
	      }
	
	      return lazyFetch;
	    }()
	  }, {
	    key: 'tryRenderItem',
	    value: function tryRenderItem(index) {
	      var task = this.state.tasks[index];
	      if (!task) {
	        this.pending = Math.max(this.pending, index);
	        this.lazyFetch();
	        return _react2.default.createElement(
	          'tr',
	          { key: index },
	          _react2.default.createElement(
	            'td',
	            null,
	            _react2.default.createElement('i', { className: 'fa fa-spinner fa-spin fa-fw' })
	          )
	        );
	      }
	
	      return this.renderItem(task, index);
	    }
	  }, {
	    key: 'renderItem',
	    value: function renderItem(task, index) {
	      var _this2 = this;
	
	      return _react2.default.createElement(
	        'tr',
	        {
	          key: index, className: this.state.active === task._id ? 'active' : '',
	          onClick: function onClick() {
	            return _this2.openReport(task);
	          } },
	        _react2.default.createElement(
	          'td',
	          null,
	          _react2.default.createElement(
	            'span',
	            { className: _ScheduleEditor2.default.state + ' ' + (task.state === 'error' ? _ScheduleEditor2.default.error : task.state === 'success' ? _ScheduleEditor2.default.success : _ScheduleEditor2.default.canceled) },
	            task.state
	          )
	        ),
	        _react2.default.createElement(
	          'td',
	          null,
	          _react2.default.createElement(
	            'span',
	            { className: _ScheduleEditor2.default.value },
	            task.creationDate ? task.creationDate.toLocaleString() : ''
	          )
	        ),
	        _react2.default.createElement(
	          'td',
	          null,
	          _react2.default.createElement(
	            'div',
	            { className: _ScheduleEditor2.default.value },
	            task.finishDate ? task.finishDate.toLocaleString() : ''
	          )
	        )
	      );
	    }
	  }, {
	    key: 'renderItems',
	    value: function renderItems(items, ref) {
	      return _react2.default.createElement(
	        'table',
	        { className: 'table', ref: ref },
	        _react2.default.createElement(
	          'thead',
	          null,
	          _react2.default.createElement(
	            'tr',
	            null,
	            _react2.default.createElement(
	              'th',
	              null,
	              'state'
	            ),
	            _react2.default.createElement(
	              'th',
	              null,
	              'start'
	            ),
	            _react2.default.createElement(
	              'th',
	              null,
	              'finish'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'tbody',
	          null,
	          items
	        )
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;
	
	      var entity = this.props.entity;
	      var count = this.state.count;
	
	
	      return _react2.default.createElement(
	        'div',
	        { className: 'block custom-editor' },
	        _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(
	            'h1',
	            null,
	            _react2.default.createElement('i', { className: 'fa fa-calendar' }),
	            ' ',
	            entity.name
	          ),
	          entity.nextRun ? _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	              'span',
	              null,
	              'next run  '
	            ),
	            _react2.default.createElement(
	              'small',
	              null,
	              entity.nextRun.toLocaleString()
	            )
	          ) : _react2.default.createElement(
	            'div',
	            null,
	            'Not planned yet. Fill CRON expression and report template in the properties.'
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: _ScheduleEditor2.default.listContainer + ' block-item' },
	          _react2.default.createElement(_reactList2.default, {
	            type: 'uniform', itemsRenderer: this.renderItems, itemRenderer: function itemRenderer(index) {
	              return _this3.tryRenderItem(index);
	            },
	            length: count })
	        )
	      );
	    }
	  }], [{
	    key: 'ActiveReport',
	    get: function get() {
	      return _activeReport;
	    }
	  }]);
	  return ScheduleEditor;
	}(_react.Component);
	
	ScheduleEditor.propTypes = {
	  entity: _react2.default.PropTypes.object.isRequired,
	  onUpdate: _react2.default.PropTypes.func.isRequired
	};
	exports.default = ScheduleEditor;

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

	module.exports = Studio.libraries['react-list'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(12);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(14)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!./../../../node_modules/sass-loader/index.js?outputStyle=expanded&sourceMap!./ScheduleEditor.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!./../../../node_modules/sass-loader/index.js?outputStyle=expanded&sourceMap!./ScheduleEditor.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(13)();
	// imports
	
	
	// module
	exports.push([module.id, ".listContainer___1erKb {\n  margin-top: 1rem;\n  overflow: auto;\n  position: relative;\n  padding: 1rem;\n  min-height: 0;\n  height: auto;\n}\n\n.listContainer___1erKb > div {\n  width: 95%;\n  position: absolute !important;\n}\n\n.state___3-LDK {\n  font-size: 0.8rem;\n  padding: 0.3rem;\n  display: inline-block;\n  text-align: center;\n  min-width: 4rem;\n}\n\n.error___2PG7b {\n  background-color: #da532c;\n  color: white;\n}\n\n.cancelled___1kGiJ {\n  background-color: orange;\n  color: white;\n}\n\n.success___1gg7n {\n  background-color: #4CAF50;\n  color: white;\n}\n", "", {"version":3,"sources":["/./ScheduleEditor.scss"],"names":[],"mappings":"AAAA;EACE,iBAAiB;EACjB,eAAe;EACf,mBAAmB;EACnB,cAAc;EACd,cAAc;EACd,aAAa;CACd;;AAED;EAEE,WAAW;EAEX,8BAA8B;CAC/B;;AAED;EACE,kBAAkB;EAClB,gBAAgB;EAChB,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;CACjB;;AAED;EACE,0BAA0B;EAC1B,aAAa;CACd;;AAED;EACE,yBAAyB;EACzB,aAAa;CACd;;AAED;EACE,0BAA0B;EAC1B,aAAa;CACd","file":"ScheduleEditor.scss","sourcesContent":[".listContainer {\r\n  margin-top: 1rem;\r\n  overflow: auto;\r\n  position: relative;\r\n  padding: 1rem;\r\n  min-height: 0;\r\n  height: auto;\r\n}\r\n\r\n.listContainer > div {\r\n  // it somehow shows the horizontal scrollbar even when no needeit, this workaround to hide it\r\n  width: 95%;\r\n  // the tabs height based on flex box is otherwise wrongly calculated\r\n  position: absolute !important;\r\n}\r\n\r\n.state {\r\n  font-size: 0.8rem;\r\n  padding: 0.3rem;\r\n  display: inline-block;\r\n  text-align: center;\r\n  min-width: 4rem;\r\n}\r\n\r\n.error {\r\n  background-color: #da532c;\r\n  color: white;\r\n}\r\n\r\n.cancelled {\r\n  background-color: orange;\r\n  color: white;\r\n}\r\n\r\n.success {\r\n  background-color: #4CAF50;\r\n  color: white;\r\n}\r\n\r\n"],"sourceRoot":"webpack://"}]);
	
	// exports
	exports.locals = {
		"listContainer": "listContainer___1erKb",
		"state": "state___3-LDK",
		"error": "error___2PG7b",
		"cancelled": "cancelled___1kGiJ",
		"success": "success___1gg7n"
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _keys = __webpack_require__(16);
	
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
	
	var ScheduleProperties = function (_Component) {
	  (0, _inherits3.default)(ScheduleProperties, _Component);
	
	  function ScheduleProperties() {
	    (0, _classCallCheck3.default)(this, ScheduleProperties);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ScheduleProperties).apply(this, arguments));
	  }
	
	  (0, _createClass3.default)(ScheduleProperties, [{
	    key: 'selectTemplates',
	    value: function selectTemplates(entities) {
	      return (0, _keys2.default)(entities).filter(function (k) {
	        return entities[k].__entitySet === 'templates';
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
	
	      var templates = this.selectTemplates(entities);
	
	      if (!entity || entity.__entitySet !== 'schedules') {
	        return _react2.default.createElement('div', null);
	      }
	
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Template'
	          ),
	          _react2.default.createElement(
	            'select',
	            {
	              value: entity.templateShortid ? entity.templateShortid : '',
	              onChange: function onChange(v) {
	                return _onChange({ _id: entity._id, templateShortid: v.target.value !== 'empty' ? v.target.value : null });
	              } },
	            _react2.default.createElement(
	              'option',
	              { key: 'empty', value: 'empty' },
	              '- not selected -'
	            ),
	            templates.map(function (e) {
	              return _react2.default.createElement(
	                'option',
	                { key: e.shortid, value: e.shortid },
	                e.name
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
	            'CRON'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text', value: entity.cron || '', onChange: function onChange(v) {
	              return _onChange({ _id: entity._id, cron: v.target.value });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Enabled'
	          ),
	          _react2.default.createElement('input', { type: 'checkbox', checked: entity.enabled !== false, onChange: function onChange(v) {
	              return _onChange({ _id: entity._id, enabled: v.target.checked });
	            } })
	        )
	      );
	    }
	  }], [{
	    key: 'title',
	    value: function title(entity, entities) {
	      var templates = (0, _keys2.default)(entities).map(function (k) {
	        return entities[k];
	      }).filter(function (t) {
	        return t.__entitySet === 'templates' && t.shortid === entity.templateShortid;
	      });
	
	      if (!templates.length) {
	        return 'schedule (select template...)';
	      }
	
	      return 'schedule (' + templates[0].name + ') ' + (entity.enabled !== true ? '(disabled)' : '');
	    }
	  }]);
	  return ScheduleProperties;
	}(_react.Component);

	exports.default = ScheduleProperties;

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['core-js/object/keys'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
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
	
	var _ScheduleEditor = __webpack_require__(3);
	
	var _ScheduleEditor2 = _interopRequireDefault(_ScheduleEditor);
	
	var _jsreportStudio = __webpack_require__(18);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var UploadButton = function (_Component) {
	  (0, _inherits3.default)(UploadButton, _Component);
	
	  function UploadButton() {
	    (0, _classCallCheck3.default)(this, UploadButton);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(UploadButton).apply(this, arguments));
	  }
	
	  (0, _createClass3.default)(UploadButton, [{
	    key: 'download',
	    value: function download() {
	      if (_ScheduleEditor2.default.ActiveReport) {
	        window.open((0, _jsreportStudio.relativizeUrl)('/reports/' + _ScheduleEditor2.default.ActiveReport._id + '/content'), '_blank');
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      if (!this.props.tab || !this.props.tab.entity || this.props.tab.entity.__entitySet !== 'schedules' || !_ScheduleEditor2.default.ActiveReport) {
	        return _react2.default.createElement('div', null);
	      }
	
	      return _react2.default.createElement(
	        'div',
	        { className: 'toolbar-button', onClick: function onClick() {
	            return _this2.download();
	          } },
	        _react2.default.createElement('i', { className: 'fa fa-download' }),
	        'Download'
	      );
	    }
	  }]);
	  return UploadButton;
	}(_react.Component);
	
	UploadButton.propTypes = {
	  tab: _react2.default.PropTypes.object,
	  onUpdate: _react2.default.PropTypes.func.isRequired
	};
	exports.default = UploadButton;

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = Studio;

/***/ }
/******/ ]);