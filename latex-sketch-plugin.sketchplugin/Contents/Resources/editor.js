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
  (0, _client2['default'])('postContent');
};

var returnsSvg = function returnsSvg() {
  var svgParent = document.getElementsByClassName('MathJax_SVG')[0];

  var svg = svgParent.children[0];
  var refs = svg.querySelectorAll('use');

  for (var i = 0; i < refs.length; i++) {
    var ru = refs[i];

    var id = ru.getAttribute('href').replace('#', '');

    var actual = document.getElementById(id);

    ru.innerHTML = actual.outerHTML;
  }

  var data = svg.outerHTML.replace(/stroke-width="\d+"/g, '');

  var latexStr = input.value;

  input.value = '';
  output.innerHTML = '';

  var res = String(latexStr) + '::::' + String(data);

  return res;
};

var process = function process(evt) {
  setLatex(evt.target.value);
};

var setLatex = function setLatex(txt, updateTextField) {
  if (updateTextField) {
    txt = decodeURI(txt);
    input.value = txt;
    document.getElementById('bt-submit').innerHTML = 'Update';
  }

  output.innerHTML = '$$' + String(txt) + '$$';

  if (MathJax) {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  }
};

input.addEventListener('input', process);
button.addEventListener('click', go);

window.setLatex = setLatex;
window.sketchBridge = returnsSvg;

console.log('init');
input.focus();

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