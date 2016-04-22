(function (angular) {

    function _config(toastrConfig, $uibTooltipProvider) {
        /**
         * Config toastr
         */
        angular.extend(toastrConfig, {
            maxOpened: 3,
            timeOut: 10000,
            allowHtml: true
        });

        $uibTooltipProvider.options({})
    }


    angular
        .module('CashApp.Service', [
            'LocalStorageModule',
            'ngAnimate',
            'toastr',
            'angular-loading-bar',
            'ui.bootstrap.tooltip',
            'uib/template/tooltip/tooltip-popup.html',
            'ui.bootstrap.stackedMap'
        ]);

    angular
        .module('CashApp.Service')
        .config(['toastrConfig', '$uibTooltipProvider', _config]);
})(angular);