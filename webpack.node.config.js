const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
 
module.exports = (env) => ({
  mode: env && env.mode ? env : 'development',
  target: 'node',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json'
  },
  devtool: 'inline-source-map',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env'              
            ],                                               
          ],
          plugins: [
            [
              require('@babel/plugin-transform-runtime')
            ]
          ]
        },
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});