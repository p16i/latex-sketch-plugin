import pluginCall from 'sketch-module-web-view/client'

console.log('begin init');

const input = document.querySelector('.input');
const output = document.querySelector('.output');
const button = document.querySelector('.button');

const go = function (evt) {
  const svg = output.querySelector('.MathJax_SVG').innerHTML;
  console.log(svg);
  pluginCall('postContent', svg);
}

const process = function (evt) {
  output.innerHTML = `\$${evt.target.value}\$`;
  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

input.addEventListener('input', process);
button.addEventListener('click', go);

console.log('init');
