const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function join(dest) {
  return path.resolve(__dirname, dest)
}

function web(dest) {
  return join(`web/static/${dest}`)
}

const config = module.exports = {
  entry: {
    application: [
      web('css/application.sass'),
      web('js/application.js'),
    ],
  },

  output: {
    path: join('priv/static'),
    filename: 'js/application.js',
  },

  resolve: {
    extesions: ['', '.js', '.sass'],
    modulesDirectories: ['node_modules'],
  },

  module: {
    noParse: /vendor\/phoenix/,
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          plugins: ['transform-decorators-legacy'],
          presets: ['react', 'es2015', 'stage-2', 'stage-0'],
        },
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract(
          'style',
          `css!sass?indentedSyntax&includePaths[]=${path.join(
            __dirname,
            '/node_modules'
          )}`
        ),
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('css/application.css'),
  ],
}

// eslint-disable-next-line no-process-env
if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ minimize: true })
  )
}
