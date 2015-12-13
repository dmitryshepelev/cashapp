(function (angular) {

    function _config($stateProvider, $urlRouterProvider, $translateProvider, $interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');

        $translateProvider.useStaticFilesLoader({
            prefix: '/static/locale/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en');

        $urlRouterProvider.otherwise("/signin");

        $stateProvider
            .state('signin', {
                url: "/signin",
                templateUrl: '/auth/signin/',
                controller: 'signin-controller'
            })
            .state('signup', {
                url: "/signup",
                templateUrl: '/auth/signup/'
            });
    }

    angular.module('CashAppAuth', ['ui.router', 'pascalprecht.translate', 'services']);
    angular.module('CashAppAuth').config(['$stateProvider', '$urlRouterProvider', '$translateProvider', '$interpolateProvider', _config]);

})(angular);
