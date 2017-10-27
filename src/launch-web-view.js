import WebUI from 'sketch-module-web-view';

export default function (context) {
  const options = {
    identifier: 'unique.id', // to reuse the UI
    x: 0,
    y: 0,
    width: 500,
    height: 500,
    background: NSColor.whiteColor(),
    blurredBackground: false,
    onlyShowCloseButton: false,
    title: 'My ui',
    hideTitleBar: false,
    shouldKeepAround: true,
    frameLoadDelegate: { // https://developer.apple.com/reference/webkit/webframeloaddelegate?language=objc
      'webView:didFinishLoadForFrame:': function (webView, webFrame) {
        context.document.showMessage('UI loaded!')
        WebUI.clean()
      }
    },
    uiDelegate: {}, // https://developer.apple.com/reference/webkit/webuidelegate?language=objc
    onPanelClose: function () {
      context.document.showMessage('onPanelClose')
      // Stuff
      // return `false` to prevent closing the panel
    },
    handlers: {
      postContent: function (content) {
        context.document.showMessage('Received content from UI');
      }
    }
  }

  const webUI = new WebUI(context, require('../resources/ui.html'), options);
}
