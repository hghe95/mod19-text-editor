const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: `./index.html`,
        title: `Text Editor`
      }),
      new InjectManifest({
        swSrc: `./src-sw.js`,
        swDest: `src-sw.js`
      }),
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: `It's in the name, it's just another text editor!`,
        background_color: '#addfff',
        theme_color: '#008b8b',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ]        
      })
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [`style-loader`, `css-loader`]
        },
        {
          test: /\.(jpg|jpeg|png|gif|svg|ico)$/i,
          type: `src/images`
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: `babel-loader`,
            options: {
              presets: {
                presets: [`@babel/preset-env`],
                plugins: [`@babel/plugin-proposal-object-rest-spread`, `@babel/transform-runtime`]
              }
            }
          }
        }
      ],
    },
  };
};
