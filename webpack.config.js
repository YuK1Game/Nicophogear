// webpack.confing.js

const path = require('path')
const WriteFilePlugin = require('write-file-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    './build/js/background.min.js' : './src/backgrounds/app.js',
    './build/js/contents.min.js' : './src/contents/app.js',
    './build/js/devtools.min.js' : './src/devtools/app.js',
    './build/js/panels.min.js' : './src/panels/app.js',
    './build/js/popup.min.js' : './src/popup/app.js',
  },
  output: {
    path: path.resolve(__dirname, './'),
    filename: '[name]'
  },
  plugins : [
    new WriteFilePlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          babelrc: false,
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
          ],
          plugins: [
            ['@babel/plugin-proposal-decorators', {
              legacy: true
            }],
            ['@babel/plugin-proposal-class-properties', {
              loose: true
            }],
            ['@babel/plugin-transform-runtime', {
              regenerator : true,
            }],
          ]
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?modules']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(pdf|jpg|png|gif|svg|ico|woff|woff2|eot|ttf|svg)$/,
        use: ['url-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    disableHostCheck: true,
    contentBase: path.join(__dirname, './public'),
    compress: true,
    port: 9000
  }
}