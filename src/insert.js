
import BrowserWindow from "sketch-module-web-view"
import { getWebview } from "sketch-module-web-view/remote"
import UI from "sketch/ui"

import sketch from "sketch"

import { Rectangle, Artboard } from "sketch/dom"


const webviewIdentifier = "latex-sketch-plugin-v2.webview"

export default function () {

  const selectedDocument = sketch.getSelectedDocument()

  const myArtboard = selectedDocument.selectedLayers.layers[0]
  if(!myArtboard || (myArtboard && myArtboard.type !== "Artboard")) {
    UI.message("LaTeX ⚡️ Sketch: Please select an artboard 🎨");
    return;
  }

  const options = {
    identifier: webviewIdentifier,
    width: 400,
    height: 500,
    show: true,
  }

  const browserWindow = new BrowserWindow(options)

  // only show the window when the page has loaded to avoid a white flash
  browserWindow.once("ready-to-show", () => {
    browserWindow.show()
  })

  const webContents = browserWindow.webContents

  // print a message when the page loads
  // webContents.on("did-finish-load", () => {
  //   UI.message("UI loaded!")
  // })

  // add a handler for a call from web content's javascript
  webContents.on("nativeLog", (s) => {
    UI.message(s)
    webContents
      .executeJavaScript(`setRandomNumber(${Math.random()})`)
      .catch(console.error)
  })

  browserWindow.loadURL(require("../resources/webview.html"))

  browserWindow.webContents.on('svgUpdate', function(svgString) {

    const group = sketch.createLayerFromData(svgString, "svg")

    group.parent = myArtboard

    group.smartLayout = sketch.SmartLayout.VerticallyCenter

    group.name = "latex"
    const newFrame = new Rectangle(
      0, 0, group.frame.width, group.frame.height
    )


    const artboardFrame = myArtboard.frame
    const newWidth = artboardFrame.width * 0.5
    const ratio =  newWidth / group.frame.width

    newFrame.scale(ratio)

    group.frame = newFrame

    group.adjustToFit()

    group.seleected = true

    UI.message("LaTeX ⚡️ Sketch: formula inserted 🎉")

    browserWindow.close()
  })
}

// When the plugin is shutdown by Sketch (for example when the user disable the plugin)
// we need to close the webview if it's open
export function onShutdown() {
  const existingWebview = getWebview(webviewIdentifier)
  if (existingWebview) {
    existingWebview.close()
  }
}
