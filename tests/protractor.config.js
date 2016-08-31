exports.config = {
    framework: "jasmine2",
    allScriptsTimeout: 30000,
    // includeStackTrace: true,
    getPageTimeout: 30000,
    jasmineNodeOpts: {defaultTimeoutInterval: 120000},

	directConnect: true,

	onPrepare: function () {
        var jasmineReporters = require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            filePrefix: 'xmloutput',
            savePath: 'dist/e2e'
        }));
    }
};