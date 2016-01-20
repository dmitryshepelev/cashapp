(function (angular) {

    function _config($stateProvider, $urlRouterProvider, $translateProvider, $interpolateProvider, $httpProvider) {
        var _baseUrl = '/my';

        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');

        $translateProvider.useStaticFilesLoader({
            prefix: '/static/locale/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en');

        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

        $urlRouterProvider.when('', '/dashboard');
        $stateProvider
            .state('my', {
                abstract: true,
                url: '',
                templateUrl: _baseUrl + '/uiview/'
            })
            .state('my.dashboard', {
                url: '/dashboard',
                templateUrl: _baseUrl + '/dashboard/',
                controller: 'dashboard-controller',
                data: {
                    title: 'dashboard_title'
                }
            })
            .state('my.conf', {
                url: '/conf',
                templateUrl: _baseUrl + '/conf/ui_view/'
            })
            .state('my.conf.general', {
                url: '/general',
                templateUrl: _baseUrl + '/conf/general/'
            })
            .state('my.conf.init', {
                url: '/init',
                templateUrl: _baseUrl + '/conf/init/'
            });
    }

    angular.module('CashAppMy', ['ui.router', 'pascalprecht.translate', 'CashApp.Service', 'ngAnimate']);
    angular.module('CashAppMy').config(['$stateProvider', '$urlRouterProvider', '$translateProvider', '$interpolateProvider', '$httpProvider', _config]);

})(angular);