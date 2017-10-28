import WebUI from 'sketch-module-web-view';
import placeSvg from './placeSvg';

export default function(context, isEditMenu) {
    const webUI = new WebUI(context, require('../resources/ui.html'),   {
        identifier: 'unique.id', // to reuse the UI
        x: 0,
        y: 0,
        width: 400,
        height: 500,
        background: NSColor.whiteColor(),
        blurredBackground: false,
        onlyShowCloseButton: false,
        title: 'My ui',
        hideTitleBar: false,
        shouldKeepAround: true,
        frameLoadDelegate: { // https://developer.apple.com/reference/webkit/webframeloaddelegate?language=objc
            'webView:didFinishLoadForFrame:': function (webView, webFrame) {
                log(userInfo);
                // log(userInfo);
                // log('end-userinfo');
                let userInfo = context.command
                    .valueForKey_onLayer_forPluginIdentifier('latexStr', context.selection[0], 'latex-plugin');
                if(!userInfo){
                    context.document.showMessage('Please select an latex layer');
                    return;
                }
                webUI.eval(`setLatex("${userInfo}", true)`);
                context.document.showMessage('UI loaded! from edit');
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
                let selectedLayer = context.selection[0];
                const content = webUI.eval(`sketchBridge()`);
                let data = content.split(/::::/);
                log('------ edit selected layer');
                log(selectedLayer);
                placeSvg(context, { latexStr: data[0], svg: data[1] }, selectedLayer);

                webUI.panel.close();
            }
        }
    });
}
