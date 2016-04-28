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

	var _ImageUploadButton = __webpack_require__(8);

	var _ImageUploadButton2 = _interopRequireDefault(_ImageUploadButton);

	var _jsreportStudio = __webpack_require__(11);

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

	var _react = __webpack_require__(7);

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
	        { className: 'custom-editor' },
	        _react2.default.createElement(
	          'div',
	          null,
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
/***/ function(module, exports) {

	module.exports = Studio.libraries['react'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _assign = __webpack_require__(9);

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

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _superagent = __webpack_require__(10);

	var _superagent2 = _interopRequireDefault(_superagent);

	var _jsreportStudio = __webpack_require__(11);

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
/* 9 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['core-js/object/assign'];

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = Studio.libraries['superagent'];

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = Studio;

/***/ }
/******/ ]);