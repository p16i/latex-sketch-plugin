import pluginCall from 'sketch-module-web-view/client'

console.log('begin init');

const input = document.querySelector('.input');
const output = document.querySelector('.output');
const button = document.querySelector('.button');

const go = function (evt) {
  pluginCall('postContent');
}

const returnsSvg = function () {
  let svgParent = document.getElementsByClassName('MathJax_SVG')[0];

  let svg = svgParent.children[0];
  let refs = svg.querySelectorAll('use');


  for(let i = 0; i < refs.length; i++ ){
      let ru = refs[i]

      let id = ru.getAttribute('href').replace('#','');

      let actual = document.getElementById(id);

      ru.innerHTML = actual.outerHTML;

  }

  let data = svg.innerHTML.replace(/stroke-width="\d+"/g,'')


  input.value = '';
  output.innerHTML ='';


  return `<svg>${data}</svg>`;
}

const process = function (evt) {
  output.innerHTML = `\$${evt.target.value}\$`;
  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

input.addEventListener('input', process);
button.addEventListener('click', go);

window.sketchBridge = returnsSvg;

console.log('init');
