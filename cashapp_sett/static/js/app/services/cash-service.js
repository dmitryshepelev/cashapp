(function (angular) {
    function CashSrv ($http) {
        var baseUrl = '/api/sett/mcash/';
        return {
            /**
             * Save init cash data
             * @param data
             * @param type
             * @returns {*}
             */
            createCash: function (data, type) {
                var method = type + '/';
                return $http.post(baseUrl + method, data);
            },
            /**
             * Get cashes by type
             * @param type
             */
            getCash: function (type) {
                var method = type + '/';
                return $http.get(baseUrl + method);
            }
        }
    }

    CashSrv.$inject = ['$http'];

    angular
        .module('CashAppSett')
        .factory('$CashService', CashSrv)

})(angular);

