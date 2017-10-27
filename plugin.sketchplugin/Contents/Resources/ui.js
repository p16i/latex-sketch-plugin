/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var _client = __webpack_require__(1);

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

console.log('begin init');

var input = document.querySelector('.input');
var output = document.querySelector('.output');
var button = document.querySelector('.button');

var go = function go(evt) {
  var svg = output.querySelector('.MathJax_SVG').innerHTML;
  console.log(svg);
  (0, _client2['default'])('postContent', svg);
};

var process = function process(evt) {
  output.innerHTML = '$' + String(evt.target.value) + '$';
  MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
};

input.addEventListener('input', process);
button.addEventListener('click', go);

console.log('init');

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = function (actionName) {
  if (!actionName) {
    throw new Error('missing action name')
  }
  var args = [].slice.call(arguments).slice(1)
  var previousHash = (window.location.hash.split('?')[1] ? window.location.hash.split('?')[0] : window.location.hash)
  window.location.hash = previousHash +
    '?pluginAction=' + encodeURIComponent(actionName) +
    '&actionId=' + Date.now() +
    '&pluginArgs=' + encodeURIComponent(JSON.stringify(args))
  return
}


/***/ })
/******/ ]);