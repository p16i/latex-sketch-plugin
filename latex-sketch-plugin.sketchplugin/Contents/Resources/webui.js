/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports['default'] = function (context, isCalledFromEditMenu) {
    var webUI = new _sketchModuleWebView2['default'](context, __webpack_require__(1), {
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
            'webView:didFinishLoadForFrame:': function () {
                function webViewDidFinishLoadForFrame(webView, webFrame) {
                    var userInfo = context.command.valueForKey_onLayer_forPluginIdentifier('latexStr', context.selection[0], 'latex-plugin');
                    if (!userInfo) {
                        context.document.showMessage('Please select an latex layer');
                        return;
                    }
                    if (isCalledFromEditMenu) {
                        context.document.showMessage('UI loaded! from edit');
                        webUI.eval('setLatex(\'' + String(userInfo) + '\', true)');
                    } else {
                        context.document.showMessage('UI loaded! from insert');
                    }
                }

                return webViewDidFinishLoadForFrame;
            }()
        },
        uiDelegate: {}, // https://developer.apple.com/reference/webkit/webuidelegate?language=objc
        handlers: {
            postContent: function () {
                function postContent() {
                    var currentArtboard = context.document.currentPage().currentArtboard();
                    if (!currentArtboard) {
                        context.document.showMessage('Please select an artboard before inserting');
                        return false;
                    }
                    var selectedLayer = void 0;
                    if (isCalledFromEditMenu) {
                        selectedLayer = context.selection[0];
                    }

                    var content = webUI.eval('sketchBridge()');
                    var data = content.split(/::::/);

                    (0, _placeSvg2['default'])(context, { latexStr: data[0], svg: data[1] }, isCalledFromEditMenu);

                    webUI.panel.close();
                    _sketchModuleWebView2['default'].clean();
                }

                return postContent;
            }()
        }
    });
};

var _sketchModuleWebView = __webpack_require__(2);

var _sketchModuleWebView2 = _interopRequireDefault(_sketchModuleWebView);

var _placeSvg = __webpack_require__(5);

