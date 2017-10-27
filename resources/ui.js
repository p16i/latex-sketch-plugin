import pluginCall from 'sketch-module-web-view/client'

console.log('begin init');

const input = document.querySelector('.input');
const output = document.querySelector('.output');
const button = document.querySelector('.button');

const go = function (evt) {
  pluginCall('postContent');
}

const returnsSvg = function () {
  let combined = '';
  Array.from(document.querySelectorAll('svg')).forEach(
    svg => combined += svg.innerHTML,
  );
console.log(combined);
  return `<svg>${combined}</svg>`;
}

const process = function (evt) {
  output.innerHTML = `\$${evt.target.value}\$`;
  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

input.addEventListener('input', process);
button.addEventListener('click', go);

window.sketchBridge = returnsSvg;

console.log('init');
