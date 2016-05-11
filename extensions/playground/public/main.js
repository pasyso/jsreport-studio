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
	
	var _jsreportStudio = __webpack_require__(3);
	
	var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);
	
	__webpack_require__(4);
	
	var _shortid = __webpack_require__(5);
	
	var _shortid2 = _interopRequireDefault(_shortid);
	
	var _save = __webpack_require__(14);
	
	var _save2 = _interopRequireDefault(_save);
	
	var _toolbar = __webpack_require__(47);
	
	var _toolbar2 = _interopRequireDefault(_toolbar);
	
	var _Startup = __webpack_require__(56);
	
	var _Startup2 = _interopRequireDefault(_Startup);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_jsreportStudio2.default.workspaces = {};
	
	_jsreportStudio2.default.workspaces.current = {};
	
	var workspaceRegex = /\/studio\/workspace\/([^\/]+)\/([^\/]+)/;
	var playgroundRegex = /[\/]?playground\/([^\/]+)[\/]?([^\/]+)?/;
	
	var getQueryParameter = function getQueryParameter(name) {
	  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
	  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
	};
	
	var isEmbed = getQueryParameter('embed') != null;
	
	_jsreportStudio2.default.toolbarVisibilityResolver = function (text) {
	  return text === 'Run';
	};
	
	_jsreportStudio2.default.addEditorComponent('Help', _Startup2.default);
	_jsreportStudio2.default.addStartupPage('Help', 'Help', 'Get Started');
	
	(0, _toolbar2.default)(isEmbed);
	_jsreportStudio2.default.workspaces.save = _save2.default;
	
	_jsreportStudio2.default.readyListeners.push((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
	  var entity;
	  return _regenerator2.default.wrap(function _callee$(_context) {
	    while (1) {
	      switch (_context.prev = _context.next) {
	        case 0:
	          if (isEmbed) {
	            _jsreportStudio2.default.collapseLeft();
	          }
	
	          if (_jsreportStudio2.default.workspaces.current.default) {
	            entity = _jsreportStudio2.default.getEntityByShortid(_jsreportStudio2.default.workspaces.current.default, false);
	
	            if (entity) {
	              _jsreportStudio2.default.openTab({ _id: entity._id });
	            }
	          }
	
	        case 2:
	        case 'end':
	          return _context.stop();
	      }
	    }
	  }, _callee, undefined);
	})));
	
	_jsreportStudio2.default.initializeListeners.push((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
	  var match, response, oldMatch;
	  return _regenerator2.default.wrap(function _callee2$(_context2) {
	    while (1) {
	      switch (_context2.prev = _context2.next) {
	        case 0:
	          match = workspaceRegex.exec(window.location.pathname);
	
	          if (!match) {
	            _context2.next = 8;
	            break;
	          }
	
	          _context2.next = 4;
	          return _jsreportStudio2.default.api.get('/odata/workspaces?$filter=shortid eq \'' + match[1] + '\' and version eq ' + parseInt(match[2]));
	
	        case 4:
	          response = _context2.sent;
	
	
	          _jsreportStudio2.default.workspaces.current = response.value.length ? response.value[0] : {
	            shortid: match[1],
	            version: parseInt(match[2])
	          };
	          _context2.next = 13;
	          break;
	
	        case 8:
	          oldMatch = playgroundRegex.exec(window.location.hash);
	
	
	          if (oldMatch) {
	            window.location = '/studio/workspace/' + oldMatch[1] + (oldMatch[2] ? '/' + oldMatch[2] : '/1');
	          }
	
	          _jsreportStudio2.default.workspaces.current.shortid = _shortid2.default.generate();
	          _jsreportStudio2.default.workspaces.current.version = 1;
	          _jsreportStudio2.default.store.dispatch(_jsreportStudio2.default.editor.actions.updateHistory());
	
	        case 13:
	
	          _jsreportStudio2.default.addApiHeaders({
	            'workspace-shortid': _jsreportStudio2.default.workspaces.current.shortid,
	            'workspace-version': _jsreportStudio2.default.workspaces.current.version
	          });
	
	        case 14:
	        case 'end':
	          return _context2.stop();
	      }
	    }
	  }, _callee2, undefined);
	})));
	
	_jsreportStudio2.default.locationResolver = function (path, entity) {
	  return '/studio/workspace/' + _jsreportStudio2.default.workspaces.current.shortid + '/' + _jsreportStudio2.default.workspaces.current.version;
	};
	
	_jsreportStudio2.default.loadReferencesListeners.push(function () {
	  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(entitySet) {
	    var nameAttribute, response;
	    return _regenerator2.default.wrap(function _callee3$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            nameAttribute = _jsreportStudio2.default.entitySets[entitySet].nameAttribute;
	            _context3.next = 3;
	            return _jsreportStudio2.default.api.get('/odata/' + entitySet + '?$filter=workspaceVersion eq ' + _jsreportStudio2.default.workspaces.current.version + ' and workspaceShortid eq \'' + _jsreportStudio2.default.workspaces.current.shortid + '\'&$select=' + nameAttribute + ',shortid&$orderby=' + nameAttribute);
	
	          case 3:
	            response = _context3.sent;
	
	
	            _jsreportStudio2.default.store.dispatch({
	              type: _jsreportStudio2.default.entities.ActionTypes.LOAD_REFERENCES,
	              entities: response.value,
	              entitySet: entitySet
	            });
	
	            if (!isEmbed) {
	              _jsreportStudio2.default.openTab({ key: 'Help', editorComponentKey: 'Help', title: 'Get Started' });
	            }
	
	            response.value.forEach(function (v) {
	              return _jsreportStudio2.default.openTab({ _id: v._id });
	            });
	
	            return _context3.abrupt('return', 'block');
	
	          case 8:
	          case 'end':
	            return _context3.stop();
	        }
	      }
	    }, _callee3, undefined);
	  }));
	  return function (_x) {
	    return ref.apply(this, arguments);
	  };
	}());
	
	_jsreportStudio2.default.workspaces.setDefault = function () {
	  if (_jsreportStudio2.default.workspaces.current.default === _jsreportStudio2.default.getActiveEntity().shortid) {
	    _jsreportStudio2.default.workspaces.current.default = undefined;
	  } else {
	    _jsreportStudio2.default.workspaces.current.default = _jsreportStudio2.default.getActiveEntity().shortid;
	  }
	  _jsreportStudio2.default.workspaces.save();
	};

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
/***/ function(module, exports) {

	module.exports = Studio;

/***/ },
/* 4 */
/***/ function(module, exports) {

	ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(acequire, exports, module) {
	"use strict";
	
	var oop = acequire("../lib/oop");
	var TextHighlightRules = acequire("./text_highlight_rules").TextHighlightRules;
	
	var DocCommentHighlightRules = function() {
	    this.$rules = {
	        "start" : [ {
	            token : "comment.doc.tag",
	            regex : "@[\\w\\d_]+" // TODO: fix email addresses
	        }, 
	        DocCommentHighlightRules.getTagRule(),
	        {
	            defaultToken : "comment.doc",
	            caseInsensitive: true
	        }]
	    };
	};
	
	oop.inherits(DocCommentHighlightRules, TextHighlightRules);
	
	DocCommentHighlightRules.getTagRule = function(start) {
	    return {
	        token : "comment.doc.tag.storage.type",
	        regex : "\\b(?:TODO|FIXME|XXX|HACK)\\b"
	    };
	}
	
	DocCommentHighlightRules.getStartRule = function(start) {
	    return {
	        token : "comment.doc", // doc comment
	        regex : "\\/\\*(?=\\*)",
	        next  : start
	    };
	};
	
	DocCommentHighlightRules.getEndRule = function (start) {
	    return {
	        token : "comment.doc", // closing comment
	        regex : "\\*\\/",
	        next  : start
	    };
	};
	
	
	exports.DocCommentHighlightRules = DocCommentHighlightRules;
	
	});
	
	ace.define("ace/mode/javascript_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"], function(acequire, exports, module) {
	"use strict";
	
	var oop = acequire("../lib/oop");
	var DocCommentHighlightRules = acequire("./doc_comment_highlight_rules").DocCommentHighlightRules;
	var TextHighlightRules = acequire("./text_highlight_rules").TextHighlightRules;
	var identifierRe = "[a-zA-Z\\$_\u00a1-\uffff][a-zA-Z\\d\\$_\u00a1-\uffff]*\\b";
	
	var JavaScriptHighlightRules = function(options) {
	    var keywordMapper = this.createKeywordMapper({
	        "variable.language":
	            "Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|"  + // Constructors
	            "Namespace|QName|XML|XMLList|"                                             + // E4X
	            "ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|"   +
	            "Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|"                    +
	            "Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|"   + // Errors
	            "SyntaxError|TypeError|URIError|"                                          +
	            "decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|" + // Non-constructor functions
	            "isNaN|parseFloat|parseInt|"                                               +
	            "JSON|Math|"                                                               + // Other
	            "this|arguments|prototype|window|document"                                 , // Pseudo
	        "keyword":
	            "const|yield|import|get|set|" +
	            "break|case|catch|continue|default|delete|do|else|finally|for|function|" +
	            "if|in|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|debugger|" +
	            "__parent__|__count__|escape|unescape|with|__proto__|" +
	            "class|enum|extends|super|export|implements|private|public|interface|package|protected|static",
	        "storage.type":
	            "const|let|var|function",
	        "constant.language":
	            "null|Infinity|NaN|undefined",
	        "support.function":
	            "alert",
	        "constant.language.boolean": "true|false"
	    }, "identifier");
	    var kwBeforeRe = "case|do|else|finally|in|instanceof|return|throw|try|typeof|yield|void";
	
	    var escapedRe = "\\\\(?:x[0-9a-fA-F]{2}|" + // hex
	        "u[0-9a-fA-F]{4}|" + // unicode
	        "[0-2][0-7]{0,2}|" + // oct
	        "3[0-6][0-7]?|" + // oct
	        "37[0-7]?|" + // oct
	        "[4-7][0-7]?|" + //oct
	        ".)";
	
	    this.$rules = {
	        "no_regex" : [
	            {
	                token : "comment",
	                regex : "\\/\\/",
	                next : "line_comment"
	            },
	            DocCommentHighlightRules.getStartRule("doc-start"),
	            {
	                token : "comment", // multi line comment
	                regex : /\/\*/,
	                next : "comment"
	            }, {
	                token : "string",
	                regex : "'(?=.)",
	                next  : "qstring"
	            }, {
	                token : "string",
	                regex : '"(?=.)',
	                next  : "qqstring"
	            }, {
	                token : "constant.numeric", // hex
	                regex : /0[xX][0-9a-fA-F]+\b/
	            }, {
	                token : "constant.numeric", // float
	                regex : /[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/
	            }, {
	                token : [
	                    "storage.type", "punctuation.operator", "support.function",
	                    "punctuation.operator", "entity.name.function", "text","keyword.operator"
	                ],
	                regex : "(" + identifierRe + ")(\\.)(prototype)(\\.)(" + identifierRe +")(\\s*)(=)",
	                next: "function_arguments"
	            }, {
	                token : [
	                    "storage.type", "punctuation.operator", "entity.name.function", "text",
	                    "keyword.operator", "text", "storage.type", "text", "paren.lparen"
	                ],
	                regex : "(" + identifierRe + ")(\\.)(" + identifierRe +")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",
	                next: "function_arguments"
	            }, {
	                token : [
	                    "entity.name.function", "text", "keyword.operator", "text", "storage.type",
	                    "text", "paren.lparen"
	                ],
	                regex : "(" + identifierRe +")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",
	                next: "function_arguments"
	            }, {
	                token : [
	                    "storage.type", "punctuation.operator", "entity.name.function", "text",
	                    "keyword.operator", "text",
	                    "storage.type", "text", "entity.name.function", "text", "paren.lparen"
	                ],
	                regex : "(" + identifierRe + ")(\\.)(" + identifierRe +")(\\s*)(=)(\\s*)(function)(\\s+)(\\w+)(\\s*)(\\()",
	                next: "function_arguments"
	            }, {
	                token : [
	                    "storage.type", "text", "entity.name.function", "text", "paren.lparen"
	                ],
	                regex : "(function)(\\s+)(" + identifierRe + ")(\\s*)(\\()",
	                next: "function_arguments"
	            }, {
	                token : [
	                    "entity.name.function", "text", "punctuation.operator",
	                    "text", "storage.type", "text", "paren.lparen"
	                ],
	                regex : "(" + identifierRe + ")(\\s*)(:)(\\s*)(function)(\\s*)(\\()",
	                next: "function_arguments"
	            }, {
	                token : [
	                    "text", "text", "storage.type", "text", "paren.lparen"
	                ],
	                regex : "(:)(\\s*)(function)(\\s*)(\\()",
	                next: "function_arguments"
	            }, {
	                token : "keyword",
	                regex : "(?:" + kwBeforeRe + ")\\b",
	                next : "start"
	            }, {
	                token : ["support.constant"],
	                regex : /that\b/
	            }, {
	                token : ["storage.type", "punctuation.operator", "support.function.firebug"],
	                regex : /(console)(\.)(warn|info|log|error|time|trace|timeEnd|assert)\b/
	            }, {
	                token : keywordMapper,
	                regex : identifierRe
	            }, {
	                token : "punctuation.operator",
	                regex : /[.](?![.])/,
	                next  : "property"
	            }, {
	                token : "keyword.operator",
	                regex : /--|\+\+|\.{3}|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\|\||\?\:|[!$%&*+\-~\/^]=?/,
	                next  : "start"
	            }, {
	                token : "punctuation.operator",
	                regex : /[?:,;.]/,
	                next  : "start"
	            }, {
	                token : "paren.lparen",
	                regex : /[\[({]/,
	                next  : "start"
	            }, {
	                token : "paren.rparen",
	                regex : /[\])}]/
	            }, {
	                token: "comment",
	                regex: /^#!.*$/
	            }
	        ],
	        property: [{
	                token : "text",
	                regex : "\\s+"
	            }, {
	                token : [
	                    "storage.type", "punctuation.operator", "entity.name.function", "text",
	                    "keyword.operator", "text",
	                    "storage.type", "text", "entity.name.function", "text", "paren.lparen"
	                ],
	                regex : "(" + identifierRe + ")(\\.)(" + identifierRe +")(\\s*)(=)(\\s*)(function)(?:(\\s+)(\\w+))?(\\s*)(\\()",
	                next: "function_arguments"
	            }, {
	                token : "punctuation.operator",
	                regex : /[.](?![.])/
	            }, {
	                token : "support.function",
	                regex : /(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:op|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/
	            }, {
	                token : "support.function.dom",
	                regex : /(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName|ClassName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/
	            }, {
	                token :  "support.constant",
	                regex : /(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/
	            }, {
	                token : "identifier",
	                regex : identifierRe
	            }, {
	                regex: "",
	                token: "empty",
	                next: "no_regex"
	            }
	        ],
	        "start": [
	            DocCommentHighlightRules.getStartRule("doc-start"),
	            {
	                token : "comment", // multi line comment
	                regex : "\\/\\*",
	                next : "comment_regex_allowed"
	            }, {
	                token : "comment",
	                regex : "\\/\\/",
	                next : "line_comment_regex_allowed"
	            }, {
	                token: "string.regexp",
	                regex: "\\/",
	                next: "regex"
	            }, {
	                token : "text",
	                regex : "\\s+|^$",
	                next : "start"
	            }, {
	                token: "empty",
	                regex: "",
	                next: "no_regex"
	            }
	        ],
	        "regex": [
	            {
	                token: "regexp.keyword.operator",
	                regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"
	            }, {
	                token: "string.regexp",
	                regex: "/[sxngimy]*",
	                next: "no_regex"
	            }, {
	                token : "invalid",
	                regex: /\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/
	            }, {
	                token : "constant.language.escape",
	                regex: /\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?.]/
	            }, {
	                token : "constant.language.delimiter",
	                regex: /\|/
	            }, {
	                token: "constant.language.escape",
	                regex: /\[\^?/,
	                next: "regex_character_class"
	            }, {
	                token: "empty",
	                regex: "$",
	                next: "no_regex"
	            }, {
	                defaultToken: "string.regexp"
	            }
	        ],
	        "regex_character_class": [
	            {
	                token: "regexp.charclass.keyword.operator",
	                regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"
	            }, {
	                token: "constant.language.escape",
	                regex: "]",
	                next: "regex"
	            }, {
	                token: "constant.language.escape",
	                regex: "-"
	            }, {
	                token: "empty",
	                regex: "$",
	                next: "no_regex"
	            }, {
	                defaultToken: "string.regexp.charachterclass"
	            }
	        ],
	        "function_arguments": [
	            {
	                token: "variable.parameter",
	                regex: identifierRe
	            }, {
	                token: "punctuation.operator",
	                regex: "[, ]+"
	            }, {
	                token: "punctuation.operator",
	                regex: "$"
	            }, {
	                token: "empty",
	                regex: "",
	                next: "no_regex"
	            }
	        ],
	        "comment_regex_allowed" : [
	            DocCommentHighlightRules.getTagRule(),
	            {token : "comment", regex : "\\*\\/", next : "start"},
	            {defaultToken : "comment", caseInsensitive: true}
	        ],
	        "comment" : [
	            DocCommentHighlightRules.getTagRule(),
	            {token : "comment", regex : "\\*\\/", next : "no_regex"},
	            {defaultToken : "comment", caseInsensitive: true}
	        ],
	        "line_comment_regex_allowed" : [
	            DocCommentHighlightRules.getTagRule(),
	            {token : "comment", regex : "$|^", next : "start"},
	            {defaultToken : "comment", caseInsensitive: true}
	        ],
	        "line_comment" : [
	            DocCommentHighlightRules.getTagRule(),
	            {token : "comment", regex : "$|^", next : "no_regex"},
	            {defaultToken : "comment", caseInsensitive: true}
	        ],
	        "qqstring" : [
	            {
	                token : "constant.language.escape",
	                regex : escapedRe
	            }, {
	                token : "string",
	                regex : "\\\\$",
	                next  : "qqstring"
	            }, {
	                token : "string",
	                regex : '"|$',
	                next  : "no_regex"
	            }, {
	                defaultToken: "string"
	            }
	        ],
	        "qstring" : [
	            {
	                token : "constant.language.escape",
	                regex : escapedRe
	            }, {
	                token : "string",
	                regex : "\\\\$",
	                next  : "qstring"
	            }, {
	                token : "string",
	                regex : "'|$",
	                next  : "no_regex"
	            }, {
	                defaultToken: "string"
	            }
	        ]
	    };
	    
	    
	    if (!options || !options.noES6) {
	        this.$rules.no_regex.unshift({
	            regex: "[{}]", onMatch: function(val, state, stack) {
	                this.next = val == "{" ? this.nextState : "";
	                if (val == "{" && stack.length) {
	                    stack.unshift("start", state);
	                    return "paren";
	                }
	                if (val == "}" && stack.length) {
	                    stack.shift();
	                    this.next = stack.shift();
	                    if (this.next.indexOf("string") != -1 || this.next.indexOf("jsx") != -1)
	                        return "paren.quasi.end";
	                }
	                return val == "{" ? "paren.lparen" : "paren.rparen";
	            },
	            nextState: "start"
	        }, {
	            token : "string.quasi.start",
	            regex : /`/,
	            push  : [{
	                token : "constant.language.escape",
	                regex : escapedRe
	            }, {
	                token : "paren.quasi.start",
	                regex : /\${/,
	                push  : "start"
	            }, {
	                token : "string.quasi.end",
	                regex : /`/,
	                next  : "pop"
	            }, {
	                defaultToken: "string.quasi"
	            }]
	        });
	        
	        if (!options || !options.noJSX)
	            JSX.call(this);
	    }
	    
	    this.embedRules(DocCommentHighlightRules, "doc-",
	        [ DocCommentHighlightRules.getEndRule("no_regex") ]);
	    
	    this.normalizeRules();
	};
	
	oop.inherits(JavaScriptHighlightRules, TextHighlightRules);
	
	function JSX() {
	    var tagRegex = identifierRe.replace("\\d", "\\d\\-");
	    var jsxTag = {
	        onMatch : function(val, state, stack) {
	            var offset = val.charAt(1) == "/" ? 2 : 1;
	            if (offset == 1) {
	                if (state != this.nextState)
	                    stack.unshift(this.next, this.nextState, 0);
	                else
	                    stack.unshift(this.next);
	                stack[2]++;
	            } else if (offset == 2) {
	                if (state == this.nextState) {
	                    stack[1]--;
	                    if (!stack[1] || stack[1] < 0) {
	                        stack.shift();
	                        stack.shift();
	                    }
	                }
	            }
	            return [{
	                type: "meta.tag.punctuation." + (offset == 1 ? "" : "end-") + "tag-open.xml",
	                value: val.slice(0, offset)
	            }, {
	                type: "meta.tag.tag-name.xml",
	                value: val.substr(offset)
	            }];
	        },
	        regex : "</?" + tagRegex + "",
	        next: "jsxAttributes",
	        nextState: "jsx"
	    };
	    this.$rules.start.unshift(jsxTag);
	    var jsxJsRule = {
	        regex: "{",
	        token: "paren.quasi.start",
	        push: "start"
	    };
	    this.$rules.jsx = [
	        jsxJsRule,
	        jsxTag,
	        {include : "reference"},
	        {defaultToken: "string"}
	    ];
	    this.$rules.jsxAttributes = [{
	        token : "meta.tag.punctuation.tag-close.xml", 
	        regex : "/?>", 
	        onMatch : function(value, currentState, stack) {
	            if (currentState == stack[0])
	                stack.shift();
	            if (value.length == 2) {
	                if (stack[0] == this.nextState)
	                    stack[1]--;
	                if (!stack[1] || stack[1] < 0) {
	                    stack.splice(0, 2);
	                }
	            }
	            this.next = stack[0] || "start";
	            return [{type: this.token, value: value}];
	        },
	        nextState: "jsx"
	    }, 
	    jsxJsRule,
	    {
	        token : "entity.other.attribute-name.xml",
	        regex : tagRegex
	    }, {
	        token : "keyword.operator.attribute-equals.xml",
	        regex : "="
	    }, {
	        token : "text.tag-whitespace.xml",
	        regex : "\\s+"
	    }, {
	        token : "string.attribute-value.xml",
	        regex : "'",
	        stateName : "jsx_attr_q",
	        push : [
	            {token : "string.attribute-value.xml", regex: "'", next: "pop"},
	            jsxJsRule,
	            {include : "reference"},
	            {defaultToken : "string.attribute-value.xml"}
	        ]
	    }, {
	        token : "string.attribute-value.xml",
	        regex : '"',
	        stateName : "jsx_attr_qq",
	        push : [
	            jsxJsRule,
	            {token : "string.attribute-value.xml", regex: '"', next: "pop"},
	            {include : "reference"},
	            {defaultToken : "string.attribute-value.xml"}
	        ]
	    }];
	    this.$rules.reference = [{
	        token : "constant.language.escape.reference.xml",
	        regex : "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"
	    }];
	}
	
	exports.JavaScriptHighlightRules = JavaScriptHighlightRules;
	});
	
	ace.define("ace/mode/xml_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(acequire, exports, module) {
	"use strict";
	
	var oop = acequire("../lib/oop");
	var TextHighlightRules = acequire("./text_highlight_rules").TextHighlightRules;
	
	var XmlHighlightRules = function(normalize) {
	    var tagRegex = "[_:a-zA-Z\xc0-\uffff][-_:.a-zA-Z0-9\xc0-\uffff]*";
	
	    this.$rules = {
	        start : [
	            {token : "string.cdata.xml", regex : "<\\!\\[CDATA\\[", next : "cdata"},
	            {
	                token : ["punctuation.xml-decl.xml", "keyword.xml-decl.xml"],
	                regex : "(<\\?)(xml)(?=[\\s])", next : "xml_decl", caseInsensitive: true
	            },
	            {
	                token : ["punctuation.instruction.xml", "keyword.instruction.xml"],
	                regex : "(<\\?)(" + tagRegex + ")", next : "processing_instruction",
	            },
	            {token : "comment.xml", regex : "<\\!--", next : "comment"},
	            {
	                token : ["xml-pe.doctype.xml", "xml-pe.doctype.xml"],
	                regex : "(<\\!)(DOCTYPE)(?=[\\s])", next : "doctype", caseInsensitive: true
	            },
	            {include : "tag"},
	            {token : "text.end-tag-open.xml", regex: "</"},
	            {token : "text.tag-open.xml", regex: "<"},
	            {include : "reference"},
	            {defaultToken : "text.xml"}
	        ],
	
	        xml_decl : [{
	            token : "entity.other.attribute-name.decl-attribute-name.xml",
	            regex : "(?:" + tagRegex + ":)?" + tagRegex + ""
	        }, {
	            token : "keyword.operator.decl-attribute-equals.xml",
	            regex : "="
	        }, {
	            include: "whitespace"
	        }, {
	            include: "string"
	        }, {
	            token : "punctuation.xml-decl.xml",
	            regex : "\\?>",
	            next : "start"
	        }],
	
	        processing_instruction : [
	            {token : "punctuation.instruction.xml", regex : "\\?>", next : "start"},
	            {defaultToken : "instruction.xml"}
	        ],
	
	        doctype : [
	            {include : "whitespace"},
	            {include : "string"},
	            {token : "xml-pe.doctype.xml", regex : ">", next : "start"},
	            {token : "xml-pe.xml", regex : "[-_a-zA-Z0-9:]+"},
	            {token : "punctuation.int-subset", regex : "\\[", push : "int_subset"}
	        ],
	
	        int_subset : [{
	            token : "text.xml",
	            regex : "\\s+"
	        }, {
	            token: "punctuation.int-subset.xml",
	            regex: "]",
	            next: "pop"
	        }, {
	            token : ["punctuation.markup-decl.xml", "keyword.markup-decl.xml"],
	            regex : "(<\\!)(" + tagRegex + ")",
	            push : [{
	                token : "text",
	                regex : "\\s+"
	            },
	            {
	                token : "punctuation.markup-decl.xml",
	                regex : ">",
	                next : "pop"
	            },
	            {include : "string"}]
	        }],
	
	        cdata : [
	            {token : "string.cdata.xml", regex : "\\]\\]>", next : "start"},
	            {token : "text.xml", regex : "\\s+"},
	            {token : "text.xml", regex : "(?:[^\\]]|\\](?!\\]>))+"}
	        ],
	
	        comment : [
	            {token : "comment.xml", regex : "-->", next : "start"},
	            {defaultToken : "comment.xml"}
	        ],
	
	        reference : [{
	            token : "constant.language.escape.reference.xml",
	            regex : "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"
	        }],
	
	        attr_reference : [{
	            token : "constant.language.escape.reference.attribute-value.xml",
	            regex : "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"
	        }],
	
	        tag : [{
	            token : ["meta.tag.punctuation.tag-open.xml", "meta.tag.punctuation.end-tag-open.xml", "meta.tag.tag-name.xml"],
	            regex : "(?:(<)|(</))((?:" + tagRegex + ":)?" + tagRegex + ")",
	            next: [
	                {include : "attributes"},
	                {token : "meta.tag.punctuation.tag-close.xml", regex : "/?>", next : "start"}
	            ]
	        }],
	
	        tag_whitespace : [
	            {token : "text.tag-whitespace.xml", regex : "\\s+"}
	        ],
	        whitespace : [
	            {token : "text.whitespace.xml", regex : "\\s+"}
	        ],
	        string: [{
	            token : "string.xml",
	            regex : "'",
	            push : [
	                {token : "string.xml", regex: "'", next: "pop"},
	                {defaultToken : "string.xml"}
	            ]
	        }, {
	            token : "string.xml",
	            regex : '"',
	            push : [
	                {token : "string.xml", regex: '"', next: "pop"},
	                {defaultToken : "string.xml"}
	            ]
	        }],
	
	        attributes: [{
	            token : "entity.other.attribute-name.xml",
	            regex : "(?:" + tagRegex + ":)?" + tagRegex + ""
	        }, {
	            token : "keyword.operator.attribute-equals.xml",
	            regex : "="
	        }, {
	            include: "tag_whitespace"
	        }, {
	            include: "attribute_value"
	        }],
	
	        attribute_value: [{
	            token : "string.attribute-value.xml",
	            regex : "'",
	            push : [
	                {token : "string.attribute-value.xml", regex: "'", next: "pop"},
	                {include : "attr_reference"},
	                {defaultToken : "string.attribute-value.xml"}
	            ]
	        }, {
	            token : "string.attribute-value.xml",
	            regex : '"',
	            push : [
	                {token : "string.attribute-value.xml", regex: '"', next: "pop"},
	                {include : "attr_reference"},
	                {defaultToken : "string.attribute-value.xml"}
	            ]
	        }]
	    };
	
	    if (this.constructor === XmlHighlightRules)
	        this.normalizeRules();
	};
	
	
	(function() {
	
	    this.embedTagRules = function(HighlightRules, prefix, tag){
	        this.$rules.tag.unshift({
	            token : ["meta.tag.punctuation.tag-open.xml", "meta.tag." + tag + ".tag-name.xml"],
	            regex : "(<)(" + tag + "(?=\\s|>|$))",
	            next: [
	                {include : "attributes"},
	                {token : "meta.tag.punctuation.tag-close.xml", regex : "/?>", next : prefix + "start"}
	            ]
	        });
	
	        this.$rules[tag + "-end"] = [
	            {include : "attributes"},
	            {token : "meta.tag.punctuation.tag-close.xml", regex : "/?>",  next: "start",
	                onMatch : function(value, currentState, stack) {
	                    stack.splice(0);
	                    return this.token;
	            }}
	        ]
	
	        this.embedRules(HighlightRules, prefix, [{
	            token: ["meta.tag.punctuation.end-tag-open.xml", "meta.tag." + tag + ".tag-name.xml"],
	            regex : "(</)(" + tag + "(?=\\s|>|$))",
	            next: tag + "-end"
	        }, {
	            token: "string.cdata.xml",
	            regex : "<\\!\\[CDATA\\["
	        }, {
	            token: "string.cdata.xml",
	            regex : "\\]\\]>"
	        }]);
	    };
	
	}).call(TextHighlightRules.prototype);
	
	oop.inherits(XmlHighlightRules, TextHighlightRules);
	
	exports.XmlHighlightRules = XmlHighlightRules;
	});
	
	ace.define("ace/mode/css_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules"], function(acequire, exports, module) {
	"use strict";
	
	var oop = acequire("../lib/oop");
	var lang = acequire("../lib/lang");
	var TextHighlightRules = acequire("./text_highlight_rules").TextHighlightRules;
	var supportType = exports.supportType = "animation-fill-mode|alignment-adjust|alignment-baseline|animation-delay|animation-direction|animation-duration|animation-iteration-count|animation-name|animation-play-state|animation-timing-function|animation|appearance|azimuth|backface-visibility|background-attachment|background-break|background-clip|background-color|background-image|background-origin|background-position|background-repeat|background-size|background|baseline-shift|binding|bleed|bookmark-label|bookmark-level|bookmark-state|bookmark-target|border-bottom|border-bottom-color|border-bottom-left-radius|border-bottom-right-radius|border-bottom-style|border-bottom-width|border-collapse|border-color|border-image|border-image-outset|border-image-repeat|border-image-slice|border-image-source|border-image-width|border-left|border-left-color|border-left-style|border-left-width|border-radius|border-right|border-right-color|border-right-style|border-right-width|border-spacing|border-style|border-top|border-top-color|border-top-left-radius|border-top-right-radius|border-top-style|border-top-width|border-width|border|bottom|box-align|box-decoration-break|box-direction|box-flex-group|box-flex|box-lines|box-ordinal-group|box-orient|box-pack|box-shadow|box-sizing|break-after|break-before|break-inside|caption-side|clear|clip|color-profile|color|column-count|column-fill|column-gap|column-rule|column-rule-color|column-rule-style|column-rule-width|column-span|column-width|columns|content|counter-increment|counter-reset|crop|cue-after|cue-before|cue|cursor|direction|display|dominant-baseline|drop-initial-after-adjust|drop-initial-after-align|drop-initial-before-adjust|drop-initial-before-align|drop-initial-size|drop-initial-value|elevation|empty-cells|fit|fit-position|float-offset|float|font-family|font-size|font-size-adjust|font-stretch|font-style|font-variant|font-weight|font|grid-columns|grid-rows|hanging-punctuation|height|hyphenate-after|hyphenate-before|hyphenate-character|hyphenate-lines|hyphenate-resource|hyphens|icon|image-orientation|image-rendering|image-resolution|inline-box-align|left|letter-spacing|line-height|line-stacking-ruby|line-stacking-shift|line-stacking-strategy|line-stacking|list-style-image|list-style-position|list-style-type|list-style|margin-bottom|margin-left|margin-right|margin-top|margin|mark-after|mark-before|mark|marks|marquee-direction|marquee-play-count|marquee-speed|marquee-style|max-height|max-width|min-height|min-width|move-to|nav-down|nav-index|nav-left|nav-right|nav-up|opacity|orphans|outline-color|outline-offset|outline-style|outline-width|outline|overflow-style|overflow-x|overflow-y|overflow|padding-bottom|padding-left|padding-right|padding-top|padding|page-break-after|page-break-before|page-break-inside|page-policy|page|pause-after|pause-before|pause|perspective-origin|perspective|phonemes|pitch-range|pitch|play-during|pointer-events|position|presentation-level|punctuation-trim|quotes|rendering-intent|resize|rest-after|rest-before|rest|richness|right|rotation-point|rotation|ruby-align|ruby-overhang|ruby-position|ruby-span|size|speak-header|speak-numeral|speak-punctuation|speak|speech-rate|stress|string-set|table-layout|target-name|target-new|target-position|target|text-align-last|text-align|text-decoration|text-emphasis|text-height|text-indent|text-justify|text-outline|text-shadow|text-transform|text-wrap|top|transform-origin|transform-style|transform|transition-delay|transition-duration|transition-property|transition-timing-function|transition|unicode-bidi|vertical-align|visibility|voice-balance|voice-duration|voice-family|voice-pitch-range|voice-pitch|voice-rate|voice-stress|voice-volume|volume|white-space-collapse|white-space|widows|width|word-break|word-spacing|word-wrap|z-index";
	var supportFunction = exports.supportFunction = "rgb|rgba|url|attr|counter|counters";
	var supportConstant = exports.supportConstant = "absolute|after-edge|after|all-scroll|all|alphabetic|always|antialiased|armenian|auto|avoid-column|avoid-page|avoid|balance|baseline|before-edge|before|below|bidi-override|block-line-height|block|bold|bolder|border-box|both|bottom|box|break-all|break-word|capitalize|caps-height|caption|center|central|char|circle|cjk-ideographic|clone|close-quote|col-resize|collapse|column|consider-shifts|contain|content-box|cover|crosshair|cubic-bezier|dashed|decimal-leading-zero|decimal|default|disabled|disc|disregard-shifts|distribute-all-lines|distribute-letter|distribute-space|distribute|dotted|double|e-resize|ease-in|ease-in-out|ease-out|ease|ellipsis|end|exclude-ruby|fill|fixed|georgian|glyphs|grid-height|groove|hand|hanging|hebrew|help|hidden|hiragana-iroha|hiragana|horizontal|icon|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space|ideographic|inactive|include-ruby|inherit|initial|inline-block|inline-box|inline-line-height|inline-table|inline|inset|inside|inter-ideograph|inter-word|invert|italic|justify|katakana-iroha|katakana|keep-all|last|left|lighter|line-edge|line-through|line|linear|list-item|local|loose|lower-alpha|lower-greek|lower-latin|lower-roman|lowercase|lr-tb|ltr|mathematical|max-height|max-size|medium|menu|message-box|middle|move|n-resize|ne-resize|newspaper|no-change|no-close-quote|no-drop|no-open-quote|no-repeat|none|normal|not-allowed|nowrap|nw-resize|oblique|open-quote|outset|outside|overline|padding-box|page|pointer|pre-line|pre-wrap|pre|preserve-3d|progress|relative|repeat-x|repeat-y|repeat|replaced|reset-size|ridge|right|round|row-resize|rtl|s-resize|scroll|se-resize|separate|slice|small-caps|small-caption|solid|space|square|start|static|status-bar|step-end|step-start|steps|stretch|strict|sub|super|sw-resize|table-caption|table-cell|table-column-group|table-column|table-footer-group|table-header-group|table-row-group|table-row|table|tb-rl|text-after-edge|text-before-edge|text-bottom|text-size|text-top|text|thick|thin|transparent|underline|upper-alpha|upper-latin|upper-roman|uppercase|use-script|vertical-ideographic|vertical-text|visible|w-resize|wait|whitespace|z-index|zero";
	var supportConstantColor = exports.supportConstantColor = "aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow";
	var supportConstantFonts = exports.supportConstantFonts = "arial|century|comic|courier|cursive|fantasy|garamond|georgia|helvetica|impact|lucida|symbol|system|tahoma|times|trebuchet|utopia|verdana|webdings|sans-serif|serif|monospace";
	
	var numRe = exports.numRe = "\\-?(?:(?:[0-9]+)|(?:[0-9]*\\.[0-9]+))";
	var pseudoElements = exports.pseudoElements = "(\\:+)\\b(after|before|first-letter|first-line|moz-selection|selection)\\b";
	var pseudoClasses  = exports.pseudoClasses =  "(:)\\b(active|checked|disabled|empty|enabled|first-child|first-of-type|focus|hover|indeterminate|invalid|last-child|last-of-type|link|not|nth-child|nth-last-child|nth-last-of-type|nth-of-type|only-child|only-of-type|acequired|root|target|valid|visited)\\b";
	
	var CssHighlightRules = function() {
	
	    var keywordMapper = this.createKeywordMapper({
	        "support.function": supportFunction,
	        "support.constant": supportConstant,
	        "support.type": supportType,
	        "support.constant.color": supportConstantColor,
	        "support.constant.fonts": supportConstantFonts
	    }, "text", true);
	
	    this.$rules = {
	        "start" : [{
	            token : "comment", // multi line comment
	            regex : "\\/\\*",
	            push : "comment"
	        }, {
	            token: "paren.lparen",
	            regex: "\\{",
	            push:  "ruleset"
	        }, {
	            token: "string",
	            regex: "@.*?{",
	            push:  "media"
	        }, {
	            token: "keyword",
	            regex: "#[a-z0-9-_]+"
	        }, {
	            token: "variable",
	            regex: "\\.[a-z0-9-_]+"
	        }, {
	            token: "string",
	            regex: ":[a-z0-9-_]+"
	        }, {
	            token: "constant",
	            regex: "[a-z0-9-_]+"
	        }, {
	            caseInsensitive: true
	        }],
	
	        "media" : [{
	            token : "comment", // multi line comment
	            regex : "\\/\\*",
	            push : "comment"
	        }, {
	            token: "paren.lparen",
	            regex: "\\{",
	            push:  "ruleset"
	        }, {
	            token: "string",
	            regex: "\\}",
	            next:  "pop"
	        }, {
	            token: "keyword",
	            regex: "#[a-z0-9-_]+"
	        }, {
	            token: "variable",
	            regex: "\\.[a-z0-9-_]+"
	        }, {
	            token: "string",
	            regex: ":[a-z0-9-_]+"
	        }, {
	            token: "constant",
	            regex: "[a-z0-9-_]+"
	        }, {
	            caseInsensitive: true
	        }],
	
	        "comment" : [{
	            token : "comment",
	            regex : "\\*\\/",
	            next : "pop"
	        }, {
	            defaultToken : "comment"
	        }],
	
	        "ruleset" : [
	        {
	            token : "paren.rparen",
	            regex : "\\}",
	            next:   "pop"
	        }, {
	            token : "comment", // multi line comment
	            regex : "\\/\\*",
	            push : "comment"
	        }, {
	            token : "string", // single line
	            regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
	        }, {
	            token : "string", // single line
	            regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
	        }, {
	            token : ["constant.numeric", "keyword"],
	            regex : "(" + numRe + ")(ch|cm|deg|em|ex|fr|gd|grad|Hz|in|kHz|mm|ms|pc|pt|px|rad|rem|s|turn|vh|vm|vw|%)"
	        }, {
	            token : "constant.numeric",
	            regex : numRe
	        }, {
	            token : "constant.numeric",  // hex6 color
	            regex : "#[a-f0-9]{6}"
	        }, {
	            token : "constant.numeric", // hex3 color
	            regex : "#[a-f0-9]{3}"
	        }, {
	            token : ["punctuation", "entity.other.attribute-name.pseudo-element.css"],
	            regex : pseudoElements
	        }, {
	            token : ["punctuation", "entity.other.attribute-name.pseudo-class.css"],
	            regex : pseudoClasses
	        }, {
	            token : ["support.function", "string", "support.function"],
	            regex : "(url\\()(.*)(\\))"
	        }, {
	            token : keywordMapper,
	            regex : "\\-?[a-zA-Z_][a-zA-Z0-9_\\-]*"
	        }, {
	            caseInsensitive: true
	        }]
	    };
	
	    this.normalizeRules();
	};
	
	oop.inherits(CssHighlightRules, TextHighlightRules);
	
	exports.CssHighlightRules = CssHighlightRules;
	
	});
	
	ace.define("ace/mode/html_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/css_highlight_rules","ace/mode/javascript_highlight_rules","ace/mode/xml_highlight_rules"], function(acequire, exports, module) {
	"use strict";
	
	var oop = acequire("../lib/oop");
	var lang = acequire("../lib/lang");
	var CssHighlightRules = acequire("./css_highlight_rules").CssHighlightRules;
	var JavaScriptHighlightRules = acequire("./javascript_highlight_rules").JavaScriptHighlightRules;
	var XmlHighlightRules = acequire("./xml_highlight_rules").XmlHighlightRules;
	
	var tagMap = lang.createMap({
	    a           : 'anchor',
	    button 	    : 'form',
	    form        : 'form',
	    img         : 'image',
	    input       : 'form',
	    label       : 'form',
	    option      : 'form',
	    script      : 'script',
	    select      : 'form',
	    textarea    : 'form',
	    style       : 'style',
	    table       : 'table',
	    tbody       : 'table',
	    td          : 'table',
	    tfoot       : 'table',
	    th          : 'table',
	    tr          : 'table'
	});
	
	var HtmlHighlightRules = function() {
	    XmlHighlightRules.call(this);
	
	    this.addRules({
	        attributes: [{
	            include : "tag_whitespace"
	        }, {
	            token : "entity.other.attribute-name.xml",
	            regex : "[-_a-zA-Z0-9:.]+"
	        }, {
	            token : "keyword.operator.attribute-equals.xml",
	            regex : "=",
	            push : [{
	                include: "tag_whitespace"
	            }, {
	                token : "string.unquoted.attribute-value.html",
	                regex : "[^<>='\"`\\s]+",
	                next : "pop"
	            }, {
	                token : "empty",
	                regex : "",
	                next : "pop"
	            }]
	        }, {
	            include : "attribute_value"
	        }],
	        tag: [{
	            token : function(start, tag) {
	                var group = tagMap[tag];
	                return ["meta.tag.punctuation." + (start == "<" ? "" : "end-") + "tag-open.xml",
	                    "meta.tag" + (group ? "." + group : "") + ".tag-name.xml"];
	            },
	            regex : "(</?)([-_a-zA-Z0-9:.]+)",
	            next: "tag_stuff"
	        }],
	        tag_stuff: [
	            {include : "attributes"},
	            {token : "meta.tag.punctuation.tag-close.xml", regex : "/?>", next : "start"}
	        ],
	    });
	
	    this.embedTagRules(CssHighlightRules, "css-", "style");
	    this.embedTagRules(new JavaScriptHighlightRules({noJSX: true}).getRules(), "js-", "script");
	
	    if (this.constructor === HtmlHighlightRules)
	        this.normalizeRules();
	};
	
	oop.inherits(HtmlHighlightRules, XmlHighlightRules);
	
	exports.HtmlHighlightRules = HtmlHighlightRules;
	});
	
	ace.define("ace/mode/markdown_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules","ace/mode/javascript_highlight_rules","ace/mode/xml_highlight_rules","ace/mode/html_highlight_rules","ace/mode/css_highlight_rules"], function(acequire, exports, module) {
	"use strict";
	
	var oop = acequire("../lib/oop");
	var lang = acequire("../lib/lang");
	var TextHighlightRules = acequire("./text_highlight_rules").TextHighlightRules;
	var JavaScriptHighlightRules = acequire("./javascript_highlight_rules").JavaScriptHighlightRules;
	var XmlHighlightRules = acequire("./xml_highlight_rules").XmlHighlightRules;
	var HtmlHighlightRules = acequire("./html_highlight_rules").HtmlHighlightRules;
	var CssHighlightRules = acequire("./css_highlight_rules").CssHighlightRules;
	
	var escaped = function(ch) {
	    return "(?:[^" + lang.escapeRegExp(ch) + "\\\\]|\\\\.)*";
	}
	
	function github_embed(tag, prefix) {
	    return { // Github style block
	        token : "support.function",
	        regex : "^\\s*```" + tag + "\\s*$",
	        push  : prefix + "start"
	    };
	}
	
	var MarkdownHighlightRules = function() {
	    HtmlHighlightRules.call(this);
	
	    this.$rules["start"].unshift({
	        token : "empty_line",
	        regex : '^$',
	        next: "allowBlock"
	    }, { // h1
	        token: "markup.heading.1",
	        regex: "^=+(?=\\s*$)"
	    }, { // h2
	        token: "markup.heading.2",
	        regex: "^\\-+(?=\\s*$)"
	    }, {
	        token : function(value) {
	            return "markup.heading." + value.length;
	        },
	        regex : /^#{1,6}(?=\s*[^ #]|\s+#.)/,
	        next : "header"
	    },
	       github_embed("(?:javascript|js)", "jscode-"),
	       github_embed("xml", "xmlcode-"),
	       github_embed("html", "htmlcode-"),
	       github_embed("css", "csscode-"),
	    { // Github style block
	        token : "support.function",
	        regex : "^\\s*```\\s*\\S*(?:{.*?\\})?\\s*$",
	        next  : "githubblock"
	    }, { // block quote
	        token : "string.blockquote",
	        regex : "^\\s*>\\s*(?:[*+-]|\\d+\\.)?\\s+",
	        next  : "blockquote"
	    }, { // HR * - _
	        token : "constant",
	        regex : "^ {0,2}(?:(?: ?\\* ?){3,}|(?: ?\\- ?){3,}|(?: ?\\_ ?){3,})\\s*$",
	        next: "allowBlock"
	    }, { // list
	        token : "markup.list",
	        regex : "^\\s{0,3}(?:[*+-]|\\d+\\.)\\s+",
	        next  : "listblock-start"
	    }, {
	        include : "basic"
	    });
	
	    this.addRules({
	        "basic" : [{
	            token : "constant.language.escape",
	            regex : /\\[\\`*_{}\[\]()#+\-.!]/
	        }, { // code span `
	            token : "support.function",
	            regex : "(`+)(.*?[^`])(\\1)"
	        }, { // reference
	            token : ["text", "constant", "text", "url", "string", "text"],
	            regex : "^([ ]{0,3}\\[)([^\\]]+)(\\]:\\s*)([^ ]+)(\\s*(?:[\"][^\"]+[\"])?(\\s*))$"
	        }, { // link by reference
	            token : ["text", "string", "text", "constant", "text"],
	            regex : "(\\[)(" + escaped("]") + ")(\\]\s*\\[)("+ escaped("]") + ")(\\])"
	        }, { // link by url
	            token : ["text", "string", "text", "markup.underline", "string", "text"],
	            regex : "(\\[)(" +                                        // [
	                    escaped("]") +                                    // link text
	                    ")(\\]\\()"+                                      // ](
	                    '((?:[^\\)\\s\\\\]|\\\\.|\\s(?=[^"]))*)' +        // href
	                    '(\\s*"' +  escaped('"') + '"\\s*)?' +            // "title"
	                    "(\\))"                                           // )
	        }, { // strong ** __
	            token : "string.strong",
	            regex : "([*]{2}|[_]{2}(?=\\S))(.*?\\S[*_]*)(\\1)"
	        }, { // emphasis * _
	            token : "string.emphasis",
	            regex : "([*]|[_](?=\\S))(.*?\\S[*_]*)(\\1)"
	        }, { //
	            token : ["text", "url", "text"],
	            regex : "(<)("+
	                      "(?:https?|ftp|dict):[^'\">\\s]+"+
	                      "|"+
	                      "(?:mailto:)?[-.\\w]+\\@[-a-z0-9]+(?:\\.[-a-z0-9]+)*\\.[a-z]+"+
	                    ")(>)"
	        }],
	        "allowBlock": [
	            {token : "support.function", regex : "^ {4}.+", next : "allowBlock"},
	            {token : "empty_line", regex : '^$', next: "allowBlock"},
	            {token : "empty", regex : "", next : "start"}
	        ],
	
	        "header" : [{
	            regex: "$",
	            next : "start"
	        }, {
	            include: "basic"
	        }, {
	            defaultToken : "heading"
	        } ],
	
	        "listblock-start" : [{
	            token : "support.variable",
	            regex : /(?:\[[ x]\])?/,
	            next  : "listblock"
	        }],
	
	        "listblock" : [ { // Lists only escape on completely blank lines.
	            token : "empty_line",
	            regex : "^$",
	            next  : "start"
	        }, { // list
	            token : "markup.list",
	            regex : "^\\s{0,3}(?:[*+-]|\\d+\\.)\\s+",
	            next  : "listblock-start"
	        }, {
	            include : "basic", noEscape: true
	        }, { // Github style block
	            token : "support.function",
	            regex : "^\\s*```\\s*[a-zA-Z]*(?:{.*?\\})?\\s*$",
	            next  : "githubblock"
	        }, {
	            defaultToken : "list" //do not use markup.list to allow stling leading `*` differntly
	        } ],
	
	        "blockquote" : [ { // Blockquotes only escape on blank lines.
	            token : "empty_line",
	            regex : "^\\s*$",
	            next  : "start"
	        }, { // block quote
	            token : "string.blockquote",
	            regex : "^\\s*>\\s*(?:[*+-]|\\d+\\.)?\\s+",
	            next  : "blockquote"
	        }, {
	            include : "basic", noEscape: true
	        }, {
	            defaultToken : "string.blockquote"
	        } ],
	
	        "githubblock" : [ {
	            token : "support.function",
	            regex : "^\\s*```",
	            next  : "start"
	        }, {
	            token : "support.function",
	            regex : ".+"
	        } ]
	    });
	
	    this.embedRules(JavaScriptHighlightRules, "jscode-", [{
	       token : "support.function",
	       regex : "^\\s*```",
	       next  : "pop"
	    }]);
	
	    this.embedRules(HtmlHighlightRules, "htmlcode-", [{
	       token : "support.function",
	       regex : "^\\s*```",
	       next  : "pop"
	    }]);
	
	    this.embedRules(CssHighlightRules, "csscode-", [{
	       token : "support.function",
	       regex : "^\\s*```",
	       next  : "pop"
	    }]);
	
	    this.embedRules(XmlHighlightRules, "xmlcode-", [{
	       token : "support.function",
	       regex : "^\\s*```",
	       next  : "pop"
	    }]);
	
	    this.normalizeRules();
	};
	oop.inherits(MarkdownHighlightRules, TextHighlightRules);
	
	exports.MarkdownHighlightRules = MarkdownHighlightRules;
	});
	
	ace.define("ace/mode/scss_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules"], function(acequire, exports, module) {
	"use strict";
	
	var oop = acequire("../lib/oop");
	var lang = acequire("../lib/lang");
	var TextHighlightRules = acequire("./text_highlight_rules").TextHighlightRules;
	
	var ScssHighlightRules = function() {
	    
	    var properties = lang.arrayToMap( (function () {
	
	        var browserPrefix = ("-webkit-|-moz-|-o-|-ms-|-svg-|-pie-|-khtml-").split("|");
	        
	        var prefixProperties = ("appearance|background-clip|background-inline-policy|background-origin|" + 
	             "background-size|binding|border-bottom-colors|border-left-colors|" + 
	             "border-right-colors|border-top-colors|border-end|border-end-color|" + 
	             "border-end-style|border-end-width|border-image|border-start|" + 
	             "border-start-color|border-start-style|border-start-width|box-align|" + 
	             "box-direction|box-flex|box-flexgroup|box-ordinal-group|box-orient|" + 
	             "box-pack|box-sizing|column-count|column-gap|column-width|column-rule|" + 
	             "column-rule-width|column-rule-style|column-rule-color|float-edge|" + 
	             "font-feature-settings|font-language-override|force-broken-image-icon|" + 
	             "image-region|margin-end|margin-start|opacity|outline|outline-color|" + 
	             "outline-offset|outline-radius|outline-radius-bottomleft|" + 
	             "outline-radius-bottomright|outline-radius-topleft|outline-radius-topright|" + 
	             "outline-style|outline-width|padding-end|padding-start|stack-sizing|" + 
	             "tab-size|text-blink|text-decoration-color|text-decoration-line|" + 
	             "text-decoration-style|transform|transform-origin|transition|" + 
	             "transition-delay|transition-duration|transition-property|" + 
	             "transition-timing-function|user-focus|user-input|user-modify|user-select|" +
	             "window-shadow|border-radius").split("|");
	        
	        var properties = ("azimuth|background-attachment|background-color|background-image|" +
	            "background-position|background-repeat|background|border-bottom-color|" +
	            "border-bottom-style|border-bottom-width|border-bottom|border-collapse|" +
	            "border-color|border-left-color|border-left-style|border-left-width|" +
	            "border-left|border-right-color|border-right-style|border-right-width|" +
	            "border-right|border-spacing|border-style|border-top-color|" +
	            "border-top-style|border-top-width|border-top|border-width|border|bottom|" +
	            "box-shadow|box-sizing|caption-side|clear|clip|color|content|counter-increment|" +
	            "counter-reset|cue-after|cue-before|cue|cursor|direction|display|" +
	            "elevation|empty-cells|float|font-family|font-size-adjust|font-size|" +
	            "font-stretch|font-style|font-variant|font-weight|font|height|left|" +
	            "letter-spacing|line-height|list-style-image|list-style-position|" +
	            "list-style-type|list-style|margin-bottom|margin-left|margin-right|" +
	            "margin-top|marker-offset|margin|marks|max-height|max-width|min-height|" +
	            "min-width|opacity|orphans|outline-color|" +
	            "outline-style|outline-width|outline|overflow|overflow-x|overflow-y|padding-bottom|" +
	            "padding-left|padding-right|padding-top|padding|page-break-after|" +
	            "page-break-before|page-break-inside|page|pause-after|pause-before|" +
	            "pause|pitch-range|pitch|play-during|position|quotes|richness|right|" +
	            "size|speak-header|speak-numeral|speak-punctuation|speech-rate|speak|" +
	            "stress|table-layout|text-align|text-decoration|text-indent|" +
	            "text-shadow|text-transform|top|unicode-bidi|vertical-align|" +
	            "visibility|voice-family|volume|white-space|widows|width|word-spacing|" +
	            "z-index").split("|");
	        var ret = [];
	        for (var i=0, ln=browserPrefix.length; i<ln; i++) {
	            Array.prototype.push.apply(
	                ret,
	                (( browserPrefix[i] + prefixProperties.join("|" + browserPrefix[i]) ).split("|"))
	            );
	        }
	        Array.prototype.push.apply(ret, prefixProperties);
	        Array.prototype.push.apply(ret, properties);
	        
	        return ret;
	        
	    })() );
	    
	
	
	    var functions = lang.arrayToMap(
	        ("hsl|hsla|rgb|rgba|url|attr|counter|counters|abs|adjust_color|adjust_hue|" +
	         "alpha|join|blue|ceil|change_color|comparable|complement|darken|desaturate|" + 
	         "floor|grayscale|green|hue|if|invert|join|length|lighten|lightness|mix|" + 
	         "nth|opacify|opacity|percentage|quote|red|round|saturate|saturation|" +
	         "scale_color|transparentize|type_of|unit|unitless|unqoute").split("|")
	    );
	
	    var constants = lang.arrayToMap(
	        ("absolute|all-scroll|always|armenian|auto|baseline|below|bidi-override|" +
	        "block|bold|bolder|border-box|both|bottom|break-all|break-word|capitalize|center|" +
	        "char|circle|cjk-ideographic|col-resize|collapse|content-box|crosshair|dashed|" +
	        "decimal-leading-zero|decimal|default|disabled|disc|" +
	        "distribute-all-lines|distribute-letter|distribute-space|" +
	        "distribute|dotted|double|e-resize|ellipsis|fixed|georgian|groove|" +
	        "hand|hebrew|help|hidden|hiragana-iroha|hiragana|horizontal|" +
	        "ideograph-alpha|ideograph-numeric|ideograph-parenthesis|" +
	        "ideograph-space|inactive|inherit|inline-block|inline|inset|inside|" +
	        "inter-ideograph|inter-word|italic|justify|katakana-iroha|katakana|" +
	        "keep-all|left|lighter|line-edge|line-through|line|list-item|loose|" +
	        "lower-alpha|lower-greek|lower-latin|lower-roman|lowercase|lr-tb|ltr|" +
	        "medium|middle|move|n-resize|ne-resize|newspaper|no-drop|no-repeat|" +
	        "nw-resize|none|normal|not-allowed|nowrap|oblique|outset|outside|" +
	        "overline|pointer|progress|relative|repeat-x|repeat-y|repeat|right|" +
	        "ridge|row-resize|rtl|s-resize|scroll|se-resize|separate|small-caps|" +
	        "solid|square|static|strict|super|sw-resize|table-footer-group|" +
	        "table-header-group|tb-rl|text-bottom|text-top|text|thick|thin|top|" +
	        "transparent|underline|upper-alpha|upper-latin|upper-roman|uppercase|" +
	        "vertical-ideographic|vertical-text|visible|w-resize|wait|whitespace|" +
	        "zero").split("|")
	    );
	
	    var colors = lang.arrayToMap(
	        ("aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|" +
	        "purple|red|silver|teal|white|yellow").split("|")
	    );
	    
	    var keywords = lang.arrayToMap(
	        ("@mixin|@extend|@include|@import|@media|@debug|@warn|@if|@for|@each|@while|@else|@font-face|@-webkit-keyframes|if|and|!default|module|def|end|declare").split("|")
	    )
	    
	    var tags = lang.arrayToMap(
	        ("a|abbr|acronym|address|applet|area|article|aside|audio|b|base|basefont|bdo|" + 
	         "big|blockquote|body|br|button|canvas|caption|center|cite|code|col|colgroup|" + 
	         "command|datalist|dd|del|details|dfn|dir|div|dl|dt|em|embed|fieldset|" + 
	         "figcaption|figure|font|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|" + 
	         "header|hgroup|hr|html|i|iframe|img|input|ins|keygen|kbd|label|legend|li|" + 
	         "link|map|mark|menu|meta|meter|nav|noframes|noscript|object|ol|optgroup|" + 
	         "option|output|p|param|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|" + 
	         "small|source|span|strike|strong|style|sub|summary|sup|table|tbody|td|" + 
	         "textarea|tfoot|th|thead|time|title|tr|tt|u|ul|var|video|wbr|xmp").split("|")
	    );
	
	    var numRe = "\\-?(?:(?:[0-9]+)|(?:[0-9]*\\.[0-9]+))";
	
	    this.$rules = {
	        "start" : [
	            {
	                token : "comment",
	                regex : "\\/\\/.*$"
	            },
	            {
	                token : "comment", // multi line comment
	                regex : "\\/\\*",
	                next : "comment"
	            }, {
	                token : "string", // single line
	                regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
	            }, {
	                token : "string", // multi line string start
	                regex : '["].*\\\\$',
	                next : "qqstring"
	            }, {
	                token : "string", // single line
	                regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
	            }, {
	                token : "string", // multi line string start
	                regex : "['].*\\\\$",
	                next : "qstring"
	            }, {
	                token : "constant.numeric",
	                regex : numRe + "(?:em|ex|px|cm|mm|in|pt|pc|deg|rad|grad|ms|s|hz|khz|%)"
	            }, {
	                token : "constant.numeric", // hex6 color
	                regex : "#[a-f0-9]{6}"
	            }, {
	                token : "constant.numeric", // hex3 color
	                regex : "#[a-f0-9]{3}"
	            }, {
	                token : "constant.numeric",
	                regex : numRe
	            }, {
	                token : ["support.function", "string", "support.function"],
	                regex : "(url\\()(.*)(\\))"
	            }, {
	                token : function(value) {
	                    if (properties.hasOwnProperty(value.toLowerCase()))
	                        return "support.type";
	                    if (keywords.hasOwnProperty(value))
	                        return "keyword";
	                    else if (constants.hasOwnProperty(value))
	                        return "constant.language";
	                    else if (functions.hasOwnProperty(value))
	                        return "support.function";
	                    else if (colors.hasOwnProperty(value.toLowerCase()))
	                        return "support.constant.color";
	                    else if (tags.hasOwnProperty(value.toLowerCase()))
	                        return "variable.language";
	                    else
	                        return "text";
	                },
	                regex : "\\-?[@a-z_][@a-z0-9_\\-]*"
	            }, {
	                token : "variable",
	                regex : "[a-z_\\-$][a-z0-9_\\-$]*\\b"
	            }, {
	                token: "variable.language",
	                regex: "#[a-z0-9-_]+"
	            }, {
	                token: "variable.language",
	                regex: "\\.[a-z0-9-_]+"
	            }, {
	                token: "variable.language",
	                regex: ":[a-z0-9-_]+"
	            }, {
	                token: "constant",
	                regex: "[a-z0-9-_]+"
	            }, {
	                token : "keyword.operator",
	                regex : "<|>|<=|>=|==|!=|-|%|#|\\+|\\$|\\+|\\*"
	            }, {
	                token : "paren.lparen",
	                regex : "[[({]"
	            }, {
	                token : "paren.rparen",
	                regex : "[\\])}]"
	            }, {
	                token : "text",
	                regex : "\\s+"
	            }, {
	                caseInsensitive: true
	            }
	        ],
	        "comment" : [
	            {
	                token : "comment", // closing comment
	                regex : ".*?\\*\\/",
	                next : "start"
	            }, {
	                token : "comment", // comment spanning whole line
	                regex : ".+"
	            }
	        ],
	        "qqstring" : [
	            {
	                token : "string",
	                regex : '(?:(?:\\\\.)|(?:[^"\\\\]))*?"',
	                next : "start"
	            }, {
	                token : "string",
	                regex : '.+'
	            }
	        ],
	        "qstring" : [
	            {
	                token : "string",
	                regex : "(?:(?:\\\\.)|(?:[^'\\\\]))*?'",
	                next : "start"
	            }, {
	                token : "string",
	                regex : '.+'
	            }
	        ]
	    };
	};
	
	oop.inherits(ScssHighlightRules, TextHighlightRules);
	
	exports.ScssHighlightRules = ScssHighlightRules;
	
	});
	
	ace.define("ace/mode/less_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules"], function(acequire, exports, module) {
	"use strict";
	
	var oop = acequire("../lib/oop");
	var lang = acequire("../lib/lang");
	var TextHighlightRules = acequire("./text_highlight_rules").TextHighlightRules;
	
	var LessHighlightRules = function() {
	    
	    var properties = lang.arrayToMap( (function () {
	
	        var browserPrefix = ("-webkit-|-moz-|-o-|-ms-|-svg-|-pie-|-khtml-").split("|");
	        
	        var prefixProperties = ("appearance|background-clip|background-inline-policy|background-origin|" + 
	             "background-size|binding|border-bottom-colors|border-left-colors|" + 
	             "border-right-colors|border-top-colors|border-end|border-end-color|" + 
	             "border-end-style|border-end-width|border-image|border-start|" + 
	             "border-start-color|border-start-style|border-start-width|box-align|" + 
	             "box-direction|box-flex|box-flexgroup|box-ordinal-group|box-orient|" + 
	             "box-pack|box-sizing|column-count|column-gap|column-width|column-rule|" + 
	             "column-rule-width|column-rule-style|column-rule-color|float-edge|" + 
	             "font-feature-settings|font-language-override|force-broken-image-icon|" + 
	             "image-region|margin-end|margin-start|opacity|outline|outline-color|" + 
	             "outline-offset|outline-radius|outline-radius-bottomleft|" + 
	             "outline-radius-bottomright|outline-radius-topleft|outline-radius-topright|" + 
	             "outline-style|outline-width|padding-end|padding-start|stack-sizing|" + 
	             "tab-size|text-blink|text-decoration-color|text-decoration-line|" + 
	             "text-decoration-style|transform|transform-origin|transition|" + 
	             "transition-delay|transition-duration|transition-property|" + 
	             "transition-timing-function|user-focus|user-input|user-modify|user-select|" +
	             "window-shadow|border-radius").split("|");
	        
	        var properties = ("azimuth|background-attachment|background-color|background-image|" +
	            "background-position|background-repeat|background|border-bottom-color|" +
	            "border-bottom-style|border-bottom-width|border-bottom|border-collapse|" +
	            "border-color|border-left-color|border-left-style|border-left-width|" +
	            "border-left|border-right-color|border-right-style|border-right-width|" +
	            "border-right|border-spacing|border-style|border-top-color|" +
	            "border-top-style|border-top-width|border-top|border-width|border|" +
	            "bottom|box-sizing|caption-side|clear|clip|color|content|counter-increment|" +
	            "counter-reset|cue-after|cue-before|cue|cursor|direction|display|" +
	            "elevation|empty-cells|float|font-family|font-size-adjust|font-size|" +
	            "font-stretch|font-style|font-variant|font-weight|font|height|left|" +
	            "letter-spacing|line-height|list-style-image|list-style-position|" +
	            "list-style-type|list-style|margin-bottom|margin-left|margin-right|" +
	            "margin-top|marker-offset|margin|marks|max-height|max-width|min-height|" +
	            "min-width|opacity|orphans|outline-color|" +
	            "outline-style|outline-width|outline|overflow|overflow-x|overflow-y|padding-bottom|" +
	            "padding-left|padding-right|padding-top|padding|page-break-after|" +
	            "page-break-before|page-break-inside|page|pause-after|pause-before|" +
	            "pause|pitch-range|pitch|play-during|position|quotes|richness|right|" +
	            "size|speak-header|speak-numeral|speak-punctuation|speech-rate|speak|" +
	            "stress|table-layout|text-align|text-decoration|text-indent|" +
	            "text-shadow|text-transform|top|unicode-bidi|vertical-align|" +
	            "visibility|voice-family|volume|white-space|widows|width|word-spacing|" +
	            "z-index").split("|");
	        var ret = [];
	        for (var i=0, ln=browserPrefix.length; i<ln; i++) {
	            Array.prototype.push.apply(
	                ret,
	                (( browserPrefix[i] + prefixProperties.join("|" + browserPrefix[i]) ).split("|"))
	            );
	        }
	        Array.prototype.push.apply(ret, prefixProperties);
	        Array.prototype.push.apply(ret, properties);
	        
	        return ret;
	        
	    })() );
	    
	
	
	    var functions = lang.arrayToMap(
	        ("hsl|hsla|rgb|rgba|url|attr|counter|counters|lighten|darken|saturate|" +
	        "desaturate|fadein|fadeout|fade|spin|mix|hue|saturation|lightness|" +
	        "alpha|round|ceil|floor|percentage|color|iscolor|isnumber|isstring|" +
	        "iskeyword|isurl|ispixel|ispercentage|isem").split("|")
	    );
	
	    var constants = lang.arrayToMap(
	        ("absolute|all-scroll|always|armenian|auto|baseline|below|bidi-override|" +
	        "block|bold|bolder|border-box|both|bottom|break-all|break-word|capitalize|center|" +
	        "char|circle|cjk-ideographic|col-resize|collapse|content-box|crosshair|dashed|" +
	        "decimal-leading-zero|decimal|default|disabled|disc|" +
	        "distribute-all-lines|distribute-letter|distribute-space|" +
	        "distribute|dotted|double|e-resize|ellipsis|fixed|georgian|groove|" +
	        "hand|hebrew|help|hidden|hiragana-iroha|hiragana|horizontal|" +
	        "ideograph-alpha|ideograph-numeric|ideograph-parenthesis|" +
	        "ideograph-space|inactive|inherit|inline-block|inline|inset|inside|" +
	        "inter-ideograph|inter-word|italic|justify|katakana-iroha|katakana|" +
	        "keep-all|left|lighter|line-edge|line-through|line|list-item|loose|" +
	        "lower-alpha|lower-greek|lower-latin|lower-roman|lowercase|lr-tb|ltr|" +
	        "medium|middle|move|n-resize|ne-resize|newspaper|no-drop|no-repeat|" +
	        "nw-resize|none|normal|not-allowed|nowrap|oblique|outset|outside|" +
	        "overline|pointer|progress|relative|repeat-x|repeat-y|repeat|right|" +
	        "ridge|row-resize|rtl|s-resize|scroll|se-resize|separate|small-caps|" +
	        "solid|square|static|strict|super|sw-resize|table-footer-group|" +
	        "table-header-group|tb-rl|text-bottom|text-top|text|thick|thin|top|" +
	        "transparent|underline|upper-alpha|upper-latin|upper-roman|uppercase|" +
	        "vertical-ideographic|vertical-text|visible|w-resize|wait|whitespace|" +
	        "zero").split("|")
	    );
	
	    var colors = lang.arrayToMap(
	        ("aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|" +
	        "purple|red|silver|teal|white|yellow").split("|")
	    );
	    
	    var keywords = lang.arrayToMap(
	        ("@mixin|@extend|@include|@import|@media|@debug|@warn|@if|@for|@each|" +
	        "@while|@else|@font-face|@-webkit-keyframes|if|and|!default|module|" +
	        "def|end|declare|when|not|and").split("|")
	    );
	    
	    var tags = lang.arrayToMap(
	        ("a|abbr|acronym|address|applet|area|article|aside|audio|b|base|basefont|bdo|" + 
	         "big|blockquote|body|br|button|canvas|caption|center|cite|code|col|colgroup|" + 
	         "command|datalist|dd|del|details|dfn|dir|div|dl|dt|em|embed|fieldset|" + 
	         "figcaption|figure|font|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|" + 
	         "header|hgroup|hr|html|i|iframe|img|input|ins|keygen|kbd|label|legend|li|" + 
	         "link|map|mark|menu|meta|meter|nav|noframes|noscript|object|ol|optgroup|" + 
	         "option|output|p|param|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|" + 
	         "small|source|span|strike|strong|style|sub|summary|sup|table|tbody|td|" + 
	         "textarea|tfoot|th|thead|time|title|tr|tt|u|ul|var|video|wbr|xmp").split("|")
	    );
	
	    var numRe = "\\-?(?:(?:[0-9]+)|(?:[0-9]*\\.[0-9]+))";
	
	    this.$rules = {
	        "start" : [
	            {
	                token : "comment",
	                regex : "\\/\\/.*$"
	            },
	            {
	                token : "comment", // multi line comment
	                regex : "\\/\\*",
	                next : "comment"
	            }, {
	                token : "string", // single line
	                regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
	            }, {
	                token : "string", // single line
	                regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
	            }, {
	                token : "constant.numeric",
	                regex : numRe + "(?:em|ex|px|cm|mm|in|pt|pc|deg|rad|grad|ms|s|hz|khz|%)"
	            }, {
	                token : "constant.numeric", // hex6 color
	                regex : "#[a-f0-9]{6}"
	            }, {
	                token : "constant.numeric", // hex3 color
	                regex : "#[a-f0-9]{3}"
	            }, {
	                token : "constant.numeric",
	                regex : numRe
	            }, {
	                token : function(value) {
	                    if (keywords.hasOwnProperty(value))
	                        return "keyword";
	                    else
	                        return "variable";
	                },
	                regex : "@[a-z0-9_\\-@]*\\b"
	            }, {
	                token : function(value) {
	                    if (properties.hasOwnProperty(value.toLowerCase()))
	                        return "support.type";
	                    else if (keywords.hasOwnProperty(value))
	                        return "keyword";
	                    else if (constants.hasOwnProperty(value))
	                        return "constant.language";
	                    else if (functions.hasOwnProperty(value))
	                        return "support.function";
	                    else if (colors.hasOwnProperty(value.toLowerCase()))
	                        return "support.constant.color";
	                    else if (tags.hasOwnProperty(value.toLowerCase()))
	                        return "variable.language";
	                    else
	                        return "text";
	                },
	                regex : "\\-?[@a-z_][@a-z0-9_\\-]*"
	            }, {
	                token: "variable.language",
	                regex: "#[a-z0-9-_]+"
	            }, {
	                token: "variable.language",
	                regex: "\\.[a-z0-9-_]+"
	            }, {
	                token: "variable.language",
	                regex: ":[a-z_][a-z0-9-_]*"
	            }, {
	                token: "constant",
	                regex: "[a-z0-9-_]+"
	            }, {
	                token : "keyword.operator",
	                regex : "<|>|<=|>=|==|!=|-|%|#|\\+|\\$|\\+|\\*"
	            }, {
	                token : "paren.lparen",
	                regex : "[[({]"
	            }, {
	                token : "paren.rparen",
	                regex : "[\\])}]"
	            }, {
	                token : "text",
	                regex : "\\s+"
	            }, {
	                caseInsensitive: true
	            }
	        ],
	        "comment" : [
	            {
	                token : "comment", // closing comment
	                regex : ".*?\\*\\/",
	                next : "start"
	            }, {
	                token : "comment", // comment spanning whole line
	                regex : ".+"
	            }
	        ]
	    };
	};
	
	oop.inherits(LessHighlightRules, TextHighlightRules);
	
	exports.LessHighlightRules = LessHighlightRules;
	
	});
	
	ace.define("ace/mode/coffee_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(acequire, exports, module) {
	"use strict";
	
	    var oop = acequire("../lib/oop");
	    var TextHighlightRules = acequire("./text_highlight_rules").TextHighlightRules;
	
	    oop.inherits(CoffeeHighlightRules, TextHighlightRules);
	
	    function CoffeeHighlightRules() {
	        var identifier = "[$A-Za-z_\\x7f-\\uffff][$\\w\\x7f-\\uffff]*";
	
	        var keywords = (
	            "this|throw|then|try|typeof|super|switch|return|break|by|continue|" +
	            "catch|class|in|instanceof|is|isnt|if|else|extends|for|own|" +
	            "finally|function|while|when|new|no|not|delete|debugger|do|loop|of|off|" +
	            "or|on|unless|until|and|yes"
	        );
	
	        var langConstant = (
	            "true|false|null|undefined|NaN|Infinity"
	        );
	
	        var illegal = (
	            "case|const|default|function|var|void|with|enum|export|implements|" +
	            "interface|let|package|private|protected|public|static|yield|" +
	            "__hasProp|slice|bind|indexOf"
	        );
	
	        var supportClass = (
	            "Array|Boolean|Date|Function|Number|Object|RegExp|ReferenceError|String|" +
	            "Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|" +
	            "SyntaxError|TypeError|URIError|"  +
	            "ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|" +
	            "Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray"
	        );
	
	        var supportFunction = (
	            "Math|JSON|isNaN|isFinite|parseInt|parseFloat|encodeURI|" +
	            "encodeURIComponent|decodeURI|decodeURIComponent|String|"
	        );
	
	        var variableLanguage = (
	            "window|arguments|prototype|document"
	        );
	
	        var keywordMapper = this.createKeywordMapper({
	            "keyword": keywords,
	            "constant.language": langConstant,
	            "invalid.illegal": illegal,
	            "language.support.class": supportClass,
	            "language.support.function": supportFunction,
	            "variable.language": variableLanguage
	        }, "identifier");
	
	        var functionRule = {
	            token: ["paren.lparen", "variable.parameter", "paren.rparen", "text", "storage.type"],
	            regex: /(?:(\()((?:"[^")]*?"|'[^')]*?'|\/[^\/)]*?\/|[^()\"'\/])*?)(\))(\s*))?([\-=]>)/.source
	        };
	
	        var stringEscape = /\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.)/;
	
	        this.$rules = {
	            start : [
	                {
	                    token : "constant.numeric",
	                    regex : "(?:0x[\\da-fA-F]+|(?:\\d+(?:\\.\\d+)?|\\.\\d+)(?:[eE][+-]?\\d+)?)"
	                }, {
	                    stateName: "qdoc",
	                    token : "string", regex : "'''", next : [
	                        {token : "string", regex : "'''", next : "start"},
	                        {token : "constant.language.escape", regex : stringEscape},
	                        {defaultToken: "string"}
	                    ]
	                }, {
	                    stateName: "qqdoc",
	                    token : "string",
	                    regex : '"""',
	                    next : [
	                        {token : "string", regex : '"""', next : "start"},
	                        {token : "paren.string", regex : '#{', push : "start"},
	                        {token : "constant.language.escape", regex : stringEscape},
	                        {defaultToken: "string"}
	                    ]
	                }, {
	                    stateName: "qstring",
	                    token : "string", regex : "'", next : [
	                        {token : "string", regex : "'", next : "start"},
	                        {token : "constant.language.escape", regex : stringEscape},
	                        {defaultToken: "string"}
	                    ]
	                }, {
	                    stateName: "qqstring",
	                    token : "string.start", regex : '"', next : [
	                        {token : "string.end", regex : '"', next : "start"},
	                        {token : "paren.string", regex : '#{', push : "start"},
	                        {token : "constant.language.escape", regex : stringEscape},
	                        {defaultToken: "string"}
	                    ]
	                }, {
	                    stateName: "js",
	                    token : "string", regex : "`", next : [
	                        {token : "string", regex : "`", next : "start"},
	                        {token : "constant.language.escape", regex : stringEscape},
	                        {defaultToken: "string"}
	                    ]
	                }, {
	                    regex: "[{}]", onMatch: function(val, state, stack) {
	                        this.next = "";
	                        if (val == "{" && stack.length) {
	                            stack.unshift("start", state);
	                            return "paren";
	                        }
	                        if (val == "}" && stack.length) {
	                            stack.shift();
	                            this.next = stack.shift() || "";
	                            if (this.next.indexOf("string") != -1)
	                                return "paren.string";
	                        }
	                        return "paren";
	                    }
	                }, {
	                    token : "string.regex",
	                    regex : "///",
	                    next : "heregex"
	                }, {
	                    token : "string.regex",
	                    regex : /(?:\/(?![\s=])[^[\/\n\\]*(?:(?:\\[\s\S]|\[[^\]\n\\]*(?:\\[\s\S][^\]\n\\]*)*])[^[\/\n\\]*)*\/)(?:[imgy]{0,4})(?!\w)/
	                }, {
	                    token : "comment",
	                    regex : "###(?!#)",
	                    next : "comment"
	                }, {
	                    token : "comment",
	                    regex : "#.*"
	                }, {
	                    token : ["punctuation.operator", "text", "identifier"],
	                    regex : "(\\.)(\\s*)(" + illegal + ")"
	                }, {
	                    token : "punctuation.operator",
	                    regex : "\\.{1,3}"
	                }, {
	                    token : ["keyword", "text", "language.support.class",
	                     "text", "keyword", "text", "language.support.class"],
	                    regex : "(class)(\\s+)(" + identifier + ")(?:(\\s+)(extends)(\\s+)(" + identifier + "))?"
	                }, {
	                    token : ["entity.name.function", "text", "keyword.operator", "text"].concat(functionRule.token),
	                    regex : "(" + identifier + ")(\\s*)([=:])(\\s*)" + functionRule.regex
	                }, 
	                functionRule, 
	                {
	                    token : "variable",
	                    regex : "@(?:" + identifier + ")?"
	                }, {
	                    token: keywordMapper,
	                    regex : identifier
	                }, {
	                    token : "punctuation.operator",
	                    regex : "\\,|\\."
	                }, {
	                    token : "storage.type",
	                    regex : "[\\-=]>"
	                }, {
	                    token : "keyword.operator",
	                    regex : "(?:[-+*/%<>&|^!?=]=|>>>=?|\\-\\-|\\+\\+|::|&&=|\\|\\|=|<<=|>>=|\\?\\.|\\.{2,3}|[!*+-=><])"
	                }, {
	                    token : "paren.lparen",
	                    regex : "[({[]"
	                }, {
	                    token : "paren.rparen",
	                    regex : "[\\]})]"
	                }, {
	                    token : "text",
	                    regex : "\\s+"
	                }],
	
	
	            heregex : [{
	                token : "string.regex",
	                regex : '.*?///[imgy]{0,4}',
	                next : "start"
	            }, {
	                token : "comment.regex",
	                regex : "\\s+(?:#.*)?"
	            }, {
	                token : "string.regex",
	                regex : "\\S+"
	            }],
	
	            comment : [{
	                token : "comment",
	                regex : '###',
	                next : "start"
	            }, {
	                defaultToken : "comment"
	            }]
	        };
	        this.normalizeRules();
	    }
	
	    exports.CoffeeHighlightRules = CoffeeHighlightRules;
	});
	
	ace.define("ace/mode/jade_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules","ace/mode/markdown_highlight_rules","ace/mode/scss_highlight_rules","ace/mode/less_highlight_rules","ace/mode/coffee_highlight_rules","ace/mode/javascript_highlight_rules"], function(acequire, exports, module) {
	"use strict";
	
	var oop = acequire("../lib/oop");
	var TextHighlightRules = acequire("./text_highlight_rules").TextHighlightRules;
	var MarkdownHighlightRules = acequire("./markdown_highlight_rules").MarkdownHighlightRules;
	var SassHighlightRules = acequire("./scss_highlight_rules").ScssHighlightRules;
	var LessHighlightRules = acequire("./less_highlight_rules").LessHighlightRules;
	var CoffeeHighlightRules = acequire("./coffee_highlight_rules").CoffeeHighlightRules;
	var JavaScriptHighlightRules = acequire("./javascript_highlight_rules").JavaScriptHighlightRules;
	
	function mixin_embed(tag, prefix) {
	    return { 
	        token : "entity.name.function.jade",
	        regex : "^\\s*\\:" + tag,
	        next  : prefix + "start"
	    };
	}
	
	var JadeHighlightRules = function() {
	
	    var escapedRe = "\\\\(?:x[0-9a-fA-F]{2}|" + // hex
	        "u[0-9a-fA-F]{4}|" + // unicode
	        "[0-2][0-7]{0,2}|" + // oct
	        "3[0-6][0-7]?|" + // oct
	        "37[0-7]?|" + // oct
	        "[4-7][0-7]?|" + //oct
	        ".)";
	
	    this.$rules = 
	        {
	    "start": [
	        {
	            token: "keyword.control.import.include.jade",
	            regex: "\\s*\\binclude\\b"
	        },
	        {
	            token: "keyword.other.doctype.jade",
	            regex: "^!!!\\s*(?:[a-zA-Z0-9-_]+)?"
	        },
	        {
	            token : "punctuation.section.comment",
	            regex : "^\\s*\/\/(?:\\s*[^-\\s]|\\s+\\S)(?:.*$)"
	        },
	        {
	            onMatch: function(value, currentState, stack) {
	                stack.unshift(this.next, value.length - 2, currentState);
	                return "comment";
	            },
	            regex: /^\s*\/\//,
	            next: "comment_block"
	        },
	        mixin_embed("markdown", "markdown-"),
	        mixin_embed("sass", "sass-"),
	        mixin_embed("less", "less-"),
	        mixin_embed("coffee", "coffee-"),
	        {
	            token: [ "storage.type.function.jade",
	                       "entity.name.function.jade",
	                       "punctuation.definition.parameters.begin.jade",
	                       "variable.parameter.function.jade",
	                       "punctuation.definition.parameters.end.jade"
	                    ],
	            regex: "^(\\s*mixin)( [\\w\\-]+)(\\s*\\()(.*?)(\\))"
	        },
	        {
	            token: [ "storage.type.function.jade", "entity.name.function.jade"],
	            regex: "^(\\s*mixin)( [\\w\\-]+)"
	        },
	        {
	            token: "source.js.embedded.jade",
	            regex: "^\\s*(?:-|=|!=)",
	            next: "js-start"
	        },
	        {
	            token: "string.interpolated.jade",
	            regex: "[#!]\\{[^\\}]+\\}"
	        },
	        {
	            token: "meta.tag.any.jade",
	            regex: /^\s*(?!\w+\:)(?:[\w-]+|(?=\.|#)])/,
	            next: "tag_single"
	        },
	        {
	            token: "suport.type.attribute.id.jade",
	            regex: "#\\w+"
	        },
	        {
	            token: "suport.type.attribute.class.jade",
	            regex: "\\.\\w+"
	        },
	        {
	            token: "punctuation",
	            regex: "\\s*(?:\\()",
	            next: "tag_attributes"
	        }
	    ],
	    "comment_block": [
	        {regex: /^\s*/, onMatch: function(value, currentState, stack) {
	            if (value.length <= stack[1]) {
	                stack.shift();
	                stack.shift();
	                this.next = stack.shift();
	                return "text";
	            } else {
	                this.next = "";
	                return "comment";
	            }
	        }, next: "start"},
	        {defaultToken: "comment"}
	    ],
	    "tag_single": [
	        {
	            token: "entity.other.attribute-name.class.jade",
	            regex: "\\.[\\w-]+"
	        },
	        {
	            token: "entity.other.attribute-name.id.jade",
	            regex: "#[\\w-]+"
	        },
	        {
	            token: ["text", "punctuation"],
	            regex: "($)|((?!\\.|#|=|-))",
	            next: "start"
	        }
	    ],
	    "tag_attributes": [ 
	        {
	            token : "string",
	            regex : "'(?=.)",
	            next  : "qstring"
	        }, 
	        {
	            token : "string",
	            regex : '"(?=.)',
	            next  : "qqstring"
	        },
	        {
	            token: ["entity.other.attribute-name.jade", "punctuation"],
	            regex: "([a-zA-Z:\\.-]+)(=)?",
	            next: "attribute_strings"
	        },
	        {
	            token: "punctuation",
	            regex: "\\)",
	            next: "start"
	        }
	    ],
	    "attribute_strings": [
	        {
	            token : "string",
	            regex : "'(?=.)",
	            next  : "qstring"
	        }, 
	        {
	            token : "string",
	            regex : '"(?=.)',
	            next  : "qqstring"
	        },
	        {
	            token : "string",
	            regex : '(?=\\S)',
	            next  : "tag_attributes"
	        }
	    ],
	    "qqstring" : [
	        {
	            token : "constant.language.escape",
	            regex : escapedRe
	        }, {
	            token : "string",
	            regex : '[^"\\\\]+'
	        }, {
	            token : "string",
	            regex : "\\\\$",
	            next  : "qqstring"
	        }, {
	            token : "string",
	            regex : '"|$',
	            next  : "tag_attributes"
	        }
	    ],
	    "qstring" : [
	        {
	            token : "constant.language.escape",
	            regex : escapedRe
	        }, {
	            token : "string",
	            regex : "[^'\\\\]+"
	        }, {
	            token : "string",
	            regex : "\\\\$",
	            next  : "qstring"
	        }, {
	            token : "string",
	            regex : "'|$",
	            next  : "tag_attributes"
	        }
	    ]
	};
	
	    this.embedRules(JavaScriptHighlightRules, "js-", [{
	        token: "text",
	        regex: ".$",
	        next: "start"
	    }]);
	};
	
	oop.inherits(JadeHighlightRules, TextHighlightRules);
	
	exports.JadeHighlightRules = JadeHighlightRules;
	});
	
	ace.define("ace/mode/folding/coffee",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"], function(acequire, exports, module) {
	"use strict";
	
	var oop = acequire("../../lib/oop");
	var BaseFoldMode = acequire("./fold_mode").FoldMode;
	var Range = acequire("../../range").Range;
	
	var FoldMode = exports.FoldMode = function() {};
	oop.inherits(FoldMode, BaseFoldMode);
	
	(function() {
	
	    this.getFoldWidgetRange = function(session, foldStyle, row) {
	        var range = this.indentationBlock(session, row);
	        if (range)
	            return range;
	
	        var re = /\S/;
	        var line = session.getLine(row);
	        var startLevel = line.search(re);
	        if (startLevel == -1 || line[startLevel] != "#")
	            return;
	
	        var startColumn = line.length;
	        var maxRow = session.getLength();
	        var startRow = row;
	        var endRow = row;
	
	        while (++row < maxRow) {
	            line = session.getLine(row);
	            var level = line.search(re);
	
	            if (level == -1)
	                continue;
	
	            if (line[level] != "#")
	                break;
	
	            endRow = row;
	        }
	
	        if (endRow > startRow) {
	            var endColumn = session.getLine(endRow).length;
	            return new Range(startRow, startColumn, endRow, endColumn);
	        }
	    };
	    this.getFoldWidget = function(session, foldStyle, row) {
	        var line = session.getLine(row);
	        var indent = line.search(/\S/);
	        var next = session.getLine(row + 1);
	        var prev = session.getLine(row - 1);
	        var prevIndent = prev.search(/\S/);
	        var nextIndent = next.search(/\S/);
	
	        if (indent == -1) {
	            session.foldWidgets[row - 1] = prevIndent!= -1 && prevIndent < nextIndent ? "start" : "";
	            return "";
	        }
	        if (prevIndent == -1) {
	            if (indent == nextIndent && line[indent] == "#" && next[indent] == "#") {
	                session.foldWidgets[row - 1] = "";
	                session.foldWidgets[row + 1] = "";
	                return "start";
	            }
	        } else if (prevIndent == indent && line[indent] == "#" && prev[indent] == "#") {
	            if (session.getLine(row - 2).search(/\S/) == -1) {
	                session.foldWidgets[row - 1] = "start";
	                session.foldWidgets[row + 1] = "";
	                return "";
	            }
	        }
	
	        if (prevIndent!= -1 && prevIndent < indent)
	            session.foldWidgets[row - 1] = "start";
	        else
	            session.foldWidgets[row - 1] = "";
	
	        if (indent < nextIndent)
	            return "start";
	        else
	            return "";
	    };
	
	}).call(FoldMode.prototype);
	
	});
	
	ace.define("ace/mode/jade",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/jade_highlight_rules","ace/mode/folding/coffee"], function(acequire, exports, module) {
	"use strict";
	
	var oop = acequire("../lib/oop");
	var TextMode = acequire("./text").Mode;
	var JadeHighlightRules = acequire("./jade_highlight_rules").JadeHighlightRules;
	var FoldMode = acequire("./folding/coffee").FoldMode;
	
	var Mode = function() {
	    this.HighlightRules = JadeHighlightRules;
	    
	    this.foldingRules = new FoldMode();
	};
	oop.inherits(Mode, TextMode);
	
	(function() { 
		this.lineCommentStart = "//";
	    this.$id = "ace/mode/jade";
	}).call(Mode.prototype);
	
	exports.Mode = Mode;
	});


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = __webpack_require__(6);


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var alphabet = __webpack_require__(7);
	var encode = __webpack_require__(9);
	var decode = __webpack_require__(11);
	var isValid = __webpack_require__(12);
	
	// Ignore all milliseconds before a certain time to reduce the size of the date entropy without sacrificing uniqueness.
	// This number should be updated every year or so to keep the generated id short.
	// To regenerate `new Date() - 0` and bump the version. Always bump the version!
	var REDUCE_TIME = 1426452414093;
	
	// don't change unless we change the algos or REDUCE_TIME
	// must be an integer and less than 16
	var version = 5;
	
	// if you are using cluster or multiple servers use this to make each instance
	// has a unique value for worker
	// Note: I don't know if this is automatically set when using third
	// party cluster solutions such as pm2.
	var clusterWorkerId = __webpack_require__(13) || 0;
	
	// Counter is used when shortid is called multiple times in one second.
	var counter;
	
	// Remember the last time shortid was called in case counter is needed.
	var previousSeconds;
	
	/**
	 * Generate unique id
	 * Returns string id
	 */
	function generate() {
	
	    var str = '';
	
	    var seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);
	
	    if (seconds === previousSeconds) {
	        counter++;
	    } else {
	        counter = 0;
	        previousSeconds = seconds;
	    }
	
	    str = str + encode(alphabet.lookup, version);
	    str = str + encode(alphabet.lookup, clusterWorkerId);
	    if (counter > 0) {
	        str = str + encode(alphabet.lookup, counter);
	    }
	    str = str + encode(alphabet.lookup, seconds);
	
	    return str;
	}
	
	
	/**
	 * Set the seed.
	 * Highly recommended if you don't want people to try to figure out your id schema.
	 * exposed as shortid.seed(int)
	 * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
	 */
	function seed(seedValue) {
	    alphabet.seed(seedValue);
	    return module.exports;
	}
	
	/**
	 * Set the cluster worker or machine id
	 * exposed as shortid.worker(int)
	 * @param workerId worker must be positive integer.  Number less than 16 is recommended.
	 * returns shortid module so it can be chained.
	 */
	function worker(workerId) {
	    clusterWorkerId = workerId;
	    return module.exports;
	}
	
	/**
	 *
	 * sets new characters to use in the alphabet
	 * returns the shuffled alphabet
	 */
	function characters(newCharacters) {
	    if (newCharacters !== undefined) {
	        alphabet.characters(newCharacters);
	    }
	
	    return alphabet.shuffled();
	}
	
	
	// Export all other functions as properties of the generate function
	module.exports = generate;
	module.exports.generate = generate;
	module.exports.seed = seed;
	module.exports.worker = worker;
	module.exports.characters = characters;
	module.exports.decode = decode;
	module.exports.isValid = isValid;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var randomFromSeed = __webpack_require__(8);
	
	var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
	var alphabet;
	var previousSeed;
	
	var shuffled;
	
	function reset() {
	    shuffled = false;
	}
	
	function setCharacters(_alphabet_) {
	    if (!_alphabet_) {
	        if (alphabet !== ORIGINAL) {
	            alphabet = ORIGINAL;
	            reset();
	        }
	        return;
	    }
	
	    if (_alphabet_ === alphabet) {
	        return;
	    }
	
	    if (_alphabet_.length !== ORIGINAL.length) {
	        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);
	    }
	
	    var unique = _alphabet_.split('').filter(function(item, ind, arr){
	       return ind !== arr.lastIndexOf(item);
	    });
	
	    if (unique.length) {
	        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));
	    }
	
	    alphabet = _alphabet_;
	    reset();
	}
	
	function characters(_alphabet_) {
	    setCharacters(_alphabet_);
	    return alphabet;
	}
	
	function setSeed(seed) {
	    randomFromSeed.seed(seed);
	    if (previousSeed !== seed) {
	        reset();
	        previousSeed = seed;
	    }
	}
	
	function shuffle() {
	    if (!alphabet) {
	        setCharacters(ORIGINAL);
	    }
	
	    var sourceArray = alphabet.split('');
	    var targetArray = [];
	    var r = randomFromSeed.nextValue();
	    var characterIndex;
	
	    while (sourceArray.length > 0) {
	        r = randomFromSeed.nextValue();
	        characterIndex = Math.floor(r * sourceArray.length);
	        targetArray.push(sourceArray.splice(characterIndex, 1)[0]);
	    }
	    return targetArray.join('');
	}
	
	function getShuffled() {
	    if (shuffled) {
	        return shuffled;
	    }
	    shuffled = shuffle();
	    return shuffled;
	}
	
	/**
	 * lookup shuffled letter
	 * @param index
	 * @returns {string}
	 */
	function lookup(index) {
	    var alphabetShuffled = getShuffled();
	    return alphabetShuffled[index];
	}
	
	module.exports = {
	    characters: characters,
	    seed: setSeed,
	    lookup: lookup,
	    shuffled: getShuffled
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	// Found this seed-based random generator somewhere
	// Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)
	
	var seed = 1;
	
	/**
	 * return a random number based on a seed
	 * @param seed
	 * @returns {number}
	 */
	function getNextValue() {
	    seed = (seed * 9301 + 49297) % 233280;
	    return seed/(233280.0);
	}
	
	function setSeed(_seed_) {
	    seed = _seed_;
	}
	
	module.exports = {
	    nextValue: getNextValue,
	    seed: setSeed
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var randomByte = __webpack_require__(10);
	
	function encode(lookup, number) {
	    var loopCounter = 0;
	    var done;
	
	    var str = '';
	
	    while (!done) {
	        str = str + lookup( ( (number >> (4 * loopCounter)) & 0x0f ) | randomByte() );
	        done = number < (Math.pow(16, loopCounter + 1 ) );
	        loopCounter++;
	    }
	    return str;
	}
	
	module.exports = encode;


/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	var crypto = window.crypto || window.msCrypto; // IE 11 uses window.msCrypto
	
	function randomByte() {
	    if (!crypto || !crypto.getRandomValues) {
	        return Math.floor(Math.random() * 256) & 0x30;
	    }
	    var dest = new Uint8Array(1);
	    crypto.getRandomValues(dest);
	    return dest[0] & 0x30;
	}
	
	module.exports = randomByte;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(7);
	
	/**
	 * Decode the id to get the version and worker
	 * Mainly for debugging and testing.
	 * @param id - the shortid-generated id.
	 */
	function decode(id) {
	    var characters = alphabet.shuffled();
	    return {
	        version: characters.indexOf(id.substr(0, 1)) & 0x0f,
	        worker: characters.indexOf(id.substr(1, 1)) & 0x0f
	    };
	}
	
	module.exports = decode;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(7);
	
	function isShortId(id) {
	    if (!id || typeof id !== 'string' || id.length < 6 ) {
	        return false;
	    }
	
	    var characters = alphabet.characters();
	    var invalidCharacters = id.split('').map(function(char){
	        if (characters.indexOf(char) === -1) {
	            return char;
	        }
	    }).join('').split('').join('');
	
	    return invalidCharacters.length === 0;
	}
	
	module.exports = isShortId;


/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = 0;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _regenerator = __webpack_require__(1);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _keys = __webpack_require__(15);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _asyncToGenerator2 = __webpack_require__(2);
	
	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
	
	var _jsreportStudio = __webpack_require__(3);
	
	var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);
	
	var _assign2 = __webpack_require__(16);
	
	var _assign3 = _interopRequireDefault(_assign2);
	
	var _bluebird = __webpack_require__(46);
	
	var _bluebird2 = _interopRequireDefault(_bluebird);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
	  var previousVersion, entities;
	  return _regenerator2.default.wrap(function _callee2$(_context2) {
	    while (1) {
	      switch (_context2.prev = _context2.next) {
	        case 0:
	          _jsreportStudio2.default.store.dispatch({ type: _jsreportStudio2.default.entities.ActionTypes.API_START });
	          _jsreportStudio2.default.flushUpdates();
	          previousVersion = _jsreportStudio2.default.workspaces.current.version;
	          _context2.next = 5;
	          return _jsreportStudio2.default.api.post('/odata/workspaces', {
	            data: {
	              shortid: _jsreportStudio2.default.workspaces.current.shortid,
	              name: _jsreportStudio2.default.workspaces.current.name,
	              default: _jsreportStudio2.default.workspaces.current.default
	            }
	          });
	
	        case 5:
	          _jsreportStudio2.default.workspaces.current = _context2.sent;
	
	
	          _jsreportStudio2.default.addApiHeaders({
	            'workspace-shortid': _jsreportStudio2.default.workspaces.current.shortid,
	            'workspace-version': _jsreportStudio2.default.workspaces.current.version
	          });
	
	          entities = (0, _keys2.default)(_jsreportStudio2.default.store.getState().entities).map(function (k) {
	            return _jsreportStudio2.default.store.getState().entities[k];
	          });
	          _context2.next = 10;
	          return _bluebird2.default.all(entities.map(function () {
	            var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(e) {
	              var post, loaded, oldId, response;
	              return _regenerator2.default.wrap(function _callee$(_context) {
	                while (1) {
	                  switch (_context.prev = _context.next) {
	                    case 0:
	                      post = (0, _assign3.default)({}, e);
	
	                      if (!(!e.__isLoaded && !e.__isNew)) {
	                        _context.next = 6;
	                        break;
	                      }
	
	                      _context.next = 4;
	                      return _jsreportStudio2.default.api.get('/odata/' + e.__entitySet + '?$filter=workspaceVersion eq ' + previousVersion + ' and workspaceShortid eq \'' + _jsreportStudio2.default.workspaces.current.shortid + '\' and shortid eq \'' + e.shortid + '\'');
	
	                    case 4:
	                      loaded = _context.sent;
	
	                      post = (0, _assign3.default)({}, loaded.value[0], post);
	
	                    case 6:
	
	                      post = _jsreportStudio2.default.entities.actions.prune(post);
	
	                      post.workspaceShortid = _jsreportStudio2.default.workspaces.current.shortid;
	                      post.workspaceVersion = _jsreportStudio2.default.workspaces.current.version;
	                      oldId = post._id;
	
	                      delete post._id;
	                      _context.next = 13;
	                      return _jsreportStudio2.default.api.post('/odata/' + e.__entitySet, { data: post });
	
	                    case 13:
	                      response = _context.sent;
	
	                      post._id = response._id;
	                      post.__entitySet = e.__entitySet;
	                      post.__isLoaded = e.__isLoaded || e.__isNew;
	
	                      _jsreportStudio2.default.store.dispatch({
	                        type: _jsreportStudio2.default.entities.ActionTypes.REPLACE,
	                        oldId: oldId,
	                        entity: post
	                      });
	
	                    case 18:
	                    case 'end':
	                      return _context.stop();
	                  }
	                }
	              }, _callee, undefined);
	            }));
	            return function (_x) {
	              return ref.apply(this, arguments);
	            };
	          }()));
	
	        case 10:
	
	          _jsreportStudio2.default.store.dispatch({ type: _jsreportStudio2.default.entities.ActionTypes.API_DONE });
	
	          return _context2.abrupt('return', 'block');
	
	        case 12:
	        case 'end':
	          return _context2.stop();
	      }
	    }
	  }, _callee2, undefined);
	}));

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['core-js/object/keys'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(17),
	    copyObject = __webpack_require__(19),
	    createAssigner = __webpack_require__(20),
	    isArrayLike = __webpack_require__(22),
	    isPrototype = __webpack_require__(35),
	    keys = __webpack_require__(36);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
	var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');
	
	/**
	 * Assigns own enumerable string keyed properties of source objects to the
	 * destination object. Source objects are applied from left to right.
	 * Subsequent sources overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object` and is loosely based on
	 * [`Object.assign`](https://mdn.io/Object/assign).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.10.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * function Foo() {
	 *   this.c = 3;
	 * }
	 *
	 * function Bar() {
	 *   this.e = 5;
	 * }
	 *
	 * Foo.prototype.d = 4;
	 * Bar.prototype.f = 6;
	 *
	 * _.assign({ 'a': 1 }, new Foo, new Bar);
	 * // => { 'a': 1, 'c': 3, 'e': 5 }
	 */
	var assign = createAssigner(function(object, source) {
	  if (nonEnumShadows || isPrototype(source) || isArrayLike(source)) {
	    copyObject(source, keys(source), object);
	    return;
	  }
	  for (var key in source) {
	    if (hasOwnProperty.call(source, key)) {
	      assignValue(object, key, source[key]);
	    }
	  }
	});
	
	module.exports = assign;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(18);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    object[key] = value;
	  }
	}
	
	module.exports = assignValue;


