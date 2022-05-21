/*
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 */
const { merge } = require('webpack-merge');
const common = require('../../dev/config/webpack.common');
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies

module.exports = merge(common, {
  mode: 'production',
  entry: path.join(process.cwd(), "/src/index.ts"),
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        contact: 'contact@https://app.micro.infini-soft.com/contact/remoteEntry.js'
      },
      shared: {
        ...deps,
        react: { singleton: true, eager: true, requiredVersion: deps.react },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
  ],
});
