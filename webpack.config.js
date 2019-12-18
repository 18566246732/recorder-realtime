const path = require('path');

module.exports = {
  entry: './src/recorder.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
    filename: 'recorder.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
      },
      {
        test: /\.worker.js$/,
        loader: 'worker-loader',
        options: { inline: true, fallback: false  }
      }
    ]
  }
};