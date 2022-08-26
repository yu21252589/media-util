// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
// const VueLoaderPlugin = require('vue-loader/lib/plugin');

// 注意不同版本loader导出方式不一样
// eslint-disable-next-line import/no-extraneous-dependencies
const { VueLoaderPlugin } = require('vue-loader');
// eslint-disable-next-line
const webpack = require('webpack');
// 注意 vue-loader 导出方式
const path = require('path');

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/main.js'),
  },
  devtool: 'inline-source-map', // 开启source map
  mode: 'development',
  cache: {
    type: 'filesystem',
  },
  module: {
    rules: [
      {
        test: /\.(vue)$/,
        use: {
          loader: 'vue-loader',
        },
      }, // 处理vue模板
      {
        test: /\.(css|less)$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false,
              },
            },
          }, // 通过vue-loader插件，将vue文件渲染
          {
            loader: path.resolve(__dirname, '../loaders/md-loader/index.js'),
          }, // 先将md文件转为vue格式
        ],
      },
      // 处理style样式，
      // less-loader需要前置依赖less
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'My App',
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
