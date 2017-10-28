import WebUI from 'sketch-module-web-view';
import placeSvg from './placeSvg';

export default function(context, isCalledFromEditMenu) {
    let webUI = new WebUI(context, require('../resources/ui.html'),   {
        identifier: 'unique.id' + Math.random(),
        x: 0,
        y: 0,
        width: 600,
        height: 500,
        background: NSColor.whiteColor(),
        blurredBackground: false,
        onlyShowCloseButton: false,
        title: 'LATEX ⚡ SKETCH',
        hideTitleBar: false,
        shouldKeepAround: true,
        frameLoadDelegate: { // https://developer.apple.com/reference/webkit/webframeloaddelegate?language=objc
            'webView:didFinishLoadForFrame:': function (webView, webFrame) {
                let userInfo = context.command
                    .valueForKey_onLayer_forPluginIdentifier('latexStr', context.selection[0], 'latex-plugin');
                if(!userInfo){
                    context.document.showMessage('Please select an latex layer');
                    return;
                }
                if(isCalledFromEditMenu) {
                    context.document.showMessage('UI loaded! from edit');
                    webUI.eval(`setLatex("${userInfo}", true)`);
                } else {

                    context.document.showMessage('UI loaded! from insert');
                }
            }
        },
        uiDelegate: {}, // https://developer.apple.com/reference/webkit/webuidelegate?language=objc
        handlers: {
            postContent: function () {
                let currentArtboard = context.document.currentPage().currentArtboard();
                if(!currentArtboard){
                    context.document.showMessage('Please select an artboard before inserting');
                    return false;
                }
                let selectedLayer;
                if(isCalledFromEditMenu) {
                    selectedLayer = context.selection[0];
                }

                const content = webUI.eval(`sketchBridge()`);
                let data = content.split(/::::/);

                placeSvg(context, { latexStr: data[0], svg: data[1] }, isCalledFromEditMenu);

                webUI.panel.close();
                WebUI.clean();
            }
        }
    });
}