/***/ },
/* 18 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var other = { 'user': 'fred' };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}
	
	module.exports = eq;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(17);
	
	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  object || (object = {});
	
	  var index = -1,
	      length = props.length;
	
	  while (++index < length) {
	    var key = props[index];
	
	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : source[key];
	
	    assignValue(object, key, newValue);
	  }
	  return object;
	}
	
	module.exports = copyObject;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var isIterateeCall = __webpack_require__(21),
	    rest = __webpack_require__(29);
	
	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return rest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;
	
	    customizer = typeof customizer == 'function'
	      ? (length--, customizer)
	      : undefined;
	
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}
	
	module.exports = createAssigner;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(18),
	    isArrayLike = __webpack_require__(22),
	    isIndex = __webpack_require__(28),
	    isObject = __webpack_require__(26);
	
	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}
	
	module.exports = isIterateeCall;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(23),
	    isFunction = __webpack_require__(25),
	    isLength = __webpack_require__(27);
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value)) && !isFunction(value);
	}
	
	module.exports = isArrayLike;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(24);
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a
	 * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
	 * Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	module.exports = getLength;


/***/ },
/* 24 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	module.exports = baseProperty;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(26);
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	module.exports = isFunction;


/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	module.exports = isObject;


/***/ },
/* 27 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length,
	 *  else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	module.exports = isLength;


/***/ },
/* 28 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}
	
	module.exports = isIndex;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(30),
	    toInteger = __webpack_require__(31);
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as
	 * an array.
	 *
	 * **Note:** This method is based on the
	 * [rest parameter](https://mdn.io/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.rest(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function rest(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? (func.length - 1) : toInteger(start), 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);
	
	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    switch (start) {
	      case 0: return func.call(this, array);
	      case 1: return func.call(this, args[0], array);
	      case 2: return func.call(this, args[0], args[1], array);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = array;
	    return apply(func, this, otherArgs);
	  };
	}
	
	module.exports = rest;


/***/ },
/* 30 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  var length = args.length;
	  switch (length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}
	
	module.exports = apply;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var toNumber = __webpack_require__(32);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308;
	
	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This function is loosely based on
	 * [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3');
	 * // => 3
	 */
	function toInteger(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  var remainder = value % 1;
	  return value === value ? (remainder ? value - remainder : value) : 0;
	}
	
	module.exports = toInteger;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(25),
	    isObject = __webpack_require__(26),
	    isSymbol = __webpack_require__(33);
	
	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;
	
	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;
	
	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	
	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;
	
	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;
	
	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;
	
	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3);
	 * // => 3
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3');
	 * // => 3
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = isFunction(value.valueOf) ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}
	
	module.exports = toNumber;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(34);
	
	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}
	
	module.exports = isSymbol;


