var path = require('path');
var webpack = require('webpack');
var sass = require('node-sass');

sass.render({
  file: './node-modules/swiper/swiper.scss'
}, function(err, result) {
  if (err) {
    console.error('Error from sass.render: ', err);
  } else {
    console.log(result);
  }
});

module.exports = {
  entry: ['@babel/polyfill', path.resolve(__dirname, './src/components/App.jsx')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: 'babel-loader'
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
