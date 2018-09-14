const path = require('path');

module.exports = {
  "env": { 
    "jasmine": true
  },
  "globals": { 
    "expect": true,
  },
  "settings": { 
    'import/resolver': {
      webpack: {
        config: path.resolve(__dirname, '../../webpack.test.config.js')
      }
    }
  },
};