/***/ },
/* 34 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	module.exports = isObjectLike;


/***/ },
/* 35 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
	
	  return value === proto;
	}
	
	module.exports = isPrototype;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(37),
	    baseKeys = __webpack_require__(39),
	    indexKeys = __webpack_require__(40),
	    isArrayLike = __webpack_require__(22),
	    isIndex = __webpack_require__(28),
	    isPrototype = __webpack_require__(35);
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  var isProto = isPrototype(object);
	  if (!(isProto || isArrayLike(object))) {
	    return baseKeys(object);
	  }
	  var indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;
	
	  for (var key in object) {
	    if (baseHas(object, key) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	        !(isProto && key == 'constructor')) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = keys;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(38);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	  // that are composed entirely of index properties, return `false` for
	  // `hasOwnProperty` checks of them.
	  return hasOwnProperty.call(object, key) ||
	    (typeof object == 'object' && key in object && getPrototype(object) === null);
	}
	
	module.exports = baseHas;


/***/ },
/* 38 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetPrototype = Object.getPrototypeOf;
	
	/**
	 * Gets the `[[Prototype]]` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {null|Object} Returns the `[[Prototype]]`.
	 */
	function getPrototype(value) {
	  return nativeGetPrototype(Object(value));
	}
	
	module.exports = getPrototype;


