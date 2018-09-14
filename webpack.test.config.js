const path = require('path');
 
module.exports = (env) => ({
  mode: env && env.mode ? env : 'development',
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      '~': path.resolve(__dirname),
    }
  },
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
        },
      }
    ]
  }
});