const webpack = require('webpack');

module.exports = function override(config, env) {
  // Add this block to configure a fallback for 'crypto' and 'stream' modules
  config.resolve.fallback = {
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
  };

  return config;
};

