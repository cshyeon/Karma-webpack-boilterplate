const path = require('path');

module.exports = {
  "env": {
      "browser": true,
      "es6": true,
      "node": true
  },
  "parserOptions": {
      "sourceType": "module"
  },
  "extends": [
      "airbnb-base"
  ],
  "settings": { 
    'import/resolver': {
      webpack: {
        config: path.resolve(__dirname, 'webpack.node.config.js')
      }
    }
  },
  "plugins": [        
      'import'
  ],
};
