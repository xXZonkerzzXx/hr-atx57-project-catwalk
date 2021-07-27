var path = require('path');
var webpack = require('webpack');
var sass = require('node-sass');

module.exports = {
  entry: './src/components/App.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  mode: 'development',
  exclude: [
    /\.scss$/
  ],
  module: {
    rules: [
      {
            test: /\.scss$/,
            use: [
              'babel-loader',
              'sass-loader',
              'css-loader',
              'style-loader'
            ],
            options: {
              implementation: require('sass')
            }
          }
        ]
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
