(function (angular) {

    function _config($stateProvider, $urlRouterProvider, $translateProvider, $interpolateProvider, $httpProvider) {
        var _baseUrl = '/sett';

        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');

        $translateProvider.useStaticFilesLoader({
            prefix: '/static/locale/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en');

        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

        $urlRouterProvider.when('', '/general');
        $stateProvider
            .state('sett', {
                abstract: true,
                url: '',
                templateUrl: _baseUrl + '/uiview/'
            })
            .state('sett.general', {
                url: '/general',
                templateUrl: _baseUrl + '/general/',
                controller: 'general-controller',
                data: {
                    title: 'general_title'
                }
            })
            .state('sett.setCash', {
                url: '/setcash',
                templateUrl: _baseUrl + '/setcash/',
                controller: 'set-cash-controller',
                data: {
                    title: 'general_title'
                }
            });
    }

    angular
        .module('CashAppSett', ['ui.router', 'pascalprecht.translate', 'CashApp.Service', 'ngAnimate', 'ui.bootstrap.tabs']);
    angular
        .module('CashAppSett')
        .config(['$stateProvider', '$urlRouterProvider', '$translateProvider', '$interpolateProvider', '$httpProvider', _config]);

})(angular);
