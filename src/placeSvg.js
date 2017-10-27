export default function(context, svgContent) {
  const  sketch = context.api()
  const  scalingFactor = 0.1;
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

  let svgString = NSString.stringWithString(svgContent);
  let svgData = svgString.dataUsingEncoding(NSUTF8StringEncoding);


  let svgImporter = MSSVGImporter.svgImporter();

  svgImporter.prepareToImportFromData(svgData);
  let svgLayer = svgImporter.importAsLayer();

  svgLayer.setName("LaTex");


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

    svgFrame.x = (artboardFrame.width() - newWidth) / 2;
    svgFrame.y = (artboardFrame.height() - newHeight) / 2;

    log(svgLayer.style());

    artboard.addLayer(svgLayer);
    log(svgLayer.children());
    let children = svgLayer.children();

    for(let i = 0; i < children.length; i++) {
        let child = children[i];
        if(child.isKindOfClass(MSShapeGroup)) {
            // log(child.style().class().mocha().instanceMethodsWithAncestors());
            child.style().removeAllStyleBorders();
        }
    }


    context.document.showMessage("no error 🙌");
}
