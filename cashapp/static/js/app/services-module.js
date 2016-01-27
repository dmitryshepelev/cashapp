(function (angular) {

    function _config(toastrConfig) {
        /**
         * Config toastr
         */
        angular.extend(toastrConfig, {
            maxOpened: 3,
            timeOut: 10000
        })
    }


    angular
        .module('CashApp.Service', ['LocalStorageModule', 'ngAnimate', 'toastr']);

    angular
        .module('CashApp.Service')
        .config(['toastrConfig', _config]);
})(angular);