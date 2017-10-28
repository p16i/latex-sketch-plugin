export default function(context, content, oldLayer) {
  const command = context.command;
  const  sketch = context.api()
  const  scalingFactor = 0.2;
  context.document.showMessage("He, It's alieve 🙌");

  let document = sketch.selectedDocument
  log('Document');
  log(document);
  // log(SVGImporter);

  // let page = context.document.pages;
  // log(page)
  //
  let page = document.selectedPage
  log('>> artboard')
  log(content);

  let xmlSVG = `<?xml version="1.0" encoding="UTF-8"?>${content.svg}`;
  let svgString = NSString.stringWithString(xmlSVG);
  let svgData = svgString.dataUsingEncoding(NSUTF8StringEncoding);


  let svgImporter = MSSVGImporter.svgImporter();

  svgImporter.prepareToImportFromData(svgData);
  let svgLayer = svgImporter.importAsLayer();

  svgLayer.setName('__LATEX');


  // let currentArtboard = page.currentArtboard;

  // currentArtboard.addLayer(svgLayer);

  // log(currentArtboard);
  // currentArtboard.addLayer(svgLayer);
  // context.document.currentPage().addLayers([svgLayer]);
    let artboard = context.document.currentPage().currentArtboard();
    let artboardFrame = artboard.frame();

    let svgFrame = svgLayer.frame();
    log('artboard frame');
    log(artboardFrame.width());
    log('---------');
    // log('svg frame');
    // log(svgFrame);
    let newWidth = artboardFrame.width()*scalingFactor;
    let newHeight = svgFrame.height() / svgFrame.width() * newWidth;

    // let newFrame =
    log(newWidth);
    log(newHeight);

    svgFrame.width = newWidth;
    svgFrame.height = newHeight;


    log(svgLayer.style());

    if(oldLayer) {
        log('there is oldLayer')
        // log(oldLayer);
        // log(oldLayer.class().mocha().instanceMethodsWithAncestors());
        svgFrame.x = oldLayer.frame().x();
        svgFrame.y = oldLayer.frame().y();

        oldLayer.removeFromParent();
        // oldLayer = null;
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

    command.setValue_forKey_onLayer_forPluginIdentifier(content.latexStr, 'latexStr',
                                                        svgLayer, 'latex-plugin');

    context.document.showMessage(`LaTeX document is rendered! 🙌`);
}
