const path = require('path');

module.exports = {
  entry: './src/recorder.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    filename: 'recorder.js' // 输出的文件名
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