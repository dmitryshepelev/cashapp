(function (angular) {

    function _config($stateProvider, $urlRouterProvider, $translateProvider, $interpolateProvider, $httpProvider) {
        var _baseUrl = '/my';

        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');

        $translateProvider.useStaticFilesLoader({
            prefix: '/static/locale/',
            suffix: '.json'
        });
        $translateProvider.use(JSON.parse(window.localStorage.getItem('ls.lang')) || 'en');

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
            .state('my.po', {
                url: '/po',
                templateUrl: _baseUrl + '/po/',
                controller: 'po-controller',
                data: {
                    title: 'po_title'
                }
            })
            .state('my.po.action', {
                url: '/{action}/{guid}',
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'po/modal/',
                        controller: 'po-modal-controller'
                    })
                        .result
                            .finally(function (po) {
                                $state.go('my.po')
                            })
                }]
            })
            .state('my.po.details', {
                url: '/{guid}',
                templateUrl: _baseUrl + '/po/details/',
                controller: 'po-details-controller',
                data: {
                    title: 'po_details_title'
                }
            })
    }

    angular
        .module('CashAppMy', [
            'ui.router',
            'pascalprecht.translate',
            'CashApp.Service',
            'ngAnimate',
            'ui.bootstrap',
            'uiSwitch'
        ]);
    angular
        .module('CashAppMy')
        .config(['$stateProvider', '$urlRouterProvider', '$translateProvider', '$interpolateProvider', '$httpProvider', _config]);

})(angular);
