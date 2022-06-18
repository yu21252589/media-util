
const path = require('path');
module.exports = {
  mode:'production',
  entry: {
    home: './dictionaries/index.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
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