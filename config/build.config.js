const path = require('path');
// 全量引入，打包成单一文件
module.exports = {
  mode: 'production',
  entry: {
    home: './dictionaries/index.js',
    util: './util/index.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    library: {
      type: 'umd',
    },
  },
  module: {
  },
  plugins: [

  ],
};
