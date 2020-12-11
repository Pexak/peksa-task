// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const {SpecReporter, StacktraceOption} = require('jasmine-spec-reporter');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  capabilities: {
    browserName: 'chrome'
  },
  directConnect: true,
  SELENIUM_PROMISE_MANAGER: false,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () {
    }
  },
  onPrepare () {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: StacktraceOption.PRETTY
      }
    }));
    // used for switching browser windows
    global.selectWindow = function (index) {
      // wait for handels[index] to exists
      browser.driver.wait(function () {
        return browser.driver.getAllWindowHandles().then(function (handles) {
          /**
           * Assume that handles.length >= 1 and index >=0.
           * So when i call selectWindow(index) i return
           * true if handles contains that window.
           */

          if (handles.length > index) {
            return true;
          }
        })
      });

      // switch to the window
      return browser.driver.getAllWindowHandles().then(function (handles) {
        return browser.driver.switchTo().window(handles[index])
      })
    };

    global.BROWSER_WAIT = 5000;
  }
};
