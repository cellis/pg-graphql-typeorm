'use strict';
const path = require('path');
const externals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: './lib/cli.ts',
  externals: [externals()],
  node: {
    fs: 'empty',
  },
  target: 'node',
  output: {
    filename: 'cli.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.build.json',
              onlyCompileBundledFiles: true,
            },
          },
          {
            loader: 'shebang-loader',
          },
        ],
        exclude: [/node_modules/],
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
};
