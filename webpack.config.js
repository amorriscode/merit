const webpack = require('webpack')
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

const config = {
  entry: {
    options: path.join(__dirname, 'src/options.tsx'),
    popup: path.join(__dirname, 'src/popup.tsx'),
    content: path.join(__dirname, 'src/content.tsx'),
    blocker: path.join(__dirname, 'src/blocker.tsx'),
    background: path.join(__dirname, 'src/background.tsx'),
  },
  output: { path: path.join(__dirname, 'dist'), filename: '[name].js' },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'public', to: '.' }],
    }),
  ],
}

module.exports = config
