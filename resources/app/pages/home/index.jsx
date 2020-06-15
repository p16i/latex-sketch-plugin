import React, { useState, useRef, useEffect } from 'react';
import MathJax from 'react-mathjax-preview-svg'

const getSVGFromMathJaxDom = (dom) => {

  const group = dom.preview.childNodes[1].childNodes[0].innerHTML

  return `<svg>${group}</svg>`
}

export default function App() {
  const [latexSrc, setLatexSource] = useState("")
  const [svgContent, setSVG] = useState("")
  const renderPanel = useRef(null);
  const textArea = useRef(null);

  useEffect(() => {
    textArea.current.focus();
  }, [])


  return <div>
    <textarea ref={textArea} onChange={(evt) => {
        setLatexSource(evt.target.value)
    }} placeholder="E=mc^2">
    </textarea>
    <div className="output-container">
      <span class="preview-desc">
        👁
      </span>
      <div className="output">
        <MathJax ref={renderPanel} math={`\$ ${latexSrc} \$`}/>
      </div>
    </div>
    <br/>
    <a id="bt-submit" href="#" onClick={() => {
      const svgContent = getSVGFromMathJaxDom(renderPanel.current)
      window.postMessage(
        "svgUpdate",
        svgContent,
      )

    }}>Insert</a>
  </div>
}