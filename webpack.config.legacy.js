/* eslint-disable */

const path = require('path');

const autoprefixer = require('autoprefixer');

const babelEnvDeps = require('webpack-babel-env-deps');

module.exports = {
  entry: {
    main: "./assets/js/src/main.js",,
    admin: "./assets/js/src/admin.js"
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: [
        babelEnvDeps.exclude()
      ],
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              useBuiltIns: 'usage',
              corejs: 3,
              shippedProposals: true,
              bugfixes: true,
              targets: {
                browsers: "> 0.25%, not dead",
                uglify: true
              }
            }]
          ],
          plugins: ['@babel/plugin-transform-runtime'],

          cacheDirectory: true
        }

      }, {
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      }]
    }]
  },
  // watch: false,
  output: {
    filename: '[name].legacy.js',
    path: path.resolve(__dirname, './assets/js/dist')
  }

}