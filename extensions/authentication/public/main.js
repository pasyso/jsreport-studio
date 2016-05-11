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
	
	var _UserEditor = __webpack_require__(3);
	
	var _UserEditor2 = _interopRequireDefault(_UserEditor);
	
	var _LogoutSettingsButton = __webpack_require__(12);
	
	var _LogoutSettingsButton2 = _interopRequireDefault(_LogoutSettingsButton);
	
	var _ChangePasswordSettingsButton = __webpack_require__(13);
	
	var _ChangePasswordSettingsButton2 = _interopRequireDefault(_ChangePasswordSettingsButton);
	
	var _ChangePasswordButton = __webpack_require__(14);
	
	var _ChangePasswordButton2 = _interopRequireDefault(_ChangePasswordButton);
	
	var _jsreportStudio = __webpack_require__(11);
	
	var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// we want to be at the front, because other extension like scheduling relies on loaded user
	_jsreportStudio2.default.initializeListeners.unshift((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
	  var response;
	  return _regenerator2.default.wrap(function _callee$(_context) {
	    while (1) {
	      switch (_context.prev = _context.next) {
	        case 0:
	          _context.next = 2;
	          return _jsreportStudio2.default.api.get('/api/settings');
	
	        case 2:
	          response = _context.sent;
	
	          if (response.tenant) {
	            _context.next = 5;
	            break;
	          }
	
	          return _context.abrupt('return');
	
	        case 5:
	
	          _jsreportStudio2.default.authentication = { user: response.tenant };
	
	          if (_jsreportStudio2.default.authentication.user.isAdmin) {
	            _jsreportStudio2.default.addEntitySet({
	              name: 'users',
	              faIcon: 'fa-user',
	              visibleName: 'user',
	              nameAttribute: 'username',
	              onNew: function onNew() {
	                return _jsreportStudio2.default.openModal('NEW_USER_MODAL');
	              }
	            });
	            _jsreportStudio2.default.addEditorComponent('users', _UserEditor2.default);
	            _jsreportStudio2.default.addToolbarComponent(_ChangePasswordButton2.default);
	          }
	
	          _jsreportStudio2.default.addToolbarComponent(_LogoutSettingsButton2.default, 'settings');
	          _jsreportStudio2.default.addToolbarComponent(_ChangePasswordSettingsButton2.default, 'settings');
	
	        case 9:
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
	
	var _ChangePasswordModal = __webpack_require__(10);
	
	var _ChangePasswordModal2 = _interopRequireDefault(_ChangePasswordModal);
	
	var _jsreportStudio = __webpack_require__(11);
	
	var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var DataEditor = function (_Component) {
	  (0, _inherits3.default)(DataEditor, _Component);
	
	  function DataEditor() {
	    (0, _classCallCheck3.default)(this, DataEditor);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(DataEditor).apply(this, arguments));
	  }
	
	  (0, _createClass3.default)(DataEditor, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      if (this.props.entity.__isNew && !this.props.entity.password) {
	        _jsreportStudio2.default.openModal(_ChangePasswordModal2.default, { entity: this.props.entity });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var entity = this.props.entity;
	
	
	      return _react2.default.createElement(
	        'div',
	        { className: 'custom-editor' },
	        _react2.default.createElement(
	          'h1',
	          null,
	          _react2.default.createElement('i', { className: 'fa fa-user' }),
	          ' ',
	          entity.username
	        )
	      );
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
	
	var _jsreportStudio = __webpack_require__(11);
	
	var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ChangePasswordModal = function (_Component) {
	  (0, _inherits3.default)(ChangePasswordModal, _Component);
	
	  function ChangePasswordModal() {
	    (0, _classCallCheck3.default)(this, ChangePasswordModal);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ChangePasswordModal).call(this));
	
	    _this.state = {};
	    return _this;
	  }
	
	  (0, _createClass3.default)(ChangePasswordModal, [{
	    key: 'changePassword',
	    value: function () {
	      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
	        var entity, close, data;
	        return _regenerator2.default.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                entity = this.props.options.entity;
	                close = this.props.close;
	                _context.prev = 2;
	                data = {
	                  newPassword: this.refs.newPassword1.value
	                };
	
	
	                if (!_jsreportStudio2.default.authentication.user.isAdmin) {
	                  data.oldPassword = this.refs.oldPassword.value;
	                }
	
	                _context.next = 7;
	                return _jsreportStudio2.default.api.post('/api/users/' + entity.shortid + '/password', { data: data });
	
	              case 7:
	                this.refs.newPassword1.value = '';
	                this.refs.newPassword2.value = '';
	                close();
	                _context.next = 15;
	                break;
	
	              case 12:
	                _context.prev = 12;
	                _context.t0 = _context['catch'](2);
	
	                this.setState({ apiError: _context.t0.message });
	
	              case 15:
	              case 'end':
	                return _context.stop();
	            }
	          }
	        }, _callee, this, [[2, 12]]);
	      }));
	
	      function changePassword() {
	        return ref.apply(this, arguments);
	      }
	
	      return changePassword;
	    }()
	  }, {
	    key: 'validatePassword',
	    value: function validatePassword() {
	      this.setState({
	        passwordError: this.refs.newPassword2.value && this.refs.newPassword2.value !== this.refs.newPassword1.value,
	        apiError: null
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      return _react2.default.createElement(
	        'div',
	        null,
	        _jsreportStudio2.default.authentication.user.isAdmin ? '' : _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'old password'
	          ),
	          _react2.default.createElement('input', { type: 'password', ref: 'oldPassword' })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'new password'
	          ),
	          _react2.default.createElement('input', { type: 'password', ref: 'newPassword1' })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'new password verification'
	          ),
	          _react2.default.createElement('input', { type: 'password', ref: 'newPassword2', onChange: function onChange() {
	              return _this2.validatePassword();
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'span',
	            { style: { color: 'red', display: this.state.passwordError ? 'block' : 'none' } },
	            'password doesn\'t match'
	          ),
	          _react2.default.createElement(
	            'span',
	            { style: { color: 'red', display: this.state.apiError ? 'block' : 'none' } },
	            this.state.apiError
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'button-bar' },
	          _react2.default.createElement(
	            'button',
	            { className: 'button confirmation', onClick: function onClick() {
	                return _this2.changePassword();
	              } },
	            'ok'
	          )
	        )
	      );
	    }
	  }]);
	  return ChangePasswordModal;
	}(_react.Component);
	
	ChangePasswordModal.propTypes = {
	  close: _react.PropTypes.func.isRequired,
	  options: _react.PropTypes.object.isRequired
	};
	exports.default = ChangePasswordModal;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = Studio;

