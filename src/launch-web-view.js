import WebUI from 'sketch-module-web-view';
import placeSvg from './placeSvg';

export default function (context) {

  const webUI = new WebUI(context, require('../resources/ui.html'),   {
    identifier: 'unique.id', // to reuse the UI
    x: 0,
    y: 0,
    width: 1000,
    height: 700,
    background: NSColor.whiteColor(),
    blurredBackground: false,
    onlyShowCloseButton: false,
    title: 'My ui',
    hideTitleBar: false,
    shouldKeepAround: true,
    frameLoadDelegate: { // https://developer.apple.com/reference/webkit/webframeloaddelegate?language=objc
      'webView:didFinishLoadForFrame:': function (webView, webFrame) {
        context.document.showMessage('UI loaded!')
      }
    },
    uiDelegate: {}, // https://developer.apple.com/reference/webkit/webuidelegate?language=objc
    handlers: {
      postContent: function () {
        const svg = webUI.eval(
          `sketchBridge()`
        );
        const complete = `<?xml version="1.0" encoding="UTF-8"?>${svg}`;
        log('---->');
        log(complete);
        placeSvg(context, complete);

        webUI.panel.close();
      }
    }
  }
);
}
