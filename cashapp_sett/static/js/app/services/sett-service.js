(function (angular) {
    function SettSrv ($http) {
        var baseUrl = '/sett/api/';
        return {
            /**
             * Get array of ui tabs
             * @returns Promise
             */
            getUiTabs: function () {
                var method = 'getUiTabs/';
                return $http.get(baseUrl + method);
            },

            /**
             * Gets list of currencies
             */
            getCurrenciresList: function () {
                var method = 'getCurrencies/';
                return $http.get(baseUrl + method);
            }
        }
    }

    SettSrv.$inject = ['$http'];

    angular
        .module('CashAppSett')
        .factory('$SettService', SettSrv)

})(angular);
