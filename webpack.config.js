const path = require('path');

module.exports = {
  entry: './dist/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'lib'),
  },
};