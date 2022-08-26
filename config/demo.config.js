// 按需引入-文件都打包成单独
const path = require('path');
// 字典枚举入口
const entry = require('./entry.js');
// 工具类入口
const entryUtil = require('./entry-util.js');

const totalEntry = {
  ...entryUtil,
  ...entry,
};
console.log('totalEntry', totalEntry);

module.exports = {
  mode: 'production',
  entry: totalEntry,
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: '[name].js',
    library: {
      // name: 'MyLibrary',
      type: 'umd',
    },
  },
  module: {},
  plugins: [],
};