/***/ },
/* 39 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = Object.keys;
	
	/**
	 * The base implementation of `_.keys` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  return nativeKeys(Object(object));
	}
	
	module.exports = baseKeys;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(41),
	    isArguments = __webpack_require__(42),
	    isArray = __webpack_require__(44),
	    isLength = __webpack_require__(27),
	    isString = __webpack_require__(45);
	
	/**
	 * Creates an array of index keys for `object` values of arrays,
	 * `arguments` objects, and strings, otherwise `null` is returned.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array|null} Returns index keys, else `null`.
	 */
	function indexKeys(object) {
	  var length = object ? object.length : undefined;
	  if (isLength(length) &&
	      (isArray(object) || isString(object) || isArguments(object))) {
	    return baseTimes(length, String);
	  }
	  return null;
	}
	
	module.exports = indexKeys;


/***/ },
/* 41 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);
	
	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}
	
	module.exports = baseTimes;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLikeObject = __webpack_require__(43);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}
	
	module.exports = isArguments;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(22),
	    isObjectLike = __webpack_require__(34);
	
	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}
	
	module.exports = isArrayLikeObject;


/***/ },
/* 44 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @type {Function}
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;
	
	module.exports = isArray;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(44),
	    isObjectLike = __webpack_require__(34);
	
	/** `Object#toString` result references. */
	var stringTag = '[object String]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
	}
	
	module.exports = isString;


