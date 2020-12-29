// Mainly based on
//srikanthsunkari/[Updated]webpack.config.js
//https://gist.github.com/srikanthsunkari/64377454251739266ee5cd092209018e

// And,
//https://asmz.hatenablog.jp/entry/try-pwa-by-react-native-for-web

// web/webpack.config.js

const path = require('path');
const webpack = require('webpack');

const appDirectory = path.resolve(__dirname, './');

// This is needed for webpack to compile JavaScript.
// Many OSS React Native packages are not compiled to ES5 before being
// published. If you depend on uncompiled packages they may cause webpack build
// errors. To fix this webpack can be configured to compile to the necessary
// `node_module`.
const babelLoaderConfiguration = {
  test: /\.(ts|tsx|js)?$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, 'index.web.js'),
    path.resolve(appDirectory, 'AppWeb.js'),
    path.resolve(appDirectory, 'src'),
    path.resolve(appDirectory, 'node_modules'),
    path.resolve(appDirectory, 'node_modules/react-native-uncompiled'),
    path.resolve(appDirectory, 'node_modules/react-native-sdk'),
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // The 'react-native' preset is recommended to match React Native's packager
      // presets: ['module:metro-react-native-babel-preset'],
      // presets: ['react-native'],
      // presets: [require.resolve('babel-preset-react-native')],
      // Re-write paths to import only the modules needed by the app
      plugins: ['react-native-web',],
      presets: ['react-native'],
      // presets: ['module:metro-react-native-babel-preset'],
      // plugins: [
      //   // needed to support async/await
      //   '@babel/plugin-transform-runtime'
      // ]
    },
  }
};

// This is needed for webpack to import static images in JavaScript files.
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]'
    }
  }
};

module.exports = {
  mode: 'production',
  entry: [
    // load any web API polyfills
    // path.resolve(appDirectory, 'polyfills-web.js'),
    // your web-specific entry file
    path.resolve(appDirectory, 'index.web.js')
  ],

  // configures where the build ends up
  output: {
    filename: '112.bundle.web.js',
    path: path.resolve(appDirectory, 'dist')
  },

  // ...the rest of your config

  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration
    ]
  },

  resolve: {
    // This will only alias the exact import "react-native"
    alias: {
      'react-native$': 'react-native-web'
    },
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: ['.web.js', '.js', '.ts', '.web.ts', '.tsx', '.web.tsx']
  }
}