var _placeSvg2 = _interopRequireDefault(_placeSvg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = "file://" + context.plugin.urlForResourceNamed("_webpack_resources/014dd47d39d89e6e2acdfa5d76c675e8.html").path();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* globals NSUUID NSThread NSPanel NSMakeRect NSTexturedBackgroundWindowMask NSTitledWindowMask NSWindowTitleHidden NSClosableWindowMask NSColor NSWindowMiniaturizeButton NSWindowZoomButton NSFloatingWindowLevel WebView COScript NSWindowCloseButton NSFullSizeContentViewWindowMask NSVisualEffectView NSAppearance NSAppearanceNameVibrantLight NSVisualEffectBlendingModeBehindWindow */
var MochaJSDelegate = __webpack_require__(3)
var parseQuery = __webpack_require__(4)

var coScript = COScript.currentCOScript()

var LOCATION_CHANGED = 'webView:didChangeLocationWithinPageForFrame:'

function WebUI (context, frameLocation, options) {
  options = options || {}
  var identifier = options.identifier || NSUUID.UUID().UUIDString()
  var threadDictionary = NSThread.mainThread().threadDictionary()

  var panel
  var webView

  // if we already have a panel opened, reuse it
  if (threadDictionary[identifier]) {
    panel = threadDictionary[identifier]
    panel.makeKeyAndOrderFront(null)

    var subviews = panel.contentView().subviews()
    for (var i = 0; i < subviews.length; i++) {
      if (subviews[i].isKindOfClass(WebView.class())) {
        webView = subviews[i]
      }
    }

    if (!webView) {
      throw new Error('Tried to reuse panel but couldn\'t find the webview inside')
    }

    return {
      panel: panel,
      eval: webView.stringByEvaluatingJavaScriptFromString,
      webView: webView
    }
  }

  panel = NSPanel.alloc().init()

  // Window size
  var panelWidth = options.width || 240
  var panelHeight = options.height || 180
  panel.setFrame_display(NSMakeRect(
    options.x || 0,
    options.y || 0,
    panelWidth,
    panelHeight
  ), true)

  // Titlebar
  panel.setTitle(options.title || context.plugin.name())
  if (options.hideTitleBar) {
    panel.setTitlebarAppearsTransparent(true)
    panel.setTitleVisibility(NSWindowTitleHidden)
  }

  // Hide minize and zoom buttons
  if (options.onlyShowCloseButton) {
    panel.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true)
    panel.standardWindowButton(NSWindowZoomButton).setHidden(true)
  }

  // Close window callback
  var closeButton = panel.standardWindowButton(NSWindowCloseButton)
  closeButton.setCOSJSTargetFunction(function (sender) {
    if (options.onPanelClose) {
      var result = options.onPanelClose()
      if (result === false) {
        return
      }
    }
    panel.close()
    threadDictionary.removeObjectForKey(options.identifier)
    COScript.currentCOScript().setShouldKeepAround(false)
  })
  closeButton.setAction('callAction:')

  panel.setStyleMask(options.styleMask || (NSTexturedBackgroundWindowMask | NSTitledWindowMask | NSClosableWindowMask | NSFullSizeContentViewWindowMask))
  panel.becomeKeyWindow()
  panel.setLevel(NSFloatingWindowLevel)

  // Appearance
  var backgroundColor = options.background || NSColor.whiteColor()
  panel.setBackgroundColor(backgroundColor)
  if (options.blurredBackground) {
    var vibrancy = NSVisualEffectView.alloc().initWithFrame(NSMakeRect(0, 0, panelWidth, panelHeight))
    vibrancy.setAppearance(NSAppearance.appearanceNamed(NSAppearanceNameVibrantLight))
    vibrancy.setBlendingMode(NSVisualEffectBlendingModeBehindWindow)

    // Add it to the panel
    panel.contentView().addSubview(vibrancy)
  }

  threadDictionary[identifier] = panel

  if (options.shouldKeepAround !== false) { // Long-running script
    coScript.setShouldKeepAround(true)
  }

  // Add Web View to window
  webView = WebView.alloc().initWithFrame(NSMakeRect(
    0,
    options.hideTitleBar ? -24 : 0,
    options.width || 240,
    (options.height || 180) - (options.hideTitleBar ? 0 : 24)
  ))

  if (options.frameLoadDelegate || options.handlers) {
    var handlers = options.frameLoadDelegate || {}
    if (options.handlers) {
      var lastQueryId
      handlers[LOCATION_CHANGED] = function (webview, frame) {
        var query = webview.windowScriptObject().evaluateWebScript('window.location.hash')
        query = parseQuery(query)
        if (query.pluginAction && query.actionId && query.actionId !== lastQueryId && query.pluginAction in options.handlers) {
          lastQueryId = query.actionId
          try {
            query.pluginArgs = JSON.parse(query.pluginArgs)
          } catch (err) {}
          options.handlers[query.pluginAction].apply(context, query.pluginArgs)
        }
      }
    }
    var frameLoadDelegate = new MochaJSDelegate(handlers)
    webView.setFrameLoadDelegate_(frameLoadDelegate.getClassInstance())
  }
  if (options.uiDelegate) {
    var uiDelegate = new MochaJSDelegate(options.uiDelegate)
    webView.setUIDelegate_(uiDelegate.getClassInstance())
  }

  if (!options.blurredBackground) {
    webView.setOpaque(true)
    webView.setBackgroundColor(backgroundColor)
  } else {
    // Prevent it from drawing a white background
    webView.setDrawsBackground(false)
  }

  // When frameLocation is a file, prefix it with the Sketch Resources path
  if ((/^(?!http|localhost|www|file).*\.html?$/).test(frameLocation)) {
    frameLocation = context.plugin.urlForResourceNamed(frameLocation).path()
  }
  webView.setMainFrameURL_(frameLocation)

  panel.contentView().addSubview(webView)
  panel.center()
  panel.makeKeyAndOrderFront(null)

  return {
    panel: panel,
    eval: webView.stringByEvaluatingJavaScriptFromString,
    webView: webView
  }
}

WebUI.clean = function () {
  coScript.setShouldKeepAround(false)
}

module.exports = WebUI


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/* globals NSUUID MOClassDescription NSObject NSSelectorFromString NSClassFromString */

