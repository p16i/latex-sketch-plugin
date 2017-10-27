export default function(context, svgContent) {
  const  sketch = context.api()
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

  var svgString = NSString.stringWithString(svgContent);
  var svgData = svgString.dataUsingEncoding(NSUTF8StringEncoding);


  var svgImporter = MSSVGImporter.svgImporter();

  svgImporter.prepareToImportFromData(svgData);
  var svgLayer = svgImporter.importAsLayer();

  svgLayer.setName("LaTex");
  context.document.currentPage().addLayers([svgLayer]);
  context.document.showMessage("no error 🙌");
}
