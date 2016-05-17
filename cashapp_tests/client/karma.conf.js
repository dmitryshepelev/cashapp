// Karma configuration
// Generated on Tue Dec 08 2015 16:07:24 GMT+0300 (Belarus Standard Time)
// karma start cashapp_auth/tests/client/karma.conf.js

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '../',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        plugins : [
            'karma-jasmine',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-coverage',
            'karma-teamcity-reporter'
        ],

        // list of files / patterns to load in the browser
        files: [
            '../cashapp/static/js/libs/angular-1.5.0-beta.min.js',
            '../cashapp/static/js/libs/angular-mock.js',
            '../cashapp/static/js/libs/angular-ui-router-0.2.15.min.js',
            '../cashapp/static/js/libs/angular-animate.min.js',
            '../cashapp/static/js/libs/angular-translate.min.js',
            '../cashapp/static/js/libs/angular-translate-loader-static-files.min.js',
            '../cashapp/static/js/libs/angular-local-storage.js',
            '../cashapp/static/js/libs/angular-loading-bar.js',
            '../cashapp/static/js/libs/angular-toastr.min.js',
            '../cashapp/static/js/libs/angular-ng-mask.js',
            '../cashapp/static/js/libs/angular-ui-position.js',
            '../cashapp/static/js/libs/angular-ui-tabs.js',
            '../cashapp/static/js/libs/angular-ui-dropdown.js',
            '../cashapp/static/js/libs/angular-ui-tpls-1.3.2.min.js',
            '../cashapp/static/js/libs/angular-ui-tooltip.js',
            '../cashapp/static/js/libs/angular-ui-stackedMap.js',
            '../cashapp/static/js/libs/angular-ui-switch.min.js',
            '../cashapp/static/js/libs/angular-ui-datetimepicker.min.js',

            '../cashapp/static/js/app/services-module.js',
            '../cashapp/static/js/app/directives/*.js',
            '../cashapp/static/js/app/services/*.js',

            '../cashapp_auth/static/js/app/**/*.js',

            '../cashapp_sett/static/js/app/sett-module.js',
            '../cashapp_sett/static/js/app/services/sett-service.js',
            '../cashapp_sett/static/js/app/controllers/ui-view-controller.js',
            '../cashapp_sett/static/js/app/controllers/general-controller.js',
            '../cashapp_my/static/js/app/my-module.js',
            '../cashapp_my/static/js/app/controllers/po-controller.js',
            '../cashapp_my/static/js/app/controllers/dashboard-controller.js',
            '../cashapp_my/static/js/app/controllers/po-details-controller.js',
            '../cashapp_my/static/js/app/controllers/po-modal-controller.js',
            '../cashapp_my/static/js/app/controllers/transaction-modal-income-controller.js',
            '../cashapp_my/static/js/app/controllers/category-controller.js',

            'client/auth/**/*.js',
            'client/sett/**/*.js',
            'client/my/**/*.js',
            'client/services/**/*.js'
        ],


        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            '../cashapp/static/js/app/**/*.js': ['coverage'],
            '../cashapp_auth/static/js/app/**/*.js': ['coverage'],
            '../cashapp_sett/static/js/app/**/*.js': ['coverage'],
            '../cashapp_my/static/js/app/**/*.js': ['coverage']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage', 'teamcity'],
        // reporters: ['progress', 'coverage'],
        
        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultanous
        concurrency: Infinity
    })
};
