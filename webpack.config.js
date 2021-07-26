var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry: './src/components/App.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /.jsx/,
        use: 'babel-loader'
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