/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = Studio.libraries['bluebird'];

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(48);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _ChangeNameModal = __webpack_require__(49);
	
	var _ChangeNameModal2 = _interopRequireDefault(_ChangeNameModal);
	
	var _ShareModal = __webpack_require__(55);
	
	var _ShareModal2 = _interopRequireDefault(_ShareModal);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var remove = function remove() {
	  var entity = Studio.getActiveEntity();
	
	  Studio.store.dispatch({
	    type: Studio.entities.ActionTypes.REMOVE,
	    _id: entity._id
	  });
	};
	
	var buttonsForFull = function buttonsForFull() {
	  Studio.addToolbarComponent(function (props) {
	    return _react2.default.createElement(
	      'div',
	      {
	        className: 'toolbar-button', onClick: function onClick() {
	          return Studio.workspaces.save();
	        } },
	      _react2.default.createElement('i', { className: 'fa fa-floppy-o' }),
	      'Save All'
	    );
	  });
	
	  Studio.addToolbarComponent(function (props) {
	    return _react2.default.createElement(
	      'div',
	      {
	        className: 'toolbar-button ' + (!props.canRemove ? 'disabled' : ''), onClick: remove },
	      _react2.default.createElement('i', { className: 'fa fa-trash' }),
	      'Remove'
	    );
	  });
	
	  var currentDefault = function currentDefault() {
	    return Studio.getActiveEntity() && Studio.getActiveEntity().shortid === Studio.workspaces.current.default;
	  };
	  Studio.addToolbarComponent(function (props) {
	    return _react2.default.createElement(
	      'div',
	      {
	        className: 'toolbar-button', style: { color: currentDefault() ? 'yellow' : 'inherit' }, onClick: Studio.workspaces.setDefault },
	      _react2.default.createElement('i', { className: 'fa fa-star' }),
	      'Default'
	    );
	  });
	
	  Studio.addToolbarComponent(function (props) {
	    return _react2.default.createElement(
	      'div',
	      {
	        className: 'toolbar-button',
	        onClick: function onClick() {
	          return Studio.openModal(_ShareModal2.default, { workspace: Studio.workspaces.current });
	        } },
	      _react2.default.createElement('i', { className: 'fa fa-unlock' }),
	      'Share'
	    );
	  }, 'right');
	
	  Studio.addToolbarComponent(function (props) {
	    return _react2.default.createElement(
	      'div',
	      {
	        className: 'toolbar-button', onClick: function onClick() {
	          return window.location = '/';
	        } },
	      _react2.default.createElement('i', { className: 'fa fa-plus' }),
	      'New'
	    );
	  }, 'right');
	
	  Studio.addToolbarComponent(function (props) {
	    return _react2.default.createElement(
	      'div',
	      {
	        className: 'toolbar-button',
	        onClick: function onClick() {
	          return Studio.openTab({ key: 'Help', editorComponentKey: 'Help', title: 'Get Started' });
	        } },
	      _react2.default.createElement('i', { className: 'fa fa-question' })
	    );
	  }, 'right');
	};
	
	var buttonsForEmbed = function buttonsForEmbed() {
	  Studio.addToolbarComponent(function (props) {
	    return _react2.default.createElement(
	      'div',
	      {
	        className: 'toolbar-button', onClick: function onClick() {
	          return window.open(window.location.href.split('?')[0], '_blank');
	        } },
	      _react2.default.createElement('i', { className: 'fa fa-desktop' }),
	      'Full'
	    );
	  }, 'right');
	};
	
	exports.default = function (isEmbed, remove) {
	  Studio.addToolbarComponent(function (props) {
	    return _react2.default.createElement(
	      'div',
	      {
	        className: 'toolbar-button', onClick: function onClick() {
	          return Studio.openModal(_ChangeNameModal2.default, {});
	        } },
	      _react2.default.createElement('i', { className: 'fa fa-pencil' }),
	      _react2.default.createElement(
	        'span',
	        { id: 'workspaceName' },
	        Studio.workspaces.current.name || 'Anonymous'
	      )
	    );
	  }, 'right');
	
	  if (isEmbed) {
	    buttonsForEmbed();
	  } else {
	    buttonsForFull();
	  }
	};

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = Studio.libraries['react'];

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getPrototypeOf = __webpack_require__(50);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(51);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(52);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(53);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(54);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(48);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _jsreportStudio = __webpack_require__(3);
	
	var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ChangeNameModal = function (_Component) {
	  (0, _inherits3.default)(ChangeNameModal, _Component);
	
	  function ChangeNameModal() {
	    (0, _classCallCheck3.default)(this, ChangeNameModal);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ChangeNameModal).apply(this, arguments));
	  }
	
	  (0, _createClass3.default)(ChangeNameModal, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Workspace name'
	          ),
	          _react2.default.createElement('input', { type: 'text', ref: 'name', defaultValue: _jsreportStudio2.default.workspaces.current.name || '' })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'button-bar' },
	          _react2.default.createElement(
	            'button',
	            {
	              className: 'button confirmation',
	              onClick: function onClick() {
	                _jsreportStudio2.default.workspaces.current.name = _this2.refs.name.value;
	                _jsreportStudio2.default.workspaces.save();
	                _this2.props.close();
	              } },
	            'ok'
	          )
	        )
	      );
	    }
	  }]);
	  return ChangeNameModal;
	}(_react.Component);
	
	ChangeNameModal.propTypes = {
	  close: _react2.default.PropTypes.func.isRequired,
	  options: _react2.default.PropTypes.object.isRequired
	};
	exports.default = ChangeNameModal;