/***/ },
/* 12 */
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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LogoutSettingsButton = function (_Component) {
	  (0, _inherits3.default)(LogoutSettingsButton, _Component);
	
	  function LogoutSettingsButton() {
	    (0, _classCallCheck3.default)(this, LogoutSettingsButton);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(LogoutSettingsButton).apply(this, arguments));
	  }
	
	  (0, _createClass3.default)(LogoutSettingsButton, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'div',
	          {
	            onClick: function onClick() {
	              return _this2.refs.logout.click();
	            }, style: { cursor: 'pointer' } },
	          _react2.default.createElement(
	            'form',
	            { method: 'POST', action: '/logout' },
	            _react2.default.createElement('input', { ref: 'logout', type: 'submit', id: 'logoutBtn', style: { display: 'none' } })
	          ),
	          _react2.default.createElement('i', { className: 'fa fa-power-off' }),
	          ' Logout'
	        )
	      );
	    }
	  }]);
	  return LogoutSettingsButton;
	}(_react.Component);

	exports.default = LogoutSettingsButton;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ChangePasswordModal = __webpack_require__(10);
	
	var _ChangePasswordModal2 = _interopRequireDefault(_ChangePasswordModal);
	
	var _jsreportStudio = __webpack_require__(11);
	
	var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (props) {
	  return _jsreportStudio2.default.authentication.user.isAdmin ? React.createElement('span', null) : React.createElement(
	    'div',
	    null,
	    React.createElement(
	      'a',
	      {
	        id: 'changePassword',
	        onClick: function onClick() {
	          return _jsreportStudio2.default.openModal(_ChangePasswordModal2.default, { entity: _jsreportStudio2.default.authentication.user });
	        },
	        style: { cursor: 'pointer' } },
	      React.createElement('i', { className: 'fa fa-key' }),
	      'Change password'
	    )
	  );
	};

/***/ },
/* 14 */
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
	
	var _ChangePasswordModal = __webpack_require__(10);
	
	var _ChangePasswordModal2 = _interopRequireDefault(_ChangePasswordModal);
	
	var _jsreportStudio = __webpack_require__(11);
	
	var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ChangePasswordButton = function (_Component) {
	  (0, _inherits3.default)(ChangePasswordButton, _Component);
	
	  function ChangePasswordButton() {
	    (0, _classCallCheck3.default)(this, ChangePasswordButton);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ChangePasswordButton).apply(this, arguments));
	  }
	
	  (0, _createClass3.default)(ChangePasswordButton, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      if (!this.props.tab || !this.props.tab.entity || this.props.tab.entity.__entitySet !== 'users') {
	        return _react2.default.createElement('span', null);
	      }
	
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'div',
	          {
	            className: 'toolbar-button',
	            onClick: function onClick(e) {
	              return _jsreportStudio2.default.openModal(_ChangePasswordModal2.default, { entity: _this2.props.tab.entity });
	            } },
	          _react2.default.createElement('i', { className: 'fa fa-key' }),
	          ' Change Password'
	        )
	      );
	    }
	  }]);
	  return ChangePasswordButton;
	}(_react.Component);
	
	ChangePasswordButton.propTypes = {
	  tab: _react2.default.PropTypes.object,
	  onUpdate: _react2.default.PropTypes.func.isRequired
	};
	exports.default = ChangePasswordButton;

/***/ }
/******/ ]);