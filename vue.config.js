const path = require('path')
const OfflinePlugin = require('offline-plugin')

module.exports = {
  lintOnSave: true,
  runtimeCompiler: true,
  configureWebpack: {
    plugins: [
      new OfflinePlugin({
        publicPath: '/',
        appShell: '/',
        responseStrategy: 'network-first',
        externals: [
          '/',
          '/manifest.json',
          '/favicon.png'
        ],
        ServiceWorker: {
          entry: path.resolve(__dirname, 'src/sw.js'),
          output: 'sw.js',
          minify: false
        }
      })
    ]
  }
}
