(function (angular) {

    function _config($stateProvider, $urlRouterProvider, $translateProvider, $interpolateProvider, $httpProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');

        $translateProvider.useStaticFilesLoader({
            prefix: '/static/locale/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en');

        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

        $urlRouterProvider.when('', '/signin');
        $stateProvider
            .state('auth', {
                abstract: true,
                url: '',
                templateUrl: '/auth/uiview/'
            })
            .state('auth.signin', {
                url: '/signin',
                templateUrl: '/auth/signin/',
                controller: 'signin-controller',
                data: {
                    title: 'sign_in_title'
                }
            })
            .state('auth.signup', {
                url: '/signup',
                templateUrl: '/auth/signup/',
                controller: 'signup-controller',
                data: {
                    title: 'sign_up_title'
                }
            });
    }

    angular.module('CashAppAuth', ['ui.router', 'pascalprecht.translate', 'CashApp.Service', 'ngAnimate']);
    angular.module('CashAppAuth').config(['$stateProvider', '$urlRouterProvider', '$translateProvider', '$interpolateProvider', '$httpProvider', _config]);

})(angular);
