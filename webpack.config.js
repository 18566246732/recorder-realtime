const path = require('path');

module.exports = {
  entry: './src/recorder.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'recorder.js' // 输出的文件名
  },
  mode: 'development'
};