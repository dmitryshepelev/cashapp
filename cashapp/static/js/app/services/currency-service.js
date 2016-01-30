(function (angular) {
    function CurrencySrv ($http) {
        var baseUrl = '/api/cmn/currency/';
        return {
            /**
             * Get PO by type
             */
            getAll: function () {
                return $http.get(baseUrl);
            }
        }
    }

    CurrencySrv.$inject = ['$http'];

    angular
        .module('CashApp.Service')
        .factory('$CurrencyService', CurrencySrv)

})(angular);
