export default function(context, content, isCalledFromEditMenu) {
    const command = context.command;
    const  sketch = context.api()
    const  scalingFactor = 0.2;

    let document = sketch.selectedDocument
    let page = document.selectedPage

    let xmlSVG = `<?xml version="1.0" encoding="UTF-8"?>${content.svg}`;
    let svgString = NSString.stringWithString(xmlSVG);
    let svgData = svgString.dataUsingEncoding(NSUTF8StringEncoding);

    let svgImporter = MSSVGImporter.svgImporter();
    svgImporter.prepareToImportFromData(svgData);

    let svgLayer = svgImporter.importAsLayer();

    svgLayer.setName('latex-eq');
    let artboard = context.document.currentPage().currentArtboard();
    let artboardFrame = artboard.frame();

    let svgFrame = svgLayer.frame();
    let newWidth = artboardFrame.width()*scalingFactor;
    let newHeight = svgFrame.height() / svgFrame.width() * newWidth;

    svgFrame.width = newWidth;
    svgFrame.height = newHeight;


    if(isCalledFromEditMenu) {
        let selectedLayer = context.selection[0];
        svgFrame.x = selectedLayer.frame().x();
        svgFrame.y = selectedLayer.frame().y();

        selectedLayer.removeFromParent();
    } else {
        svgFrame.x = (artboardFrame.width() - newWidth) / 2;
        svgFrame.y = (artboardFrame.height() - newHeight) / 2;
    }

    artboard.addLayer(svgLayer);
    let children = svgLayer.children();

    for(let i = 0; i < children.length; i++) {
        let child = children[i];
        if(child.isKindOfClass(MSShapeGroup)) {
            child.style().removeAllStyleBorders();
        }
    }

    command.setValue_forKey_onLayer_forPluginIdentifier(content.latexStr, 'latexStr', svgLayer, 'latex-plugin');

    context.document.showMessage(`LaTeX document is rendered! 🙌`);
}
