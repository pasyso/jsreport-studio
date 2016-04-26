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

	var _ImageEditor = __webpack_require__(1);

	var _ImageEditor2 = _interopRequireDefault(_ImageEditor);

	var _ImageUploadButton = __webpack_require__(12);

	var _ImageUploadButton2 = _interopRequireDefault(_ImageUploadButton);

	var _jsreportStudio = __webpack_require__(15);

	var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_jsreportStudio2.default.registerEntitySet({ name: 'images', faIcon: 'fa-camera', visibleName: 'image', onNew: _ImageUploadButton2.default.OpenUpload });
	_jsreportStudio2.default.registerTabEditorComponent('images', _ImageEditor2.default);
	_jsreportStudio2.default.registerToolbarComponent(_ImageUploadButton2.default);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(2);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(4);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(5);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(6);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _ImageEditor = __webpack_require__(7);

	var _ImageEditor2 = _interopRequireDefault(_ImageEditor);

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ImageEditor = function (_Component) {
	  (0, _inherits3.default)(ImageEditor, _Component);

	  function ImageEditor() {
	    (0, _classCallCheck3.default)(this, ImageEditor);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ImageEditor).apply(this, arguments));
	  }

	  (0, _createClass3.default)(ImageEditor, [{
	    key: 'render',
	    value: function render() {
	      var entity = this.props.entity;


	      return _react2.default.createElement(
	        'div',
	        { className: _ImageEditor2.default.editor },
	        _react2.default.createElement(
	          'div',
	          { className: _ImageEditor2.default.header },
	          _react2.default.createElement(
	            'h1',
	            null,
	            _react2.default.createElement('i', { className: 'fa fa-camera' }),
	            ' ',
	            entity.name
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(
	            'div',
	            null,
	            'Embed into template using:',
	            _react2.default.createElement(
	              'code',
	              null,
	              _react2.default.createElement(
	                'h2',
	                null,
	                '<img src=\'',
	                '{#image ' + entity.name + "}'",
	                '/>'
	              )
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { style: { overflow: 'auto' } },
	          _react2.default.createElement('img', { src: 'data:image/png;base64,' + entity.content, style: { display: 'block', margin: '3rem auto' } })
	        )
	      );
	    }
	  }]);
	  return ImageEditor;
	}(_react.Component);

	ImageEditor.propTypes = {
	  entity: _react2.default.PropTypes.object.isRequired
	};
	exports.default = ImageEditor;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['core-js/object/get-prototype-of'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['helpers/classCallCheck'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['helpers/createClass'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['helpers/possibleConstructorReturn'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['helpers/inherits'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!./../../../node_modules/sass-loader/index.js?outputStyle=expanded&sourceMap!./ImageEditor.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!./../../../node_modules/sass-loader/index.js?outputStyle=expanded&sourceMap!./ImageEditor.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, ".editor___3oMkP {\n  padding: 1rem;\n}\n\n.header___lnWVy {\n  margin-bottom: 1rem;\n}\n", "", {"version":3,"sources":["/./ImageEditor.scss"],"names":[],"mappings":"AAAA;EACE,cAAc;CACf;;AAED;EACE,oBAAoB;CACrB","file":"ImageEditor.scss","sourcesContent":[".editor {\r\n  padding: 1rem;\r\n}\r\n\r\n.header {\r\n  margin-bottom: 1rem;\r\n}"],"sourceRoot":"webpack://"}]);

	// exports
	exports.locals = {
		"editor": "editor___3oMkP",
		"header": "header___lnWVy"
	};

/***/ },
/* 9 */
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
/* 10 */
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
/* 11 */
/***/ function(module, exports) {

	module.exports = Studio.libraries['react'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _assign = __webpack_require__(13);

	var _assign2 = _interopRequireDefault(_assign);

	var _getPrototypeOf = __webpack_require__(2);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(4);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(5);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(6);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	var _superagent = __webpack_require__(14);

	var _superagent2 = _interopRequireDefault(_superagent);

	var _jsreportStudio = __webpack_require__(15);

	var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _imageUploadButton = void 0;

	var ImageUploadButton = function (_Component) {
	  (0, _inherits3.default)(ImageUploadButton, _Component);

	  function ImageUploadButton() {
	    (0, _classCallCheck3.default)(this, ImageUploadButton);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ImageUploadButton).apply(this, arguments));
	  }

	  (0, _createClass3.default)(ImageUploadButton, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      _imageUploadButton = this;
	    }
	  }, {
	    key: 'upload',
	    value: function upload(e) {
	      var _this2 = this;

	      if (!e.target.files.length) {
	        return;
	      }

	      var file = e.target.files[0];
	      var reader = new FileReader();

	      reader.onloadend = function () {
	        if (_this2.forNew) {
	          _superagent2.default.post(_jsreportStudio2.default.relativizeUrl('/api/image')).attach('file.png', file).end(function (err, res) {
	            if (err) {
	              return alert('Uploading image failed.');
	            }

	            var response = JSON.parse(res.text);
	            var entity = {
	              __entitySet: 'images',
	              _id: response._id,
	              name: response.name,
	              shortid: response.shortid
	            };
	            _jsreportStudio2.default.addExistingEntity(entity);
	            _jsreportStudio2.default.openTab((0, _assign2.default)({}, entity));
	          });
	        } else {
	          _superagent2.default.post(_jsreportStudio2.default.relativizeUrl('/api/image/') + _this2.props.tab.entity.shortid).attach('file.png', file).end(function (err, res) {
	            if (err) {
	              return alert('Uploading image failed.');
	            }

	            _jsreportStudio2.default.reloadEntity(_this2.props.tab.entity._id);
	          });
	        }
	      };

	      reader.onerror = function () {
	        alert('There was an error reading the file!');
	      };

	      reader.readAsBinaryString(file);
	    }
	  }, {
	    key: 'openFileDialog',
	    value: function openFileDialog(forNew) {
	      this.forNew = forNew;

	      this.refs.file.dispatchEvent(new MouseEvent('click', {
	        'view': window,
	        'bubbles': false,
	        'cancelable': true
	      }));
	    }
	  }, {
	    key: 'renderUpload',
	    value: function renderUpload() {
	      var _this3 = this;

	      return _react2.default.createElement('input', {
	        type: 'file', key: 'file', ref: 'file', style: { display: 'none' }, onChange: function onChange(e) {
	          return _this3.upload(e);
	        },
	        accept: 'image/*' });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this4 = this;

	      if (!this.props.tab || !this.props.tab.entity || this.props.tab.entity.__entitySet !== 'images') {
	        return this.renderUpload(true);
	      }

	      return _react2.default.createElement(
	        'div',
	        { className: 'toolbar-button', onClick: function onClick() {
	            console.log('ups');_this4.openFileDialog();
	          } },
	        _react2.default.createElement('i', { className: 'fa fa-cloud-upload' }),
	        'Upload',
	        this.renderUpload()
	      );
	    }
	  }], [{
	    key: 'OpenUpload',
	    value: function OpenUpload() {
	      _imageUploadButton.openFileDialog(true);
	    }
	  }]);
	  return ImageUploadButton;
	}(_react.Component);

	ImageUploadButton.propTypes = {
	  tab: _react2.default.PropTypes.object,
	  onUpdate: _react2.default.PropTypes.func.isRequired
	};
	exports.default = ImageUploadButton;

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['core-js/object/assign'];

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = Studio.libraries['superagent'];

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = Studio;

/***/ }
/******/ ]);