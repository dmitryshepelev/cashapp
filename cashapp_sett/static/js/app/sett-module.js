(function (angular) {

    function _config($stateProvider, $urlRouterProvider, $translateProvider, $interpolateProvider, $httpProvider) {
        var _baseUrl = '/sett';

        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');

        $translateProvider.useStaticFilesLoader({
            prefix: '/static/locale/',
            suffix: '.json'
        });
        $translateProvider.use(JSON.parse(window.localStorage.getItem('ls.lang')) || 'en');

        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

        $urlRouterProvider.when('', '/redirect');
        $stateProvider
            .state('sett', {
                abstract: true,
                url: '',
                templateUrl: _baseUrl + '/uiview/'
            })
            .state('sett.redirect', {
                url: '/redirect',
                template: '',
                data: {
                    title: 'redirect_title'
                }
            })
            .state('sett.general', {
                url: '/general',
                templateUrl: _baseUrl + '/general/',
                controller: 'general-controller',
                data: {
                    title: 'general_title'
                }
            })
            .state('sett.po', {
                url: '/po',
                templateUrl: _baseUrl + '/po/',
                controller: 'po-controller',
                data: {
                    title: 'po_title'
                }
            })
            .state('sett.po.action', {
                url: '/{action}/{guid}',
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'po/modal/',
                        controller: 'po-modal-controller'
                    })
                        .result.finally(function () {
                        $state.go('sett.po');
                    })
                }]
            })
    }

    angular
        .module('CashAppSett', [
            'ui.router',
            'pascalprecht.translate',
            'CashApp.Service',
            'ngAnimate',
            'ui.bootstrap',
            'LocalStorageModule',
            'ngMask',
            'uiSwitch'
        ]);
    angular
        .module('CashAppSett')
        .config(['$stateProvider', '$urlRouterProvider', '$translateProvider', '$interpolateProvider', '$httpProvider', _config]);

})(angular);
