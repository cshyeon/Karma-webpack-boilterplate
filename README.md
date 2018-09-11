# Karma Testing Setup
- Create npm package.json file
```bash
npm init
```

- Install basic karma package
```bash
npm install --save-dev karma karma-cli #basic karma
npm i -D jasmine karma-jasmine  #jasmine
npm i -D karma-phantomjs-launcher phantomjs-prebuilt # capture browser
```

- Modify the srcipt code in package.json file.
```json
"scripts": {
  "karmaInit": "karma init"
}
```

- Setup karma.conf.js
```bash
npm run karmaInit
# framework -> jasmine
# require.js -> no
# capture browsers -> PhantomJS
# inlucde test files and excluded -> pass (just type enter)
# karma watch all file -> yes
```

## Make proejct directory 
- Make `test` -> `unit` folder
```bash
mkdir test
cd test
mkdir unit
```

- Move `karma.conf.js` to `unit` folder
```bash
mv ./karma.conf.js test/unit
```

- Modify `karma.conf.js`'s file for testing
```javascript
...
files: [
  './specs/**/*.spec.js'
],
...
```

- Create `test.spec.js` file for karma setup test in `test/unit/specs` folder
```bash
cd test/unit
mkdir specs
```
```javascript
// test/unit/specs -> test.spec.js
describe('test1', function() {
  it('test1 it', function() {
    expect(1).toBe(1);
  });
});
```

- Modify script code in `package.json` file
```json
"scripts": {
  "karmaInit": "karma init",
  "test": "karma start ./test/unit/karma.conf.js"
},
```

- Then run the `test` script
```bash
npm test # npm run test
```

## Karma reporter
- Install karma-spec reporter
```bash
npm install karma-mocha-reporter --save-dev
```

- Revise code in `karma.conf.js`
```javascript
...
reporters: ['mocha', 'progress'],
...
```

- Test
```bash
npm test
```

## Webpack and babel (es6)
- Install packages
```bash
npm install -D babel-loader @babel/core @babel/preset-env webpack webpack-cli karma-webpack
```

- Make `webpack.test.config.js` file in root folder
```javascript
// webpack.test.config.js
const path = require('path');
 
module.exports = (env) => ({
  mode: env && env.mode ? env : 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env'
            ],
          ],
        },
      }
    ]
  }
});
```

- Make `index.js` for testing in `test/unit` folder
```javascript
// test/unit -> index.js

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/);
testsContext.keys().forEach(testsContext);

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.

```

- Modify `karma.conf.js`
```javascript
// Karma configuration
// Generated on Tue Sep 11 2018 11:42:44 GMT+0900 (대한민국 표준시)
const webpackConfig = require('../../webpack.test.config')();

module.exports = function(config) {
  config.set({
    webpack: webpackConfig,
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      './index.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './index.js': ['webpack']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'progress'],

    // web server port
    port: 9876,
    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}

```

- Test 
```bash
npm test
```