/***/ },
/* 50 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['core-js/object/get-prototype-of'];

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['helpers/classCallCheck'];

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['helpers/createClass'];

/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['helpers/possibleConstructorReturn'];

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = Studio.runtime['helpers/inherits'];

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getPrototypeOf = __webpack_require__(50);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(51);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(52);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(53);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(54);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(48);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ShareModal = function (_Component) {
	  (0, _inherits3.default)(ShareModal, _Component);
	
	  function ShareModal() {
	    (0, _classCallCheck3.default)(this, ShareModal);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ShareModal).apply(this, arguments));
	  }
	
	  (0, _createClass3.default)(ShareModal, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { style: { padding: '3rem' } },
	        _react2.default.createElement(
	          'code',
	          null,
	          '<iframe src=\'',
	          window.location.href,
	          '?embed=1\' width="100%" height="400" frameborder="0"></iframe>'
	        )
	      );
	    }
	  }]);
	  return ShareModal;
	}(_react.Component);
	
	ShareModal.propTypes = {
	  close: _react2.default.PropTypes.func.isRequired,
	  options: _react2.default.PropTypes.object.isRequired
	};
	exports.default = ShareModal;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _regenerator = __webpack_require__(1);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _asyncToGenerator2 = __webpack_require__(2);
	
	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
	
	var _getPrototypeOf = __webpack_require__(50);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(51);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(52);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(53);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(54);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(48);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _jsreportStudio = __webpack_require__(3);
	
	var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Startup = function (_Component) {
	  (0, _inherits3.default)(Startup, _Component);
	
	  function Startup() {
	    (0, _classCallCheck3.default)(this, Startup);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Startup).call(this));
	
	    _this.state = {};
	    return _this;
	  }
	
	  (0, _createClass3.default)(Startup, [{
	    key: 'componentDidMount',
	    value: function () {
	      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
	        var response;
	        return _regenerator2.default.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                _context.next = 2;
	                return _jsreportStudio2.default.api.get('/odata/workspaces?$orderby=creationDate desc&$top=10');
	
	              case 2:
	                response = _context.sent;
	
	
	                this.setState({ lastCreated: response.value });
	
	              case 4:
	              case 'end':
	                return _context.stop();
	            }
	          }
	        }, _callee, this);
	      }));
	
	      function componentDidMount() {
	        return ref.apply(this, arguments);
	      }
	
	      return componentDidMount;
	    }()
	  }, {
	    key: 'renderExamples',
	    value: function renderExamples() {
	      return _react2.default.createElement(
	        'table',
	        { className: 'table' },
	        _react2.default.createElement(
	          'tbody',
	          null,
	          _react2.default.createElement(
	            'tr',
	            null,
	            _react2.default.createElement(
	              'td',
	              { className: 'selection' },
	              _react2.default.createElement(
	                'a',
	                { href: '/studio/workspace/x13wJqeRc/1', target: '_blank' },
	                '1. Tutorial - Hello World'
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'tr',
	            null,
	            _react2.default.createElement(
	              'td',
	              { className: 'selection' },
	              _react2.default.createElement(
	                'a',
	                { href: '/studio/workspace/xykdJcxR5/1', target: '_blank' },
	                '2. Tutorial - Recipes'
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'tr',
	            null,
	            _react2.default.createElement(
	              'td',
	              { className: 'selection' },
	              _react2.default.createElement(
	                'a',
	                {
	                  href: '/studio/workspace/lyl_15eC9/1', target: '_blank' },
	                '3. Tutorial - Data extension'
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'tr',
	            null,
	            _react2.default.createElement(
	              'td',
	              { className: 'selection' },
	              _react2.default.createElement(
	                'a',
	                {
	                  href: '/studio/workspace/lyWJuycgAc/1', target: '_blank' },
	                '4. Tutorial - Scripts extension'
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'tr',
	            null,
	            _react2.default.createElement(
	              'td',
	              { className: 'selection' },
	              _react2.default.createElement(
	                'a',
	                { href: '/studio/workspace/lkHFBn0xB/1', target: '_blank' },
	                'Complex Pdf'
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'tr',
	            null,
	            _react2.default.createElement(
	              'td',
	              { className: 'selection' },
	              _react2.default.createElement(
	                'a',
	                { href: '/studio/workspace/YBjmBsPFa/1', target: '_blank' },
	                'Excel'
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'tr',
	            null,
	            _react2.default.createElement(
	              'td',
	              { className: 'selection' },
	              _react2.default.createElement(
	                'a',
	                { href: '/studio/workspace/gkxJuycgR5/1', target: '_blank' },
	                'FOP'
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'tr',
	            null,
	            _react2.default.createElement(
	              'td',
	              { className: 'selection' },
	              _react2.default.createElement(
	                'a',
	                { href: '/studio/workspace/Y3BG0fnPa/1', target: '_blank' },
	                'Html to xlsx'
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'tr',
	            null,
	            _react2.default.createElement(
	              'td',
	              { className: 'selection' },
	              _react2.default.createElement(
	                'a',
	                { href: '/studio/workspace/l1DbOPsN5/1', target: '_blank' },
	                'Pdf Invoice'
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'tr',
	            null,
	            _react2.default.createElement(
	              'td',
	              { className: 'selection' },
	              _react2.default.createElement(
	                'a',
	                { href: '/studio/workspace/Y3QQDfP9a/1', target: '_blank' },
	                'csv'
	              )
	            )
	          )
	        )
	      );
	    }
	  }, {
	    key: 'open',
	    value: function open(w) {
	      window.open('/studio/workspace/' + w.shortid + '/' + w.version, '_blank');
	    }
	  }, {
	    key: 'renderLastCreated',
	    value: function renderLastCreated() {
	      var _this2 = this;
	
	      return _react2.default.createElement(
	        'table',
	        { className: 'table' },
	        _react2.default.createElement(
	          'thead',
	          null,
	          _react2.default.createElement(
	            'tr',
	            null,
	            _react2.default.createElement(
	              'th',
	              null,
	              'name'
	            ),
	            _react2.default.createElement(
	              'th',
	              null,
	              'version'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'tbody',
	          null,
	          (this.state.lastCreated || []).map(function (w) {
	            return _react2.default.createElement(
	              'tr',
	              { key: w._id, onClick: function onClick() {
	                  return _this2.open(w);
	                } },
	              _react2.default.createElement(
	                'td',
	                { className: 'selection' },
	                w.name || 'Anonymous'
	              ),
	              _react2.default.createElement(
	                'td',
	                null,
	                w.version
	              )
	            );
	          })
	        )
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'custom-editor', style: { overflow: 'auto' } },
	        _react2.default.createElement(
	          'h2',
	          null,
	          'quick start'
	        ),
	        _react2.default.createElement(
	          'button',
	          { className: 'button confirmation', onClick: function onClick() {
	              return _jsreportStudio2.default.openNewModal('templates');
	            } },
	          _react2.default.createElement('i', { className: 'fa fa-plus' }),
	          ' Create template'
	        ),
	        _react2.default.createElement(
	          'h2',
	          null,
	          'last created workspaces'
	        ),
	        this.renderLastCreated(),
	        _react2.default.createElement(
	          'h2',
	          null,
	          'playground tutorials'
	        ),
	        this.renderExamples()
	      );
	    }
	  }]);
	  return Startup;
	}(_react.Component);

	exports.default = Startup;

/***/ }
/******/ ]);