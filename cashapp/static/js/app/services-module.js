(function (angular) {

    function _config(toastrConfig) {
        /**
         * Config toastr
         */
        angular.extend(toastrConfig, {
            maxOpened: 3,
            timeOut: 10000,
            allowHtml: true
        })
    }


    angular
        .module('CashApp.Service', ['LocalStorageModule', 'ngAnimate', 'toastr', 'angular-loading-bar']);

    angular
        .module('CashApp.Service')
        .config(['toastrConfig', _config]);
})(angular);