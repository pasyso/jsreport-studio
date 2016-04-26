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

	var _ReportEditor = __webpack_require__(1);

	var _ReportEditor2 = _interopRequireDefault(_ReportEditor);

	var _ReportsButton = __webpack_require__(16);

	var _ReportsButton2 = _interopRequireDefault(_ReportsButton);

	var _DownloadButton = __webpack_require__(17);

	var _DownloadButton2 = _interopRequireDefault(_DownloadButton);

	var _DeleteButton = __webpack_require__(18);

	var _DeleteButton2 = _interopRequireDefault(_DeleteButton);

	var _jsreportStudio = __webpack_require__(15);

	var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_jsreportStudio2.default.registerTabEditorComponent('reports', _ReportEditor2.default);
	_jsreportStudio2.default.registerSettingsToolbarComponent(_ReportsButton2.default);

	_jsreportStudio2.default.registerToolbarComponent(_DownloadButton2.default);
	_jsreportStudio2.default.registerToolbarComponent(_DeleteButton2.default);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _regenerator = __webpack_require__(2);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator2 = __webpack_require__(3);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _getPrototypeOf = __webpack_require__(4);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(5);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(6);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _createClass2 = __webpack_require__(7);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _inherits2 = __webpack_require__(8);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _reactList = __webpack_require__(9);

	var _reactList2 = _interopRequireDefault(_reactList);

	var _ReportEditor = __webpack_require__(10);

	var _ReportEditor2 = _interopRequireDefault(_ReportEditor);

	var _react = __webpack_require__(14);

	var _react2 = _interopRequireDefault(_react);

	var _jsreportStudio = __webpack_require__(15);

	var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _activeReport = void 0;

	var ReportEditor = function (_Component) {
	  (0, _inherits3.default)(ReportEditor, _Component);
	  (0, _createClass3.default)(ReportEditor, null, [{
	    key: 'ActiveReport',
	    get: function get() {
	      return _activeReport;
	    }
	  }]);

	  function ReportEditor() {
	    (0, _classCallCheck3.default)(this, ReportEditor);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ReportEditor).call(this));

	    _this.state = { reports: [], active: null };
	    _this.skip = 0;
	    _this.top = 50;
	    _this.pending = 0;
	    _activeReport = null;
	    return _this;
	  }

	  (0, _createClass3.default)(ReportEditor, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.lazyFetch();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      _activeReport = null;
	    }
	  }, {
	    key: 'openReport',
	    value: function () {
	      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(r) {
	        return _regenerator2.default.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                _jsreportStudio2.default.preview('/reports/' + r._id + '/content');
	                this.setState({ active: r._id });
	                _activeReport = r;

	              case 3:
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
	                return _jsreportStudio2.default.api.get('/odata/reports?$orderby=creationDate desc&$count=true&$top=' + this.top + '&$skip=' + this.skip);

	              case 5:
	                response = _context2.sent;

	                this.skip += this.top;
	                this.loading = false;
	                this.setState({ reports: this.state.reports.concat(response.value), count: response['@odata.count'] });
	                if (this.state.reports.length <= this.pending && response.value.length) {
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
	      var task = this.state.reports[index];
	      if (!task) {
	        this.pending = Math.max(this.pending, index);
	        this.lazyFetch();
	        return _react2.default.createElement(
	          'div',
	          { key: index, className: _ReportEditor2.default.item },
	          _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement('i', { className: 'fa fa-spinner fa-spin fa-fw' })
	          )
	        );
	      }

	      return this.renderItem(task, index);
	    }
	  }, {
	    key: 'renderItem',
	    value: function renderItem(report, index) {
	      var _this2 = this;

	      return _react2.default.createElement(
	        'div',
	        {
	          key: index, className: _ReportEditor2.default.item + ' ' + (this.state.active === report._id ? _ReportEditor2.default.active : ''),
	          onClick: function onClick() {
	            return _this2.openReport(report);
	          } },
	        _react2.default.createElement(
	          'div',
	          null,
	          report.name
	        ),
	        _react2.default.createElement(
	          'div',
	          null,
	          report.creationDate.toLocaleString()
	        ),
	        _react2.default.createElement(
	          'div',
	          null,
	          report.recipe
	        )
	      );
	    }
	  }, {
	    key: 'renderItems',
	    value: function renderItems(items, ref) {
	      return _react2.default.createElement(
	        'div',
	        { className: _ReportEditor2.default.list, ref: ref },
	        items
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;

	      var count = this.state.count;


	      return _react2.default.createElement(
	        'div',
	        { className: 'block ' + _ReportEditor2.default.editor },
	        _react2.default.createElement(
	          'div',
	          { className: _ReportEditor2.default.header },
	          _react2.default.createElement(
	            'h1',
	            null,
	            _react2.default.createElement('i', { className: 'fa fa-folder-open-o' }),
	            ' Reports'
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: _ReportEditor2.default.listContainer + ' block-item' },
	          _react2.default.createElement(_reactList2.default, {
	            type: 'uniform', itemsRenderer: this.renderItems, itemRenderer: function itemRenderer(index) {
	              return _this3.tryRenderItem(index);
	            },
	            length: count })
	        )
	      );
	    }
	  }]);
	  return ReportEditor;
	}(_react.Component);

	exports.default = ReportEditor;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['regenerator'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['helpers/asyncToGenerator'];

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

	module.exports = Studio.runtime['helpers/possibleConstructorReturn'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['helpers/createClass'];

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['helpers/inherits'];

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = Studio.libraries['react-list'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(11);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!./../../../node_modules/sass-loader/index.js?outputStyle=expanded&sourceMap!./ReportEditor.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!./../../../node_modules/sass-loader/index.js?outputStyle=expanded&sourceMap!./ReportEditor.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports


	// module
	exports.push([module.id, ".editor___13P6x {\n  padding: 1rem;\n}\n\n.header___bOuES {\n  margin-bottom: 1rem;\n}\n\n.list___2oths {\n  display: flex;\n  flex: 1;\n  flex-wrap: wrap;\n  justify-content: space-between;\n}\n\n.listContainer___3gCYa {\n  overflow: auto;\n  position: relative;\n}\n\n.listContainer___3gCYa > div {\n  position: absolute !important;\n}\n\n.item___RIKj- {\n  display: flex;\n  flex-direction: column;\n  padding: 0.4rem;\n  width: 10rem;\n  height: 6.8rem;\n  margin: 1rem 0;\n  cursor: pointer;\n  background-color: #fff;\n  justify-content: space-between;\n  align-items: center;\n  box-shadow: 0 0.1rem 0.1rem 0 rgba(0, 0, 0, 0.2);\n  border-radius: 0.1rem;\n}\n\n.active___178dk, .item___RIKj-:hover {\n  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.6);\n}\n", "", {"version":3,"sources":["/./ReportEditor.scss"],"names":[],"mappings":"AAAA;EACE,cAAc;CACf;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,cAAc;EACd,QAAQ;EACR,gBAAgB;EAChB,+BAA+B;CAChC;;AAED;EACE,eAAe;EACf,mBAAmB;CACpB;;AAED;EACE,8BAA8B;CAC/B;;AAED;EACE,cAAc;EACd,uBAAuB;EACvB,gBAAgB;EAChB,aAAa;EACb,eAAe;EACf,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,+BAA+B;EAC/B,oBAAoB;EACpB,iDAAkC;EAClC,sBAAsB;CACvB;;AAED;EACE,0CAA2B;CAC5B","file":"ReportEditor.scss","sourcesContent":[".editor {\r\n  padding: 1rem;\r\n}\r\n\r\n.header {\r\n  margin-bottom: 1rem;\r\n}\r\n\r\n.list {\r\n  display: flex;\r\n  flex: 1;\r\n  flex-wrap: wrap;\r\n  justify-content: space-between;\r\n}\r\n\r\n.listContainer {\r\n  overflow: auto;\r\n  position: relative;\r\n}\r\n\r\n.listContainer > div {\r\n  position: absolute !important;\r\n}\r\n\r\n.item {\r\n  display: flex;\r\n  flex-direction: column;\r\n  padding: 0.4rem;\r\n  width: 10rem;\r\n  height: 6.8rem;\r\n  margin: 1rem 0;\r\n  cursor: pointer;\r\n  background-color: #fff;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  box-shadow: 0 0.1rem 0.1rem 0 rgba(0, 0, 0, 0.2);\r\n  border-radius: 0.1rem;\r\n}\r\n\r\n.active, .item:hover {\r\n  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.6)\r\n}"],"sourceRoot":"webpack://"}]);

	// exports
	exports.locals = {
		"editor": "editor___13P6x",
		"header": "header___bOuES",
		"list": "list___2oths",
		"listContainer": "listContainer___3gCYa",
		"item": "item___RIKj-",
		"active": "active___178dk"
	};

/***/ },
/* 12 */
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
/* 13 */
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
/* 14 */
/***/ function(module, exports) {

	module.exports = Studio.libraries['react'];

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = Studio;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(4);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(5);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(7);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(6);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(8);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(14);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ReportsButton = function (_Component) {
	  (0, _inherits3.default)(ReportsButton, _Component);

	  function ReportsButton() {
	    (0, _classCallCheck3.default)(this, ReportsButton);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ReportsButton).apply(this, arguments));
	  }

	  (0, _createClass3.default)(ReportsButton, [{
	    key: 'openReports',
	    value: function openReports() {
	      Studio.openTab({ key: 'Reports', editorComponentKey: 'reports', title: 'Reports' });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      return _react2.default.createElement(
	        'div',
	        { onClick: function onClick() {
	            return _this2.openReports();
	          } },
	        _react2.default.createElement('i', { className: 'fa fa-folder-open-o' }),
	        ' Reports'
	      );
	    }
	  }]);
	  return ReportsButton;
	}(_react.Component);

	ReportsButton.propTypes = {
	  tab: _react2.default.PropTypes.object,
	  onUpdate: _react2.default.PropTypes.func.isRequired
	};
	exports.default = ReportsButton;

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

	var _createClass2 = __webpack_require__(7);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(6);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(8);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(14);

	var _react2 = _interopRequireDefault(_react);

	var _ReportEditor = __webpack_require__(1);

	var _ReportEditor2 = _interopRequireDefault(_ReportEditor);

	var _jsreportStudio = __webpack_require__(15);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DownloadButton = function (_Component) {
	  (0, _inherits3.default)(DownloadButton, _Component);

	  function DownloadButton() {
	    (0, _classCallCheck3.default)(this, DownloadButton);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(DownloadButton).apply(this, arguments));
	  }

	  (0, _createClass3.default)(DownloadButton, [{
	    key: 'download',
	    value: function download() {
	      if (_ReportEditor2.default.ActiveReport) {
	        window.open((0, _jsreportStudio.relativizeUrl)('/reports/' + _ReportEditor2.default.ActiveReport._id + '/content'), '_blank');
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      if (!this.props.tab || this.props.tab.key !== 'Reports' || !_ReportEditor2.default.ActiveReport) {
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
	  return DownloadButton;
	}(_react.Component);

	DownloadButton.propTypes = {
	  tab: _react2.default.PropTypes.object,
	  onUpdate: _react2.default.PropTypes.func.isRequired
	};
	exports.default = DownloadButton;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(4);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(5);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(7);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(6);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(8);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(14);

	var _react2 = _interopRequireDefault(_react);

	var _ReportEditor = __webpack_require__(1);

	var _ReportEditor2 = _interopRequireDefault(_ReportEditor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DeleteButton = function (_Component) {
	  (0, _inherits3.default)(DeleteButton, _Component);

	  function DeleteButton() {
	    (0, _classCallCheck3.default)(this, DeleteButton);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(DeleteButton).apply(this, arguments));
	  }

	  (0, _createClass3.default)(DeleteButton, [{
	    key: 'remove',
	    value: function remove() {
	      if (_ReportEditor2.default.ActiveReport) {
	        window.open('/reports/' + _ReportEditor2.default.ActiveReport._id + '/content', '_blank');
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      if (!this.props.tab || this.props.tab.key !== 'Reports' || !_ReportEditor2.default.ActiveReport) {
	        return _react2.default.createElement('div', null);
	      }

	      return _react2.default.createElement(
	        'div',
	        { className: 'toolbar-button', onClick: function onClick() {
	            return _this2.remove();
	          } },
	        _react2.default.createElement('i', { className: 'fa fa-trash' }),
	        'Delete'
	      );
	    }
	  }]);
	  return DeleteButton;
	}(_react.Component);

	DeleteButton.propTypes = {
	  tab: _react2.default.PropTypes.object,
	  onUpdate: _react2.default.PropTypes.func.isRequired
	};
	exports.default = DeleteButton;

/***/ }
/******/ ]);