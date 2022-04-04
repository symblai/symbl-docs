const webpack = require('webpack');
const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

const redocPlugin = (context, options) => {
    return {
        name: 'redoc-compatibility-plugin',
        configureWebpack(config, isServer, utils) {
            return {
                plugins: [
                    new webpack.ProvidePlugin({
                        Buffer: ['buffer', 'Buffer'],
                    })
                ]
            };
        },
    };
};

const sitePlugin = (context, options) => {
  return {
    name: 'custom-docusaurus-webpack-config-plugin',
    configureWebpack(config, isServer, utils) {
      return {
        resolve: {
          fallback: {
            fs: false,
          },
        },
        plugins: [
          new webpack.DefinePlugin({
            "process.versions.node": JSON.stringify(process.versions.node || "0.0.0"),
          }),
          new NodePolyfillPlugin(),
        ],
      };
    },
  };
};


module.exports = {redocPlugin, sitePlugin };
