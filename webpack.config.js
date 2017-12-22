var webpack = require('webpack');
var path = require('path');

var ENTRY_FILE = path.resolve(__dirname, 'src/index.js');
var BUILD_DIR = path.resolve(__dirname, 'public/dist');
var ASSET_PATH = 'dist/';

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry:  [
    ENTRY_FILE
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: ASSET_PATH
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react', 'stage-2']
            }
          }
        ]
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  },
  devtool: 'source-map'
}
