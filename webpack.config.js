const glob = require("glob");
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('./node_modules/html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

function setMDA() {
  const entrys = {};
  const htmlPlugins = [];
  const files = glob.sync(path.join(__dirname, 'src/**/index.js'));
  for(let file of files) {
    const pageName = file.match(/src\/((.+\/)*index).js/);
    entrys[pageName[1]] = file;
    htmlPlugins.push(new HtmlWebpackPlugin({
      template: `${__dirname}/src/${pageName[1]}.html`,
      filename: `${pageName[1]}.html`,
      chunks: [pageName[1]], // 只插入路径相同的js文件
      inject: true
    }));
  }
  return {entrys, htmlPlugins};
}

const {entrys, htmlPlugins} = setMDA();

module.exports = {
  entry: entrys,
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: "/node_modules",
      },
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ],
      }
    ],
  },
  plugins: [
    ...htmlPlugins,
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    contentBase: "./dist",
    hot: true
  }
};