module.exports = function (selectorHandlerDict, superclass) {
  var uniqueClassName = 'MochaJSDelegate_DynamicClass_' + NSUUID.UUID().UUIDString()

  var delegateClassDesc = MOClassDescription.allocateDescriptionForClassWithName_superclass_(uniqueClassName, superclass || NSObject)

  delegateClassDesc.registerClass()

  // Storage Handlers
  var handlers = {}

  // Define interface
  this.setHandlerForSelector = function (selectorString, func) {
    var handlerHasBeenSet = (selectorString in handlers)
    var selector = NSSelectorFromString(selectorString)

    handlers[selectorString] = func

    /*
      For some reason, Mocha acts weird about arguments: https://github.com/logancollins/Mocha/issues/28
      We have to basically create a dynamic handler with a likewise dynamic number of predefined arguments.
    */
    if (!handlerHasBeenSet) {
      var args = []
      var regex = /:/g
      while (regex.exec(selectorString)) {
        args.push('arg' + args.length)
      }

      var dynamicFunction = eval('(function (' + args.join(', ') + ') { return handlers[selectorString].apply(this, arguments); })')

      delegateClassDesc.addInstanceMethodWithSelector_function_(selector, dynamicFunction)
    }
  }

  this.removeHandlerForSelector = function (selectorString) {
    delete handlers[selectorString]
  }

  this.getHandlerForSelector = function (selectorString) {
    return handlers[selectorString]
  }

  this.getAllHandlers = function () {
    return handlers
  }

  this.getClass = function () {
    return NSClassFromString(uniqueClassName)
  }

  this.getClassInstance = function () {
    return NSClassFromString(uniqueClassName).new()
  }

  // Convenience
  if (typeof selectorHandlerDict === 'object') {
    for (var selectorString in selectorHandlerDict) {
      this.setHandlerForSelector(selectorString, selectorHandlerDict[selectorString])
    }
  }
}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (query) {
  query = query.split('?')[1]
  if (!query) { return }
  query = query.split('&').reduce(function (prev, s) {
    var res = s.split('=')
    if (res.length === 2) {
      prev[decodeURIComponent(res[0])] = decodeURIComponent(res[1])
    }
    return prev
  }, {})
  return query
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports['default'] = function (context, content, isCalledFromEditMenu) {
    var command = context.command;
    var sketch = context.api();
    var scalingFactor = 0.2;

    var document = sketch.selectedDocument;
    var page = document.selectedPage;

    var xmlSVG = '<?xml version="1.0" encoding="UTF-8"?>' + String(content.svg);
    var svgString = NSString.stringWithString(xmlSVG);
    var svgData = svgString.dataUsingEncoding(NSUTF8StringEncoding);

    var svgImporter = MSSVGImporter.svgImporter();
    svgImporter.prepareToImportFromData(svgData);

    var svgLayer = svgImporter.importAsLayer();

    svgLayer.setName('latex-eq');
    var artboard = context.document.currentPage().currentArtboard();
    var artboardFrame = artboard.frame();

    var svgFrame = svgLayer.frame();
    var newWidth = artboardFrame.width() * scalingFactor;
    var newHeight = svgFrame.height() / svgFrame.width() * newWidth;

    svgFrame.width = newWidth;
    svgFrame.height = newHeight;

    if (isCalledFromEditMenu) {
        var selectedLayer = context.selection[0];
        svgFrame.x = selectedLayer.frame().x();
        svgFrame.y = selectedLayer.frame().y();

        selectedLayer.removeFromParent();
    } else {
        svgFrame.x = (artboardFrame.width() - newWidth) / 2;
        svgFrame.y = (artboardFrame.height() - newHeight) / 2;
    }

    artboard.addLayer(svgLayer);
    var children = svgLayer.children();

    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (child.isKindOfClass(MSShapeGroup)) {
            child.style().removeAllStyleBorders();
        }
    }

    command.setValue_forKey_onLayer_forPluginIdentifier(encodeURI(content.latexStr), 'latexStr', svgLayer, 'latex-plugin');

    context.document.showMessage('LaTeX document is rendered! \uD83D\uDE4C');
};

/***/ })
/******/ ]);