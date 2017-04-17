var path = require('path');
var webpack = require('webpack');
var serverHost = '127.0.0.1';
var serverport = 8080;

module.exports = {
  entry: './src/client/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          'scss': 'vue-style-loader!css-loader!sass-loader',
          'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
        }
      }
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]?[hash]'
      }
    },
    {
      test: /\.less$/,
      use: [
        'style-loader',
        { loader: 'css-loader', options: { importLoaders: 1 } },
        { loader: 'less-loader', options: { strictMath: true, noIeCompat: true } }
      ]
    },
    {
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader' ]
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
      loader: 'file-loader'
    }
  ]},
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      assets: path.join(__dirname, './src/client/assets'),
      resource: path.join(__dirname, './src/client/resource'),
      util: path.join(__dirname, './src/client/util'),
      filter: path.join(__dirname, './src/client/filter')
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    host: serverHost,
    port: serverport,
    proxy: {
      '/api/*': {
        target: 'http://127.0.0.1:3000/',
        secure: false,
        changeOrigin: true
      }
    }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
