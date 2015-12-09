(function (angular) {

    function _config($stateProvider, $urlRouterProvider) {
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

    angular.module('CashAppAuth', ['ui.router', 'CashApp']);
    angular.module('CashAppAuth').config(['$stateProvider', '$urlRouterProvider', _config]);

})(angular);
