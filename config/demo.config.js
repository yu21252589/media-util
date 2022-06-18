
const entry = require('./entry.js') ;
const path = require('path');

module.exports = {
  mode: 'production',
  entry,
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: '[name].js',
    library: {
      // name: 'MyLibrary',
      type: 'umd',
    },
  },
  module: {
  },
  plugins: [

  ],
};