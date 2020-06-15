module.exports = function (config, entry) {
  config.node = entry.isPluginCommand
    ? false
    : {
        setImmediate: false,
      }
  config.resolve.extensions = ['.sketch.js', '.js', '.jsx']
  // config.module.rules.push({
  //   test: /\.(png|woff|woff2|eot|ttf|svg)$/,
  //   loader: 'url-loader?limit=100000'
  // })
  config.module.rules.push({
    test: /\.(html)$/,
    use: [
      {
        loader: '@skpm/extract-loader',
      },
      {
        loader: 'html-loader',
        options: {
          attrs: ['img:src', 'link:href'],
          interpolate: true,
        },
      },
    ],
  })
  config.module.rules.push({
    test: /\.(css)$/,
    use: [
      {
        loader: '@skpm/extract-loader',
      },
      {
        loader: 'css-loader',
      },
    ],
  })
}
